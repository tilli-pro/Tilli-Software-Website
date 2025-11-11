/**
 * Tilli OAuth Integration
 *
 * Provides frictionless authentication using:
 * - Google OAuth
 * - Microsoft OAuth
 * - GitHub OAuth
 * - Passwordless Magic Link
 *
 * No traditional passwords required!
 */

import { createAuthClient } from 'https://esm.sh/better-auth@1.3.34/client';

// Initialize better-auth client
const authClient = createAuthClient({
  baseURL: window.location.hostname === 'localhost'
    ? 'http://localhost:3100'
    : 'https://auth.tillisoftware.com',
});

// Export for use in other scripts
window.tilliAuth = authClient;

/**
 * Sign up with Google OAuth
 */
window.signUpWithGoogle = async function() {
  showLoading('google', 'Redirecting to Google...');

  try {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: getCallbackURL(),
    });
  } catch (error) {
    hideLoading('google');
    showError('google', error.message);
    trackEvent('oauth_error', { provider: 'google', error: error.message });
  }
};

/**
 * Sign up with Microsoft OAuth
 */
window.signUpWithMicrosoft = async function() {
  showLoading('microsoft', 'Redirecting to Microsoft...');

  try {
    await authClient.signIn.social({
      provider: 'microsoft',
      callbackURL: getCallbackURL(),
    });
  } catch (error) {
    hideLoading('microsoft');
    showError('microsoft', error.message);
    trackEvent('oauth_error', { provider: 'microsoft', error: error.message });
  }
};

/**
 * Sign up with GitHub OAuth
 */
window.signUpWithGitHub = async function() {
  showLoading('github', 'Redirecting to GitHub...');

  try {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: getCallbackURL(),
    });
  } catch (error) {
    hideLoading('github');
    showError('github', error.message);
    trackEvent('oauth_error', { provider: 'github', error: error.message });
  }
};

/**
 * Send passwordless magic link to email
 */
window.sendMagicLink = async function() {
  const emailInput = document.getElementById('magic-link-email');
  const email = emailInput?.value?.trim();

  if (!email) {
    showError('magic-link', 'Please enter your email address');
    return;
  }

  if (!isValidEmail(email)) {
    showError('magic-link', 'Please enter a valid email address');
    return;
  }

  showLoading('magic-link', 'Sending magic link...');

  try {
    await authClient.signIn.magicLink({
      email,
      callbackURL: getCallbackURL(),
    });

    hideLoading('magic-link');
    showSuccess('magic-link', `Magic link sent to ${email}! Check your inbox.`);
    trackEvent('magic_link_sent', { email });

    // Clear input
    if (emailInput) emailInput.value = '';

    // Show instructions
    showMagicLinkInstructions(email);
  } catch (error) {
    hideLoading('magic-link');
    showError('magic-link', error.message);
    trackEvent('magic_link_error', { email, error: error.message });
  }
};

/**

/**
 * Sign out
 */
window.signOut = async function() {
  try {
    await authClient.signOut();
    window.location.href = '/';
  } catch (error) {
    console.error('Sign out failed:', error);
  }
};

// Helper Functions

function getCallbackURL() {
  const baseURL = window.location.origin;
  return `${baseURL}/signup.html`;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showLoading(provider, message) {
  const button = document.querySelector(`[data-provider="${provider}"]`);
  if (!button) return;

  button.disabled = true;
  button.classList.add('loading');

  const originalText = button.innerHTML;
  button.dataset.originalText = originalText;
  button.innerHTML = `
    <span class="spinner"></span>
    <span>${message}</span>
  `;
}

function hideLoading(provider) {
  const button = document.querySelector(`[data-provider="${provider}"]`);
  if (!button) return;

  button.disabled = false;
  button.classList.remove('loading');

  const originalText = button.dataset.originalText;
  if (originalText) {
    button.innerHTML = originalText;
  }
}

function showError(provider, message) {
  const errorDiv = document.getElementById(`${provider}-error`);
  if (!errorDiv) {
    showInAppMessage(message, "error");
    return;
    return;
  }

  errorDiv.textContent = message;
  errorDiv.style.display = 'block';

  setTimeout(() => {
    errorDiv.style.display = 'none';
  }, 5000);
}

function showSuccess(provider, message) {
  const successDiv = document.getElementById(`${provider}-success`);
  if (!successDiv) {
    showInAppMessage(message, "success");
    return;
    return;
  }

  successDiv.textContent = message;
  successDiv.style.display = 'block';
}

function showMagicLinkInstructions(email) {
  const instructionsDiv = document.getElementById('magic-link-instructions');
  if (!instructionsDiv) return;

  instructionsDiv.innerHTML = `
    <div class="magic-link-sent">
      <div class="icon">📧</div>
      <h3>Check your email!</h3>
      <p>We sent a magic link to <strong>${email}</strong></p>
      <p>Click the link in the email to sign in instantly.</p>
      <p class="note">The link will expire in 10 minutes.</p>
      <button onclick="this.parentElement.style.display='none'" class="btn-close">
        Close
      </button>
    </div>
  `;
  instructionsDiv.style.display = 'block';
}

function trackEvent(eventName, data) {
  // Google Analytics 4
  if (window.gtag) {
    gtag('event', eventName, data);
  }

  // Custom analytics
  if (window.analytics) {
    analytics.track(eventName, data);
  }

  // Console log for development
  console.log(`[Analytics] ${eventName}`, data);
}

// Session checking is handled by signup.html checkAuthAndLoadWizard()
// Track page view
document.addEventListener('DOMContentLoaded', () => {
  trackEvent('signup_page_view', {
    source: new URLSearchParams(window.location.search).get('source') || 'direct',
  });
});

// Handle magic link form submission
document.addEventListener('DOMContentLoaded', () => {
  const magicLinkForm = document.getElementById('magic-link-form');
  if (magicLinkForm) {
    magicLinkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMagicLink();
    });
  }

  // Allow Enter key to trigger magic link
  const magicLinkInput = document.getElementById('magic-link-email');
  if (magicLinkInput) {
    magicLinkInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMagicLink();
      }
    });
  }
});

console.log('✅ Tilli OAuth integration loaded');
console.log('📱 Available methods: Google, Microsoft, GitHub, Magic Link');

/**
 * Show in-app message (no system alerts)
 */
function showInAppMessage(message, type = 'success') {
  const messageDiv = document.getElementById('auth-message');
  if (!messageDiv) {
    console.log(`[Auth Message] ${message}`);
    return;
  }

  // Set message content and styling
  messageDiv.textContent = message;
  messageDiv.style.opacity = '1';
  
  if (type === 'success') {
    messageDiv.style.background = '#d1fae5';
    messageDiv.style.color = '#065f46';
    messageDiv.style.border = '1px solid #6ee7b7';
  } else if (type === 'error') {
    messageDiv.style.background = '#fee2e2';
    messageDiv.style.color = '#991b1b';
    messageDiv.style.border = '1px solid #fecaca';
  }

  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDiv.style.opacity = '0';
  }, 5000);
}
