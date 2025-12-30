// Cookie Consent Configuration
window.addEventListener('load', function(){

    // Initialize CookieConsent
    var cc = initCookieConsent();

    cc.run({
        current_lang: 'en',
        autoclear_cookies: true,
        page_scripts: true,

        // Mode: 'opt-in' for GDPR compliance
        mode: 'opt-in',

        // Script handling
        script_selector: 'script[data-cookiecategory]',

        // Delay before showing (milliseconds)
        delay: 0,

        // Auto accept cookies after user scrolls
        auto_language: 'document',
        autorun: true,
        force_consent: false,
        hide_from_bots: true,
        remove_cookie_tables: false,
        cookie_name: 'tilli_cookie_consent',
        cookie_expiration: 365,
        cookie_necessary_only_expiration: 182,
        cookie_domain: location.hostname,
        cookie_path: '/',
        cookie_same_site: 'Lax',
        use_rfc_cookie: false,
        revision: 0,

        // UI Configuration
        gui_options: {
            consent_modal: {
                layout: 'box',                  // Changed to box for larger appearance
                position: 'bottom center',     // bottom/middle/top + left/right/center
                transition: 'slide',            // zoom/slide
                swap_buttons: false
            },
            settings_modal: {
                layout: 'box',                 // box/bar
                transition: 'slide'             // zoom/slide
            }
        },

        onChange: function (cookie, changed_preferences) {
            // Reload page if analytics preferences changed
            if (changed_preferences.includes('analytics')) {
                location.reload();
            }
        },

        onAccept: function (cookie) {
            // Analytics scripts will be automatically enabled
            // Re-initialize Lucide icons
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 100);
            }
        },

        onFirstAction: function(user_preferences, cookie) {
            // Re-initialize Lucide icons after first action
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 100);
            }
        },

        languages: {
            'en': {
                consent_modal: {
                    title: '<i data-lucide="cookie" style="display: inline-block; width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;"></i>We use cookies',
                    description: 'We use cookies to enhance your experience, analyze site traffic, and improve our services. <button type="button" data-cc="c-settings" class="cc-link">Manage preferences</button>',
                    primary_btn: {
                        text: '<i data-lucide="check-circle" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;"></i>Accept all',
                        role: 'accept_all'
                    },
                    secondary_btn: {
                        text: '<i data-lucide="x-circle" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;"></i>Reject all',
                        role: 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Cookie preferences',
                    save_settings_btn: 'Save settings',
                    accept_all_btn: 'Accept all',
                    reject_all_btn: 'Reject all',
                    close_btn_label: 'Close',
                    cookie_table_headers: [
                        {col1: 'Name'},
                        {col2: 'Domain'},
                        {col3: 'Expiration'},
                        {col4: 'Description'}
                    ],
                    blocks: [
                        {
                            title: 'Cookie usage 📊',
                            description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="/privacy-policy.html" class="cc-link">privacy policy</a>.'
                        }, {
                            title: 'Strictly necessary cookies',
                            description: 'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            },
                            cookie_table: [
                                {
                                    col1: 'tilli_cookie_consent',
                                    col2: location.hostname,
                                    col3: '1 year',
                                    col4: 'Stores your cookie consent preferences'
                                },
                                {
                                    col1: 'tilli_session',
                                    col2: location.hostname,
                                    col3: 'Session',
                                    col4: 'Maintains user session state'
                                }
                            ]
                        }, {
                            title: 'Performance and Analytics cookies',
                            description: 'These cookies allow us to count visits and traffic sources, so we can measure and improve the performance of our site.',
                            toggle: {
                                value: 'analytics',
                                enabled: true,
                                readonly: false
                            },
                            cookie_table: [
                                {
                                    col1: '_vercel_analytics',
                                    col2: '.vercel.com',
                                    col3: '1 year',
                                    col4: 'Vercel Analytics tracking'
                                },
                                {
                                    col1: 'reb2b_*',
                                    col2: location.hostname,
                                    col3: '30 days',
                                    col4: 'RB2B visitor tracking'
                                }
                            ]
                        }, {
                            title: 'Marketing cookies',
                            description: 'These cookies are used to track visitors across websites to display ads that are relevant and engaging.',
                            toggle: {
                                value: 'marketing',
                                enabled: true,
                                readonly: false
                            },
                            cookie_table: [
                                {
                                    col1: '_fbp',
                                    col2: '.facebook.com',
                                    col3: '90 days',
                                    col4: 'Facebook advertising'
                                },
                                {
                                    col1: '_ga',
                                    col2: location.hostname,
                                    col3: '2 years',
                                    col4: 'Google Analytics'
                                }
                            ]
                        }, {
                            title: 'More information',
                            description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="/contact.html">contact us</a>.'
                        }
                    ]
                }
            }
        }
    });

    // Initialize Lucide icons after cookie banner loads
    setTimeout(function() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 500);
});