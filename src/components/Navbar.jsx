import { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { collections } = useProducts();

    return (
        <nav className="navbar">
            <div className="container nav-container">
                <div className="logo" style={{ position: 'relative', width: '200px', height: '50px' }}>
                    <img src="/images/logo.png?v=2" alt="Shagun Boutique" style={{ position: 'absolute', top: '-15px', left: '0', height: '110px', objectFit: 'contain', zIndex: 1001, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} />
                </div>
                <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <li><a href="#home" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#about" onClick={() => setIsOpen(false)}>About Us</a></li>

                    {/* Dynamic Categories */}
                    {collections && collections.map(collection => (
                        <li key={collection.id}>
                            <a href={`#${collection.id}`} onClick={() => setIsOpen(false)}>
                                {collection.title}
                            </a>
                        </li>
                    ))}

                    <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                    {/* Admin Link for easy access */}
                    <li><a href="/admin" onClick={() => setIsOpen(false)} style={{ color: 'gold' }}>Admin</a></li>
                </ul>
                <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
