import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    // Reset quantity when modal opens
    useEffect(() => {
        if (isOpen) setQuantity(1);
    }, [isOpen, product]);

    if (!isOpen || !product) return null;

    const PHONE_NUMBER = "919173169076";
    const buyMessage = `👋 Hello, I want to purchase:\n\n*${product.name}*\nPrice: ₹${product.price}\n\nPlease verify availability.`;
    const whatsappLink = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(buyMessage)}`;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content fade-in visible" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>

                <div className="modal-body">
                    <div className="modal-image-wrapper">
                        {/* Handle both grid sprite logic and standard images if mixed */}
                        <div
                            className="modal-image"
                            style={product.img ? {
                                backgroundImage: `url(${product.img})`,
                                backgroundSize: 'cover'
                            } : {
                                backgroundImage: `url(/images/${product.category === 'Bangle' ? 'bangles' : 'necklace'}_grid.jpg)`,
                                backgroundSize: product.category === 'Bangle' ? '200% 200%' : '300% 200%',
                                backgroundPosition: product.bgPos
                            }}
                        ></div>
                    </div>

                    <div className="modal-details">
                        <span className="modal-category">{product.category}</span>
                        <h2>{product.name}</h2>
                        <h3 className="modal-price">₹{product.price} <span className="modal-discount">₹{product.price + 1000}</span></h3>

                        <div className="modal-quality" style={{ color: '#333' }}>
                            <h4 style={{ color: '#1a1a1a' }}>Quality & Details:</h4>
                            <ul style={{ color: '#333' }}>
                                <li><strong>Material:</strong> {product.material || "Premium Brass Alloy"}</li>
                                <li><strong>Plating:</strong> {product.plating || "Micro Gold / Matte Finish"}</li>
                                <li><strong>Stones:</strong> {product.stones || "High Quality AD / Kundan"}</li>
                                <li><strong>Warranty:</strong> 6 Months Polish Warranty</li>
                            </ul>
                        </div>

                        <div className="quantity-selector" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label style={{ fontWeight: 'bold', color: '#333' }}>Quantity:</label>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px' }}>
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    style={{ padding: '5px 15px', background: '#f0f0f0', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#333' }}
                                >-</button>
                                <span style={{ padding: '5px 15px', minWidth: '40px', textAlign: 'center', fontWeight: 'bold', color: '#333' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    style={{ padding: '5px 15px', background: '#f0f0f0', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#333' }}
                                >+</button>
                            </div>
                        </div>

                        <div className="modal-actions" style={{ display: 'flex', gap: '15px' }}>
                            <button
                                className="btn btn-outline"
                                onClick={() => { onAddToCart(product, quantity); onClose(); }}
                                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '15px', marginTop: 0 }}
                            >
                                <i className="fas fa-shopping-bag"></i> Add to Cart
                            </button>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-whatsapp-full"
                                style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '15px', marginTop: 0 }}
                            >
                                <i className="fab fa-whatsapp"></i> Buy Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
