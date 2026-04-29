const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'posts/2026');

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDir(fullPath);
        } else if (item.endsWith('.md')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let hasChanged = false;
            
            if (content.includes('<!--')) {
                // Convert HTML comments to MDX comments
                content = content.replace(/<!--(.*?)-->/gs, '{/*$1*/}');
                hasChanged = true;
            }
            
            if (hasChanged) {
                fs.writeFileSync(fullPath, content);
                console.log("Converted HTML comments in " + fullPath);
            }
        }
    }
}

processDir(targetDir);
