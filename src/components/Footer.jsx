
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="modern-footer">
        <div className="container">
            <div className="footer-top">
                {/* Column 1: Brand & About */}
                <div className="footer-column">
                    <Link to="/" className="logo">ASKera <span className="design-text">Design</span></Link>
                    <p className="footer-desc">Elevating brands through premium design and innovative digital solutions. Let's build the future together.</p>
                    <div className="footer-social">
                        <a href="https://www.facebook.com/sklogosera" target="_blank" rel="noreferrer" className="social-icon facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/askeradesign/" target="_blank" rel="noreferrer" className="social-icon instagram"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/in/sathya-kumar-3278a7263/" target="_blank" rel="noreferrer" className="social-icon linkedin"><i className="fab fa-linkedin-in"></i></a>
                        <a href="https://wa.me/919042171585" target="_blank" rel="noreferrer" className="social-icon whatsapp"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
                
                {/* Column 2: Quick Links */}
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/case-studies">Case Studies</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><a href="/#contact">Start a Project</a></li>
                    </ul>
                </div>
                
                {/* Column 3: Services */}
                <div className="footer-column">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="/#services">Brand Identity</a></li>
                        <li><a href="/#services">Web Design</a></li>
                        <li><a href="/#services">UI/UX Design</a></li>
                        <li><a href="/#services">Motion Graphics</a></li>
                    </ul>
                </div>
                
                {/* Column 4: Contact */}
                <div className="footer-column">
                    <h4>Contact Us</h4>
                    <ul className="footer-contact-list">
                        <li>
                            <i className="fas fa-envelope"></i>
                            <span>sathya92.kumar28@gmail.com</span>
                        </li>
                        <li>
                            <i className="fas fa-phone-alt"></i>
                            <span>+91 90421 71585</span>
                        </li>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Tamil Nadu, India</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p className="copyright">&copy; 2025 ASKera Design. All Rights Reserved.</p>
                <div className="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
  );
}
