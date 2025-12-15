
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleScrollLink = (e, id) => {
    // If we are on the home page, scroll to element
    if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 80;
            const position = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
        closeMenu();
    }
  };

  return (
    <>
      <div className={`menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container">
            <Link to="/" className="logo">ASKera <span className="design-text">Design</span></Link>
            
            <button 
                className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/case-studies" onClick={closeMenu}>Case Studies</Link></li>
                <li><Link to="/pricing" onClick={closeMenu}>Pricing</Link></li>
                <li><a href="/#services" onClick={(e) => handleScrollLink(e, 'services')}>Services</a></li>
                <li><a href="/#terms" onClick={(e) => handleScrollLink(e, 'terms')}>Terms</a></li>
                <li><a href="/#contact" className="btn btn-primary" onClick={(e) => handleScrollLink(e, 'contact')}>Contact Us</a></li>
            </ul>
        </div>
      </nav>
    </>
  );
}
