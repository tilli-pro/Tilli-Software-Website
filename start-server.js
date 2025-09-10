#!/usr/bin/env node

/**
 * Tilli Website Development Server
 * Default configuration: localhost:9000
 */

const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

// Global configuration - Default port 9000 for all developers
const GLOBAL_CONFIG = {
  PORT: process.env.PORT || 9000,
  HOST: process.env.HOST || 'localhost',
  ROOT_DIR: __dirname,
  INDEX_FILE: 'index.html'
};

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = `/${GLOBAL_CONFIG.INDEX_FILE}`;
  }
  
  const filePath = path.join(GLOBAL_CONFIG.ROOT_DIR, pathname);
  const ext = path.extname(filePath).toLowerCase();
  
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found - return 404
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>404 - Page Not Found | Tilli</title>
          <style>
            body { font-family: Inter, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #4099FF; }
            a { color: #4099FF; text-decoration: none; }
          </style>
        </head>
        <body>
          <h1>404 - Page Not Found</h1>
          <p>The requested page could not be found.</p>
          <p><a href="/">← Back to Tilli Home</a></p>
        </body>
        </html>
      `);
      return;
    }
    
    // Read and serve file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
        return;
      }
      
      const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
      
      // Set headers
      res.writeHead(200, {
        'Content-Type': mimeType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      
      res.end(data);
    });
  });
});

// Start server
server.listen(GLOBAL_CONFIG.PORT, GLOBAL_CONFIG.HOST, () => {
  console.log('🚀 Tilli Website Development Server Started!');
  console.log('=' .repeat(50));
  console.log(`📍 Server: http://${GLOBAL_CONFIG.HOST}:${GLOBAL_CONFIG.PORT}`);
  console.log(`📁 Root Directory: ${GLOBAL_CONFIG.ROOT_DIR}`);
  console.log(`⚙️  Default Port (Global): ${GLOBAL_CONFIG.PORT}`);
  console.log('=' .repeat(50));
  console.log('🌐 Available Pages:');
  console.log(`   • Home: http://${GLOBAL_CONFIG.HOST}:${GLOBAL_CONFIG.PORT}/`);
  console.log(`   • Pricing: http://${GLOBAL_CONFIG.HOST}:${GLOBAL_CONFIG.PORT}/pricing.html`);
  console.log(`   • About: http://${GLOBAL_CONFIG.HOST}:${GLOBAL_CONFIG.PORT}/about.html`);
  console.log(`   • Contact: http://${GLOBAL_CONFIG.HOST}:${GLOBAL_CONFIG.PORT}/contact.html`);
  console.log(`   • Developer: http://${GLOBAL_CONFIG.HOST}:${GLOBAL_CONFIG.PORT}/developer.html`);
  console.log('=' .repeat(50));
  console.log('📝 To stop server: Press Ctrl+C');
  console.log('');
  
  // Try to open browser automatically
  const open = () => {
    const start = process.platform === 'darwin' ? 'open' : 
                  process.platform === 'win32' ? 'start' : 'xdg-open';
    require('child_process').exec(`${start} http://${GLOBAL_CONFIG.HOST}:${GLOBAL_CONFIG.PORT}`);
  };
  
  setTimeout(open, 1000);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('\\n🛑 Server shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\\n🛑 Server interrupted. Shutting down...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});

// Export global config for other modules
module.exports = GLOBAL_CONFIG;
