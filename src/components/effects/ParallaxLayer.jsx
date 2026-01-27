import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * ParallaxLayer - Reusable parallax wrapper component
 *
 * Applies smooth parallax scrolling effect to children
 * Different speeds create depth illusion:
 * - 0.3x = Far background (slowest)
 * - 0.6x = Midground
 * - 1.0x = Foreground (normal speed, no parallax)
 *
 * @param {number} speed - Parallax speed multiplier (0-1, default 1 = no parallax)
 * @param {string} className - Optional CSS class
 * @param {React.ReactNode} children - Content to apply parallax to
 */
function ParallaxLayer({ children, speed = 1, className = '' }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // Skip parallax on mobile for performance
    const isMobile = window.innerWidth < 768
    if (isMobile) return

    let rafId = null

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        // Calculate offset based on scroll position and speed
        // speed < 1 creates slower movement (background effect)
        // speed = 1 is normal scroll (no parallax)
        const scrollY = window.scrollY
        const parallaxOffset = scrollY * (1 - speed)
        setOffset(parallaxOffset)
      })
    }

    // Passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial calculation
    handleScroll()

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return (
    <div
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}

ParallaxLayer.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  className: PropTypes.string
}

export default ParallaxLayer
