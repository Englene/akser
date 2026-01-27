import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './AnimatedStat.module.css'

/**
 * AnimatedStat - Count-up statistic with grid styling
 *
 * Features:
 * - Animated count-up when scrolled into view
 * - Monospace font for data aesthetic
 * - Grid line accent
 * - Coordinate-themed styling
 *
 * Use for showcasing key metrics and data points
 */
function AnimatedStat({ value, suffix = '', label, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = (timestamp - startTime) / duration

      if (progress < 1) {
        setCount(Math.floor(value * progress))
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <motion.div
      ref={ref}
      className={styles.stat}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.value}>
        <span className={styles.number}>{count}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.gridLine} />
    </motion.div>
  )
}

export default AnimatedStat
