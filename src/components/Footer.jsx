import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-logo">
                    <h2>SHAGUN</h2>
                    <p>Imitation Ornament Boutique</p>
                    <div style={{ marginTop: '10px', fontSize: '1.2rem' }}>
                        <a href="https://instagram.com/_shagun_imitation" target="_blank" style={{ color: '#E4405F', margin: '0 10px' }}><i className="fab fa-instagram"></i></a>
                        <a href="https://wa.me/919173169076" target="_blank" style={{ color: '#25D366', margin: '0 10px' }}><i className="fab fa-whatsapp"></i></a>
                    </div>
                </div>
                <p className="copyright">&copy; 2025 SHAGUN. All rights reserved.</p>
            </div>

            <a href="https://wa.me/919173169076" className="float-whatsapp" target="_blank" rel="noreferrer">
                <i className="fab fa-whatsapp"></i>
            </a>
        </footer>
    );
};

export default Footer;
