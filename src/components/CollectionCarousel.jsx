
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const CollectionCarousel = ({ collection }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const nextSlide = () => {
        const maxIndex = collection.items.length - 1;
        if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
        else setCurrentIndex(0);
    };

    const prevSlide = () => {
        const maxIndex = collection.items.length - 1;
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
        else setCurrentIndex(maxIndex);
    };

    const getBackgroundStyle = (item) => {
        if (item.image) {
            return {
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        }
        return {
            backgroundImage: `url(${collection.backgroundImage || '/images/bangles_grid.jpg'})`,
            backgroundSize: collection.backgroundSize || '200% 200%',
            backgroundPosition: item.bgPos || '0% 0%',
        };
    };

    return (
        <section id={collection.id} className="section-alt">
            <div className="container">
                <h2 className="section-title center-text">{collection.title}</h2>
                <div className="gold-divider center-divider"></div>

                <div className="carousel-container">
                    <button className="carousel-btn prev-btn" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
                    <div className="carousel-track-container">
                        <ul className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {collection.items.map((item) => (
                                <li className="carousel-slide" key={item.id} style={{ minWidth: '100%' }}>
                                    <div
                                        className="bangle-card"
                                        style={{ maxWidth: '300px', margin: '0 auto', cursor: 'pointer' }}
                                        onClick={() => setSelectedProduct(item)}
                                    >
                                        <div style={{
                                            width: '260px',
                                            height: '280px',
                                            margin: '0 auto 20px auto',
                                            borderRadius: '20px',
                                            backgroundRepeat: 'no-repeat',
                                            border: '1px solid rgba(212, 175, 55, 0.5)',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                                            transition: 'transform 0.3s ease',
                                            ...getBackgroundStyle(item)
                                        }}></div>

                                        <h4 style={{ color: '#0F2016', fontWeight: 'bold', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>{item.name}</h4>
                                        <p style={{ marginTop: '5px', fontWeight: 'bold' }}>₹{item.price}</p>

                                        <button
                                            className="btn btn-outline"
                                            style={{ marginTop: '15px', color: 'white', borderColor: 'white', padding: '8px 25px', borderRadius: '25px', borderWidth: '2px' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(item);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="carousel-btn next-btn" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
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

export default CollectionCarousel;
