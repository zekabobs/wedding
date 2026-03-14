/**
 * Scroll Animations
 * Handles fade-in animations on scroll
 */

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );

        this.init();
    }

    init() {
        // Observe all elements with fade-in class
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-delay');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });

        // Add scroll listener for navbar
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // this.observer.unobserve(entry.target);
            }
        });
    }

    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrollPosition = window.scrollY;

        // Add/remove scrolled class for navbar styling
        if (navbar) {
            if (scrollPosition > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Show/hide floating RSVP button
        this.toggleFloatingButton(scrollPosition);
    }

    toggleFloatingButton(scrollPosition) {
        const floatingBtn = document.getElementById('floatingRsvp');
        const rsvpSection = document.getElementById('rsvp');
        
        if (!floatingBtn || !rsvpSection) return;

        const rsvpPosition = rsvpSection.offsetTop;
        const windowHeight = window.innerHeight;

        // Show button when scrolled past hero but before RSVP section
        if (scrollPosition > windowHeight && scrollPosition < rsvpPosition - windowHeight) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    }
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                const navToggle = document.getElementById('navToggle');
                
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }

                // Smooth scroll to target
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Create floating hearts on click
 */
function initFloatingHearts() {
    document.addEventListener('click', (e) => {
        // Create heart on click (optional fun feature)
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    initSmoothScroll();
    // initFloatingHearts(); // Uncomment if you want hearts on click
});