const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, 'posts', '2026');

function updateDates() {
  const files = fs.readdirSync(postsDir);
  let updatedCount = 0;

  files.forEach(file => {
    if (file.startsWith('apache-iceberg-masterclass-') || file.startsWith('query-engine-optimization-')) {
      const fullPath = path.join(postsDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const parsed = matter(content);
      
      if (parsed.data.date === '2026-02-18') {
        parsed.data.date = '2026-04-29';
        
        const newContent = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(fullPath, newContent);
        console.log(`Updated date for ${file}`);
        updatedCount++;
      }
    }
  });
  
  console.log(`Finished processing. Updated ${updatedCount} files.`);
}

updateDates();
