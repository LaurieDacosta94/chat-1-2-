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
  const messagesByChatId = new Map();

  return {
    insertUser({ username, passwordHash }) {
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
        created_at: createdAt,
      };
      usersByUsername.set(username, record);
      return { id: record.id, username: record.username };
    },
    findUser(username) {
      const record = usersByUsername.get(username);
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
          results.push({ id: record.id, username: record.username });
        }
      }
      return results;
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

async function createUser({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 12);

  if (useInMemoryStore || !pool) {
    return inMemoryStore.insertUser({ username, passwordHash: hashedPassword });
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (username, password_hash)
       VALUES ($1, $2)
       RETURNING id, username`,
      [username, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.insertUser({ username, passwordHash: hashedPassword });
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
      `SELECT id, username, password_hash
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

async function searchUsers(query, limit = 5) {
  const normalizedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 25) : 5;

  if (useInMemoryStore || !pool) {
    return inMemoryStore.searchUsers(query, normalizedLimit);
  }

  try {
    const result = await pool.query(
      `SELECT id, username
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

  return payload.userId;
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

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
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
    const token = generateToken(newUser.id);
    res.status(201).json({ token, user: newUser });
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

    const token = generateToken(user.id);
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ error: 'Failed to authenticate user.' });
  }
});

app.get('/api/users/search', async (req, res) => {
  const userId = requireHttpAuth(req, res);
  if (!userId) {
    return;
  }

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
