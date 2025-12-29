import React from 'react';
import { useCart } from '../context/CartContext';

const CartModal = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalItems } = useCart();

    const PHONE_NUMBER = "919173169076";

    // Calculate Total Price
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        if (cart.length === 0) return;

        let message = "👋 *Hello Shagun Boutique, I want to place an order:* \n\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. *${item.name}* \n   Qty: ${item.quantity} | Price: ₹${item.price * item.quantity}\n`;
        });
        message += `\n💰 *Total Amount: ₹${totalPrice}*\n`;
        message += "\nPlease confirm my order and share payment details. Thank you!";

        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay">
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Your Cart ({totalItems})</h3>
                    <button onClick={() => setIsCartOpen(false)} className="close-cart"><i className="fas fa-times"></i></button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <i className="fas fa-shopping-basket"></i>
                            <p>Your cart is empty.</p>
                            <button onClick={() => setIsCartOpen(false)} className="btn btn-outline" style={{ marginTop: '10px' }}>Start Shopping</button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.id}-${item.category}`} className="cart-item">
                                {/* Thumbnail Logic */}
                                <div className="cart-thumb" style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '8px', overflow: 'hidden',
                                    flexShrink: 0, marginRight: '15px',
                                    backgroundImage: item.img ? `url(${item.img})` : `url(/images/${item.category === 'Bangle' ? 'bangles' : 'necklace'}_grid.jpg)`,
                                    backgroundSize: item.img ? 'cover' : (item.category === 'Bangle' ? '200% 200%' : '300% 200%'),
                                    backgroundPosition: item.bgPos || 'center'
                                }}></div>

                                <div className="cart-item-info" style={{ flex: 1 }}>
                                    <h4>{item.name}</h4>
                                    <p className="cart-cat">₹{item.price} x {item.quantity}</p>
                                </div>
                                <div className="cart-controls">
                                    <button onClick={() => updateQuantity(item.id, item.category, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.category, 1)}>+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.id, item.category)} className="remove-item">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        <button onClick={handleCheckout} className="btn btn-whatsapp-full">
                            <i className="fab fa-whatsapp"></i> Buy on WhatsApp
                        </button>
                    </div>
                )}
            </div>
            {/* Backdrop */}
            <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}></div>
        </div>
    );
};

export default CartModal;
