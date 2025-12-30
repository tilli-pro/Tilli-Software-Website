### Tilli Software Website

A static multi-page marketing website showcasing Tilli’s products and industry solutions. Built with HTML, CSS, and vanilla JavaScript. This README captures the current state of the site, its information architecture, section inventory, and a content-focused gap analysis against `requirements.md`, followed by an actionable to-do list to close mismatches while preserving the existing design.

---

### Local development

- Open a terminal in the project root and run:
```bash
python3 -m http.server 9000
```
- Visit: `http://localhost:9000`

---

### Tech stack
- HTML5, CSS (single design system in `styles.css`), vanilla JS (`script.js`)
- No build step, static assets only

---

### Recent Updates (December 2024)

#### Top Banner
- Updated across all 32 pages
- Text: "✨ See how much you could save with Tilli — calculate your ROI in 2 minutes."
- CTA: "Calculate now →" linking to `calculator.html`
- Gradient blue background (#4169E1 to #00BFFF)

#### Homepage Product Cards
Product cards now have Ramp.com-style CTAs with underlined text (arrow not underlined):
- **tilliX**: "See self-service in action →" → `demos.html#tillix`
- **Nudge**: "Engage customers smarter — view the demo →" → `demos.html#nudge`
- **tilliPay**: "See intelligent routing →" → `demos.html#tillipay`
- **tilliArc**: "Secure archiving, simplified →" → `demos.html#tilliarc`
- **XDEX**: "See the platform →" → `demos.html#xdex`

#### Demos Page
- Interactive product demos at `demos.html`
- Tab-based navigation for tilliX, Nudge, tilliPay
- Pre-login portal and customer dashboard toggles

---

### Top-level pages
- `index.html` (Home)
- `tillix.html` (Product: tilliX)
- `nudge.html` (Product: Nudge)
- `tillipay.html` (Product: tilliPay)
- `industries.html` (Industries overview)
- `calculator.html` (Savings/ROI Calculator)
- `pricing.html` (Pricing)
- `about.html` (Company)
- `contact.html` (Contact / Sales)
- `developer.html` (Developers overview)
- `blog.html` (Blog landing)
- `free-trial.html` (Free trial)

---

### Global navigation and footer (observed)
- Header navigation varies per page. Common links include:
  - Products (anchor or links to product pages)
  - Industries (`industries.html`)
  - Resources (often anchor `#resources`, section not present on Home)
  - Company (`about.html`)
  - Pricing (sometimes anchor `#pricing` on Home, sometimes `pricing.html`)
  - Contact (`contact.html` CTA)
- Footers vary across pages and contain different sets of links. Several links are placeholders (`#`) or point to pages that don’t exist yet (e.g., Documentation, SDKs, API Reference, Trust Center, Security).
- Logo path is inconsistent across pages.

---

### Section inventory (high level)

- Home (`index.html`)
  - Header/nav
  - Hero (headline, subhead, dual CTA)
  - Trusted By
  - Service Delivery (platform intro + visual)
  - Products: tilliX and Nudge cards with CTAs
  - tilliPay feature strip
  - Industry Solutions carousel
  - Why Tilli (feature grid)
  - Fraud Protection (3-step cards)
  - Impact Metrics (metrics grid)
  - Lead Capture (request demo form)
  - Footer (multi-column links, social, legal)

- Product pages
  - `tillix.html`: Hero, platform intro, “Built to Simplify How You Work” (3 features), comparison (tilliX vs old way), accessibility/device showcase, why teams choose, CTA, impact metrics, footer
  - `nudge.html`: Hero, tools grid (Omni Focus, Workspaces, Progress Visualization, Nudges, Prioritization), delivery + integrations, engage smarter (capabilities), data & insights (use cases), simplify work (3 features), CTA, footer
  - `tillipay.html`: Hero, all-in-one payments highlights, checkout experience, industry use cases, proof & value, why choose tilliPay, lead capture, footer

- Industries (`industries.html`)
  - Hero, overview, industry categories grid (Banking & Finance, SaaS, Insurance, Usage-based, Public Sector, Utilities, Rentals, IT, Telecom, Education, Memberships, Gaming, Media), CTA, footer

- Pricing (`pricing.html`)
  - Pricing hero, 3 plan cards (descriptions currently lorem ipsum), trusted by, comparison table (placeholder content), savings CTA, customer-centric cards, assurance, CTA banner, footer

- Calculator (`calculator.html`)
  - Guided 4-step form, results panel, informational sections; JS computes simplified estimates; PDF download is a placeholder alert

- Company/About (`about.html`)
  - Hero, value pillars, split vision, mission, quote, story, leadership, timeline, careers CTA, engagement cards, footer

- Contact (`contact.html`)
  - Sales contact pitch + form with basic client-side validation; required checkboxes for validations; footer

- Developers (`developer.html`)
  - Hero with code preview, building blocks, quick access tiles, key features (integrated payments, messaging, dev-first payments), helpful links, footer

- Blog (`blog.html`)
  - Independent header style and CSS sectioning; featured post, filters, articles grid, newsletter, editor’s picks carousel, footer

---

### Scripted behaviors (`script.js`)
- Sticky header scroll effect
- Smooth-scrolling for in-page anchors
- Industry carousel + blog editor’s carousel (autoplay + controls)
- Form handling (contact/newsletter) with simulated async and toast-style notifications
- Scroll-triggered animations via IntersectionObserver
- Lazy-loading helper based on `img[data-src]` (not utilized by current markup)
- Mobile menu toggle and accessibility enhancements (keyboard focus styles)

---

### Requirements vs. current implementation (content-focused)
For each item, “Status” reflects the live code; “Action” is content-only unless otherwise noted.

- Navigation Structure (Home, Solutions: Nudge/tilliX/tilliPay, Industries: Utilities/Insurance/Media & Telecom/Government/Healthcare, Results/Case Studies, ROI Calculator, Pricing, Resources, About, Contact)
  - Status: Most items exist as pages. Missing dedicated pages: Results/Case Studies, Resources (landing). Header links inconsistent (anchors vs pages). Some anchors point to non-existent sections on Home.
  - Action: Unify header across pages; link `Pricing` to `pricing.html`; replace `#resources` with a Resources landing or remove until built; add Results/Case Studies page (or remove dead links); keep Developers under Resources.

- Hero copy (requirements: “Cut billing costs. Get paid faster.”)
  - Status: Home hero uses “Smarter Financial Solutions for Every Industry.”
  - Action: Decide on final messaging; align hero headline/subhead with requirements or update requirements to match current positioning.

- Impact band (requirements: 42% cost reduction, 68% adoption, $2.5B+ processed, 7 days DSO)
  - Status: Home shows different metrics (e.g., 215+, 40%, 2M+). Product pages have various metrics.
  - Action: Replace with requirement metrics or rationalize final KPI set; ensure consistency site-wide.

- Solutions band (Nudge, tilliX, tilliPay)
  - Status: Present across Home and product pages.
  - Action: Ensure consistent positioning statements and cross-links.

- Industries (Utilities, Insurance, Media & Telecom, Government/SLED, Healthcare)
  - Status: Industries page exists with broader set; Education page referenced separately.
  - Action: Ensure required five are prominent; add links/anchors; keep extras as secondary.

- How It Works (Connect Your Data → Orchestrate Journeys → Present & Pay)
  - Status: Not present as a single narrative section on Home.
  - Action: Add a 3-step “How it works” content section to Home (content-only, reuse existing card patterns).

- Security & Compliance (SOC2 II, PCI DSS L1, HIPAA, ISO 27001, encryption)
  - Status: Badges/mentions appear in some footers; no dedicated section.
  - Action: Add a compact “Security & Compliance” content block on Home or Resources; link to details page later.

- Core CTAs (Get Your ROI Report, Book a Demo, Start a Pilot, Calculate Your Savings)
  - Status: Book a Demo and Calculate Your Savings exist; “Get Your ROI Report” and “Start a Pilot” do not.
  - Action: Add/align CTAs where appropriate (e.g., Pricing/Calculator/Contact pages) or adjust requirements.

- ROI Calculator (interactive, PDF generation, CRM integration)
  - Status: Interactive steps exist; PDF generation shows alert; no CRM integration.
  - Action: Content: add copy explaining methodology and outcomes. Functional notes captured below for future (non-content) work.

- Resources (Blog, Guides, Webinars, Product Docs, API Reference)
  - Status: Blog exists. Documentation/API links in footers are placeholders. No Resources hub.
  - Action: Create a Resources landing or remove placeholder links until available; group Developers under Resources.

- Results/Case Studies
  - Status: Missing.
  - Action: Add a basic landing with 3–6 case study cards (content-only for now).

- Pricing
  - Status: Page exists; plan descriptions use lorem ipsum; feature comparison is placeholder.
  - Action: Replace with real plan descriptions, features, and qualifiers; add billing/legal disclaimers.

- Blog
  - Status: Standalone design; content references may need editorial alignment.
  - Action: Unify header/footer nav with the rest of the site; align categories with target content strategy.

- Dark/Light Mode (noted in requirements)
  - Status: Not implemented.
  - Action: Update requirements (defer) or add a small “theme toggle coming soon” note in Resources (content-only).

- Image optimization & lazy loading
  - Status: CSS constraints exist; lazy loader expects `img[data-src]` but markup uses `src`.
  - Action: Content/markup sweep: convert heavy images to WebP and apply `loading="lazy"`; optional: switch to `data-src` pattern progressively.

- Analytics, CRM, Schema, SEO
  - Status: Not present.
  - Action: Content-only note in README and Resources; keep placeholders out of UI until integrated.

- Favicon
  - Status: 404 observed for `/favicon.ico` in dev logs.
  - Action: Add a favicon and `<link rel="icon" ...>` in `<head>` of all pages.

- Addresses and legal
  - Status: Mixed placeholders (e.g., “123 Business District”) vs real address (“8260 Greensboro Dr …”).
  - Action: Standardize on the real address across all footers.

- Logo path & alt text
  - Status: Paths vary: `Developer page/Logo.png`, `Tilli Home Page/Logo.png`, base64 placeholder. Alt text OK.
  - Action: Standardize a single logo asset path and update all headers/footers.

- Link consistency
  - Status: Several `#` placeholders and inconsistent `Free Trial` links (e.g., `Free Trail/index.html` vs `free-trial.html`).
  - Action: Normalize links; remove placeholders or route to a holding page.

---

### Content-focused to-do list (prioritized)
0) Update Home hero copy — Completed
- Title: “Transform Billing and Payments into Seamless Digital Engagement”
- Subtitle: “Large Enterprises - Utilities, insurers, Media, Telcos and governments choose Tilli for e-billing, notifications, and secure payments. Designed to cut costs, reduce delinquencies, and boost customer satisfaction.”

1) Unify global navigation across all pages — Completed
- Replace anchor `#pricing` with `pricing.html` in headers
- Replace `#resources` with a Resources hub (or remove until created)
- Ensure `Products`, `Industries`, `Company`, `Pricing`, `Contact` appear consistently

2) Standardize logo and address
- Use a single logo asset path and update all headers/footers
- Standardize HQ address to: 8260 Greensboro Dr, Suite 270, McLean, VA 22102

3) Fix broken/placeholder links
- Add favicon and `<link rel="icon" …>` to all pages
- Normalize Free Trial links to `free-trial.html`
- Remove or stub `#` links (Documentation, SDKs, API, Trust Center, Security) until pages exist

4) Add missing content pages/sections
- Resources landing page (hub for Blog, Guides, Webinars, Docs)
- Results/Case Studies landing with 3–6 cards (titles, short blurbs)
- “How It Works” 3-step section on Home (content-only)
- Compact Security & Compliance section on Home (badges + short copy)

5) Align hero and KPI messaging with requirements
- Decide on final Home hero headline/subhead and apply consistently
- Replace Impact band metrics with requirement KPIs or harmonize the KPI set

6) Pricing page content
- Replace lorem ipsum with real plan descriptions & feature lists
- Clarify usage-based components, WhatsApp categories, and limitations
- Add legal notes/disclaimers if relevant

7) Calculator content clarifications
- Add microcopy explaining assumptions and data sources
- Replace alert with a note that “PDF report available upon request” (content) until tech is ready

8) Blog alignment
- Unify header/footer with global navigation
- Ensure categories map to content strategy (e.g., Security & Compliance, Digital Payments, Utilities, Fintech, Automation)

9) Imagery & performance sweeps (content/markup)
- Add `loading="lazy"` to images
- Convert heavy images to WebP (keep filenames/design intact)

10) Housekeeping
- Add `README` run instructions (done)
- Add `robots.txt` and `sitemap.xml` (content-only stub acceptable for now)

---

### Notes on out-of-scope (non-content) items to defer
- Dark/Light theme toggle (JS + design tokens)
- CRM (HubSpot) form integration and GA4/heatmap
- Calculator PDF generation and gated downloads
- Service worker/offline support

---

### Quick reference
- Design system: `styles.css`
- Behavior: `script.js`
- Assets: `Images/` and various per-page folders
- Pages: see Top-level pages list above

---

## Recent Implementation Changes

### Hero Sections

#### Homepage Hero - Aave-style Centered Layout
- **Layout**: Centered text on top, image below (NOT side-by-side)
- **Structure**:
  - CTA pill: Links to tillix.html, "Check out whats new with tilliX"
  - Title: 3rem font-size, 0.5rem margin-bottom
  - Subtitle: 1rem margin-bottom
  - Two buttons: "Book a Demo" (primary) + "Calculate ROI" (secondary), both font-weight: 400
  - Image: Uses `hero-visual` and `hero-image` classes with `margin-top: 1rem`
- **Container**: `max-width: 900px`, centered, `padding-top: 60px`
- **DO NOT**: Change image size with inline styles - use the CSS classes
- **DO NOT**: Make text bold - always use font-weight: 400

### Button Styling Standards (Site-wide)

**ALL buttons must follow these styles:**

#### Primary Button (hero sections, main CTAs)
- Class: `btn btn-primary btn-icon`
- Style: `font-weight: 400`
- Wrapper: `hero-actions` class for hero buttons
- Appearance: Gradient blue pill (cyan to blue)

#### Secondary Button
- Class: `btn btn-secondary`
- Style: `font-weight: 400`
- Appearance: White with blue outline

**DO NOT** create custom button styles or use different styles on different pages.

### Mobile Section Headers (≤768px)
All section headers use consistent styling on mobile:
- **Font**: Sora, 24px, weight 400
- **Line height**: 1.3
- **Color**: #000000

Applies to all `.section-heading`, `.section-title`, and `section h2` elements.

#### Nudge Hero
- Original shape images (not circles), proper headshots, top padding for navbar

### Navigation / Navbar
- **Top Banner**: Gradient blue banner with webinar announcement + "Register now" button
- Colored logo (not white) across all pages
- Calculator page: Fixed invisible logo
- Consistent logo path
- **Scroll behavior**: Fixed navbar on all pages, transparent → solid white on scroll
- `.scrolled` class added via script.js
- Z-index stays on top of content
- Signup button: Underline removed
- All pages should match homepage navbar (banner + nav structure)

### Footer
- Standard design from index.html used across all pages
- White logo (`Images/22_Utilli_logo_white.png`), dark background (#1f2937)
- Product name: "Monay" (not "Money")
- Social icons: X, Instagram, Facebook, YouTube, LinkedIn

#### Mobile Footer Layout (≤768px)
The mobile footer layout is defined in `styles.css` under "MOBILE FOOTER STYLES":

| Order | Element | Description |
|-------|---------|-------------|
| 1 | Logo + Description | `.footer-brand.mobile-brand` at top |
| 2 | Three columns | Products \| Company \| Resources (side by side) |
| 3 | Social + Copyright | Social icons left, copyright right (same row) |
| 4 | Headquarters | Centered address section |
| 5 | Platform status | Under address |
| 6 | Legal links | Terms \| Privacy \| Cookies (centered) |

**Required classes:**
- `.footer-brand.mobile-brand` - Mobile-only brand section
- `.footer-brand.desktop-brand` - Desktop-only brand section
- `.footer-social-copyright` - Wrapper for social + copyright row
- `.footer-headquarters` - Address with platform status
- `.footer-legal-links .separator` - Pipe separators

**Hidden on mobile:** Developers column, Get Started Today column

### About Page
- Updated hero image
- Redesigned Our Mission & What We Do sections
- Quote section: White background, light blue italic text, Sora font
- Section titles: font-weight 400 (regular)
- Leadership headshots: Bigger, "More" button removed
- Careers CTA: Redesigned, space-between layout, 2-line heading

### Signup Page
- Two-column layout
- No borders/backgrounds on left plan summary
- Default "Start Your Free Trial" content
- Pre-fill via URL params and session storage
- Checkmark circles removed from selection buttons

### Calculator Page
- **Sliders**: 3px track, blue left/gray right, 20px white thumb with 0.5px blue border
- **Value label**: Below thumb, arrow points UP, 40px gap
- **Min/max labels**: Left and right of track
- **Info sections**: White background, sleek links, no decorative elements
- **Numbers**: Digital clock rolling animation
- **Hero**: Badge style, Aave-style horizontal checkmarks, gradient text
- **Savings card**: White card, gradient border, Sora font regular weight
- **Results**: Clean, no border/fill (Ramp-style)

### Pricing Page
- Auto-check card when slider is moved

### Mobile Layout (Ramp-style)
- Section headings: 28px on mobile
- Stacked, left-aligned layout
- Tighter padding
- Service delivery: Title above text

### Press Page
- Redesigned to match blog card layout
- Full images (not cropped)
- Inter font for press release text
- Footer matches standard, inline SVGs (no Lucide)

### ROI Calculator Links
- Added to footer
- Added to industries pages with "Learn More" style

### Cookie Banner
- Bottom-left compact design
- Accept all / Reject all buttons
- localStorage for storage

### OTP Modal
- Verify button disabled until 6 digits entered
- Resend OTP link below input
- Dev mode: Use code `123456` on localhost
- 30-second countdown on Resend OTP (starts only when clicked)
- Channel switching resets UI to initial state

### Demos Page (demos.html)
- Interactive product demos for tilliX, Nudge, and tilliPay
- Demo tabs with margin-top: 134px for fixed header spacing
- Sticky tabs at top: 134px when scrolling
- No scroll behavior when switching between demo tabs
- OTP gate temporarily disabled (will be restored)

### Industry Search
- Clear (X) button on search input
- "No match" message when no results

### Design System
- Section titles: font-weight 400
- Sora font for headings, Inter for body
- Primary blues: #4099FF, #5B9EFF, #2563eb
- overflow-x: hidden on html/body

---

### Key Files Reference
| File | Purpose |
|------|---------|
| `nudge-otp.js` | OTP verification modal for demo gating |
| `calculator.html` | ROI calculator with custom sliders |
| `enhanced-cookie-banner.js` | Cookie consent banner |
| `simple-cookie-banner.js` | Lightweight alternative cookie banner |
| `signup.html` | User registration page |
| `about.html` | Company about page |
| `press.html` | Press releases page |
| `valuebasedpricing.html` | Pricing calculator |
| `/api/nudge/send-otp.js` | Vercel serverless function for OTP |
| `/api/nudge/verify-otp.js` | Vercel serverless function for verification |

---

For detailed specifications, see `CLAUDE.md`.

If you want, I can open PR-ready edits to standardize the nav, logo, address, and links while keeping the current design intact.
