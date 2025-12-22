function Portfolio() {
  const projects = [
    {
      title: 'Healthcare AI Assistant',
      description: 'Built an empathetic AI that helps medical staff understand patient needs, reducing consultation time by 40% while improving care quality.',
      tags: ['Natural Language Processing', 'Healthcare AI', 'HIPAA Compliant'],
      gradientClass: 'gradient-bg-1'
    },
    {
      title: 'Supply Chain Intelligence',
      description: 'Created predictive AI that anticipates disruptions and optimizes logistics, saving clients $2M+ annually through intelligent forecasting.',
      tags: ['Predictive Analytics', 'Machine Learning', 'Business Intelligence'],
      gradientClass: 'gradient-bg-2'
    },
    {
      title: 'Customer Experience AI',
      description: 'Developed conversational AI that understands customer emotions and context, increasing satisfaction scores by 65% across all touchpoints.',
      tags: ['Conversational AI', 'Sentiment Analysis', 'Customer Success'],
      gradientClass: 'gradient-bg-3'
    }
  ]

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-header">
          <h2>Intelligence in Action</h2>
          <p>Real AI solutions creating meaningful impact</p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div key={index} className="portfolio-item">
              <div className="portfolio-image">
                <div className={`placeholder-image ${project.gradientClass}`}></div>
              </div>
              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tags">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
