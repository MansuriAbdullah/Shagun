import fs from 'fs';

try {
    let envContent = fs.readFileSync('.env', 'utf8');

    // Log what we see before replacement
    const match = envContent.match(/([^/@]+)\.fwkm71r\.mongodb\.net/);
    if (match) {
        console.log("Found existing host prefix:", match[1]);
    } else {
        console.log("Could not find .fwkm71r pattern!");
    }

    // Force replace valid standard connection string format
    // Replaces:  ... @<any-messy-prefix>.fwkm71r.mongodb.net ...
    // With:      ... @cluster0.fwkm71r.mongodb.net ...
    let fixedContent = envContent.replace(/@([a-zA-Z0-9_-]+)\.fwkm71r/g, '@cluster0.fwkm71r');

    fs.writeFileSync('.env', fixedContent);
    fs.writeFileSync('.env.new', fixedContent);

    console.log("✅ Fixed URI written to .env and .env.new");

    const newMatch = fixedContent.match(/MONGO_URI=(.*)/);
    if (newMatch) {
        console.log("📝 New URI:", newMatch[1].replace(/:([^:@]+)@/, ':****@'));
    }

} catch (e) {
    console.error("❌ Error:", e);
}
