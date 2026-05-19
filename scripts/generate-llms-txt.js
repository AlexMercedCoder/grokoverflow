const fs = require("fs");
const matter = require("gray-matter");

const SITE_URL = "https://grokoverflow.com";
const FILE_PATH = "./public/llms.txt";

// Map frontmatter category/tags to a display section
const CATEGORY_SECTIONS = [
  {
    label: "Apache Iceberg & Data Lakehouse",
    test: (fm) =>
      /(iceberg|lakehouse|parquet|polaris|arrow|delta lake|hudi|paimon|nessie)/i.test(
        [fm.title, fm.description, ...(fm.tags || []), fm.category].join(" ")
      ),
  },
  {
    label: "Data Engineering",
    test: (fm) =>
      /(data engineer|dbt|airflow|spark|flink|pipeline|etl|elt|dremio|warehouse|streaming|batch)/i.test(
        [fm.title, fm.description, ...(fm.tags || []), fm.category].join(" ")
      ),
  },
  {
    label: "AI, LLMs & Agentic Systems",
    test: (fm) =>
      /(llm|mcp|agent|ai|langchain|rag|gpt|claude|gemini|context management|model context)/i.test(
        [fm.title, fm.description, ...(fm.tags || []), fm.category].join(" ")
      ),
  },
  {
    label: "Web Development (JavaScript, React, Next.js, etc.)",
    test: (fm) =>
      /(react|next|svelte|vue|angular|javascript|typescript|node|express|html|css|frontend|backend|api)/i.test(
        [fm.title, fm.description, ...(fm.tags || []), fm.category].join(" ")
      ),
  },
  {
    label: "Systems & Other Languages (Rust, Go, Python, etc.)",
    test: (fm) =>
      /(rust|golang|python|ruby|scala|java|php|dart|ballerina|c\+\+|c#|kotlin)/i.test(
        [fm.title, fm.description, ...(fm.tags || []), fm.category].join(" ")
      ),
  },
  {
    label: "DevOps, Infrastructure & Tools",
    test: (fm) =>
      /(docker|kubernetes|helm|nginx|deploy|devops|git|github|ci\/cd|cloud|aws|azure|gcp)/i.test(
        [fm.title, fm.description, ...(fm.tags || []), fm.category].join(" ")
      ),
  },
];

const CATCH_ALL_LABEL = "Other Articles & Guides";

const generateLLMSTxt = () => {
  let posts = [];
  const files = fs.readdirSync("posts");

  files.forEach((fileName) => {
    // Handling nested year directories or direct files
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);
      subfiles.forEach((f) => {
        const slug = `${fileName}/${f.replace(".md", "")}`;
        const readFile = fs.readFileSync(`posts/${fileName}/${f}`, "utf-8");
        const { data: frontmatter } = matter(readFile);
        if (frontmatter.title) {
          posts.push({ slug, frontmatter });
        }
      });
      return;
    }

    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    if (frontmatter.title) {
      posts.push({ slug, frontmatter });
    }
  });

  posts.sort(
    (x, y) => new Date(y.frontmatter.date) - new Date(x.frontmatter.date)
  );

  // Categorize posts — a post can only appear in the first matching section
  const sections = CATEGORY_SECTIONS.map((s) => ({ ...s, posts: [] }));
  const catchAll = { label: CATCH_ALL_LABEL, posts: [] };

  posts.forEach((post) => {
    const matched = sections.find((s) => s.test(post.frontmatter));
    if (matched) {
      matched.posts.push(post);
    } else {
      catchAll.posts.push(post);
    }
  });

  const renderPost = (post) =>
    `- [${post.frontmatter.title}](${SITE_URL}/posts/${post.slug}): ${
      post.frontmatter.description ||
      "Article about " + post.frontmatter.title
    }`;

  const sectionBlocks = [...sections, catchAll]
    .filter((s) => s.posts.length > 0)
    .map((s) => `## ${s.label}\n\n${s.posts.map(renderPost).join("\n")}`)
    .join("\n\n");

  const content = `# GrokOverflow

> A developer education hub by Alex Merced (Head of Developer Relations at Dremio).
> Covers web development, data engineering, Apache Iceberg, AI/LLMs, and more.
> Site: https://grokoverflow.com | Author: https://alexmercedcoder.dev

${sectionBlocks}
`;

  fs.writeFileSync(FILE_PATH, content);
  console.log(`✅ llms.txt generated at ${FILE_PATH} (${posts.length} posts)`);
};

generateLLMSTxt();
