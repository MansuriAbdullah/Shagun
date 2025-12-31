
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import CartIcon from './components/CartIcon';
import CartModal from './components/CartModal';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Login from './components/Admin/Login';
import AdminPanel from './components/Admin/AdminPanel';
import './index.css';

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide Header/Footer on Admin pages
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app">
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartIcon />}
      {!isAdmin && <CartModal />}
      {children}
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Login />} />
              <Route path="/admin/dashboard" element={<AdminPanel />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
