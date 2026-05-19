import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Blog.module.css";
import Head from "next/head";
import { useState, useRef } from "react";
import Fuse from "fuse.js";

const SITE_URL = "https://grokoverflow.com";

// Build dynamic meta for the current path variant
function buildPageMeta(path) {
  if (!path) {
    return {
      title: "GrokOverflow Blog — Developer Tutorials & Articles",
      description:
        "Browse all developer tutorials, guides, and articles on GrokOverflow covering web development, data engineering, Apache Iceberg, AI, and more.",
      canonical: `${SITE_URL}/blog`,
      breadcrumb: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Blog", item: `${SITE_URL}/blog` },
      ],
    };
  }

  if (path[0] === "category") {
    const cat = path[1]
      ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
      : "";
    return {
      title: `${cat} Articles — GrokOverflow Blog`,
      description: `Browse all GrokOverflow articles in the "${cat}" category. Tutorials, guides, and deep-dives by Alex Merced.`,
      canonical: `${SITE_URL}/blog/category/${path[1] || ""}`,
      breadcrumb: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Blog", item: `${SITE_URL}/blog` },
        { name: cat, item: `${SITE_URL}/blog/category/${path[1] || ""}` },
      ],
    };
  }

  if (path[0] === "tag") {
    const tag = path[1]
      ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
      : "";
    return {
      title: `#${tag} Articles — GrokOverflow Blog`,
      description: `Browse all GrokOverflow articles tagged "${tag}". Developer tutorials and guides by Alex Merced.`,
      canonical: `${SITE_URL}/blog/tag/${path[1] || ""}`,
      breadcrumb: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Blog", item: `${SITE_URL}/blog` },
        { name: `#${tag}`, item: `${SITE_URL}/blog/tag/${path[1] || ""}` },
      ],
    };
  }

  if (path[0] === "author") {
    const author = path[1]
      ? path[1]
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "";
    return {
      title: `Articles by ${author} — GrokOverflow Blog`,
      description: `Browse all GrokOverflow articles written by ${author}. Tutorials, guides, and deep-dives on developer topics.`,
      canonical: `${SITE_URL}/blog/author/${path[1] || ""}`,
      breadcrumb: [
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Blog", item: `${SITE_URL}/blog` },
        { name: author, item: `${SITE_URL}/blog/author/${path[1] || ""}` },
      ],
    };
  }

  return {
    title: "GrokOverflow Blog — Developer Tutorials & Articles",
    description:
      "Browse developer tutorials, guides, and articles on GrokOverflow.",
    canonical: `${SITE_URL}/blog`,
    breadcrumb: [
      { name: "Home", item: `${SITE_URL}/` },
      { name: "Blog", item: `${SITE_URL}/blog` },
    ],
  };
}

// The Blog Page Content
export default function Blog({ posts, categories, path }) {
  const searchRef = useRef(null);
  const maxSlice = Math.ceil(posts.length / 20);

  const getPostSlice = (page) => {
    const firstPost = (page - 1) * 20;
    const lastPost = page < maxSlice ? page * 20 : posts.length - 1;

    return {
      page,
      slice: posts.slice(firstPost, lastPost),
    };
  };

  const [postSlice, setPostSlice] = useState(getPostSlice(1));

  const search = () => {
    const term = searchRef.current.value;

    if (!term) {
      setPostSlice({
        page: 1,
        slice: getPostSlice(1).slice,
      });
      return;
    }

    const fuse = new Fuse(posts, {
      keys: ["frontmatter.title", "frontmatter.tags", "frontmatter.description"],
      threshold: 0.3,
    });

    const result = fuse.search(term);
    const results = result.map((r) => r.item);

    setPostSlice({
      page: 1,
      slice: results,
    });
  };

  const meta = buildPageMeta(path);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: meta.breadcrumb.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/banner.png`}
        />
        <meta property="og:url" content={meta.canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/banner.png`}
        />
        <link rel="canonical" href={meta.canonical} />
        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>
      <aside className={styles.featured}>
        <div className={styles.featuredArticle}>
        <h1>Featured Post</h1>
        <Link href={`/posts/${posts[0].slug}`} className={styles.featuredLink}>
                <h2>{posts[0].frontmatter.title}</h2>
        </Link>
              <h3>{posts[0].frontmatter.date} - {posts[0].frontmatter.author}</h3>
              </div>
      </aside>
      <div className={styles.searchBox}>
          <h4 className={styles.rtitle}>Post Search</h4>
          <input
            type="text"
            name="search"
            placeholder="search titles and tags"
            ref={searchRef}
          />
          <button onClick={search} className={styles.searchButton}>
            Search
          </button>
        </div>
      <aside className={styles.blogs}>
        {postSlice.slice.map((post) => {
          //extract slug and frontmatter
          const { slug, frontmatter } = post;
          //extract frontmatter properties
          const { title, author, category, date, bannerImage, tags } =
            frontmatter;

          //JSX for individual blog listing
          return (
            <article key={slug} className={styles.article}>
              <Link href={`/posts/${slug}`}>
                <h2>{title}</h2>
              </Link>
              <h3>{date} - {author}</h3>
            </article>
          );
        })}
      </aside>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            const page = postSlice.page > 1 ? postSlice.page - 1 : 1;
            setPostSlice(getPostSlice(page));
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            const page =
              postSlice.page < maxSlice ? postSlice.page + 1 : maxSlice;
            setPostSlice(getPostSlice(page));
          }}
        >
          Next
        </button>
      </div>
      <aside className={styles.c}>
        <div className={styles.categories}>
          <h4 className={styles.rtitle}>Categories</h4>
          {categories.map((c) => {
            return (
              <div key={c}>
                <Link href={`/blog/category/${c.toLowerCase()}`}>{c}</Link>
              </div>
            );
          })}
        </div>
      </aside>
    </main>
  );
}

// Generating paths for categories, tags, years

export async function getStaticPaths(...args) {
  let paths = ["/blog"];

  // get list of files from the posts folder
  const files = fs.readdirSync("posts");

  // get frontmatter & slug from each post
  let posts = [];

  const addPost = (fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    posts.push({
      slug,
      frontmatter,
    });
  };

  files.forEach((fileName) => {
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);

      subfiles.forEach((f) => {
        addPost(`${fileName}/${f}`);
      });

      return true;
    }

    addPost(fileName);
  });

  posts.forEach(({ frontmatter }) => {
    // path for each category
    if (frontmatter.category) {
      paths.push(`/blog/category/${frontmatter.category.toLowerCase()}`);
    }
    // path for each tag
    if (frontmatter.tags) {
      frontmatter.tags.forEach((tag) => {
        paths.push(`/blog/tag/${tag.toLowerCase()}`);
      });
    }
    // paths for each author
    if (frontmatter.author) {
      paths.push(
        `/blog/author/${frontmatter.author.toLowerCase().replace(/ /g, "-")}`
      );
    }
  });

  paths = [...new Set(paths)];

  return {
    paths,
    fallback: false,
  };
}

//Generating the Static Props for the Blog Page
export async function getStaticProps({ params: { path } }) {
  // get list of files from the posts folder
  const files = fs.readdirSync("posts");

  // get frontmatter & slug from each post
  let posts = [];

  const addPost = (fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    posts.push({
      slug,
      frontmatter,
    });
  };

  files.forEach((fileName) => {
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);

      subfiles.forEach((f) => {
        addPost(`${fileName}/${f}`);
      });

      return true;
    }

    addPost(fileName);
  });

  // generate lists of categories
  let categories = [];
  posts.forEach(({ frontmatter }) => {
    if (frontmatter.category) {
      categories.push(frontmatter.category);
    }
  });
  categories = [...new Set(categories)];

  // filter by category or tag for a category or tag page
  if (path) {
    if (path[0] === "category") {
      posts = posts.filter(({ frontmatter }) => {
        return (
          frontmatter.category &&
          frontmatter.category.toLowerCase() === path[1].toLowerCase()
        );
      });
    }

    if (path[0] === "tag") {
      posts = posts.filter(({ frontmatter }) => {
        return (
          frontmatter.tags &&
          frontmatter.tags.some(
            (tag) => tag.toLowerCase() === path[1].toLowerCase()
          )
        );
      });
    }

    if (path[0] === "author") {
      posts = posts.filter(({ frontmatter }) => {
        return (
          frontmatter.author &&
          frontmatter.author.toLowerCase() === path[1].replace(/-/g, " ")
        );
      });
    }
  }

  posts.sort(
    (x, y) =>
      new Date(y.frontmatter.date).getTime() -
      new Date(x.frontmatter.date).getTime()
  );

  // Return the pages static props
  return {
    props: {
      posts,
      categories,
      path: path || null,
    },
  };
}
