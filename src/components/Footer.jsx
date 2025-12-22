function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src="/logo.png" alt="ConvoSol Logo" />
              <span>ConvoSol</span>
            </div>
            <p>AI solutions that understand your business and grow with your needs.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#services">Intelligent Automation</a></li>
                <li><a href="#services">Conversational AI</a></li>
                <li><a href="#services">Predictive Intelligence</a></li>
                <li><a href="#services">Custom AI Solutions</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">Why Convo Sol</a></li>
                <li><a href="#portfolio">Our Impact</a></li>
                <li><a href="#process">Our Approach</a></li>
                <li><a href="#contact">Let's Talk</a></li>
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
