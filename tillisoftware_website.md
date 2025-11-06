# Tilli Software Website Relaunch – Business Summary & Requirements

## 1. Executive Summary
- The January 17, 2025 build delivered a full static site (`index.html`, `calculator.html`, product pages, policy pages) with refreshed navigation, enhanced hero CTA blocks, and VTiger-ready contact form plumbing.
- We now need a conversion-first redesign that emphasizes three core motions: self-driven demo, product onboarding/enrollment (Nudge, tilliPay, tilliX, tilliArch), and qualified contact capture tied into https://utilliadmin.com/crm.
- The relaunch must align with the current https://tillisoftware.com visual language while leveraging the brand updates already implemented (new logos, CTA labels, social links, calculator wizard).
- Delivery is organized into three phases—Quick Wins, Short Term Enhancements, Long Term Innovation—to keep velocity high while de-risking integrations and future-ready features (calculator upgrades, PDFs, live chat, newsletter).

## 2. Strategic Outcomes & KPIs
- **Primary conversions**: Self-driven demo completions, onboarding form submissions for each product, qualified CRM leads.
- **Secondary signals**: ROI calculator completions, scroll depth on solution pages, video engagement, newsletter opt-ins.
- **Operational metrics**: Form success vs. error rate, CRM sync health, site performance (LCP < 2.5s, CLS < 0.1).
- **Brand lift**: Consistent storytelling on digital engagement, payments, and customer portals across industries.

## 3. Primary User Journeys & CTA Requirements

### 3.1 Self-Driven Demo Experience
- **Business intent**: Allow prospects to explore the platform without scheduling friction, surface product depth, and capture intent for sales follow-up.
- **Experience blueprint**: Entry via hero CTA (`Book a Demo` secondary CTA becomes `Explore the Demo`), route to redesigned `demos.html` with product chooser, provide interactive walkthrough (carousel/video + annotated screenshots), end with optional calendar booking and auto-emailing of demo pack.
- **Design directives**: Showcase actual UI visuals, modular cards for each product, high-contrast CTA band repeating mid-page, persistent breadcrumb to Product pages.
- **Development requirements**: Modular template for demo content, video/carousel component, form capturing demo selections and pushing JSON payload to VTiger via API, optional integration with Microsoft Bookings (existing window.open) as fallback.
- **Content & data capture**: Short form (Name, Email, Company, Industry, Desired Go-Live, Product Selected), UTM + demo path stored alongside, automated acknowledgment email.
- **Task checklist**:
  - [ ] Redesign `demos.html` around product tiles (Nudge, tilliPay, tilliX, tilliArch) with embedded media.
  - [ ] Implement progressive disclosure (watch video → try interactive flows → request guided session).
  - [ ] Extend VTiger integration to capture demo type, selected product, and asset downloads.
  - [ ] Add analytics events (`demo_view`, `demo_progress_step`, `demo_submission`).

### 3.2 Product Onboarding & Enrollment (Nudge, tilliPay, tilliX, tilliArch)
- **Business intent**: Collect qualified leads ready to pilot or buy, map customer stage, direct them toward the right onboarding workflow.
- **Experience blueprint**: Each product page (`nudge.html`, `tillipay.html`, `tillix.html`, create `tilliarch.html`) includes tabbed overview, feature proof, industry use cases, testimonials, onboarding CTA. Enrollment flow = short wizard (company profile → current systems → timeline → compliance needs) feeding VTiger and triggering onboarding email.
- **Product-specific notes**: Nudge (focus on engagement orchestration), tilliPay (payments stack, compliance badges), tilliX (portal/EBPP capabilities), tilliArch (archival/compliance vault—extract content from existing site + new copy).
- **Design directives**: Visual parity with current site (hero gradient, clean iconography, proof points), reuse CTA blocks from Work Summary with new copy, highlight compliance logos.
- **Development requirements**: Multi-step forms with progress indicator, conditional questions per product, integrated calculators or ROI snippets (e.g., embed calculator step for tilliPay), VTiger payload segmentation, dynamic Thank You page with resource links.
- **Content & data capture**: Persona-specific messaging (Utility vs. SLED vs. Healthcare), short customer story per page, gated assets (playbook PDF) after form submission, integration with marketing automation for nurture.
- **Task checklist**:
  - [ ] Audit current copy on https://tillisoftware.com for each product and migrate/update into new component system.
  - [ ] Build uniform onboarding wizard component used across product pages.
  - [ ] Surface cross-sell CTAs (e.g., Nudge page links to tilliX portal).
  - [ ] Configure VTiger tags and workflows per product submission.
  - [ ] Produce confirmation emails with next actions (schedule call, upload data template).

### 3.3 Contact & CRM Integration
- **Business intent**: Capture high-intent contact inquiries, route automatically into VTiger, and support channel preference.
- **Experience blueprint**: `contact.html` and footer CTA to contain location map, team contact cards, embedded FAQ, and math challenge (already implemented) retained for anti-spam.
- **Integration requirements**: Ensure `vtiger-integration.js` posts to https://utilliadmin.com/crm with new fields (lead source, CTA origin, consent, subscription preference). Implement error handling and inline validation.
- **Design directives**: Maintain trust badges, provide direct phone/email for enterprise, highlight SLA (response within 1 business day).
- **Task checklist**:
  - [ ] Update form to include CTA origin (self-demo, onboarding, general inquiry) using hidden fields populated via URL params.
  - [ ] Add success-state modal with next steps and download links.
  - [ ] Sync CRM field mapping spec with ops (include custom fields for industry, ARR band, product interest).
  - [ ] QA VTiger integration in staging before launch.

## 4. Sitewide Experience Requirements
- **Brand & messaging**: Keep bold headlines (“Go 100% Digital. Save 40% on Billing Costs. Get Paid 3X Faster.” baseline) while infusing product differentiation copy; maintain tone outlined in requirements doc (concise, outcome-driven).
- **Navigation & IA**: Validate mega-menu structure for Solutions, Industries, Resources; ensure `Press` and `Case Studies` remain accessible; add TilliArch under Solutions.
- **Responsive & performance**: Maintain current responsive breakpoints (480/768/1024), optimize hero media (WebP), LCP targets < 2.5s, use lazy loading for galleries.
- **Accessibility**: Keep semantic structure, ensure form wizard keyboard support, provide transcripts for demo videos.
- **Legal & trust**: Link to policy pages (privacy, terms, anti-slavery), surface compliance credentials, ensure cookie consent aligns with `enhanced-cookie-banner.js`.
- **SEO & metadata**: Preserve existing OG/Twitter cards, extend structured data for product pages, update sitemap.xml and robots.txt after new URLs.

## 5. Page-Level Requirements

### 5.1 Conversion & CTA Pages
- **`index.html`**: Feature hero with 3 CTAs (Free Trial, Self-Driven Demo, Calculate Savings), impact metrics (update to 10M+ monthly messages, etc.), product quick links, testimonial carousel, compliance strip.
- **`free-trial.html`**: Align messaging with self-service onboarding; embed form segments tied to VTiger “Free Trial” pipeline.
- **`demos.html`**: Redesign per Section 3.1; embed interactive modules, include social proof (quotes, logos).
- **`calculator.html`**: Retain 4-step wizard, lighten layout to match new design system, add PDF export (Phase 2), integrate results summary into CRM when user opts in.

### 5.2 Product Pages
- **`nudge.html`**: Highlight omnichannel engagement, automation flows, sample campaigns; add “Start with Nudge” CTA linking to onboarding wizard.
- **`tillipay.html`**: Clarify payment stack modules, compliance badges, integration hooks; include ROI snippet that references calculator.
- **`tillix.html`**: Focus on EBPP and customer portal features, display UI screens, include integration partners.
- **`tilliarch.html`** (new): Create page covering archival/compliance features, data retention policies, include regulated industries case study.
- **Cross-cutting tasks**: Provide downloadable solution briefs gated after form; embed FAQ accordions; ensure CTA banners repeat near fold.

### 5.3 Industry & Resource Pages
- **`industries.html`** + individual subpages: Update stats (utilities, healthcare, government, media, insurance) with refreshed visuals; link to relevant case studies.
- **`education.html`**, **`Developer page` assets**, **`Developer.html`**: Communicate API, sandbox access, developer documentation; include CTA to request developer access.
- **`case-studies.html`** & **`press.html`**: Build filterable cards, link to PDFs or press releases, allow sorting by industry.
- **`blog.html`**: Ensure layout supports featured stories, implement CTA module within posts (Phase 2 for CMS integration).

### 5.4 Corporate & Legal Pages
- **`about.html`**, **`careers.html`**, **`privacy-policy.html`**, **`terms-conditions.html`**, **`anti-slavery-policy.html`**: Update typography to new system, ensure timeline and leadership sections align with brand photography, keep accordion job listings.

## 6. Component & Integration Requirements
- **VTiger CRM**: Maintain single integration layer (`vtiger-integration.js`), extend mapping for CTA source, product, UTM, consent, auto-tagging for phase-specific campaigns.
- **Microsoft Bookings**: Replace window.open fallback with accessible modal (Phase 2) and embed calendar API if feasible.
- **Analytics wrapper** (`analytics-wrapper.js`): Confirm events for new flows; add conversions for demo, onboarding, calculator download, newsletter sign-up.
- **RB2B tracking**: Ensure script remains on every page; document events for marketing.
- **Email automation**: Coordinate with marketing to trigger welcome sequences for each CTA via CRM.

## 7. Content & Asset Plan
- Audit existing copy assets; identify gaps for TilliArch, updated stats, testimonials.
- Produce fresh hero imagery or video loops for each product, sized for responsive contexts (desktop, tablet, mobile).
- Collect updated client logos (160px height baseline) and integrate into slider.
- Prepare downloadable collateral (use existing Press, Case Study PDFs; plan new ones for Phase 3).
- Draft FAQ content for contact/onboarding flows.

## 8. Measurement & Governance
- Configure GA4/Fathom events for each CTA; include funnel dashboards for demo and onboarding flows.
- Implement heatmap/scroll tracking on key pages during pilot launch.
- Define success SLAs: respond to demo/onboarding submissions within 12 hours, contact form within 1 business day.
- Establish QA checklist: form validation, CRM payload, responsive testing, accessibility (axe audit), performance (Lighthouse).

## 9. Launch Readiness Checklist
- [ ] Stakeholder review of wireframes and key page designs.
- [ ] Content approval for hero messaging, CTAs, compliance copy.
- [ ] CRM field mapping validated in sandbox and production.
- [ ] Analytics events verified in staging.
- [ ] Sitemap/robots updated and submitted.
- [ ] Post-launch playbook (monitoring, rollback plan).

## 10. Phased Delivery Plan

### Phase 1 – Quick Wins (0–2 weeks)
- **Goals**: Align CTAs to new journeys, refresh hero/impact areas, ensure VTiger mapping works end-to-end.
- **Focus areas**: Homepage, navigation, contact form, hero CTA updates on product pages.
- **Design tasks**: Polish hero layout, update CTA styles, ensure icons/imagery match current brand.
- **Development tasks**: Wire CTA tracking, add hidden fields for CTA source, QA contact form integration, update `demos.html` structure for upcoming redesign.
- **Content tasks**: Refresh hero copy, update impact metrics, align social proof statements.
- **Dependencies**: Confirm CRM fields and email templates, gather new product imagery.
- **Acceptance criteria**: New CTAs live, CRM receives source info, performance/opengraph unaffected.

### Phase 2 – Short Term Enhancements (2–6 weeks)
- **Goals**: Deliver complete self-driven demo hub, onboarding wizards, dedicated TilliArch page, enhance calculator outputs.
- **Focus areas**: `demos.html`, product pages, onboarding forms, ROI calculator improvements, integrate PDF export (if feasible).
- **Design tasks**: Produce responsive layouts for demo hub, multi-step forms, new product hero treatments, update iconography.
- **Development tasks**: Build wizard component, integrate product-specific forms with VTiger, add PDF/HTML report for calculator, embed video/interactive modules.
- **Content tasks**: Draft detailed product stories, create onboarding copy, compile testimonial quotes, record/curate demo videos.
- **Dependencies**: Asset production, CRM workflow configuration, PDF service selection (server-side vs. client-side).
- **Acceptance criteria**: Self-driven demo flow produces CRM lead with metadata, onboarding forms capture complete profile, TilliArch page live, calculator returns downloadable report.

### Phase 3 – Long Term Innovation (6+ weeks)
- **Goals**: Layer in advanced personalization, marketing automation, community/resources, and new engagement tools.
- **Focus areas**: Newsletter signup, live chat widget, microsite personalization, developer docs portal, resource library CMS integration.
- **Design tasks**: Create modular resource templates, chat widget styling, newsletter signup modals, dynamic personalization modules.
- **Development tasks**: Implement marketing automation hooks, integrate chat (e.g., Intercom/Drift), migrate blog/resources to CMS or headless backend, add service worker for performance.
- **Content tasks**: Build nurture sequences, produce additional case studies, create onboarding guides, maintain knowledge base.
- **Dependencies**: Vendor selections (chat, CMS), marketing operations alignment, potential Next.js migration.
- **Acceptance criteria**: Automated nurture campaigns live, personalized hero tests running, CMS-backed resource center operational.

## 11. Risks & Open Questions
- Need confirmation on TilliArch positioning and assets to avoid content gaps.
- Determine whether PDFs for calculator require server-side service (Python `generate_pdf.py`) or third-party.
- Validate data privacy requirements when capturing product selections and onboarding details (GDPR/CCPA).
- Confirm availability of updated testimonial logos and permission for use.
- Decide on long-term CMS migration timeline to avoid rework during Phase 3.
- Clarify analytics ownership (marketing vs. product) for new event taxonomy.