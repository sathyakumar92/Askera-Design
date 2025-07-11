document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll & Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

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
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        scrollObserver.observe(element);
    });

    // --- Portfolio Filter ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            portfolioItems.forEach(item => {
                const itemCategory = item.dataset.category;
                const shouldShow = filter === 'all' || filter === itemCategory;
                
                item.style.transform = 'scale(0.9)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (shouldShow) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
    
    // --- Portfolio Modal (Lightbox) ---
    const modal = document.querySelector('.portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('active');
        });
    });

    const closeTheModal = () => {
        modal.classList.remove('active');
    };

    closeModal.addEventListener('click', closeTheModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTheModal();
        }
    });

    // --- Functional Contact Form using Web3Forms ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // --- IMPORTANT: REPLACE WITH YOUR WEB3FORMS ACCESS KEY ---
            const accessKey = 'f04efbf8-e6a1-4784-9d88-3885f0374d82'; 
            
            const formData = new FormData(form);
            formData.append("access_key", accessKey);
            formData.append("subject", "New Contact Form Submission from ASKera Design Website");

            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            formStatus.innerHTML = "Sending...";
            formStatus.className = 'error'; // Neutral style while sending
            formStatus.style.display = 'block';

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: json
                });

                const result = await response.json();

                if (result.success) {
                    formStatus.innerHTML = "Message sent successfully!";
                    formStatus.className = 'success';
                    form.reset(); // Clear form fields
                    // Reset labels to their original position
                    form.querySelectorAll('.form-group label').forEach(label => {
                        label.style.top = '0.8rem';
                        label.style.fontSize = '';
                        label.style.color = '';
                    });
                } else {
                    console.error("Submission Error:", result);
                    formStatus.innerHTML = result.message || "Oops! Something went wrong.";
                    formStatus.className = 'error';
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                formStatus.innerHTML = "Oops! There was a problem submitting your form.";
                formStatus.className = 'error';
            }
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 6000);
        });
    }
});