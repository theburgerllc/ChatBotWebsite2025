const { spawn } = require('child_process');
const path = require('path');

console.log('Starting Next.js debug test...');
console.log('Node version:', process.version);
console.log('Current directory:', process.cwd());

const nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');
console.log('Next.js binary path:', nextBin);

const child = spawn('node', [nextBin, 'dev'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

child.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
});

child.on('exit', (code, signal) => {
  console.log(`Next.js exited with code ${code} and signal ${signal}`);
});
