import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AboutPage() {
  const teamMembers = [
    {
      name: 'Muneeb Qureshi',
      role: 'Co-Founder ',
      bio: 'We help businesses sound smarter, clearer, and more human. Turning everyday conversations into meaningful brand experiences.',
      image: '/team/muneeb.jpg',
      linkedin: 'https://linkedin.com/in/muneebqureshi2003'
    },
    {
      name: 'Muhammad Hadi Abid',
      role: 'Co-Founder ',
      bio: 'Expert engineer specializing in scalable AI infrastructure and real-time conversation processing.',
      image: '/team/hadi.jpg',
      linkedin: 'https://www.linkedin.com/in/muhammad-hadi-abid/'
    },
    {
      name: 'Awais Khaleeq',
      role: 'Co-Founder',
      bio: 'Full-stack developer focused on building robust and scalable web applications with modern technologies.',
      image: '/team/awais.jpg',
      linkedin: 'https://www.linkedin.com/in/muhammad-awais-khaleeq/'
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">
              <span className="gradient-text">About ConvoSol</span><br />
              Intelligence that listens
            </h1>
            <p className="about-hero-subtitle">
              We're a team of AI researchers, engineers, and designers united by one belief: 
              artificial intelligence should feel less like technology and more like having a 
              thoughtful conversation with someone who truly understands your business.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The minds behind ConvoSol's intelligent solutions</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member-card">
                <div className="member-image">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="member-photo"
                    onLoad={(e) => {
                      console.log(`Image loaded successfully: ${member.image}`);
                      e.target.nextElementSibling.style.display = 'none';
                    }}
                    onError={(e) => {
                      console.log(`Failed to load image: ${member.image}`);
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="placeholder-avatar gradient-bg-1">
                    <span className="member-initials">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="member-content">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-actions">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="linkedin-icon-btn"
                      title={`Connect with ${member.name} on LinkedIn`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOAS AI Product Section */}
      <section className="voas-ai-section">
        <div className="container">
          <div className="voas-hero">
            <div className="voas-badge">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">Our Flagship Product</span>
            </div>
            <h2 className="voas-title">
              Meet <span className="gradient-text">VOAS AI</span>
            </h2>
            <p className="voas-subtitle">
              The intelligent voice agent that transforms your business calling system with AI assistance
            </p>
          </div>

          <div className="voas-content">
            <div className="voas-description">
              <div className="description-card">
                <div className="card-header">
                  <div className="header-icon">🎯</div>
                  <h3>Transform Your Communications</h3>
                </div>
                <p>VOAS AI seamlessly integrates with your existing calling system to provide 24/7 automated customer support, intelligent lead qualification, and smart call management that understands context and delivers exceptional experiences.</p>
              </div>
              
              <div className="voas-stats">
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Availability</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">80%</div>
                  <div className="stat-label">Cost Reduction</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5x</div>
                  <div className="stat-label">Faster Response</div>
                </div>
              </div>

              <div className="voas-cta">
                <a 
                  href="https://voas-ai.convosol.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="voas-btn-primary"
                >
                  <span className="btn-text">Explore VOAS AI</span>
                  <span className="btn-icon">→</span>
                </a>
                <div className="cta-note">
                  <span>✨ Free demo available</span>
                </div>
              </div>
            </div>

            <div className="voas-features">
              <div className="features-grid">
                <div className="feature-card feature-1">
                  <div className="feature-icon">
                    <div className="icon-bg">📞</div>
                  </div>
                  <div className="feature-content">
                    <h4>Smart Call Handling</h4>
                    <p>Intelligent voice responses that understand customer needs and provide accurate, contextual information in real-time.</p>
                  </div>
                </div>

                <div className="feature-card feature-2">
                  <div className="feature-icon">
                    <div className="icon-bg">🤖</div>
                  </div>
                  <div className="feature-content">
                    <h4>AI-Powered Automation</h4>
                    <p>Automated lead qualification, appointment scheduling, and customer support workflows that work around the clock.</p>
                  </div>
                </div>

                <div className="feature-card feature-3">
                  <div className="feature-icon">
                    <div className="icon-bg">📈</div>
                  </div>
                  <div className="feature-content">
                    <h4>Business Growth</h4>
                    <p>Increase efficiency, reduce operational costs, and improve customer satisfaction with intelligent automation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AboutPage