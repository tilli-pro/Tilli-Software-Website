// Theme Management
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// Initialize theme on load
initTheme();

// Smooth scroll progress indicator
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    // Create scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    // Update scroll indicator on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollIndicator.style.width = `${scrolled}%`;
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navMenu.style.display === 'flex';
            
            if (isOpen) {
                navMenu.style.display = 'none';
                navActions.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '2rem';
                navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                navMenu.style.borderTop = '1px solid #E2E8F0';
                
                navActions.style.display = 'flex';
                navActions.style.position = 'absolute';
                navActions.style.top = 'calc(100% + 200px)';
                navActions.style.left = '2rem';
                navActions.style.right = '2rem';
            }
            
            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (isOpen) {
                spans[0].style.transform = 'rotate(0) translateY(0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translateY(0)';
            } else {
                spans[0].style.transform = 'rotate(45deg) translateY(6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state in navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe code cards
    document.querySelectorAll('.code-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe account items
    document.querySelectorAll('.account-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.gradient-mesh');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }

    // Mouse move effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const gradientMesh = hero.querySelector('.gradient-mesh');
            if (gradientMesh) {
                gradientMesh.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }

    // Account checkbox interaction
    const accountCheckboxes = document.querySelectorAll('.account-item input[type="checkbox"]');
    accountCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const accountItem = this.closest('.account-item');
            if (this.checked) {
                accountItem.classList.add('active');
            } else {
                accountItem.classList.remove('active');
            }
        });
    });

    // Button ripple effect
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles dynamically
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.5);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    button {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Typing animation for hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && false) { // Set to true to enable typing effect
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.minHeight = '4rem';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Code syntax highlighting simulation
    const codeBlocks = document.querySelectorAll('.code-block code');
    codeBlocks.forEach(block => {
        // Simple keyword highlighting
        let html = block.innerHTML;
        
        // Keywords
        const keywords = ['const', 'let', 'var', 'function', 'if', 'else', 'return', 'typeof', 'new', 'class', 'extends', 'import', 'export', 'from'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span style="color: #FF79C6; font-weight: 600;">${keyword}</span>`);
        });
        
        // Strings
        html = html.replace(/"([^"]*)"/g, '<span style="color: #F1FA8C;">"$1"</span>');
        html = html.replace(/'([^']*)'/g, '<span style="color: #F1FA8C;">\'$1\'</span>');
        
        // Comments
        html = html.replace(/(\/\/[^\n]*)/g, '<span style="color: #6272A4; font-style: italic;">$1</span>');
        
        // Numbers
        html = html.replace(/\b(\d+)\b/g, '<span style="color: #BD93F9;">$1</span>');
        
        // Functions
        html = html.replace(/(\w+)(?=\()/g, '<span style="color: #50FA7B;">$1</span>');
        
        block.innerHTML = html;
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 300px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Performance metrics (for development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            console.log('🚀 Performance Metrics:');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Connect Time: ${connectTime}ms`);
            console.log(`Render Time: ${renderTime}ms`);
        });
    }

    // Add custom cursor (optional)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    
    // Add cursor styles
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .custom-cursor {
            width: 10px;
            height: 10px;
            background: var(--primary-blue);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        }
        
        .cursor-follower {
            width: 30px;
            height: 30px;
            border: 2px solid var(--primary-blue);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.3s ease;
            opacity: 0.5;
            display: none;
        }
        
        @media (min-width: 1024px) {
            .custom-cursor, .cursor-follower {
                display: block;
            }
        }
    `;
    
    // Uncomment to enable custom cursor
    // document.head.appendChild(cursorStyle);
    // document.body.appendChild(cursor);
    // document.body.appendChild(cursorFollower);
    
    // document.addEventListener('mousemove', (e) => {
    //     cursor.style.left = e.clientX - 5 + 'px';
    //     cursor.style.top = e.clientY - 5 + 'px';
    //     
    //     setTimeout(() => {
    //         cursorFollower.style.left = e.clientX - 15 + 'px';
    //         cursorFollower.style.top = e.clientY - 15 + 'px';
    //     }, 100);
    // });
    
    // Hover effects for interactive elements
    // document.querySelectorAll('button, a').forEach(element => {
    //     element.addEventListener('mouseenter', () => {
    //         cursor.style.transform = 'scale(1.5)';
    //         cursorFollower.style.transform = 'scale(1.5)';
    //     });
    //     
    //     element.addEventListener('mouseleave', () => {
    //         cursor.style.transform = 'scale(1)';
    //         cursorFollower.style.transform = 'scale(1)';
    //     });
    // });
});

// Loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading class after animations complete
    setTimeout(() => {
        document.querySelectorAll('.loading').forEach(element => {
            element.classList.remove('loading');
        });
    }, 1000);
});

// Prevent form submission (for demo purposes)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submission prevented (demo mode)');
    });
});

// Export functions for use in other scripts
window.tilliX = {
    scrollToTop: () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    toggleTheme: () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    },
    
    init: () => {
        console.log('tilliX initialized');
    }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.tilliX.init);
} else {
    window.tilliX.init();
}