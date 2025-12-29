import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

const bangles = [
    {
        id: 1,
        name: 'Rajwadi Bangles',
        bgPos: '0% 0%',
        price: 1499,
        material: 'Copper with Lac',
        plating: 'Antique Gold',
        stones: 'Kemp & Beads'
    },
    {
        id: 2,
        name: 'Diamond Bangles',
        bgPos: '100% 0%',
        price: 999,
        material: 'Alloy',
        plating: 'Silver / Rhodium',
        stones: 'American Diamonds'
    },
    {
        id: 3,
        name: 'Kundan Bangles',
        bgPos: '0% 100%',
        price: 1850,
        material: 'Brass',
        plating: 'Gold Plated',
        stones: 'Real Kundan Work'
    },
    {
        id: 4,
        name: 'A.D. Bangles',
        bgPos: '100% 100%',
        price: 1250,
        material: 'Brass',
        plating: 'Dual Tone',
        stones: 'Zircon'
    },
];

const Bangles = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const nextSlide = () => {
        const maxIndex = bangles.length - 1;
        if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
        else setCurrentIndex(0);
    };

    const prevSlide = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
        else setCurrentIndex(bangles.length - 1);
    };

    return (
        <section id="bangles" className="section-alt">
            <div className="container">
                <h2 className="section-title center-text">Royal Bangles</h2>
                <div className="gold-divider center-divider"></div>

                <div className="carousel-container">
                    <button className="carousel-btn prev-btn" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
                    <div className="carousel-track-container">
                        <ul className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {bangles.map((item) => (
                                <li className="carousel-slide" key={item.id} style={{ minWidth: '100%' }}>
                                    <div
                                        className="bangle-card"
                                        style={{ maxWidth: '300px', margin: '0 auto', cursor: 'pointer' }}
                                        onClick={() => setSelectedProduct({ ...item, category: 'Bangle' })}
                                    >
                                        <div style={{
                                            width: '250px',
                                            height: '250px',
                                            margin: '0 auto 15px auto',
                                            borderRadius: '50%',
                                            backgroundImage: 'url(/images/bangles_grid.jpg)',
                                            backgroundSize: '200% 200%',
                                            backgroundPosition: item.bgPos,
                                            backgroundRepeat: 'no-repeat',
                                            border: '2px solid #D4AF37',
                                            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                                        }}></div>

                                        <h4>{item.name}</h4>
                                        <p style={{ marginTop: '5px', fontWeight: 'bold' }}>₹{item.price}</p>

                                        <button
                                            className="btn btn-outline"
                                            style={{ marginTop: '15px', color: 'white', borderColor: 'white', padding: '8px 25px', borderRadius: '25px', borderWidth: '2px' }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Avoid opening modal when clicking add directly
                                                addToCart({ ...item, category: 'Bangle' });
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

export default Bangles;
