import styles from "../styles/Footer.module.css";

const NETWORK = [
  {
    title: "Alex Merced",
    sites: [
      { label: "AlexMerced.com", url: "https://alexmerced.com" },
      { label: "WhoIsAlexMerced.com", url: "https://whoisalexmerced.com" },
      { label: "AlexMercedMedia.com", url: "https://alexmercedmedia.com" },
      { label: "Books", url: "https://books.alexmerced.com" },
      { label: "AlexMercedCoder.dev", url: "https://alexmercedcoder.dev" },
      { label: "AlexMercedData.com", url: "https://alexmerceddata.com" },
    ],
  },
  {
    title: "Lakehouse & Data",
    sites: [
      { label: "DataLakehouseHub.com", url: "https://datalakehousehub.com" },
      { label: "IcebergLakehouse.com", url: "https://iceberglakehouse.com" },
      { label: "AgenticLakehouse.com", url: "https://agenticlakehouse.com" },
      { label: "AgenticAnalyticsNow.com", url: "https://agenticanalyticsnow.com" },
      { label: "OpenAgenticPlatform.com", url: "https://openagenticplatform.com" },
      { label: "AlexMercedAI.com", url: "https://www.alexmercedai.com" },
      { label: "SemanticLakehouse.com", url: "https://semanticlakehouse.com" },
      { label: "OpenLakehouse.AlexMerced.com", url: "https://openlakehouse.alexmerced.com" },
      { label: "DataEngnr.com", url: "https://dataengnr.com" },
    ],
  },
  {
    title: "Blogs",
    sites: [
      { label: "AlexMerced.blog", url: "https://alexmerced.blog" },
      { label: "IngestThis.com", url: "https://ingestthis.com" },
    ],
  },
];

const COMMUNITY = [
  {
      title: "Newsletters",
      sites: [
      { label: "AI newsletter, Thursdays", url: "https://amdatalakehouse.substack.com" },
      { label: "Apache lakehouse newsletter, Fridays", url: "https://amdatalakehouse.substack.com" },
      { label: "Subscribe on Substack", url: "https://amdatalakehouse.substack.com" },
      ],
  },
  {
    title: "Event Calendars",
    sites: [
      { label: "Agentic Lakehouse Events", url: "https://luma.com/agenticlakehouse" },
      { label: "Data Lakehouse Hub Events", url: "https://luma.com/DataLakehouseHub" },
    ],
  },
  {
    title: "Communities",
    sites: [
      { label: "Data Lakehouse Hub Slack", url: "https://join.slack.com/t/thedatalakehousehub/shared_invite/zt-274yc8sza-mI2zhCW8LGkOh1uxuf8T5Q" },
      { label: "Data Events Slack", url: "https://join.slack.com/t/data-events/shared_invite/zt-38vgrooy9-U9ral_gr3NAz_Siih1QwmQ" },
      { label: "Data & Tech Slack", url: "https://join.slack.com/t/datatechcommunity/shared_invite/zt-12xrk4qmd-y~6jUFFd7kdaLhgLURKwoA" },
      { label: "r/datalakehouseandai", url: "https://www.reddit.com/r/datalakehouseandai/" },
      { label: "Data Lakehouse Hub on LinkedIn", url: "https://www.linkedin.com/company/data-lakehouse-hub/" },
    ],
  },
  {
    title: "YouTube",
    sites: [
      { label: "Alex Merced Tech", url: "https://www.youtube.com/@AlexMercedCoder" },
      { label: "Alex Merced Data & AI", url: "https://www.youtube.com/@alexmerceddata" },
    ],
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.run} aria-label="The Alex Merced Network">
        <h2 className={styles.runTitle}>The Alex Merced Network</h2>
        <ul className={styles.runList}>
          {NETWORK.flatMap((g) => g.sites)
            .filter((s) => s.url !== "https://grokoverflow.com")
            .map((site) => (
              <li key={site.url}>
                <a href={site.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {site.label}
                </a>
              </li>
            ))}
        </ul>
      </nav>

      <nav className={styles.run} aria-label="Events and community">
        <h2 className={styles.runTitle}>Events &amp; Community</h2>
        <ul className={styles.runList}>
          {COMMUNITY.flatMap((g) => g.sites)
            .filter((s) => s.url !== "https://grokoverflow.com")
            .map((site) => (
              <li key={site.url}>
                <a href={site.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {site.label}
                </a>
              </li>
            ))}
        </ul>
      </nav>

      <div className={styles.base}>
        copyright 2022 by Alex Merced of alexmercedcoder.dev
        <p className={styles.disclaimer}>
          The views, thoughts, and opinions expressed on this site belong solely
          to Alex Merced and do not represent the views of any organization or
          employer.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
