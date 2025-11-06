/**
 * Dark Mode Toggle Implementation
 * Handles theme switching with localStorage persistence
 */

(function() {
    'use strict';

    // Theme configuration
    const THEME_KEY = 'tilli-theme';
    const LIGHT_THEME = 'light';
    const DARK_THEME = 'dark';

    // Get saved theme or default to light
    function getSavedTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }

        return LIGHT_THEME;
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        updateLogos(theme);
    }

    // Update logos based on theme
    function updateLogos(theme) {
        const logos = document.querySelectorAll('img[src*="logo"], img[src*="Logo"]');
        const isDark = theme === DARK_THEME;

        logos.forEach(logo => {
            const src = logo.getAttribute('src');

            // Skip if already has the right logo
            if (isDark && src.includes('white')) return;
            if (!isDark && src.includes('color')) return;

            // Swap logo based on theme
            if (isDark) {
                // Switch to white logo for dark mode
                if (src.includes('22_tilli_logo_color.png')) {
                    logo.setAttribute('src', 'Images/22_Utilli_logo_white.png');
                } else if (src.includes('tilli_logo_color')) {
                    logo.setAttribute('src', src.replace('color', 'white'));
                }
            } else {
                // Switch to color logo for light mode
                if (src.includes('22_Utilli_logo_white.png')) {
                    logo.setAttribute('src', 'Images/22_tilli_logo_color.png');
                } else if (src.includes('logo_white')) {
                    logo.setAttribute('src', src.replace('white', 'color'));
                }
            }
        });
    }

    // Toggle between themes
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || LIGHT_THEME;
        const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
        applyTheme(newTheme);
    }

    // Create toggle button
    function createToggleButton() {
        console.log('[Dark Mode] Creating toggle button...');

        // Check if button already exists
        if (document.getElementById('theme-toggle')) {
            console.log('[Dark Mode] Button already exists');
            return;
        }

        const button = document.createElement('button');
        button.id = 'theme-toggle';
        button.className = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.setAttribute('title', 'Toggle dark mode');

        button.innerHTML = `
            <svg class="theme-icon sun" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="theme-icon moon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;

        button.addEventListener('click', toggleTheme);
        document.body.appendChild(button);
        console.log('[Dark Mode] ✅ Toggle button created and appended to body');
    }

    // Initialize theme on page load
    function init() {
        // Apply saved theme immediately (before page renders)
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);

        // Create toggle button when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createToggleButton);
        } else {
            createToggleButton();
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem(THEME_KEY)) {
                    applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
                }
            });
        }
    }

    // Initialize immediately
    init();
})();
