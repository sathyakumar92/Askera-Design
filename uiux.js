document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 3D Cylinder Ring Slider Logic
    // ==========================================
    const container = document.querySelector('.coverflow-container');
    const items = Array.from(document.querySelectorAll('.coverflow-item'));
    
    // Cylinder Configuration
    const itemCount = items.length;
    const anglePerItem = 360 / itemCount;
    const radius = Math.round((400 / 2) / Math.tan(Math.PI / itemCount)); // Calculate approx radius based on item width (400px)
    
    let currentAngle = 0;
    let autoRotateSpeed = 0.2; // Degrees per frame
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let dragSpeed = 0;
    let animationId;
    let isPaused = false;
    
    // Initial Setup: Arranging items in a circle
    items.forEach((item, index) => {
        const angle = index * anglePerItem;
        // rotateY to face center, translateZ to push out to radius
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius + 50}px)`;
        item.dataset.angle = angle;
    });
    
    // Main Animation Loop
    function animate() {
        if (!isDragging && !isPaused) {
            currentAngle -= autoRotateSpeed; // Rotate whole ring
        } else if (isDragging) {
            // Inertia or direct drag could be handled here, 
            // but for simplicity we update currentAngle in touch events
        } else if (!isDragging && Math.abs(dragSpeed) > 0.01) {
            // Inertia/Decay after drag
            currentAngle -= dragSpeed;
            dragSpeed *= 0.95; // Decay
        }
        
        container.style.transform = `translateZ(-${radius + 300}px) rotateY(${currentAngle}deg)`;
        
        animationId = requestAnimationFrame(animate);
    }
    
    // start animation
    animate();
    
    // ==========================================
    // Interaction: Drag to Rotate
    // ==========================================
    const wrapper = document.querySelector('.coverflow-wrapper');
    
    // Mouse Events
    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        dragSpeed = 0;
        wrapper.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const sensitivity = 0.5;
        currentAngle += deltaX * sensitivity;
        dragSpeed = -(deltaX * sensitivity); // Store speed for inertia
        startX = e.clientX;
    });
    
    window.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });
    
    // Touch Events
    wrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        dragSpeed = 0;
    }, {passive: false});
    
    wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent scroll while rotating
        const deltaX = e.touches[0].clientX - startX;
        const sensitivity = 0.5;
        currentAngle += deltaX * sensitivity;
        dragSpeed = -(deltaX * sensitivity);
        startX = e.touches[0].clientX;
    }, {passive: false});
    
    window.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    // Pause on Hover
    // Pause rotation when hovering over an item to read/click
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        item.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    });
    
    
    // ==========================================
    // Modal Logic
    // ==========================================
    const modal = document.getElementById('projectModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modalImg');
    const modalCat = document.getElementById('modalCat');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalFeatures = document.getElementById('modalFeatures');
    
    // Open Modal
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            isPaused = true; // Ensure paused
            
            // Populate Data
            const parentItem = btn.closest('.coverflow-item');
            const imgSrc = parentItem.querySelector('img').src;
            
            modalImg.src = imgSrc;
            modalCat.textContent = btn.dataset.cat;
            modalTitle.textContent = btn.dataset.title;
            modalDesc.textContent = btn.dataset.desc;
            
            // Features
            modalFeatures.innerHTML = '';
            if (btn.dataset.features) {
                const features = btn.dataset.features.split(', ');
                features.forEach(feat => {
                    const li = document.createElement('li');
                    li.textContent = feat;
                    modalFeatures.appendChild(li);
                });
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        isPaused = false; // Resume
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

});
