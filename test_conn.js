import mongoose from 'mongoose';
import fs from 'fs';

// Try to read Cloud URI from .env (the hidden one)
let cloudUri = '';
try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const match = envContent.match(/MONGO_URI=(.*)/);
    if (match) cloudUri = match[1].trim();
} catch (e) { }

// Heuristic correction
const correctedCloudUri = cloudUri.replace('agunr0', 'cluster0');

const localUri = "mongodb://localhost:27017/sagun_shop";

async function testConnection(name, uri) {
    if (!uri) {
        console.log(`❌ Skipped ${name} (No URI found)`);
        return false;
    }
    console.log(`🔌 Testing ${name}: ${uri.replace(/:([^:@]+)@/, ':****@')} ...`);
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`✅ ${name} Connected Successfully!`);
        await mongoose.disconnect();
        return true;
    } catch (e) {
        console.log(`❌ ${name} Failed: ${e.codeName || e.code || e.message}`);
        return false;
    }
}

async function run() {
    console.log("--- Connectivity Test ---");
    const localWorks = await testConnection("Localhost", localUri);
    const cloudWorks = await testConnection("Cloud (Corrected)", correctedCloudUri);
    const originalCloudWorks = await testConnection("Cloud (Original)", cloudUri);
    console.log("-------------------------");
}

run();
