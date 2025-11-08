/**
 * Comprehensive Service Configuration for Tilli Pricing Calculator
 * Maps each Tilli service to its best competitor with pricing
 */

const SERVICES_CONFIG = {
    // COMMUNICATIONS CHANNELS
    communications: [
        {
            id: 'email',
            name: 'Email',
            tokens: 1,
            max: 500000,
            step: 5000,
            competitor: 'SendGrid',
            competitorRate: 0.00095,
            competitorNote: 'Pay-as-you-go'
        },
        {
            id: 'sms',
            name: 'SMS',
            tokens: 3,
            max: 100000,
            step: 1000,
            competitor: 'Twilio',
            competitorRate: 0.0079,
            competitorNote: 'Standard rate + carrier fees'
        },
        {
            id: 'ivr',
            name: 'IVR Minutes',
            tokens: 11,
            max: 10000,
            step: 100,
            competitor: 'Five9',
            competitorRate: 0.125,
            competitorNote: '$125/agent/mo (avg 1000 min)'
        },
        {
            id: 'whatsapp-marketing',
            name: 'WhatsApp Marketing',
            tokens: 6,
            max: 50000,
            step: 500,
            competitor: 'Twilio WhatsApp',
            competitorRate: 0.0157,
            competitorNote: 'Marketing conversation rate'
        },
        {
            id: 'whatsapp-utility',
            name: 'WhatsApp Utility',
            tokens: 4,
            max: 50000,
            step: 500,
            competitor: 'Twilio WhatsApp',
            competitorRate: 0.0064,
            competitorNote: 'Utility conversation rate'
        },
        {
            id: 'push',
            name: 'Push Notifications',
            tokens: 1,
            max: 1000000,
            step: 10000,
            competitor: 'OneSignal',
            competitorRate: 0.0010,
            competitorNote: 'Advanced features plan'
        }
    ],

    // CAMPAIGNS
    campaigns: [
        {
            id: 'survey',
            name: 'Surveys (Responses)',
            tokens: 6,
            max: 50000,
            step: 500,
            competitor: 'Qualtrics',
            competitorRate: 0.05,
            competitorNote: 'Per response'
        },
        {
            id: 'payment-request',
            name: 'Payment Requests',
            tokens: 2,
            max: 50000,
            step: 500,
            competitor: 'SendGrid + Stripe',
            competitorRate: 0.00095,
            competitorNote: 'Email only (no payment link)'
        },
        {
            id: 'appointment-reminder',
            name: 'Appointment Reminders',
            tokens: 2,
            max: 50000,
            step: 500,
            competitor: 'Calendly + Twilio',
            competitorRate: 0.0089,
            competitorNote: '$8/user/mo + SMS costs',
            competitorBase: 8
        },
        {
            id: 'service-completion',
            name: 'Service Completion Notifications',
            tokens: 2,
            max: 50000,
            step: 500,
            competitor: 'SendGrid',
            competitorRate: 0.00095,
            competitorNote: 'Transactional email'
        },
        {
            id: 'loyalty-qr',
            name: 'Loyalty Rewards with QR Codes',
            tokens: 13,
            max: 50000,
            step: 500,
            competitor: 'Yotpo + SendGrid',
            competitorRate: 0.10,
            competitorNote: '$199/mo base + email',
            competitorBase: 199,
            unique: true
        }
    ],

    // DIGITAL DOCUMENTS
    documents: [
        {
            id: 'pdf',
            name: 'Print Composition (PDF)',
            tokens: 1,
            max: 100000,
            step: 1000,
            competitor: 'DocRaptor',
            competitorRate: 0.015,
            competitorNote: 'PDF generation API'
        },
        {
            id: 'signature',
            name: 'Digital Signatures',
            tokens: 7,
            max: 5000,
            step: 50,
            competitor: 'DocuSign',
            competitorRate: 4.50,
            competitorNote: 'API overage rate',
            tilliAdvantage: 'Own technology - 91% cheaper!'
        },
        {
            id: 'archive',
            name: 'Archived Documents',
            tokens: 4,
            max: 50000,
            step: 500,
            competitor: 'DocuWare',
            competitorRate: 0.05,
            competitorNote: 'Per document storage'
        },
        {
            id: 'qr-codes',
            name: 'QR Codes',
            tokens: 1,
            max: 100000,
            step: 1000,
            competitor: 'QR Code Generator API',
            competitorRate: 0.001,
            competitorNote: 'Dynamic QR codes'
        }
    ],

    // PAY IN
    payIn: [
        {
            id: 'ach',
            name: 'ACH Transactions',
            tokens: 67,
            max: 10000,
            step: 100,
            extraFee: 0.20,
            competitor: 'Stripe',
            competitorRate: 0.80,
            competitorNote: '$0.80 per ACH',
            tilliAdvantage: '75% cheaper ACH fees!'
        },
        {
            id: 'card',
            name: 'Card Transactions',
            tokens: 67,
            max: 10000,
            step: 100,
            extraFee: 0.20,
            percentFee: 0.027,
            avgTransaction: 100,
            competitor: 'Stripe',
            competitorRate: 0.30,
            competitorPercentFee: 0.029,
            competitorNote: '2.9% + $0.30',
            tilliAdvantage: '7% lower card fees!'
        },
        {
            id: 'returns',
            name: 'Returns / Refunds',
            tokens: 3334,
            max: 1000,
            step: 10,
            competitor: 'Stripe',
            competitorRate: 0,
            competitorNote: 'Free (but no fee refund)',
            unique: true
        }
    ],

    // PAY OUTS
    payOuts: [
        {
            id: 'payout-ach',
            name: 'ACH Payouts',
            tokens: 67,
            max: 10000,
            step: 100,
            competitor: 'Stripe Connect',
            competitorRate: 0.25,
            competitorNote: '$0.25 per payout',
            unique: true
        },
        {
            id: 'virtual-card',
            name: 'Virtual Cards Issuance',
            tokens: 134,
            max: 5000,
            step: 50,
            competitor: 'Marqeta',
            competitorRate: 0.50,
            competitorNote: '$0.50 per card',
            unique: true
        }
    ],

    // OTHER (FREE FEATURES)
    other: [
        {
            id: 'preference-mgmt',
            name: 'Free Preference Management',
            tokens: 0,
            max: 0,
            step: 0,
            isFree: true,
            competitor: 'OneTrust',
            competitorRate: 0,
            competitorNote: '$1,000+/mo enterprise',
            tilliAdvantage: 'FREE with Tilli!'
        },
        {
            id: 'customer-contacts',
            name: 'Free Customer Contacts',
            tokens: 0,
            max: 0,
            step: 0,
            isFree: true,
            competitor: 'HubSpot CRM',
            competitorRate: 0,
            competitorNote: 'Free but limited',
            tilliAdvantage: 'Unlimited FREE!'
        }
    ],

    // ADD-ONS & INTEGRATIONS
    addons: [
        {
            id: 'dedicated-ip',
            name: 'Dedicated Email IP',
            monthlyFee: 29,
            tokens: 0, // Converted from $29
            competitor: 'SendGrid',
            competitorRate: 79,
            competitorNote: '$79/mo for dedicated IP'
        },
        {
            id: 'accounting-connectors',
            name: 'Accounting Connectors',
            description: 'Quickbooks, Zoho, Xero, Sage, FreshBooks',
            monthlyFee: 15,
            tokens: 0,
            competitor: 'Zapier',
            competitorRate: 29.99,
            competitorNote: '$29.99/mo for integrations'
        },
        {
            id: 'crm-connectors',
            name: 'CRM Connectors',
            description: 'Salesforce, Monday.com',
            monthlyFee: 99,
            tokens: 0,
            competitor: 'MuleSoft/Workato',
            competitorRate: 299,
            competitorNote: '$299+/mo enterprise iPaaS'
        },
        {
            id: 'erp-connectors',
            name: 'ERP Connectors',
            description: 'SAP, NetSuite, JD Edwards, Oracle, Zoho',
            monthlyFee: 299,
            tokens: 0,
            competitor: 'MuleSoft/Boomi',
            competitorRate: 999,
            competitorNote: '$999+/mo enterprise iPaaS'
        }
    ]
};

// Competitor averages for total comparison
const COMPETITOR_AVERAGES = {
    'SendGrid': 0.00095,
    'Twilio': 0.0079,
    'Twilio WhatsApp': 0.0134,
    'OneSignal': 0.0010,
    'Five9': 0.125,
    'Talkdesk': 0.11,
    'RingCentral': 0.09,
    'Genesys': 0.15,
    'CloudTalk': 0.08,
    'Qualtrics': 0.05,
    'SurveyMonkey': 0.03,
    'Typeform': 0.025,
    'DocuSign': 4.50,
    'HelloSign': 2.75,
    'Adobe Sign': 3.50,
    'DocuWare': 0.05,
    'M-Files': 0.10,
    'Laserfiche': 0.12,
    'Stripe': 0.80, // ACH
    'Square': 1.00,
    'PayPal': 1.00
};

// Export for use in pricing calculator
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SERVICES_CONFIG, COMPETITOR_AVERAGES };
}
