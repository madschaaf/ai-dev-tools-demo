import { Link, NavLink } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import './NavBar.css'

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-text">eBay</span>
          <span className="logo-subtitle">AI Dev Tools</span>
        </div>

        <div className="navbar-links">
          <NavLink to="/" className="nav-link" end>Explore Links</NavLink>
          
          {/* Dropdown Menu */}
          <div className="nav-dropdown" ref={dropdownRef}>
            <button 
              className="nav-link dropdown-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              Resources ▾
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <NavLink 
                  to="/vscode-extensions" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  VS Code Extensions
                </NavLink>
                <NavLink 
                  to="/ai-sandbox" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  AI Sandbox
                </NavLink>
                <NavLink 
                  to="/use-cases" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Use Cases
                </NavLink>
                <NavLink 
                  to="/workflow" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Workflows
                </NavLink>
                <NavLink 
                  to="/all-steps" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  All Steps
                </NavLink>
                <NavLink 
                  to="/install-python" 
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Install Python
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/use-case-prototype" className="nav-link">Use Case Prototype</NavLink>
          <NavLink to="/simple-submission" className="nav-link">Simple Submission</NavLink>
          <NavLink to="/use-case-step-demo" className="nav-link">Use Case Step Demo</NavLink>
          <NavLink to="/static-submission" className="nav-link">Static Submission</NavLink>
          <NavLink to="/review-submissions" className="nav-link">Review Submissions</NavLink>
          <NavLink to="/library" className="nav-link">Library</NavLink>
        </div>

        <div className="navbar-actions">
          <Link to="/steps-guide" className="btn-get-started">Steps Guide</Link>
        </div>
      </div>
    </nav>
  )
}
