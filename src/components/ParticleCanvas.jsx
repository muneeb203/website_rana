import { useEffect, useRef } from 'react'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 1.5 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(145, 71, 255, 0.25)'
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      // Reduce particle count for better performance
      const particleCount = Math.min(
        Math.floor((canvas.width * canvas.height) / 25000), // Increased divisor
        50 // Maximum particle limit
      )
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    let lastFrameTime = 0
    const targetFPS = 30 // Reduced from 60fps for better performance
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate)
      
      // Throttle animation to target FPS
      if (currentTime - lastFrameTime < frameInterval) {
        return
      }
      lastFrameTime = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections with reduced complexity
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(145, 71, 255, ${0.1 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })
    }

    resizeCanvas()
    init()
    animate(0) // Start with timestamp 0

    const handleResize = () => {
      clearTimeout(window.resizeTimeout)
      window.resizeTimeout = setTimeout(() => {
        resizeCanvas()
        init()
      }, 150) // Debounce resize
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      clearTimeout(window.resizeTimeout)
    }
  }, [])

  return <canvas ref={canvasRef} id="particleCanvas" />
}

export default ParticleCanvas
