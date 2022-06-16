import Navbar from "./Navbar"

export default function Layout({ children }) {
  return (
    <div className="layout">
        <Navbar/>
      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}