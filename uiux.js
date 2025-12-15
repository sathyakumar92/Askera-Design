// Case Study Page JavaScript with Modal Logic

document.addEventListener('DOMContentLoaded', function() {
    console.log('Case Study Page Loaded');

    // 1. Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For custom inline styles handling if needed, but CSS animation handles most
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        // Initial state set in CSS usually, ensuring JS reinforces it
        fadeObserver.observe(element);
    });


    // 2. PROJECT MODAL LOGIC
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const projectCards = document.querySelectorAll('.project-card');

    // Modal Elements to Populate
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalCat = document.getElementById('modalCat');
    const modalFeatures = document.getElementById('modalFeatures');

    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent if clicking other interactive elements logic if added later
            
            // Get Data from Card
            const imgSrc = card.querySelector('.project-image img').getAttribute('src');
            const title = card.querySelector('.project-title').innerText;
            const category = card.querySelector('.cat-tag').innerText;
            
            // Get Hidden Details
            const detailsContainer = card.querySelector('.hidden-details');
            const fullDesc = detailsContainer.querySelector('.detail-desc').innerText;
            const featuresList = detailsContainer.querySelector('.detail-features').innerHTML;
            
            // Optional: Secondary image in detail view
            // const detailImg = detailsContainer.querySelector('img') ? detailsContainer.querySelector('img').src : imgSrc;

            // Populate Modal
            modalImg.src = imgSrc;
            modalTitle.innerText = title;
            modalCat.innerText = category;
            modalDesc.innerText = fullDesc;
            modalFeatures.innerHTML = featuresList;

            // Show Modal with Animation
            modal.style.display = 'block';
            // Slight delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Modal Function
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scroll
        }, 300); // Match transition duration
    }

    // Close Events
    closeBtn.addEventListener('click', closeModal);
    
    // Close on clicking outside content
    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });


    // 3. Hero Parallax Effect (Subtle)
    const heroSection = document.querySelector('.modern-hero');
    const heroShape = document.querySelector('.hero-abstract-shape');
    
    if(heroSection && heroShape) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            
            heroShape.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

});
