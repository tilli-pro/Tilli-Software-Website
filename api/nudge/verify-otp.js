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

        // Verify OTP using Upstash (we generate and store our own OTPs)
        console.log(`[OTP] Verifying code for session: ${sessionId}`);

        try {
            const storedOtp = await kv.get(`otp:${sessionId}`);
            console.log(`[OTP] Retrieved from Upstash:`, storedOtp ? `Found: ${storedOtp}` : 'Not found');

            if (storedOtp === null || storedOtp === undefined) {
                console.log(`[OTP] No OTP found in Upstash for session: ${sessionId}`);
                return res.status(400).json({
                    success: false,
                    error: 'OTP expired or not found. Please request a new code.',
                    verificationMethod: 'upstash'
                });
            }

            // Verify OTP matches (compare as strings)
            const inputCode = code.toString().trim();
            const storedCode = storedOtp.toString().trim();

            console.log(`[OTP] Comparing: input="${inputCode}" vs stored="${storedCode}"`);

            if (storedCode === inputCode) {
                // Delete OTP after successful verification (one-time use)
                await kv.del(`otp:${sessionId}`);
                console.log(`[OTP] Verification successful, OTP deleted`);

                return res.status(200).json({
                    success: true,
                    verified: true,
                    verificationMethod: 'upstash',
                    message: 'OTP verified successfully.'
                });
            } else {
                console.log(`[OTP] Verification failed - code mismatch`);
                return res.status(400).json({
                    success: false,
                    error: 'Invalid OTP code. Please try again.',
                    verificationMethod: 'upstash'
                });
            }
        } catch (kvError) {
            console.error('[OTP] Upstash error:', kvError);
            return res.status(500).json({
                success: false,
                error: 'Error verifying OTP. Please try again.',
                details: kvError.message
            });
        }

    } catch (error) {
        console.error('Nudge verify-otp error:', error);
        return res.status(500).json({
            success: false,
            error: 'Unexpected error during OTP verification.',
            details: error.message
        });
    }
}
