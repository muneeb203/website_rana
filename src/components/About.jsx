function About() {
  const values = [
    {
      emoji: '👂',
      title: 'Listen First',
      description: 'Understanding before building, empathy before algorithms'
    },
    {
      emoji: '🧠',
      title: 'Human-Centered AI',
      description: 'Technology that amplifies human intelligence, not replaces it'
    },
    {
      emoji: '🤝',
      title: 'Partnership Mindset',
      description: 'Long-term relationships built on trust and shared success'
    }
  ]

  const stats = [
    { number: '95%', label: 'Client Retention' },
    { number: '3x', label: 'Average ROI Increase' },
    { number: '24/7', label: 'AI Support Available' },
    { number: '50+', label: 'AI Solutions Deployed' }
  ]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Why Convo Sol Exists</h2>
            <p className="lead">We bridge the gap between human needs and artificial intelligence.</p>
            <p>At Convo Sol, we believe AI should feel less like technology and more like having a thoughtful conversation with someone who truly gets your business. We don't just build AI systems—we create intelligent solutions that listen, learn, and adapt to the way you actually work.</p>
            <p>Our philosophy is simple: understand first, build second. Every AI solution we create starts with deep listening sessions to understand not just what you need, but why you need it and how it fits into the human story of your business.</p>
            <div className="about-values">
              {values.map((value, index) => (
                <div key={index} className="value-item">
                  <h4>{value.emoji} {value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="about-visual">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
