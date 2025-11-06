/**
 * Vercel Serverless Function: Verify OTP via Nudge API
 * Endpoint: /api/nudge/verify-otp
 *
 * NOTE: When Nudge returns OtpSessionId=0, we use Upstash for verification.
 * The verification logic automatically detects whether to use Nudge or Upstash.
 */

import { kv } from '@vercel/kv';

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

        // First, try Upstash verification (for cases where Nudge returned sessionId=0)
        try {
            const storedOtp = await kv.get(`otp:${sessionId}`);

            if (storedOtp !== null) {
                console.log(`Found OTP in Upstash for session: ${sessionId}`);

                // Verify OTP matches
                if (storedOtp === code || storedOtp === code.toString()) {
                    // Delete OTP after successful verification (one-time use)
                    await kv.del(`otp:${sessionId}`);

                    return res.status(200).json({
                        success: true,
                        verified: true,
                        verificationMethod: 'upstash',
                        message: 'OTP verified successfully via Upstash.'
                    });
                } else {
                    // Invalid OTP code
                    return res.status(400).json({
                        success: false,
                        error: 'Invalid OTP code. Please try again.',
                        verificationMethod: 'upstash'
                    });
                }
            }
        } catch (kvError) {
            console.error('Upstash lookup error:', kvError);
            // Continue to Nudge verification if Upstash fails
        }

        // If not in Upstash, try Nudge native verification
        console.log(`OTP not found in Upstash, trying Nudge verification for session: ${sessionId}`);

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
                verificationMethod: 'nudge',
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
                verificationMethod: 'nudge',
                nudgeResponse: responseData
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            verified: true,
            verificationMethod: 'nudge',
            message: 'OTP verified successfully via Nudge.'
        });

    } catch (error) {
        console.error('Nudge verify-otp error:', error);
        return res.status(500).json({
            success: false,
            error: 'Unexpected error during OTP verification.',
            details: error.message
        });
    }
}
