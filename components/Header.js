import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from 'next/router'
import ThemeToggle from './ThemeToggle'

function Header (props){
    const router = useRouter()
    return <header className={styles.header}>
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/agate.min.css"/>
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://grokoverflow.com${router.asPath === '/' ? '' : router.asPath.split("?")[0]}`} />
        
        {/* Social Metadata */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="GrokOverflow" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@alexmercedcoder" />
        <meta name="twitter:creator" content="@alexmercedcoder" />
        </Head>
        <div id="logo">
        <Link href="/"><Image src={"/images/banner-logo-trans.PNG"} alt="GrokOverflow Logo" height={100} width={300}/></Link>
        </div>
        <nav className={styles.nav}>
            <Link href="/blog"><div className={styles.link}>BLOG</div></Link>
            <Link href="https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF?si=ee62c325b8f9412e"><div className={styles.link}>PODCAST</div></Link>
            <Link href="/video"><div className={styles.link}>VIDEOS</div></Link>
            <a href="https://join.slack.com/t/amwebdev/shared_invite/enQtNzc4NDA3MDU3MDE0LTZjNjIyZmQ3MzA5Y2Q3MWUwZjk3NTIyYjliOThlMWFjNTFkYWM1OGUxN2Y3NGExNGVhOGIzZTg0YTJjZTk5NDA"><div className={styles.link}>COMMUNITY</div></a>
            <ThemeToggle />
        </nav>
    </header>
}

export default Header