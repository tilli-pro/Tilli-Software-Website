// Vtiger CRM Integration for Tilli Website
// This handles form submissions and creates leads in Vtiger CRM

// Configuration - Update these with your Vtiger credentials
const VTIGER_CONFIG = {
    // Your Vtiger API endpoint - using your backend proxy for security
    // Use absolute URL for production
    API_URL: window.location.hostname === 'localhost'
        ? '/api/vtiger'
        : 'https://tillisoftware.com/api/vtiger',
    // Production Vtiger instance
    VTIGER_URL: 'https://utilliadmin.com/crm',
    // Note: Direct client-side calls to Vtiger are not recommended for security
    // The API_URL endpoint should handle the actual Vtiger communication
};

// Math Captcha variables
let mathNum1 = 0;
let mathNum2 = 0;
let mathAnswer = 0;

// Generate random math problem
function generateMathCaptcha() {
    mathNum1 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    mathNum2 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    mathAnswer = mathNum1 + mathNum2;

    // Update the display
    const num1Element = document.getElementById('math-num1');
    const num2Element = document.getElementById('math-num2');
    if (num1Element) num1Element.textContent = mathNum1;
    if (num2Element) num2Element.textContent = mathNum2;

    // Clear the input
    const captchaInput = document.getElementById('math-captcha');
    if (captchaInput) {
        captchaInput.value = '';
        validateCaptcha(); // Update button state
    }
}

// Validate captcha answer and update submit button
function validateCaptcha() {
    const captchaInput = document.getElementById('math-captcha');
    const submitBtn = document.getElementById('submit-btn');
    const userAnswer = parseInt(captchaInput.value);

    if (userAnswer === mathAnswer) {
        // Correct answer - enable submit button
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
        captchaInput.style.borderColor = '#10b981'; // Green border

        // Optional: Show checkmark
        if (!captchaInput.parentElement.querySelector('.captcha-success')) {
            const successIcon = document.createElement('span');
            successIcon.className = 'captcha-success';
            successIcon.innerHTML = ' ✓';
            successIcon.style.color = '#10b981';
            successIcon.style.fontWeight = 'bold';
            captchaInput.parentElement.querySelector('label').appendChild(successIcon);
        }
    } else {
        // Wrong answer or empty - disable submit button
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
        captchaInput.style.borderColor = userAnswer && userAnswer !== mathAnswer ? '#ef4444' : '#e5e7eb';

        // Remove success icon if it exists
        const successIcon = captchaInput.parentElement.querySelector('.captcha-success');
        if (successIcon) successIcon.remove();
    }
}

// Handle Demo Form Submission
async function handleDemoFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('demo-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');

    // Verify captcha one more time
    const captchaInput = document.getElementById('math-captcha');
    const userAnswer = parseInt(captchaInput.value);
    if (userAnswer !== mathAnswer) {
        statusDiv.innerHTML = `
            <div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 8px;">
                <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
                Please solve the math problem correctly to continue.
            </div>
        `;
        statusDiv.style.display = 'block';
        return;
    }

    // Get form data
    const formData = new FormData(form);

    // Combine phone code with number
    const phoneCode = formData.get('phoneCode') || '';
    const phoneNumber = formData.get('phone') || '';
    const fullPhone = phoneNumber ? `${phoneCode} ${phoneNumber}` : '';

    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        company: formData.get('company'),
        phone: fullPhone,
        jobTitle: formData.get('jobTitle') || '',
        country: formData.get('country') || '',
        organizationSize: formData.get('organizationSize') || '',
        useCase: formData.get('useCase') || '',
        monthlyActiveUsers: formData.get('monthlyActiveUsers') || '',
        transactionVolume: formData.get('transactionVolume') || '',
        message: formData.get('message') || '',
        formType: 'Tilli Demo Request',
        pageUrl: window.location.href,
        submissionDate: new Date().toISOString(),
        source: 'Tilli Website - Demo Request Form'
    };

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    statusDiv.style.display = 'none';

    try {
        console.log('Submitting form data:', data);

        // Check if running locally for testing
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        let responseData;

        if (isLocalhost) {
            // Simulate successful submission for local testing
            console.log('Local testing mode - Form data:', data);

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            responseData = { success: true };
            console.log('Simulated response:', responseData);

        } else {
            // Production API call
            console.log('Sending to:', VTIGER_CONFIG.API_URL);

            const response = await fetch(VTIGER_CONFIG.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API Error: ${response.status} - ${errorText}`);
            }

            responseData = await response.json();
            console.log('Response data:', responseData);
        }

        if (responseData.success) {
            // Success
            statusDiv.innerHTML = `
                <div style="background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 8px;">
                    <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                    <strong>Thank you!</strong> Your demo request has been received. We'll contact you within 24 hours.
                </div>
            `;
            statusDiv.style.display = 'block';

            // Reset form
            form.reset();

            // Optional: Track conversion in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'event_category': 'Lead',
                    'event_label': 'Demo Request',
                    'value': 1
                });
            }

            // Optional: Redirect after 3 seconds
            setTimeout(() => {
                // window.location.href = '/thank-you.html';
            }, 3000);

        } else {
            throw new Error('Submission failed');
        }

    } catch (error) {
        console.error('Form submission error:', error);

        // Show error message
        statusDiv.innerHTML = `
            <div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 8px;">
                <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
                <strong>Oops!</strong> Something went wrong. Please try again or email us directly at sales@tilli.pro
            </div>
        `;
        statusDiv.style.display = 'block';

        // Fallback: Send email notification
        // This is a backup in case the API fails
        const mailtoLink = `mailto:sales@tilli.pro?subject=Demo Request from ${data.firstName} ${data.lastName}&body=${encodeURIComponent(
            `New Demo Request\n\n` +
            `Name: ${data.firstName} ${data.lastName}\n` +
            `Email: ${data.email}\n` +
            `Company: ${data.company}\n` +
            `Phone: ${data.phone}\n` +
            `Message: ${data.message}\n`
        )}`;

        // Optionally open mailto as fallback
        // window.location.href = mailtoLink;
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Request Demo Information';
    }
}

// Alternative: Direct Vtiger Integration (requires CORS setup)
async function submitToVtigerDirect(formData) {
    const crypto = window.crypto || window.msCrypto;

    // This would require setting up CORS on your Vtiger instance
    // or using a proxy server to handle the API calls

    // Step 1: Get challenge token
    // Step 2: Create MD5 hash (would need a client-side MD5 library)
    // Step 3: Login
    // Step 4: Create lead

    // Note: Direct client-side integration with Vtiger is not recommended
    // due to security concerns (exposing API keys) and CORS limitations
    // Better to use a backend API endpoint
}

// Validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('demo-form');
    if (form) {
        // Initialize math captcha
        generateMathCaptcha();

        // Disable submit button initially
        const submitBtn = document.getElementById('submit-btn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.title = 'Please solve the math problem first';
        }

        // Add captcha validation listener
        const captchaInput = document.getElementById('math-captcha');
        if (captchaInput) {
            captchaInput.addEventListener('input', validateCaptcha);
            captchaInput.addEventListener('change', validateCaptcha);
        }

        // Add email validation
        const emailInput = form.querySelector('input[name="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.setCustomValidity('Please enter a valid email address');
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Handle country selection and phone code
        const countrySelect = document.getElementById('country-select');
        const phoneCodeInput = document.getElementById('phone-code');
        const phoneInput = document.getElementById('phone-number');

        if (countrySelect && phoneCodeInput) {
            countrySelect.addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                const countryCode = selectedOption.getAttribute('data-code');

                if (countryCode) {
                    phoneCodeInput.value = countryCode;
                } else if (this.value === 'OTHER') {
                    phoneCodeInput.readOnly = false;
                    phoneCodeInput.value = '';
                    phoneCodeInput.placeholder = 'Code';
                } else {
                    phoneCodeInput.value = '';
                }
            });
        }

        // Add phone number validation (digits, spaces, dashes, parentheses allowed)
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                // Allow digits, spaces, dashes, and parentheses
                let value = e.target.value;

                // If country is US or CA, format as North American number
                const country = countrySelect ? countrySelect.value : '';
                if (country === 'US' || country === 'CA') {
                    value = value.replace(/\D/g, '');
                    if (value.length > 0) {
                        if (value.length <= 3) {
                            value = `(${value}`;
                        } else if (value.length <= 6) {
                            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                        } else {
                            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                        }
                    }
                    e.target.value = value;
                }
            });
        }

        // Generate new captcha when form is successfully submitted
        form.addEventListener('reset', function() {
            generateMathCaptcha();
        });
    }
});