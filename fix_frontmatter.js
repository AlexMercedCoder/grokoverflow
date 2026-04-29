const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, 'posts', '2026');

function processFiles() {
  const files = fs.readdirSync(postsDir);
  let updatedCount = 0;

  files.forEach(file => {
    if (file.startsWith('apache-iceberg-masterclass-') || file.startsWith('query-engine-optimization-')) {
      const fullPath = path.join(postsDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const parsed = matter(content);
      
      // If it doesn't have a title, we need to extract it
      if (!parsed.data.title) {
        // Extract title from first h1
        const titleMatch = parsed.content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
          const title = titleMatch[1];
          parsed.data.title = title;
          parsed.data.author = 'Alex Merced';
          parsed.data.category = 'Data Engineering';
          parsed.data.tags = ['Data Engineering', 'Architecture'];
          
          // Remove the H1 from the markdown content so it's not duplicated
          parsed.content = parsed.content.replace(/^#\s+(.+)$/m, '');
          
          // stringify back
          const newContent = matter.stringify(parsed.content, parsed.data);
          fs.writeFileSync(fullPath, newContent);
          console.log(`Updated frontmatter for \${file}`);
          updatedCount++;
        }
      }
    }
  });
  
  console.log(`Finished processing. Updated \${updatedCount} files.`);
}

processFiles();
