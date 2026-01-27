import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './HorizontalScroller.module.css'

/**
 * HorizontalScroller - Scroll-locked horizontal carousel
 *
 * Features:
 * - Viewport locks when entering section
 * - Vertical scroll drives horizontal card movement
 * - User must scroll through all cards before continuing
 * - Progress indicator shows current position
 */
function HorizontalScroller({ children, title }) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // 4 cards × 380px + 3 gaps × 32px = 1616px total
  // Translate just enough to center last card
  const x = useTransform(scrollYProgress, [0, 1], ["0px", "-1400px"])

  return (
    <section ref={containerRef} className={styles.section} id="tech-section">
      <div className={styles.stickyContainer}>
        {/* Header - fixed at top with higher z-index */}
        <div className={styles.header}>
          <h2 className="text-hero">{title}</h2>
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>

        {/* Horizontal scrolling content */}
        <div className={styles.scrollContainer}>
          <motion.div className={styles.scrollTrack} style={{ x }}>
            {children}
            {/* Buffer space after last card */}
            <div className={styles.buffer} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HorizontalScroller
