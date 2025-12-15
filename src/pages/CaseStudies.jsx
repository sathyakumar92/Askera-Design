
import { useState, useEffect } from 'react';

const projects = [
    {
        id: 1,
        title: "Aurora Stream",
        category: "Branding",
        image: "/case studies/logo1.jpg",
        brief: "Premium identity for a next-gen streaming platform.",
        desc: "Aurora Stream needed a brand that felt limitless. We designed a sleek, golden-gradient identity with dynamic motion elements to represent the continuous flow of entertainment.",
        features: ["Brand Identity", "Motion Assets", "Digital Marketing"]
    },
    {
        id: 2,
        title: "Urban Vogue Store",
        category: "Web Design",
        image: "/case studies/web 2.jpg",
        brief: "High-conversion e-commerce design for streetwear.",
        desc: "A dark-themed, immersive shopping experience designed to highlight premium urban fashion. We focused on high-impact imagery and a seamless path to purchase.",
        features: ["UI/UX Design", "Shopify Theme", "Responsive Layout"]
    },
    {
        id: 3,
        title: "Nex News",
        category: "Logo Design",
        image: "/case studies/logo2.jpg",
        brief: "Bold and dynamic visual identity for a media network.",
        desc: "Nex News required a logo that communicated speed, accuracy, and modernity. We utilized negative space and sharp angles to create a distinct and memorable mark.",
        features: ["Logo Design", "Broadcast Overlay", "Brand Guide"]
    },
    {
        id: 4,
        title: "Element Magazine",
        category: "UI/UX",
        image: "/case studies/web 3.jpg",
        brief: "Clean editorial layout for a lifestyle publication.",
        desc: "We created a digital magazine layout that prioritizes readability and visual storytelling. The complex grid system allows for flexible content presentation while maintaining harmony.",
        features: ["Web Layout", "Typography System", "Content Strategy"]
    },
    {
        id: 5,
        title: "Mobile Hub",
        category: "Identity",
        image: "/case studies/logo3.jpg",
        brief: "Tech-focused branding for a mobile retailer.",
        desc: "Mobile Hub needed a brand that felt connected and modern. We integrated digital connection motifs into the typography to clearly signal their tech niche to customers.",
        features: ["Brand Identity", "Store Signage", "Merch Design"]
    },
    {
        id: 6,
        title: "Fresh Market App",
        category: "Web Design",
        image: "/case studies/web 4.png",
        brief: "Fresh and intuitive UI for online grocery delivery.",
        desc: "Focusing on freshness and ease of use, this app design uses vibrant photography and intuitive navigation to make grocery shopping a breeze for users of all ages.",
        features: ["App UI Design", "User Research", "Interaction Design"]
    },
    {
        id: 7,
        title: "Veridian",
        category: "Branding",
        image: "/case studies/logo4.jpg",
        brief: "Luxury corporate identity with a golden touch.",
        desc: "Veridian stands for Evolve, Connect, Succeed. We designed a premium typographic logo with custom serif lettering to exude elegance, stability, and authority.",
        features: ["Logo Design", "Stationery Suite", "Corporate Identity"]
    },
    {
        id: 8,
        title: "Social Style App",
        category: "UI/UX",
        image: "/case studies/web 5.jpg",
        brief: "Influencer platform interface for fashion trends.",
        desc: "A mobile platform design focused on visual feeds and quick interactions. The clean UI ensures the user content remains the star of the show.",
        features: ["Mobile UI", "App Prototyping", "Design System"]
    }
];

export default function CaseStudies() {
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
         const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });
        document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const openModal = (project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="case-studies-page">
            <section className="modern-hero">
                <div className="hero-glow"></div>
                <div className="hero-grid-bg"></div>
                <div className="container">
                    <div className="hero-content-wrapper">
                        <div className="hero-badge-pill fade-in-up">
                            <span className="badge-dot"></span> Portfolio 2024-25
                        </div>
                        <h1 className="hero-headline fade-in-up delay-1" style={{transitionDelay: '0.1s'}}>
                            Is Your Brand <br />
                            <span className="text-gradient">Designed</span> To Win?
                        </h1>
                        <p className="hero-subtext fade-in-up delay-2" style={{transitionDelay: '0.2s'}}>
                            We don't just design logos; we engineer brand systems that dominate markets. 
                            Explore our curated collection of digital masterpieces.
                        </p>
                    </div>
                </div>
                
                <div className="hero-abstract-shape">
                    <div className="shape-inner"></div>
                </div>
            </section>

            <section className="portfolio-section">
                <div className="container">
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <div className="project-card fade-in" key={index} data-project-id={project.id} onClick={() => openModal(project)}>
                                <div className="project-image">
                                    <img src={project.image} alt={project.title} />
                                    <div className="project-overlay">
                                        <span className="view-btn"><i className="fas fa-expand-alt"></i> View Case Study</span>
                                    </div>
                                </div>
                                <div className="project-content">
                                    <div className="cat-tag">{project.category}</div>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-brief">{project.brief}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedProject && (
                <div className="project-modal active" id="projectModal" onClick={closeModal} style={{display: 'flex', opacity: 1}}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeModal}>&times;</button>
                        <div className="modal-body">
                            <div className="modal-image-container">
                                <img id="modalImg" src={selectedProject.image} alt={selectedProject.title} />
                            </div>
                            <div className="modal-text-container">
                                <div className="modal-badges">
                                    <span id="modalCat" className="modal-cat-tag">{selectedProject.category}</span>
                                </div>
                                <h2 id="modalTitle">{selectedProject.title}</h2>
                                <p id="modalDesc">{selectedProject.desc}</p>
                                
                                <div className="modal-features-list">
                                    <h4>Services Delivered:</h4>
                                    <ul id="modalFeatures">
                                        {selectedProject.features.map((f, i) => <li key={i}>{f}</li>)}
                                    </ul>
                                </div>
                                
                                <a href="/#contact" className="btn btn-primary modal-cta" onClick={closeModal}>Start a Project Like This</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
