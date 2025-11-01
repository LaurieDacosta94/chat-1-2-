require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-me';
const MAX_CHAT_HISTORY = 50;
const MAX_ACTIVITY_LOG = 250;

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
      const sender = senderId ? usersById.get(senderId) : null;
      const record = {
        id: nextMessageId++,
        chat_id: chatId,
        sender_id: senderId,
        sender_username: sender ? sender.username : null,
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
    getAllMessages(limit) {
      const normalizedLimit =
        Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 1000) : 200;
      const allMessages = [];
      for (const messages of messagesByChatId.values()) {
        messages.forEach((message) => {
          const sender = usersById.get(message.sender_id);
          allMessages.push({
            ...message,
            sender_username: sender ? sender.username : null,
          });
        });
      }
      allMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return allMessages.slice(0, normalizedLimit).map((message) => ({ ...message }));
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
  maxHttpBufferSize: 25 * 1024 * 1024,
});

app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/admin.js', (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin.js'));
});

app.get('/admin.css', (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin.css'));
});

// We normalize user identifiers to strings so that sockets looked up via
// JWT payloads (numbers) and event payloads (often strings) refer to the same
// entry. Without this, direct message delivery could fail because `Set`
// lookups treat `1` and `'1'` as different keys.
const userSocketMap = new Map(); // normalizedUserId -> Set(socketId)

let nextActivityId = 1;
const activityLog = [];

function recordActivity({ type, summary, details = null }) {
  const entry = {
    id: nextActivityId++,
    type: typeof type === 'string' ? type : 'event',
    summary: typeof summary === 'string' ? summary : 'Activity recorded.',
    details: details ?? null,
    timestamp: new Date().toISOString(),
  };

  activityLog.unshift(entry);
  if (activityLog.length > MAX_ACTIVITY_LOG) {
    activityLog.length = MAX_ACTIVITY_LOG;
  }

  return entry;
}

function getActivityLog(limit = 100) {
  const normalizedLimit =
    Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), MAX_ACTIVITY_LOG) : 100;
  return activityLog.slice(0, normalizedLimit).map((entry) => ({ ...entry }));
}

function normalizeUserId(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  if (typeof value === 'bigint') {
    return value.toString();
  }
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }
  return null;
}

// Clients occasionally send `recipient_ids` as a serialized string (comma-separated
// or JSON). We coerce those payloads into a consistent set of normalized user IDs
// so that direct message forwarding works regardless of the input shape.
function collectNormalizedRecipientIds({ recipientId, recipientIds }) {
  const recipients = new Set();

  const addCandidate = (candidate) => {
    const normalized = normalizeUserId(candidate);
    if (normalized) {
      recipients.add(normalized);
    }
  };

  if (Array.isArray(recipientIds)) {
    recipientIds.forEach(addCandidate);
  } else if (typeof recipientIds === 'string') {
    const trimmed = recipientIds.trim();
    if (trimmed) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          parsed.forEach(addCandidate);
        } else {
          addCandidate(parsed);
        }
      } catch (_error) {
        trimmed
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
          .forEach(addCandidate);
      }
    }
  } else if (recipientIds !== undefined && recipientIds !== null) {
    addCandidate(recipientIds);
  }

  if (recipientId !== undefined) {
    addCandidate(recipientId);
  }

  return recipients;
}

function addSocketForUser(userId, socketId) {
  const normalizedUserId = normalizeUserId(userId);
  if (!normalizedUserId) {
    return;
  }

  if (!userSocketMap.has(normalizedUserId)) {
    userSocketMap.set(normalizedUserId, new Set());
  }
  userSocketMap.get(normalizedUserId).add(socketId);
}

function removeSocketForUser(userId, socketId) {
  const normalizedUserId = normalizeUserId(userId);
  if (!normalizedUserId) {
    return;
  }

  const sockets = userSocketMap.get(normalizedUserId);
  if (!sockets) return;
  sockets.delete(socketId);
  if (sockets.size === 0) {
    userSocketMap.delete(normalizedUserId);
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

function parseMessageContentForPreview(content) {
  if (typeof content !== 'string') {
    return { text: '', attachments: [] };
  }

  const trimmed = content.trim();
  if (!trimmed) {
    return { text: '', attachments: [] };
  }

  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === 'string') {
        return { text: parsed, attachments: [] };
      }
      const text = typeof parsed.text === 'string' ? parsed.text : '';
      const attachments = Array.isArray(parsed.attachments) ? parsed.attachments : [];
      return { text, attachments };
    } catch (_error) {
      return { text: trimmed, attachments: [] };
    }
  }

  return { text: trimmed, attachments: [] };
}

function formatVoiceDurationPreview(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) {
    return '';
  }
  const total = Math.max(1, Math.round(value));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  const padded = secs.toString().padStart(2, '0');
  return minutes ? `${minutes}:${padded}` : `0:${padded}`;
}

function describeAttachmentForPreview(attachment) {
  if (!attachment || typeof attachment !== 'object') {
    return 'Attachment';
  }

  const metadata = attachment.metadata && typeof attachment.metadata === 'object' ? attachment.metadata : null;
  if (metadata && Number.isFinite(metadata.voiceNoteDuration)) {
    const duration = formatVoiceDurationPreview(metadata.voiceNoteDuration);
    return duration ? `Voice message (${duration})` : 'Voice message';
  }

  const kind = typeof attachment.kind === 'string' ? attachment.kind.toLowerCase() : '';
  const type = typeof attachment.type === 'string' ? attachment.type.toLowerCase() : '';

  if (kind === 'image' || type.startsWith('image/')) {
    return 'Photo';
  }
  if (kind === 'video' || type.startsWith('video/')) {
    return 'Video';
  }
  if (kind === 'audio' || type.startsWith('audio/')) {
    return 'Audio';
  }

  return 'Document';
}

function buildAttachmentPreviewSummary(attachments = []) {
  if (!attachments.length) {
    return '';
  }

  const [first, ...rest] = attachments;
  const label = describeAttachmentForPreview(first);
  if (label.startsWith('Voice message')) {
    return rest.length ? `${label} +${rest.length}` : label;
  }
  if (rest.length) {
    return `${label} +${rest.length}`;
  }
  return label;
}

function buildMessagePreview(content) {
  const { text, attachments } = parseMessageContentForPreview(content);
  const normalizedText = text.trim();
  if (normalizedText) {
    return normalizedText.replace(/\s+/g, ' ').slice(0, 140);
  }
  const attachmentSummary = buildAttachmentPreviewSummary(attachments);
  return attachmentSummary;
}

async function listAllMessages(limit = 200) {
  const normalizedLimit =
    Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 1000) : 200;

  if (useInMemoryStore || !pool) {
    return inMemoryStore.getAllMessages(normalizedLimit);
  }

  try {
    const result = await pool.query(
      `SELECT m.id,
              m.chat_id,
              m.sender_id,
              u.username AS sender_username,
              m.content,
              m.timestamp
         FROM messages m
         LEFT JOIN users u ON m.sender_id = u.id
         ORDER BY m.timestamp DESC
         LIMIT $1`,
      [normalizedLimit]
    );

    return result.rows.map((row) => ({
      ...row,
      timestamp: row.timestamp instanceof Date ? row.timestamp.toISOString() : row.timestamp,
    }));
  } catch (error) {
    if (enableInMemoryFallback(error)) {
      return inMemoryStore.getAllMessages(normalizedLimit);
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

async function requireHttpAuth(req, res) {
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

  try {
    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401).json({ error: 'Account no longer exists.' });
      return null;
    }
  } catch (error) {
    console.error('Failed to verify user for authentication', error);
    res.status(500).json({ error: 'Failed to authenticate user.' });
    return null;
  }

  return { userId: payload.userId, isAdmin: Boolean(payload.isAdmin) };
}

async function fetchRecentMessages(chatId, limit = MAX_CHAT_HISTORY) {
  if (useInMemoryStore || !pool) {
    return inMemoryStore.getRecentMessages(chatId, limit);
  }

  try {
    const result = await pool.query(
      `SELECT m.id,
              m.chat_id,
              m.sender_id,
              u.username AS sender_username,
              m.content,
              m.timestamp
         FROM messages m
         LEFT JOIN users u ON m.sender_id = u.id
        WHERE m.chat_id = $1
        ORDER BY m.timestamp DESC
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
    recordActivity({
      type: 'user:registered',
      summary: `User "${newUser.username}" registered.`,
      details: { userId: newUser.id, username: newUser.username },
    });
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
    recordActivity({
      type: 'user:login',
      summary: `User "${user.username}" logged in.`,
      details: { userId: user.id, username: user.username },
    });
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

app.get('/api/admin/users', async (_req, res) => {
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
  const userId = Number.parseInt(req.params.id, 10);
  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({ error: 'A valid user id is required.' });
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

    recordActivity({
      type: 'user:deleted',
      summary: `User "${targetUser.username}" deleted.`,
      details: { userId: targetUser.id, username: targetUser.username },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user from admin dashboard', error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

app.post('/api/admin/purge', async (req, res) => {
  const removeUsers = Boolean(req.body?.removeUsers);

  try {
    const result = await purgeDatabase({ removeUsers });
    recordActivity({
      type: 'system:purge',
      summary: removeUsers
        ? 'Messages and non-admin users purged.'
        : 'All messages purged.',
      details: {
        removeUsers,
        messagesDeleted: result.messagesDeleted,
        usersDeleted: removeUsers ? result.usersDeleted : 0,
      },
    });
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

app.get('/api/admin/messages', async (req, res) => {
  const limitRaw =
    typeof req.query.limit === 'string' ? Number.parseInt(req.query.limit, 10) : undefined;

  try {
    const messages = await listAllMessages(limitRaw);
    res.json({
      messages: messages.map((message) => ({
        id: message.id,
        chat_id: message.chat_id,
        sender_id: message.sender_id,
        sender_username: message.sender_username || null,
        content: message.content,
        timestamp: message.timestamp,
      })),
    });
  } catch (error) {
    console.error('Error listing messages for admin dashboard', error);
    res.status(500).json({ error: 'Failed to list messages.' });
  }
});

app.get('/api/admin/activities', (req, res) => {
  const limitRaw =
    typeof req.query.limit === 'string' ? Number.parseInt(req.query.limit, 10) : undefined;
  try {
    const activities = getActivityLog(limitRaw);
    res.json({ activities });
  } catch (error) {
    console.error('Error retrieving activity log', error);
    res.status(500).json({ error: 'Failed to load activity log.' });
  }
});

ensureDevAdminAccount().catch((error) => {
  console.error('Failed to provision dev admin account during startup', error);
});

app.get('/api/users/search', async (req, res) => {
  const auth = await requireHttpAuth(req, res);
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

  socket.on('authenticate', async ({ token }) => {
    if (!token) {
      socket.emit('authError', { error: 'Missing token.' });
      return;
    }

    const payload = verifyToken(token);
    if (!payload || !payload.userId) {
      socket.emit('authError', { error: 'Invalid token.' });
      return;
    }

    try {
      const user = await findUserById(payload.userId);
      if (!user) {
        socket.emit('authError', { error: 'Account no longer exists.' });
        return;
      }
    } catch (error) {
      console.error('Failed to authenticate socket user', error);
      socket.emit('authError', { error: 'Authentication error.' });
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

  socket.on(
    'sendMessage',
    async ({
      chat_id: chatId,
      content,
      recipient_id: recipientId,
      recipient_ids: recipientIds,
      client_id: clientMessageId,
    }) => {
      if (!authenticatedUserId) {
        socket.emit('authError', { error: 'Authenticate before sending messages.' });
        return;
      }
      if (!chatId || !content) {
        socket.emit('messageError', { error: 'chat_id and content are required.' });
        return;
      }

      try {
        let senderUsername = null;
        let senderRecord = null;
        try {
          senderRecord = await findUserById(authenticatedUserId);
        } catch (lookupError) {
          console.error('Failed to verify sender before delivering message', lookupError);
          socket.emit('authError', { error: 'Authentication error.' });
          return;
        }

        if (!senderRecord) {
          socket.emit('authError', { error: 'Account no longer exists.' });
          removeSocketForUser(authenticatedUserId, socket.id);
          authenticatedUserId = null;
          return;
        }

        senderUsername = senderRecord.username || null;

        const message = await saveMessage({ chatId, senderId: authenticatedUserId, content });
        const payload = { ...message, chat_id: chatId };
        if (senderUsername && !payload.sender_username) {
          payload.sender_username = senderUsername;
        }
        if (clientMessageId) {
          payload.client_id = clientMessageId;
        }
        io.to(chatId).emit('message', payload);

        const preview = buildMessagePreview(content);

        recordActivity({
          type: 'message:sent',
          summary: senderUsername
            ? `Message from "${senderUsername}" in chat ${chatId}.`
            : `Message sent in chat ${chatId}.`,
          details: {
            chatId,
            senderId: authenticatedUserId,
            senderUsername,
            preview,
            clientMessageId: clientMessageId ?? null,
          },
        });

        const normalizedSenderId = normalizeUserId(authenticatedUserId);
        const recipients = collectNormalizedRecipientIds({ recipientId, recipientIds });
        if (normalizedSenderId) {
          recipients.delete(normalizedSenderId);
        }

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
    }
  );

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
