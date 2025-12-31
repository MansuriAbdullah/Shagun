import fs from 'fs';

const readEnv = (file) => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        console.log(`--- ${file} ---`);
        console.log(content);
        console.log("----------------");
    } catch (e) {
        console.log(`Could not read ${file}`);
    }
};

readEnv('.env');
readEnv('.env.new');
