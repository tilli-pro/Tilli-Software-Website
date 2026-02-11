// Service Configuration
const SERVICES = {
    'email': { tokens: 1, competitor: 0.00095 },
    'sms': { tokens: 3, competitor: 0.0079 },
    'ivr': { tokens: 11, competitor: 0.125 },
    'whatsapp-marketing': { tokens: 6, competitor: 0.0157 },
    'whatsapp-utility': { tokens: 4, competitor: 0.0064 },
    'push': { tokens: 1, competitor: 0.0010 },
    'survey': { tokens: 1, competitor: 0.05 },
    'payment-request': { tokens: 1, competitor: 0.00095 },
    'appointment': { tokens: 1, competitor: 0.0089 },
    'service-completion': { tokens: 1, competitor: 0.00095 },
    'loyalty': { tokens: 1, competitor: 0.10, base: 199 },
    'pdf': { tokens: 1, competitor: 0.015 },
    'signature': { tokens: 7, competitor: 4.50 },
    'archive': { tokens: 4, competitor: 0.05 },
    'qr': { tokens: 1, competitor: 0.001 },
    'ach': { tokens: 67, fee: 0.20, competitor: 0.80 },
    'card': { tokens: 67, fee: 0.20, percent: 0.027, avgAmount: 100, competitor: 0.30, competitorPercent: 0.029 },
    'returns': { tokens: 3334, competitor: 0 },
    'payout-ach': { tokens: 67, competitor: 0.25 },
    'virtual-card': { tokens: 134, competitor: 0.50 }
};

// Pricing Tiers
const TIERS = [
    { min: 0, max: 10000, rate: 0 },
    { min: 10001, max: 50000, rate: 0.00586 },
    { min: 50001, max: 100000, rate: 0.00528 },
    { min: 100001, max: 500000, rate: 0.00469 },
    { min: 500001, max: 1000000, rate: 0.00410 },
    { min: 1000001, max: Infinity, rate: 0.00352 }
];

// Calculate token cost using tiered pricing
function calculateTokenCost(tokens) {
    if (tokens === 0) return 0;
    let cost = 0;
    let remaining = tokens;
    for (const tier of TIERS) {
        if (remaining <= 0) break;
        const tierTokens = Math.min(remaining, tier.max - tier.min + 1);
        cost += tierTokens * tier.rate;
        remaining -= tierTokens;
    }
    return cost;
}

// Update slider gradient
function updateSliderGradient(slider) {
    const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #667eea 0%, #667eea ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`;
}

// Update all calculations
function updateCalculations() {
    let totalTilliCost = 0;
    let totalCompetitorCost = 0;
    let totalTokens = 0;

    // Calculate each service
    Object.keys(SERVICES).forEach(serviceId => {
        const service = SERVICES[serviceId];
        const slider = document.getElementById(`slider-${serviceId}`);
        if (!slider) return;

        const volume = parseInt(slider.value);
        const tokens = volume * service.tokens;
        totalTokens += tokens;
    });

    // Get blended token rate
    const tokenCost = calculateTokenCost(totalTokens);
    const tokenRate = totalTokens > 0 ? tokenCost / totalTokens : 0;

    // Update each service card
    Object.keys(SERVICES).forEach(serviceId => {
        const service = SERVICES[serviceId];
        const slider = document.getElementById(`slider-${serviceId}`);
        if (!slider) return;

        const volume = parseInt(slider.value);
        const tokens = volume * service.tokens;

        // Calculate Tilli cost
        let tilliCost = tokens * tokenRate;
        if (service.fee) tilliCost += volume * service.fee;
        if (service.percent) tilliCost += volume * service.avgAmount * service.percent;

        // Calculate competitor cost
        let competitorCost = volume * service.competitor;
        if (service.base) competitorCost += service.base;
        if (service.competitorPercent) competitorCost += volume * service.avgAmount * service.competitorPercent;

        // Update UI
        document.getElementById(`tokens-${serviceId}`).textContent = `${Math.round(tokens).toLocaleString()} tokens`;
        document.getElementById(`cost-tilli-${serviceId}`).textContent = `$${tilliCost.toFixed(2)}`;
        document.getElementById(`cost-competitor-${serviceId}`).textContent = `$${competitorCost.toFixed(2)}`;

        // Calculate savings
        const savings = competitorCost - tilliCost;
        const savingsPercent = competitorCost > 0 ? (savings / competitorCost * 100) : 0;

        const savingsBanner = document.getElementById(`savings-${serviceId}`);
        const savingsAmount = document.getElementById(`savings-amount-${serviceId}`);
        const savingsPercentEl = document.getElementById(`savings-percent-${serviceId}`);

        if (volume === 0) {
            savingsBanner.style.display = 'none';
            document.getElementById(`card-${serviceId}`).classList.add('no-volume');
        } else {
            savingsBanner.style.display = 'block';
            document.getElementById(`card-${serviceId}`).classList.remove('no-volume');

            if (savings > 0) {
                savingsAmount.textContent = `Save $${savings.toFixed(2)}/mo`;
                savingsPercentEl.textContent = `${savingsPercent.toFixed(0)}% cheaper with Tilli`;
            } else {
                savingsAmount.textContent = `$${Math.abs(savings).toFixed(2)} more`;
                savingsPercentEl.textContent = `Competitive pricing`;
            }
        }

        // Add to totals
        totalTilliCost += tilliCost;
        totalCompetitorCost += competitorCost;
    });

    // Update grand totals
    const totalSavings = totalCompetitorCost - totalTilliCost;
    const savingsPercent = totalCompetitorCost > 0 ? (totalSavings / totalCompetitorCost * 100) : 0;

    document.getElementById('grand-total-tilli').textContent = `$${totalTilliCost.toFixed(2)}`;
    document.getElementById('grand-total-competitor').textContent = `$${totalCompetitorCost.toFixed(2)}`;
    document.getElementById('grand-total-savings').textContent = `$${totalSavings.toFixed(2)}`;
    document.getElementById('grand-savings-percent').textContent =
        totalSavings > 0 ? `${savingsPercent.toFixed(0)}% cheaper • $${(totalSavings * 12).toLocaleString()}/year` : 'No savings yet';

    document.getElementById('total-savings-hero').textContent = `$${Math.round(totalSavings)}`;
    document.getElementById('annual-savings').textContent = `$${(totalSavings * 12).toLocaleString()}`;
}

// Initialize sliders
function initializeSliders() {
    Object.keys(SERVICES).forEach(serviceId => {
        const slider = document.getElementById(`slider-${serviceId}`);
        if (!slider) return;

        const valueEl = document.getElementById(`value-${serviceId}`);

        // Initial gradient
        updateSliderGradient(slider);

        slider.addEventListener('input', function() {
            valueEl.textContent = parseInt(this.value).toLocaleString();
            updateSliderGradient(this);
            updateCalculations();
        });

        valueEl.textContent = '0';
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    updateCalculations();
});
