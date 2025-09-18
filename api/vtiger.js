// Backend API endpoint for Vtiger CRM integration
// Deploy this to Vercel, Netlify Functions, or your Node.js server

const crypto = require('crypto');

// Import node-fetch for Vercel environment
const fetch = require('node-fetch');

// Configuration from environment variables
const VTIGER_URL = process.env.VTIGER_URL || 'https://utilliadmin.com/crm';
const VTIGER_USERNAME = process.env.VTIGER_USERNAME || 'admin';
const VTIGER_ACCESS_KEY = process.env.VTIGER_ACCESS_KEY || 'crsogur4p4yvzyur';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'sales@tilli.pro';

console.log('Vtiger configuration:', {
    url: VTIGER_URL,
    username: VTIGER_USERNAME,
    hasAccessKey: !!VTIGER_ACCESS_KEY,
    accessKeyLength: VTIGER_ACCESS_KEY ? VTIGER_ACCESS_KEY.length : 0
});

// Rate limiting store (simple in-memory store)
const rateLimitStore = new Map();

// Check rate limit (3 requests per minute per IP)
function checkRateLimit(ip) {
    const now = Date.now();
    const limit = 3;
    const window = 60000; // 1 minute

    const key = `vtiger-${ip}`;
    const entry = rateLimitStore.get(key);

    if (!entry || entry.resetTime < now) {
        rateLimitStore.set(key, { count: 1, resetTime: now + window });
        return true;
    }

    if (entry.count >= limit) {
        return false;
    }

    entry.count++;
    return true;
}

module.exports = async (req, res) => {
    // Enable CORS - allow from your domain
    const allowedOrigins = [
        'https://tillisoftware.com',
        'https://www.tillisoftware.com',
        'http://localhost:3000',
        'http://localhost:8000',
        'http://localhost:8348'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Test endpoint to verify API is working
    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'ok',
            message: 'Vtiger API is running',
            config: {
                url: VTIGER_URL,
                username: VTIGER_USERNAME,
                hasAccessKey: !!VTIGER_ACCESS_KEY
            }
        });
    }

    // Only accept POST requests for form submission
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('Vtiger API called with data:', JSON.stringify(req.body));

    // Check rate limiting
    const clientIp = req.headers['x-forwarded-for'] ||
                    req.headers['x-real-ip'] ||
                    req.connection?.remoteAddress ||
                    'unknown';

    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({
            error: 'Too many requests. Please wait 1 minute before submitting again.'
        });
    }

    try {
        const formData = req.body;

        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email) {
            return res.status(400).json({
                error: 'Missing required fields'
            });
        }

        // Step 1: Get challenge token from Vtiger
        const challengeUrl = `${VTIGER_URL}/webservice.php?operation=getchallenge&username=${VTIGER_USERNAME}`;

        console.log('Getting challenge token from:', challengeUrl);

        let challengeResponse;
        try {
            challengeResponse = await fetch(challengeUrl);
        } catch (fetchError) {
            console.error('Fetch error for challenge:', fetchError);
            throw new Error(`Failed to fetch challenge: ${fetchError.message}`);
        }

        if (!challengeResponse.ok) {
            throw new Error(`Challenge HTTP error! status: ${challengeResponse.status}`);
        }

        const challengeData = await challengeResponse.json();

        if (!challengeData.success) {
            console.error('Challenge error:', challengeData);
            throw new Error('Failed to get challenge token from Vtiger: ' + JSON.stringify(challengeData));
        }

        const token = challengeData.result.token;

        // Step 2: Create MD5 hash for authentication
        const accessKeyHash = crypto
            .createHash('md5')
            .update(token + VTIGER_ACCESS_KEY)
            .digest('hex');

        // Step 3: Login to Vtiger
        const loginParams = new URLSearchParams();
        loginParams.append('operation', 'login');
        loginParams.append('username', VTIGER_USERNAME);
        loginParams.append('accessKey', accessKeyHash);

        const loginResponse = await fetch(`${VTIGER_URL}/webservice.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: loginParams.toString()
        });
        const loginData = await loginResponse.json();

        if (!loginData.success) {
            console.error('Login error:', loginData);
            throw new Error('Failed to login to Vtiger: ' + JSON.stringify(loginData));
        }

        const sessionName = loginData.result.sessionName;
        const userId = loginData.result.userId;

        // Helper function to convert organization size to numeric
        const getEmployeeCount = (sizeRange) => {
            const sizeMap = {
                '1-10': 10,
                '11-50': 50,
                '51-200': 200,
                '201-1000': 1000,
                '1001-5000': 5000,
                '5001+': 10000
            };
            return sizeMap[sizeRange] || 0;
        };

        // Helper function to convert transaction volume to numeric
        const getAnnualRevenue = (volumeRange) => {
            const volumeMap = {
                '<100000': 100000,
                '100000-500000': 500000,
                '500001-1000000': 1000000,
                '1000001-5000000': 5000000,
                '5000001-10000000': 10000000,
                '10000001-50000000': 50000000,
                '50000001+': 100000000
            };
            return volumeMap[volumeRange] || 0;
        };

        // Step 4: Prepare lead data for Vtiger
        const leadDescription = [
            '=== TILLI DEMO REQUEST ===',
            `Date: ${new Date().toLocaleString()}`,
            `Source: ${formData.pageUrl || 'Tilli Website'}`,
            '',
            '--- CONTACT DETAILS ---',
            `Name: ${formData.firstName} ${formData.lastName}`,
            `Email: ${formData.email}`,
            `Company: ${formData.company || 'Not provided'}`,
            `Job Title: ${formData.jobTitle || 'Not provided'}`,
            `Phone: ${formData.phone || 'Not provided'}`,
            `Country: ${formData.country || 'Not provided'}`,
            '',
            '--- BUSINESS INFORMATION ---',
            `Organization Size: ${formData.organizationSize || 'Not provided'}`,
            `Use Case: ${formData.useCase || 'Not provided'}`,
            `Monthly Active Users: ${formData.monthlyActiveUsers || 'Not provided'}`,
            `Transaction Volume: ${formData.transactionVolume || 'Not provided'}`,
            '',
            '--- MESSAGE ---',
            formData.message || 'No message provided',
            '',
            '--- ADDITIONAL INFO ---',
            `Form Type: ${formData.formType || 'Demo Request'}`,
            `IP Address: ${clientIp}`,
            `User Agent: ${req.headers['user-agent'] || 'Unknown'}`
        ].join('\n');

        const leadData = {
            lastname: formData.lastName,
            firstname: formData.firstName,
            company: formData.company || '',
            email: formData.email,
            phone: formData.phone || '',
            designation: formData.jobTitle || '', // Job title maps to designation
            website: formData.website || '',
            description: leadDescription,
            leadsource: 'Tilli Website',
            leadstatus: 'Hot', // Demo requests are hot leads
            assigned_user_id: userId,
            annualrevenue: getAnnualRevenue(formData.transactionVolume),
            noofemployees: getEmployeeCount(formData.organizationSize),
            // Add any custom fields specific to your Vtiger setup
            // cf_xxx: formData.customField
        };

        // Step 5: Create lead in Vtiger
        const createParams = new URLSearchParams();
        createParams.append('operation', 'create');
        createParams.append('sessionName', sessionName);
        createParams.append('element', JSON.stringify(leadData));
        createParams.append('elementType', 'Leads');

        const createResponse = await fetch(`${VTIGER_URL}/webservice.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: createParams.toString()
        });
        const createData = await createResponse.json();

        if (!createData.success) {
            throw new Error('Failed to create lead in Vtiger');
        }

        // Step 6: Send email notification (optional)
        // You can integrate with SendGrid, AWS SES, or any email service here
        // await sendEmailNotification(formData, NOTIFICATION_EMAIL);

        // Success response
        return res.status(200).json({
            success: true,
            message: 'Lead created successfully',
            leadId: createData.result.id
        });

    } catch (error) {
        console.error('Vtiger integration error:', error);
        console.error('Error stack:', error.stack);
        console.error('Error message:', error.message);

        // Return more detailed error in development
        const isDevelopment = process.env.NODE_ENV === 'development' ||
                            process.env.VERCEL_ENV === 'development';

        return res.status(500).json({
            success: false,
            error: 'Failed to process request. Our team has been notified.',
            details: isDevelopment ? error.message : undefined,
            // In production, log this error to your monitoring service
        });
    }
};

// Helper function to send email notifications
async function sendEmailNotification(formData, toEmail) {
    // Implement email notification using your preferred service
    // Example with SendGrid, AWS SES, or Nodemailer
    const emailContent = {
        to: toEmail,
        from: 'noreply@tilli.pro',
        subject: `New Demo Request from ${formData.firstName} ${formData.lastName}`,
        text: `
            New demo request received:

            Name: ${formData.firstName} ${formData.lastName}
            Email: ${formData.email}
            Company: ${formData.company}
            Phone: ${formData.phone || 'Not provided'}
            Message: ${formData.message || 'None'}

            This lead has been automatically added to Vtiger CRM.
        `,
        html: `
            <h2>New Demo Request</h2>
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Company:</strong> ${formData.company}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Message:</strong> ${formData.message || 'None'}</p>
            <hr>
            <p><em>This lead has been automatically added to Vtiger CRM.</em></p>
        `
    };

    // Send email using your service
    // await sendgrid.send(emailContent);
}