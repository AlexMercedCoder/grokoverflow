import fs from "fs";
import matter from "gray-matter";

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import rehypeHighlight from 'rehype-highlight';
import styles from "../../styles/Post.module.css"
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";





// The page for each post
export default function Post({ frontmatter, mdxSource, relatedPosts }) {
  const { title, author, category, date, bannerImage, tags } = frontmatter;

  return (
    <main className={styles.main}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`"${title}" an article written by ${author} touching on ${tags.join(", ")}`} />
        
        {/* Open Graph & Twitter */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`"${title}" an article written by ${author}`} />
        <meta property="og:image" content={bannerImage || "https://grokoverflow.com/images/banner.png"} />
        <meta name="twitter:image" content={bannerImage || "https://grokoverflow.com/images/banner.png"} />
        
        <link rel="icon" href="/favicon.ico" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "Article",
               headline: title,
               image: [bannerImage || "https://grokoverflow.com/images/banner.png"],
               datePublished: date,
               author: {
                 "@type": "Person",
                 name: author,
                 url: `https://grokoverflow.com/blog/author/${author.toLowerCase().replace(" ", "-")}`
               }
             })
          }}
        />
      </Head>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <span className={styles.label}>By</span>
              <Link href={`/blog/author/${author.toLowerCase().replace(" ", "-")}`} className={styles.authorLink}>
                {author}
              </Link>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>On</span>
              <span className={styles.date}>{date}</span>
            </div>
          </div>
          <div className={styles.tags}>
            <Link href={`/blog/category/${category}`} className={styles.categoryTag}>
              {category}
            </Link>
            {tags.map((tag) => (
              <Link href={`/blog/tag/${tag}`} key={tag} className={styles.tag}>
                #{tag}
              </Link>
            ))}
          </div>
        </header>
        <div className={`${styles.content} blog-post`}>
             <MDXRemote {...mdxSource} />
        </div>
        <hr />
        <h3>Read Next</h3>
        <div className={styles.related}>
            {relatedPosts && relatedPosts.map((post) => (
            <div key={post.slug} className={styles.relatedPost}>
                <Link href={`/posts/${post.slug}`} className={styles.relatedLink}>
                    {post.frontmatter.title}
                </Link>
            </div>
            ))}
        </div>
      </article>
    </main>
  );
}

// Generating the paths for each post
export async function getStaticPaths() {
  // Get list of all files from our posts directory
  const files = fs.readdirSync("posts");
  // Generate a path for each one
  const paths = [];

  files.forEach((fileName) => {
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);
      subfiles.forEach((f) => {
        paths.push(`/posts/${fileName}/${f.replace(".md", "")}`);
      });
      return "done";
    }

    paths.push(`/posts/${fileName.replace(".md", "")}`);
  });


  // return list of paths
  return {
    paths,
    fallback: false,
  };
}

// Generate the static props for the page
export async function getStaticProps({ params: { slug } }) {
  // Determine file path based on slug structure
  let fileName;
  let currentSlug;
  
  if (slug.length === 2) {
      fileName = fs.readFileSync(`posts/${slug[0]}/${slug[1]}.md`, "utf-8");
      currentSlug = slug.join("/");
  } else {
      fileName = fs.readFileSync(`posts/${slug[0]}.md`, "utf-8");
      currentSlug = slug[0];
  }

  const { data: frontmatter, content } = matter(fileName);

  const mdxSource = await serialize(content, {
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });

  // Calculate related posts
  const allFiles = fs.readdirSync("posts");
  let allPosts = [];

  allFiles.forEach((f) => {
    if (!f.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${f}`);
      subfiles.forEach((sf) => {
        const raw = fs.readFileSync(`posts/${f}/${sf}`, "utf-8");
        const { data } = matter(raw);
        allPosts.push({ slug: `${f}/${sf.replace(".md", "")}`, frontmatter: data });
      });
      return;
    }
    const raw = fs.readFileSync(`posts/${f}`, "utf-8");
    const { data } = matter(raw);
    allPosts.push({ slug: f.replace(".md", ""), frontmatter: data });
  });

  const currentTags = frontmatter.tags || [];

  // Filter by tags (at least one matching tag), exclude current post, and slice
  // Optimize payload by only returning title in frontmatter
  const relatedPosts = allPosts
    .filter((p) => {
      if (p.slug === currentSlug) return false;
      const pTags = p.frontmatter.tags || [];
      return pTags.some((t) => currentTags.includes(t));
    })
    .slice(0, 3)
    .map(p => ({
        slug: p.slug,
        frontmatter: { title: p.frontmatter.title } 
    }));

  return {
    props: {
      frontmatter,
      mdxSource,
      relatedPosts,
    },
  };
}
