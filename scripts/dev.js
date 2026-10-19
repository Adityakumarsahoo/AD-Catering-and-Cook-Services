import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('====================================================');
console.log('  AD CATERING AND COOK SERVICES - DEV RUNNER');
console.log('  Starting Backend (:5000) & Frontend (:3000)');
console.log('====================================================\n');

// 1. Launch Backend Service
const backendProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.resolve(__dirname, '..', 'backend'),
  stdio: 'inherit',
  shell: true,
});

// 2. Launch Frontend Client
const frontendProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.resolve(__dirname, '..', 'frontend'),
  stdio: 'inherit',
  shell: true,
});

function cleanExit() {
  console.log('\n[Dev] Shutting down development processes...');
  try {
    backendProcess.kill();
  } catch (_) {}
  try {
    frontendProcess.kill();
  } catch (_) {}
  process.exit(0);
}

process.on('SIGINT', cleanExit);
process.on('SIGTERM', cleanExit);
