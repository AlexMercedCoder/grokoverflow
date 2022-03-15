import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Blog.module.css"


// The Blog Page Content
export default function Blog({ posts, categories }) {
  return (
    <main className={styles.main}>
      <aside className={styles.featured}>
        <h1>Featured Post</h1>
        <Link href={`/posts/${posts[0].slug}`} >
              <Image src={posts[0].frontmatter.bannerImage} alt={posts[0].frontmatter.title} width={285} height={160}/>
        </Link>
      </aside>
      <aside className={styles.blogs}>
      {posts.map((post) => {
        //extract slug and frontmatter
        const { slug, frontmatter } = post;
        //extract frontmatter properties
        const { title, author, category, date, bannerImage, tags } =
          frontmatter;

        //JSX for individual blog listing
        return (
          <article key={slug}>
            <Link href={`/posts/${slug}`} >
              <Image src={bannerImage} alt={title} width={285} height={160}/>
            </Link>
          </article>
        );
      })}
      </aside>
      <aside className={styles.categories}>
        <h4>Categories</h4>
        {categories.map(c => {
          return <div key={c}>
            <Link href={`/blog/category/${c}`}>
              {c}
            </Link>
          </div>
        })}

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
    paths.push(`/blog/category/${frontmatter.category}`);
    // path for each tag
    frontmatter.tags.forEach((tag) => {
      paths.push(`/blog/tag/${tag}`);
    });
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
  posts.forEach(({ frontmatter }) => categories.push(frontmatter.category));
  categories = [...new Set(categories)];

  // filter by category or tag for a category or tag page
  if (path) {
    if (path[0] === "category") {
      posts = posts.filter(({ frontmatter }) => {
        return frontmatter.category === path[1];
      });
    }

    if (path[0] === "tag") {
      posts = posts.filter(({ frontmatter }) => {
        return frontmatter.tags.includes(path[1]);
      });
    }
  }

  posts.sort((x,y) => new Date(y.frontmatter.date).getTime() - new Date(x.frontmatter.date).getTime())

  // Return the pages static props
  return {
    props: {
      posts,
      categories,
    },
  };
}