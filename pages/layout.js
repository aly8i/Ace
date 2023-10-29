"use client";
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
import styles from "../styles/Home.module.css"
import Image from "next/image";
import Topbar from '../components/Topbar/Topbar'
export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ace</title>
        <meta name="description" content="Play and Earn Card Game " />
        <link rel="icon" href="/aceee.png" />
      </Head>
      <Topbar/>
      {children}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
