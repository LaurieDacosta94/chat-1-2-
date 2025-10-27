#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/.. && pwd)"
cd "$ROOT_DIR"

if [ ! -d node_modules ]; then
  echo "Installing Node.js dependencies..."
  npm install
else
  echo "Dependencies already installed; skipping npm install."
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "Warning: psql is not available. Ensure PostgreSQL is running and accessible."
fi

cat <<'INSTRUCTIONS'
Local services are starting:
  - Backend: http://localhost:3001
  - Frontend: http://localhost:3000
Use Ctrl+C to stop both processes.
INSTRUCTIONS

npx concurrently \
  --kill-others-on-fail \
  "npm run start:backend" \
  "npm run start:frontend"
