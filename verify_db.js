import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load the same config as server
dotenv.config({ path: '.env.new' });

const uri = process.env.MONGO_URI;
console.log("🔍 Inspecting Database:", uri);

async function checkData() {
    try {
        await mongoose.connect(uri);
        console.log("✅ Connection Successful!");

        const db = mongoose.connection.db;

        // List Collections
        const collections = await db.listCollections().toArray();
        console.log("📂 Collections Found:", collections.map(c => c.name));

        // Check 'collections' data
        if (collections.find(c => c.name === 'collections')) {
            const data = await db.collection('collections').find({}).toArray();
            console.log(`📄 Found ${data.length} items in 'collections':`);
            data.forEach(d => console.log(` - ${d.title} (ID: ${d._id})`));
        } else {
            console.log("⚠️ 'collections' table does not exist.");
        }

    } catch (err) {
        console.error("❌ Connection Failed:", err);
    } finally {
        await mongoose.disconnect();
        console.log("👋 Done.");
    }
}

checkData();
