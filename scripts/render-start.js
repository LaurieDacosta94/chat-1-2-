#!/usr/bin/env node

const { existsSync } = require('fs');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
process.chdir(rootDir);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const psqlCmd = isWindows ? 'psql.exe' : 'psql';

// Render runs the build phase in a separate step from the start command. When this
// start script executes we double-check dependencies and the database schema before
// launching the long-lived Node process that keeps the service online.
const baseEnv = {
  ...process.env,
  npm_config_workspaces: 'false',
  npm_config_production: 'false',
};

function runOrExit(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: isWindows,
    env: baseEnv,
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
}

function ensureDependencies() {
  if (existsSync(path.join(rootDir, 'node_modules'))) {
    console.log('Dependencies already present. Skipping npm install.');
    return;
  }

  console.log('Installing npm dependencies (dev + production) for Render start...');
  runOrExit(npmCmd, ['install']);
}

function resolveDatabaseTarget() {
  const directUrl = typeof process.env.DATABASE_URL === 'string' ? process.env.DATABASE_URL.trim() : '';
  if (directUrl) {
    return { type: 'url', value: directUrl };
  }

  const requiredKeys = ['PGHOST', 'PGPORT', 'PGUSER', 'PGDATABASE'];
  const hasAll = requiredKeys.every((key) => typeof process.env[key] === 'string' && process.env[key].trim());
  if (hasAll) {
    return { type: 'env' };
  }

  return null;
}

function applyDatabaseSchema() {
  const schemaPath = path.join(rootDir, 'db', 'schema.sql');
  if (!existsSync(schemaPath)) {
    console.log('No schema file detected. Skipping database initialization.');
    return;
  }

  const psqlCheck = spawnSync(psqlCmd, ['--version'], { shell: isWindows });
  if (psqlCheck.status !== 0) {
    console.warn('psql is not available on this system; skipping schema application.');
    return;
  }

  const target = resolveDatabaseTarget();
  if (!target) {
    console.log('Database connection info not provided. Skipping schema application.');
    return;
  }

  const args = target.type === 'url' ? [target.value, '-f', schemaPath] : ['-f', schemaPath];

  console.log(`Applying database schema via ${psqlCmd}...`);
  runOrExit(psqlCmd, args);
}

function startBackend() {
  const startTarget = (process.env.RENDER_START_MODE || '').trim().toLowerCase();
  const defaultArgs = ['run', 'start:backend'];
  let selectedArgs = defaultArgs;

  if (startTarget === 'frontend') {
    selectedArgs = ['run', 'start:frontend'];
  } else if (startTarget === 'all') {
    selectedArgs = ['run', 'start:all'];
  }

  console.log(`Starting application via "npm ${selectedArgs.join(' ')}"...`);
  const child = spawn(npmCmd, selectedArgs, {
    stdio: 'inherit',
    shell: isWindows,
    env: baseEnv,
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.exit(0);
    }

    process.exit(code ?? 0);
  });
}

ensureDependencies();
applyDatabaseSchema();
startBackend();
