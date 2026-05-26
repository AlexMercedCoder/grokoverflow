// scripts/generate-og-images.mjs
// Build-time OG image generation for GrokOverflow
// Scans posts/ for .md files, reads frontmatter title, generates 1200x630 PNGs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const POSTS_DIR = path.resolve('posts');
const OUTPUT_DIR = path.resolve('public/og');
const FONT_PATH = '/usr/share/fonts/truetype/lato/Lato-Bold.ttf';
const DOMAIN = 'grokoverflow.com';
const BRAND = 'GrokOverflow';
const ACCENT = '#0ea5e9';

// Read font
const fontBuffer = fs.readFileSync(FONT_PATH);

/**
 * Flatten the nested posts/ directory into an array of {slug, filePath}
 */
function collectPosts(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Recurse into subdirectories (year dirs like posts/2026/)
      posts.push(...collectPosts(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const slug = prefix ? `${prefix}/${entry.name.replace('.md', '')}` : entry.name.replace('.md', '');
      posts.push({ slug, filePath: fullPath });
    }
  }

  return posts;
}

/**
 * Build SVG via satori, then render to PNG via resvg
 */
async function generateOgImage(title) {
  // Truncate long titles
  const displayTitle = title.length > 80 ? title.slice(0, 77) + '...' : title;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0ea5e9 100%)',
          padding: '60px 80px',
          fontFamily: 'Lato',
        },
        children: [
          // Top section: Brand name
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                width: '100%',
                marginBottom: 20,
              },
              children: {
                type: 'span',
                props: {
                  style: {
                    fontSize: 28,
                    fontWeight: 700,
                    color: ACCENT,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  },
                  children: BRAND,
                },
              },
            },
          },
          // Divider line
          {
            type: 'div',
            props: {
              style: {
                width: '100%',
                height: 3,
                backgroundColor: ACCENT,
                marginBottom: 32,
                borderRadius: 2,
              },
            },
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                width: '100%',
                fontSize: 48,
                fontWeight: 700,
                color: '#f8fafc',
                lineHeight: 1.3,
                textAlign: 'left',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
              },
              children: displayTitle,
            },
          },
          // Spacer
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
              },
            },
          },
          // Bottom: domain
          {
            type: 'div',
            props: {
              style: {
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
              },
              children: {
                type: 'span',
                props: {
                  style: {
                    fontSize: 22,
                    color: '#94a3b8',
                    letterSpacing: '0.05em',
                  },
                  children: DOMAIN,
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Lato',
          data: fontBuffer,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  // Render SVG to PNG
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1200 },
    background: '#0f172a',
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

async function main() {
  console.log('🔍 Scanning posts/ for markdown files...');
  const posts = collectPosts(POSTS_DIR);
  console.log(`📄 Found ${posts.length} posts`);

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const post of posts) {
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.png`);

    // Check if already generated and source hasn't changed
    if (fs.existsSync(outputPath)) {
      const srcStat = fs.statSync(post.filePath);
      const outStat = fs.statSync(outputPath);
      if (srcStat.mtimeMs < outStat.mtimeMs) {
        skipped++;
        continue;
      }
    }

    try {
      const raw = fs.readFileSync(post.filePath, 'utf-8');
      const { data: frontmatter } = matter(raw);

      if (!frontmatter.title) {
        console.warn(`  ⚠️  No title in frontmatter for ${post.slug}, skipping`);
        skipped++;
        continue;
      }

      // Ensure subdirectory exists for nested slugs (e.g., public/og/2026/)
      const outputDir = path.dirname(outputPath);
      fs.mkdirSync(outputDir, { recursive: true });

      const png = await generateOgImage(frontmatter.title);
      fs.writeFileSync(outputPath, png);
      console.log(`  ✅ ${post.slug} (${frontmatter.title.slice(0, 40)}${frontmatter.title.length > 40 ? '...' : ''})`);
      generated++;
    } catch (err) {
      console.error(`  ❌ ${post.slug}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n📊 Summary: ${generated} generated, ${skipped} skipped, ${errors} errors`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});