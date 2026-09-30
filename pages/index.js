import Head from "next/head";
import styles from "../styles/Home.module.css";

// GrokOverflow is retired as an article site (decision D1, 2026-09-29). Every post
// now 301s to its canonical copy (netlify.toml); this page points readers on.
const DESTINATIONS = [
  {
    title: "Alex Merced's Lakehouse Blog",
    url: "https://iceberglakehouse.com/",
    blurb: "Apache Iceberg, lakehouse catalogs, table formats, and data engineering reference guides.",
  },
  {
    title: "Data Lakehouse Hub",
    url: "https://datalakehousehub.com/",
    blurb: "Lakehouse news and roundups, agentic AI, AI coding agent guides, and community events.",
  },
  {
    title: "Coding Tutorials Blog",
    url: "https://tuts.alexmercedcoder.dev/",
    blurb: "Programming tutorials: JavaScript, React, Node.js, Python, Ruby, Go, Rust, and more.",
  },
];

const DESCRIPTION =
  "GrokOverflow has moved. Alex Merced's articles now live at Alex Merced's Lakehouse Blog, Data Lakehouse Hub, and the Coding Tutorials Blog.";

export default function Home() {
  return (
    <main className={styles.container}>
      <Head>
        <title>GrokOverflow has moved | Alex Merced</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content="GrokOverflow has moved" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://grokoverflow.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="GrokOverflow has moved" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <link rel="canonical" href="https://grokoverflow.com/" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "GrokOverflow has moved",
              url: "https://grokoverflow.com/",
              description: DESCRIPTION,
              author: { "@id": "https://alexmerced.com/#alexmerced" },
            }),
          }}
        />
      </Head>

      <section className={styles.moved}>
        <h1>GrokOverflow has moved</h1>
        <p>
          GrokOverflow was one of Alex Merced&apos;s article sites. Every article it
          carried now lives on one of the sites below, and old links redirect
          to the right copy automatically.
        </p>
        <ul className={styles.movedList}>
          {DESTINATIONS.map((d) => (
            <li key={d.url}>
              <a href={d.url}>{d.title}</a>
              <span>{d.blurb}</span>
            </li>
          ))}
        </ul>
        <p>
          More about Alex: <a href="https://alexmerced.com/">alexmerced.com</a>.
          Books: <a href="https://books.alexmerced.com/">books.alexmerced.com</a>.
        </p>
      </section>
    </main>
  );
}
