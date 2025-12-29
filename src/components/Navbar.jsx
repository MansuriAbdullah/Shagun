import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="logo">
                    <img src="/images/logo.png" alt="Shagun Boutique" style={{ height: '80px', objectFit: 'contain', borderRadius: '5px' }} />
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
