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
      { label: "SemanticLakehouse.com", url: "https://semanticlakehouse.com" },
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

function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.network} aria-label="The Alex Merced Network">
        <h2 className={styles.networkTitle}>The Alex Merced Network</h2>
        <div className={styles.networkGrid}>
          {NETWORK.map((group) => (
            <div key={group.title}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul className={styles.groupList}>
                {group.sites.map((site) => (
                  <li key={site.url}>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {site.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
