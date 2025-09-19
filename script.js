(function(){
  const frame = document.getElementById('solutionsFrame');
  const slides = frame ? frame.querySelectorAll('.solution-slide') : [];
  const dotsWrap = document.getElementById('solutionsDots');
  const dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];
  if (!slides.length || !dots.length) return;
  let current = 0;
  function show(idx){
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  dots.forEach(d => d.addEventListener('click', () => show(parseInt(d.dataset.index)||0)));
})();
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Ensure site-wide favicon
    setFavicon('Tilli Home Page/tilli_U.png');
    await includePartials();
    // Initialize all functionality after partials are loaded
    initNavigation();
    initCarousel();
    initEditorsCarousel();
    initFormHandling();
    initAnimations();
    initScrollEffects();
    initMobileMenu();
    initIndustryTabs();
    initBlogIndex();
    initBlogPost();
    initModals();
    initProgressSteps();
});

async function includePartials() {
    const containers = document.querySelectorAll('[data-include]');
    const fetches = Array.from(containers).map(async container => {
        const src = container.getAttribute('data-include');
        try {
            const res = await fetch(src, { cache: 'no-cache' });
            const html = await res.text();
            container.innerHTML = html;
        } catch (e) {
            // Fallback for file:// or blocked fetch: inject inline header markup
            if (src && src.endsWith('partials/header.html')) {
                container.innerHTML = getHeaderHTMLFallback();
            } else if (src && src.endsWith('partials/footer.html')) {
                container.innerHTML = getFooterHTMLFallback();
            }
        }
    });
    await Promise.all(fetches);
}

// Set or update the favicon across all pages
function setFavicon(href) {
    try {
        const head = document.head || document.getElementsByTagName('head')[0];
        if (!head || !href) return;

        const existingIcon = head.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        const iconLink = existingIcon || document.createElement('link');
        iconLink.rel = 'icon';
        iconLink.type = 'image/png';
        iconLink.href = href;
        if (!existingIcon) head.appendChild(iconLink);

        const existingApple = head.querySelector('link[rel="apple-touch-icon"]');
        const appleLink = existingApple || document.createElement('link');
        appleLink.rel = 'apple-touch-icon';
        appleLink.href = href;
        if (!existingApple) head.appendChild(appleLink);
    } catch (_) {}
}

function getHeaderHTMLFallback() {
    return `
<header class="header">
    <nav class="nav">
        <div class="nav-container">
            <div class="logo">
                <a href="index.html" aria-label="Tilli Home">
                    <img style="height:44px;width:auto" src="Tilli Home Page/tilli-logo.png" alt="Tilli Logo">
                </a>
            </div>
            <ul class="nav-menu">
                <li class="dropdown">
                    <a href="index.html#products">Products</a>
                    <ul class="dropdown-menu">
                        <li><a href="nudge.html"><span>Nudge</span><small>Digital Communication</small></a></li>
                        <li><a href="tillix.html"><span>tilliX</span><small>Customer Experience</small></a></li>
                        <li><a href="tillipay.html"><span>tilliPay</span><small>Global Payment Stack</small></a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="industries.html">Industries</a>
                    <ul class="dropdown-menu dropdown-columns">
                        <li><a href="banking-finance.html">Banking and Finance</a></li>
                        <li><a href="retailers-merchants.html">Retailers &amp; Merchants</a></li>
                        <li><a href="saas-billing.html">SaaS Billing</a></li>
                        <li><a href="insurance.html">Insurance</a></li>
                        <li><a href="public-sector.html">Public Sector</a></li>
                        <li><a href="utilities.html">Utilities</a></li>
                        <li><a href="rentals-leases.html">Rentals &amp; Leases</a></li>
                        <li><a href="telecommunications.html">Telecommunications</a></li>
                        <li><a href="education.html">Education and Universities</a></li>
                        <li><a href="memberships.html">Memberships</a></li>
                        <li><a href="gaming-developers.html">Gaming &amp; Developers</a></li>
                        <li><a href="media-entertainment.html">Media and Entertainment</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#resources">Resources</a>
                    <ul class="dropdown-menu">
                        <li><a href="press-release.html">Press Release</a></li>
                        <li><a href="blog.html">Blogs</a></li>
                        <li><a href="case-studies.html">Case Studies</a></li>
                    </ul>
                </li>
                <li><a href="developer.html">Developer</a></li>
                <li><a href="about.html">Company</a></li>
                <li><a href="pricing.html">Pricing</a></li>
            </ul>
            <a class="cta-button" href="contact.html">Contact Us</a>
            <a class="cta-button" href="free-trial.html">Free Trial</a>
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
</header>`;
}

function getFooterHTMLFallback() {
    return `
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-main">
                <div class="footer-brand">
                    <div class="footer-logo">
                        <img src="Tilli Home Page/tilli-logo.png" alt="Tilli Logo">
                    </div>
                    <p>We’re devoted to creating a global consumer environment that feels more personalized and connected than ever before. Through cloud-based, customer-centric tools, we’re revolutionizing CPaaS and payment processing landscapes to create avenues that help businesses and people connect, collaborate, and make payments in real-time.</p>
                    <a href="about.html" class="footer-link">More about us →</a>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#request-demo">Request a Demo →</a></li>
                            <li><a href="free-trial.html">Start a Free Trial →</a></li>
                            <li><a href="contact.html">Contact →</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Industries</h4>
                        <ul>
                            <li><a href="utilities.html">Utilities</a></li>
                            <li><a href="rentals-leases.html">Rentals &amp; Leases</a></li>
                            <li><a href="banking-finance.html">Banking &amp; Finance</a></li>
                            <li><a href="saas-billing.html">SaaS Billing</a></li>
                            <li><a href="retailers-merchants.html">Retailers &amp; Merchants</a></li>
                            <li><a href="public-sector.html">Public Sector</a></li>
                            <li><a href="telecommunications.html">Telecommunications</a></li>
                            <li><a href="insurance.html">Insurance</a></li>
                            <li><a href="media-entertainment.html">Media and Entertainment</a></li>
                            <li><a href="gaming-developers.html">Gaming &amp; Developers</a></li>
                            <li><a href="memberships.html">Memberships</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Services</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="press-release.html">Press Releases</a></li>
                            <li><a href="#request-demo">Request a Demo</a></li>
                            <li><a href="free-trial.html">Start a Free Trial</a></li>
                            <li><a href="#">Compare Products</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="social-links">
                    <a href="https://www.youtube.com/@tillisoftware" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="https://www.linkedin.com/company/tilli-llc/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                    <a href="https://www.facebook.com/tillisoftware" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                    <a href="https://x.com/tillisoftware" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                </div>
                <div class="footer-contact">
                    <h5>Headquarters</h5>
                    <p>8260 Greensboro Dr, Suite 270<br>McLean, VA 22102</p>
                    <h5 style="margin-top:8px">India</h5>
                    <p>1st Floor, SNP Towers, No. 112, 113, 114, Janardhana Hills,<br>Gachibowli, Hyderabad, Telangana, 500032, India</p>
                </div>
            </div>
        </div>
    </div>
</footer>`;
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const dropdownParents = document.querySelectorAll('.nav-menu .dropdown');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active link highlighting by current page
    try {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(a => {
            const href = a.getAttribute('href') || '';
            // Extract page portion before any hash
            const page = href.split('#')[0] || '';
            if (page && page === current) {
                a.classList.add('active');
            } else if (!page && current === 'index.html' && href.startsWith('#')) {
                // On index.html, hash links can be active based on presence
                a.classList.toggle('active', window.location.hash === href);
            }
        });
    } catch (_) {}

    // Dropdowns: enable click-to-toggle on mobile
    dropdownParents.forEach(parent => {
        const trigger = parent.querySelector(':scope > a');
        const menu = parent.querySelector(':scope > .dropdown-menu');
        if (!trigger || !menu) return;

        // On touch/click, toggle for mobile widths
        trigger.addEventListener('click', function(e) {
            // Allow normal navigation when not on mobile or when href is a page link
            const isHash = (this.getAttribute('href') || '').startsWith('#');
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            if (isMobile) {
                e.preventDefault();
                parent.classList.toggle('open');
            } else if (!isHash && parent.classList.contains('dropdown')) {
                // let desktop clicks pass through to linked pages
            }
        });
    });
}

// Carousel functionality
function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    if (!carouselContainer || !slides.length) return;
    
    // Update carousel position
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 32; // 32px gap
        carouselContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-play carousel
    setInterval(nextSlide, 5000);
    
    // Initialize
    updateCarousel();
}

// Editor's Picks horizontal carousel
function initEditorsCarousel(){
    const carousel = document.querySelector('[data-carousel]');
    if(!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    if(!track) return;

    function scrollByCard(dir){
        const card = track.querySelector('.card');
        const gap = 16;
        const amount = card ? card.getBoundingClientRect().width + gap : 320;
        track.scrollBy({left: dir * amount, behavior:'smooth'});
    }
    if(prev) prev.addEventListener('click', ()=>scrollByCard(-1));
    if(next) next.addEventListener('click', ()=>scrollByCard(1));

    // autoplay
    let autoplay = setInterval(()=>scrollByCard(1), 6000);
    carousel.addEventListener('mouseenter', ()=>clearInterval(autoplay));
    carousel.addEventListener('mouseleave', ()=>{ autoplay = setInterval(()=>scrollByCard(1), 6000); });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const captchaForm = document.querySelector('form.contact-form[data-captcha]');
    const newsletterForm = document.querySelector('.newsletter');
    
    // Contact form handling
    if (contactForm && !captchaForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            this.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Thank you! We\'ll be in touch soon.', 'success');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.classList.remove('loading');
            }, 2000);
        });
    }

    // Contact form with CAPTCHA (industry pages)
    if (captchaForm) {
        // Generate simple arithmetic question
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        const sum = a + b;
        const captchaLabel = captchaForm.querySelector('#captcha-label');
        if (captchaLabel) captchaLabel.textContent = `Solve: ${a} + ${b} =`;

        captchaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[name="email"]');
            const captchaInput = this.querySelector('input[name="captcha"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Submitting...';

            if (!emailInput || !isValidEmail(emailInput.value)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            if (!captchaInput || parseInt(captchaInput.value, 10) !== sum) {
                showNotification('Incorrect CAPTCHA. Please try again.', 'error');
                return;
            }

            if (submitBtn) {
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
            }
            this.classList.add('loading');

            setTimeout(() => {
                this.reset();
                showNotification('Thanks! Your brochure is downloading shortly.', 'success');
                // Trigger brochure download if configured
                const brochure = this.getAttribute('data-brochure');
                if (brochure) {
                    const link = document.createElement('a');
                    link.href = brochure;
                    link.download = '';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
                this.classList.remove('loading');
            }, 2000);
        });
    }
    
    // Newsletter form handling
    if (newsletterForm) {
        const newsletterInput = newsletterForm.querySelector('input[type="email"]');
        const newsletterBtn = newsletterForm.querySelector('button');
        
        if (newsletterBtn) {
            newsletterBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (!newsletterInput.value || !isValidEmail(newsletterInput.value)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                const originalText = this.textContent;
                this.textContent = 'Subscribing...';
                this.disabled = true;
                
                setTimeout(() => {
                    newsletterInput.value = '';
                    this.textContent = originalText;
                    this.disabled = false;
                    showNotification('Successfully subscribed to our newsletter!', 'success');
                }, 1500);
            });
        }
    }
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .hero-content,
        .hero-visual,
        .product-card,
        .feature-card,
        .metric-card,
        .process-card,
        .tillix-preview,
        .tillipay-content,
        .lead-content
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Counter animation for metrics
    const metricNumbers = document.querySelectorAll('.metric-number');
    const metricsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricNumbers.forEach(metric => {
        metricsObserver.observe(metric);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Industry tabs: swap title, copy and link
function initIndustryTabs() {
    const tabs = document.querySelectorAll('#industry-tabs a[data-industry]');
    const titleSpan = document.getElementById('active-industry');
    const copy = document.getElementById('industry-copy');
    const link = document.getElementById('industry-link');
    if (!tabs.length || !titleSpan || !copy || !link) return;

    const contentByKey = {
        banking: {
            title: 'Banking and Finance',
            text: 'Power secure, scalable payment experiences for banks and financial institutions. Automate compliance and deliver seamless journeys across every channel.',
            href: 'banking-finance.html'
        },
        retail: {
            title: 'Retails & Merchants',
            text: 'Boost conversions with embedded checkout, abandoned-cart nudges, and real-time insights to optimize every customer journey.',
            href: 'retailers-merchants.html'
        },
        saas: {
            title: 'SaaS Billing',
            text: 'Scale recurring subscription plans and communications with flexible billing workflows and retries.',
            href: 'saas-billing.html'
        },
        insurance: {
            title: 'Insurance',
            text: 'Automate recurring payments and policy communications to keep customers informed and reduce churn.',
            href: 'insurance.html'
        },
        public: {
            title: 'Public Sector',
            text: 'Bring communications online, integrate with legacy systems, and migrate data for smoother citizen experiences.',
            href: 'public-sector.html'
        },
        utilities: {
            title: 'Utilities',
            text: 'Modernize billing and customer communications with a two-way platform that integrates with legacy systems and speeds up collections.',
            href: 'utilities.html'
        },
        rentals: {
            title: 'Rentals & Leases',
            text: 'Create simple tenant payment pages and improve on-time collections with automated reminders.',
            href: 'rentals-leases.html'
        },
        telecom: {
            title: 'Telecommunications',
            text: 'Scale outreach and payments with customizable messaging across channels and integrated billing.',
            href: 'telecommunications.html'
        },
        education: {
            title: 'Education and Universities',
            text: 'Keep students engaged and informed via SMS, WhatsApp, IVR, and more while simplifying payments.',
            href: 'education.html'
        },
        memberships: {
            title: 'Memberships',
            text: 'Enable easy enrollment and dues payments for clubs and associations on multiple channels.',
            href: 'memberships.html'
        },
        gaming: {
            title: 'Gaming & Developers',
            text: 'Deliver immersive in-app experiences and seamless monetization with nudges and flexible payments.',
            href: 'gaming-developers.html'
        },
        media: {
            title: 'Media and Entertainment',
            text: 'Set up subscriptions and creator onboarding with adaptable smart pages across platforms.',
            href: 'media-entertainment.html'
        }
    };

    // Default state corresponds to banking (shown initially)
    function activate(key) {
        const data = contentByKey[key] || contentByKey.banking;
        titleSpan.textContent = data.title;
        copy.textContent = data.text;
        link.href = data.href;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const key = this.getAttribute('data-industry');
            activate(key);
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#4099FF'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isM = target.includes('M');
    const isK = target.includes('K');
    
    // Extract numeric value
    let numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
    
    if (isM) numericValue *= 1000000;
    if (isK) numericValue *= 1000;
    
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = numericValue * easeOutQuart;
        
        // Format the number
        let displayValue = Math.floor(currentValue);
        if (isM && displayValue >= 1000000) {
            displayValue = (displayValue / 1000000).toFixed(1) + 'M';
        } else if (isK && displayValue >= 1000) {
            displayValue = (displayValue / 1000).toFixed(1) + 'K';
        } else if (isPercentage) {
            displayValue = Math.floor(displayValue) + '%';
        } else if (isPlus) {
            displayValue = Math.floor(displayValue) + '+';
        } else {
            displayValue = Math.floor(displayValue);
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Button click effects
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .cta-button')) {
        // Create ripple effect
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        gap: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    body.menu-open {
        overflow: hidden;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #4099FF !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

// Simple modal handling
function initModals(){
    function openModal(modal){
        if(!modal) return;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeModal(modal){
        if(!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Open triggers
    document.querySelectorAll('[data-modal-target]')
        .forEach(btn => btn.addEventListener('click', function(e){
            e.preventDefault();
            const selector = this.getAttribute('data-modal-target');
            const modal = document.querySelector(selector);
            openModal(modal);
        }));

    // Close triggers
    document.addEventListener('click', function(e){
        const closeBtn = e.target.closest('[data-close-modal]');
        if(closeBtn){
            const modal = closeBtn.closest('.modal');
            closeModal(modal);
        }
    });

    // Esc to close
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
            document.querySelectorAll('.modal.is-open').forEach(m => closeModal(m));
        }
    });
}

// Animate progress stepper when visible
function initProgressSteps(){
    const steps = document.querySelector('.progress-steps');
    if(!steps) return;
    const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry => {
            if(entry.isIntersecting){
                steps.classList.add('is-visible');
                io.unobserve(steps);
            }
        });
    }, { threshold: 0.3 });
    io.observe(steps);
}

// Blog Index (Insights-style) rendering and pagination
function initBlogIndex(){
    const grid = document.getElementById('posts-grid');
    const pagination = document.getElementById('posts-pagination');
    const searchInput = document.getElementById('blog-search');
    const chips = document.querySelectorAll('.chips .chip');
    const dataEl = document.getElementById('posts-data');
    if(!grid || !dataEl) return;

    const data = JSON.parse(dataEl.textContent || '{}');
    const pageSize = data.pageSize || 8;
    const rawPosts = Array.isArray(data.posts) ? data.posts : [];
    // Normalize dates for robust sorting (newest first)
    function parseDateToTs(str){
        if (!str) return 0;
        const d = new Date(str);
        if (!isNaN(d)) return d.getTime();
        // Fallbacks for common formats (e.g., "Jan 2025", "2025-01-17")
        const tryISO = Date.parse(str);
        return isNaN(tryISO) ? 0 : tryISO;
    }
    const allPosts = rawPosts.map(p => ({...p, ts: parseDateToTs(p.dateISO || p.date)}));
    let state = { q: '', filter: 'all', page: 1 };

    function getFiltered(){
        const q = state.q.trim().toLowerCase();
        return allPosts.filter(p => {
            const matchesFilter = state.filter === 'all' || (p.category || '').toLowerCase() === state.filter;
            const matchesQuery = !q || (p.title||'').toLowerCase().includes(q);
            return matchesFilter && matchesQuery;
        });
    }

    function render(){
        const items = getFiltered().sort((a,b) => (b.ts||0) - (a.ts||0));
        const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        if(state.page > totalPages) state.page = totalPages;
        const start = (state.page - 1) * pageSize;
        const pageItems = items.slice(start, start + pageSize);

        grid.innerHTML = pageItems.map(p => `
            <article class="post-card">
                <a class="media" href="${p.href}">
                    <img src="${p.image}" alt="${p.title}">
                </a>
                <div class="body">
                    <span class="meta">${(p.category||'').replace('-', ' ')} • ${p.author || ''} • ${p.date || ''}</span>
                    <h3 class="title"><a class="link-muted" href="${p.href}">${p.title}</a></h3>
                </div>
            </article>
        `).join('');

        // Pagination
        pagination.innerHTML = '';
        if(totalPages > 1){
            for(let i=1;i<=totalPages;i++){
                const btn = document.createElement('button');
                btn.textContent = i;
                btn.className = i === state.page ? 'is-active' : '';
                btn.addEventListener('click', ()=>{ state.page = i; render(); window.scrollTo({top:0,behavior:'smooth'}); });
                pagination.appendChild(btn);
            }
        }
    }

    // Events
    if(searchInput){
        searchInput.addEventListener('input', (e)=>{ state.q = e.target.value || ''; state.page = 1; render(); });
    }
    chips.forEach(chip => {
        chip.addEventListener('click', ()=>{
            chips.forEach(c=>c.classList.remove('is-active'));
            chip.classList.add('is-active');
            state.filter = chip.getAttribute('data-filter') || 'all';
            state.page = 1;
            render();
        });
    });

    render();
}

// Single Post: reading time, progress bar, share links
function initBlogPost(){
    const article = document.querySelector('.post .blog-post-body');
    const readingTimeEl = document.getElementById('reading-time');
    const progress = document.querySelector('.reading-progress span');
    const share = document.querySelector('.share-bar');
    if(!article) return;

    // Reading time (~200 wpm)
    if(readingTimeEl){
        const text = article.textContent || '';
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / 200));
        readingTimeEl.textContent = `${minutes} min read`;
    }

    // Scroll progress
    function updateProgress(){
        const rect = article.getBoundingClientRect();
        const total = article.scrollHeight - window.innerHeight;
        const scrolled = Math.min(total, Math.max(0, window.scrollY - (article.offsetTop - 80)));
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        if(progress){ progress.style.width = pct + '%'; }
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Share
    if(share){
        const url = window.location.href;
        share.querySelectorAll('a[data-network]').forEach(a => {
            const net = a.getAttribute('data-network');
            a.addEventListener('click', (e)=>{
                e.preventDefault();
                if(net === 'copy'){
                    navigator.clipboard?.writeText(url);
                    showNotification('Link copied to clipboard', 'success');
                    return;
                }
                const title = document.title;
                let shareUrl = '';
                if(net === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                if(net === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                if(net === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                if(shareUrl) window.open(shareUrl, '_blank', 'noopener,width=600,height=600');
            });
        });
    }
}
