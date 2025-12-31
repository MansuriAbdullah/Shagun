
import React, { useRef, useState, useEffect } from 'react';

const Hero = () => {
    const heroRef = useRef(null);

    // Typewriter State for "Experience" (Prefix)
    const prefixFull = "Experience";
    const [prefixIndex, setPrefixIndex] = useState(0);
    const [isPrefixComplete, setIsPrefixComplete] = useState(false);

    // Typewriter State for Rotating Words (Suffix)
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false);

    // Data to cycle through - Phrases and their Colors
    const words = [
        { text: "Timeless Elegance", color: "#2E5A44" }, // Deep Green
        { text: "Modern Luxury", color: "#D4AF37" },     // Gold
        { text: "Royal Heritage", color: "#8B0000" },    // Deep Red
        { text: "Indian Tradition", color: "#191970" }   // Navy Blue
    ];

    // Blinking cursor effect
    useEffect(() => {
        const timeout2 = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(timeout2);
    }, []);

    // Prefix Typing Logic ("Experience")
    useEffect(() => {
        if (prefixIndex < prefixFull.length) {
            const timeout = setTimeout(() => {
                setPrefixIndex(prev => prev + 1);
            }, 100);
            return () => clearTimeout(timeout);
        } else {
            setIsPrefixComplete(true);
        }
    }, [prefixIndex]);

    // Rotating Words Typing Logic
    useEffect(() => {
        if (!isPrefixComplete) return;

        if (subIndex === words[index].text.length + 1 && !reverse) {
            // Finished typing word, wait then start deleting
            const timeout = setTimeout(() => {
                setReverse(true);
            }, 1500); // Stay visible for 1.5s
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            // Finished deleting, switch to next word
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, isPrefixComplete]);

    // Parallax & 3D Tilt Logic
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

                    {/* Dynamic Typewriter Heading */}
                    <h1 className="hero-title" style={{ minHeight: '160px', transition: 'color 0.5s ease' }}>
                        {/* Phase 1: Type 'Experience' */}
                        <span style={{ color: '#2E5A44' }}>
                            {prefixFull.substring(0, prefixIndex)}
                            {!isPrefixComplete && <span style={{ opacity: blink ? 1 : 0 }}>|</span>}
                        </span>

                        <br />

                        {/* Phase 2: Type Repeating Words */}
                        {isPrefixComplete && (
                            <>
                                <span style={{ color: words[index].color }}>
                                    {words[index].text.substring(0, subIndex)}
                                </span>
                                <span style={{ color: words[index].color, opacity: blink ? 1 : 0 }}>|</span>
                            </>
                        )}
                    </h1>

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
