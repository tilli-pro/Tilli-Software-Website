/**
 * Vercel Serverless Function: Send OTP via Nudge API V2
 * Endpoint: /api/nudge/send-otp
 * Requires: NUDGE_API_KEY environment variable in Vercel
 */

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

        // Construct Nudge API V2 request payload
        const nudgePayload = {
            recipientId: recipientId,
            senderName: "Tilli Software",
            senderEmail: "info@tilli.pro",
            replyTo: "tilli@nudge.net",
            generateOtp: true,
            expirySeconds: 300,
            otpLength: 6,
            channel: channel === 'sms' ? 1 : 0,
            template: {
                subject: "Your Tilli Demo OTP",
                bodyHtml: "",
                bodyPlain: ""
            }
        };

        // Configure channel-specific fields
        if (channel === 'sms' && phone) {
            nudgePayload.toPhoneNumber = phone;
            nudgePayload.senderNumber = "18334561408";
            nudgePayload.template.bodyPlain = `Hello, your Tilli demo verification code is %OTP%. Valid for 5 minutes.`;
        } else {
            // Email channel (default)
            nudgePayload.toEmailAddress = email;
            const name = firstName || "Customer";
            let message = `Hello ${name}, your Tilli demo verification code is %OTP%. It expires in 5 minutes.`;
            if (company) {
                message += ` Requested by ${company}.`;
            }
            nudgePayload.template.bodyPlain = message;
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

        // Extract OTP session ID from Nudge API V2 response
        // Response format: { HasErrors, Code, NotificationLogId, OtpSessionId, ExpiresAt }
        const sessionId = responseData.OtpSessionId || responseData.NotificationLogId;

        if (!sessionId || sessionId === 0 || sessionId === '0') {
            // Note: Developer mentioned OtpSessionId returns 0 sometimes - use NotificationLogId as fallback
            const fallbackId = responseData.NotificationLogId || recipientId;
            return res.status(200).json({
                success: true,
                sessionId: fallbackId,
                notificationLogId: responseData.NotificationLogId,
                message: `OTP sent successfully via ${channel || 'email'}. Note: Using notification log ID for verification.`
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            sessionId: sessionId.toString(),
            notificationLogId: responseData.NotificationLogId,
            expiresAt: responseData.ExpiresAt,
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
