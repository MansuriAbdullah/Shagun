
import React, { createContext, useContext, useState, useEffect } from 'react';

// API Base URL (Assumes server runs on 5000)
const API_URL = 'http://localhost:5000/api';

const ProductContext = createContext();

export const useProducts = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data
    const fetchData = async () => {
        try {
            setLoading(true);
            const [catRes, prodRes] = await Promise.all([
                fetch(`${API_URL}/collections`),
                fetch(`${API_URL}/products`)
            ]);

            if (catRes.ok && prodRes.ok) {
                const cats = await catRes.json();
                const prods = await prodRes.json();
                setCategories(cats);
                setProducts(prods);
            } else {
                console.error("Failed to fetch data from server");
            }
        } catch (e) {
            console.error("API Error:", e);
            // Fallback for preview if server is offline?
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Combine for View
    const collections = categories.map(cat => ({
        ...cat,
        id: cat._id || cat.id,
        items: products.filter(p => p.collectionId === (cat._id || cat.id)).map(p => ({ ...p, id: p._id }))
    }));

    // --- Actions ---

    const addCollection = async (newCol) => {
        try {
            const { items, ...colData } = newCol;
            const res = await fetch(`${API_URL}/collections`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(colData)
            });
            if (res.ok) fetchData();
        } catch (e) { console.error(e); }
    };

    const updateCollection = async (updatedCol) => {
        try {
            const { items, id, _id, ...colData } = updatedCol;
            const targetId = _id || id;
            await fetch(`${API_URL}/collections/${targetId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(colData)
            });
            fetchData();
        } catch (e) { console.error(e); }
    };

    const deleteCollection = async (id) => {
        try {
            await fetch(`${API_URL}/collections/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (e) { console.error(e); }
    };

    const addItem = async (collectionId, item) => {
        try {
            await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...item, collectionId })
            });
            fetchData();
        } catch (e) { console.error(e); }
    };

    const updateItem = async (collectionId, updatedItem) => {
        try {
            const { id, _id, ...data } = updatedItem;
            const targetId = _id || id;
            await fetch(`${API_URL}/products/${targetId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            fetchData();
        } catch (e) { console.error(e); }
    };

    const deleteItem = async (collectionId, itemId) => {
        try {
            await fetch(`${API_URL}/products/${itemId}`, { method: 'DELETE' });
            fetchData();
        } catch (e) { console.error(e); }
    };

    return (
        <ProductContext.Provider value={{
            collections,
            loading,
            addCollection,
            deleteCollection,
            updateCollection,
            addItem,
            updateItem,
            deleteItem
        }}>
            {children}
        </ProductContext.Provider>
    );
};
