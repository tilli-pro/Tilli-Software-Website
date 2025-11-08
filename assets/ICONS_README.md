# Tilli Modern Icon Library

Modern Lucide-style SVG icons saved locally in `/assets/icons/` folder for better performance and no external dependencies.

## Available Icons

Currently created (20 icons):
- `check-circle.svg` - Check mark in circle
- `arrow-right.svg` - Right arrow
- `arrow-left.svg` - Left arrow
- `credit-card.svg` - Credit card
- `lock.svg` - Lock/security
- `zap.svg` - Lightning bolt
- `users.svg` - Multiple users
- `globe.svg` - World/globe
- `shield.svg` - Shield/protection
- `clock.svg` - Clock/time
- `dollar-sign.svg` - Dollar symbol
- `trending-up.svg` - Trending chart
- `smartphone.svg` - Mobile phone
- `bell.svg` - Notification bell
- `file-text.svg` - Document
- `mail.svg` - Email
- `settings.svg` - Settings gear
- `home.svg` - Home
- `bar-chart.svg` - Bar chart
- `loader.svg` - Loading spinner

## Usage Methods

### Method 1: Direct SVG File (Recommended)
```html
<img src="assets/icons/check-circle.svg" alt="check" class="icon-inline" style="width: 20px; height: 20px;">
```

### Method 2: Inline SVG (Best Performance)
```html
<svg class="icon-inline" style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"/>
  <path d="M9 12l2 2 4-4"/>
</svg>
```

### Method 3: JavaScript Helper (Dynamic)
Include the helper script:
```html
<script src="assets/icons.js"></script>
```

Then use in your code:
```javascript
// Create inline SVG
document.getElementById('myIcon').innerHTML = TilliIcons.create('check-circle', {
    width: '24',
    height: '24',
    color: '#10b981',
    className: 'my-icon'
});

// Or create img tag
document.getElementById('myIcon').innerHTML = TilliIcons.img('arrow-right', {
    width: '20px',
    height: '20px'
});
```

## CSS Helper Classes

Add to your CSS:
```css
.icon-inline {
    display: inline-block;
    vertical-align: middle;
}

.icon-sm {
    width: 16px;
    height: 16px;
}

.icon-md {
    width: 24px;
    height: 24px;
}

.icon-lg {
    width: 32px;
    height: 32px;
}
```

## Replacing Font Awesome Icons

### Old Way (Font Awesome):
```html
<i class="fas fa-check-circle"></i>
```

### New Way (Modern SVG):
```html
<img src="assets/icons/check-circle.svg" alt="check" class="icon-inline icon-md">
```

## Benefits

✅ **No External Dependencies** - No CDN or library loading
✅ **Better Performance** - Smaller file sizes, faster loading
✅ **Full Control** - Easy to customize colors, sizes
✅ **Modern Design** - Clean Lucide-style icons
✅ **Accessibility** - Proper alt text support
✅ **Consistent Style** - Uniform stroke width and design

## Next Steps

To complete the site-wide icon replacement:

1. **Identify all Font Awesome icons** (97 unique icons found across 29 pages)
2. **Create missing SVG icons** for icons not yet in library
3. **Replace systematically** page by page
4. **Remove Font Awesome** CDN link from all pages
5. **Test thoroughly** on all pages

### Pages Using Icons:
- index.html, demos.html, nudge.html, tillipay.html, tillix.html
- pricing.html, careers.html, contact.html, about.html
- calculator.html, case-studies.html, industries.html
- And 17 more pages...

### Most Common Icons to Create Next:
- phone, calendar, chart-line, users-plus, message-circle
- star, award, target, briefcase, code
- database, server, cloud, wifi, download
- And 75+ more...

## Quick Start Example

See `demos.html` for examples of inline SVG usage already implemented!
