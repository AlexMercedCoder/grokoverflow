const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const STAGING_DIR = path.join(__dirname, 'staging');
const TARGET_POSTS_DIR = path.join(__dirname, 'posts', '2026');
const TARGET_IMAGES_DIR = path.join(__dirname, 'public', 'images');

// Ensure target directories exist
if (!fs.existsSync(TARGET_POSTS_DIR)) {
    fs.mkdirSync(TARGET_POSTS_DIR, { recursive: true });
}
if (!fs.existsSync(TARGET_IMAGES_DIR)) {
    fs.mkdirSync(TARGET_IMAGES_DIR, { recursive: true });
}

function processDirectory(directory) {
    console.log(`Scanning: ${directory}`);
    const items = fs.readdirSync(directory);

    items.forEach(item => {
        const fullPath = path.join(directory, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (path.extname(item) === '.md') {
            console.log(`Found markdown: ${item}`);
            processMarkdownFile(fullPath);
        }
    });
}

function processMarkdownFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const parentDir = path.dirname(filePath);

    // 1. Update Frontmatter Date
    data.date = '2026-02-18';

    // 2. Handle Banner Image
    if (data.bannerImage) {
         // Resolve image path relative to markdown file
         const imagePath = path.resolve(parentDir, data.bannerImage);
         if (fs.existsSync(imagePath)) {
             const imageName = path.basename(imagePath);
             const newImagePath = path.join(TARGET_IMAGES_DIR, imageName);
             
             // Copy image to public/images
             fs.copyFileSync(imagePath, newImagePath);
             
             // Update frontmatter to point to new public URL
             data.bannerImage = `/images/${imageName}`;
             console.log(`Moved banner image: ${imageName}`);
         } else {
             console.warn(`Banner image not found: ${data.bannerImage} in ${filePath}`);
         }
    }

    // 3. Process Content Images (Basic regex replacement)
    // This assumes standard markdown image syntax ![alt](path)
    let updatedContent = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, imgPath) => {
        if (imgPath.startsWith('http')) return match; // Skip external links
        
        const absoluteImgPath = path.resolve(parentDir, imgPath);
        if (fs.existsSync(absoluteImgPath)) {
            const imgName = path.basename(absoluteImgPath);
            const newImgDest = path.join(TARGET_IMAGES_DIR, imgName);
            fs.copyFileSync(absoluteImgPath, newImgDest);
            console.log(`Moved content image: ${imgName}`);
            return `![${alt}](/images/${imgName})`;
        }
        return match;
    });

    // 4. Write to New Location
    // Sanitize filename: remove date helper if present, ensure kebab-case
    let newFilename = path.basename(filePath).toLowerCase().replace(/[^a-z0-9-.]/g, '-');
    
    // Add prefix if missing to ensure uniqueness/sorting? 
    // Actually, just keep original name but cleaned up.
    
    const newFilePath = path.join(TARGET_POSTS_DIR, newFilename);
    const newFileContent = matter.stringify(updatedContent, data);

    fs.writeFileSync(newFilePath, newFileContent);
    console.log(`Processed: ${newFilename}`);
}

console.log('Starting batch processing...');
processDirectory(STAGING_DIR);
console.log('Batch processing complete.');
