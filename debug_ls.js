const fs = require('fs');
const path = require('path');

const STAGING_DIR = path.join(__dirname, 'staging');

function recursiveList(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`Directory does not exist: ${dir}`);
        return;
    }
    
    console.log(`Reading: ${dir}`);
    const items = fs.readdirSync(dir);
    if (items.length === 0) {
        console.log(`[EMPTY] ${dir}`);
    }
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            recursiveList(fullPath);
        } else {
            console.log(`[FILE] ${fullPath}`);
        }
    });
}

console.log('--- START DEBUG LISTING ---');
recursiveList(STAGING_DIR);
console.log('--- END DEBUG LISTING ---');
