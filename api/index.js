import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Config
dotenv.config({ path: '.env.new' }); // Priority load new config
dotenv.config(); // Fallback

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow large images

// MongoDB Connection with Retry Logic
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sagun_shop";
const connectDB = async () => {
    try {
        console.log("🔌 Connecting to MongoDB...");
        const maskedURI = MONGO_URI.replace(/:([^:@]+)@/, ':****@');
        console.log("📝 Connection String:", maskedURI);
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ Connection Error:", err.codeName || err.code || err);
        console.log("🔄 Retrying in 5 seconds...");
        setTimeout(connectDB, 5000);
    }
};
connectDB();

// Schemas
const CollectionSchema = new mongoose.Schema({
    id: String,
    title: String,
    image: String,
    layout: String
}, { strict: false });

const ProductSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: String,
    image: String,
    collectionId: { type: String, required: true }
}, { strict: false });

const Collection = mongoose.model('Collection', CollectionSchema);
const Product = mongoose.model('Product', ProductSchema);

// API Routes

// Collections
app.get('/api/collections', async (req, res) => {
    try {
        const collections = await Collection.find();
        res.json(collections);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/collections', async (req, res) => {
    console.log("➡️ Saving Collection:", req.body.title);
    try {
        const newCol = new Collection(req.body);
        const saved = await newCol.save();
        console.log("✅ Saved:", saved._id);
        res.json(saved);
    } catch (e) {
        console.error("❌ Save Error:", e);
        res.status(400).json({ error: e.message });
    }
});

app.delete('/api/collections/:id', async (req, res) => {
    try {
        await Collection.deleteOne({ _id: req.params.id }); // Using _id from Mongo
        res.json({ message: "Deleted" });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/products', async (req, res) => {
    console.log("➡️ Saving Product:", req.body.name);
    try {
        const newProd = new Product(req.body);
        const saved = await newProd.save();
        console.log("✅ Product Saved:", saved._id);
        res.json(saved);
    } catch (e) {
        console.error("❌ Product Save Error:", e);
        res.status(400).json({ error: e.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: "Deleted" });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Export for Vercel
export default app;

// Start Server locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}
