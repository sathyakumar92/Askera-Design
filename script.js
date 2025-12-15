// ASKera - Professional JavaScript Implementation
// Author: Senior Developer (25+ Years Experience)

'use strict';

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ==========================================
// SCROLL PROGRESS BAR
// ==========================================

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 100;
    
    if (window.pageYOffset > scrollThreshold) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ==========================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// 3D CAROUSEL CONTROLS - ENHANCED
// ==========================================

let currentRotation = 0;
let currentSlideIndex = 0;
let carouselAutoRotate = true;
let carouselInterval;
let carouselTimeout;
const totalSlides = 6; // Updated for 6 review cards
const rotationStep = 60; // 360/6 = 60 degrees per card

// Initialize carousel autoplay
function initCarouselAutoplay() {
    if (carouselAutoRotate) {
        carouselInterval = setInterval(() => {
            rotateCarousel('next');
        }, 5000); // Auto-rotate every 5 seconds
    }
}

// Stop autoplay
function stopAutoplay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

// Resume autoplay
function resumeAutoplay() {
    stopAutoplay();
    if (carouselAutoRotate) {
        initCarouselAutoplay();
    }
}

function rotateCarousel(direction) {
    const carousel = document.querySelector('.carousel-3d');
    if (!carousel) return;
    
    // Temporarily stop auto-rotation
    stopAutoplay();
    clearTimeout(carouselTimeout);
    
    if (direction === 'next') {
        currentRotation -= rotationStep;
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    } else if (direction === 'prev') {
        currentRotation += rotationStep;
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    }
    
    // Apply rotation
    carousel.style.animation = 'none';
    carousel.style.transform = `rotateY(${currentRotation}deg)`;
    
    // Update indicators
    updateIndicators();
    
    // Resume auto-rotation after 8 seconds of inactivity
    carouselTimeout = setTimeout(() => {
        resumeAutoplay();
    }, 8000);
}

// Update active indicator
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlideIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Indicator click handler
function initIndicatorControls() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const diff = index - currentSlideIndex;
            currentRotation -= diff * rotationStep;
            currentSlideIndex = index;
            
            const carousel = document.querySelector('.carousel-3d');
            if (carousel) {
                carousel.style.animation = 'none';
                carousel.style.transform = `rotateY(${currentRotation}deg)`;
            }
            
            updateIndicators();
            stopAutoplay();
            clearTimeout(carouselTimeout);
            carouselTimeout = setTimeout(() => {
                resumeAutoplay();
            }, 8000);
        });
    });
}

// Toggle autoplay function
function toggleAutoplay() {
    const autoplayBtn = document.getElementById('autoplayToggle');
    const carousel = document.querySelector('.carousel-3d');
    
    if (!autoplayBtn || !carousel) return;
    
    carouselAutoRotate = !carouselAutoRotate;
    
    if (carouselAutoRotate) {
        // Start autoplay
        autoplayBtn.innerHTML = '<i class="fas fa-pause"></i><span>Autoplay On</span>';
        autoplayBtn.classList.remove('paused');
        carousel.classList.remove('paused');
        carousel.style.animation = 'rotateCarousel 40s infinite linear';
        resumeAutoplay();
    } else {
        // Pause autoplay
        autoplayBtn.innerHTML = '<i class="fas fa-play"></i><span>Autoplay Off</span>';
        autoplayBtn.classList.add('paused');
        carousel.classList.add('paused');
        carousel.style.animation = 'none';
        stopAutoplay();
    }
}

// Pause carousel on hover
function initCarouselHover() {
    const carousel = document.querySelector('.carousel-3d');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            stopAutoplay();
            carousel.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            carousel.style.animationPlayState = 'running';
            clearTimeout(carouselTimeout);
            carouselTimeout = setTimeout(() => {
                resumeAutoplay();
            }, 3000);
        });
    }
}

// ==========================================
// FORM SUBMISSION HANDLER
// ==========================================

function initFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const formData = new FormData(form);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                
                // Reset form
                form.reset();
                
                // Show success message
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation"></i> Failed - Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
            
            showNotification('Oops! Something went wrong. Please try again.', 'error');
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 20px 30px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 350px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span style="margin-left: 10px;">${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', throttle(toggleBackToTop, 200));
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// PARALLAX EFFECT FOR HERO VIDEO
// ==========================================

function initParallax() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroVideo.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    
    window.addEventListener('scroll', throttle(updateParallax, 10));
}

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
// ==========================================

function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    function highlightNavigation() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', throttle(highlightNavigation, 100));
}

// ==========================================
// SERVICE CARD HOVER EFFECTS
// ==========================================

function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Add tilt effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ==========================================
// PRELOADER (Optional)
// ==========================================

function initPreloader() {
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
}

// ==========================================
// INITIALIZE ALL COMPONENTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c⚡ ASKera Design System Loaded', 'color: #D4A574; font-size: 16px; font-weight: bold;');
    
    // Initialize all features
    initSmoothScroll();
    initScrollAnimations();
    initCarouselHover();
    initCarouselAutoplay(); // Initialize autoplay
    initIndicatorControls(); // Initialize indicator controls
    initFormSubmission();
    initBackToTop();
    initLazyLoading();
    initParallax();
    initActiveNavOnScroll();
    initServiceCardEffects();
    initPreloader();
    
    // Update on scroll
    window.addEventListener('scroll', throttle(() => {
        updateScrollProgress();
        handleNavbarScroll();
    }, 10));
});

// ==========================================
// CSS ANIMATIONS (Add to page)
// ==========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Expose functions to global scope for inline event handlers
window.rotateCarousel = rotateCarousel;
window.toggleAutoplay = toggleAutoplay;
