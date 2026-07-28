import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Footer.module.css";
import Link from "next/link";

function Footer(props) {
  return (
    <footer className={styles.footer}>
      copyright 2022 by Alex Merced of alexmercedcoder.dev
      <p style={{fontSize:'0.8rem',marginTop:'0.25rem',opacity:0.7}}>
        The views, thoughts, and opinions expressed on this site belong solely to Alex Merced and do not represent the views of any organization or employer.
      </p>
    </footer>
  );
}

export default Footer;
