import React, { useRef } from 'react';

const Hero = () => {
    const heroRef = useRef(null);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
        const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1

        if (heroRef.current) {
            // Move text slightly for parallax
            const text = heroRef.current.querySelector('.hero-text');
            if (text) text.style.transform = `translate(${x * 20}px, ${y * 20}px)`;

            // 3D Tilt Image
            const img = heroRef.current.querySelector('.hero-3d-img');
            if (img) {
                img.style.transform = `
                    perspective(1000px)
                    rotateY(${x * 15}deg)
                    rotateX(${-y * 15}deg)
                    scale(1.05)
                `;
            }
        }
    };

    const handleMouseLeave = () => {
        if (heroRef.current) {
            const img = heroRef.current.querySelector('.hero-3d-img');
            if (img) img.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';

            const text = heroRef.current.querySelector('.hero-text');
            if (text) text.style.transform = 'translate(0, 0)';
        }
    };

    return (
        <section id="home" className="hero" ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="gold-particles"></div>

            <div className="container hero-content">
                <div className="hero-text fade-in visible" style={{ transition: 'transform 0.2s ease-out' }}>
                    <p className="hero-welcome">Welcome to Shagun</p>
                    <h1 className="hero-title">Timeless Elegance & <br />Modern Luxury</h1>
                    <p className="hero-subtitle">Discover our exclusive collection of high-quality imitation ornaments, crafted for the modern queen.</p>
                    <div className="hero-buttons">
                        <a href="#necklaces" className="btn btn-primary">Shop Collection</a>
                        <a href="#contact" className="btn btn-outline">Visit Boutique</a>
                    </div>
                </div>

                <div className="hero-visual fade-in visible" style={{ perspective: '1000px' }}>
                    <div className="hero-3d-wrapper" style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '500px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {/* Glow Effect behind */}
                        <div style={{
                            position: 'absolute',
                            width: '80%',
                            height: '80%',
                            background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, rgba(0,0,0,0) 70%)',
                            filter: 'blur(40px)',
                            zIndex: 1
                        }}></div>

                        <img
                            src="/images/hero_model_final.jpg"
                            alt="Luxury Jewellery Model"
                            className="hero-3d-img"
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                                transition: 'transform 0.1s ease-out',
                                zIndex: 2,
                                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.4))',
                                borderRadius: '20px'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
