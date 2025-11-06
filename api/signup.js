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
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed. Use POST.'
        });
    }

    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            companyName,
            industry,
            companySize,
            password,
            products,
            source,
            timestamp
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phone || !companyName || !industry || !companySize || !password) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required.'
            });
        }

        // Validate password requirements
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({
                success: false,
                error: `Password does not meet requirements: ${passwordValidation.errors.join(', ')}`
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
            'tilliarc': 'tilliArc',
            'xdex': 'XDEX'
        };
        const selectedProductNames = products.map(p => productNames[p] || p).join(', ');

        // Send to VTiger CRM
        const crmPayload = {
            firstname: firstName,
            lastname: lastName,
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

        console.log('[SIGNUP] VTiger config:', {
            url: VTIGER_URL,
            username: VTIGER_USERNAME ? '***' : 'MISSING',
            accessKey: VTIGER_ACCESS_KEY ? '***' : 'MISSING'
        });

        if (!VTIGER_USERNAME || !VTIGER_ACCESS_KEY) {
            console.error('VTiger credentials not configured');
            return res.status(500).json({
                success: false,
                error: 'CRM integration not configured. Please contact support.'
            });
        }

        // Create lead in VTiger
        console.log('[SIGNUP] Creating VTiger lead...');
        const crmResponse = await createVTigerLead(VTIGER_URL, VTIGER_USERNAME, VTIGER_ACCESS_KEY, crmPayload);
        console.log('[SIGNUP] VTiger lead created:', crmResponse?.id || 'no id');

        // Use the password provided by the user (already validated above)
        const userPassword = password;

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
                        firstName,
                        lastName,
                        fullName: `${firstName} ${lastName}`,
                        companyName,
                        password: userPassword
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
                        firstName,
                        lastName,
                        fullName: `${firstName} ${lastName}`,
                        companyName,
                        password: userPassword
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
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            cause: error.cause
        });

        return res.status(500).json({
            success: false,
            error: 'An error occurred during signup. Please try again or contact support.',
            debug: process.env.NODE_ENV === 'development' ? {
                message: error.message,
                stack: error.stack
            } : undefined
        });
    }
}

/**
 * Validate password meets enterprise requirements
 * Requirements: 8+ chars, uppercase, lowercase, number, special characters
 */
function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
        errors.push('at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('one number');
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('one special character');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Create lead in VTiger CRM
 */
async function createVTigerLead(baseUrl, username, accessKey, leadData) {
    try {
        console.log('[VTIGER] Starting lead creation');

        // Step 1: Get challenge token
        const challengeUrl = `${baseUrl}/webservice.php?operation=getchallenge&username=${encodeURIComponent(username)}`;
        console.log('[VTIGER] Getting challenge from:', challengeUrl);

        const challengeResponse = await fetch(challengeUrl);
        console.log('[VTIGER] Challenge response status:', challengeResponse.status);

        const challengeData = await challengeResponse.json();
        console.log('[VTIGER] Challenge data:', challengeData);

        if (!challengeData.success) {
            throw new Error('Failed to get challenge token from VTiger: ' + JSON.stringify(challengeData));
        }

        const token = challengeData.result.token;
        console.log('[VTIGER] Got token:', token ? '***' : 'NONE');

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
