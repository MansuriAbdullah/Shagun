
import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const { collections, addCollection, deleteCollection, updateCollection, addItem, updateItem, deleteItem } = useProducts();
    const navigate = useNavigate();

    const [selectedCollectionId, setSelectedCollectionId] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null); // null = not editing, {} = new, {id...} = editing existing

    // Check Auth
    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin');
    }

    // Helper: Image to Base64
    const handleImageUpload = (e, callback) => {
        const file = e.target.files[0];
        if (!file) return;

        // Limit size (e.g., 500KB) because localStorage has 5MB limit usually
        if (file.size > 500000) {
            alert("Image file too big! Please use an image < 500KB.");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // --- Sub-Components ---

    const CollectionForm = ({ collection }) => {
        const [data, setData] = useState({ ...collection });

        const handleSubmit = (e) => {
            e.preventDefault();
            updateCollection(data);
            alert("Collection Updated!");
        };

        return (
            <div className="collection-form">
                <div style={{ flex: 1 }}>
                    <label>Collection Title</label>
                    <input
                        className="form-input"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label>Layout Type</label>
                    <select
                        className="form-input"
                        value={data.layout}
                        onChange={(e) => setData({ ...data, layout: e.target.value })}
                    >
                        <option value="grid">Grid</option>
                        <option value="carousel">Carousel</option>
                    </select>
                </div>
                <button className="btn btn-primary" onClick={handleSubmit}>Save Settings</button>
            </div>
        );
    };

    const ProductEditor = ({ collectionId, product, onClose }) => {
        const [formData, setFormData] = useState(product || {
            name: '',
            price: '',
            tag: '',
            description: '',
            image: '', // Base64 or URL
            bgPos: '0% 0%' // Legacy support
        });

        const handleSave = (e) => {
            e.preventDefault();
            if (product && product.id) {
                updateItem(collectionId, { ...product, ...formData });
            } else {
                addItem(collectionId, formData);
            }
            onClose();
        };

        return (
            <div className="modal-overlay" style={modalStyle}>
                <div className="modal-content" style={{ maxWidth: '600px', padding: '30px' }}>
                    <h3>{product?.id ? 'Edit Product' : 'Add New Product'}</h3>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>

                        <div>
                            <label>Product Image</label>
                            <input type="file" onChange={(e) => handleImageUpload(e, (val) => setFormData({ ...formData, image: val }))} />
                            <div style={{ fontSize: '0.8rem', color: '#666', margin: '5px 0' }}>OR Paste Image URL</div>
                            <input
                                placeholder="Image URL"
                                className="form-input"
                                value={formData.image || ''}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                            {formData.image && <img src={formData.image} alt="Preview" style={{ height: '80px', marginTop: '10px', objectFit: 'cover' }} />}
                        </div>

                        <div className="form-row">
                            <input
                                className="form-input" placeholder="Product Name" required
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                className="form-input" placeholder="Price (₹)" required type="number"
                                value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <input
                            className="form-input" placeholder="Tag / Short Description"
                            value={formData.tag || ''} onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        />

                        <div className="form-row">
                            <button type="submit" className="btn btn-primary">Save Product</button>
                            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const selectedCollection = collections.find(c => c.id === selectedCollectionId);

    const handleCreateCollection = () => {
        const title = prompt("Enter new collection title:");
        if (title) {
            addCollection({
                title,
                layout: 'grid',
                items: []
            });
        }
    };

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <div className="admin-sidebar">
                <h2 style={{ marginBottom: '30px', color: '#D4AF37' }}>Admin Panel</h2>
                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {collections.map(c => (
                            <li
                                key={c.id}
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                    background: selectedCollectionId === c.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    borderRadius: '5px',
                                    marginBottom: '5px'
                                }}
                                onClick={() => setSelectedCollectionId(c.id)}
                            >
                                {c.title}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleCreateCollection}
                        style={{ marginTop: '20px', width: '100%', padding: '10px', background: '#D4AF37', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        + New Collection
                    </button>
                </nav>
                <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid white', color: 'white', padding: '10px' }}>Logout</button>
            </div>

            {/* Main Content */}
            <div className="admin-content">
                {selectedCollection ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h1>Manage: {selectedCollection.title}</h1>
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure? This will delete the collection and all products.")) {
                                        deleteCollection(selectedCollection.id);
                                        setSelectedCollectionId(null);
                                    }
                                }}
                                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Delete Collection
                            </button>
                        </div>

                        <CollectionForm collection={selectedCollection} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
                            <h3>Products ({selectedCollection.items.length})</h3>
                            <button className="btn btn-primary" onClick={() => setEditingProduct({})}>+ Add Product</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {selectedCollection.items.map(item => (
                                <div key={item.id} style={{ background: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                    <div style={{
                                        height: '150px',
                                        background: '#eee',
                                        borderRadius: '5px',
                                        marginBottom: '10px',
                                        backgroundImage: item.image ? `url(${item.image})` : (selectedCollection.backgroundImage ? `url(${selectedCollection.backgroundImage})` : ''),
                                        backgroundSize: item.image ? 'cover' : (item.bgPos ? '300% 200%' : 'cover'),
                                        backgroundPosition: item.image ? 'center' : (item.bgPos || 'center')
                                    }}></div>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '5px' }}>{item.name}</h4>
                                    <p style={{ color: '#D4AF37', fontWeight: 'bold' }}>₹{item.price}</p>
                                    <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                        <button
                                            onClick={() => setEditingProduct(item)}
                                            style={{ flex: 1, padding: '5px', cursor: 'pointer', background: '#e0e0e0', border: 'none', borderRadius: '3px' }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm(`Delete ${item.name}?`)) deleteItem(selectedCollection.id, item.id);
                                            }}
                                            style={{ flex: 1, padding: '5px', cursor: 'pointer', background: '#ffdddd', color: 'red', border: 'none', borderRadius: '3px' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#999', flexDirection: 'column' }}>
                        <h2>Select a collection to manage</h2>
                        <p>Or add a new one from the sidebar</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {editingProduct && (
                <ProductEditor
                    collectionId={selectedCollectionId}
                    product={editingProduct.id ? editingProduct : null}
                    onClose={() => setEditingProduct(null)}
                />
            )}

            {/* Quick styles injector for inputs */}
            <style>{`
                .form-input {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 100%;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                }
                .modal-content {
                    background: white;
                    border-radius: 10px;
                    animation: fadeIn 0.3s;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                
                /* Responsive Layout */
                .admin-container {
                    display: flex;
                    min-height: 100vh;
                    background: #f4f4f4;
                }
                .admin-sidebar {
                    width: 250px;
                    background: #2E5A44;
                    color: white;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                }
                .admin-content {
                    flex: 1;
                    padding: 30px;
                    overflow-y: auto;
                    width: 100%;
                }
                
                .collection-form {
                    padding: 20px;
                    background: white;
                    margin-bottom: 20px;
                    border-radius: 10px;
                    display: flex;
                    gap: 20px;
                    align-items: flex-end;
                }

                .form-row {
                    display: flex;
                    gap: 10px;
                }

                @media (max-width: 768px) {
                    .admin-container {
                        flex-direction: column;
                    }
                    .admin-sidebar {
                        width: 100%;
                        padding: 15px;
                    }
                    .admin-content {
                        padding: 15px;
                    }
                    .collection-form {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 15px;
                    }
                    .form-row {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    );
};

const modalStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
};

export default AdminPanel;
