
import { useState, useEffect } from 'react';

export default function Pricing() {
    const [isIndian, setIsIndian] = useState(true);

    useEffect(() => {
        // Animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Matches global CSS
                }
            });
        });
        document.querySelectorAll('.pricing-hero-content > *, .section-header, .pricing-card-3d, .pricing-switch-wrapper').forEach(el => observer.observe(el));
        
        // 3D Card Effect
        const cards = document.querySelectorAll('.pricing-card-3d');
         cards.forEach(card => {
             const handleMove = (e) => {
                 const rect = card.getBoundingClientRect();
                 const x = e.clientX - rect.left;
                 const y = e.clientY - rect.top;
                 const centerX = rect.width / 2;
                 const centerY = rect.height / 2;
                 const rotateX = (y - centerY) / 10;
                 const rotateY = (centerX - x) / 10;
                 card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
             };
             const handleLeave = () => {
                 card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
             };
             card.addEventListener('mousemove', handleMove);
             card.addEventListener('mouseleave', handleLeave);
             card._cleanup = () => {
                card.removeEventListener('mousemove', handleMove);
                card.removeEventListener('mouseleave', handleLeave);
             };
         });

        return () => {
            observer.disconnect();
            cards.forEach(c => c._cleanup && c._cleanup());
        };
    }, [isIndian]);

    return (
        <div className="pricing-page">
            <section className="pricing-hero">
                <div className="pricing-hero-bg">
                    <div className="pricing-orb orb-1"></div>
                    <div className="pricing-orb orb-2"></div>
                    <div className="pricing-orb orb-3"></div>
                </div>
                <div className="container">
                    <div className="pricing-hero-content">
                        <span className="pricing-label fade-in">Investment in Excellence</span>
                        <h1 className="pricing-hero-title fade-in">
                            Choose Your <span className="gradient-text">Perfect Plan</span>
                        </h1>
                        <p className="pricing-hero-desc fade-in">
                            Transparent pricing with exceptional value. No hidden fees, just professional design services that elevate your brand.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pricing-toggle-section">
                <div className="container">
                    <div className="pricing-switch-wrapper fade-in">
                        <div className="pricing-switch-container">
                            <div className={`pricing-switch-label indian-label ${isIndian ? 'active' : ''}`} onClick={() => setIsIndian(true)}>
                                <i className="fas fa-rupee-sign"></i>
                                <span>Indian Clients</span>
                            </div>
                            <div className={`pricing-switch-toggle ${!isIndian ? 'switched' : ''}`} onClick={() => setIsIndian(!isIndian)}>
                                <div className="pricing-switch-slider">
                                    <div className="switch-icon">
                                        <i className={`fas fa-${isIndian ? 'rupee-sign' : 'dollar-sign'}`}></i>
                                    </div>
                                </div>
                            </div>
                            <div className={`pricing-switch-label intl-label ${!isIndian ? 'active' : ''}`} onClick={() => setIsIndian(false)}>
                                <i className="fas fa-dollar-sign"></i>
                                <span>International</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Logo Design Pricing */}
             <section className="pricing-section">
                <div className="container">
                    <div className="section-header fade-in">
                        <div className="section-icon"><i className="fas fa-palette"></i></div>
                        <h2 className="section-title">Logo Design <span className="gradient-text">Packages</span></h2>
                        <p className="section-desc">Professional logo design services to establish your brand identity</p>
                    </div>

                    {/* Indian Pricing */}
                    <div className="pricing-grid indian-pricing" style={{display: isIndian ? 'grid' : 'none'}}> 
                        {/* Gold */}
                        <div className="pricing-card-3d popular fade-in">
                            <div className="popular-badge"><i className="fas fa-crown"></i><span>Most Popular</span></div>
                            <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Gold</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-crown"></i></div></div>
                                <div className="pricing-amount"><span className="currency">₹</span><span className="amount">3,000</span></div>
                                <p className="pricing-subtitle">Best for Growing Brands</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 5 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> 4 Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> All Formats (PNG, JPG, SVG, AI, PDF)</li>
                                    <li><i className="fas fa-check-circle"></i> Full Color Palette (5+ variations)</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit</li>
                                    <li><i className="fas fa-check-circle"></i> 3 Days Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> Priority Support</li>
                                </ul>
                                <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                         {/* Platinum */}
                        <div className="pricing-card-3d fade-in">
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Platinum</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-gem"></i></div></div>
                                <div className="pricing-amount"><span className="currency">₹</span><span className="amount">5,000</span></div>
                                <p className="pricing-subtitle">Premium Package</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 8 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> All Formats + Source Files</li>
                                    <li><i className="fas fa-check-circle"></i> Complete Brand Color System</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit + Favicon</li>
                                    <li><i className="fas fa-check-circle"></i> Business Card Design</li>
                                    <li><i className="fas fa-check-circle"></i> 2 Days Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> 24/7 Priority Support</li>
                                </ul>
                                <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        {/* Diamond */}
                        <div className="pricing-card-3d elite fade-in">
                            <div className="elite-badge"><i className="fas fa-diamond"></i><span>Elite Package</span></div>
                            <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Diamond</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-diamond"></i></div></div>
                                <div className="pricing-amount"><span className="currency">₹</span><span className="amount">8,000</span></div>
                                <p className="pricing-subtitle">Ultimate Brand Package</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 10+ Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Complete File Package + Source</li>
                                    <li><i className="fas fa-check-circle"></i> Advanced Brand Guidelines (PDF)</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit + Animated Logo</li>
                                    <li><i className="fas fa-check-circle"></i> Business Card + Letterhead</li>
                                    <li><i className="fas fa-check-circle"></i> Brand Mockups (10+)</li>
                                    <li><i className="fas fa-check-circle"></i> 1 Day Express Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> Dedicated Account Manager</li>
                                </ul>
                                <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Intl Pricing - Logo */}
                    <div className="pricing-grid international-pricing" style={{display: !isIndian ? 'grid' : 'none'}}>
                         {/* Gold */}
                        <div className="pricing-card-3d popular fade-in">
                            <div className="popular-badge"><i className="fas fa-crown"></i><span>Most Popular</span></div>
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Gold</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-crown"></i></div></div>
                                <div className="pricing-amount"><span className="currency">$</span><span className="amount">100</span></div>
                                <p className="pricing-subtitle">Best for Growing Brands</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 5 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> 4 Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> All Formats (PNG, JPG, SVG, AI, PDF)</li>
                                    <li><i className="fas fa-check-circle"></i> Full Color Palette (5+ variations)</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit</li>
                                    <li><i className="fas fa-check-circle"></i> 3 Days Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> Priority Support</li>
                                </ul>
                                <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        {/* Platinum */}
                        <div className="pricing-card-3d fade-in">
                            <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Platinum</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-gem"></i></div></div>
                                <div className="pricing-amount"><span className="currency">$</span><span className="amount">175</span></div>
                                <p className="pricing-subtitle">Premium Package</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 8 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> All Formats + Source Files</li>
                                    <li><i className="fas fa-check-circle"></i> Complete Brand Color System</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit + Favicon</li>
                                    <li><i className="fas fa-check-circle"></i> Business Card Design</li>
                                    <li><i className="fas fa-check-circle"></i> 2 Days Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> 24/7 Priority Support</li>
                                </ul>
                                <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                         {/* Diamond */}
                        <div className="pricing-card-3d elite fade-in">
                             <div className="elite-badge"><i className="fas fa-diamond"></i><span>Elite Package</span></div>
                            <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Diamond</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-diamond"></i></div></div>
                                <div className="pricing-amount"><span className="currency">$</span><span className="amount">250</span></div>
                                <p className="pricing-subtitle">Ultimate Brand Package</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 10+ Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Complete File Package + Source</li>
                                    <li><i className="fas fa-check-circle"></i> Advanced Brand Guidelines (PDF)</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit + Animated Logo</li>
                                    <li><i className="fas fa-check-circle"></i> Business Card + Letterhead</li>
                                    <li><i className="fas fa-check-circle"></i> Brand Mockups (10+)</li>
                                    <li><i className="fas fa-check-circle"></i> 1 Day Express Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> Dedicated Account Manager</li>
                                </ul>
                                <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
             </section>

             <section className="pricing-section brand-identity-section">
                  <div className="container">
                    <div className="section-header fade-in">
                        <div className="section-icon"><i className="fas fa-fingerprint"></i></div>
                        <h2 className="section-title">Brand Identity <span className="gradient-text">Packages</span></h2>
                        <p className="section-desc">Complete branding solutions to establish your unique market presence</p>
                    </div>

                    {/* Indian Pricing Brand Identity */}
                    <div className="pricing-grid indian-pricing" style={{display: isIndian ? 'grid' : 'none'}}>
                        {/* Gold */}
                         <div className="pricing-card-3d popular fade-in">
                             <div className="popular-badge"><i className="fas fa-crown"></i><span>Most Popular</span></div>
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Gold</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-crown"></i></div></div>
                                 <div className="pricing-amount"><span className="currency">₹</span><span className="amount">6,000</span></div>
                                 <p className="pricing-subtitle">Complete Brand Package</p>
                                 <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 5 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> 5 Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Full Color System</li>
                                    <li><i className="fas fa-check-circle"></i> Typography System (2-3 fonts)</li>
                                    <li><i className="fas fa-check-circle"></i> Business Card + Letterhead</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Templates (5)</li>
                                    <li><i className="fas fa-check-circle"></i> Email Signature Design</li>
                                    <li><i className="fas fa-check-circle"></i> Basic Brand Guidelines (PDF)</li>
                                    <li><i className="fas fa-check-circle"></i> 5 Days Delivery</li>
                                </ul>
                                 <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                             </div>
                         </div>
                         {/* Platinum */}
                         <div className="pricing-card-3d fade-in">
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Platinum</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-gem"></i></div></div>
                                 <div className="pricing-amount"><span className="currency">₹</span><span className="amount">10,000</span></div>
                                 <p className="pricing-subtitle">Premium Brand Identity</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 8 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Complete Color System</li>
                                    <li><i className="fas fa-check-circle"></i> Full Typography System</li>
                                    <li><i className="fas fa-check-circle"></i> Stationery Package</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit (10+ templates)</li>
                                    <li><i className="fas fa-check-circle"></i> Presentation Template</li>
                                    <li><i className="fas fa-check-circle"></i> Comprehensive Brand Guidelines</li>
                                    <li><i className="fas fa-check-circle"></i> Brand Mockups (15+)</li>
                                    <li><i className="fas fa-check-circle"></i> 4 Days Delivery</li>
                                </ul>
                                 <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                             </div>
                         </div>
                         {/* Diamond */}
                         <div className="pricing-card-3d elite fade-in">
                             <div className="elite-badge"><i className="fas fa-diamond"></i><span>Elite Package</span></div>
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Diamond</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-diamond"></i></div></div>
                                 <div className="pricing-amount"><span className="currency">₹</span><span className="amount">15,000</span></div>
                                 <p className="pricing-subtitle">Ultimate Brand Experience</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 10+ Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Advanced Color System + Gradients</li>
                                    <li><i className="fas fa-check-circle"></i> Complete Typography Ecosystem</li>
                                    <li><i className="fas fa-check-circle"></i> Full Stationery Suite</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit + Animated</li>
                                    <li><i className="fas fa-check-circle"></i> Website Design Mockup</li>
                                    <li><i className="fas fa-check-circle"></i> Packaging Design Concept</li>
                                    <li><i className="fas fa-check-circle"></i> Premium Brand Guidelines Book</li>
                                    <li><i className="fas fa-check-circle"></i> Brand Mockups (25+)</li>
                                    <li><i className="fas fa-check-circle"></i> 3 Days Express Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> Dedicated Brand Consultant</li>
                                </ul>
                                 <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                             </div>
                         </div>
                    </div>

                    {/* Intl Pricing Brand Identity */}
                    <div className="pricing-grid international-pricing" style={{display: !isIndian ? 'grid' : 'none'}}>
                        {/* Gold */}
                         <div className="pricing-card-3d popular fade-in">
                             <div className="popular-badge"><i className="fas fa-crown"></i><span>Most Popular</span></div>
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Gold</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-crown"></i></div></div>
                                 <div className="pricing-amount"><span className="currency">$</span><span className="amount">200</span></div>
                                 <p className="pricing-subtitle">Complete Brand Package</p>
                                 <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 5 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> 5 Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Full Color System</li>
                                    <li><i className="fas fa-check-circle"></i> Typography System (2-3 fonts)</li>
                                    <li><i className="fas fa-check-circle"></i> Business Card + Letterhead</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Templates (5)</li>
                                    <li><i className="fas fa-check-circle"></i> Email Signature Design</li>
                                    <li><i className="fas fa-check-circle"></i> Basic Brand Guidelines (PDF)</li>
                                    <li><i className="fas fa-check-circle"></i> 5 Days Delivery</li>
                                </ul>
                                 <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                             </div>
                         </div>
                         {/* Platinum */}
                         <div className="pricing-card-3d fade-in">
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Platinum</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-gem"></i></div></div>
                                 <div className="pricing-amount"><span className="currency">$</span><span className="amount">350</span></div>
                                 <p className="pricing-subtitle">Premium Brand Identity</p>
                                 <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 8 Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Complete Color System</li>
                                    <li><i className="fas fa-check-circle"></i> Full Typography System</li>
                                    <li><i className="fas fa-check-circle"></i> Stationery Package</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit (10+ templates)</li>
                                    <li><i className="fas fa-check-circle"></i> Presentation Template</li>
                                    <li><i className="fas fa-check-circle"></i> Comprehensive Brand Guidelines</li>
                                    <li><i className="fas fa-check-circle"></i> Brand Mockups (15+)</li>
                                    <li><i className="fas fa-check-circle"></i> 4 Days Delivery</li>
                                </ul>
                                 <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                             </div>
                         </div>
                         {/* Diamond */}
                         <div className="pricing-card-3d elite fade-in">
                             <div className="elite-badge"><i className="fas fa-diamond"></i><span>Elite Package</span></div>
                             <div className="card-3d-inner">
                                <div className="card-glow"></div>
                                <div className="card-shine"></div>
                                <div className="pricing-tier-badge">Diamond</div>
                                <div className="pricing-icon-wrapper"><div className="icon-circle"><i className="fas fa-diamond"></i></div></div>
                                 <div className="pricing-amount"><span className="currency">$</span><span className="amount">500</span></div>
                                 <p className="pricing-subtitle">Ultimate Brand Experience</p>
                                <ul className="pricing-features">
                                    <li><i className="fas fa-check-circle"></i> 10+ Logo Concepts</li>
                                    <li><i className="fas fa-check-circle"></i> Unlimited Revisions</li>
                                    <li><i className="fas fa-check-circle"></i> Advanced Color System + Gradients</li>
                                    <li><i className="fas fa-check-circle"></i> Complete Typography Ecosystem</li>
                                    <li><i className="fas fa-check-circle"></i> Full Stationery Suite</li>
                                    <li><i className="fas fa-check-circle"></i> Social Media Kit + Animated</li>
                                    <li><i className="fas fa-check-circle"></i> Website Design Mockup</li>
                                    <li><i className="fas fa-check-circle"></i> Packaging Design Concept</li>
                                    <li><i className="fas fa-check-circle"></i> Premium Brand Guidelines Book</li>
                                    <li><i className="fas fa-check-circle"></i> Brand Mockups (25+)</li>
                                    <li><i className="fas fa-check-circle"></i> 3 Days Express Delivery</li>
                                    <li><i className="fas fa-check-circle"></i> Dedicated Brand Consultant</li>
                                </ul>
                                 <a href="/#contact" className="pricing-btn"><span>Get Started</span><i className="fas fa-arrow-right"></i></a>
                             </div>
                         </div>
                    </div>
                  </div>
             </section>

             <section className="pricing-cta">
                <div className="cta-bg-orbs">
                    <div className="cta-orb cta-orb-1"></div>
                    <div className="cta-orb cta-orb-2"></div>
                </div>
                <div className="container">
                    <div className="cta-content fade-in">
                        <h2>Ready to Build Your <span className="gradient-text">Brand?</span></h2>
                        <p>Let's create something exceptional together. Contact us to discuss your project.</p>
                        <a href="/#contact" className="cta-btn">
                            <span>Start Your Project</span>
                            <i className="fas fa-rocket"></i>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
