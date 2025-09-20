# Tilli Software Website - Development Setup

## Server Configuration

### Recommended Development Server
**Use Node.js static server with npx serve:**
```bash
cd /Users/alisaberi/Data/0ProductBuild/TilliSoftwareWeb/Tilli-Software-Website
npx serve -l 8000
```

**Access the website at:** http://localhost:8000

### Why This Server?
- This is a Vercel project with serverless functions in `/api` directory
- Has `package.json` with Vercel dependencies
- Requires proper MIME types for modern JavaScript modules
- Simple Python HTTP server doesn't handle all requirements correctly

### Important Notes
1. **Vercel Dev Issue**: There's a recursive invocation issue with `vercel dev` due to package.json having `"dev": "vercel dev"`. This has been temporarily modified to prevent the recursion.

2. **API Functions**: The `/api/vtiger.js` serverless function won't work with the static server. For full API functionality, deploy to Vercel or fix the dev command.

3. **Alternative Servers** (if needed):
   - Python simple server (basic, no API): `python3 -m http.server 8000`
   - Custom Python server: `python3 server.py` (configured for port 8000)

## Project Structure
- **Static files**: HTML, CSS, JS files in root
- **API functions**: `/api/` directory (Vercel serverless)
- **Config files**: `vercel.json`, `package.json`

## Common Commands
- **Start server**: `npx serve -l 8000`
- **Kill server**: Use Ctrl+C or kill the process
- **Check port usage**: `lsof -i :8000`

## Testing
After starting the server, verify it's working:
```bash
curl http://localhost:8000
```

The server should serve the Tilli enterprise payment platform website.

## Product Naming Convention

**IMPORTANT**: The correct product name is `tilliArc` (not tilliArch)
- tilliX - Digital Engagement Portal
- Nudge - Intelligent Communications
- tilliPay - Payment Orchestration
- tilliArc - Document Archiving Platform

## Icon Usage Policy

### ALWAYS Use Inline SVGs for Icons
- **DO NOT** load external icon libraries (Lucide, Font Awesome, etc.)
- **DO NOT** use `<script src="https://unpkg.com/lucide@latest"></script>`
- **DO NOT** use `lucide.createIcons()` or similar library initialization

### How to Use Icons

1. **Always use inline SVG icons** for better performance and to avoid external dependencies
2. **Use the following CSS classes** for consistent icon styling:

```css
.icon-inline {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}
.icon-inline.icon-sm {
    width: 16px;
    height: 16px;
}
.icon-inline.icon-lg {
    width: 24px;
    height: 24px;
}
```

3. **Example of correct icon usage:**

```html
<!-- Check icon -->
<svg class="icon-inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
</svg>

<!-- Arrow right icon -->
<svg class="icon-inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-7-7m7 7l-7 7"></path>
</svg>
```

### Why This Approach?

1. **Performance**: Eliminates the need to load external libraries (100+ KB saved)
2. **Reliability**: No external dependencies that could fail to load
3. **Speed**: Icons render immediately without waiting for library initialization
4. **Control**: Full control over icon styling and behavior

### Common Lucide Icons as Inline SVGs Reference

When you need a Lucide icon, convert it to inline SVG format. Common icons:
- check-circle, arrow-right, credit-card, users, shield-check, clock, trending-up, quote, bell, user-plus, smartphone, dollar-sign, cpu, activity, message-circle, star, zap, x-circle, cookie
- tilli Arch is a mistake - it should be tilliArc