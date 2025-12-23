import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">eBay</span>
          <span className="logo-subtitle">Dev Tools</span>
        </div>

        <div className="navbar-links">
          <NavLink to="/" className="nav-link" end>Explore Links</NavLink>
          <NavLink to="/vscode-extensions" className="nav-link">VS Code Extensions</NavLink>
        </div>

        <div className="navbar-actions">
          <Link to="/steps-guide" className="btn-get-started">Get Started</Link>
        </div>
      </div>
    </nav>
  )
}
