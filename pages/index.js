import Head from "next/head";
import styles from "../styles/Home.module.css";

const MUST_READS = [
  {
    title: "The Semantic Layer: The Definitive Guide",
    description:
      "Understand how a semantic layer unifies business logic, accelerates self-service analytics, and becomes the foundation of AI-ready data architectures.",
    url: "https://www.dremio.com/blog/semantic-layer-the-definitive-guide/",
    tag: "Semantic Layer",
  },
  {
    title: "Apache Polaris: The Catalog Standard for Lakehouses and AI",
    description:
      "Learn how Apache Polaris is establishing a universal open catalog standard that lets any engine read and write Apache Iceberg tables without vendor lock-in.",
    url: "https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai/",
    tag: "Apache Polaris",
  },
  {
    title: "What Are Table Formats and Why Were They Needed?",
    description:
      "Trace the evolution from raw Parquet files to modern table formats like Apache Iceberg — the innovation that unlocked ACID transactions on object storage.",
    url: "https://www.dremio.com/blog/what-are-table-formats-and-why-were-they-needed/",
    tag: "Table Formats",
  },
  {
    title: "What Is Dremio?",
    description:
      "A comprehensive overview of Dremio's Intelligent Lakehouse Platform — how reflections, semantic layers, and multi-engine federation work together.",
    url: "https://www.dremio.com/blog/what-is-dremio/",
    tag: "Dremio",
  },
  {
    title: "What Apache Iceberg Native Actually Means",
    description:
      "Cut through the marketing: discover what it truly means to be Apache Iceberg-native versus merely Iceberg-compatible, and why the distinction matters.",
    url: "https://www.dremio.com/blog/what-apache-iceberg-native-actually-means/",
    tag: "Apache Iceberg",
  },
  {
    title: "Open Source and the Data Lakehouse",
    description:
      "Explore how open-source projects — Iceberg, Parquet, Arrow, and Polaris — form an interoperable stack that keeps your data free from proprietary control.",
    url: "https://www.dremio.com/blog/open-source-and-the-data-lakehouse/",
    tag: "Open Source",
  },
  {
    title: "What Is Agentic Analytics?",
    description:
      "Discover how AI agents autonomously query, reason over, and act on lakehouse data — fundamentally changing how organizations derive insight at scale.",
    url: "https://www.dremio.com/blog/what-is-agentic-analytics/",
    tag: "Agentic AI",
  },
  {
    title: "The Definitive Guide to the Data Lakehouse",
    description:
      "The canonical end-to-end guide: what a data lakehouse is, how it compares to data warehouses and data lakes, and how to architect one for your organization.",
    url: "https://www.dremio.com/blog/definitive-guide-to-the-data-lakehouse/",
    tag: "Lakehouse",
  },
  {
    title: "How Dremio Keeps Agentic Analytics Fast Without Manual Tuning",
    description:
      "Learn how Dremio's autonomous optimization layer — reflections, compaction, and vectorized execution — keeps AI agent queries fast without manual DBA work.",
    url: "https://www.dremio.com/blog/how-dremio-keeps-agentic-analytics-fast-without-manual-tuning/",
    tag: "Performance",
  },
];

const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/alexmercedcoder" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/alexmerced" },
  { label: "YouTube (Data)", url: "https://www.youtube.com/@alexmerceddata" },
  { label: "YouTube (Dev)", url: "https://www.youtube.com/@alexmercedcoder" },
  { label: "BlueSky", url: "https://bsky.app/profile/alextalksdatalakehouses.fyi" },
  { label: "Twitter/X", url: "https://twitter.com/amdatalakehouse" },
  { label: "Mastodon", url: "https://me.dm/@thealexmerced" },
  { label: "TikTok", url: "https://www.tiktok.com/@alexmercedcoder" },
  { label: "Instagram", url: "https://www.instagram.com/alexmercedcoder" },
  { label: "Newsletter", url: "https://amdatalakehouse.substack.com/" },
  { label: "Tech Podcast", url: "https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF" },
  { label: "All Books", url: "https://books.alexmerced.com" },
  { label: "DataLakehouseHub", url: "https://main.datalakehousehub.com" },
  { label: "DataEngnr.com", url: "https://dataengnr.com" },
  { label: "Buy Me a Coffee", url: "https://buymeacoffee.com/alexmerced" },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GrokOverflow - tutorials, podcasts and videos for developers</title>
        <meta
          name="description"
          content="GrokOverflow is a developer education hub by Alex Merced, featuring tutorials, podcasts, and videos covering web development, data engineering, Apache Iceberg, AI, and more."
        />
        <meta property="og:title" content="GrokOverflow - Developer Tutorials &amp; Content" />
        <meta property="og:description" content="Tutorials, podcasts, and videos for developers by Alex Merced." />
        <meta property="og:image" content="https://grokoverflow.com/images/banner.png" />
        <meta property="og:url" content="https://grokoverflow.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GrokOverflow - Developer Tutorials &amp; Content" />
        <meta name="twitter:description" content="Tutorials, podcasts, and videos for developers by Alex Merced." />
        <meta name="twitter:image" content="https://grokoverflow.com/images/banner.png" />
        <link rel="canonical" href="https://grokoverflow.com/" />
        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GrokOverflow",
              url: "https://grokoverflow.com/",
              description:
                "Developer education hub featuring tutorials, podcasts, and videos on web development, data engineering, Apache Iceberg, AI, and more.",
              author: {
                "@type": "Person",
                name: "Alex Merced",
                url: "https://alexmercedcoder.dev",
                sameAs: [
                  "https://www.twitter.com/amdatalakehouse",
                  "https://www.linkedin.com/in/alexmerced",
                  "https://www.youtube.com/@alexmerceddata",
                  "https://www.github.com/alexmercedcoder",
                  "https://bsky.app/profile/alextalksdatalakehouses.fyi",
                ],
              },
              sameAs: [
                "https://www.twitter.com/amdatalakehouse",
                "https://www.linkedin.com/in/alexmerced",
                "https://www.youtube.com/@alexmerceddata",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://grokoverflow.com/blog?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <main className={styles.main}>

        {/* ── Hero ── */}
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Developer Education Hub</p>
          <h1>Welcome to GrokOverflow</h1>
          <p className={styles.heroSub}>
            Tutorials, podcasts, and videos for developers — by{" "}
            <a href="https://alexmerced.com" target="_blank" rel="noopener noreferrer">
              Alex Merced
            </a>
            , Head of Developer Relations at Dremio and author of 35+ books.
          </p>
          <p className={styles.heroBody}>
            Explore the blog for guides on web development, data engineering,
            Apache Iceberg, agentic AI, and more. Guest submissions welcome —
            pitch your idea at{" "}
            <a href="mailto:alex@grokoverflow.com">alex@grokoverflow.com</a>.
          </p>
        </section>

        {/* ── Must Reads ── */}
        <section className={styles.mustReads}>
          <h2 className={styles.sectionHeading}>
            Must Reads — Data Lakehouses &amp; Agentic Analytics
          </h2>
          <p className={styles.sectionSub}>
            Authoritative guides from the Dremio blog on building intelligent,
            open lakehouse architectures.
          </p>
          <div className={styles.mustReadsGrid}>
            {MUST_READS.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mustReadCard}
              >
                <span className={styles.mustReadTag}>{article.tag}</span>
                <h3 className={styles.mustReadTitle}>{article.title}</h3>
                <p className={styles.mustReadDesc}>{article.description}</p>
                <span className={styles.mustReadCta}>Read on Dremio.com →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Connect ── */}
        <section className={styles.connectSection}>
          <h2 className={styles.sectionHeading}>Connect with Alex</h2>
          <ul className={styles.socialList}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}
