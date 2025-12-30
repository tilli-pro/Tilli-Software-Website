/**
 * Test endpoint to verify NUDGE_API_KEY is available
 * Endpoint: /api/nudge/test-env
 */

export default async function handler(req, res) {
    const hasKey = !!process.env.NUDGE_API_KEY;
    const keyLength = process.env.NUDGE_API_KEY ? process.env.NUDGE_API_KEY.length : 0;

    return res.status(200).json({
        hasNudgeApiKey: hasKey,
        keyLength: keyLength,
        timestamp: new Date().toISOString(),
        nodeVersion: process.version
    });
}
