// Portfolio JavaScript - Modern Interactive Features
class PortfolioWebsite {
    constructor() {
        this.isLoading = true;
        this.currentSection = 'home';
        this.scrollProgress = 0;
        this.typingTexts = [
            'Full Stack Developer',
            'Team Leader',
            '.NET Expert',
            'Angular Specialist',
            'Award Winner',
            'Problem Solver'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isTyping = true;
        this.typingSpeed = 100;
        this.erasingSpeed = 50;
        this.delayBetweenTexts = 2000;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.handleLoading();
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupTypingAnimation();
        this.setupIntersectionObserver();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupThemeToggle();
        this.setupCodeEditor();
    }

    setupEventListeners() {
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('DOMContentLoaded', () => this.handleDOMContentLoaded());
    }

    handleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Simulate loading time for better UX
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            this.isLoading = false;
            this.animateOnLoad();
        }, 3000);
    }

    animateOnLoad() {
        // Trigger initial animations
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
            }, index * 100);
        });

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    handlePageLoad() {
        console.log('Page loaded successfully');
    }

    handleDOMContentLoaded() {
        console.log('DOM Content Loaded');
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.updateActiveNavLink(link);
                }
            });
        });

        // Update navbar on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    scrollToSection(targetSection) {
        const offset = 80; // Account for fixed navbar
        const targetPosition = targetSection.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    setupScrollEffects() {
        const progressBar = document.getElementById('progress-bar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / documentHeight) * 100;
            
            progressBar.style.width = `${scrollProgress}%`;
            this.scrollProgress = scrollProgress;
            
            // Update active section
            this.updateActiveSection();
        });
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    setupTypingAnimation() {
        const typingTextElement = document.getElementById('typing-text');
        
        if (!typingTextElement) return;
        
        const typeText = () => {
            if (this.isTyping) {
                if (this.currentCharIndex < this.typingTexts[this.currentTextIndex].length) {
                    typingTextElement.textContent += this.typingTexts[this.currentTextIndex].charAt(this.currentCharIndex);
                    this.currentCharIndex++;
                    setTimeout(typeText, this.typingSpeed);
                } else {
                    this.isTyping = false;
                    setTimeout(typeText, this.delayBetweenTexts);
                }
            } else {
                if (this.currentCharIndex > 0) {
                    typingTextElement.textContent = this.typingTexts[this.currentTextIndex].substring(0, this.currentCharIndex - 1);
                    this.currentCharIndex--;
                    setTimeout(typeText, this.erasingSpeed);
                } else {
                    this.isTyping = true;
                    this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                    setTimeout(typeText, this.typingSpeed);
                }
            }
        };
        
        typeText();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.about-content, .skill-category, .timeline-item, .project-card, .education-item, .contact-method'
        );
        
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
            observer.observe(element);
        });

        // Special animations for stats
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateElement(element) {
        // Add specific animations based on element type
        if (element.classList.contains('stat-number')) {
            this.animateCounter(element);
        }
        
        if (element.classList.contains('skill-category')) {
            this.animateSkillBars(element);
        }
        
        if (element.classList.contains('timeline-item')) {
            element.style.animation = 'slideInFromLeft 0.8s ease forwards';
        }
        
        if (element.classList.contains('project-card')) {
            element.style.animation = 'scaleIn 0.6s ease forwards';
        }
    }

    animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const isNumber = target.includes('+') || target.includes('K');
        
        let finalValue = 0;
        if (target.includes('5+')) finalValue = 5;
        else if (target.includes('70K+')) finalValue = 70;
        else if (target.includes('100%')) finalValue = 100;
        else if (target.includes('2x')) finalValue = 2;
        
        let current = 0;
        const increment = finalValue / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= finalValue) {
                current = finalValue;
                clearInterval(timer);
            }
            
            if (target.includes('5+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (target.includes('70K+')) {
                element.textContent = Math.floor(current) + 'K+';
            } else if (target.includes('100%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (target.includes('2x')) {
                element.textContent = Math.floor(current) + 'x';
            }
        }, 50);
    }

    animateSkillBars(skillCategory) {
        const skillItems = skillCategory.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(contactForm);
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: var(--text-primary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
                z-index: 9999;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification-success {
                border-left: 4px solid var(--success-green);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                font-size: 1.2rem;
                margin-left: auto;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        if (!document.querySelector('style[data-notifications]')) {
            style.setAttribute('data-notifications', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navToggle || !navMenu) return;
        
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;
        
        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        if (!themeToggle) return;
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    setTheme(theme) {
        const body = document.body;
        const themeIcon = document.getElementById('theme-icon');
        
        body.setAttribute('data-theme', theme);
        
        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
            }
        }
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'light' ? '#ffffff' : '#0f172a');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = theme === 'light' ? '#ffffff' : '#0f172a';
            document.head.appendChild(meta);
        }
    }

    setupCodeEditor() {
        const tabs = document.querySelectorAll('.tab');
        const programCs = document.getElementById('program-cs');
        const componentTs = document.getElementById('component-ts');
        
        if (!tabs.length || !programCs || !componentTs) return;
        
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Get tab name and show corresponding code block
                const tabName = tab.textContent.trim();
                
                // Hide all code blocks first
                programCs.style.display = 'none';
                componentTs.style.display = 'none';
                
                // Show the selected code block with smooth transition
                if (tabName === 'Program.cs') {
                    programCs.style.display = 'block';
                    programCs.style.opacity = '0';
                    setTimeout(() => {
                        programCs.style.opacity = '1';
                    }, 50);
                } else if (tabName === 'Component.ts') {
                    componentTs.style.display = 'block';
                    componentTs.style.opacity = '0';
                    setTimeout(() => {
                        componentTs.style.opacity = '1';
                    }, 50);
                }
            });
        });
        
        // Add CSS transitions for smooth effect
        const style = document.createElement('style');
        style.textContent = `
            .code-block {
                transition: opacity 0.3s ease;
            }
        `;
        
        if (!document.querySelector('style[data-code-editor]')) {
            style.setAttribute('data-code-editor', 'true');
            document.head.appendChild(style);
        }
    }

    handleScroll() {
        // Throttle scroll events for better performance
        if (!this.scrollTimeout) {
            this.scrollTimeout = setTimeout(() => {
                this.scrollTimeout = null;
                this.handleScrollThrottled();
            }, 16); // ~60fps
        }
    }

    handleScrollThrottled() {
        // Handle scroll-based animations and effects
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Show/hide elements based on scroll
        this.handleScrollAnimations();
    }

    handleScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in:not(.visible)');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    handleResize() {
        // Handle window resize events
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioWebsite();
});

// Add additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add custom cursor for desktop
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-inner"></div>';
        document.body.appendChild(cursor);
        
        // Add cursor styles
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                background: rgba(99, 102, 241, 0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                display: none;
            }
            
            .cursor-inner {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 6px;
                height: 6px;
                background: white;
                border-radius: 50%;
                transform: translate(-50%, -50%);
            }
            
            @media (hover: hover) {
                .custom-cursor {
                    display: block;
                }
            }
        `;
        document.head.appendChild(cursorStyle);
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on hover
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .btn, .nav-link, .project-card, .skill-item')) {
                cursor.style.transform = 'scale(1.5)';
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('a, button, .btn, .nav-link, .project-card, .skill-item')) {
                cursor.style.transform = 'scale(1)';
            }
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Add focus trap for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % navLinks.length;
                navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                navLinks[prevIndex].focus();
            }
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .skill-item, .project-card, .timeline-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });
});

// Add performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Portfolio loaded in ${Math.round(loadTime)} ms`);
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
        import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
});

// Add error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioWebsite;
}