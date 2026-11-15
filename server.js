const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '8080', 10);
const ROOT_DIR = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  // Handle client error gracefully (prevent ECONNRESET crashes)
  req.on('error', () => {});
  res.on('error', () => {});

  let cleanUrl = req.url.split('?')[0].split('#')[0];
  try {
    cleanUrl = decodeURIComponent(cleanUrl);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }

  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  // Prevent directory traversal
  const safePath = path.normalize(path.join(ROOT_DIR, cleanUrl));
  if (!safePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h2>404 - File Not Found</h2><p>Could not locate <code>${cleanUrl}</code></p><a href="/">Go to Home</a> | <a href="/login.html">Login Portal</a></body></html>`);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(safePath);
    stream.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500);
      }
      res.end();
    });
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[ERROR] Port ${PORT} is currently in use by another application.`);
    console.error(`Please close any existing server instances or kill the process on port ${PORT}.\n`);
  } else {
    console.error('[ERROR] Server error:', err.message);
  }
  process.exit(1);
});

server.listen(PORT, () => {
  console.log('========================================================');
  console.log('  Mansala - Local Server Running');
  console.log('  Faculty of Science Students\' Union - Univ. of Ruhuna');
  console.log('========================================================');
  console.log(`\n  Local URL:        http://localhost:${PORT}/`);
  console.log(`  Staff Login:      http://localhost:${PORT}/login.html`);
  console.log(`  Admin Dashboard:  http://localhost:${PORT}/admin-dashboard.html`);
  console.log(`  Study Hub:        http://localhost:${PORT}/resources.html`);
  console.log(`  Projects & Relief:http://localhost:${PORT}/projects.html`);
  console.log('\n  Demo Login Credentials:');
  console.log('  - Administrator:   admin / admin');
  console.log('  - Science Coord:   cordinator1 / cordinator1');
  console.log('  - Maths Coord:     cordinator2 / cordinator2');
  console.log('\n  Press Ctrl+C to stop the server anytime.\n');
});
