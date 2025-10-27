#!/usr/bin/env node

const { existsSync } = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
process.chdir(rootDir);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

function runOrExit(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: isWindows,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
}

if (!existsSync(path.join(rootDir, 'node_modules'))) {
  console.log('Installing Node.js dependencies...');
  runOrExit(npmCmd, ['install']);
} else {
  console.log('Dependencies already installed; skipping npm install.');
}

const psqlCmd = isWindows ? 'psql.exe' : 'psql';
const psqlCheck = spawnSync(psqlCmd, ['--version'], { stdio: 'ignore' });

if (psqlCheck.status !== 0) {
  console.warn(
    '\n⚠️  PostgreSQL CLI (psql) was not detected. Make sure your database is running and accessible before logging in.'
  );
}

console.log(`\nLocal services are starting:
  • Backend:  http://localhost:3001
  • Frontend: http://localhost:3000

Use Ctrl+C to stop both processes.`);

const child = spawn(npmCmd, ['run', 'start:all'], {
  stdio: 'inherit',
  shell: isWindows,
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.exit(0);
  }

  process.exit(code ?? 0);
});
