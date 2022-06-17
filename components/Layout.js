import Navbar from "./Navbar"
import Footer from "./Footer"
import GlobalCSS from '../styles/global.css'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Tropican App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" cross0rigin/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;500;700&display=swap" rel="stylesheet"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.5.3/lottie_svg.min.js"/>
      </Head>
      <GlobalCSS/>
      <Navbar/>
        <>
          { children }
        </>
      <Footer/>
    </>
  )
}