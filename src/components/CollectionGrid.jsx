
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const CollectionGrid = ({ collection }) => {
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getBackgroundStyle = (product) => {
        if (product.image) {
            return {
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px',
                width: '100%'
            };
        }
        // Fallback for sprite-based legacy items
        return {
            backgroundImage: `url(${collection.backgroundImage || '/images/necklace_grid.jpg'})`,
            backgroundSize: '300% 200%',
            backgroundPosition: product.bgPos || '0% 0%',
            backgroundRepeat: 'no-repeat',
            height: '300px',
            width: '100%'
        };
    };

    return (
        <section id={collection.id} className="products-section">
            <div className="container">
                <h2 className="section-title center-text">{collection.title}</h2>
                <div className="gold-divider center-divider"></div>

                <div className="product-grid">
                    {collection.items.map(product => (
                        <div
                            key={product.id}
                            className="product-card fade-in visible"
                            onClick={() => setSelectedProduct(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="card-image" style={getBackgroundStyle(product)}>
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
                                        addToCart(product);
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

export default CollectionGrid;
