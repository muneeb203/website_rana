function Process() {
  const steps = [
    {
      number: '01',
      title: 'Listen',
      description: 'We start by truly understanding your business challenges, goals, and the human context behind your needs.'
    },
    {
      number: '02',
      title: 'Understand',
      description: 'Deep analysis of your workflows, data patterns, and user behaviors to identify where AI can create real impact.'
    },
    {
      number: '03',
      title: 'Build Intelligence',
      description: 'Custom AI solutions designed around your specific context, built with empathy and technical excellence.'
    },
    {
      number: '04',
      title: 'Grow Together',
      description: 'Continuous learning and optimization as your AI solution evolves with your business and learns from real usage.'
    }
  ]

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-header">
          <h2>Our Approach</h2>
          <p>Building AI that understands people, not just processes</p>
        </div>
        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
