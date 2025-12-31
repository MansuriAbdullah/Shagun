import fs from 'fs';
try {
    const content = fs.readFileSync('.env.new', 'utf8');
    console.log("ENV CONTENT START");
    console.log(content);
    console.log("ENV CONTENT END");
} catch (e) {
    console.error("Error reading file:", e);
}
