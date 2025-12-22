import { useState } from 'react'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <div className="logo">
            <img src="/logo.png" alt="ConvoSol Logo" />
            <span>ConvoSol</span>
          </div>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Solutions</a></li>
            <li><a href="#process" onClick={() => setMobileMenuOpen(false)}>Approach</a></li>
            <li><a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Impact</a></li>
            <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>Why Us</a></li>
            <li><a href="#contact" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>Let's Talk</a></li>
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
