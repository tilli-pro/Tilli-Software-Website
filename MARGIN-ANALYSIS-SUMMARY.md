# Margin Analysis Summary - Tilli Pricing with Actual Backend Costs (2025)

## Executive Summary

With the new reduced token weights, we have **GOOD margins on most services** but **NEGATIVE margins on SMS and IVR** at all pricing tiers. The business model works if we focus on payment processing and high-value services.

## Backend Costs (What We Pay) - 2025 Actual Pricing

| Service | Backend Cost | Source |
|---------|--------------|--------|
| **Email** | $0.0001 | AWS SES: $0.10 per 1,000 emails |
| **SMS** | $0.0079 | Twilio: $0.0079 per segment (with carrier fees) |
| **WhatsApp** | $0.0064 | Twilio: $0.0014 utility + $0.005 per message |
| **Push Notifications** | $0.0000 | Firebase FCM: FREE (unlimited) |
| **IVR** | $0.0180 | AWS Connect: $0.018 per minute |
| **PDF Generation** | $0.0001 | AWS Lambda + S3 (minimal) |
| **Digital Signature** | $4.0000 | DocuSign API: ~$4 per envelope |
| **Document Archive** | $0.0010 | AWS S3: ~$0.001 per document/month |
| **ACH Transaction** | $0.5000 | Stripe/Plaid backend |
| **Card Transaction** | $0.5000 + 2.5%** | Stripe backend + interchange |

**\*Note:** For $100 card transaction, backend cost = $3.00 total

## Margin Analysis by Service (Tier 1 @ $0.00586/token)

| Service | Token Weight | Customer Pays | Backend Cost | Profit | Margin | Status |
|---------|--------------|---------------|--------------|--------|--------|--------|
| **Email** | 0.1 | $0.0006 | $0.0001 | $0.0005 | **74%** | ✅ Excellent |
| **SMS** | 1.0 | $0.0059 | $0.0079 | **-$0.0020** | **-34%** | ❌ LOSING MONEY |
| **WhatsApp** | 2.0 | $0.0117 | $0.0064 | $0.0053 | **45%** | ⚠️ Acceptable |
| **Push** | 0.05 | $0.0003 | $0.0000 | $0.0003 | **100%** | ✅ Excellent |
| **IVR** | 3.0 | $0.0176 | $0.0180 | **-$0.0004** | **-2%** | ❌ LOSING MONEY |
| **PDF** | 1.0 | $0.0059 | $0.0001 | $0.0058 | **98%** | ✅ Excellent |
| **Signature** | 7.0 | $0.0410 | $4.0000 | **-$3.9590** | **-9662%** | ❌ DISASTER |
| **Archive** | 4.0 | $0.0234 | $0.0010 | $0.0224 | **96%** | ✅ Excellent |
| **ACH** | 67 + $0.20 | $0.5922 | $0.5000 | $0.0922 | **16%** | ⚠️ Thin |
| **Card** | 67 + 2.7% + $0.20 | $3.3922 | $3.0000 | $0.3922 | **12%** | ⚠️ Thin |

## Critical Problems Identified

### 🚨 Problem 1: Digital Signatures Are DESTROYING Margins
- **Backend Cost:** $4.00 per signature (DocuSign API)
- **Customer Pays:** $0.04 (7 tokens @ $0.00586)
- **Loss per signature:** $3.96
- **Solution:**
  - Option A: Remove digital signatures from token model → charge separately ($5-10 per signature)
  - Option B: Increase token weight to 700+ (but this breaks the token model)
  - Option C: Use cheaper alternative (Docuseal, SignWell ~$0.50/signature)

### ⚠️ Problem 2: SMS Margins Are NEGATIVE
- **Backend Cost:** $0.0079 per segment
- **Customer Pays:** $0.0059 (1 token @ Tier 1)
- **Loss per SMS:** $0.0020
- **Impact:** Every SMS sent loses money until Tier 4+ ($0.00410/token)
- **Solution:**
  - Option A: Increase SMS token weight to 1.5-2 tokens
  - Option B: Accept loss as customer acquisition cost (if they use payment processing)

### ⚠️ Problem 3: IVR Margins Are NEGATIVE/BREAK-EVEN
- **Backend Cost:** $0.018 per minute
- **Customer Pays:** $0.0176 (3 tokens @ Tier 1)
- **Loss per minute:** $0.0004
- **Solution:**
  - Option A: Increase IVR token weight to 4 tokens
  - Option B: Accept thin margins (most customers don't use much IVR)

## What's Working Well ✅

### Email Communications
- **Margin: 74-80%** across all tiers
- AWS SES is extremely cheap ($0.0001 per email)
- Customer perception: High value for 0.1 tokens

### Push Notifications
- **Margin: 100%** (Firebase is FREE!)
- Pure profit on every push notification

### PDF Generation & Document Archive
- **Margin: 94-98%**
- Very low backend costs, good customer pricing

### Payment Processing (with volume)
- **Margin: 12-16%** (thin but positive)
- This is where we make money IF combined with high payment volumes
- The FREE payment communication credits help customer acquisition

## Free Tier Analysis (0-10K tokens)

**Customer Acquisition Cost (CAC) Examples:**

| Scenario | Tokens Used | Backend Cost | Customer Pays | CAC |
|----------|-------------|--------------|---------------|-----|
| 5K emails + 500 SMS | 1,000 | $4.45 | $0 | $4.45 |
| 8K emails + 1K SMS | 1,800 | $8.70 | $0 | $8.70 |
| 3K emails + 2K SMS | 2,300 | $16.10 | $0 | $16.10 |

**Max CAC Exposure:** ~$50-100 per free tier customer if they max out 10K tokens

**Is this acceptable?**
- ✅ YES if 30%+ convert to paid within 3 months
- ✅ YES if 20%+ adopt payment processing
- ❌ NO if free tier users never convert or use payment processing

## Business Model Viability

### Profitable Customer Profiles

✅ **Email-Heavy Customers**
- 50K emails/month = 5,000 tokens = $29.30/month
- Backend cost: $5.00
- **Profit: $24.30 (83% margin)**

✅ **Payment Processing Customers**
- 1,000 ACH transactions/month = 67,000 tokens + fees
- Token cost: $337.78 + $200 ACH fees = $537.78
- Backend cost: $500 (ACH) + Twilio SMS for reminders
- **Profit: ~$30-50/month (thin but positive)**

❌ **SMS-Heavy Customers (WITHOUT payments)**
- 10K SMS/month = 10,000 tokens = $58.60/month
- Backend cost: $79.00
- **LOSS: $20.40/month**

❌ **Digital Signature Customers**
- 100 signatures/month = 700 tokens = $4.10
- Backend cost: $400 (DocuSign)
- **LOSS: $395.90/month (DISASTER)**

### Required Customer Mix for Profitability

To achieve 40% gross margin overall, we need:

1. **60% of customers:** Email + Light SMS (high margin)
2. **30% of customers:** Payment Processing (medium margin, high revenue)
3. **10% of customers:** Enterprise features (signatures, high-value)

**Critical:** SMS-only customers and signature-heavy customers will lose money!

## Recommendations

### Option 1: ACCEPT CURRENT MODEL (High Risk)
**Pros:**
- Very competitive pricing
- Excellent customer acquisition
- Works if payment adoption is high

**Cons:**
- Negative margins on SMS/IVR
- Digital signatures are a disaster
- Free tier CAC is $5-15 per customer

**Required for success:**
- 30%+ payment processing adoption
- < 5% annual churn
- Aggressive upsell to payment features

### Option 2: ADJUST TOKEN WEIGHTS (Recommended)
**Changes:**
- SMS: 1.0 → **1.5 tokens** (still 40% cheaper than Twilio)
- IVR: 3.0 → **4.0 tokens** (still 50% cheaper than Twilio)
- Digital Signatures: **Remove from token model** → charge $5-10 per signature separately

**Impact:**
- SMS margin: -34% → **+10%**
- IVR margin: -2% → **+30%**
- Signatures: -9662% → **+50%** (if charged separately)
- Still very competitive vs. competitors

### Option 3: REDUCE FREE TIER
**Change:** 10K → 5K tokens for free tier

**Pros:**
- Reduces CAC by 50%
- Forces early monetization

**Cons:**
- May hurt conversion rates
- Competitors offer generous free tiers

### Option 4: HYBRID APPROACH (BEST)
1. ✅ Keep free tier at 10K for customer acquisition
2. ✅ Increase SMS to 1.5 tokens, IVR to 4 tokens
3. ✅ Remove digital signatures from token model → charge $5-10 separately
4. ✅ Replace DocuSign with cheaper alternative (SignWell: $0.50/signature)
5. ✅ Focus sales/marketing on payment processing customers
6. ✅ Limit free tier users who never convert (usage caps after 6 months)

## Critical Success Factors

For this pricing model to work:

1. **Payment Processing Adoption = CRITICAL**
   - Need 30%+ of customers using payment features
   - Payment processing is the main profit driver
   - FREE payment credits help drive adoption

2. **Free Tier Conversion**
   - Free users must convert to paid within 3-6 months
   - Otherwise CAC never pays back

3. **Customer Mix Management**
   - Avoid SMS-heavy customers without payment processing
   - Target email-heavy + payment processing customers
   - Charge separately for high-cost features (signatures)

4. **Churn Management**
   - Must keep churn < 5% annually
   - With thin margins, losing customers is deadly

5. **Cost Optimization**
   - Negotiate better Twilio rates at volume
   - Replace DocuSign with cheaper alternative
   - Consider self-hosted solutions for high-cost services

## Bottom Line

**Current pricing is AGGRESSIVE and RISKY:**
- ✅ Email, Push, Documents = Excellent margins (70-100%)
- ⚠️ WhatsApp, Payment Processing = Acceptable margins (12-45%)
- ❌ SMS, IVR = Negative or break-even margins
- ❌ Digital Signatures = Complete disaster

**This works ONLY if:**
1. Most customers use primarily Email + Push (high margin)
2. 30%+ of customers adopt payment processing (volume revenue)
3. We remove or reprice digital signatures
4. Free tier users convert quickly to paid

**Recommendation:** Implement **Option 4 (Hybrid Approach)** to fix the negative margin services while maintaining competitive pricing.
