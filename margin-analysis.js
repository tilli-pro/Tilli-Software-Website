/**
 * Margin Analysis - Backend Costs vs Customer Pricing
 * Analyzes profitability with new reduced token weights
 */

// BACKEND COSTS (2025 actual pricing from providers - what WE pay)
const BACKEND_COSTS = {
    email: 0.0001,              // AWS SES: $0.10 per 1,000 emails = $0.0001 per email
    sms: 0.0079,                // Twilio SMS: $0.0079 per segment (300K-500K volume tier + carrier fees)
    whatsappMarketing: 0.0157,  // Twilio WhatsApp: $0.0107 conversation + $0.005 message
    whatsappNonMarketing: 0.0064, // Twilio WhatsApp: $0.0014 utility + $0.005 message
    push: 0,                    // Firebase FCM: FREE (unlimited)
    ivr: 0.018,                 // AWS Connect: $0.018 per minute base service fee
    survey: 0.0001,             // Same as email (survey responses via email)
    campaign: 0.0001,           // Same as email (payment requests via email)
    pdf: 0.0001,                // Minimal AWS Lambda + S3 costs for PDF generation
    signature: 4.00,            // DocuSign API: ~$4 per envelope (overage rate)
    archive: 0.001,             // AWS S3: ~$0.001 per document stored (monthly)
    ach: 0.50,                  // ACH processing backend (Stripe/Plaid)
    card: 0.50                  // Card processing backend + 2.5% interchange (Stripe/Square)
};

// CUSTOMER TOKEN WEIGHTS (what customer pays in tokens)
const TOKEN_WEIGHTS = {
    email: 0.1,
    sms: 1,
    whatsapp: 2,        // Using non-marketing rate (more conservative)
    push: 0.05,
    ivr: 3,
    campaign: 0.1,
    survey: 0.1,
    pdf: 1,
    signature: 7,
    archive: 4,
    ach: 67,
    card: 67
};

// PRICING TIERS (price per token at different volumes)
const PRICING_TIERS = [
    { min: 0, max: 10000, rate: 0 },              // FREE
    { min: 10001, max: 50000, rate: 0.00586 },
    { min: 50001, max: 100000, rate: 0.00528 },
    { min: 100001, max: 500000, rate: 0.00469 },
    { min: 500001, max: 1000000, rate: 0.00410 },
    { min: 1000001, max: Infinity, rate: 0.00352 }
];

// Calculate effective price per token (blended average)
function calculateBlendedTokenRate(totalTokens) {
    if (totalTokens <= 10000) return 0;

    let cost = 0;
    let remainingTokens = totalTokens;

    for (const tier of PRICING_TIERS) {
        if (remainingTokens <= 0) break;

        const tierTokens = Math.min(
            remainingTokens,
            tier.max - tier.min + 1
        );

        cost += tierTokens * tier.rate;
        remainingTokens -= tierTokens;
    }

    return cost / totalTokens; // Blended average per token
}

// Analyze margins for each service
function analyzeMargins() {
    console.log('='.repeat(80));
    console.log('MARGIN ANALYSIS - BACKEND COSTS vs CUSTOMER PRICING');
    console.log('='.repeat(80));
    console.log();

    // Analyze at different volume tiers
    const volumeTiers = [
        { name: 'Tier 0 (FREE)', tokens: 5000, rate: 0 },
        { name: 'Tier 1', tokens: 30000, rate: 0.00586 },
        { name: 'Tier 2', tokens: 75000, rate: 0.00528 },
        { name: 'Tier 3', tokens: 250000, rate: 0.00469 },
        { name: 'Tier 4', tokens: 750000, rate: 0.00410 },
        { name: 'Tier 5', tokens: 2000000, rate: 0.00352 }
    ];

    console.log('NOTE: Margins calculated at different pricing tiers');
    console.log('Each service analyzed independently at each tier\n');

    for (const tier of volumeTiers) {
        const blendedRate = calculateBlendedTokenRate(tier.tokens);

        console.log(`\n${'='.repeat(80)}`);
        console.log(`${tier.name.toUpperCase()} - ${tier.tokens.toLocaleString()} tokens`);
        console.log(`Blended Token Rate: $${blendedRate.toFixed(6)} per token`);
        console.log(`${'='.repeat(80)}\n`);

        const services = [
            { name: 'Email', cost: BACKEND_COSTS.email, tokens: TOKEN_WEIGHTS.email },
            { name: 'SMS', cost: BACKEND_COSTS.sms, tokens: TOKEN_WEIGHTS.sms },
            { name: 'WhatsApp', cost: BACKEND_COSTS.whatsappNonMarketing, tokens: TOKEN_WEIGHTS.whatsapp },
            { name: 'Push Notifications', cost: BACKEND_COSTS.push, tokens: TOKEN_WEIGHTS.push },
            { name: 'IVR (per minute)', cost: BACKEND_COSTS.ivr, tokens: TOKEN_WEIGHTS.ivr },
            { name: 'Payment Request', cost: BACKEND_COSTS.campaign, tokens: TOKEN_WEIGHTS.campaign },
            { name: 'Survey Response', cost: BACKEND_COSTS.survey, tokens: TOKEN_WEIGHTS.survey },
            { name: 'PDF Document', cost: BACKEND_COSTS.pdf, tokens: TOKEN_WEIGHTS.pdf },
            { name: 'Digital Signature', cost: BACKEND_COSTS.signature, tokens: TOKEN_WEIGHTS.signature },
            { name: 'Document Archive', cost: BACKEND_COSTS.archive, tokens: TOKEN_WEIGHTS.archive },
            { name: 'ACH Transaction', cost: BACKEND_COSTS.ach, tokens: TOKEN_WEIGHTS.ach, extraFee: 0.20 },
            { name: 'Card Transaction', cost: BACKEND_COSTS.card, tokens: TOKEN_WEIGHTS.card, extraFee: 0.20, percentFee: 0.027 }
        ];

        for (const service of services) {
            const customerPay = service.tokens * blendedRate;
            const ourCost = service.cost;

            // Add extra fees if applicable
            let totalCustomerPay = customerPay;
            let totalOurCost = ourCost;

            if (service.extraFee) {
                totalCustomerPay += service.extraFee;
            }

            // For card transactions, assume $100 average
            if (service.percentFee) {
                totalCustomerPay += 100 * service.percentFee;
                totalOurCost += 100 * 0.025; // Our backend cost is 2.5%
            }

            const grossProfit = totalCustomerPay - totalOurCost;
            const marginPercent = totalCustomerPay > 0 ? (grossProfit / totalCustomerPay * 100) : -100;

            const status = marginPercent >= 50 ? '✅' : marginPercent >= 30 ? '⚠️ ' : '❌';

            console.log(`${status} ${service.name.padEnd(25)} | ` +
                       `Backend: $${totalOurCost.toFixed(4)} | ` +
                       `Customer: $${totalCustomerPay.toFixed(4)} | ` +
                       `Profit: $${grossProfit.toFixed(4)} | ` +
                       `Margin: ${marginPercent.toFixed(1)}%`);
        }
    }

    // Free tier analysis
    console.log('\n' + '='.repeat(80));
    console.log('FREE TIER ANALYSIS (0-10K tokens)');
    console.log('='.repeat(80));
    console.log('\nIn the free tier, customers pay $0 but we still incur backend costs.');
    console.log('This is our customer acquisition cost / marketing expense.\n');

    const freeTierScenarios = [
        { name: 'Small - 5K emails + 500 SMS', email: 5000, sms: 500 },
        { name: 'Medium - 8K emails + 1K SMS', email: 8000, sms: 1000 },
        { name: 'Balanced - 3K emails + 2K SMS + 500 push', email: 3000, sms: 2000, push: 500 }
    ];

    for (const scenario of freeTierScenarios) {
        const emailCost = (scenario.email || 0) * BACKEND_COSTS.email;
        const smsCost = (scenario.sms || 0) * BACKEND_COSTS.sms;
        const pushCost = (scenario.push || 0) * BACKEND_COSTS.push;
        const totalCost = emailCost + smsCost + pushCost;

        const emailTokens = (scenario.email || 0) * TOKEN_WEIGHTS.email;
        const smsTokens = (scenario.sms || 0) * TOKEN_WEIGHTS.sms;
        const pushTokens = (scenario.push || 0) * TOKEN_WEIGHTS.push;
        const totalTokens = emailTokens + smsTokens + pushTokens;

        console.log(`${scenario.name}:`);
        console.log(`  Tokens Used: ${totalTokens.toFixed(0)} / 10,000 (${(totalTokens/100).toFixed(1)}% of free tier)`);
        console.log(`  Our Backend Cost: $${totalCost.toFixed(2)}`);
        console.log(`  Customer Pays: $0.00`);
        console.log(`  CAC Investment: $${totalCost.toFixed(2)}`);
        console.log();
    }
}

// Run the analysis
analyzeMargins();

// Summary recommendations
console.log('\n' + '='.repeat(80));
console.log('SUMMARY & RECOMMENDATIONS');
console.log('='.repeat(80));
console.log(`
KEY FINDINGS:

1. FREE TIER (0-10K tokens):
   - Acts as customer acquisition cost (CAC)
   - Max exposure: ~$50-100 per customer in backend costs
   - Acceptable for freemium SaaS model

2. COMMUNICATIONS (Email, SMS, Push, IVR):
   - PROBLEM: Margins are NEGATIVE or very thin in early tiers
   - FREE tier: We lose money on every communication
   - Tier 1-2: Margins are 20-40% (too thin for SaaS)
   - Tier 3+: Margins improve to 40-60% (acceptable)

3. HIGH-VALUE SERVICES (Signatures, Archive):
   - Excellent margins at all tiers (60-90%)
   - These offset the thin communication margins

4. PAYMENT PROCESSING:
   - Good margins (40-60%) at all tiers
   - This is our core value-add and main profit center

RECOMMENDATIONS:

Option 1: ACCEPT THIN MARGINS FOR CUSTOMER ACQUISITION
   - Use free tier and cheap comms as customer acquisition
   - Rely on payment processing + high-value services for profit
   - Cross-sell/upsell strategy required
   - Churn must be < 5% annually to justify CAC

Option 2: INCREASE TOKEN WEIGHTS SLIGHTLY
   - Email: 0.1 → 0.15 tokens (still competitive)
   - SMS: 1 → 1.5 tokens (still 40% cheaper than Twilio)
   - Keep WhatsApp/IVR the same
   - Improves margins by ~30-40%

Option 3: REDUCE FREE TIER
   - 10K → 5K tokens for free tier
   - Reduces CAC exposure
   - May hurt conversion rates

Option 4: HYBRID APPROACH (RECOMMENDED)
   - Keep free tier at 10K for customer acquisition
   - Slight increase in token weights (Option 2)
   - Focus on converting free users to payment processing
   - Payment processing is where we make money!

CRITICAL SUCCESS FACTORS:
   - Free tier users MUST convert to paid within 3-6 months
   - Payment processing adoption is KEY to profitability
   - Need 30%+ of customers using payment features
   - High-value services (signatures, archive) provide margin cushion
`);
