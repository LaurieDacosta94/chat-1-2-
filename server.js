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

// Derive the database name for diagnostics even when a single DATABASE_URL is used.
const databaseFromUrl = (() => {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  try {
    const url = new URL(process.env.DATABASE_URL);
    return url.pathname.replace(/^\//, '') || null;
  } catch (error) {
    return null;
  }
})();

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

// Used for human-friendly error messages when the database cannot be reached.
const resolvedDatabaseName =
  poolConfig.database || databaseFromUrl || process.env.PGDATABASE || 'chat_app';

const pool = new Pool(poolConfig);

const app = express();
app.use(express.json());

// Allow the frontend (served from a different origin in local dev) to talk to the API.
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
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
  const result = await pool.query(
    `INSERT INTO users (username, password_hash)
     VALUES ($1, $2)
     RETURNING id, username`,
    [username, hashedPassword]
  );
  return result.rows[0];
}

async function findUserByUsername(username) {
  const result = await pool.query(
    `SELECT id, username, password_hash
     FROM users
     WHERE username = $1`,
    [username]
  );
  return result.rows[0] || null;
}

async function saveMessage({ chatId, senderId, content }) {
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
}

async function fetchRecentMessages(chatId, limit = MAX_CHAT_HISTORY) {
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

// Translate `pg` driver error codes into actionable API responses.
function mapDatabaseError(error) {
  if (!error || typeof error !== 'object') {
    return null;
  }

  const code = error.code;
  switch (code) {
    case '28P01':
      return {
        status: 500,
        message:
          'Database authentication failed. Verify your PostgreSQL username and password (PGUSER/PGPASSWORD).',
      };
    case '3D000':
      return {
        status: 500,
        message: `Database "${resolvedDatabaseName}" does not exist. Create it or update PGDATABASE.`,
      };
    case '57P03':
      return {
        status: 503,
        message: 'Database is not ready to accept connections. Ensure PostgreSQL is running and retry.',
      };
    default:
      break;
  }

  if (code === 'ECONNREFUSED') {
    return {
      status: 503,
      message: 'Unable to reach PostgreSQL. Confirm the service is running and accessible at the configured host/port.',
    };
  }

  if (code === 'ENOTFOUND') {
    return {
      status: 500,
      message: 'PostgreSQL host could not be resolved. Check the PGHOST setting.',
    };
  }

  if (code === 'ETIMEDOUT') {
    return {
      status: 503,
      message: 'Timed out while connecting to PostgreSQL. Verify network connectivity and server health.',
    };
  }

  return null;
}

function respondWithDatabaseError(res, error, fallbackMessage) {
  const mapped = mapDatabaseError(error);
  if (mapped) {
    return res.status(mapped.status).json({ error: mapped.message });
  }
  return res.status(500).json({ error: fallbackMessage });
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
    return respondWithDatabaseError(res, error, 'Failed to register user.');
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
    return respondWithDatabaseError(res, error, 'Failed to authenticate user.');
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
