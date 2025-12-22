function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Custom Software</span><br />
            That Scales With You
          </h1>
          <p className="hero-subtitle">
            We build on-demand software solutions for startups and enterprises.
          </p>
          <div className="hero-cta">
            <a href="#contact" className="btn-primary btn-large">Get a Quote</a>
            <a href="#contact" className="btn-secondary btn-large">Let's Talk</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1"></div>
          <div className="floating-card card-2"></div>
          <div className="floating-card card-3"></div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
