import { motion } from 'framer-motion'
import styles from './ProgressRing.module.css'

/**
 * ProgressRing - Circular progress indicator
 *
 * Features:
 * - SVG-based circular progress ring
 * - Smooth animation with Framer Motion
 * - Emerald color matching brand
 * - Wraps around number badge
 */
function ProgressRing({ progress = 0, size = 56, strokeWidth = 3 }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={styles.container} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className={styles.ring}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.track}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.progress}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  )
}

export default ProgressRing
