import Navbar from "./Navbar"
import Footer from "./Footer"
import GlobalCSS from '../styles/global.css'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <GlobalCSS/>
      <Navbar/>
        <>
          { children }
        </>
      <Footer/>
    </>
  )
}