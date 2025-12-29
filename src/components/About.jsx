import React, { useEffect, useRef } from 'react';

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about-section" ref={sectionRef}>
            <div className="container about-wrapper">
                <div className="about-image fade-in">
                    <img
                        src="/images/owner.jpg"
                        alt="Safvan Shaikh"
                        onError={(e) => e.target.src = 'https://placehold.co/400x500/D4AF37/FFFFFF?text=Safvan+Shaikh'}
                    />
                    <div className="img-frame"></div>
                </div>
                <div className="about-text fade-in">
                    <h3 className="section-subtitle">Since 2005</h3>
                    <h2 className="section-title">A Legacy of Beauty</h2>
                    <div className="gold-divider"></div>
                    <p>Welcome to <strong>SHAGUN</strong>, where tradition meets affordable luxury. Founded by <strong>Safvan Shaikh</strong>, we carry over 20 years of experience in crafting the finest imitation ornaments.</p>
                    <p style={{ marginTop: '20px' }}>Located in the heart of Ahmedabad, our boutique specializes in bridal collections, Rajwadi heritage pieces, and contemporary diamond-finish jewellery. Our dedicated team of 5 professionals ensures every piece tells a story of elegance.</p>
                    <ul className="feature-list">
                        <li><i className="fas fa-gem"></i> Premium Quality Craftsmanship</li>
                        <li><i className="fas fa-crown"></i> Bridal Specialization</li>
                        <li><i className="fas fa-heart"></i> Trusted by Thousands</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
