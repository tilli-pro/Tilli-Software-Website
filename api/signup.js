/**
 * Vercel Serverless Function: Handle product signup
 * Endpoint: /api/signup
 *
 * This endpoint:
 * 1. Validates the signup data
 * 2. Sends lead to VTiger CRM with selected products
 * 3. Initiates registration in Nudge and tilliPay (if selected)
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed. Use POST.'
        });
    }

    try {
        const {
            fullName,
            email,
            phone,
            companyName,
            industry,
            companySize,
            products,
            source,
            timestamp
        } = req.body;

        // Validate required fields
        if (!fullName || !email || !phone || !companyName || !industry || !companySize) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required.'
            });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Please select at least one product.'
            });
        }

        // Validate commercial email
        const consumerDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
        const emailDomain = email.toLowerCase().split('@')[1];
        if (consumerDomains.includes(emailDomain)) {
            return res.status(400).json({
                success: false,
                error: 'Please use a company email address.'
            });
        }

        // Prepare product names for CRM
        const productNames = {
            'nudge': 'Nudge',
            'tillipay': 'tilliPay',
            'tillix': 'tilliX',
            'tilliarc': 'tilliArc'
        };
        const selectedProductNames = products.map(p => productNames[p] || p).join(', ');

        // Send to VTiger CRM
        const crmPayload = {
            firstname: fullName.split(' ')[0],
            lastname: fullName.split(' ').slice(1).join(' ') || fullName.split(' ')[0],
            email: email,
            phone: phone,
            company: companyName,
            leadsource: 'Website Signup',
            industry: industry,
            description: `Signup Request for: ${selectedProductNames}\n\nCompany Size: ${companySize}\nSource: ${source}\nTimestamp: ${timestamp}`,
            cf_product_interest: selectedProductNames,
            assigned_user_id: '19x1' // Default assignment
        };

        const VTIGER_URL = process.env.VTIGER_URL || 'https://utilliadmin.com/crm';
        const VTIGER_USERNAME = process.env.VTIGER_USERNAME;
        const VTIGER_ACCESS_KEY = process.env.VTIGER_ACCESS_KEY;

        if (!VTIGER_USERNAME || !VTIGER_ACCESS_KEY) {
            console.error('VTiger credentials not configured');
            return res.status(500).json({
                success: false,
                error: 'CRM integration not configured. Please contact support.'
            });
        }

        // Create lead in VTiger
        const crmResponse = await createVTigerLead(VTIGER_URL, VTIGER_USERNAME, VTIGER_ACCESS_KEY, crmPayload);

        // Trigger product-specific signup automations
        const automationResults = {
            nudge: null,
            tillipay: null
        };

        // If Nudge is selected, trigger Nudge signup automation
        if (products.includes('nudge')) {
            try {
                const nudgeResponse = await fetch(`${req.headers.origin || 'https://tillisoftware.com'}/api/nudge/signup-automation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        phone,
                        fullName,
                        companyName
                    })
                });
                const nudgeData = await nudgeResponse.json();
                automationResults.nudge = {
                    success: nudgeData.success,
                    message: nudgeData.message || nudgeData.error,
                    password: nudgeData.temporaryPassword
                };
            } catch (error) {
                console.error('Nudge automation error:', error);
                automationResults.nudge = {
                    success: false,
                    message: 'Automation failed - will be processed manually'
                };
            }
        }

        // If tilliPay is selected, trigger tilliPay signup automation
        if (products.includes('tillipay')) {
            try {
                const tilliPayResponse = await fetch(`${req.headers.origin || 'https://tillisoftware.com'}/api/tillipay/signup-automation`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        phone,
                        fullName,
                        companyName
                    })
                });
                const tilliPayData = await tilliPayResponse.json();
                automationResults.tillipay = {
                    success: tilliPayData.success,
                    message: tilliPayData.message || tilliPayData.error,
                    password: tilliPayData.temporaryPassword
                };
            } catch (error) {
                console.error('tilliPay automation error:', error);
                automationResults.tillipay = {
                    success: false,
                    message: 'Automation failed - will be processed manually'
                };
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Signup successful! We will contact you shortly.',
            crmLeadId: crmResponse?.id || null,
            products: selectedProductNames,
            automations: automationResults
        });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            error: 'An error occurred during signup. Please try again or contact support.'
        });
    }
}

/**
 * Create lead in VTiger CRM
 */
async function createVTigerLead(baseUrl, username, accessKey, leadData) {
    try {
        // Step 1: Get challenge token
        const challengeUrl = `${baseUrl}/webservice.php?operation=getchallenge&username=${encodeURIComponent(username)}`;
        const challengeResponse = await fetch(challengeUrl);
        const challengeData = await challengeResponse.json();

        if (!challengeData.success) {
            throw new Error('Failed to get challenge token from VTiger');
        }

        const token = challengeData.result.token;

        // Step 2: Generate access key
        const crypto = await import('crypto');
        const generatedKey = crypto.createHash('md5').update(token + accessKey).digest('hex');

        // Step 3: Login
        const loginUrl = `${baseUrl}/webservice.php`;
        const loginParams = new URLSearchParams({
            operation: 'login',
            username: username,
            accessKey: generatedKey
        });

        const loginResponse = await fetch(`${loginUrl}?${loginParams}`);
        const loginData = await loginResponse.json();

        if (!loginData.success) {
            throw new Error('VTiger login failed');
        }

        const sessionId = loginData.result.sessionName;

        // Step 4: Create lead
        const leadPayload = {
            operation: 'create',
            sessionName: sessionId,
            elementType: 'Leads',
            element: JSON.stringify(leadData)
        };

        const createParams = new URLSearchParams(leadPayload);
        const createResponse = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: createParams
        });

        const createData = await createResponse.json();

        if (!createData.success) {
            throw new Error('Failed to create lead in VTiger');
        }

        return createData.result;

    } catch (error) {
        console.error('VTiger API error:', error);
        throw error;
    }
}
