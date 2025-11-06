/**
 * Temporary OTP storage (in-memory)
 * This is a workaround until Nudge fixes the OtpSessionId=0 issue
 * In production, this would be better handled with Redis or a database
 */

// In-memory store for OTPs (will reset on serverless function cold starts)
const otpStore = new Map();

// Clean up expired OTPs every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, data] of otpStore.entries()) {
        if (now > data.expiresAt) {
            otpStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

export function storeOTP(notificationLogId, otp, expirySeconds = 300) {
    const expiresAt = Date.now() + (expirySeconds * 1000);
    otpStore.set(notificationLogId, {
        otp: otp.toString(),
        expiresAt: expiresAt
    });
}

export function verifyOTP(notificationLogId, otp) {
    const stored = otpStore.get(notificationLogId);

    if (!stored) {
        return { valid: false, error: 'OTP session not found or expired' };
    }

    if (Date.now() > stored.expiresAt) {
        otpStore.delete(notificationLogId);
        return { valid: false, error: 'OTP has expired' };
    }

    if (stored.otp !== otp.toString()) {
        return { valid: false, error: 'Invalid OTP code' };
    }

    // OTP is valid - delete it (one-time use)
    otpStore.delete(notificationLogId);
    return { valid: true };
}
