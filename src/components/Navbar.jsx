import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleNavClick = (href) => {
    setMobileMenuOpen(false)
    if (isHomePage && href.startsWith('#')) {
      // Smooth scroll to section on home page
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <img src="/logo/OG_on_white-removebg.png" alt="ConvoSol Logo" />
          </Link>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li>
              {isHomePage ? (
                <a href="#services" onClick={() => handleNavClick('#services')}>Solutions</a>
              ) : (
                <Link to="/#services" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#process" onClick={() => handleNavClick('#process')}>Approach</a>
              ) : (
                <Link to="/#process" onClick={() => setMobileMenuOpen(false)}>Approach</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#portfolio" onClick={() => handleNavClick('#portfolio')}>Impact</a>
              ) : (
                <Link to="/#portfolio" onClick={() => setMobileMenuOpen(false)}>Impact</Link>
              )}
            </li>
            <li>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            </li>
            <li>
              {isHomePage ? (
                <a href="#contact" className="btn-primary" onClick={() => handleNavClick('#contact')}>Let's Talk</a>
              ) : (
                <Link to="/#contact" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>Let's Talk</Link>
              )}
            </li>
          </ul>
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
