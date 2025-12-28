const fs = require("fs");
const matter = require("gray-matter");

const SITE_URL = "https://grokoverflow.com";
const FEED_PATH = "./public/rss.xml";

const generateRSS = () => {
  let posts = [];
  const files = fs.readdirSync("posts");

  files.forEach((fileName) => {
    // Handling nested year directories or direct files
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);
      subfiles.forEach((f) => {
        const slug = `${fileName}/${f.replace(".md", "")}`;
        const readFile = fs.readFileSync(`posts/${fileName}/${f}`, "utf-8");
        const { data: frontmatter, content } = matter(readFile);
        posts.push({ slug, frontmatter, content });
      });
      return;
    }
    
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);
    posts.push({ slug, frontmatter, content });
  });

  posts.sort((x, y) => new Date(y.frontmatter.date) - new Date(x.frontmatter.date));
  posts = posts.slice(0, 20); // Last 20 posts

  const items = posts.map((post) => `
    <item>
      <title>${post.frontmatter.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid>${SITE_URL}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.description || ""}]]></description>
    </item>`).join("");

  const rss = `<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>GrokOverflow</title>
      <link>${SITE_URL}</link>
      <description>Tutorials, podcasts, and videos for developers by Alex Merced.</description>
      <language>en</language>
      ${items}
    </channel>
  </rss>`;

  fs.writeFileSync(FEED_PATH, rss);
  console.log(`✅ RSS feed generated at ${FEED_PATH}`);
};

generateRSS();
