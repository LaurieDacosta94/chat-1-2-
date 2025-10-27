# WhatsApp Clone (Full Stack Example)

A lightweight WhatsApp-style messaging interface with a companion Node.js + Socket.io backend. The frontend (vanilla HTML, CSS, JavaScript) remains deployable as a static site, while the backend provides user authentication, message persistence, and real-time delivery backed by PostgreSQL.

## Features

### Frontend
- 📱 **Responsive layout** that adapts from desktop to mobile sizes.
- 💬 **Dynamic chat list** with search, starring, and archiving capabilities.
- 🗂️ **Sidebar filters** to flip between all, starred, and archived chats with live counts.
- 🧠 **In-memory + localStorage persistence** so conversations survive page reloads (per browser).
- ✍️ **Message composer** supporting multiline input and keyboard shortcuts (`Enter` to send, `Ctrl/Cmd + K` to focus search).
- 📎 **Rich attachments** covering images, video, audio, and documents with inline previews and playback.
- 🔔 **Toast notifications** for key actions.
- 🟢 **Unread badges & manual toggles** to surface new activity and mark chats for follow-up.
- ⏱️ **Friendly timestamps & previews** that keep recent conversations surfaced.
- ✔️ **Message receipts** that auto-progress from sent → delivered → read.
- 📝 **Per-chat drafts** so you can pick up where you left off.
- 🎨 **Light & dark themes** with a quick settings modal.
- 🖼️ **Custom chat wallpapers** with theme-aware presets that persist per device.
- 😀 **Emoji picker** with dozens of reactions ready to drop into any message.
- 🔎 **In-chat search** to highlight keywords, jump between matches, and keep context focused.
- 📄 **One-click chat export** to download any conversation as a JSON transcript.

### Backend
- 🔐 User registration & login with bcrypt password hashing.
- 🛡️ JWT-based session token generation for lightweight authentication.
- 💾 PostgreSQL persistence for user profiles and chat messages.
- ⚡ Real-time messaging, chat history hydration, and typing indicators powered by Socket.io rooms.
- 🌐 Render-friendly configuration using environment variables (supports `DATABASE_URL` or discrete PG settings).

## Getting Started

### One-command local setup
To install dependencies and run both the backend API and the static frontend locally, use the Node-powered helper script (works on macOS, Linux, and Windows):

```bash
node scripts/setup-and-run.js
```

The script installs `node_modules` on first run and then serves the backend on port 3001 alongside the frontend on port 3000 using `http-server`.

> **Tip:** Ensure PostgreSQL is running locally and reachable via the environment variables described below before starting the script. On Windows PowerShell you can run the same command (`node scripts/setup-and-run.js`) without any additional tooling.

### Frontend
1. Open `index.html` in any modern browser to run the app locally.
2. To deploy on Render as a static site:
   - Create a new **Static Site**.
   - Point it at this repository (or upload the build artifacts).
   - Use `index.html` as the publish directory root.

### Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Provide environment variables (Render-compatible). For local development, create a `.env` file with:
   ```env
   PORT=3001
   DATABASE_URL=postgres://user:password@host:5432/chat_app
   JWT_SECRET=super-secret-key
   CORS_ORIGIN=http://localhost:3000
   ```
3. Initialize the database using the SQL in [`db/schema.sql`](db/schema.sql).
4. Start the server:
   ```bash
   npm run start
   ```
   The Express server listens on `/api/*` for REST endpoints and upgrades the same HTTP server to Socket.io for real-time events.

## API Overview

### REST Endpoints
- `POST /api/register` — Body: `{ "username": string, "password": string }`
  - Hashes the password and stores a new user record.
- `POST /api/login` — Body: `{ "username": string, "password": string }`
  - Validates credentials and returns `{ token, user }` on success.

All error responses follow `{ error: string }`.

### Socket.io Events
- `authenticate` — Payload: `{ token }`
  - Validates the JWT and associates the socket with the authenticated user. Emits `authenticated` or `authError`.
- `joinChat` — Payload: `{ chat_id }`
  - Joins the socket to the chat room and returns `{ chat_id, messages }` via `chatHistory` (last 50 messages).
- `sendMessage` — Payload: `{ chat_id, content, recipient_id?, recipient_ids? }`
  - Persists the message, broadcasts it to the room, and forwards to explicit recipients if supplied.
- `typing` — Payload: `{ chat_id, isTyping }`
  - Notifies other participants in the room via a `typing` event.

## Database Schema

The PostgreSQL schema lives in [`db/schema.sql`](db/schema.sql) and contains:
- `users` — Stores login credentials and profile metadata.
- `messages` — Stores chat messages with sender relationships and timestamps.

Run the file against your Render PostgreSQL instance to set up the tables and indexes.
