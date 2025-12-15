
import { useEffect } from 'react';
import ReviewCarousel from '../components/ReviewCarousel';
import ContactForm from '../components/ContactForm';

export default function Home() {

  useEffect(() => {
    // Parallax logic
    const handleScroll = () => {
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            const scrolled = window.pageYOffset;
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    };
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

    // Service card tilt effect
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        const handleMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        };
        const handleLeave = () => {
            card.style.transform = '';
        };
        
        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);
        
        // Clean up per card
        card._cleanup = () => {
            card.removeEventListener('mousemove', handleMove);
            card.removeEventListener('mouseleave', handleLeave);
        };
    });

    return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
        cards.forEach(card => card._cleanup && card._cleanup());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
            <source src="/askera brand.mp4" type="video/mp4" />
        </video>
        
        <div className="hero-overlay"></div>
        
        <div className="container">
            <div className="hero-content">
                <div className="hero-text fade-in">
                    <h1>Transform Your Brand with <span className="highlight">Premium Design</span></h1>
                    <p className="hero-subtitle">We create stunning visual identities and digital experiences that make your business stand out in the modern marketplace. From logos to complete brand systems, we deliver excellence.</p>
                    <div className="hero-cta">
                        <a href="tel:+919042171585" className="btn btn-call-me">
                            <i className="fas fa-phone-alt"></i> Call Me
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
            <div className="section-header fade-in">
                <span className="section-label">What We Do</span>
                <h2 className="section-title">Core <span className="highlight">Systems</span></h2>
                <p className="section-desc">Comprehensive design solutions for the modern age. We combine strategic thinking with technical excellence to deliver results.</p>
            </div>
            
            <div className="services-grid">
                {[
                    { icon: 'brain', title: 'Strategy & Branding', text: 'We deconstruct your market position and reconstruct a visual identity that dominates through comprehensive brand architecture and positioning.' },
                    { icon: 'paint-brush', title: 'Graphic Design', text: 'Logos, branding kits, and marketing materials that stand out in a crowded market with timeless aesthetic principles.' },
                    { icon: 'code', title: 'Full-Stack Development', text: 'React, WebGL, Node.js. We build scalable, high-performance applications wrapped in luxury design and optimized for speed.' },
                    { icon: 'mobile-alt', title: 'Mobile Applications', text: 'User-centric mobile application interfaces designed for engagement, retention, and seamless cross-platform experiences.' },
                    { icon: 'cube', title: '3D Visuals', text: 'Immersive 3D elements and mockups to give your product a realistic feel that captivates and converts.' },
                    { icon: 'search', title: 'SEO & Strategy', text: 'Data-driven strategies to ensure your beautiful site gets seen by the right people at the right time.' }
                ].map((s, i) => (
                    <div className="service-card fade-in" key={i}>
                        <div className="service-icon">
                            <i className={`fas fa-${s.icon}`}></i>
                        </div>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Terms Section */}
      <section id="terms" className="section terms-section">
        <div className="container">
            <div className="section-header fade-in">
                <span className="section-label">Engagement</span>
                <h2 className="section-title">Partnership <span className="highlight">Protocol</span></h2>
                <p className="section-desc">Transparent processes designed for seamless collaboration across borders.</p>
            </div>
            
            <div className="terms-grid">
                <div className="term-card global fade-in-left">
                    <h3><i className="fas fa-globe"></i> Global Clients</h3>
                    <p className="term-subtitle">USA • UK • EUROPE • UAE</p>
                    <ul className="term-list">
                        <li><i className="fas fa-check-circle"></i> Payments: PayPal, Wise</li>
                        <li><i className="fas fa-check-circle"></i> 50% Upfront / 50% on Delivery</li>
                        <li><i className="fas fa-check-circle"></i> Standard Contract Agreement</li>
                        <li><i className="fas fa-check-circle"></i> 2 Rounds of Revisions Included</li>
                        <li><i className="fas fa-check-circle"></i> Full Intellectual Property Transfer</li>
                    </ul>
                </div>
                
                <div className="term-card india fade-in-right">
                    <h3><i className="fas fa-flag"></i> Indian Clients</h3>
                    <p className="term-subtitle">DOMESTIC PARTNERS</p>
                    <ul className="term-list">
                        <li><i className="fas fa-check-circle"></i> Payments: UPI, NEFT, IMPS</li>
                        <li><i className="fas fa-check-circle"></i> GST Invoicing Available</li>
                        <li><i className="fas fa-check-circle"></i> 50% Booking Fee Required</li>
                        <li><i className="fas fa-check-circle"></i> Localized Support Hours (9 AM - 8 PM IST)</li>
                        <li><i className="fas fa-check-circle"></i> Regional Language Support Available</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      <ReviewCarousel />

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
            <div className="section-header fade-in">
                <span className="section-label">Get in Touch</span>
                <h2 className="section-title">Start Your <span className="highlight">Project</span></h2>
                <p className="section-desc">Ready to transform your digital presence? Let's create something exceptional together.</p>
            </div>
            
            <div className="contact-grid">
                <div className="contact-info fade-in-left">
                    <h3>Contact Information</h3>
                    <div className="contact-item">
                        <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                        <div className="contact-details"><h4>Email Address</h4><p>sathya92.kumar28@gmail.com</p></div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-icon"><i className="fas fa-phone"></i></div>
                        <div className="contact-details"><h4>Phone Number</h4><p>+91 90421 71585</p></div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                        <div className="contact-details"><h4>Location</h4><p>Tamil Nadu, India</p></div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-icon"><i className="fas fa-clock"></i></div>
                        <div className="contact-details"><h4>Business Hours</h4><p>Mon - Sat: 9:00 AM - 8:00 PM IST</p></div>
                    </div>
                </div>
                
                <ContactForm />
            </div>
        </div>
      </section>
    </>
  );
}
