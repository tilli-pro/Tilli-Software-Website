// Simple Cookie Banner - Lightweight and Conflict-Free
(function() {
    'use strict';

    // Check if consent was already given
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
    }

    function hasConsent() {
        return getCookie('tilli_cookie_consent') !== null;
    }

    function acceptAll() {
        setCookie('tilli_cookie_consent', 'all', 365);
        hideBanner();
        enableAnalytics();
    }

    function acceptNecessary() {
        setCookie('tilli_cookie_consent', 'necessary', 365);
        hideBanner();
    }

    function showSettings() {
        // For now, just accept necessary
        acceptNecessary();
    }

    function enableAnalytics() {
        // Enable analytics scripts
        document.querySelectorAll('script[data-cookiecategory="analytics"]').forEach(script => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
                if (attr.name !== 'type' && attr.name !== 'data-cookiecategory') {
                    newScript.setAttribute(attr.name, attr.value);
                }
            });
            newScript.textContent = script.textContent;
            script.parentNode.replaceChild(newScript, script);
        });
    }

    function hideBanner() {
        const banner = document.getElementById('tilli-cookie-banner');
        if (banner) {
            banner.style.animation = 'slideOutDown 0.5s ease';
            setTimeout(() => {
                banner.remove();
            }, 500);
        }
    }

    function createBanner() {
        const bannerHTML = `
            <div id="tilli-cookie-banner" style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to bottom, #ffffff, #fafbfc);
                border-top: 3px solid #2563eb;
                box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);
                z-index: 999999;
                padding: 30px;
                animation: slideInUp 0.5s ease;
                font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
            ">
                <div style="
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 30px;
                    flex-wrap: wrap;
                ">
                    <div style="flex: 1; min-width: 300px;">
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            margin-bottom: 12px;
                        ">
                            <div style="
                                width: 40px;
                                height: 40px;
                                background: linear-gradient(135deg, #2563eb, #1d4ed8);
                                border-radius: 10px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-shrink: 0;
                            ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                                    <path d="M8.5 8.5v.01"></path>
                                    <path d="M16 15.5v.01"></path>
                                    <path d="M12 12v.01"></path>
                                    <path d="M11 17v.01"></path>
                                    <path d="M7 14v.01"></path>
                                </svg>
                            </div>
                            <h3 style="
                                margin: 0;
                                font-size: 24px;
                                font-weight: 700;
                                color: #111827;
                            ">We use cookies</h3>
                        </div>
                        <p style="
                            margin: 0;
                            color: #4b5563;
                            font-size: 15px;
                            line-height: 1.6;
                        ">
                            We use cookies and similar technologies to enhance your browsing experience,
                            analyze site traffic, and personalize content. By clicking "Accept All",
                            you consent to our use of cookies.
                            <a href="/privacy-policy.html" style="color: #2563eb; text-decoration: none; font-weight: 500;">Learn more</a>
                        </p>
                    </div>

                    <div style="
                        display: flex;
                        gap: 12px;
                        align-items: center;
                        flex-shrink: 0;
                    ">
                        <button onclick="window.tilliCookieBanner.acceptNecessary()" style="
                            background: white;
                            color: #374151;
                            border: 2px solid #d1d5db;
                            padding: 12px 24px;
                            border-radius: 10px;
                            font-size: 15px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            white-space: nowrap;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'"
                           onmouseout="this.style.transform=''; this.style.boxShadow=''">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            Reject All
                        </button>

                        <button onclick="window.tilliCookieBanner.acceptAll()" style="
                            background: linear-gradient(135deg, #2563eb, #1d4ed8);
                            color: white;
                            border: none;
                            padding: 14px 28px;
                            border-radius: 10px;
                            font-size: 15px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            white-space: nowrap;
                        " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(37, 99, 235, 0.4)'"
                           onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 14px rgba(37, 99, 235, 0.3)'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Accept All
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes slideInUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOutDown {
                    from {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                }

                @media (max-width: 768px) {
                    #tilli-cookie-banner > div {
                        flex-direction: column;
                        align-items: stretch !important;
                    }

                    #tilli-cookie-banner > div > div:last-child {
                        justify-content: stretch;
                    }

                    #tilli-cookie-banner button {
                        flex: 1;
                        justify-content: center;
                    }
                }
            </style>
        `;

        // Create container and insert banner
        const container = document.createElement('div');
        container.innerHTML = bannerHTML;
        document.body.appendChild(container.firstElementChild);
    }

    // Initialize
    function init() {
        // Only show if no consent given
        if (!hasConsent()) {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', createBanner);
            } else {
                createBanner();
            }
        } else {
            // If consent was given for all cookies, enable analytics
            if (getCookie('tilli_cookie_consent') === 'all') {
                enableAnalytics();
            }
        }
    }

    // Expose functions globally
    window.tilliCookieBanner = {
        acceptAll: acceptAll,
        acceptNecessary: acceptNecessary,
        showSettings: showSettings
    };

    // Start
    init();
})();