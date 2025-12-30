# Content Migration Plan: Live Site → 11ty Build

**Project:** Tilli Software Website Content Migration
**Date:** 2025-12-23
**Status:** Planning Phase
**Goal:** Achieve 95%+ content parity with live production site

---

## Executive Summary

### Current State
- **11ty Build:** 19 pages with basic structure, 2/5 average content match
- **Live Site:** Rich, detailed content with 5-10x more depth per page
- **Gap:** Missing metrics, company history, interactive features, industry content

### Success Criteria
- [ ] All pages achieve 4/5 or 5/5 content match
- [ ] Interactive features (calculator, pricing configurator) fully functional
- [ ] All metrics and statistics migrated
- [ ] Company story and leadership team complete
- [ ] Blog and press content populated
- [ ] All forms and integrations working

### Timeline Estimate
- **Phase 1 (Critical):** 2-3 days
- **Phase 2 (High Priority):** 3-4 days
- **Phase 3 (Medium Priority):** 2-3 days
- **Phase 4 (Polish):** 1-2 days
- **Total:** 8-12 days

---

## Priority Matrix

### 🔴 Critical (Do First)
**Impact:** High | **Effort:** Medium | **User Visibility:** Very High

| Page/Feature | Current Score | Target Score | Impact |
|--------------|---------------|--------------|---------|
| Homepage | ⭐⭐ (2/5) | ⭐⭐⭐⭐⭐ (5/5) | First impression, main entry point |
| About Page | ⭐ (1/5) | ⭐⭐⭐⭐⭐ (5/5) | Company credibility, trust building |
| Product Pages | ⭐⭐ (2/5) | ⭐⭐⭐⭐⭐ (5/5) | Core value proposition |

### 🟠 High Priority (Do Second)
**Impact:** High | **Effort:** High | **User Visibility:** High

| Page/Feature | Current Score | Target Score | Challenge |
|--------------|---------------|--------------|-----------|
| Calculator | ⭐ (1/5) | ⭐⭐⭐⭐⭐ (5/5) | Complex interactive functionality |
| Industries | ⭐ (1/5) | ⭐⭐⭐⭐⭐ (5/5) | 12 detailed solutions needed |
| Pricing | ⭐ (1/5) | ⭐⭐⭐⭐⭐ (5/5) | Interactive configurator |

### 🟡 Medium Priority (Do Third)
**Impact:** Medium | **Effort:** Medium | **User Visibility:** Medium

| Page/Feature | Current Score | Target Score | Notes |
|--------------|---------------|--------------|-------|
| Blog | ⭐ (1/5) | ⭐⭐⭐⭐ (4/5) | Content creation ongoing |
| Press | ⭐ (1/5) | ⭐⭐⭐⭐ (4/5) | Press releases needed |
| Signup | Unknown | ⭐⭐⭐⭐⭐ (5/5) | Form validation critical |

### 🟢 Lower Priority (Do Last)
**Impact:** Low-Medium | **Effort:** Low | **User Visibility:** Low-Medium

- Legal pages (Privacy, Terms, Anti-Slavery, Cookies)
- Contact page
- Careers page
- Case Studies
- Demos page

---

## Phase 1: Critical Content Migration (Days 1-3)

### Objective
Bring core pages to production quality with all essential content

### Tasks

#### 1.1 Homepage Enhancement
**Effort:** 4-6 hours

- [ ] **Hero Section**
  - [ ] Keep existing headline: "Transform Billing Into Engagement"
  - [ ] Keep tagline: "Go 100% Digital. Save 40% on Costs. Get Paid Faster."
  - [ ] Add key stats banner:
    - 4.8/5 rating
    - 99.99% uptime SLA
    - 40% cost reduction
    - 3X faster payments
    - 80%+ digital adoption

- [ ] **Product Cards** - Enhance with specific metrics:
  - [ ] **tilliX:** Add "60% cost reduction, 98% satisfaction, WCAG compliance"
  - [ ] **Nudge:** Add "20M+ monthly messages, 95% open rates, 240+ integrations"
  - [ ] **tilliPay:** Add "PCI DSS Level 1, intelligent routing across 16+ processors"
  - [ ] **tilliArc:** Clarify positioning (less prominent than other three)

- [ ] **Client Logos Section**
  - [ ] Verify all 4 logos display correctly
  - [ ] Consider adding CareSource if available

- [ ] **Industries Section**
  - [ ] Add detailed list of 6+ primary industries
  - [ ] Link each to /industries page with anchor

- [ ] **Final CTA Section**
  - [ ] Change from "Ready to Transform Your Business?"
  - [ ] To: "Ready to Save Millions on Billing Operations"
  - [ ] Add: "Free ROI analysis, custom roadmap, priority onboarding"

**Deliverable:** Homepage with 5/5 content match

---

#### 1.2 About Page Rebuild
**Effort:** 6-8 hours

- [ ] **Hero Section**
  - [ ] Change from "About Tilli" to "Powering the Future of Customer Communication"
  - [ ] Add subheading: "tilli is transforming how businesses connect with people — making every payment, reminder, and message seamless, secure, and human."

- [ ] **Core Values Section** (NEW)
  - [ ] **Connected:** Description of integration philosophy
  - [ ] **Secure:** Security-first approach details
  - [ ] **Thoughtful:** User-centric design principles

- [ ] **Mission Statement Section**
  - [ ] Replace generic text with: "We're building better connections"
  - [ ] Add detailed explanation about serving utility providers and public sector
  - [ ] Include company quote: "A team driven by clarity, empathy, and execution."

- [ ] **Company History Section** (NEW)
  - [ ] Founded by Ali Saberi in 2003 as Atrinova
  - [ ] Evolution into Tilli Software
  - [ ] 200+ employees milestone
  - [ ] Key markets: utility providers, public sector

- [ ] **Leadership Team Section** (NEW)
  - [ ] **Ali Saberi** - Founder & Chief Executive Officer
    - Add photo: Images/team/Ali Saberi.jpeg
    - Add brief bio (if available)
  - [ ] **Raja Gopal Vemuri** - Chief Technology Officer
    - Add photo: Images/team/Raja gopal.jpeg
    - Add brief bio (if available)
  - [ ] **Shahid Husain** - Chief Operating Officer
    - Add photo: Images/team/shahid.jpeg
    - Add brief bio (if available)
  - [ ] **Shabbir Gillani** - Chief Revenue Officer
    - Add photo: Images/team/Shabbir.jpeg
    - Add brief bio (if available)

- [ ] **Company Timeline** (NEW)
  - [ ] 2004: Founding milestone
  - [ ] Key years through 2020: Rebrand to Tilli
  - [ ] 2022: Recent achievements

- [ ] **Multiple CTAs**
  - [ ] "See Our Open Roles" → link to /careers
  - [ ] "Talk to our team" → link to /contact
  - [ ] "Read Our Email" → newsletter signup

**Deliverable:** About page with complete company story (5/5 match)

---

#### 1.3 Product Pages Enhancement
**Effort:** 8-10 hours total (2-3 hours per page)

##### 1.3.1 Nudge Page (/nudge)
**Current:** 3/5 | **Target:** 5/5

- [ ] **5 Core Feature Sections** - Add detailed descriptions:
  - [ ] Omni-channel consolidation (SMS, email, WhatsApp, IVR)
  - [ ] Collaborative workspaces for team coordination
  - [ ] Customer journey visualization with engagement tracking
  - [ ] Automated billing reminders and payment notifications
  - [ ] Intelligent task prioritization for agent efficiency

- [ ] **Integration Details**
  - [ ] Add: "240+ ready connectors for SAP, Oracle, Salesforce, HubSpot"
  - [ ] List top 8-10 integrations with logos if available

- [ ] **8 Feature Capabilities** - Expand current 6:
  - [ ] Smart alerts
  - [ ] Preference management
  - [ ] Digital bill presentment
  - [ ] Multi-channel reminders
  - [ ] AI-powered insights
  - [ ] Analytics dashboard
  - [ ] Self-service tools
  - [ ] Workflow automation

- [ ] **Business Solutions Section**
  - [ ] Add: "80% reduction in manual work" claim
  - [ ] Streamline invoicing details
  - [ ] Simplify collections with automated workflows
  - [ ] Proactive customer engagement benefits

- [ ] **CTA Enhancement**
  - [ ] Change to: "Ready to transform customer engagement?"
  - [ ] Add promise: "Get a guided walkthrough in under 15 minutes"

##### 1.3.2 tilliX Page (/tillix)
**Current:** 2/5 | **Target:** 5/5

- [ ] **Hero Update**
  - [ ] Change from "Empower Customers with Self-Service"
  - [ ] To: "Modern tools for how money flows today."
  - [ ] Update tagline: "From invoicing to instant payments, our ecosystem makes managing transactions smoother, faster, and smarter."

- [ ] **3 Core Pillars Section** (NEW)
  - [ ] Unified for financial operations—everything in one place
  - [ ] Built for scale and flexibility—grows with business needs
  - [ ] Out-of-the-box functionality—ready from day one

- [ ] **3 Workflow Solutions Section** (NEW)
  - [ ] **Streamline Invoicing**
    - Automated generation
    - Smart reminders
    - Customizable templates
  - [ ] **Simplify Collections**
    - Multi-channel options
    - Automated follow-ups
    - Analytics dashboard
  - [ ] **Engage Customers Proactively**
    - Proactive notifications
    - Personalized messaging
    - Self-service portal

- [ ] **Contrast Section** (NEW)
  - [ ] "See the Difference with tilliX"
  - [ ] Modern vs. outdated process comparison

- [ ] **Cross-Device Section** (NEW)
  - [ ] "Work from Anywhere"
  - [ ] Desktop, tablet, mobile showcase
  - [ ] Real-time tracking emphasis

- [ ] **6 Key Benefits** - Expand from current 3:
  - [ ] Accurate invoicing & reporting
  - [ ] Multi-channel payment recovery
  - [ ] Customer-driven collections
  - [ ] Real-time status updates
  - [ ] Easy deployment & onboarding
  - [ ] Enterprise-grade security

- [ ] **ROI Section**
  - [ ] Add savings calculator link
  - [ ] Add claim: "2.5k hours monthly time savings"

##### 1.3.3 tilliPay Page (/tillipay)
**Current:** 4/5 | **Target:** 5/5

- [ ] **Minor Enhancements Only** (already closest match)
  - [ ] Add demo request form section
  - [ ] Expand integration details
  - [ ] Add specific processor partnerships (16+ processors)

**Deliverable:** All 3 product pages at 5/5 content match

---

## Phase 2: Interactive Features (Days 4-7)

### Objective
Rebuild complex interactive functionality matching live site

### Tasks

#### 2.1 ROI Calculator Rebuild
**Effort:** 12-16 hours

**Current State:** Appears to be placeholder
**Target:** Fully functional multi-step calculator

- [ ] **Verify Existing Implementation**
  - [ ] Check current calculator.njk content
  - [ ] Identify what JavaScript is already in place
  - [ ] Test existing slider functionality

- [ ] **Step 1: Industry & Company Size**
  - [ ] Verify all 9 industries are selectable:
    - Banking and Finance
    - Education and Universities
    - Gaming Developers
    - Information Technology
    - Insurance
    - Media and Entertainment
    - Memberships
    - Public Sector
    - Rentals and Leases
    - SaaS Billing
    - Telecommunications
    - Utilities
  - [ ] Verify 3 company sizes: Mid-Market, Enterprise, Large Enterprise
  - [ ] Test industry search functionality
  - [ ] Verify "Continue without Industry" option

- [ ] **Step 2: Customer Base**
  - [ ] Test customer accounts slider (0-25M range)
  - [ ] Test emails available slider (0-100%)
  - [ ] Test bill adoption slider (0-100%)
  - [ ] **Critical:** Verify linked slider logic (bill-adoption cannot exceed emails-available)

- [ ] **Step 3: Payer & Billing Behavior**
  - [ ] Test EFT/ACH dropdown (High/Medium/Low)
  - [ ] Test payment agreements dropdown
  - [ ] Test billing frequency selector (Monthly/Quarterly/Semi-annual/Annual)
  - [ ] Test average bill amount slider ($30-$1,500+)
  - [ ] Test CSR-assisted payments slider (0-100%)

- [ ] **Step 4: Current Costs**
  - [ ] Test CSR hourly rate slider ($18-$75+)
  - [ ] Test handle time slider (3-18 minutes)
  - [ ] Test letters issued input field
  - [ ] Test invoices mailed slider (0-100K)
  - [ ] Test AI agents toggle (Yes/No with 20% CSR cost reduction)

- [ ] **Results Panel**
  - [ ] Verify real-time calculation updates
  - [ ] Test Current Annual Cost display
  - [ ] Test New Annual Cost display
  - [ ] Test Annual Savings display (with gradient styling)
  - [ ] Test Monthly Savings breakdown

- [ ] **6 Savings Categories Breakdown**
  - [ ] Papers, print & postage
  - [ ] Notices & reminder letters
  - [ ] CSR assisted payments
  - [ ] Digital & autopay mix
  - [ ] Processing efficiency
  - [ ] Bad debt & DSO
  - [ ] Verify blur effect until form completion

- [ ] **Supporting Sections**
  - [ ] Add methodology section with data sources:
    - Edison Electric Institute Financial Review 2024
    - NAIC Insurance Department Resources Report 2023
    - FCC Communications Marketplace Report 2023
  - [ ] Add "How we calculate your savings" section
  - [ ] Add "Cost savings include" section
  - [ ] Add "Time savings based on" section

- [ ] **Download Functionality**
  - [ ] Implement spreadsheet download feature
  - [ ] Add email/phone verification modal (OTP)
  - [ ] Generate Excel file with exceljs library
  - [ ] Include all calculation details in spreadsheet
  - [ ] Test VTiger lead capture integration

**Deliverable:** Fully functional ROI calculator with all features

---

#### 2.2 Pricing Configurator Rebuild
**Effort:** 10-14 hours

**Current State:** Placeholder
**Target:** Interactive pricing calculator with token-based model

- [ ] **Hero Section**
  - [ ] "Transparent Pricing, Real Savings"
  - [ ] Subtitle: "Compare Tilli's all-inclusive pricing with traditional solutions. See exactly what you pay and how much you save."
  - [ ] 3 key metrics with shimmer animation:
    - 85% Average Savings
    - 1 Platform vs 15+ Tools
    - 24/7 Expert Support

- [ ] **6 Service Categories** (Build Interactive Panels)

  - [ ] **1. Communication Channels**
    - [ ] Email (cost per message)
    - [ ] SMS (cost per message)
    - [ ] WhatsApp (cost per message)
    - [ ] Push notifications (cost per message)
    - [ ] Multi-select with volume inputs

  - [ ] **2. Campaigns & Workflows**
    - [ ] Campaign builder
    - [ ] Automated workflows
    - [ ] A/B testing
    - [ ] Multi-select options

  - [ ] **3. Digital Documents**
    - [ ] E-signatures
    - [ ] Document requests
    - [ ] Automated reminders
    - [ ] Multi-select options

  - [ ] **4. Payment Processing (Pay In)**
    - [ ] ACH transactions
    - [ ] Card processing
    - [ ] Digital wallets
    - [ ] Volume-based pricing tiers

  - [ ] **5. Payouts & Disbursements**
    - [ ] Vendor payments
    - [ ] Refunds
    - [ ] International transfers
    - [ ] Volume inputs

  - [ ] **6. Free Features & Add-Ons**
    - [ ] List of included features
    - [ ] Available integrations
    - [ ] Premium add-ons

- [ ] **Interactive Configuration Panel** (Sticky Right Side)
  - [ ] Services Selected tracker
  - [ ] Monthly Volume calculator
  - [ ] Tokens Needed display
  - [ ] Monthly Savings Amount (animated)
  - [ ] Real-time updates as user selects options

- [ ] **Token-Based Calculation Logic**
  - [ ] Implement token pricing algorithm
  - [ ] Calculate savings vs traditional vendors
  - [ ] Show breakdown by service type
  - [ ] Update totals in real-time

- [ ] **CTA Button**
  - [ ] "Get Your Custom Plan" (disabled until selections made)
  - [ ] Enable when at least one service selected
  - [ ] Link to signup with pre-filled selections

**Deliverable:** Fully functional pricing configurator

---

#### 2.3 Signup Form Enhancement
**Effort:** 6-8 hours

- [ ] **Verify Current Form Structure**
  - [ ] Check existing fields and validation
  - [ ] Test VTiger integration
  - [ ] Verify session storage pre-fill

- [ ] **Form Sections** (Ensure Complete)

  - [ ] **Your Information**
    - [ ] First name
    - [ ] Last name
    - [ ] Work email (validate company domain)
    - [ ] Phone number

  - [ ] **Company Information**
    - [ ] Industry dropdown (Banking, SaaS, Utilities, Insurance, Healthcare, etc.)
    - [ ] Company size (1-10, 11-50, 51-200, 201-1000, 1001+ employees)

  - [ ] **Create Password**
    - [ ] Password field
    - [ ] Requirements display:
      - 8+ characters
      - Uppercase letter
      - Lowercase letter
      - Number
      - Special character
    - [ ] Real-time validation

  - [ ] **System Integrations (Optional)**
    - [ ] CRM: Salesforce, HubSpot, Zoho CRM, MS Dynamics
    - [ ] ERP: SAP, Oracle, NetSuite, Dynamics 365
    - [ ] Accounting: QuickBooks, Xero, Sage, FreshBooks
    - [ ] Multi-select checkboxes

  - [ ] **Select Products**
    - [ ] Nudge (Communications Platform) - checkbox
    - [ ] tilliPay (Payment Processing) - checkbox
    - [ ] tilliX (Customer Portal) - checkbox
    - [ ] tilliArc (Document Archiving) - checkbox
    - [ ] XDEX (Data Exchange Platform) - checkbox
    - [ ] Allow multiple selections

- [ ] **Sidebar Benefits Panel**
  - [ ] "First 10,000 Tokens FREE This Month" badge
  - [ ] Benefits list:
    - No credit card required
    - Cancel anytime
    - Setup in minutes
    - 24/7 support
    - Enterprise-grade security
  - [ ] Link to pricing calculator

- [ ] **Form Functionality**
  - [ ] All client-side validation
  - [ ] Server-side validation (API)
  - [ ] Error message display
  - [ ] Success confirmation
  - [ ] VTiger lead creation
  - [ ] Auto-login after signup
  - [ ] Redirect to onboarding flow

**Deliverable:** Production-ready signup form with all features

---

## Phase 3: Content-Heavy Pages (Days 8-10)

### Objective
Populate pages with detailed content from live site

### Tasks

#### 3.1 Industries Page Rebuild
**Effort:** 8-10 hours

**Current:** 1/5 | **Target:** 5/5

- [ ] **Hero Section**
  - [ ] "Smarter Financial Solutions for Every Industry"
  - [ ] Detailed subheading: "Every business runs on invoices and payments. We make it easy with smart, secure tools tailored to your workflow—so you can move faster and stay focused."

- [ ] **3 Featured Industry Cards** (Top of Page)
  - [ ] **Retailers and Merchants**
    - Icon/image
    - "Streamline checkout, boost satisfaction"
    - Brief description
  - [ ] **Utilities**
    - Icon/image
    - "Simplify communication, accelerate collection"
    - Brief description
  - [ ] **Banking and Finance**
    - Icon/image
    - "Strengthen compliance, reduce expenses"
    - Brief description

- [ ] **Main Section:** "Built for modern industries, trusted by innovators"

- [ ] **12 Industry Solutions** (Detailed Cards)

  1. [ ] **Banking and Finance**
     - Secure, scalable infrastructure
     - Compliance automation
     - Link to industry-specific page (if exists)

  2. [ ] **SaaS Billing**
     - Recurring payments
     - Scalable communications
     - Subscription management

  3. [ ] **Insurance**
     - Recurring payments
     - Paperless billing
     - Claims notifications

  4. [ ] **Usage-Based Subscriptions**
     - SMS, email, push requests
     - Real-time usage tracking
     - Flexible billing models

  5. [ ] **Public Sector**
     - Legacy system integration
     - Multi-channel communications
     - Security compliance

  6. [ ] **Utilities**
     - Two-way billing and communication
     - Outage notifications
     - Payment plan management

  7. [ ] **Rentals and Leases**
     - Tenant payment portals
     - Automated reminders
     - Maintenance requests

  8. [ ] **Information Technology**
     - ERP-integrated communications
     - Subscription management
     - Customer portals

  9. [ ] **Telecommunications**
     - Multi-service communication
     - Reduced operational costs
     - Service notifications

  10. [ ] **Education**
      - Multi-channel student engagement
      - SMS, WhatsApp, IVR
      - Tuition payments

  11. [ ] **Memberships**
      - Customizable enrollment
      - Payment gateway integration
      - Renewal automation

  12. [ ] **Gaming/Media**
      - Subscription platforms
      - Smart payment pages
      - In-app purchases

- [ ] **Industry Search/Filter** (if exists on live)
  - [ ] Search bar
  - [ ] Category filters
  - [ ] Smooth filtering animations

- [ ] **Closing CTA**
  - [ ] "Transform How Your Industry Connects"
  - [ ] "Demo Our Products" button

**Deliverable:** Complete industries page with all 12 solutions

---

#### 3.2 Blog Page Setup
**Effort:** 6-8 hours

**Current:** 1/5 | **Target:** 4/5

- [ ] **Hero Section**
  - [ ] "tilli Blog" heading
  - [ ] Optional tagline/description

- [ ] **Featured Article** (Top)
  - [ ] Large card with image
  - [ ] "The Future is Now: Why Smart Businesses are Moving to S/4 HANA"
  - [ ] Description snippet
  - [ ] "5 min read" indicator
  - [ ] Link to full article

- [ ] **Category Filters** (Horizontal Tabs or Pills)
  - [ ] All Tilli News
  - [ ] Industry Insights
  - [ ] Security & Compliance
  - [ ] Smart City Solutions
  - [ ] Digital Payments
  - [ ] BaaS (Banking as a Service)
  - [ ] Financial Technology
  - [ ] Business Automation
  - [ ] Cybersecurity

- [ ] **Article Grid** (3+ Articles Minimum)

  - [ ] **Article 1:** "Leading the Way in Payment Security: Our PCI DSS 4.0 Certification"
    - Image: Blog Page images/Frame (3).png
    - Category: Digital Payments
    - Date: Dec 2024
    - Excerpt

  - [ ] **Article 2:** "Decoding the Transition: Seamlessly Embracing S/4HANA for Business Success"
    - Image: Blog Page images/Frame 1984078746.png
    - Category: Industry Insights
    - Date: Dec 2024
    - Excerpt

  - [ ] **Article 3:** "How to Choose the Best Payment Gateway for Your Subscription Business?"
    - Image: Blog Page images/Frame (4).png
    - Category: Financial Technology
    - Date: July 2024
    - Excerpt

- [ ] **Newsletter Signup Section**
  - [ ] "Get Smarter About Finance" heading
  - [ ] "Join professionals receiving expert insights"
  - [ ] Bi-weekly delivery promise
  - [ ] Email input field
  - [ ] Subscribe button
  - [ ] Unsubscribe option mention

- [ ] **Editor's Picks Carousel**
  - [ ] 4 featured articles
  - [ ] Images from: Blog Page images/Tilli Blog Images/pick1-4.jpg
  - [ ] Carousel navigation
  - [ ] Responsive layout

- [ ] **Pagination or Load More**
  - [ ] If more than 12 articles
  - [ ] "See All" button

**Note:** Actual article content will need to be created/written separately. This phase focuses on structure and placeholders.

**Deliverable:** Blog page with structure and 3+ article placeholders

---

#### 3.3 Press Page Setup
**Effort:** 4-6 hours

**Current:** 1/5 | **Target:** 4/5

- [ ] **Hero Section**
  - [ ] "Stay updated with the latest news and announcements from Tilli"
  - [ ] Webinar banner (if applicable): "Join us for our upcoming webinar on the future of digital payments"

- [ ] **3 Featured Press Releases**

  - [ ] **Press Release 1: AI Payment Platform Launch**
    - [ ] Headline: "Tilli Announces Next-Generation Payment Orchestration Platform"
    - [ ] Date: Recent
    - [ ] Content: "Tilli today announced the launch of its next-generation payment orchestration platform, featuring advanced AI capabilities that reduce transaction costs by up to 40%..."
    - [ ] Tags: Product Launch, AI Technology
    - [ ] Read more link

  - [ ] **Press Release 2: Utilities Sector Expansion**
    - [ ] Headline: "Tilli Expands Partnership Network in Utilities Sector"
    - [ ] Date: Recent
    - [ ] Content: Partnerships with Washington Gas, Con Edison, Frontier Communications
    - [ ] Tags: Partnership, Utilities
    - [ ] Read more link

  - [ ] **Press Release 3: Compliance Certifications**
    - [ ] Headline: "Tilli Achieves SOC 2 Type II and PCI DSS Certifications"
    - [ ] Date: Recent
    - [ ] Content: Achievement of industry-leading security certifications
    - [ ] Tags: Security, Compliance
    - [ ] Read more link

- [ ] **Media Contact Section**
  - [ ] "For Press Inquiries"
  - [ ] Email: press@tilli.pro
  - [ ] Phone: 1-888-TILLI-00 (or actual number)
  - [ ] Download press kit link (if available)

- [ ] **Recent News Grid**
  - [ ] Additional 3-6 press items
  - [ ] Filterable by tag/category

**Deliverable:** Press page with 3 featured releases and media contact info

---

## Phase 4: Supporting Pages (Days 11-12)

### Objective
Complete remaining pages and polish

### Tasks

#### 4.1 Legal Pages
**Effort:** 4-6 hours total

- [ ] **Privacy Policy (/privacy)**
  - [ ] Scrape content from live site (if exists)
  - [ ] Update with current practices
  - [ ] Include GDPR, CCPA compliance sections
  - [ ] Data collection and usage details
  - [ ] Cookie policy reference
  - [ ] Last updated date

- [ ] **Terms of Service (/terms)**
  - [ ] Scrape content from live site (if exists)
  - [ ] Service terms and conditions
  - [ ] User responsibilities
  - [ ] Limitation of liability
  - [ ] Dispute resolution
  - [ ] Last updated date

- [ ] **Anti-Slavery Policy (/anti-slavery)**
  - [ ] Current content appears complete
  - [ ] Verify compliance statement
  - [ ] Supply chain commitments
  - [ ] Training and awareness
  - [ ] Last updated date

- [ ] **Cookie Policy (/cookies)**
  - [ ] Currently has basic content
  - [ ] Expand with cookie categories:
    - Strictly Necessary
    - Performance
    - Marketing
  - [ ] Link to cookie banner/preferences
  - [ ] Third-party cookies disclosure
  - [ ] How to manage cookies

**Deliverable:** All legal pages complete and compliant

---

#### 4.2 Contact Page
**Effort:** 3-4 hours

- [ ] **Hero Section**
  - [ ] "Get in Touch"
  - [ ] "We're here to help you transform your business"

- [ ] **Contact Form**
  - [ ] Name field
  - [ ] Email field (validation)
  - [ ] Company field
  - [ ] Phone (optional)
  - [ ] Subject dropdown:
    - Sales inquiry
    - Technical support
    - Partnership opportunity
    - Press inquiry
    - Other
  - [ ] Message textarea
  - [ ] Submit button
  - [ ] Success/error messages
  - [ ] VTiger integration

- [ ] **Contact Information Cards**
  - [ ] **Sales:**
    - Email: sales@tilli.pro
    - Phone: 1-888-TILLI-00
  - [ ] **Support:**
    - Email: support@tilli.pro
    - Portal link
  - [ ] **Press:**
    - Email: press@tilli.pro
    - Media kit link

- [ ] **Office Locations** (if applicable)
  - [ ] Headquarters address
  - [ ] Additional offices
  - [ ] Map integration (optional)

**Deliverable:** Functional contact page with form

---

#### 4.3 Careers Page
**Effort:** 3-4 hours

- [ ] **Hero Section**
  - [ ] "Join Our Team"
  - [ ] "Help us transform digital payments and customer communications"
  - [ ] Team photo or illustration

- [ ] **Company Culture Section**
  - [ ] "Why Tilli?"
  - [ ] 3-4 value propositions:
    - Innovative technology
    - Growth opportunities
    - Work-life balance
    - Inclusive culture

- [ ] **Benefits Section**
  - [ ] Competitive compensation
  - [ ] Health insurance
  - [ ] 401(k) matching
  - [ ] Flexible work arrangements
  - [ ] Professional development
  - [ ] Other perks

- [ ] **Open Positions**
  - [ ] Job listing cards (3-5 positions)
    - Position title
    - Department
    - Location
    - Employment type
    - Brief description
    - "Apply Now" link
  - [ ] Filter by: Department, Location, Type
  - [ ] "View All Openings" link to job board

- [ ] **CTA Section**
  - [ ] "Don't see the right role?"
  - [ ] "Send us your resume"
  - [ ] Email: careers@tilli.pro

**Deliverable:** Careers page with job listings

---

#### 4.4 Case Studies Page
**Effort:** 4-6 hours

- [ ] **Hero Section**
  - [ ] "Customer Success Stories"
  - [ ] "See how businesses are transforming with Tilli"

- [ ] **Case Study Cards** (3-6 studies)

  - [ ] **Template for Each:**
    - [ ] Company logo/name
    - [ ] Industry tag
    - [ ] Challenge summary (1-2 sentences)
    - [ ] Solution highlights
    - [ ] Results/metrics:
      - Cost savings %
      - Efficiency gains
      - Customer satisfaction improvement
    - [ ] Customer quote
    - [ ] "Read Full Story" link

  - [ ] **Example Cases to Create:**
    - [ ] Utility company (if Con Edison/Washington Gas can be featured)
    - [ ] Healthcare provider
    - [ ] Financial services firm
    - [ ] SaaS company
    - [ ] Public sector organization

- [ ] **Metrics Summary Section**
  - [ ] Aggregate results across all customers
  - [ ] Average cost reduction: 40%
  - [ ] Average payment acceleration: 3X
  - [ ] Customer satisfaction: 98%

- [ ] **CTA Section**
  - [ ] "Ready to write your success story?"
  - [ ] "See Your ROI" button → calculator
  - [ ] "Book a Demo" button → contact

**Deliverable:** Case studies page with 3+ customer stories

---

#### 4.5 Demos Page
**Effort:** 3-4 hours

- [ ] **Current State Verification**
  - [ ] Check if demos.njk has interactive demos
  - [ ] Verify tab switching functionality
  - [ ] Test product demo sections

- [ ] **Demo Tabs** (If Missing)
  - [ ] tilliX Portal demo
  - [ ] Nudge Communications demo
  - [ ] tilliPay Payments demo

- [ ] **Demo Content** (For Each Tab)
  - [ ] Screenshot/video of product
  - [ ] Key features showcase
  - [ ] Interactive elements (if possible)
  - [ ] "Book Live Demo" CTA

- [ ] **OTP Gating** (Currently Disabled)
  - [ ] Decision: Keep disabled or enable?
  - [ ] If enabled, verify OTP modal works
  - [ ] Test email/SMS verification flow

**Deliverable:** Demos page with all product showcases

---

## Phase 5: Quality Assurance & Launch (Day 13)

### Testing Checklist

#### Content Verification
- [ ] Run through each page and compare with CONTENT_COMPARISON.md
- [ ] Verify all metrics and statistics are accurate
- [ ] Check all internal links work
- [ ] Verify all external links open correctly
- [ ] Spell check and grammar review

#### Interactive Features
- [ ] Test calculator with various inputs
- [ ] Verify calculator results are accurate
- [ ] Test pricing configurator selections
- [ ] Test all form submissions
- [ ] Verify VTiger integration works

#### Visual/Design
- [ ] Test on desktop (1920px, 1440px, 1366px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on mobile (375px, 414px)
- [ ] Verify images load correctly
- [ ] Check logo display on all pages
- [ ] Verify gradient effects and animations

#### Performance
- [ ] Run Lighthouse audit on key pages
- [ ] Check page load times
- [ ] Optimize images if needed
- [ ] Verify lazy loading works

#### SEO
- [ ] Verify all meta titles
- [ ] Check meta descriptions
- [ ] Verify canonical URLs
- [ ] Check Open Graph tags
- [ ] Test social sharing previews

#### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Final Build
- [ ] Clean build: `rm -rf public && npm run build`
- [ ] Verify all 19 pages generated
- [ ] Check build logs for errors
- [ ] Test with `pnpm dev` locally
- [ ] Verify redirects work

---

## Technical Requirements

### Tools & Dependencies Needed

#### Existing (Already in place)
- ✅ Eleventy 2.0.1
- ✅ Nunjucks templating
- ✅ VTiger integration API
- ✅ ExcelJS for spreadsheet export
- ✅ Vercel deployment

#### May Need to Add
- [ ] Content scraping script (for migrating text from live site)
- [ ] Image optimization tools
- [ ] Form validation library (if not present)
- [ ] Analytics tracking (Vercel Analytics already included)

### API Integrations to Verify

- [ ] **VTiger CRM**
  - Endpoint: `/api/vtiger.js`
  - Used by: Calculator, Contact, Signup forms
  - Verify environment variables set

- [ ] **Nudge OTP**
  - Endpoint: `/api/nudge/send-otp`
  - Used by: Calculator download, potentially demos
  - Verify API key configured

- [ ] **Newsletter Signup** (if separate from VTiger)
  - Determine service (MailChimp, ConvertKit, etc.)
  - Set up API integration

---

## Content Migration Checklist by Page

### ✅ Completed
- [x] Basic 11ty structure (19 pages)
- [x] Header and footer
- [x] Navigation
- [x] Image directories setup

### Phase 1 - Critical
- [ ] Homepage enhancement
- [ ] About page rebuild
- [ ] Nudge page enhancement
- [ ] tilliX page enhancement
- [ ] tilliPay minor updates

### Phase 2 - Interactive
- [ ] Calculator full rebuild
- [ ] Pricing configurator
- [ ] Signup form enhancement

### Phase 3 - Content
- [ ] Industries page (12 solutions)
- [ ] Blog setup (3+ articles)
- [ ] Press page (3 releases)

### Phase 4 - Supporting
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Anti-slavery (verify)
- [ ] Cookie policy
- [ ] Contact page
- [ ] Careers page
- [ ] Case studies page
- [ ] Demos page

### Phase 5 - QA
- [ ] Full content review
- [ ] Interactive testing
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] SEO verification
- [ ] Final build and deploy

---

## Risks & Mitigation

### Risk 1: Interactive Features Too Complex
**Risk:** Calculator and pricing configurator may be too complex to rebuild accurately
**Likelihood:** Medium
**Impact:** High
**Mitigation:**
- Allocate extra time (12-16 hours instead of 8-10)
- Break down into smaller testable components
- Verify existing code first before rebuilding
- Consider using live site's JavaScript as reference

### Risk 2: Content Scraping Legal/Ethics
**Risk:** Scraping content from live site may raise concerns
**Likelihood:** Low
**Impact:** Medium
**Mitigation:**
- This is the same company's content
- Use for internal migration only
- Rewrite content where appropriate
- Focus on data migration, not code copying

### Risk 3: Missing Content Sources
**Risk:** Some content may not be scrapable or may require original creation
**Likelihood:** Medium
**Impact:** Medium
**Mitigation:**
- Identify which content needs to be written from scratch
- Blog articles likely need original content
- Press releases should match actual announcements
- Work with stakeholders to create missing content

### Risk 4: VTiger Integration Issues
**Risk:** Forms may not properly integrate with CRM
**Likelihood:** Low
**Impact:** High
**Mitigation:**
- Test integration early in Phase 2
- Have VTiger credentials and endpoints ready
- Create test lead to verify data flow
- Have fallback email notification system

### Risk 5: Timeline Overrun
**Risk:** Work may take longer than 12-day estimate
**Likelihood:** Medium
**Impact:** Medium
**Mitigation:**
- Prioritize ruthlessly (Phase 1 must be done)
- Phase 3-4 content can be added iteratively
- Focus on functionality over perfection
- Consider splitting work across multiple people

---

## Success Metrics

### Content Completeness
- [ ] Homepage: 5/5 match
- [ ] About: 5/5 match
- [ ] All product pages: 5/5 match
- [ ] Calculator: Fully functional
- [ ] Industries: All 12 solutions documented

### Functionality
- [ ] All forms submit successfully
- [ ] Calculator produces accurate results
- [ ] Pricing configurator works end-to-end
- [ ] VTiger integration confirmed
- [ ] No console errors on any page

### Performance
- [ ] Lighthouse score 90+ on key pages
- [ ] Page load < 3 seconds on 3G
- [ ] All images optimized
- [ ] Build time < 0.15 seconds

### Quality
- [ ] Zero broken links
- [ ] All images display correctly
- [ ] Mobile responsive on all pages
- [ ] Cross-browser compatible
- [ ] SEO meta tags complete

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Assign resources** (developers, content writers, designers)
3. **Set up project tracking** (use this checklist or move to project management tool)
4. **Begin Phase 1** - Focus on homepage and about page first
5. **Daily standups** to track progress
6. **Weekly demos** to show incremental progress

---

## Appendix A: Page Priority Rankings

| Priority | Page | Effort | Impact | Complexity |
|----------|------|--------|--------|------------|
| 1 | Homepage | 6h | Critical | Low |
| 2 | About | 8h | Critical | Low |
| 3 | Product Pages (3) | 10h | Critical | Low |
| 4 | Calculator | 16h | High | Very High |
| 5 | Industries | 10h | High | Medium |
| 6 | Pricing | 14h | High | High |
| 7 | Signup | 8h | High | Medium |
| 8 | Blog | 8h | Medium | Low |
| 9 | Press | 6h | Medium | Low |
| 10 | Legal (4 pages) | 6h | Medium | Low |
| 11 | Contact | 4h | Medium | Low |
| 12 | Careers | 4h | Low | Low |
| 13 | Case Studies | 6h | Medium | Low |
| 14 | Demos | 4h | Low | Medium |

**Total Estimated Effort:** 110-120 hours (13-15 working days at 8 hours/day)

---

## Appendix B: Content Sources

### From Live Site (Scrape/Reference)
- All metrics and statistics
- Company history and timeline
- Product descriptions
- Industry solutions
- Press releases
- Legal policies

### Need to Create Original
- Blog articles (or use existing if available)
- Case studies details
- Career job descriptions
- Some screenshots/demos

### Need Stakeholder Input
- Leadership team bios
- Company milestones dates
- Specific customer testimonials
- Partnership announcements
- Upcoming events/webinars

---

**Document Version:** 1.0
**Last Updated:** 2025-12-23
**Next Review:** After Phase 1 completion
