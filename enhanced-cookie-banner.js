// Enhanced Cookie Banner with Preference Controls
(function() {
    'use strict';

    // Cookie management functions
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

    function getPreferences() {
        const prefs = getCookie('tilli_cookie_preferences');
        if (prefs) {
            try {
                return JSON.parse(decodeURIComponent(prefs));
            } catch (e) {
                return { strictly_necessary: true, performance: true, marketing: true };
            }
        }
        return { strictly_necessary: true, performance: true, marketing: true };
    }

    function savePreferences(preferences) {
        setCookie('tilli_cookie_preferences', encodeURIComponent(JSON.stringify(preferences)), 365);
        setCookie('tilli_cookie_consent', 'custom', 365);
        enableCookies(preferences);
    }

    function acceptAll() {
        const preferences = { strictly_necessary: true, performance: true, marketing: true };
        savePreferences(preferences);
        hideBanner();
        hideModal();
    }

    function rejectAll() {
        const preferences = { strictly_necessary: true, performance: false, marketing: false };
        savePreferences(preferences);
        hideBanner();
        hideModal();
    }

    function saveSettings() {
        const preferences = {
            strictly_necessary: true, // Always required
            performance: document.getElementById('toggle-performance')?.checked || false,
            marketing: document.getElementById('toggle-marketing')?.checked || false
        };
        savePreferences(preferences);
        hideBanner();
        hideModal();
    }

    function enableCookies(preferences) {
        // Enable analytics/performance cookies if allowed
        if (preferences.performance) {
            document.querySelectorAll('script[data-cookiecategory="analytics"], script[data-cookiecategory="performance"]').forEach(script => {
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

        // Enable marketing cookies if allowed
        if (preferences.marketing) {
            document.querySelectorAll('script[data-cookiecategory="marketing"]').forEach(script => {
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
    }

    function showPreferences() {
        hideBanner();
        showModal();
    }

    function showModal() {
        const modal = document.getElementById('tilli-cookie-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Load current preferences
            const prefs = getPreferences();
            const perfToggle = document.getElementById('toggle-performance');
            const marketingToggle = document.getElementById('toggle-marketing');

            if (perfToggle) perfToggle.checked = prefs.performance;
            if (marketingToggle) marketingToggle.checked = prefs.marketing;
        }
    }

    function hideModal() {
        const modal = document.getElementById('tilli-cookie-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
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

    function toggleExpansion(sectionId) {
        const content = document.getElementById(sectionId);
        const arrow = document.querySelector(`[onclick="window.tilliCookieBanner.toggleExpansion('${sectionId}')"] .expand-arrow`);

        if (content && arrow) {
            const isExpanded = content.style.display === 'block';
            content.style.display = isExpanded ? 'none' : 'block';
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
        }
    }

    function createBanner() {
        const bannerHTML = `
            <div id="tilli-cookie-banner" style="
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #ffffff;
                border-top: 1px solid #e5e7eb;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
                z-index: 999999;
                padding: 24px 32px;
                animation: slideInUp 0.4s ease;
                font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
            ">
                <div style="
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 32px;
                    flex-wrap: wrap;
                ">
                    <div style="flex: 1; min-width: 300px;">
                        <div style="
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            margin-bottom: 8px;
                        ">
                            <div style="
                                width: 36px;
                                height: 36px;
                                background: #325ef6;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                flex-shrink: 0;
                            ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                                font-size: 20px;
                                font-weight: 400;
                                color: #000000;
                                font-family: 'Sora', sans-serif;
                            ">We use cookies</h3>
                        </div>
                        <p style="
                            margin: 0;
                            color: #64748b;
                            font-size: 14px;
                            line-height: 1.6;
                        ">
                            We use cookies and similar technologies to enhance your browsing experience,
                            analyze site traffic, and personalize content. You can customize your preferences below.
                            <a href="/privacy-policy.html" style="color: #325ef6; text-decoration: none; font-weight: 500;">Learn more</a>
                        </p>
                    </div>

                    <div style="
                        display: flex;
                        gap: 10px;
                        align-items: center;
                        flex-shrink: 0;
                        flex-wrap: wrap;
                    ">
                        <button onclick="window.tilliCookieBanner.showPreferences()" style="
                            background: #ffffff;
                            color: #000000;
                            border: 1px solid #e5e7eb;
                            padding: 10px 18px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            white-space: nowrap;
                            font-family: 'Lato', sans-serif;
                        " onmouseover="this.style.borderColor='#325ef6'; this.style.color='#325ef6'"
                           onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#000000'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                            </svg>
                            Preferences
                        </button>

                        <button onclick="window.tilliCookieBanner.rejectAll()" style="
                            background: #ffffff;
                            color: #000000;
                            border: 1px solid #e5e7eb;
                            padding: 10px 18px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            white-space: nowrap;
                            font-family: 'Lato', sans-serif;
                        " onmouseover="this.style.borderColor='#325ef6'; this.style.color='#325ef6'"
                           onmouseout="this.style.borderColor='#e5e7eb'; this.style.color='#000000'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            Reject All
                        </button>

                        <button onclick="window.tilliCookieBanner.acceptAll()" style="
                            background: #325ef6;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 500;
                            cursor: pointer;
                            transition: all 0.2s;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            white-space: nowrap;
                            font-family: 'Lato', sans-serif;
                        " onmouseover="this.style.background='#2a4fd4'"
                           onmouseout="this.style.background='#325ef6'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Accept All
                        </button>
                    </div>
                </div>
            </div>
        `;

        const modalHTML = `
            <div id="tilli-cookie-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                z-index: 1000000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
            ">
                <div style="
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                ">
                    <div style="
                        padding: 32px;
                        border-bottom: 1px solid #e5e7eb;
                        position: sticky;
                        top: 0;
                        background: white;
                        border-radius: 16px 16px 0 0;
                    ">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <h2 style="
                                margin: 0;
                                font-size: 24px;
                                font-weight: 700;
                                color: #111827;
                            ">Cookie Preferences</h2>
                            <button onclick="window.tilliCookieBanner.hideModal()" style="
                                background: none;
                                border: none;
                                color: #6b7280;
                                cursor: pointer;
                                padding: 8px;
                                border-radius: 8px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.2s;
                            " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <p style="
                            margin: 12px 0 0 0;
                            color: #6b7280;
                            font-size: 15px;
                            line-height: 1.6;
                        ">
                            Manage your cookie preferences. You can enable or disable different categories of cookies below.
                        </p>
                    </div>

                    <div style="padding: 0;">
                        <!-- Strictly Necessary Cookies -->
                        <div style="border-bottom: 1px solid #e5e7eb;">
                            <button onclick="window.tilliCookieBanner.toggleExpansion('strictly-necessary-details')" style="
                                width: 100%;
                                padding: 24px 32px;
                                background: none;
                                border: none;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                cursor: pointer;
                                text-align: left;
                                transition: background 0.2s;
                            " onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">
                                <div>
                                    <h3 style="
                                        margin: 0 0 4px 0;
                                        font-size: 18px;
                                        font-weight: 600;
                                        color: #111827;
                                    ">Strictly Necessary Cookies</h3>
                                    <p style="
                                        margin: 0;
                                        color: #6b7280;
                                        font-size: 14px;
                                    ">Essential for the website to function properly</p>
                                </div>
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <div style="
                                        width: 48px;
                                        height: 28px;
                                        background: #10b981;
                                        border-radius: 14px;
                                        position: relative;
                                        display: flex;
                                        align-items: center;
                                        padding: 2px;
                                    ">
                                        <div style="
                                            width: 24px;
                                            height: 24px;
                                            background: white;
                                            border-radius: 50%;
                                            transform: translateX(20px);
                                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                        "></div>
                                        <span style="
                                            position: absolute;
                                            left: 8px;
                                            font-size: 10px;
                                            font-weight: 600;
                                            color: white;
                                        ">ON</span>
                                    </div>
                                    <svg class="expand-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s;">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </div>
                            </button>
                            <div id="strictly-necessary-details" style="
                                display: none;
                                padding: 0 32px 24px 32px;
                                color: #4b5563;
                                font-size: 14px;
                                line-height: 1.6;
                            ">
                                <p>These cookies are essential for the proper functioning of our website. They enable core functionality such as security, network management, and accessibility. You cannot disable these cookies.</p>
                                <ul style="margin: 12px 0; padding-left: 20px;">
                                    <li>Authentication and security cookies</li>
                                    <li>Load balancing cookies</li>
                                    <li>Cookie consent preferences</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Performance and Analytics -->
                        <div style="border-bottom: 1px solid #e5e7eb;">
                            <button onclick="window.tilliCookieBanner.toggleExpansion('performance-details')" style="
                                width: 100%;
                                padding: 24px 32px;
                                background: none;
                                border: none;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                cursor: pointer;
                                text-align: left;
                                transition: background 0.2s;
                            " onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">
                                <div>
                                    <h3 style="
                                        margin: 0 0 4px 0;
                                        font-size: 18px;
                                        font-weight: 600;
                                        color: #111827;
                                    ">Performance and Analytics</h3>
                                    <p style="
                                        margin: 0;
                                        color: #6b7280;
                                        font-size: 14px;
                                    ">Help us understand how visitors interact with our website</p>
                                </div>
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <label style="
                                        width: 48px;
                                        height: 28px;
                                        background: #10b981;
                                        border-radius: 14px;
                                        position: relative;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        padding: 2px;
                                        transition: background 0.2s;
                                    ">
                                        <input type="checkbox" id="toggle-performance" checked style="
                                            position: absolute;
                                            opacity: 0;
                                            width: 0;
                                            height: 0;
                                        " onchange="
                                            const label = this.parentElement;
                                            const slider = label.querySelector('.slider');
                                            const onText = label.querySelector('span');
                                            if (this.checked) {
                                                label.style.background = '#10b981';
                                                slider.style.transform = 'translateX(20px)';
                                                if (onText) onText.style.display = 'block';
                                            } else {
                                                label.style.background = '#e5e7eb';
                                                slider.style.transform = 'translateX(0)';
                                                if (onText) onText.style.display = 'none';
                                            }
                                        ">
                                        <div class="slider" style="
                                            width: 24px;
                                            height: 24px;
                                            background: white;
                                            border-radius: 50%;
                                            transform: translateX(20px);
                                            transition: transform 0.2s;
                                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                        "></div>
                                        <span style="
                                            position: absolute;
                                            left: 8px;
                                            font-size: 10px;
                                            font-weight: 600;
                                            color: white;
                                            text-transform: uppercase;
                                            pointer-events: none;
                                        ">ON</span>
                                    </label>
                                    <svg class="expand-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s;">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </div>
                            </button>
                            <div id="performance-details" style="
                                display: none;
                                padding: 0 32px 24px 32px;
                                color: #4b5563;
                                font-size: 14px;
                                line-height: 1.6;
                            ">
                                <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website performance and user experience.</p>
                                <ul style="margin: 12px 0; padding-left: 20px;">
                                    <li>Google Analytics for traffic analysis</li>
                                    <li>Performance monitoring tools</li>
                                    <li>User behavior analytics</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Marketing -->
                        <div>
                            <button onclick="window.tilliCookieBanner.toggleExpansion('marketing-details')" style="
                                width: 100%;
                                padding: 24px 32px;
                                background: none;
                                border: none;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                cursor: pointer;
                                text-align: left;
                                transition: background 0.2s;
                            " onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='none'">
                                <div>
                                    <h3 style="
                                        margin: 0 0 4px 0;
                                        font-size: 18px;
                                        font-weight: 600;
                                        color: #111827;
                                    ">Marketing</h3>
                                    <p style="
                                        margin: 0;
                                        color: #6b7280;
                                        font-size: 14px;
                                    ">Used to deliver targeted advertising and track marketing effectiveness</p>
                                </div>
                                <div style="display: flex; align-items: center; gap: 16px;">
                                    <label style="
                                        width: 48px;
                                        height: 28px;
                                        background: #10b981;
                                        border-radius: 14px;
                                        position: relative;
                                        cursor: pointer;
                                        display: flex;
                                        align-items: center;
                                        padding: 2px;
                                        transition: background 0.2s;
                                    ">
                                        <input type="checkbox" id="toggle-marketing" checked style="
                                            position: absolute;
                                            opacity: 0;
                                            width: 0;
                                            height: 0;
                                        " onchange="
                                            const label = this.parentElement;
                                            const slider = label.querySelector('.slider');
                                            const onText = label.querySelector('span');
                                            if (this.checked) {
                                                label.style.background = '#10b981';
                                                slider.style.transform = 'translateX(20px)';
                                                if (onText) onText.style.display = 'block';
                                            } else {
                                                label.style.background = '#e5e7eb';
                                                slider.style.transform = 'translateX(0)';
                                                if (onText) onText.style.display = 'none';
                                            }
                                        ">
                                        <div class="slider" style="
                                            width: 24px;
                                            height: 24px;
                                            background: white;
                                            border-radius: 50%;
                                            transform: translateX(20px);
                                            transition: transform 0.2s;
                                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                                        "></div>
                                        <span style="
                                            position: absolute;
                                            left: 8px;
                                            font-size: 10px;
                                            font-weight: 600;
                                            color: white;
                                            text-transform: uppercase;
                                            pointer-events: none;
                                        ">ON</span>
                                    </label>
                                    <svg class="expand-arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s;">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </div>
                            </button>
                            <div id="marketing-details" style="
                                display: none;
                                padding: 0 32px 24px 32px;
                                color: #4b5563;
                                font-size: 14px;
                                line-height: 1.6;
                            ">
                                <p>These cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing and ensuring ads are properly displayed.</p>
                                <ul style="margin: 12px 0; padding-left: 20px;">
                                    <li>Targeted advertising cookies</li>
                                    <li>Social media tracking pixels</li>
                                    <li>Retargeting and remarketing tools</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style="
                        padding: 24px 32px;
                        background: #f9fafb;
                        border-radius: 0 0 16px 16px;
                        display: flex;
                        gap: 12px;
                        justify-content: flex-end;
                        flex-wrap: wrap;
                    ">
                        <button onclick="window.tilliCookieBanner.rejectAll()" style="
                            background: white;
                            color: #374151;
                            border: 2px solid #d1d5db;
                            padding: 12px 20px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                        " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='white'">
                            Reject All
                        </button>
                        <button onclick="window.tilliCookieBanner.acceptAll()" style="
                            background: #e5e7eb;
                            color: #374151;
                            border: none;
                            padding: 12px 20px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                        " onmouseover="this.style.background='#d1d5db'" onmouseout="this.style.background='#e5e7eb'">
                            Accept All
                        </button>
                        <button onclick="window.tilliCookieBanner.saveSettings()" style="
                            background: linear-gradient(135deg, #2563eb, #1d4ed8);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 8px;
                            font-size: 14px;
                            font-weight: 600;
                            cursor: pointer;
                            transition: all 0.2s;
                            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
                        " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 20px rgba(37, 99, 235, 0.4)'"
                           onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 14px rgba(37, 99, 235, 0.3)'">
                            Save Settings
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
                        gap: 20px;
                    }

                    #tilli-cookie-banner > div > div:last-child {
                        justify-content: stretch;
                        gap: 8px;
                    }

                    #tilli-cookie-banner button {
                        flex: 1;
                        justify-content: center;
                        padding: 12px 16px;
                    }

                    #tilli-cookie-modal {
                        padding: 16px;
                    }

                    #tilli-cookie-modal > div {
                        max-width: 100%;
                        max-height: 90vh;
                    }

                    #tilli-cookie-modal button {
                        flex: 1;
                        min-width: 0;
                    }
                }

                @media (max-width: 480px) {
                    #tilli-cookie-modal > div > div:last-child {
                        flex-direction: column;
                    }

                    #tilli-cookie-modal > div > div:last-child button {
                        width: 100%;
                    }
                }
            </style>
        `;

        // Create banner container and insert
        const bannerContainer = document.createElement('div');
        bannerContainer.innerHTML = bannerHTML;
        document.body.appendChild(bannerContainer.firstElementChild);

        // Create modal container and insert
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
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
            // If consent was given, enable appropriate cookies
            const preferences = getPreferences();
            enableCookies(preferences);
        }
    }

    // Expose functions globally
    window.tilliCookieBanner = {
        acceptAll: acceptAll,
        rejectAll: rejectAll,
        saveSettings: saveSettings,
        showPreferences: showPreferences,
        hideModal: hideModal,
        toggleExpansion: toggleExpansion,
        getPreferences: getPreferences
    };

    // Start
    init();
})();