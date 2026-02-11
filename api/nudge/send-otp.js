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

        // ========================================
        // GENERATE OUR OWN OTP CODE
        // ========================================
        // Nudge doesn't return the OTP in the API response, so we need to
        // generate it ourselves, send it via Nudge, and store it in Upstash
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        console.log(`[OTP] Generated code ${otpCode} for ${email || phone}`);

        // Store OTP and user data in Upstash immediately
        try {
            await kv.set(`otp:${recipientId}`, otpCode, { ex: 300 }); // 5 minutes expiry
            console.log(`[OTP] Stored in Upstash with key: otp:${recipientId}`);

            // Also store user data for VTiger lead creation after verification
            const userData = {
                email: email || null,
                phone: phone || null,
                firstName: firstName || null,
                company: company || null,
                channel: channel || 'email',
                timestamp: new Date().toISOString()
            };
            // Store as object - Upstash KV handles serialization automatically
            await kv.set(`otp_user:${recipientId}`, userData, { ex: 300 });
            console.log(`[OTP] Stored user data for VTiger lead creation`);
        } catch (kvError) {
            console.error('[OTP] Upstash storage error:', kvError);
            return res.status(500).json({
                success: false,
                error: 'Failed to store OTP. Please try again.'
            });
        }

        // Build message with the actual OTP code (no %OTP% placeholder)
        const name = firstName || "Customer";
        let message = `Hello ${name},\n\nYour Tilli demo verification code is ${otpCode}.\n\nIt expires in 5 minutes.`;
        if (company) {
            message += `\n\nRequested by ${company}.`;
        }
        message += `\n\nThank you,\nTilli Team`;

        // Construct Nudge API V2 request payload - sending our OTP directly
        // NOT using generateOtp flag since we're providing the code ourselves
        let nudgePayload;

        if (channel === 'sms' && phone) {
            // SMS channel
            nudgePayload = {
                recipientId: recipientId,
                template: {
                    bodyPlain: `Hello, your Tilli demo verification code is ${otpCode}. Valid for 5 minutes.`
                },
                toPhoneNumber: phone,
                senderNumber: "18448443464",
                channel: 1
            };
        } else {
            // Email channel (default)
            // Using simple HTML that Nudge can reliably deliver
            const htmlMessage = `<html><body style="font-family: Arial, sans-serif; padding: 20px;">
<h2 style="color: #4169E1;">Tilli Demo Verification</h2>
<p>Hello ${name},</p>
<p>Your verification code is:</p>
<p style="font-size: 28px; font-weight: bold; color: #4169E1; letter-spacing: 4px; padding: 15px; background: #f5f5f5; display: inline-block; border-radius: 8px;">${otpCode}</p>
<p>This code expires in 5 minutes.</p>
<p>Thank you,<br>The Tilli Team</p>
</body></html>`;

            nudgePayload = {
                recipientId: recipientId,
                toEmailAddress: email,
                senderName: "Tilli Software",
                senderEmail: "tilli@nudge.net",
                replyTo: "tilli@nudge.net",
                template: {
                    subject: "Your Tilli Demo OTP: " + otpCode,
                    bodyHtml: htmlMessage,
                    bodyPlain: message
                },
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
            console.error('Nudge API error:', responseData);
            return res.status(response.status || 400).json({
                success: false,
                error: responseData.message || 'Failed to send OTP via Nudge.',
                details: responseData
            });
        }

        console.log('[OTP] Nudge API response:', JSON.stringify(responseData));

        // Success! OTP was sent via Nudge and stored in Upstash
        // We use our recipientId as the sessionId for verification
        return res.status(200).json({
            success: true,
            sessionId: recipientId,
            notificationLogId: responseData.NotificationLogId,
            usingUpstash: true,
            message: `OTP sent successfully via ${channel || 'email'}.`,
            expiresIn: 300 // 5 minutes
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
