/**
 * Vercel Serverless Function: Automate tilliPay signup using Puppeteer
 * Endpoint: /api/tillipay/signup-automation
 *
 * Uses Puppeteer to fill out https://gps.tillipay.com/portal/sign-up
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
                error: 'Missing required fields for tilliPay signup'
            });
        }

        // Generate a default password if not provided
        const userPassword = password || generatePassword();

        // Launch browser in serverless environment
        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        // Navigate to tilliPay signup page
        await page.goto('https://gps.tillipay.com/portal/sign-up', {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        // Fill out the signup form
        // Note: Field selectors may need to be updated based on actual tilliPay form structure

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

        // Fill in first name (try multiple possible selectors)
        const firstNameFilled = await fillField(page, [
            'input[name="firstName"]',
            'input[name="firstname"]',
            'input[name="first_name"]',
            'input[placeholder*="First"]'
        ], firstName);

        // Fill in last name
        const lastNameFilled = await fillField(page, [
            'input[name="lastName"]',
            'input[name="lastname"]',
            'input[name="last_name"]',
            'input[placeholder*="Last"]'
        ], lastName);

        // Fill in company name
        const companyFilled = await fillField(page, [
            'input[name="company"]',
            'input[name="companyName"]',
            'input[name="company_name"]',
            'input[placeholder*="Company"]'
        ], companyName);

        // Fill in password
        await page.type('input[name="password"], input[type="password"]', userPassword);

        // If there's a confirm password field
        const confirmPasswordExists = await page.$('input[name="confirmPassword"], input[name="password_confirmation"]');
        if (confirmPasswordExists) {
            await page.type('input[name="confirmPassword"], input[name="password_confirmation"]', userPassword);
        }

        // Take a screenshot before submission (for debugging)
        const screenshotBefore = await page.screenshot({ encoding: 'base64' });

        // Submit the form
        await page.click('button[type="submit"], button[class*="submit"], input[type="submit"]');

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
                message: 'tilliPay signup completed successfully',
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
                error: errorText || 'tilliPay signup failed - form validation error',
                debug: {
                    currentUrl,
                    screenshotAfter: screenshotAfter.substring(0, 100) + '...'
                }
            });
        }

    } catch (error) {
        console.error('tilliPay signup automation error:', error);

        if (browser) {
            await browser.close().catch(() => {});
        }

        return res.status(500).json({
            success: false,
            error: 'Failed to automate tilliPay signup',
            details: error.message
        });
    }
}

/**
 * Try multiple selectors to fill a field
 */
async function fillField(page, selectors, value) {
    for (const selector of selectors) {
        try {
            const element = await page.$(selector);
            if (element) {
                await page.type(selector, value);
                return true;
            }
        } catch (e) {
            // Try next selector
            continue;
        }
    }
    return false;
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
