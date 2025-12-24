// ASKera - Professional JavaScript Implementation
// Author: Senior Developer (25+ Years Experience)

'use strict';

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const REVIEWS_KEY = 'askera_reviews_v1';
const GLOBAL_REVIEWS_COLLECTION = 'reviews';

// ==========================================
// FIREBASE CONFIGURATION (REAL-TIME SYNC)
// ==========================================
// IMPORTANT: Replace the values below with your real configuration 
// from the Firebase Console (Settings > Project Settings)
const firebaseConfig = {
    apiKey: "REPLACE_WITH_YOUR_API_KEY",
    authDomain: "askera-design.firebaseapp.com",
    projectId: "askera-design",
    storageBucket: "askera-design.appspot.com",
    messagingSenderId: "REPLACE_WITH_SENDER_ID",
    appId: "REPLACE_WITH_APP_ID"
};

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
    if (!scrollProgress) return;
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
// 3D CAROUSEL CONTROLS - ENHANCED & DYNAMIC
// ==========================================

let currentRotation = 0;
let currentSlideIndex = 0;
let carouselAutoRotate = true;
let carouselInterval;
let carouselTimeout;

// Dynamic carousel properties
function getCarouselData() {
    const cards = document.querySelectorAll('.review-card-3d');
    const total = cards.length;
    return {
        total: total,
        step: total > 0 ? 360 / total : 0
    };
}

// Update 3D positions dynamically
function updateCardPositions() {
    const cards = document.querySelectorAll('.review-card-3d');
    const { total } = getCarouselData();
    if (total === 0) return;
    
    // Dynamic Radius based on screen width
    let radius = 550; // Desktop
    if (window.innerWidth < 480) radius = 320;
    else if (window.innerWidth < 768) radius = 400;
    else if (window.innerWidth < 1200) radius = 480;

    cards.forEach((card, index) => {
        const theta = (360 / total) * index;
        card.style.transform = `rotateY(${theta}deg) translateZ(${radius}px)`;
        card.setAttribute('data-index', index);
    });

    // Update Indicators
    const indicatorContainer = document.getElementById('carouselIndicators');
    if (indicatorContainer) {
        indicatorContainer.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const span = document.createElement('span');
            span.className = `indicator ${i === currentSlideIndex ? 'active' : ''}`;
            span.setAttribute('data-slide', i);
            span.onclick = () => jumpToSlide(i);
            indicatorContainer.appendChild(span);
        }
    }
}

function jumpToSlide(index) {
    const { total, step } = getCarouselData();
    const diff = index - currentSlideIndex;
    currentRotation -= diff * step;
    currentSlideIndex = index;
    
    applyCarouselTransform();
    updateIndicators();
    stopAutoplay();
    resetAutoplayTimer();
}

function applyCarouselTransform() {
    const carousel = document.querySelector('.carousel-3d');
    if (carousel) {
        carousel.style.animation = 'none';
        carousel.style.transform = `rotateY(${currentRotation}deg)`;
    }
}

function resetAutoplayTimer() {
    clearTimeout(carouselTimeout);
    carouselTimeout = setTimeout(() => {
        resumeAutoplay();
    }, 8000);
}

// Initialize carousel autoplay
function initCarouselAutoplay() {
    if (carouselAutoRotate) {
        carouselInterval = setInterval(() => {
            rotateCarousel('next');
        }, 5000);
    }
}

function stopAutoplay() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function resumeAutoplay() {
    stopAutoplay();
    if (carouselAutoRotate) {
        initCarouselAutoplay();
    }
}

function rotateCarousel(direction) {
    const carousel = document.querySelector('.carousel-3d');
    if (!carousel) return;
    
    const { total, step } = getCarouselData();
    
    stopAutoplay();
    clearTimeout(carouselTimeout);
    
    if (direction === 'next') {
        currentRotation -= step;
        currentSlideIndex = (currentSlideIndex + 1) % total;
    } else if (direction === 'prev') {
        currentRotation += step;
        currentSlideIndex = (currentSlideIndex - 1 + total) % total;
    }
    
    applyCarouselTransform();
    updateIndicators();
    resetAutoplayTimer();
}

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

function initIndicatorControls() {
    // Handled by dynamic indicator creation in updateCardPositions
}

function toggleAutoplay() {
    const autoplayBtn = document.getElementById('autoplayToggle');
    const carousel = document.querySelector('.carousel-3d');
    
    if (!autoplayBtn || !carousel) return;
    
    carouselAutoRotate = !carouselAutoRotate;
    
    if (carouselAutoRotate) {
        autoplayBtn.innerHTML = '<i class="fas fa-pause"></i><span>Autoplay On</span>';
        autoplayBtn.classList.remove('paused');
        resumeAutoplay();
    } else {
        autoplayBtn.innerHTML = '<i class="fas fa-play"></i><span>Autoplay Off</span>';
        autoplayBtn.classList.add('paused');
        stopAutoplay();
    }
}

function initCarouselHover() {
    const carousel = document.querySelector('.carousel-3d');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            stopAutoplay();
            if (carouselAutoRotate) carousel.style.animationPlayState = 'paused';
        });
        
        carousel.addEventListener('mouseleave', () => {
            if (carouselAutoRotate) carousel.style.animationPlayState = 'running';
            resetAutoplayTimer();
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
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                
                // Reset form
                form.reset();
                
                // Show success message
                showNotification('Thank you! Your project details have been received.', 'success');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            submitBtn.innerHTML = '<i class="fas fa-exclamation"></i> Failed - Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
            
            showNotification('Oops! Submission failed. Please try again.', 'error');
            
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
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
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

// Parallax removed as per user request for fixed positioning
function initParallax() {
    // Disabled
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

// ==========================================
// PAGE TRANSITIONS - BUTTERY SMOOTH
// ==========================================

// ==========================================
// PAGE TRANSITIONS - REACT-LIKE
// ==========================================


function initPageTransitions() {
    // 1. Create Overlay
    let overlay = document.querySelector('.page-transition-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('page-transition-overlay');
        document.body.appendChild(overlay);
    }

    // 2. Initial Mount (Enter Animation)
    const hideOverlay = () => {
        requestAnimationFrame(() => {
            overlay.classList.add('hidden');
            document.body.classList.remove('page-exiting');
        });
    };

    if (document.readyState === 'complete') {
        hideOverlay();
    } else {
        window.addEventListener('load', hideOverlay);
        // Fail-safe: hide after 2 seconds no matter what
        setTimeout(hideOverlay, 2000);
    }

    // 3. Handle Back/Forward Cache
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            overlay.classList.add('hidden');
            document.body.classList.remove('page-exiting');
        }
    });

    // 4. Link Interception & Prefetching
    document.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        const target = link.getAttribute('target');

        // Valid Internal Link Check
        if (href && 
            !href.startsWith('#') && 
            !href.startsWith('mailto:') && 
            !href.startsWith('tel:') && 
            !href.startsWith('javascript:') &&
            target !== '_blank') {

            // Ignore Hash Links on Same Page
            try {
                const currentUrl = new URL(window.location.href);
                const targetUrl = new URL(link.href);
                if (currentUrl.pathname === targetUrl.pathname && 
                    currentUrl.search === targetUrl.search) {
                    return;
                }
            } catch (err) {}

            e.preventDefault();

            // React-like Exit Sequence
            // A. Add class to animate body out (scale down/fade)
            document.body.classList.add('page-exiting');
            
            // B. Fade in overlay slightly faster to cover transition
            overlay.classList.remove('hidden');

            // C. Navigate after animation (400ms match)
            setTimeout(() => {
                window.location.href = href;
            }, 400); 
        }
    });

    // 5. Intelligent Prefetching on Hover
    document.addEventListener('mouseover', e => {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        if (href && 
            !href.startsWith('#') && 
            !href.startsWith('mailto:') && 
            link.target !== '_blank' &&
            !link.dataset.prefetched) {
            
            // Add prefetch tag
            const linkTag = document.createElement('link');
            linkTag.rel = 'prefetch';
            linkTag.href = href;
            document.head.appendChild(linkTag);
            
            link.dataset.prefetched = true;
        }
    });
}

// ==========================================
// INITIALIZE ALL COMPONENTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    console.log('%c⚡ ASKera Design System Loaded', 'color: #D4A574; font-size: 16px; font-weight: bold;');
    
    initFirebase();
    initSmoothScroll();
    initScrollAnimations();
    initCarouselHover();
    initCarouselAutoplay();
    initFormSubmission();
    initReviewModal();
    initBackToTop();
    initLazyLoading();
    initActiveNavOnScroll();
    initServiceCardEffects();
    initPageTransitions();
    animateRatingCounter();
    // loadCustomReviews is now handled by the Firebase real-time listener
    
    // Initial position update
    updateCardPositions();
    
    // Update on resize
    window.addEventListener('resize', debounce(updateCardPositions, 200));
    
    // Update on scroll
    window.addEventListener('scroll', throttle(() => {
        updateScrollProgress();
        handleNavbarScroll();
    }, 10));
});

// ==========================================
// CUSTOM REVIEWS PERSISTENCE & GLOBAL SEEDING
// ==========================================

// These reviews will be visible to EVERYONE as a base
const SEEDED_REVIEWS = [
    {
        name: "Karthik Raja",
        role: "CEO, Prosper Ventures",
        location: "Chennai, Tamil Nadu, India",
        rating: 5,
        review: "The branding ASKera Design created for Prosper Ventures has completely transformed our market presence. Their understanding of modern tech aesthetics combined with local cultural nuances is unmatched.",
        photo: "clients/karthik.png"
    },
    {
        name: "Ananya Iyer",
        role: "CEO, Shakti Tech Solutions",
        location: "Coimbatore, Tamil Nadu, India",
        rating: 5,
        review: "The digital transformation ASKera Design led for Shakti Tech Solutions has been remarkable. They managed to create a brand identity that is both technologically advanced and deeply professional.",
        photo: "clients/ananya.jpg"
    },
    {
        name: "Senthil Kumar",
        role: "Director, Shakti Tech Solutions",
        location: "Madurai, Tamil Nadu, India",
        rating: 5,
        review: "Professionalism and creativity at its best. ASKera Design helped us modernize Shakti Tech Solutions for the digital age. Exceptional service and impeccable attention to detail.",
        photo: "clients/senthil.jpg"
    }
];

// Firebase Integration (Global Persistence)
let db;
function initFirebase() {
    if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "REPLACE_WITH_YOUR_API_KEY") {
        try {
            firebase.initializeApp(firebaseConfig);
            db = firebase.firestore();
            console.log("%c🔥 Firebase Real-time Sync Active", "color: #ffca28; font-weight: bold;");
            
            // Set up real-time listener
            listenForReviews();
        } catch (error) {
            console.error("Firebase Initialization Error:", error);
            loadCustomReviewsFallback(); // Fallback to local storage
        }
    } else {
        console.warn("Firebase config missing. Real-time reviews disabled. Using LocalStorage only.");
        loadCustomReviewsFallback();
    }
}

function listenForReviews() {
    if (!db) return;
    
    // Listen for real-time updates from Firestore
    db.collection(GLOBAL_REVIEWS_COLLECTION)
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
          const firebaseReviews = [];
          snapshot.forEach(doc => {
              const data = doc.data();
              // Filter out "Jebin" or test reviews
              if (data.name && data.name.toLowerCase().includes('jebin')) return;
              firebaseReviews.push(data);
          });
          
          renderReviews(firebaseReviews);
      }, (error) => {
          console.error("Firestore Listen Error:", error);
          loadCustomReviewsFallback();
      });
}

function renderReviews(firebaseReviews) {
    const carousel = document.getElementById('reviewCarousel');
    if (!carousel) return;

    // Clear existing for a clean load
    carousel.innerHTML = '';

    // 1. Add Firebase Reviews first (LATEST)
    firebaseReviews.forEach(review => {
        carousel.appendChild(createReviewCardElement(review));
    });

    // 2. Add Seeded (Global) Reviews
    SEEDED_REVIEWS.forEach(review => {
        carousel.appendChild(createReviewCardElement(review));
    });

    // Final Setup
    updateCardPositions();
}

function loadCustomReviewsFallback() {
    const carousel = document.getElementById('reviewCarousel');
    if (!carousel) return;

    carousel.innerHTML = '';

    // 1. Add Seeded (Global) Reviews
    SEEDED_REVIEWS.forEach(review => {
        carousel.appendChild(createReviewCardElement(review));
    });

    // 2. Add Local (User-submitted) Reviews from current device
    const localReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
    const filteredLocal = localReviews.filter(review => 
        !(review.name && review.name.toLowerCase().includes('jebin'))
    );
    
    // Update local storage if we filtered anything out
    if (filteredLocal.length !== localReviews.length) {
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(filteredLocal));
    }

    filteredLocal.forEach(review => {
        carousel.appendChild(createReviewCardElement(review));
    });
    
    updateCardPositions();
}

function createReviewCardElement(review) {
    const div = document.createElement('div');
    div.className = 'review-card-3d';
    
    // Format date from timestamp if available, otherwise use "Today" or string
    let dateStr = "Recently";
    if (review.timestamp) {
        const d = review.timestamp.toDate ? review.timestamp.toDate() : new Date(review.timestamp);
        dateStr = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (review.date) {
        dateStr = review.date;
    } else {
        dateStr = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    const rating = parseFloat(review.rating) || 5;
    
    div.innerHTML = `
        <div class="card-shine"></div>
        <div class="review-header">
            <div class="client-avatar">
                <img src="${review.photo || 'clients/default.png'}" alt="${review.name}">
                <div class="avatar-glow"></div>
            </div>
            <div class="client-info">
                <h4>${review.name}</h4>
                <p>${review.role}</p>
                <span class="client-location"><i class="fas fa-map-marker-alt"></i> ${review.location}</span>
            </div>
        </div>
        <div class="rating-stars">
            ${Array(Math.floor(rating)).fill('<i class="fas fa-star"></i>').join('')}
            ${rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
            ${Array(5 - Math.ceil(rating)).fill('<i class="far fa-star"></i>').join('')}
            <span class="rating-number">${rating.toFixed(1)}</span>
        </div>
        <p class="review-text">"${review.review}"</p>
        <div class="review-footer">
            <div class="verified-badge">
                <i class="fas fa-check-circle"></i> Verified Client
            </div>
            <div class="review-date">
                <i class="fas fa-calendar"></i> ${dateStr}
            </div>
        </div>
    `;
    return div;
}

// ==========================================
// REVIEW MODAL LOGIC
// ==========================================

function initReviewModal() {
    const openBtn = document.getElementById('openReviewModal');
    const closeBtn = document.getElementById('closeReviewModal');
    const modal = document.getElementById('reviewModal');
    const backdrop = modal?.querySelector('.modal-backdrop');
    const form = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('#starRating i');
    const ratingInput = document.getElementById('ratingValue');

    if (!openBtn || !modal) return;

    // Open Modal
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener('click', closeModal);

    // File Upload Logic
    const fileInput = document.getElementById('reviewPhoto');
    const uploadText = document.getElementById('file-upload-text');
    const uploadCTA = document.querySelector('.file-upload-cta');

    if (fileInput && uploadText && uploadCTA) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                uploadText.textContent = `Selected: ${fileName.substring(0, 20)}${fileName.length > 20 ? '...' : ''}`;
                uploadCTA.classList.add('selected');
                uploadCTA.querySelector('i').className = 'fas fa-check-circle';
            } else {
                uploadText.textContent = 'Upload Your Photo';
                uploadCTA.classList.remove('selected');
                uploadCTA.querySelector('i').className = 'fas fa-cloud-upload-alt';
            }
        });
    }

    // Star Rating
    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            highlightStars(this.dataset.rating);
        });
        star.addEventListener('mouseleave', () => highlightStars(ratingInput.value));
        star.addEventListener('click', function() {
            ratingInput.value = this.dataset.rating;
            highlightStars(this.dataset.rating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(s => s.classList.toggle('active', s.dataset.rating <= rating));
    }

    highlightStars(5);

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting Review...';

            try {
                const formData = new FormData(form);
                const reviewData = {
                    name: formData.get('name'),
                    role: formData.get('role'),
                    location: formData.get('location'),
                    rating: formData.get('rating') || 5,
                    review: formData.get('review'),
                    photo: null
                };

                const photoFile = formData.get('attachment');
                if (photoFile && photoFile.size > 0) {
                    reviewData.photo = await new Promise(resolve => {
                        const reader = new FileReader();
                        reader.onload = ev => resolve(ev.target.result);
                        reader.readAsDataURL(photoFile);
                    });
                }

                // Save locally for immediate feedback
                const existing = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]');
                existing.push(reviewData);
                localStorage.setItem(REVIEWS_KEY, JSON.stringify(existing));

                // Global Cloud Sync (Real-time)
                if (db) {
                    await db.collection(GLOBAL_REVIEWS_COLLECTION).add({
                        ...reviewData,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                }

                // Update DOM (Only if Firebase is not active, as Firebase listener handles it otherwise)
                if (!db) {
                    const carousel = document.getElementById('reviewCarousel');
                    if (carousel) {
                        carousel.appendChild(createReviewCardElement(reviewData));
                        updateCardPositions();
                    }
                }

                // Attempt global submission
                fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData }).catch(console.error);

                submitBtn.innerHTML = '<i class="fas fa-check"></i> Review Posted!';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                showNotification('Your review has been posted to the website!', 'success');

                setTimeout(() => {
                    form.reset();
                    closeModal();
                    if (uploadText) uploadText.textContent = 'Upload Your Photo';
                    if (uploadCTA) uploadCTA.classList.remove('selected');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    highlightStars(5);
                }, 2000);

            } catch (err) {
                console.error(err);
                submitBtn.innerHTML = '<i class="fas fa-exclamation"></i> Error';
                showNotification('Could not post review. Please try again.', 'error');
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 3000);
            }
        });
    }
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.parentNode && document.body.removeChild(notification), 400);
    }, 5000);
}

// ==========================================
// BACK TO TOP
// ==========================================

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', throttle(() => {
        btn.classList.toggle('visible', window.pageYOffset > 500);
    }, 200));
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// RATING COUNTER ANIMATION
// ==========================================

function animateRatingCounter() {
    const ratingNumber = document.getElementById('overallRatingNumber');
    const container = document.querySelector('.overall-rating-container');
    if (!ratingNumber || !container) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let startValue = 0;
                const endValue = 5.0;
                const duration = 2500;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    ratingNumber.textContent = (easeProgress * endValue).toFixed(1);
                    if (progress < 1) requestAnimationFrame(updateCounter);
                }

                container.classList.add('visible');
                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(container);
}

// Global functions
window.rotateCarousel = rotateCarousel;
window.toggleAutoplay = toggleAutoplay;
function initLazyLoading() {}
function initParallax() {}
