// Tilli Website Server Configuration
// Default development server settings

const SERVER_CONFIG = {
  // Default port for all developers
  PORT: 9000,
  HOST: 'localhost',
  
  // Server options
  CORS: true,
  CACHE_CONTROL: 'no-cache',
  
  // Development settings
  OPEN_BROWSER: true,
  LIVE_RELOAD: true,
  
  // File serving options
  INDEX_FILE: 'index.html',
  FALLBACK_PAGE: 'index.html',
  
  // Security headers
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block'
  }
};

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SERVER_CONFIG;
}

// Global variable for browser environments
if (typeof window !== 'undefined') {
  window.TILLI_SERVER_CONFIG = SERVER_CONFIG;
}

console.log('Tilli Website - Development Server Configuration Loaded');
console.log(`Default Port: ${SERVER_CONFIG.PORT}`);
console.log(`Default Host: ${SERVER_CONFIG.HOST}`);
