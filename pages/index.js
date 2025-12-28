import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          GrokOverflow - tutorials, podcasts and videos for developers
        </title>
        <meta
          name="description"
          content="GrokOverflow - tutorials, podcasts and videos for developers"
        />
        <meta property="og:title" content="GrokOverflow - Developer Tutorials & Content" />
        <meta property="og:description" content="Tutorials, podcasts, and videos for developers by Alex Merced." />
        <meta property="og:image" content="https://grokoverflow.com/images/banner.png" />
        <link rel="icon" href="/favicon.ico" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GrokOverflow",
              url: "https://grokoverflow.com/",
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to GrokOverflow!</h1>
        <h2>Content for devs, coders and engineers</h2>
        <p>
          {" "}
          My name is Alex Merced (alexmercedcoder.dev) and on this website you
          willll find lots of blogs, videos and podcasts on all sorts of
          different types of software development. Check out the blog section
          and feel free to click on any category, tag or author to quickly find
          the blog post your looking for.
        </p>
        <p>
          Guest submissions are welcome. Pitch me your idea by emailing me at
          alex@grokoverflow.com or message me in the devNursery slack community
          linked in the navigation.
        </p>
        <p>
          Also make sure to follow me on the following platforms:
          <ul className={styles.socialList}>
            <li>
            <a href="https://www.twitter.com/alexmercedcoder">
              Twitter (General Development account)
            </a>
            </li>
            <li>
            <a href="https://www.twitter.com/amlakehouse">
              Twitter (Data Engineering Account)
            </a>
            </li>
            <li>
            <a href="https://www.linkedin.com/in/alexmerced">
              LinkedIn
            </a>
            </li>
            <li>
            <a href="https://www.instagram.com/alexmercedcoder">
              Instagram
            </a>
            </li>
            <li>
            <a href="https://www.github.com/alexmercedcoder">
              Github
            </a>
            </li>
            <li>
            <a href="https://www.youtube.com/c/AlexMercedFullStackDeveloper">
              Youtube.com
            </a>
            </li>
            <li>
            <a href="https://odysee.com/@alexmercedcoder:e">
              Odysee (Alternative Video Network)
            </a>
            </li>
            <li>
            <a href="https://indieweb.social/@alexmerced">
              Mastodon (Twitter Alternative)
            </a>
            </li>
          </ul>
        </p>
      </main>
    </div>
  );
}
