document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll & Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animate on Scroll ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach((element) => scrollObserver.observe(element));

    // --- Portfolio Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;
            portfolioItems.forEach(item => {
                const shouldShow = filter === 'all' || item.dataset.category === filter;
                item.style.transform = 'scale(0.9)';
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = shouldShow ? 'block' : 'none';
                    setTimeout(() => {
                        if (shouldShow) {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }
                    }, 50);
                }, 300);
            });
        });
    });
    
    // --- Portfolio Modal (Lightbox) ---
    const modal = document.querySelector('.portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModalBtn = document.querySelector('.close-modal');
    if (modal && modalImg && closeModalBtn) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                modalImg.src = item.querySelector('img').src;
                modal.classList.add('active');
            });
        });
        const closeModal = () => modal.classList.remove('active');
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    // --- Integrated Blog Tab Logic ---
    const blogTabs = document.querySelectorAll('.blog-tab-btn');
    const blogContents = document.querySelectorAll('.blog-post-content');
    blogTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            blogTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            blogContents.forEach(content => {
                content.classList.toggle('active', content.id === targetId);
            });
        });
    });

    // --- Functional Contact Form (Web3Forms) ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const accessKey = 'f04efbf8-e6a1-4784-9d88-3885f0374d82'; // <-- IMPORTANT: REPLACE THIS!
            const formData = new FormData(form);
            formData.append("access_key", accessKey);
            formData.append("subject", "New Contact Form Submission from ASKera Design Website");
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            formStatus.innerHTML = "Sending...";
            formStatus.className = 'error';
            formStatus.style.display = 'block';
            try {
                const res = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: json });
                const result = await res.json();
                if (result.success) {
                    formStatus.innerHTML = "Message sent successfully!";
                    formStatus.className = 'success';
                    form.reset();
                    form.querySelectorAll('.form-group label').forEach(label => { label.style.top = '0.8rem'; label.style.fontSize = ''; label.style.color = ''; });
                } else {
                    formStatus.innerHTML = result.message || "Oops! Something went wrong.";
                    formStatus.className = 'error';
                }
            } catch (error) {
                formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                formStatus.className = 'error';
            }
            setTimeout(() => { formStatus.style.display = 'none'; }, 6000);
        });
    }

    

});