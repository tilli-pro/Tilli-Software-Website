// Analytics Wrapper - Loads analytics only after consent
(function() {
    // Function to load Vercel Analytics
    function loadVercelAnalytics() {
        if (!document.querySelector('script[src*="vercel-insights"]')) {
            var script = document.createElement('script');
            script.defer = true;
            script.src = 'https://cdn.vercel-insights.com/v1.js';
            document.head.appendChild(script);
        }
    }

    // Function to load RB2B tracking
    function loadRB2B() {
        if (!window.reb2b) {
            !function(key) {
                if (window.reb2b) return;
                window.reb2b = {loaded: true};
                var s = document.createElement("script");
                s.async = true;
                s.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/" + key + ".js.gz";
                document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
            }("VN080HX77V6J");
        }
    }

    // Check consent and load scripts
    document.addEventListener('DOMContentLoaded', function() {
        // Check if CookieConsent is available
        if (window.CookieConsent) {
            // Listen for consent changes
            window.CookieConsent.on('consent:accepted', function(cookie) {
                if (cookie.categories.includes('analytics')) {
                    loadVercelAnalytics();
                    loadRB2B();
                }
            });

            // Check initial consent state
            if (window.CookieConsent.acceptedCategory('analytics')) {
                loadVercelAnalytics();
                loadRB2B();
            }
        } else {
            // If CookieConsent not loaded, wait for it
            window.addEventListener('cc:onConsent', function() {
                if (window.CookieConsent.acceptedCategory('analytics')) {
                    loadVercelAnalytics();
                    loadRB2B();
                }
            });
        }
    });
})();