import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import styles from './ScrollProgressBar.module.css'

/**
 * ScrollProgressBar - Vertical scroll progress indicator
 *
 * Features:
 * - Fills from top to bottom as user scrolls
 * - Smooth spring animation
 * - Grid-aligned styling
 * - Emerald color matching theme
 *
 * Position: Fixed on left or right side
 */
function ScrollProgressBar({ position = 'right', showLabel = false }) {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setProgress(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {/* Background track */}
      <div className={styles.track} />

      {/* Progress fill */}
      <motion.div
        className={styles.progress}
        style={{ scaleY }}
      />

      {/* Optional percentage label */}
      {showLabel && progress > 0 && (
        <motion.div
          className={styles.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {progress}%
        </motion.div>
      )}
    </div>
  )
}

export default ScrollProgressBar
