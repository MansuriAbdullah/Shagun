import React from 'react';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
    const { toggleCart, totalItems } = useCart();

    return (
        <div className="cart-icon-wrapper" onClick={toggleCart}>
            <i className="fas fa-shopping-bag"></i>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </div>
    );
};

export default CartIcon;
