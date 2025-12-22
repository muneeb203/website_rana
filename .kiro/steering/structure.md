# Project Structure

## File Organization
```
/
├── src/
│   ├── components/         # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── Process.jsx
│   │   ├── Portfolio.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── ParticleCanvas.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── public/
│   └── logo.png           # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies and scripts
├── .kiro/                 # Kiro configuration and steering
└── .vscode/               # VS Code workspace settings
```

## React Component Conventions
- Functional components with hooks (useState, useEffect, useRef)
- Component-based architecture with single responsibility
- Props for data passing, state for interactivity
- Semantic HTML5 elements (nav, section, footer)
- BEM-like class naming (e.g., `hero-content`, `service-card`, `footer-brand`)

## Component Structure
- **Navbar**: Fixed navbar with mobile menu toggle (useState for menu state)
- **Hero**: Full-screen section with CTA buttons and floating visual elements
- **Services**: Grid of service cards with data mapping
- **Process**: Timeline with sequential steps
- **Portfolio**: Project showcase with tech stack tags
- **About**: Company info with stats grid
- **Contact**: Form with controlled inputs (useState for form data)
- **Footer**: Site footer with links
- **ParticleCanvas**: Animated background using Canvas API (useEffect, useRef)

## CSS Conventions
- CSS custom properties (variables) defined in `:root` for design tokens
- Gradient-based color scheme (primary, secondary, accent gradients)
- Component-based class structure (cards, buttons, sections)
- Utility classes for common patterns (e.g., `gradient-text`, `btn-primary`, `btn-secondary`)
- Mobile-first responsive design with media queries

## Navigation
- Sections use IDs for anchor navigation: `#services`, `#process`, `#portfolio`, `#about`, `#contact`
- Smooth scrolling handled by browser default behavior
