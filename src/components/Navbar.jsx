import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="logo" style={{ position: 'relative', width: '200px', height: '50px' }}>
                    <img src="/images/logo.png?v=2" alt="Shagun Boutique" style={{ position: 'absolute', top: '-15px', left: '0', height: '110px', objectFit: 'contain', zIndex: 1001, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />
                </div>
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)}>About Us</a></li>
                    <li><a href="#necklaces" onClick={() => setIsOpen(false)}>Necklaces</a></li>
                    <li><a href="#bangles" onClick={() => setIsOpen(false)}>Bangles</a></li>
                    <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                </ul>
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
