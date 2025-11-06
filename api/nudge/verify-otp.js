/**
 * Vercel Serverless Function: Verify OTP via Nudge API
 * Endpoint: /api/nudge/verify-otp
 */

const NUDGE_VERIFY_ENDPOINT = "https://app.nudge.net/api/v1/Otp/Verify";

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
        const { sessionId, code } = req.body;

        // Validate required fields
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                error: 'Session ID is required.'
            });
        }

        if (!code) {
            return res.status(400).json({
                success: false,
                error: 'OTP code is required.'
            });
        }

        // Construct Nudge API V1 verification request
        // Format: { "OtpSessionId": "sessionId", "code": "123456" }
        const nudgePayload = {
            OtpSessionId: sessionId,
            code: code.toString()
        };

        // Forward request to Nudge API V1
        const response = await fetch(NUDGE_VERIFY_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json, text/plain, */*',
                'Authorization': apiKey
            },
            body: JSON.stringify(nudgePayload)
        });

        const responseData = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                error: responseData.message || 'Failed to verify OTP via Nudge.',
                details: responseData
            });
        }

        // Check if verification was successful
        // Nudge API returns various formats - check multiple fields
        const verified = responseData.verified || responseData.success || responseData.isValid || responseData.Success;

        if (!verified) {
            return res.status(400).json({
                success: false,
                error: 'Invalid OTP code. Please try again.',
                nudgeResponse: responseData
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            verified: true,
            message: 'OTP verified successfully.'
        });

    } catch (error) {
        console.error('Nudge verify-otp error:', error);
        return res.status(500).json({
            success: false,
            error: 'Unexpected error contacting Nudge.',
            details: error.message
        });
    }
}
