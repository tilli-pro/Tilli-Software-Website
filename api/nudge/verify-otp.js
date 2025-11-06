/**
 * Vercel Serverless Function: Verify OTP via Nudge API
 * Endpoint: /api/nudge/verify-otp
 *
 * NOTE: When Nudge returns OtpSessionId=0, we use Upstash for verification.
 * The verification logic automatically detects whether to use Nudge or Upstash.
 *
 * After successful verification, creates a lead in VTiger CRM.
 */

import { kv } from '@vercel/kv';
import crypto from 'crypto';

const NUDGE_VERIFY_ENDPOINT = "https://app.nudge.net/api/v1/Otp/Verify";

// VTiger lead creation function
async function createVTigerLead(userData) {
    const VTIGER_URL = process.env.VTIGER_URL || 'https://utilliadmin.com/crm';
    const VTIGER_USERNAME = process.env.VTIGER_USERNAME || 'admin';
    const VTIGER_ACCESS_KEY = process.env.VTIGER_ACCESS_KEY || 'crsogur4p4yvzyur';

    try {
        console.log('[VTIGER] Creating lead for OTP verified user:', userData.email || userData.phone);

        // Step 1: Get challenge token
        const challengeResponse = await fetch(`${VTIGER_URL}/webservice.php?operation=getchallenge&username=${VTIGER_USERNAME}`);
        const challengeData = await challengeResponse.json();

        if (!challengeData.success) {
            throw new Error('Failed to get VTiger challenge token');
        }

        const token = challengeData.result.token;

        // Step 2: Create MD5 hash
        const accessKeyHash = crypto
            .createHash('md5')
            .update(token + VTIGER_ACCESS_KEY)
            .digest('hex');

        // Step 3: Login
        const loginParams = new URLSearchParams();
        loginParams.append('operation', 'login');
        loginParams.append('username', VTIGER_USERNAME);
        loginParams.append('accessKey', accessKeyHash);

        const loginResponse = await fetch(`${VTIGER_URL}/webservice.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: loginParams.toString()
        });
        const loginData = await loginResponse.json();

        if (!loginData.success) {
            throw new Error('Failed to login to VTiger');
        }

        const sessionName = loginData.result.sessionName;
        const userId = loginData.result.userId;

        // Step 4: Prepare lead data
        // VTiger requires non-empty firstname and lastname
        let firstName = 'Demo';
        let lastName = 'User';

        if (userData.email) {
            const emailParts = userData.email.split('@');
            lastName = emailParts[0] || 'User';
            firstName = 'Demo';
        } else if (userData.phone) {
            lastName = userData.phone.replace(/[^0-9]/g, '').slice(-4) || 'User';
            firstName = 'Demo';
        }

        // Use provided firstName if available
        if (userData.firstName && userData.firstName.trim()) {
            firstName = userData.firstName.trim();
        }

        const company = userData.company || (userData.email ? userData.email.split('@')[1] : 'Demo Company');

        const leadDescription = [
            '=== OTP DEMO VERIFICATION ===',
            `Date: ${userData.timestamp || new Date().toISOString()}`,
            `Source: Demo OTP Verification`,
            `Channel: ${userData.channel || 'email'}`,
            '',
            '--- CONTACT DETAILS ---',
            `Email: ${userData.email || 'Not provided'}`,
            `Phone: ${userData.phone || 'Not provided'}`,
            `First Name: ${firstName}`,
            `Company: ${company}`,
            '',
            'User verified their contact information via OTP to access product demos.',
            'This is a warm lead - user showed interest by completing verification.'
        ].join('\n');

        const leadData = {
            lastname: lastName,
            firstname: firstName,
            company: company,
            email: userData.email || '',
            phone: userData.phone || '',
            description: leadDescription,
            leadsource: 'Demo OTP Verification',
            leadstatus: 'Warm', // OTP verifications are warm leads
            assigned_user_id: '19x1', // Default assignment
            // Required custom fields
            cf_913: 'Demo Access', // Use case field
            cf_915: 'United States', // Country field
            cf_917: 'Not specified', // Monthly active users
            cf_919: 'Product Demo Interest' // Product interest
        };

        // Step 5: Create lead
        const createParams = new URLSearchParams();
        createParams.append('operation', 'create');
        createParams.append('sessionName', sessionName);
        createParams.append('elementType', 'Leads');
        createParams.append('element', JSON.stringify(leadData));

        const createResponse = await fetch(`${VTIGER_URL}/webservice.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: createParams.toString()
        });

        const createResult = await createResponse.json();

        if (!createResult.success) {
            console.error('[VTIGER] Lead creation failed:', createResult);
            throw new Error(createResult.error?.message || 'Failed to create lead');
        }

        console.log('[VTIGER] Lead created successfully:', createResult.result.id);
        return createResult.result.id;

    } catch (error) {
        console.error('[VTIGER] Error creating lead:', error.message);
        // Don't throw - we don't want VTiger errors to block OTP verification
        return null;
    }
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

                // Retrieve user data and create VTiger lead
                try {
                    console.log(`[OTP] 🔍 Attempting to retrieve user data for session: ${sessionId}`);
                    const userDataJson = await kv.get(`otp_user:${sessionId}`);
                    console.log(`[OTP] User data JSON found:`, userDataJson ? 'YES' : 'NO');

                    if (userDataJson) {
                        const userData = JSON.parse(userDataJson);
                        console.log('[OTP] ✅ Retrieved user data:', JSON.stringify(userData));

                        // Create VTiger lead and WAIT for it (so we see errors)
                        console.log('[VTIGER] 🚀 Starting VTiger lead creation...');
                        try {
                            const leadId = await createVTigerLead(userData);
                            if (leadId) {
                                console.log(`[VTIGER] ✅ SUCCESS! Lead created with ID: ${leadId}`);
                            } else {
                                console.log('[VTIGER] ⚠️  Lead creation returned null - check VTiger errors above');
                            }
                        } catch (vtigerError) {
                            console.error('[VTIGER] ❌ Lead creation FAILED:', vtigerError.message);
                            console.error('[VTIGER] Full error:', JSON.stringify(vtigerError));
                        }

                        // Clean up user data from Upstash
                        await kv.del(`otp_user:${sessionId}`);
                        console.log('[OTP] 🧹 Cleaned up user data');
                    } else {
                        console.log('[OTP] ❌ NO user data found - either send-otp didn\'t store it, or it expired');
                    }
                } catch (leadError) {
                    console.error('[OTP] ❌ Error in VTiger lead process:', leadError.message);
                    console.error('[OTP] Stack:', leadError.stack);
                    // Don't fail the verification if VTiger fails
                }

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
