# Tilli Software Website - AI Agent Instructions

## Project Type: Static Marketing Website

This is a **multi-page static website** for Tilli Software (tillisoftware.com), showcasing enterprise payment and digital engagement solutions. Built with vanilla HTML, CSS, and JavaScript - no build process, no frameworks.

**Core Purpose:** Drive enterprise leads for Tilli's platform (Nudge, tilliX, tilliPay, tilliArc) targeting utilities, insurance, telecom, government, and media sectors.

## Tech Stack

- **HTML5** - Semantic markup, multiple standalone pages
- **CSS** - Single stylesheet (`styles.css`), responsive design
- **JavaScript** - Vanilla JS in `script.js`, no frameworks
- **Server:** Node.js `npx serve -l 8000` (preferred) or Python SimpleHTTPServer
- **API Functions:** Vercel serverless in `/api/` (currently `vtiger.js` for CRM integration)
- **Deployment:** Vercel with custom domain

## File Structure Patterns

### Page Organization:
```
index.html (Home)
├── nudge.html, tillix.html, tillipay.html (Products)
├── industries.html, education.html (Solutions)
├── pricing.html, calculator.html (Commercial)
├── about.html, contact.html, developer.html (Company)
└── blog.html, case-studies.html (Resources)
```

### Asset Organization:
```
Images/ (shared assets)
├── Tilli Home Page/Logo.png (site logo)
├── Developer page/ (page-specific images)
└── [Various product/industry images]

styles.css (single global stylesheet)
script.js (shared behavior)
```

### Key Pages & Their Purpose:

**Home (`index.html`):**
- Hero section with primary CTA (Book a Demo)
- Service delivery visualization
- Product cards (tilliX, Nudge, tilliPay)
- Industry carousel (Banking, SaaS, Insurance, etc.)
- Impact metrics band
- Lead capture form

**Product Pages:**
- `nudge.html` - Intelligent communications (SMS, email, voice, WhatsApp)
- `tillix.html` - Digital engagement portal
- `tillipay.html` - Payment orchestration
- Each follows pattern: Hero → Features → Use Cases → CTA

**Industry Pages:**
- `industries.html` - Overview with category grid
- `education.html` - Education sector specifics
- Pattern: Pain points → Solutions → Proof points

**Commercial:**
- `pricing.html` - Plan cards (needs real content, currently lorem ipsum)
- `calculator.html` - ROI/savings calculator with 4-step form
- `contact.html` - Sales contact form with validation

**Resources:**
- `blog.html` - Blog landing with filters, featured posts
- `case-studies.html` - Customer success stories (needs content)
- `developer.html` - Developer portal with code examples

## Critical Conventions

### 1. Icon Policy: ALWAYS Use Inline SVGs

**DO NOT load external icon libraries** (Lucide, Font Awesome, etc.)

**Correct Pattern:**
```html
<svg class="icon-inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
</svg>
```

**CSS Classes:**
- `.icon-inline` - Base class (20x20px)
- `.icon-inline.icon-sm` - Small (16x16px)
- `.icon-inline.icon-lg` - Large (24x24px)

**Why:** Performance (no external dependencies), reliability, immediate rendering.

### 2. Product Naming Convention

**CRITICAL:** The correct product name is `tilliArc` (NOT tilliArch)

**All Products:**
- **Nudge** - Intelligent Communications
- **tilliX** - Digital Engagement Portal
- **tilliPay** - Payment Orchestration
- **tilliArc** - Document Archiving Platform (not tilliArch!)

### 3. Navigation & Header Consistency

**Current State:** Navigation varies across pages (some use anchors, some use page links)

**Standard Pattern:**
```html
<nav class="nav-menu">
    <a href="index.html">Home</a>
    <a href="#products">Products</a>  <!-- Dropdown or section -->
    <a href="industries.html">Industries</a>
    <a href="pricing.html">Pricing</a>
    <a href="contact.html">Contact</a>
</nav>
```

**Logo Path:** Should be standardized to `Images/Tilli Home Page/Logo.png` or use a single `/logo.png` in root.

**Footer:** Use standard company address: `8260 Greensboro Dr, Suite 270, McLean, VA 22102`

### 4. Form Handling Pattern

**Contact/Lead Forms** (see `contact.html` and `script.js`):
```javascript
// Form validation
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Validate required fields
    // Show loading state
    // Submit to backend/CRM
    // Display toast notification
    // Reset form
});
```

**Common Pattern:**
- Client-side validation before submit
- Toast-style notifications (`.toast` class in CSS)
- Simulated async behavior (currently no real backend)

### 5. Animation & Scroll Effects

**Scroll-triggered animations** via IntersectionObserver in `script.js`:
```javascript
// Elements with class `.scroll-fade-in` animate on viewport entry
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});
```

**Sticky header** effect on scroll (changes opacity and shadow)

**Smooth scrolling** for in-page anchor links

### 6. Carousel Implementation

**Two carousel types:**
1. **Industry carousel** (Home page) - Auto-play with manual controls
2. **Editor's picks carousel** (Blog page) - Auto-play blog cards

**Pattern:**
```javascript
function initCarousel() {
    // Update carousel position
    // Auto-advance every 5 seconds
    // Manual prev/next buttons
    // Wrap around at boundaries
}
```

### 7. Calculator Logic (`calculator.html`)

**4-step guided form:**
1. Industry selection
2. Volume estimation (users, transactions, etc.)
3. Current stack (which tools they use now)
4. Results (estimated savings)

**Key Behavior:**
- Step navigation with validation
- Dynamic cost calculation based on selections
- "Download PDF" currently shows alert (placeholder)
- Results show comparison: Current Cost vs. Tilli Cost

**Files:**
- HTML: `calculator.html`
- Logic: Inline `<script>` in calculator.html
- Styling: `styles.css`

## Common Development Tasks

### Adding a New Page:
1. Copy structure from similar page (e.g., `nudge.html` for product pages)
2. Update `<title>` and meta tags
3. Ensure consistent header/footer navigation
4. Link logo to `index.html`
5. Add page-specific content in main section
6. Test responsive breakpoints (mobile, tablet, desktop)

### Adding a New Section to Home:
1. Add section after appropriate existing section
2. Use semantic HTML: `<section class="section-name">`
3. Add heading with `<h2>` or `<h3>`
4. Use grid/flex layouts defined in `styles.css`
5. Add scroll animation: `class="scroll-fade-in"`

### Updating Pricing Plans:
1. Edit `pricing.html` plan cards
2. Replace lorem ipsum with real features
3. Update comparison table
4. Ensure CTA buttons link correctly (likely to `contact.html` or `signup.html`)

### Adding Images:
1. Place in appropriate folder (`Images/` or page-specific folder)
2. Use descriptive filenames
3. Add `alt` text for accessibility
4. Consider adding `loading="lazy"` for performance
5. Optimize: Use WebP format when possible

### Form Integration:
**Current:** Forms show toast notifications, no real backend

**To integrate with CRM:**
1. Update form action in `script.js`
2. Send to `/api/vtiger.js` (Vercel function) or external endpoint
3. Handle success/error responses
4. Update toast messages accordingly

**Contact form location:** `contact.html` (lines ~450-550)

## Responsive Design Breakpoints

Defined in `styles.css`:
- **Desktop:** > 1024px
- **Tablet:** 768px - 1024px
- **Mobile:** < 768px

**Mobile menu** pattern:
- Hamburger icon at `< 768px`
- Slide-out navigation
- JavaScript toggle in `script.js`

## Server Setup

### Recommended Development Server:
```bash
cd /Users/alisaberi/Data/0ProductBuild/TilliSoftwareWeb/Tilli-Software-Website
npx serve -l 8000
```
Access at: http://localhost:8000

### Alternative (if needed):
```bash
python3 -m http.server 8000
```

**Why `npx serve`?**
- Proper MIME types for JavaScript modules
- Compatible with Vercel serverless functions in `/api/`
- Simpler than `vercel dev` (which has recursive invocation issues)

### Port Management:
- Default: 8000
- Check usage: `lsof -i :8000`
- Kill process: `lsof -ti:8000 | xargs kill -9`

## Integration with MainNudgeNet

**Signup Flow:**
1. User fills form on `signup.html` (this website)
2. Form submits to Auth Service: `POST http://localhost:3100/api/auth/signup/unified`
3. Auth Service creates account and returns JWT token
4. Website redirects to: `http://localhost:4200/welcome?token=XXX`
5. Portal validates token and logs user in

**Files Involved:**
- `signup.html` - Signup form (check for correct API endpoint)
- `script.js` or inline script - Form submission logic

**API Endpoints (when connecting to MainNudgeNet):**
- Auth Service: `http://localhost:3100` (dev) or `https://auth.tillisoftware.com` (prod)
- Nudge Portal: `http://localhost:4200` (dev) or `https://nudge.tillisoftware.com` (prod)

## Content Guidelines

### Messaging Hierarchy:
1. **Primary audience:** Enterprise decision-makers (VP/Director of Customer Experience, CFO, CTO)
2. **Key industries:** Utilities, Insurance, Media/Telecom, Government, Healthcare
3. **Value props:** Cost reduction (42%), faster payments (7 days DSO), higher adoption (68%)

### Tone:
- **Professional but approachable**
- **Data-driven** (use specific metrics)
- **Enterprise-focused** (not SMB language)
- **Problem → Solution pattern**

### CTA Priority:
1. "Book a Demo" (primary)
2. "Calculate Your Savings"
3. "Start a Pilot"
4. "Contact Sales"

## Known Issues & TODOs

### Content Gaps:
- **Pricing page:** Plan descriptions are lorem ipsum (needs real content)
- **Case studies page:** Exists but needs actual customer stories
- **Resources hub:** No dedicated landing page yet (links go to `#resources`)
- **Blog content:** Template exists, needs real articles

### Technical Gaps:
- **Favicon:** Add proper favicon files
- **Logo path:** Inconsistent across pages (standardize)
- **Placeholder links:** Several footer links point to `#` (Security, Trust Center, API Reference)
- **PDF generation:** Calculator PDF download is placeholder alert

### Navigation Inconsistencies:
- Some pages use `#pricing` anchor, others link to `pricing.html`
- `#resources` anchor doesn't exist on Home page
- Free Trial links vary: `Free Trail/index.html` vs `free-trial.html`

### Performance Optimizations Needed:
- Convert heavy images to WebP
- Add `loading="lazy"` to images
- Minify CSS/JS for production
- Add service worker for offline support (future)

## Testing Checklist

Before deploying changes:
- [ ] Test all navigation links (no broken links)
- [ ] Verify responsive design on mobile/tablet/desktop
- [ ] Check forms submit correctly (show toast notifications)
- [ ] Validate all images load with correct alt text
- [ ] Test carousel auto-play and manual controls
- [ ] Verify calculator logic produces correct results
- [ ] Check cross-browser compatibility (Chrome, Safari, Firefox)
- [ ] Validate HTML/CSS (no console errors)
- [ ] Test page load speed (< 3 seconds)

## SEO & Analytics (Future)

**Planned but not implemented:**
- Google Analytics (GA4)
- Schema.org markup for rich snippets
- Open Graph tags for social sharing
- XML sitemap (basic `sitemap.xml` exists)
- `robots.txt` (exists, may need updates)

**Meta Tags Pattern:**
```html
<title>Page Title - Tilli Software</title>
<meta name="description" content="Brief page description">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Brief page description">
<meta property="og:image" content="/Images/og-image.png">
```

## Deployment

**Platform:** Vercel
**Domain:** tillisoftware.com
**Config:** `vercel.json` and `package.json` present

**Deployment Command:**
```bash
vercel --prod
```

**Environment Variables:** Set in Vercel dashboard (for `/api/vtiger.js` function)

## Common Pitfalls

1. **Icon libraries** - Never use external libraries, always inline SVGs
2. **Product naming** - It's `tilliArc`, not `tilliArch`
3. **Server choice** - Use `npx serve`, not Python server (for API functions)
4. **Logo paths** - Multiple logo locations, standardize before deploying
5. **Navigation consistency** - Ensure all pages have identical header/footer
6. **Mobile testing** - Always test hamburger menu and mobile layouts
7. **Form submission** - Currently no backend, needs CRM integration
8. **Anchor links** - `#resources` and `#pricing` may not exist on target pages

## Key Documentation

- `/README.md` - Comprehensive site overview and content gap analysis
- `/CLAUDE.md` - AI agent guidance (includes icon policy)
- `/requirements.md` - Original site requirements and specifications
- `/SEO_SUBMISSION_GUIDE.md` - SEO optimization guide
- `/VTIGER_SETUP.md` - CRM integration documentation

## When to Use What

**Adding marketing content** → Edit HTML pages directly
**Updating styles** → Modify `styles.css` (single global stylesheet)
**Adding behavior** → Update `script.js` (or inline scripts for page-specific logic)
**Integrating with CRM** → Update `/api/vtiger.js` or create new Vercel function
**Changing navigation** → Update header/footer in each HTML file (no templating)
**Adding blog post** → Add card to `blog.html` (static, no CMS)

## Success Metrics

**Performance Goals:**
- Page load: < 3 seconds
- Lighthouse score: > 90
- Mobile-friendly: Yes (responsive design)

**Business Goals:**
- Increase enterprise demo requests
- Drive qualified leads to sales team
- Position Tilli as enterprise payment platform leader
- Target industries: Utilities, Insurance, Telecom, Government
