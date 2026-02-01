import { useState, useEffect } from 'react'
import styles from './SectionNav.module.css'

/**
 * SectionNav - Axis-inspired progress indicator
 *
 * Features:
 * - Vertical axis showing all sections AND individual cards
 * - Progress fill showing scroll position
 * - Shows current card within active section (e.g., "Card 3/6")
 * - Coordinate-themed with brackets [0], [1], [2]
 */
function SectionNav({ sections }) {
  const [activeSection, setActiveSection] = useState(0)
  const [sectionProgress, setSectionProgress] = useState(0)
  const [activeCard, setActiveCard] = useState({ current: 0, total: 0 })
  const [allCards, setAllCards] = useState([]) // All cards across all sections

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const viewportCenter = window.innerHeight / 2

      let newActiveSection = -1
      let overallProgress = 0
      let cardData = []

      // Find active section and calculate overall progress
      sections.forEach((section, sectionIndex) => {
        const element = document.getElementById(section.id)
        if (!element) return

        const { offsetTop, offsetHeight } = element
        const isInSection = scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight

        // Collect all cards in this section
        const cards = element.querySelectorAll('[data-card-index]')

        if (isInSection) {
          newActiveSection = sectionIndex

          // Count cards within active section
          if (cards.length > 0) {
            // Calculate which card is active based on scroll progress within the section
            // This works for both horizontal carousels and vertical layouts
            const sectionScrollProgress = (scrollPosition - offsetTop) / offsetHeight

            // Map scroll progress to card index (0-based)
            // For 6 cards over 500vh: each card gets ~16.67% of scroll range
            const activeCardIndex = Math.floor(sectionScrollProgress * cards.length)
            const currentCard = Math.min(Math.max(activeCardIndex + 1, 1), cards.length)

            setActiveCard({ current: currentCard, total: cards.length })

            // Build cardData for sub-markers
            cards.forEach((card, cardIndex) => {
              cardData.push({
                sectionIndex,
                cardIndex,
                isActive: cardIndex === currentCard - 1,
                isPassed: cardIndex < currentCard - 1
              })
            })

            // Calculate progress based on active card
            const cardProgress = currentCard / cards.length
            overallProgress = ((sectionIndex + cardProgress) / sections.length) * 100
          } else {
            setActiveCard({ current: 0, total: 0 })

            // Fallback: use scroll position if no cards
            const sectionScrollProgress = ((scrollPosition - offsetTop) / offsetHeight) * 100
            overallProgress = ((sectionIndex + (sectionScrollProgress / 100)) / sections.length) * 100
          }
        }
      })

      setActiveSection(newActiveSection)
      setSectionProgress(overallProgress)
      setAllCards(cardData)
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
        {/* Progress fill */}
        <div
          className={styles.axisFill}
          style={{ height: `${sectionProgress}%` }}
        />

        {/* Section markers */}
        {sections.map((section, sectionIndex) => {
          const isActive = sectionIndex === activeSection
          const isPassed = sectionIndex < activeSection
          const position = (sectionIndex / (sections.length - 1)) * 100

          // Count cards in this section to calculate sub-positions
          const cardsInSection = allCards.filter(c => c.sectionIndex === sectionIndex)
          const nextSectionPosition = sectionIndex < sections.length - 1
            ? ((sectionIndex + 1) / (sections.length - 1)) * 100
            : 100

          return (
            <div key={section.id}>
              {/* Main section marker */}
              <button
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
                  {isActive && activeCard.total > 0 && (
                    <span className={styles.cardProgress}>
                      {activeCard.current}/{activeCard.total}
                    </span>
                  )}
                </span>
              </button>

              {/* Card sub-markers (small dots for each card) */}
              {isActive && cardsInSection.length > 0 && cardsInSection.map((card, cardIdx) => {
                // Position cards evenly between this section and next
                const sectionSpacing = nextSectionPosition - position
                const cardPosition = position + ((cardIdx + 1) / (cardsInSection.length + 1)) * sectionSpacing

                return (
                  <div
                    key={`${sectionIndex}-${cardIdx}`}
                    className={`${styles.subMarker} ${card.isActive ? styles.activeCard : ''} ${card.isPassed ? styles.passedCard : ''}`}
                    style={{ top: `${cardPosition}%` }}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default SectionNav
