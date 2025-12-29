import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Bangles from './components/Bangles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartIcon from './components/CartIcon';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Navbar />
        <CartIcon />
        <CartModal />
        <Hero />
        <About />
        <Products />
        <Bangles />
        <Contact />
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
