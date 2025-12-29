import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product, quantity = 1) => {
        setCart(prev => {
            // Check if exists
            const existing = prev.find(item => item.id === product.id && item.category === product.category);
            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && item.category === product.category)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        setIsCartOpen(true); // Auto open cart to show feedback
    };

    const removeFromCart = (productId, category) => {
        setCart(prev => prev.filter(item => !(item.id === productId && item.category === category)));
    };

    const updateQuantity = (productId, category, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId && item.category === category) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const clearCart = () => setCart([]);

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart,
            isCartOpen, setIsCartOpen, toggleCart, totalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};
