import Navbar from "./Navbar"
import Footer from "./Footer"
import GlobalCSS from '../styles/global.css'

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