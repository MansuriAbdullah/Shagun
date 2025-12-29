import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container contact-wrapper">
                <div className="contact-info">
                    <h2 className="section-title">Visit Our Boutique</h2>
                    <div className="gold-divider"></div>

                    <div className="info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <div>
                            <h4>Address</h4>
                            <p>Bawa Latif Ni Gali, Near Three Gate,<br />Ahmedabad – 01</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <i className="fas fa-phone-alt"></i>
                        <div>
                            <h4>Phone</h4>
                            <p>+91 91731 69076</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <i className="fas fa-envelope"></i>
                        <div>
                            <h4>Email</h4>
                            <p>contact@shagunboutique.com</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <i className="fab fa-instagram"></i>
                        <div>
                            <h4>Instagram</h4>
                            <p>_shagun_imitation</p>
                        </div>
                    </div>

                    <div className="cta-buttons">
                        <a href="https://wa.me/919173169076" className="btn btn-whatsapp"><i className="fab fa-whatsapp"></i> Chat on WhatsApp</a>
                        <a href="https://instagram.com/_shagun_imitation" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ borderColor: '#E1306C', color: '#E1306C' }}><i className="fab fa-instagram"></i> Follow on Insta</a>
                        <a href="tel:+919173169076" className="btn btn-call"><i className="fas fa-phone"></i> Call Now</a>
                    </div>
                </div>

                <div className="map-container">
                    <div className="map-frame">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.942686867354!2d72.585!3d23.021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f5f5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sThree%20Darwaza%2C%20Ahmedabad!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
