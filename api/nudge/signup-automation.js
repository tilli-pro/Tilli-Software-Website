/**
 * Vercel Serverless Function: Automate Nudge signup using Puppeteer
 * Endpoint: /api/nudge/signup-automation
 *
 * Uses Puppeteer to fill out https://app.nudge.net/smart/sign-up
 */

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed. Use POST.'
        });
    }

    let browser = null;

    try {
        const {
            email,
            phone,
            fullName,
            companyName,
            password // We'll need to generate or pass this
        } = req.body;

        // Validate required fields
        if (!email || !phone || !fullName || !companyName) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields for Nudge signup'
            });
        }

        // Use provided password (should always be provided by parent signup handler)
        if (!password) {
            return res.status(400).json({
                success: false,
                error: 'Password is required for Nudge signup automation'
            });
        }

        const userPassword = password;

        // Launch browser in serverless environment
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        // Navigate to Nudge signup page
        await page.goto('https://app.nudge.net/smart/sign-up', {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Fill out the signup form
        // Note: Field selectors may need to be updated based on actual Nudge form structure

        // Split full name into first and last
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || nameParts[0];

        // Wait for form to be visible
        await page.waitForSelector('input[name="email"], input[type="email"]', { timeout: 10000 });

        // Fill in email
        await page.type('input[name="email"], input[type="email"]', email);

        // Fill in phone
        await page.type('input[name="phone"], input[type="tel"]', phone);

        // Fill in first name
        await page.type('input[name="firstName"], input[name="firstname"]', firstName);

        // Fill in last name
        await page.type('input[name="lastName"], input[name="lastname"]', lastName);

        // Fill in company name
        await page.type('input[name="company"], input[name="companyName"]', companyName);

        // Fill in password
        await page.type('input[name="password"], input[type="password"]', userPassword);

        // Take a screenshot before submission (for debugging)
        const screenshotBefore = await page.screenshot({ encoding: 'base64' });

        // Submit the form
        await page.click('button[type="submit"]');

        // Wait for either success or error
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 15000 }).catch(() => {
            // Navigation might not happen on error
        });

        // Check current URL to see if signup succeeded
        const currentUrl = page.url();
        const isSuccess = !currentUrl.includes('sign-up');

        // Take a screenshot after submission
        const screenshotAfter = await page.screenshot({ encoding: 'base64' });

        await browser.close();
        browser = null;

        if (isSuccess) {
            return res.status(200).json({
                success: true,
                message: 'Nudge signup completed successfully',
                accountEmail: email,
                temporaryPassword: userPassword,
                redirectUrl: currentUrl,
                debug: {
                    screenshotBefore: screenshotBefore.substring(0, 100) + '...',
                    screenshotAfter: screenshotAfter.substring(0, 100) + '...'
                }
            });
        } else {
            // Try to extract error message from page
            const errorText = await page.evaluate(() => {
                const errorEl = document.querySelector('.error, .alert-danger, [class*="error"]');
                return errorEl ? errorEl.textContent : null;
            }).catch(() => null);

            return res.status(400).json({
                success: false,
                error: errorText || 'Nudge signup failed - form validation error',
                debug: {
                    currentUrl,
                    screenshotAfter: screenshotAfter.substring(0, 100) + '...'
                }
            });
        }

    } catch (error) {
        console.error('Nudge signup automation error:', error);

        if (browser) {
            await browser.close().catch(() => {});
        }

        return res.status(500).json({
            success: false,
            error: 'Failed to automate Nudge signup',
            details: error.message
        });
    }
}

/**
 * Generate a secure random password
 */
function generatePassword() {
    const length = 16;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';

    // Ensure at least one of each required character type
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // uppercase
    password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // lowercase
    password += '0123456789'[Math.floor(Math.random() * 10)]; // number
    password += '!@#$%^&*'[Math.floor(Math.random() * 8)]; // special

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
}
