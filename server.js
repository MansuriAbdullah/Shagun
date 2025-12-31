
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sagun_shop";

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- Schemas & Models ---

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tag: String,
    description: String,
    image: String, // Base64 or URL
    bgPos: String, // Legacy sprite support
    category: String,
    collectionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const CollectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    layout: { type: String, default: 'grid' },
    backgroundImage: String,
    backgroundSize: String
});

const Product = mongoose.model('Product', ProductSchema);
const Collection = mongoose.model('Collection', CollectionSchema);

// --- Routes ---

app.get('/api/collections', async (req, res) => {
    try {
        const collections = await Collection.find();
        res.json(collections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/collections', async (req, res) => {
    try {
        const newCollection = new Collection(req.body);
        const saved = await newCollection.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/collections/:id', async (req, res) => {
    try {
        const updated = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/collections/:id', async (req, res) => {
    try {
        await Collection.findByIdAndDelete(req.params.id);
        await Product.deleteMany({ collectionId: req.params.id });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saved = await newProduct.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
