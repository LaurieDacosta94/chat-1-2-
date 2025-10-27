require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-me';
const MAX_CHAT_HISTORY = 50;

const devAdminEnvFlag = process.env.ENABLE_DEV_ADMIN;
const devAdminEnabled =
  devAdminEnvFlag === 'true' ||
  (devAdminEnvFlag !== 'false' && process.env.NODE_ENV !== 'production');
const devAdminUsername = (process.env.DEV_ADMIN_USERNAME || 'admin').trim();
const devAdminPassword = process.env.DEV_ADMIN_PASSWORD || 'admin-dev-password-change-me';
let hasLoggedDevAdminHint = false;

// When PostgreSQL is unavailable (for example, due to missing credentials on a
// local machine), we fall back to a lightweight in-memory store so developers
// can still sign up, log in, and exchange messages. Data stored this way is
// ephemeral and cleared whenever the server restarts.
const fatalPgCodes = new Set(['28P01', '3D000', '57P01']);
const fatalNodeCodes = new Set(['ECONNREFUSED', 'ECONNRESET', 'ENOTFOUND']);

function isFatalDatabaseError(error) {
  if (!error || typeof error !== 'object') {
    return false;
  }

  if (fatalPgCodes.has(error.code)) {
    return true;
  }

  if (fatalNodeCodes.has(error.code) || fatalNodeCodes.has(error.errno)) {
    return true;
  }

  const message = typeof error.message === 'string' ? error.message.toLowerCase() : '';
  if (!message) {
    return false;
  }

  if (message.includes('password authentication failed')) return true;
  if (message.includes('no pg_hba.conf entry')) return true;
  if (message.includes('role') && message.includes('does not exist')) return true;
  if (message.includes('database') && message.includes('does not exist')) return true;
  if (message.includes('connection refused')) return true;

  return false;
}

let hasLoggedInMemoryWarning = false;
let hasClosedPoolConnection = false;

function logInMemoryFallback(reason) {
  const trimmedReason = typeof reason === 'string' ? reason.trim() : '';

  if (!hasLoggedInMemoryWarning) {
    console.warn('⚠️  Falling back to an in-memory data store. Data will be reset when the server restarts.');
    if (trimmedReason) {
      console.warn(`   ↳ Reason: ${trimmedReason}`);
    }
    hasLoggedInMemoryWarning = true;
    return;
  }

  if (trimmedReason) {
    console.warn(`⚠️  Continuing with in-memory data store due to: ${trimmedReason}`);
  }
}

function createInMemoryStore() {
  let nextUserId = 1;
  let nextMessageId = 1;
  const usersByUsername = new Map();
  const usersById = new Map();
  const messagesByChatId = new Map();

  return {
    insertUser({ username, passwordHash, isAdmin = false }) {
      const createdAt = new Date().toISOString();
      if (usersByUsername.has(username)) {
        const error = new Error('Username is already taken.');
        error.code = '23505';
        throw error;
      }
      const record = {
        id: nextUserId++,
        username,
        password_hash: passwordHash,
        is_admin: Boolean(isAdmin),
        created_at: createdAt,
      };
      usersByUsername.set(username, record);
      usersById.set(record.id, record);
      return {
        id: record.id,
        username: record.username,
        is_admin: record.is_admin,
        created_at: record.created_at,
      };
    },
    findUser(username) {
      const record = usersByUsername.get(username);
      return record ? { ...record } : null;
    },
    findUserById(userId) {
      const record = usersById.get(userId);
      return record ? { ...record } : null;
    },
    searchUsers(query, limit = 5) {
      const normalizedQuery = query.trim().toLowerCase();
      if (!normalizedQuery) {
        return [];
      }

      const maxResults = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 25) : 5;
      const results = [];
      for (const record of usersByUsername.values()) {
        if (results.length >= maxResults) {
          break;
        }
        if (record.username.toLowerCase().includes(normalizedQuery)) {
          results.push({
            id: record.id,
            username: record.username,
            is_admin: record.is_admin,
            created_at: record.created_at,
          });
        }
      }
      return results;
    },
    getAllUsers() {
      return Array.from(usersByUsername.values())
        .map((record) => ({ ...record }))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    },
    updateUser(userId, { passwordHash, isAdmin }) {
      const record = usersById.get(userId);
      if (!record) {
        return null;
      }
      if (typeof passwordHash === 'string' && passwordHash) {
        record.password_hash = passwordHash;
      }
      if (typeof isAdmin === 'boolean') {
        record.is_admin = isAdmin;
      }
      usersByUsername.set(record.username, record);
      usersById.set(record.id, record);
      return { ...record };
    },
    deleteUser(userId) {
      const record = usersById.get(userId);
      if (!record || record.is_admin) {
        return false;
      }
      usersById.delete(userId);
      usersByUsername.delete(record.username);
      return true;
    },
    insertMessage({ chatId, senderId, content }) {
      const timestamp = new Date().toISOString();
      const record = {
        id: nextMessageId++,
        chat_id: chatId,
        sender_id: senderId,
        content,
        timestamp,
      };
      if (!messagesByChatId.has(chatId)) {
        messagesByChatId.set(chatId, []);
      }
      messagesByChatId.get(chatId).push(record);
      return { ...record };
    },
    getRecentMessages(chatId, limit) {
      const messages = messagesByChatId.get(chatId) ?? [];
      if (!messages.length) {
        return [];
      }
      const normalizedLimit = Number.isFinite(limit) && limit > 0 ? limit : messages.length;
      const startIndex = Math.max(messages.length - normalizedLimit, 0);
      return messages.slice(startIndex).map((message) => ({ ...message }));
    },
    purgeDatabase({ removeUsers = false } = {}) {
      messagesByChatId.clear();
      if (!removeUsers) {
        return;
      }
      for (const [userId, record] of usersById.entries()) {
        if (record.is_admin) {
          continue;
        }
        usersById.delete(userId);
        usersByUsername.delete(record.username);
      }
    },
  };
}

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: Number(process.env.PGPORT) || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      database: process.env.PGDATABASE || 'chat_app',
    };

const forceInMemoryStore = process.env.USE_IN_MEMORY_DB === 'true';
let useInMemoryStore = forceInMemoryStore;
const inMemoryStore = createInMemoryStore();
let pool = null;

if (useInMemoryStore) {
  logInMemoryFallback('USE_IN_MEMORY_DB is enabled');
} else {
  pool = new Pool(poolConfig);
}

function enableInMemoryFallback(error) {
  if (useInMemoryStore) {
    return true;
  }

  if (!isFatalDatabaseError(error)) {
    return false;
  }

  useInMemoryStore = true;
  const reason = error && typeof error.message === 'string' ? error.message : '';
  logInMemoryFallback(reason);

  if (pool && !hasClosedPoolConnection) {
    hasClosedPoolConnection = true;
    pool.end().catch(() => {});
    pool = null;
  }

  ensureDevAdminAccount().catch((seedError) => {
    console.error('Failed to provision dev admin account for in-memory store', seedError);
  });

  return true;
}

const app = express();

const rawCorsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];
const allowAllOrigins = rawCorsOrigins.includes('*');
const corsAllowedOrigins = allowAllOrigins
  ? '*'
  : rawCorsOrigins.length > 0
  ? rawCorsOrigins
  : ['http://localhost:3000', 'http://127.0.0.1:3000'];

function corsMiddleware(allowedOrigins) {
  const normalizedOrigins = allowedOrigins === '*'
    ? '*'
    : Array.isArray(allowedOrigins)
    ? allowedOrigins
    : [allowedOrigins];

  return (req, res, next) => {
    const requestOrigin = req.headers.origin;

    if (!requestOrigin) {
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.sendStatus(204);
      }
      return next();
    }

    const isAllowed =
      normalizedOrigins === '*' || normalizedOrigins.includes(requestOrigin);

    if (!isAllowed) {
      if (req.method === 'OPTIONS') {
        res.setHeader('Vary', 'Origin');
        return res.sendStatus(403);
      }
      return res.status(403).json({ error: 'Origin not allowed by CORS policy.' });
    }

    res.setHeader('Access-Control-Allow-Origin', normalizedOrigins === '*' ? '*' : requestOrigin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }

    return next();
  };
}

// Allow the frontend to call the API when it's hosted on a different port without pulling in extra dependencies.
app.use(corsMiddleware(corsAllowedOrigins));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsAllowedOrigins,
    methods: ['GET', 'POST'],
  },
});

const userSocketMap = new Map(); // userId -> Set(socketId)

function addSocketForUser(userId, socketId) {
  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }
  userSocketMap.get(userId).add(socketId);
}

function removeSocketForUser(userId, socketId) {
  const sockets = userSocketMap.get(userId);
  if (!sockets) return;
  sockets.delete(socketId);
  if (sockets.size === 0) {
    userSocketMap.delete(userId);
  }
}

async function createUser({ username, password, isAdmin = false }) {
  const hashedPassword = await bcrypt.hash(password, 12);

  if (useInMemoryStore || !pool) {
    return inMemoryStore.insertUser({ username, passwordHash: hashedPassword, isAdmin });
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (username, password_hash, is_admin)
       VALUES ($1, $2, $3)
       RETURNING id, username, is_admin, created_at`,
      [username, hashedPassword, isAdmin]
    );
    return result.rows[0];
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.insertUser({ username, passwordHash: hashedPassword, isAdmin });
    }
    throw error;
  }
}

async function findUserByUsername(username) {
  if (useInMemoryStore || !pool) {
    return inMemoryStore.findUser(username);
  }

  try {
    const result = await pool.query(
      `SELECT id, username, password_hash, is_admin, created_at
       FROM users
       WHERE username = $1`,
      [username]
    );
    return result.rows[0] || null;
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.findUser(username);
    }
    throw error;
  }
}

async function findUserById(userId) {
  if (useInMemoryStore || !pool) {
    return inMemoryStore.findUserById(userId);
  }

  try {
    const result = await pool.query(
      `SELECT id, username, password_hash, is_admin, created_at
       FROM users
       WHERE id = $1`,
      [userId]
    );
    return result.rows[0] || null;
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.findUserById(userId);
    }
    throw error;
  }
}

async function searchUsers(query, limit = 5) {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 25) : 5;

  if (useInMemoryStore || !pool) {
    return inMemoryStore.searchUsers(query, normalizedLimit);
  }

  try {
    const result = await pool.query(
      `SELECT id, username, is_admin, created_at
       FROM users
       WHERE username ILIKE $1
       ORDER BY username ASC
       LIMIT $2`,
      [`%${query}%`, normalizedLimit]
    );
    return result.rows;
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.searchUsers(query, normalizedLimit);
    }
    throw error;
  }
}

async function saveMessage({ chatId, senderId, content }) {
  if (useInMemoryStore || !pool) {
    return inMemoryStore.insertMessage({ chatId, senderId, content });
  }

  try {
    const result = await pool.query(
      `INSERT INTO messages (chat_id, sender_id, content)
       VALUES ($1, $2, $3)
       RETURNING id, chat_id, sender_id, content, timestamp`,
      [chatId, senderId, content]
    );
    const message = result.rows[0];
    if (message && message.timestamp instanceof Date) {
      message.timestamp = message.timestamp.toISOString();
    }
    return message;
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.insertMessage({ chatId, senderId, content });
    }
    throw error;
  }
}

async function listUsers() {
  if (useInMemoryStore || !pool) {
    return inMemoryStore.getAllUsers();
  }

  try {
    const result = await pool.query(
      `SELECT id, username, is_admin, created_at
       FROM users
       ORDER BY created_at DESC`
    );
    return result.rows;
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.getAllUsers();
    }
    throw error;
  }
}

async function deleteUserById(userId) {
  if (useInMemoryStore || !pool) {
    return inMemoryStore.deleteUser(userId);
  }

  try {
    const result = await pool.query(
      `DELETE FROM users
       WHERE id = $1 AND is_admin = FALSE`,
      [userId]
    );
    return result.rowCount > 0;
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.deleteUser(userId);
    }
    throw error;
  }
}

async function purgeDatabase({ removeUsers = false } = {}) {
  if (useInMemoryStore || !pool) {
    inMemoryStore.purgeDatabase({ removeUsers });
    return { messagesDeleted: null, usersDeleted: null };
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const messageResult = await client.query('DELETE FROM messages');
    let userResult = { rowCount: 0 };
    if (removeUsers) {
      userResult = await client.query(
        `DELETE FROM users
         WHERE is_admin = FALSE`
      );
    }
    await client.query('COMMIT');
    return { messagesDeleted: messageResult.rowCount, usersDeleted: userResult.rowCount };
  } catch (error) {
    await client.query('ROLLBACK');
    if (enableInMemoryFallback(error)) {
      inMemoryStore.purgeDatabase({ removeUsers });
      return { messagesDeleted: null, usersDeleted: null };
    }
    throw error;
  } finally {
    client.release();
  }
}

async function ensureDevAdminAccount() {
  if (!devAdminEnabled) {
    return;
  }

  const username = devAdminUsername;
  const password = devAdminPassword;

  if (!username || !password) {
    return;
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    if (useInMemoryStore || !pool) {
      const existing = inMemoryStore.findUser(username);
      if (!existing) {
        inMemoryStore.insertUser({ username, passwordHash, isAdmin: true });
      } else {
        inMemoryStore.updateUser(existing.id, { passwordHash, isAdmin: true });
      }
    } else {
      await pool.query(
        `INSERT INTO users (username, password_hash, is_admin)
         VALUES ($1, $2, TRUE)
         ON CONFLICT (username) DO UPDATE
           SET password_hash = EXCLUDED.password_hash,
               is_admin = TRUE`,
        [username, passwordHash]
      );
    }

    if (!hasLoggedDevAdminHint) {
      hasLoggedDevAdminHint = true;
      console.info(
        `⚙️  Dev admin account ready for local testing → ${username}/${password}. Set ENABLE_DEV_ADMIN=false to disable. ` +
          'Never enable this helper account in production.'
      );
    }
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return ensureDevAdminAccount();
    }
    console.error('Failed to provision dev admin account', error);
  }
}

function extractTokenFromHeader(req) {
  const header = typeof req.headers.authorization === 'string' ? req.headers.authorization.trim() : '';
  if (!header || !header.toLowerCase().startsWith('bearer ')) {
    return null;
  }
  const token = header.slice(7).trim();
  return token || null;
}

function requireHttpAuth(req, res) {
  const token = extractTokenFromHeader(req);
  if (!token) {
    res.status(401).json({ error: 'Authorization required.' });
    return null;
  }

  const payload = verifyToken(token);
  if (!payload || !payload.userId) {
    res.status(401).json({ error: 'Invalid token.' });
    return null;
  }

  return { userId: payload.userId, isAdmin: Boolean(payload.isAdmin) };
}

async function requireAdminUser(req, res) {
  const auth = requireHttpAuth(req, res);
  if (!auth) {
    return null;
  }

  try {
    const user = await findUserById(auth.userId);
    if (!user || !user.is_admin) {
      res.status(403).json({ error: 'Admin privileges required.' });
      return null;
    }

    const { password_hash: _ignored, ...safeUser } = user;
    return { auth, user: safeUser };
  } catch (error) {
    console.error('Failed to verify admin privileges', error);
    res.status(500).json({ error: 'Failed to verify admin privileges.' });
    return null;
  }
}

async function fetchRecentMessages(chatId, limit = MAX_CHAT_HISTORY) {
  if (useInMemoryStore || !pool) {
    return inMemoryStore.getRecentMessages(chatId, limit);
  }

  try {
    const result = await pool.query(
      `SELECT id, chat_id, sender_id, content, timestamp
       FROM messages
       WHERE chat_id = $1
       ORDER BY timestamp DESC
       LIMIT $2`,
      [chatId, limit]
    );
    return result.rows
      .map((row) => ({
        ...row,
        timestamp: row.timestamp instanceof Date ? row.timestamp.toISOString() : row.timestamp,
      }))
      .reverse();
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.getRecentMessages(chatId, limit);
    }
    throw error;
  }
}

function generateToken(userId, isAdmin = false) {
  return jwt.sign({ userId, isAdmin: Boolean(isAdmin) }, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: 'Username is already taken.' });
    }

    const newUser = await createUser({ username, password });
    const token = generateToken(newUser.id, newUser.is_admin);
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        is_admin: Boolean(newUser.is_admin),
      },
    });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Failed to register user.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = generateToken(user.id, user.is_admin);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        is_admin: Boolean(user.is_admin),
      },
    });
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to authenticate user.' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  const admin = await requireAdminUser(req, res);
  if (!admin) {
    return;
  }

  try {
    const users = await listUsers();
    res.json({
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        is_admin: Boolean(user.is_admin),
        created_at:
          user && typeof user.created_at === 'string'
            ? user.created_at
            : user?.created_at instanceof Date
            ? user.created_at.toISOString()
            : null,
      })),
    });
  } catch (error) {
    console.error('Error listing users for admin dashboard', error);
    res.status(500).json({ error: 'Failed to list users.' });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  const admin = await requireAdminUser(req, res);
  if (!admin) {
    return;
  }

  const userId = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: 'A valid user id is required.' });
  }

  if (userId === admin.user.id) {
    return res.status(400).json({ error: 'You cannot delete your own account.' });
  }

  try {
    const targetUser = await findUserById(userId);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    if (targetUser.is_admin) {
      return res.status(400).json({ error: 'Cannot delete admin accounts.' });
    }

    const deleted = await deleteUserById(userId);
    if (!deleted) {
      return res.status(409).json({ error: 'Unable to delete user.' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user from admin dashboard', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

app.post('/api/admin/purge', async (req, res) => {
  const admin = await requireAdminUser(req, res);
  if (!admin) {
    return;
  }

  const removeUsers = Boolean(req.body?.removeUsers);

  try {
    const result = await purgeDatabase({ removeUsers });
    res.json({
      success: true,
      removed: {
        messages: result.messagesDeleted,
        users: removeUsers ? result.usersDeleted : 0,
      },
    });
  } catch (error) {
    console.error('Error purging data from admin dashboard', error);
    res.status(500).json({ error: 'Failed to purge data.' });
  }
});

ensureDevAdminAccount().catch((error) => {
  console.error('Failed to provision dev admin account during startup', error);
});

app.get('/api/users/search', async (req, res) => {
  const auth = requireHttpAuth(req, res);
  if (!auth) {
    return;
  }
  const { userId } = auth;

  const query = typeof req.query.query === 'string' ? req.query.query.trim() : '';
  const limitRaw = typeof req.query.limit === 'string' ? Number.parseInt(req.query.limit, 10) : undefined;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required.' });
  }

  try {
    const results = await searchUsers(query, limitRaw);
    const filtered = results.filter((user) => user && user.id !== userId);
    res.json({
      results: filtered.map((user) => ({ id: user.id, username: user.username })),
    });
  } catch (error) {
    console.error('Error searching for users', error);
    res.status(500).json({ error: 'Failed to search users.' });
  }
});

io.on('connection', (socket) => {
  let authenticatedUserId = null;

  socket.on('authenticate', ({ token }) => {
    if (!token) {
      socket.emit('authError', { error: 'Missing token.' });
      return;
    }

    const payload = verifyToken(token);
    if (!payload) {
      socket.emit('authError', { error: 'Invalid token.' });
      return;
    }

    authenticatedUserId = payload.userId;
    addSocketForUser(authenticatedUserId, socket.id);
    socket.emit('authenticated', { userId: authenticatedUserId });
  });

  socket.on('joinChat', async ({ chat_id: chatId }) => {
    if (!authenticatedUserId) {
      socket.emit('authError', { error: 'Authenticate before joining chats.' });
      return;
    }
    if (!chatId) {
      socket.emit('chatError', { error: 'chat_id is required to join a chat.' });
      return;
    }

    try {
      socket.join(chatId);
      const messages = await fetchRecentMessages(chatId);
      socket.emit('chatHistory', { chat_id: chatId, messages });
    } catch (error) {
      console.error('Error joining chat', error);
      socket.emit('chatError', { error: 'Failed to join chat.' });
    }
  });

  socket.on('sendMessage', async ({ chat_id: chatId, content, recipient_id: recipientId, recipient_ids: recipientIds }) => {
    if (!authenticatedUserId) {
      socket.emit('authError', { error: 'Authenticate before sending messages.' });
      return;
    }
    if (!chatId || !content) {
      socket.emit('messageError', { error: 'chat_id and content are required.' });
      return;
    }

    try {
      const message = await saveMessage({ chatId, senderId: authenticatedUserId, content });
      const payload = { ...message, chat_id: chatId };
      io.to(chatId).emit('message', payload);

      const recipients = new Set();
      if (Array.isArray(recipientIds)) {
        recipientIds.forEach((id) => recipients.add(id));
      }
      if (recipientId) {
        recipients.add(recipientId);
      }
      recipients.delete(authenticatedUserId);

      recipients.forEach((userId) => {
        const sockets = userSocketMap.get(userId);
        if (!sockets) return;
        sockets.forEach((socketId) => {
          io.to(socketId).emit('message', payload);
        });
      });
    } catch (error) {
      console.error('Error sending message', error);
      socket.emit('messageError', { error: 'Failed to send message.' });
    }
  });

  socket.on('typing', ({ chat_id: chatId, isTyping }) => {
    if (!authenticatedUserId || !chatId) return;
    socket.to(chatId).emit('typing', {
      chat_id: chatId,
      user_id: authenticatedUserId,
      isTyping: Boolean(isTyping),
    });
  });

  socket.on('disconnect', () => {
    if (authenticatedUserId) {
      removeSocketForUser(authenticatedUserId, socket.id);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
