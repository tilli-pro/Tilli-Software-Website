/**
 * Vercel Serverless Function: Send OTP via Nudge API V2
 * Endpoint: /api/nudge/send-otp
 * Requires: NUDGE_API_KEY environment variable in Vercel
 *
 * NOTE: When Nudge returns OtpSessionId=0, we use Upstash as fallback storage.
 * Once Nudge V2 is fixed, Upstash won't be needed.
 */

import { kv } from '@vercel/kv';

const NUDGE_SEND_ENDPOINT = "https://app.nudge.net/api/v2/Nudge/Send";

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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

        // Generate unique recipient ID
        const recipientId = generateUUID();

        // Build message with proper line breaks
        const name = firstName || "Customer";
        let message = `Hello ${name},\n\nYour Tilli demo verification code is %OTP%.\n\nIt expires in 5 minutes.`;
        if (company) {
            message += `\n\nRequested by ${company}.`;
        }
        message += `\n\nThank you,\nTilli Team`;

        // Construct Nudge API V2 request payload - exact format from developer docs
        let nudgePayload;

        if (channel === 'sms' && phone) {
            // SMS channel
            nudgePayload = {
                recipientId: recipientId,
                template: {
                    bodyPlain: `Hello, your Tilli demo verification code is %OTP%. Valid for 5 minutes.`
                },
                toPhoneNumber: phone,
                senderNumber: "18334561408",
                generateOtp: true,
                expirySeconds: 300,
                otpLength: 6,
                channel: 1
            };
        } else {
            // Email channel (default)
            nudgePayload = {
                recipientId: recipientId,
                toEmailAddress: email,
                senderName: "Tilli Software",
                senderEmail: "tilli@nudge.net",
                replyTo: "tilli@nudge.net",
                template: {
                    subject: "Your Tilli Demo OTP",
                    bodyHtml: "",
                    bodyPlain: message
                },
                generateOtp: true,
                expirySeconds: 300,
                otpLength: 6,
                channel: 0
            };
        }

        // Forward request to Nudge API
        const response = await fetch(NUDGE_SEND_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json, text/plain, */*',
                'Authorization': apiKey
            },
            body: JSON.stringify(nudgePayload)
        });

        const responseData = await response.json();

        if (!response.ok || responseData.HasErrors) {
            return res.status(response.status || 400).json({
                success: false,
                error: responseData.message || 'Failed to send OTP via Nudge.',
                details: responseData
            });
        }

        // Extract OTP session ID and OTP code from Nudge API V2 response
        // Response format: { HasErrors, Code, NotificationLogId, OtpSessionId, ExpiresAt, Otp }
        const sessionId = responseData.OtpSessionId;
        const notificationLogId = responseData.NotificationLogId;
        const otpCode = responseData.Otp || responseData.Code;
        const expiresAt = responseData.ExpiresAt;

        // Check if sessionId is 0 (known Nudge bug) - use Upstash as fallback
        if (!sessionId || sessionId === 0 || sessionId === '0') {
            console.log('Nudge returned sessionId=0, using Upstash fallback');

            // Use NotificationLogId as the key for Upstash storage
            const fallbackId = notificationLogId || recipientId;

            if (otpCode) {
                // Store OTP in Upstash with 5 minute expiry (300 seconds)
                try {
                    await kv.set(`otp:${fallbackId}`, otpCode, { ex: 300 });
                    console.log(`OTP stored in Upstash with key: otp:${fallbackId}`);
                } catch (kvError) {
                    console.error('Upstash storage error:', kvError);
                    // Continue anyway - OTP was sent, worst case user can request new one
                }
            }

            return res.status(200).json({
                success: true,
                sessionId: fallbackId,
                notificationLogId: notificationLogId,
                usingUpstash: true,
                message: `OTP sent successfully via ${channel || 'email'}. Using Upstash fallback for verification.`
            });
        }

        // Success response - Nudge native verification will work
        return res.status(200).json({
            success: true,
            sessionId: sessionId.toString(),
            notificationLogId: notificationLogId,
            expiresAt: expiresAt,
            usingUpstash: false,
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
