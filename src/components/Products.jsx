import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const products = [
    {
        id: 1,
        name: 'A.D. Set',
        tag: 'American Diamond Excellence',
        bgPos: '0% 0%',
        price: 2499,
        material: 'High-Grade Brass',
        plating: 'Silver Rhodum Polish',
        stones: 'AAA+ American Diamonds'
    },
    {
        id: 2,
        name: 'Rajwadi Set',
        tag: 'Royal Rajasthani Heritage',
        bgPos: '50% 0%',
        price: 3999,
        material: 'Copper Alloy',
        plating: 'Antique Gold (Matte)',
        stones: 'Kemp Stones & Pearls'
    },
    {
        id: 3,
        name: 'Polki Set',
        tag: 'Uncut Diamond Look',
        bgPos: '100% 0%',
        price: 4500,
        material: 'Silver Alloy Base',
        plating: 'Jadau Gold Finish',
        stones: 'Semi-Precious Polki'
    },
    {
        id: 4,
        name: 'Kundan Set',
        tag: 'Traditional Glass Stone Work',
        bgPos: '0% 100%',
        price: 1899,
        material: 'Brass',
        plating: '22k Gold Plated',
        stones: 'Glass Kundan & Meenakari'
    },
    {
        id: 5,
        name: 'Diamond Finish',
        tag: 'Premium Zircon Stones',
        bgPos: '50% 100%',
        price: 1299,
        material: 'Stainless Steel Base',
        plating: 'Silver Finish',
        stones: 'Zircon Crystals'
    },
    {
        id: 6,
        name: '1 Gram Gold',
        tag: 'Real Gold Look-alike',
        bgPos: '100% 100%',
        price: 2199,
        material: 'Copper',
        plating: '1 Gram Gold Forming',
        stones: 'Synthetic Ruby/Emerald'
    },
];

const Products = () => {
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <section id="necklaces" className="products-section">
            <div className="container">
                <h2 className="section-title center-text">Exquisite Necklaces</h2>
                <div className="gold-divider center-divider"></div>

                <div className="product-grid">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="product-card fade-in visible"
                            onClick={() => setSelectedProduct({ ...product, category: 'Necklace' })}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-image" style={{
                                backgroundImage: 'url(/images/necklace_grid.jpg)',
                                backgroundSize: '300% 200%',
                                backgroundPosition: product.bgPos,
                                backgroundRepeat: 'no-repeat',
                                height: '300px',
                                width: '100%'
                            }}>
                                <div className="card-overlay">
                                    <button
                                        className="btn-icon"
                                        title="View Details"
                                    >
                                        <i className="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-info">
                                <h3>{product.name}</h3>
                                <p>{product.tag}</p>
                                <p style={{ fontWeight: 'bold', color: '#D4AF37', marginTop: '5px' }}>₹{product.price}</p>
                                <button
                                    className="btn btn-outline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart({ ...product, category: 'Necklace' });
                                    }}
                                    style={{ marginTop: '15px', padding: '8px 20px', borderRadius: '20px', fontSize: '0.9rem' }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={(p) => addToCart(p)}
            />
        </section>
    );
};

export default Products;
