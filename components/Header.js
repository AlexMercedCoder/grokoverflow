import Head from 'next/head'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import Script from 'next/script'
import ThemeToggle from './ThemeToggle'

/* ── Inline SVG logo — crisp at any size, Mux design tokens ── */
function GrokOverflowLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 48"
      width="240"
      height="48"
      role="img"
      aria-label="GrokOverflow"
      style={{ display: 'block' }}
    >
      {/* Circuit-head icon */}
      <g stroke="#242628" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Head outline */}
        <path d="M10 36 C10 36 8 34 8 28 C8 18 14 11 22 11 C30 11 36 18 36 28 C36 34 34 36 34 36 L30 36 L30 38 L14 38 L14 36 Z" />
        {/* Neck base */}
        <line x1="18" y1="38" x2="18" y2="41" />
        <line x1="26" y1="38" x2="26" y2="41" />
        <line x1="18" y1="41" x2="26" y2="41" />
        {/* Circuit nodes */}
        <circle cx="22" cy="21" r="1.3" fill="#242628" stroke="none" />
        <circle cx="17" cy="27" r="1.3" fill="#242628" stroke="none" />
        <circle cx="27" cy="27" r="1.3" fill="#242628" stroke="none" />
        <circle cx="22" cy="32" r="1.3" fill="#ff6100" stroke="none" />
        {/* Circuit traces */}
        <line x1="22" y1="21" x2="17" y2="27" />
        <line x1="22" y1="21" x2="27" y2="27" />
        <line x1="17" y1="27" x2="22" y2="32" />
        <line x1="27" y1="27" x2="22" y2="32" />
        {/* Antenna */}
        <line x1="22" y1="21" x2="22" y2="15" />
        <line x1="22" y1="15" x2="18" y2="12" />
        <line x1="22" y1="15" x2="26" y2="12" />
      </g>

      {/* "Grok" — graphite */}
      <text
        x="44"
        y="34"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="24"
        fill="#242628"
        letterSpacing="0.01em"
      >Grok</text>

      {/* "Overflow" — action orange */}
      <text
        x="108"
        y="34"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        fontSize="24"
        fill="#ff6100"
        letterSpacing="0.01em"
      >Overflow</text>
    </svg>
  )
}

function Header(props) {
  return (
    <header className={styles.header}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6DJ8S8YLSG"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6DJ8S8YLSG');
        `}
      </Script>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/agate.min.css" />
        {/* Global Social Metadata — canonical is managed per-page */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="GrokOverflow" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@alexmercedcoder" />
        <meta name="twitter:creator" content="@alexmercedcoder" />
      </Head>

      <div id="logo" className={styles.logoWrapper}>
        <Link href="/" aria-label="GrokOverflow home">
          <GrokOverflowLogo />
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/blog"><div className={styles.link}>BLOG</div></Link>
        <Link href="https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF?si=ee62c325b8f9412e">
          <div className={styles.link}>PODCAST</div>
        </Link>
        <Link href="/video"><div className={styles.link}>VIDEOS</div></Link>
        <a href="https://join.slack.com/t/amwebdev/shared_invite/enQtNzc4NDA3MDU3MDE0LTZjNjIyZmQ3MzA5Y2Q3MWUwZjk3NTIyYjliOThlMWFjNTFkYWM1OGUxN2Y3NGExNGVhOGIzZTg0YTJjZTk5NDA">
          <div className={styles.link}>COMMUNITY</div>
        </a>
        <ThemeToggle />
      </nav>
    </header>
  )
}

export default Header