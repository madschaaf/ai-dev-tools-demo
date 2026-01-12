import { Link, NavLink } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">eBay</span>
          <span className="logo-subtitle">AI Dev Tools</span>
        </div>

        <div className="navbar-links">
          <NavLink to="/" className="nav-link" end>Explore Links</NavLink>
          <NavLink to="/vscode-extensions" className="nav-link">VS Code Extensions</NavLink>
          <NavLink to="/ai-sandbox" className="nav-link">AI Sandbox</NavLink>
          <NavLink to="/use-cases" className="nav-link">Use Cases</NavLink>
        </div>

        <div className="navbar-actions">
          <Link to="/steps-guide" className="btn-get-started">Steps Guide</Link>
        </div>
      </div>
    </nav>
  )
}
