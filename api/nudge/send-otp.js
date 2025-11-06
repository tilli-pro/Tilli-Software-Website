/**
 * Vercel Serverless Function: Send OTP via Nudge API
 * Endpoint: /api/nudge/send-otp
 * Requires: NUDGE_API_KEY environment variable in Vercel
 */

const NUDGE_SEND_ENDPOINT = "https://app.nudge.net/api/v2/Nudge/Send";

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed. Use POST.'
        });
    }

    // Check for API key in environment variables
    const apiKey = process.env.NUDGE_API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            success: false,
            error: 'NUDGE_API_KEY environment variable is not set on the server.'
        });
    }

    try {
        const { email, phone, firstName, company, channel } = req.body;

        // Validate required fields
        if (!email && !phone) {
            return res.status(400).json({
                success: false,
                error: 'Either email or phone is required.'
            });
        }

        if (channel && !['email', 'sms'].includes(channel)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid channel. Must be "email" or "sms".'
            });
        }

        // Construct Nudge API request payload
        const nudgePayload = {
            recipientType: "Customer",
            recipient: email || phone,
            channel: channel === 'sms' ? 'SMS' : 'Email',
            firstName: firstName || "",
            company: company || "",
            replyTo: "tilli@nudge.net",
            templateId: "OTP_VERIFICATION",
            data: {
                otpLength: 6,
                expiryMinutes: 10,
                purpose: "Demo Access Verification"
            }
        };

        // Forward request to Nudge API
        const response = await fetch(NUDGE_SEND_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey
            },
            body: JSON.stringify(nudgePayload)
        });

        const responseData = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                error: responseData.message || 'Failed to send OTP via Nudge.',
                details: responseData
            });
        }

        // Check if sessionId exists in response
        const sessionId = responseData.sessionId || responseData.otpSessionId || responseData.id;
        if (!sessionId) {
            return res.status(500).json({
                success: false,
                error: 'OTP session id missing from Nudge response. Please retry once the service issue is resolved.',
                nudgeResponse: responseData
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            sessionId: sessionId,
            message: `OTP sent successfully via ${channel || 'email'}.`
        });

    } catch (error) {
        console.error('Nudge send-otp error:', error);
        return res.status(500).json({
            success: false,
            error: 'Unexpected error contacting Nudge.',
            details: error.message
        });
    }
}
