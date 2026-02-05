import { useState, useEffect } from 'react'
import styles from './SectionNav.module.css'

/**
 * SectionNav - Axis-inspired progress indicator
 *
 * Features:
 * - Vertical axis showing all sections
 * - Continuous progress fill based on scroll position
 * - Coordinate-themed with brackets [0], [1], [2]
 */
function SectionNav({ sections }) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Use a point near the top of viewport as trigger
      const triggerPoint = window.innerHeight * 0.3

      let bestMatch = -1
      let bestDistance = Infinity

      // Find the section whose TOP is closest to (but above) the trigger point
      sections.forEach((section, sectionIndex) => {
        const element = document.getElementById(section.id)
        if (!element) return

        const rect = element.getBoundingClientRect()

        // Only consider sections where top has passed trigger point
        // and bottom is still below it (section is visible)
        if (rect.top <= triggerPoint && rect.bottom > 0) {
          // Distance from section top to trigger point (smaller = closer)
          const distance = triggerPoint - rect.top

          // Prefer sections with smaller distance (top closer to trigger)
          if (distance < bestDistance) {
            bestDistance = distance
            bestMatch = sectionIndex
          }
        }
      })

      // Fallback to first section if nothing matches
      if (bestMatch === -1) {
        bestMatch = 0
      }

      setActiveSection(bestMatch)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className={styles.progressNav}>
      {/* Axis label */}
      <div className={styles.axisLabel}>Fremdrift</div>

      {/* Vertical axis line */}
      <div className={styles.axis}>

        {/* Section markers */}
        {sections.map((section, sectionIndex) => {
          const isActive = sectionIndex === activeSection
          const isPassed = sectionIndex < activeSection
          const position = (sectionIndex / (sections.length - 1)) * 100

          return (
            <button
              key={section.id}
              className={`${styles.marker} ${isActive ? styles.active : ''} ${isPassed ? styles.passed : ''}`}
              style={{ top: `${position}%` }}
              onClick={() => scrollToSection(section.id)}
              aria-label={`Navigate to ${section.label}`}
            >
              {/* Coordinate bracket */}
              <span className={styles.coordinate}>[{sectionIndex}]</span>

              {/* Section label */}
              <span className={styles.sectionLabel}>
                {section.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default SectionNav
