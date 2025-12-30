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

---

## Recent Implementation Changes Log

### Hero Sections

#### Homepage Hero (index.html) - Aave-style Centered Layout
- **Layout**: Centered text on top, image below (NOT side-by-side)
- **Structure**:
  - CTA pill: Links to tillix.html, "Check out whats new with tilliX"
  - Title: 3rem font-size, 0.5rem margin-bottom
  - Subtitle: 1rem margin-bottom
  - Two buttons: "Book a Demo" (`btn btn-primary btn-icon`) + "Calculate ROI" (`btn btn-secondary`), both with `font-weight: 400`
  - Image: Uses `hero-visual` and `hero-image` classes with `margin-top: 1rem`
- **Container**: `max-width: 900px`, centered, `padding-top: 60px`
- **DO NOT**: Change image size with inline styles - use the CSS classes
- **DO NOT**: Make text bold - always use font-weight: 400
- Button: Gradient blue pill style

### Button Styling Standards (Site-wide)

**ALL buttons across the site must follow these styles:**

#### Primary Button (for hero sections and main CTAs)
- Class: `btn btn-primary btn-icon`
- Style: `font-weight: 400`
- Wrapper: Use `hero-actions` class for hero section buttons
- Structure: `<a/button class="btn btn-primary btn-icon" style="font-weight: 400;">Text <span class="arrow-circle">→</span></a/button>`
- Appearance: Gradient blue pill (linear-gradient from cyan to blue)

#### Secondary Button
- Class: `btn btn-secondary`
- Style: `font-weight: 400`
- Appearance: White/transparent with blue outline

**DO NOT:**
- Create custom button styles with inline gradients
- Use different button styles on different pages
- Make button text bold (always font-weight: 400)

#### Homepage Product Cards (index.html)
Product cards have Ramp.com-style CTAs with underlined text (arrow not underlined):
- **tilliX**: "See self-service in action →" → demos.html#tillix
- **Nudge**: "Engage customers smarter — view the demo →" → demos.html#nudge
- **tilliPay**: "See intelligent routing →" → demos.html#tillipay
- **tilliArc**: "Secure archiving, simplified →" → demos.html#tilliarc
- **XDEX**: "See the platform →" → demos.html#xdex

CTA styling:
- Text is underlined, arrow (→) is NOT underlined
- Color: #6B7280
- Font: Inter, 14px, weight 400
- Structure: `<span style="text-decoration: underline;">Text</span> <span>→</span>`

### Mobile Sizing Standards (styles.css)

All mobile sizes are defined in `styles.css` under "MOBILE SIZING STANDARDS" section.

#### Desktop (default)
| Element | Font Size | Dimensions |
|---------|-----------|------------|
| Banner text | 15px | height: 62px |
| Banner button | 10px | padding: 6px 12px |
| Sign Up button (.cta-button) | 14px | padding: 0.75rem 1.5rem |
| Hero buttons (.btn-primary, .btn-secondary) | 14px | width: 230px, height: 44px |

#### Tablet/Mobile (max-width: 768px)
| Element | Font Size | Dimensions |
|---------|-----------|------------|
| Banner text | 11px | min-height: 50px |
| Banner button | 9px | padding: 5px 10px |
| Sign Up button | 12px | padding: 0.5rem 1rem |
| Hero buttons | 12px | width: 160px, height: 38px |

#### Small Mobile (max-width: 480px)
| Element | Font Size | Dimensions |
|---------|-----------|------------|
| Banner text | 9px | single line (nowrap) |
| Banner button | 8px | padding: 3px 6px |
| Sign Up button | 11px | padding: 0.4rem 0.8rem |
| Hero buttons | 13px | width: 180px, height: 40px, stacked |

#### Mobile Section Headers (all breakpoints ≤768px)
All section headers must use consistent styling on mobile. This is defined in `styles.css` and automatically overrides ALL inline styles.

| Element Type | Font Size | Font Weight |
|--------------|-----------|-------------|
| Section headers (h2) | 24px | 400 |
| Card titles (h3) | 18px | 400 |
| Hero titles (h1) | 28px | 400 |

**Section header standard (24px):**
| Property | Value |
|----------|-------|
| Font family | Sora |
| Font size | 24px |
| Font weight | 400 |
| Line height | 1.3 |
| Color | #000000 |

**Hero titles (h1) - 28px selectors (auto-overrides inline styles):**
- `h1`, `h1[style*="font-size"]`
- `h1[style*="3rem"]`, `h1[style*="3.5rem"]`
- `h1[style*="52px"]`, `h1[style*="56px"]`, `h1[style*="48px"]`, `h1[style*="40px"]`
- `.hero h1`, `.hero-title`, `section h1`, `main h1`, `.page-title`

**Section headers (h2) - 24px selectors (auto-overrides inline styles):**
- `.section-heading`, `.section-title`
- `section h2`, `section h3.section-heading`
- `main h2`, `main h3`
- `h2[style*="font-size"]`, `h3[style*="font-size"]`
- `h2[style*="48px"]`, `h2[style*="42px"]`, `h2[style*="40px"]`, etc.
- `.about-section h2`, `.mission-section h2`, `.values-section h2`
- `.team-section h2`, `.careers-section h2`, `.features-section h2`
- `.products-section h2`, `.how-it-works h2`, `.fraud-protection h2`
- `.pricing-section h2`, `.faq-section h2`, `.contact-section h2`
- `.demo-section h2`, `.industry-section h2`, `.press-section h2`

**Card titles (h3) - 18px selectors:**
- `.product-card h3`, `.feature-card h3`, `.benefit-card h3`
- `.value-card h3`, `.job-card h3`, `.team-card h3`

**CSS Location:** `styles.css` under "MOBILE SECTION HEADERS" comment (around line 197)

**CRITICAL - DO NOT:**
- Add font-size overrides in inline `<style>` blocks on individual pages
- Use different mobile sizes on different pages
- Override section headers with `!important` in page-specific styles
- The global styles.css already uses `!important` to override inline styles

#### Nudge Hero (nudge.html)
- Images displayed in original shape (not circles)
- Proper headshots added (not placeholders)
- Top padding added for navbar spacing
- Button styling matches design
- Original subtitle verbiage restored

---

### Navigation / Navbar

#### Top Banner
- Gradient blue banner (linear-gradient 90deg, #4169E1 to #00BFFF)
- Text: "✨ See how much you could save with Tilli — calculate your ROI in 2 minutes."
- "Calculate now →" button with translucent white background, links to calculator.html
- Height: 62px, padding: 18px 20px
- All pages should include this banner to match homepage
- Updated across all 32 pages (December 2024)

#### Logo
- Use colored version of logo (not white): `Images/22_tilli_logo_color.png`
- Calculator page: Fixed invisible logo issue
- Consistent logo path across all pages

#### Scroll Behavior
- Navbar is FIXED on all pages
- Consistent scroll behavior across all pages
- On scroll: Adds `.scrolled` class for solid white background
- Background: Transparent at top, solid white when scrolled
- Z-index: Stays on top of all content
- script.js added to pages for scroll effect

#### Pages with Navbar Fixes
- Calculator page: Scroll effect and white background added
- Press page: Scroll behavior fixed
- Privacy policy page: Navbar fixed
- Terms and conditions page: Navbar fixed

#### Signup Button
- Underline removed from nav signup button

---

### Footer

#### Standard Footer Design
- All pages should use the footer from index.html as reference
- Logo: White version (`Images/22_Utilli_logo_white.png`)
- Background: Dark (#1f2937)
- Product name: "Monay" (not "Money")

#### Mobile Footer Layout (≤768px)
The mobile footer has a specific layout that must be consistent across all pages:

**Order of elements:**
1. **Logo + Description** (top) - Uses `.footer-brand.mobile-brand`
2. **Three columns** - Products | Company | Resources (side by side)
3. **Social icons + Copyright** - Same row, social left, copyright right
4. **Headquarters** - Centered, with address
5. **Platform status** - Under address
6. **Legal links** - Terms | Privacy | Cookies (centered)

**Required HTML structure:**
```html
<!-- Mobile: Brand section at top -->
<div class="footer-brand mobile-brand">
    <div class="footer-logo">
        <img src="Images/22_Utilli_logo_white.png" alt="Tilli Logo">
    </div>
    <p>Tilli is a comprehensive financial solutions platform...</p>
</div>

<div class="footer-bottom">
    <div class="footer-brand desktop-brand">...</div>
    <div class="footer-right">
        <div class="footer-social-copyright">
            <div class="footer-social">...</div>
            <p class="mobile-copyright">© 2024 — Copyright<br>All Rights reserved</p>
        </div>
        <div class="footer-headquarters">
            <h5>Headquarters</h5>
            <p>8260 Greensboro Dr,<br>Suite 270, McLean VA, 22102</p>
            <div class="footer-status">...</div>
        </div>
        <div class="footer-legal-links">
            <a href="#">Terms</a>
            <span class="separator">|</span>
            <a href="privacy-policy/">Privacy</a>
            <span class="separator">|</span>
            <a href="#">Cookies</a>
        </div>
    </div>
</div>
```

**CSS Classes:**
- `.footer-brand.mobile-brand` - Shown on mobile only
- `.footer-brand.desktop-brand` - Shown on desktop only
- `.footer-social-copyright` - Wrapper for social + copyright row
- `.mobile-copyright` - Copyright text for mobile
- `.footer-headquarters` - Address section with platform status
- `.footer-legal-links .separator` - Pipe separators between legal links

**Hidden on mobile:**
- Developers column (3rd)
- Get Started Today column (5th)
- Desktop brand section

**CSS location:** `styles.css` under "MOBILE FOOTER STYLES" section

---

### About Page (about.html)

#### Hero Section
- Updated hero image

#### Our Mission & What We Do Sections
- Redesigned layout

#### Quote Section
- White background
- Light blue italic text
- Sora font family
- No italic on certain elements

#### Section Titles
- Font-weight: 400 (regular, not bold)
- All h2 elements use weight 400

#### Leadership Team
- Headshots added and made bigger
- "More" button removed

#### Careers CTA Section
- Redesigned layout
- Space-between layout
- Heading wraps to exactly 2 lines
- 2rem font size for heading
- Reduced gap between text and button
- Button padding matches other buttons
- Font-weight: 400 for heading

#### Footer
- Replaced with correct design from index.html

---

### Signup Page (signup.html)

#### Layout
- Two-column design
- Breadcrumbs and header centered above columns
- Submit button outside form card border
- Left plan summary section: No borders/backgrounds

#### Default Content
- "Start Your Free Trial" heading when visiting directly
- "First 10,000 Tokens FREE" badge
- Benefits list: No credit card required, Cancel anytime, Setup in minutes, 24/7 support, Enterprise-grade security
- Link to pricing calculator

#### Form
- Checkmark circles removed from selection buttons
- Styling matches design system
- Pre-fill support via URL params and session storage

#### Background
- No gradient background (removed)

---

### Calculator Page (calculator.html)

#### Info Sections
- Background: White
- Text width constrained for consistent left alignment
- Decorative visual elements removed
- Duplicate buttons removed
- One sleek link at end (no fill, text with hover arrow animation)
- First section badge matches others

#### Number Animation
- Digital clock style rolling digit animation
- Smooth counting animation for values

#### Results Section
- Fixed uneven spacing
- No border or fill (clean like Ramp)

#### Calculator Hero Section
- Thin Sora font, regular weight
- Badge style elements
- Aave-style checkmark list (horizontal, small gradient checks, no circles)
- Gradient text elements
- Cleaner layout

#### Savings Card
- Clean white card with subtle shadow
- Gradient border (1px)
- Regular weight title with Sora font

#### Download Button
- Shorter text to fit
- nowrap and smaller font

---

### Pricing Page (pricing.html)

#### Auto-check Feature
- Card auto-checks when slider is moved

---

### Mobile Layout

#### Typography (Ramp-style)
- Section headings: 28px on mobile (48px on desktop)
- Larger, more readable sizes
- Text 3 size for smaller elements

#### Layout
- Stacked, left-aligned on mobile
- Tighter padding
- Service delivery section: Title above text on mobile

---

### OTP Verification Modal (nudge-otp.js)

The OTP verification modal is used to gate demo access on the homepage.

#### Features Implemented
1. **Verify button validation**:
   - The "Verify & continue" button starts DISABLED
   - Only enables when EXACTLY 6 digits are entered in the OTP field
   - Input field only allows numeric digits (non-digits are filtered out)
   - CSS styles for disabled state: gray background (#cbd5e1), cursor: not-allowed, opacity: 0.7

2. **Resend OTP link**:
   - A "Resend OTP" link appears BELOW the OTP input field and ABOVE the buttons
   - Link is hidden initially, only shows after OTP has been sent
   - Blue link color (#5B9EFF), underlines on hover
   - Clicking calls the sendOtp() function

3. **Dev mode bypass**:
   - On localhost (127.0.0.1 or localhost), the system bypasses the real API
   - Use code `123456` for testing
   - No actual email is sent in dev mode
   - Console logs show "[DEV MODE]" messages

#### Dev Mode Testing
When running on localhost:
- Enter any email address and click "Send OTP"
- Use code `123456` to verify
- No actual email is sent in dev mode

#### Production Mode
- OTP is sent via the Nudge API (`/api/nudge/send-otp`)
- Email comes from `tilli@nudge.net` with subject "Your Tilli Demo OTP"
- OTP expires in 5 minutes
- Requires `NUDGE_API_KEY` environment variable in Vercel
- OTP stored in Vercel KV (Upstash) with 5-minute expiry

---

### Calculator Page Sliders (calculator.html)

#### Slider Design Specifications
- **Track height**: 3px (using background-size: 100% 3px)
- **Track colors**: Blue (#4099FF) on left of thumb, gray (#E5E7EB) on right
- **Thumb size**: 20px diameter
- **Thumb style**: White background with 0.5px blue border (#4099FF)
- **No outline/glow**: Removed all blue borders, outlines, box-shadows from focus states

#### Value Label Specifications
- **Position**: Below the thumb (not above)
- **Arrow direction**: Points UP toward the thumb
- **Gap**: 40px between thumb and value label tag
- **Color**: Blue tag (#4099FF) with white text
- **Border radius**: 6px
- **Padding**: 4px 10px

#### Min/Max Labels
- **Position**: On LEFT and RIGHT sides of the slider track (not above/below)
- **Alignment**: Aligned with center of track (flex-start with margin-top: 2px)
- **Font**: 0.875rem, color #6b7280

#### Track Centering
- Track is CENTERED in the middle of the thumb
- Achieved using: height: 20px, background-size: 100% 3px, background-position: center

#### Thumb Offset Calculation
```javascript
const thumbOffset = 10 - (percentage * 0.2);
valueLabel.style.left = `calc(${percentage}% + ${thumbOffset}px)`;
```
This keeps the label centered on the thumb at all positions.

#### Linked Sliders (Business Logic - DO NOT CHANGE)
Some sliders are intentionally linked:
- `emails-available` ↔ `bill-adoption`: When one changes, the other updates proportionally
- This is intentional business logic, not a bug

---

### Cookie Banner (enhanced-cookie-banner.js)

#### Features
- Compact design positioned bottom-left (20px from edges)
- Max-width: 380px
- Border-radius: 12px
- Box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12)

#### Buttons
- "Accept all": Dark background (#1f2937), white text
- "Reject all": Light gray background (#f3f4f6), dark text
- "Manage preferences": Underlined link

#### Storage
- Uses localStorage (not cookies) for reliability
- Keys: `tilli_cookie_consent`, `tilli_cookie_preferences`
- Categories: Strictly Necessary (always on), Performance, Marketing

---

### Press Page (press.html)

#### Layout
- Redesigned to match blog card layout

#### Images
- Image containers show full images (not cropped)
- Correct blog title images added
- Placeholder images replaced with blog graphics

#### Typography
- Press release text uses Inter font

#### Footer
- Fixed to match standard footer from index.html
- Font Awesome icons replaced with inline SVGs
- Media contact buttons: Broken Lucide icons removed

---

### ROI Calculator Links

- Added to footer across site
- Added to industries pages with "Learn More" style

---

### Industry Search

#### Features
- Clear (X) button added to search input
- "No match" message displays when search has no results

---

### Demos Page (demos.html)

Interactive product demos showcasing tilliX, Nudge, and tilliPay.

#### Layout
- Demo tabs bar with product selector (tilliX Portal, Nudge Communications, tilliPay Payments)
- Content sections for each product demo
- Pre-Login Portal / Customer Dashboard toggle within tilliX demo

#### Header Spacing
- Demo tabs have `margin-top: 134px` to account for fixed header (62px banner + 72px nav)
- Sticky positioning with `top: 134px` when scrolling
- z-index: 99 to stay below navbar

#### Tab Behavior
- No scroll behavior when switching between demo tabs
- Content switches instantly without page movement
- `showDemo()` function handles tab switching

#### OTP Gating
- Page can be gated with `data-requires-demo-otp="true"` on body tag
- Currently DISABLED temporarily for testing
- When enabled, requires email/SMS OTP verification before viewing demos
- Uses `data-demo-guard` attribute on content sections

#### CSS Styles (in-page)
```css
.demo-tabs {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 0;
    margin-top: 134px;
    position: sticky;
    top: 134px;
    z-index: 99;
}
```

---

### Value-Based Pricing Page (valuebasedpricing.html)

#### Footer
- Fixed container background
- Fixed footer background

---

### Design System (styles.css)

#### Typography
- Section titles: font-weight 400 (regular)
- All h2 elements: font-weight 400
- Sora font for headings
- Inter font for body text
- Lato font for certain UI elements

#### Buttons
- Button text: font-weight 400 (regular)
- Gradient blue buttons: linear-gradient(135deg, #5B9EFF, #4080E0)
- Solid blue buttons: #2563eb or #325ef6
- Pill style: border-radius 9999px

#### Colors
- Primary blue: #4099FF, #5B9EFF, #2563eb, #325ef6
- Gray text: #6b7280, #4b5563
- Dark background: #1f2937
- Light gray: #E5E7EB, #f3f4f6

#### Layout
- overflow-x: hidden on html/body (prevents horizontal scroll)
- white-space: nowrap removed (was causing page overflow)

---

### Signup Page (signup.html) - Additional Details

#### Default Plan Summary
When visiting signup.html directly (without wizard configuration):
- Shows "Start Your Free Trial" heading
- "First 10,000 Tokens FREE" badge
- Benefits list: No credit card required, Cancel anytime, Setup in minutes, 24/7 support, Enterprise-grade security
- Link to pricing calculator at bottom

#### Pre-fill Support
- URL parameters: email, phone, firstName, lastName
- Session storage: verified_email, verified_phone (from OTP verification)

---

## Environment Variables (Vercel)

Required environment variables for production:
- `NUDGE_API_KEY`: API key for Nudge OTP service
- `VTIGER_ACCESS_KEY`: VTiger CRM access key
- `VTIGER_USER`: VTiger username
- `VTIGER_URL`: VTiger instance URL
- `KV_URL`: Vercel KV (Upstash) connection URL
- `KV_REST_API_URL`: Upstash REST API URL
- `KV_REST_API_TOKEN`: Upstash REST API token
- `KV_REST_API_READ_ONLY_TOKEN`: Upstash read-only token