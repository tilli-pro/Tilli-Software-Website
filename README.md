# Tilli Website - Development Guide

## 🚀 Quick Start

The Tilli website is configured to run on **localhost:9000** by default for all developers.

### Prerequisites
- Node.js 14+ installed
- Git (optional)

### Launch the Application

#### Method 1: Using npm scripts (Recommended)
```bash
# Install dependencies (first time only)
npm install

# Start development server on localhost:9000
npm start

# Or for development with live reload
npm run dev
```

#### Method 2: Using Node.js directly
```bash
# Start the custom server
node start-server.js
```

#### Method 3: Using http-server globally
```bash
# Install http-server globally (first time only)
npm install -g http-server

# Start server on port 9000
http-server . -p 9000 -o
```

## 🌐 Available URLs

Once the server is running, you can access:

- **Home Page**: http://localhost:9000/
- **Pricing Page**: http://localhost:9000/pricing.html
- **About Page**: http://localhost:9000/about.html
- **Contact Page**: http://localhost:9000/contact.html
- **Developer Portal**: http://localhost:9000/developer.html
- **Industries**: http://localhost:9000/industries.html
- **Product Pages**:
  - tilliX: http://localhost:9000/tillix.html
  - Nudge: http://localhost:9000/nudge.html
  - tilliPay: http://localhost:9000/tillipay.html

## ⚙️ Configuration

### Global Variables

The default port **9000** is configured in multiple places for consistency:

1. **package.json** - npm scripts use port 9000
2. **server.config.js** - Global server configuration
3. **dev.config.json** - Development environment settings
4. **start-server.js** - Custom Node.js server

### Environment Variables

You can override the default port using environment variables:

```bash
# Set custom port (temporary)
PORT=8080 npm start

# Set custom host
HOST=0.0.0.0 PORT=9000 npm start
```

### Configuration Files

- `package.json` - Main project configuration and scripts
- `server.config.js` - Server configuration with global variables
- `dev.config.json` - Development environment settings
- `start-server.js` - Custom Node.js development server

## 📁 Project Structure

```
tilli-website/
├── index.html              # Home page
├── pricing.html            # Pricing page (newly created)
├── about.html              # About page
├── contact.html            # Contact page
├── developer.html          # Developer portal
├── styles.css              # Main stylesheet
├── script.js               # Main JavaScript
├── package.json            # Project configuration
├── server.config.js        # Server global variables
├── dev.config.json         # Development config
├── start-server.js         # Custom development server
└── README.md               # This file
```

## 🛠️ Development Commands

```bash
# Start development server (port 9000)
npm start

# Start with live reload and cache disabled
npm run dev

# Start server without opening browser
npm run serve

# Check for any issues
npm test
```

## 🌍 Browser Support

The website supports all modern browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📞 Support

For development issues or questions:
- Check the browser console for errors
- Ensure port 9000 is not already in use
- Verify all HTML files are in the root directory

## 🔧 Troubleshooting

### Port Already in Use
If port 9000 is busy, you can:
1. Kill the process using port 9000
2. Use a different port: `PORT=8080 npm start`
3. Check what's using the port: `netstat -ano | findstr :9000` (Windows)

### Browser Not Opening
If the browser doesn't open automatically:
1. Manually navigate to http://localhost:9000
2. Check your default browser settings
3. Try using a different browser

### File Not Found Errors
Ensure all files are in the correct location:
- HTML files in root directory
- CSS/JS files properly linked
- Image paths correctly referenced

---

**Happy Coding! 🎉**

*Tilli Development Team*
