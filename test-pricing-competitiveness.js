/**
 * Pricing Calculator Test Suite
 * Tests competitive pricing across various scenarios
 */

// Token weights configuration
const TOKEN_WEIGHTS = {
    email: 0.1,
    sms: 1,
    whatsapp: 2,
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

// Pricing tiers
const PRICING_TIERS = [
    { min: 0, max: 10000, rate: 0 },
    { min: 10001, max: 50000, rate: 0.00586 },
    { min: 50001, max: 100000, rate: 0.00528 },
    { min: 100001, max: 500000, rate: 0.00469 },
    { min: 500001, max: 1000000, rate: 0.00410 },
    { min: 1000001, max: Infinity, rate: 0.00352 }
];

// Calculate tiered token cost
function calculateTokenCost(tokens) {
    let cost = 0;
    let remainingTokens = tokens;

    for (const tier of PRICING_TIERS) {
        if (remainingTokens <= 0) break;

        const tierTokens = Math.min(
            remainingTokens,
            tier.max - tier.min + 1
        );

        cost += tierTokens * tier.rate;
        remainingTokens -= tierTokens;
    }

    return cost;
}

// Test scenario
function testScenario(scenario) {
    console.log(`\n========== ${scenario.name} ==========`);

    // Calculate Tilli tokens and costs
    const emailTokens = scenario.email * TOKEN_WEIGHTS.email;
    const smsTokens = scenario.sms * TOKEN_WEIGHTS.sms;
    const whatsappTokens = (scenario.whatsapp || 0) * TOKEN_WEIGHTS.whatsapp;
    const ivrTokens = (scenario.ivr || 0) * TOKEN_WEIGHTS.ivr;
    const pushTokens = (scenario.push || 0) * TOKEN_WEIGHTS.push;
    const campaignTokens = (scenario.campaigns || 0) * TOKEN_WEIGHTS.campaign;
    const achTokens = (scenario.ach || 0) * TOKEN_WEIGHTS.ach;
    const cardTokens = (scenario.card || 0) * TOKEN_WEIGHTS.card;

    const totalCommTokens = emailTokens + smsTokens + whatsappTokens + ivrTokens + pushTokens + campaignTokens;
    const totalPaymentTokens = achTokens + cardTokens;

    // Calculate FREE payment communication credits
    const totalPaymentVolume = (scenario.ach || 0) + (scenario.card || 0);
    const freePaymentEmailTokens = totalPaymentVolume * 0.50 * TOKEN_WEIGHTS.email;
    const freePaymentSMSTokens = totalPaymentVolume * 0.30 * TOKEN_WEIGHTS.sms;
    const freePaymentIVRTokens = totalPaymentVolume * 0.20 * TOKEN_WEIGHTS.ivr;
    const freePaymentTokens = freePaymentEmailTokens + freePaymentSMSTokens + freePaymentIVRTokens;

    const totalTokens = totalCommTokens + totalPaymentTokens;
    const billableTokens = Math.max(0, totalTokens - freePaymentTokens);
    const tokenCost = calculateTokenCost(billableTokens);

    // Calculate payment fees
    const achFees = (scenario.ach || 0) * 0.20;
    const cardFees = (scenario.card || 0) * ((scenario.avgCard || 100) * 0.027 + 0.20);

    const tilliTotal = tokenCost + achFees + cardFees;

    console.log('TILLI BREAKDOWN:');
    console.log(`  Email: ${scenario.email} × 0.1 = ${emailTokens.toFixed(2)} tokens`);
    console.log(`  SMS: ${scenario.sms} × 1 = ${smsTokens.toFixed(2)} tokens`);
    if (scenario.whatsapp) console.log(`  WhatsApp: ${scenario.whatsapp} × 2 = ${whatsappTokens.toFixed(2)} tokens`);
    if (scenario.ivr) console.log(`  IVR: ${scenario.ivr} × 3 = ${ivrTokens.toFixed(2)} tokens`);
    if (scenario.push) console.log(`  Push: ${scenario.push} × 0.05 = ${pushTokens.toFixed(2)} tokens`);
    if (scenario.campaigns) console.log(`  Campaigns: ${scenario.campaigns} × 0.1 = ${campaignTokens.toFixed(2)} tokens`);
    if (scenario.ach || scenario.card) {
        console.log(`  Payment Processing: ${totalPaymentVolume} × 67 = ${totalPaymentTokens.toFixed(2)} tokens`);
        console.log(`  🎁 FREE Payment Credits: -${freePaymentTokens.toFixed(2)} tokens`);
    }
    console.log(`  Total Tokens: ${totalTokens.toFixed(2)}`);
    console.log(`  Billable Tokens: ${billableTokens.toFixed(2)}`);
    console.log(`  Token Cost: $${tokenCost.toFixed(2)}`);
    if (achFees > 0) console.log(`  ACH Fees: $${achFees.toFixed(2)}`);
    if (cardFees > 0) console.log(`  Card Fees: $${cardFees.toFixed(2)}`);
    console.log(`  TOTAL: $${tilliTotal.toFixed(2)}`);

    // Calculate competitor costs
    console.log('\nCOMPETITOR COMPARISON:');

    // Twilio + SendGrid (most common combo)
    const twilioSMS = scenario.sms * 0.0079;
    const sendgridEmail = scenario.email * 0.00095;
    const twilioWhatsApp = (scenario.whatsapp || 0) * 0.005;
    const twilioIVR = (scenario.ivr || 0) * 0.014;

    // Payment processing (Stripe)
    const stripeACH = (scenario.ach || 0) * 0.80;
    const stripeCard = (scenario.card || 0) * ((scenario.avgCard || 100) * 0.029 + 0.30);

    // Payment notification costs for competitors
    const competitorPaymentEmails = totalPaymentVolume * 0.50;
    const competitorPaymentSMS = totalPaymentVolume * 0.30;
    const sendgridPaymentEmail = competitorPaymentEmails * 0.00095;
    const twilioPaymentSMS = competitorPaymentSMS * 0.0079;

    const twilioSendgridTotal = twilioSMS + sendgridEmail + twilioWhatsApp + twilioIVR +
                                stripeACH + stripeCard + sendgridPaymentEmail + twilioPaymentSMS;

    console.log(`  Twilio SMS: ${scenario.sms} × $0.0079 = $${twilioSMS.toFixed(2)}`);
    console.log(`  SendGrid Email: ${scenario.email} × $0.00095 = $${sendgridEmail.toFixed(2)}`);
    if (scenario.whatsapp) console.log(`  Twilio WhatsApp: ${scenario.whatsapp} × $0.005 = $${twilioWhatsApp.toFixed(2)}`);
    if (scenario.ivr) console.log(`  Twilio IVR: ${scenario.ivr} × $0.014 = $${twilioIVR.toFixed(2)}`);
    if (scenario.ach || scenario.card) {
        console.log(`  Stripe ACH: ${scenario.ach || 0} × $0.80 = $${stripeACH.toFixed(2)}`);
        console.log(`  Stripe Card: ${scenario.card || 0} × (2.9% + $0.30) = $${stripeCard.toFixed(2)}`);
        console.log(`  Payment Emails: ${competitorPaymentEmails} × $0.00095 = $${sendgridPaymentEmail.toFixed(2)}`);
        console.log(`  Payment SMS: ${competitorPaymentSMS} × $0.0079 = $${twilioPaymentSMS.toFixed(2)}`);
    }
    console.log(`  TOTAL: $${twilioSendgridTotal.toFixed(2)}`);

    // Mailchimp (for email-heavy scenarios)
    if (scenario.email > 500) {
        const mailchimpEmail = scenario.email * 0.002;
        console.log(`\n  Mailchimp Email: ${scenario.email} × $0.002 = $${mailchimpEmail.toFixed(2)}`);
    }

    // Calculate savings
    const savings = twilioSendgridTotal - tilliTotal;
    const savingsPercent = (savings / twilioSendgridTotal * 100).toFixed(1);

    console.log(`\n💰 SAVINGS vs Twilio+SendGrid+Stripe: $${savings.toFixed(2)} (${savingsPercent}%)`);

    // Verdict
    if (tilliTotal === 0) {
        console.log('✅ VERDICT: FREE on Tilli (within 10K token free tier)');
    } else if (savings > 0 && parseFloat(savingsPercent) >= 30) {
        console.log('✅ VERDICT: HIGHLY COMPETITIVE - Tilli saves 30%+');
    } else if (savings > 0) {
        console.log('✅ VERDICT: COMPETITIVE - Tilli is cheaper');
    } else if (Math.abs(savings) < twilioSendgridTotal * 0.1) {
        console.log('⚠️  VERDICT: COMPARABLE - Within 10% of competitors');
    } else {
        console.log('❌ VERDICT: NOT COMPETITIVE - Tilli is more expensive');
    }

    return {
        tilliTotal,
        competitorTotal: twilioSendgridTotal,
        savings,
        savingsPercent: parseFloat(savingsPercent)
    };
}

// Test scenarios
console.log('='.repeat(60));
console.log('TILLI PRICING COMPETITIVENESS TEST SUITE');
console.log('='.repeat(60));

const scenarios = [
    {
        name: 'Small Business - Email Heavy',
        email: 5000,
        sms: 500,
        campaigns: 100
    },
    {
        name: 'Small Business - Within Free Tier',
        email: 8000,
        sms: 300,
        campaigns: 50
    },
    {
        name: 'Medium Business - Balanced Communications',
        email: 20000,
        sms: 3000,
        whatsapp: 500,
        campaigns: 500
    },
    {
        name: 'Medium Business - With Payments',
        email: 15000,
        sms: 2000,
        campaigns: 300,
        ach: 500,
        card: 500,
        avgCard: 100
    },
    {
        name: 'Large Business - High Volume',
        email: 50000,
        sms: 10000,
        whatsapp: 2000,
        push: 5000,
        campaigns: 1000
    },
    {
        name: 'Large Business - Heavy Payments',
        email: 30000,
        sms: 5000,
        campaigns: 1000,
        ach: 2000,
        card: 2000,
        avgCard: 150
    },
    {
        name: 'Enterprise - Very High Volume',
        email: 150000,
        sms: 30000,
        whatsapp: 10000,
        push: 20000,
        ivr: 1000,
        campaigns: 5000
    },
    {
        name: 'Enterprise - Payment Heavy',
        email: 80000,
        sms: 15000,
        campaigns: 3000,
        ach: 5000,
        card: 5000,
        avgCard: 200
    },
    {
        name: 'SMS-Heavy Business (e.g., Delivery Service)',
        email: 10000,
        sms: 20000,
        push: 10000
    },
    {
        name: 'E-commerce with High Payment Volume',
        email: 40000,
        sms: 8000,
        campaigns: 2000,
        ach: 1000,
        card: 4000,
        avgCard: 80
    }
];

// Run all tests
const results = scenarios.map(scenario => ({
    name: scenario.name,
    ...testScenario(scenario)
}));

// Summary
console.log('\n' + '='.repeat(60));
console.log('SUMMARY OF ALL SCENARIOS');
console.log('='.repeat(60));

let competitiveCount = 0;
let notCompetitiveCount = 0;

results.forEach(result => {
    const status = result.savings > 0 ? '✅' : '❌';
    if (result.savings > 0) competitiveCount++;
    else notCompetitiveCount++;

    console.log(`${status} ${result.name}`);
    console.log(`   Tilli: $${result.tilliTotal.toFixed(2)} | Competitor: $${result.competitorTotal.toFixed(2)} | Savings: $${result.savings.toFixed(2)} (${result.savingsPercent}%)`);
});

console.log(`\n📊 OVERALL: ${competitiveCount}/${results.length} scenarios are competitive`);
if (competitiveCount === results.length) {
    console.log('🎉 EXCELLENT: Tilli is competitive in ALL scenarios!');
} else if (competitiveCount >= results.length * 0.8) {
    console.log('👍 GOOD: Tilli is competitive in most scenarios');
} else {
    console.log('⚠️  NEEDS WORK: Several scenarios are not competitive');
}
