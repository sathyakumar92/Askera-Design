document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Hamburger icon animation (bars to X)
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    
    // --- Portfolio Filtering ---
    const filterBtns = document.querySelector('.portfolio-filters');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON') return;

        // Set active button
        const activeBtn = filterBtns.querySelector('.active');
        activeBtn.classList.remove('active');
        e.target.classList.add('active');

        const filterValue = e.target.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.style.display = 'grid'; // Use grid to respect grid-auto-flow
                setTimeout(() => item.classList.remove('hidden'), 0);
            } else {
                item.classList.add('hidden');
                // Hide completely after transition
                setTimeout(() => item.style.display = 'none', 300); 
            }
        });
    });
    
    // --- Portfolio Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxClose = document.querySelector('.lightbox-close');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    portfolioGrid.addEventListener('click', (e) => {
        const item = e.target.closest('.portfolio-item');
        if (!item) return;

        const content = item.querySelector('img, video');
        if (!content) return;
        
        // Clone the element to not affect the grid
        const clonedContent = content.cloneNode(true);
        
        // Clear previous content
        lightboxContent.innerHTML = '';
        
        // If it's a video, add controls and enable autoplay
        if (clonedContent.tagName === 'VIDEO') {
            clonedContent.muted = false; // Unmute for fullscreen view
            clonedContent.controls = true;
            clonedContent.autoplay = true;
        }

        lightboxContent.appendChild(clonedContent);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    const closeLightbox = () => {
        const video = lightboxContent.querySelector('video');
        if (video) {
            video.pause(); // Stop video when closing
        }
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox on clicking the background overlay
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});



document.addEventListener('DOMContentLoaded', () => {

    // --- Control for the Video Showcase Section ---
    const showcaseVideo = document.getElementById('promo-showcase-video');
    const showcaseUnmuteBtn = document.getElementById('video-unmute-btn');

    // Check if these elements exist on the page to avoid errors
    if (showcaseVideo && showcaseUnmuteBtn) {
        const icon = showcaseUnmuteBtn.querySelector('i');

        showcaseUnmuteBtn.addEventListener('click', () => {
            if (showcaseVideo.muted) {
                // If the video is currently muted, unmute it
                showcaseVideo.muted = false;
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-high');
            } else {
                // If the video is currently playing sound, mute it
                showcaseVideo.muted = true;
                icon.classList.remove('fa-volume-high');
                icon.classList.add('fa-volume-mute');
            }
        });
    }
    
});

document.addEventListener('DOMContentLoaded', () => {

    // --- (Your other JS code is here) ---

    // --- Testimonial Rating Count-Up Animation ---
    const ratingCard = document.getElementById('overall-rating-card');

    const animateCountUp = (el) => {
        const targetValue = 4.8; // Set your target rating here
        const duration = 2000; // Animation duration in milliseconds
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const currentValue = progress * targetValue;
            el.textContent = currentValue.toFixed(1); // Update text with 1 decimal place

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    // Use Intersection Observer to trigger the animation only when visible
    const ratingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const ratingValueEl = document.getElementById('overall-rating-value');
                animateCountUp(ratingValueEl);
                // Stop observing after the animation is triggered once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });
    
    // Start observing the rating card if it exists
    if (ratingCard) {
        ratingObserver.observe(ratingCard);
    }
    
});