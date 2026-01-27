import { motion } from 'framer-motion'
import styles from './TimelineConnector.module.css'

/**
 * TimelineConnector - Vertical progress line connecting service cards
 *
 * Features:
 * - Vertical emerald line between cards
 * - Progress fill animates as you scroll
 * - Matches coordinate/axes theme
 */
function TimelineConnector({ progress = 0 }) {
  return (
    <div className={styles.container}>
      {/* Background track */}
      <div className={styles.track} />

      {/* Progress fill */}
      <motion.div
        className={styles.progress}
        initial={{ height: '0%' }}
        animate={{ height: `${progress}%` }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Arrow at bottom */}
      <svg
        width="40"
        height="80"
        viewBox="0 0 40 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.arrow}
      >
        <path
          d="M20 0 L20 60 M20 60 L10 50 M20 60 L30 50"
          stroke="#10b981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default TimelineConnector
