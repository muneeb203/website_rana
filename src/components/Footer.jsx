import { Link, useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleNavClick = (href) => {
    if (isHomePage && href.startsWith('#')) {
      // Smooth scroll to section on home page
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src="/logo/OG_on_white-removebg.png" alt="ConvoSol Logo" />
            </div>
            <p>AI-powered voice solutions for modern businesses.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="https://voas-ai.convosol.com" target="_blank" rel="noopener noreferrer">VOAS AI</a>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  {isHomePage ? (
                    <a href="#contact" onClick={() => handleNavClick('#contact')}>Contact</a>
                  ) : (
                    <Link to="/#contact">Contact</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 ConvoSol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
