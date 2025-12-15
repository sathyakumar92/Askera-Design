
import { useState, useEffect, useRef } from 'react';

const reviews = [
  {
    name: "James Holden",
    role: "CEO, Expanse Tech",
    location: "San Francisco, USA",
    image: "/clients/client1.png",
    rating: 5.0,
    text: "Absolutely mind-bending design. The holographic feel is exactly what our tech startup needed. ASKera delivered beyond expectations with exceptional attention to detail.",
    date: "November 2024"
  },
  {
    name: "Aarav Patel",
    role: "Founder, Mumbai Startups",
    location: "Mumbai, India",
    image: "/clients/client2.png",
    rating: 5.0,
    text: "Professionalism at its peak. The Indian payment process was smooth and GST compliant. Highly recommend for domestic projects.",
    date: "October 2024"
  },
  {
    name: "Sarah Connor",
    role: "CTO, SkyNet Solutions",
    location: "London, UK",
    image: "/clients/client3.png",
    rating: 5.0,
    text: "Fast, efficient code. The web3 integration was flawless. They understand modern tech stacks better than anyone I've worked with.",
    date: "December 2024"
  },
  {
    name: "Jean-Luc Moreau",
    role: "Director, Paris Design Co.",
    location: "Paris, France",
    image: "/clients/client4.png",
    rating: 5.0,
    text: "They handled our international transfer perfectly using Wise. Communication was excellent throughout the entire project.",
    date: "September 2024"
  },
  {
    name: "Naomi Nakamura",
    role: "Creative Director, Tokyo",
    location: "Tokyo, Japan",
    image: "/clients/client5.jpg",
    rating: 5.0,
    text: "A visual masterpiece. Highly recommended for premium brands who want to stand out in the digital space with sophisticated design solutions.",
    date: "August 2024"
  },
  {
    name: "Michael Chen",
    role: "CEO, Digital Ventures",
    location: "Singapore",
    image: "/clients/client6.jpg",
    rating: 5.0,
    text: "Working with ASKera was a game-changer for our business. Their strategic approach to design combined with technical excellence resulted in a 300% increase in user engagement.",
    date: "July 2024"
  }
];

export default function ReviewCarousel() {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);

  const totalSlides = reviews.length;
  const rotationStep = 60; // 360 / 6

  const rotateCarousel = (direction) => {
    if (direction === 'next') {
      setCurrentRotation(prev => prev - rotationStep);
      setCurrentSlideIndex(prev => (prev + 1) % totalSlides);
    } else {
      setCurrentRotation(prev => prev + rotationStep);
      setCurrentSlideIndex(prev => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const goToSlide = (index) => {
    const diff = index - currentSlideIndex;
    setCurrentRotation(prev => prev - (diff * rotationStep));
    setCurrentSlideIndex(index);
  };

  useEffect(() => {
    if (autoplay && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        rotateCarousel('next');
      }, 5000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [autoplay, isHovered, currentSlideIndex]);

  return (
    <section className="section reviews-section">
        <div className="container">
            <div className="section-header fade-in">
                <span className="section-label">Testimonials</span>
                <h2 className="section-title">Client <span className="highlight">Voices</span></h2>
                <p className="section-desc">Real feedback from real clients across the globe. Excellence recognized worldwide.</p>
            </div>
            
            <div className="carousel-wrapper">
                <div className="carousel-container">
                    <div 
                        className={`carousel-3d ${!autoplay || isHovered ? 'paused' : ''}`} 
                        id="reviewCarousel"
                        style={{ transform: `rotateY(${currentRotation}deg)` }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {reviews.map((review, index) => (
                            <div className="review-card-3d" data-index={index} key={index}>
                                <div className="card-shine"></div>
                                <div className="review-header">
                                    <div className="client-avatar">
                                        <img src={review.image} alt={review.name} />
                                        <div className="avatar-glow"></div>
                                    </div>
                                    <div className="client-info">
                                        <h4>{review.name}</h4>
                                        <p>{review.role}</p>
                                        <span className="client-location"><i className="fas fa-map-marker-alt"></i> {review.location}</span>
                                    </div>
                                </div>
                                <div className="rating-stars">
                                    {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                                    <span className="rating-number">{review.rating}</span>
                                </div>
                                <p className="review-text">"{review.text}"</p>
                                <div className="review-footer">
                                    <div className="verified-badge">
                                        <i className="fas fa-check-circle"></i> Verified Client
                                    </div>
                                    <div className="review-date">
                                        <i className="fas fa-calendar"></i> {review.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="carousel-controls fade-in">
                    <button className="carousel-btn carousel-btn-prev" onClick={() => rotateCarousel('prev')} aria-label="Previous review">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    
                    <div className="carousel-indicators" id="carouselIndicators">
                        {reviews.map((_, index) => (
                            <span 
                                key={index} 
                                className={`indicator ${currentSlideIndex === index ? 'active' : ''}`} 
                                onClick={() => goToSlide(index)}
                            ></span>
                        ))}
                    </div>
                    
                    <button className="carousel-btn carousel-btn-next" onClick={() => rotateCarousel('next')} aria-label="Next review">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div className="carousel-autoplay-toggle">
                    <button className={`autoplay-btn ${!autoplay ? 'paused' : ''}`} onClick={() => setAutoplay(!autoplay)}>
                        <i className={`fas fa-${autoplay ? 'pause' : 'play'}`}></i>
                        <span>Autoplay {autoplay ? 'On' : 'Off'}</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
}
