import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import styles from './GridDivider.module.css'

/**
 * GridDivider - Section divider med grid/akse tema
 *
 * Variants:
 * - 'coordinate': Horizontal line med coordinate labels og animated dots
 * - 'axis': Centered cross (X/Y axis) med glowing intersection
 * - 'gradient': Gradient line med subtle glow effect
 */
function GridDivider({
  variant = 'coordinate',
  leftLabel = '[0, 0]',
  rightLabel = '[1, 0]',
  showDots = true
}) {
  if (variant === 'coordinate') {
    return (
      <div className={styles.coordinateDivider}>
        <span className={styles.leftCoord}>{leftLabel}</span>
        <div className={styles.line}>
          {showDots && (
            <>
              <motion.div
                className={styles.dot}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              <motion.div
                className={styles.dot}
                style={{ right: 0, left: 'auto' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
            </>
          )}
        </div>
        <span className={styles.rightCoord}>{rightLabel}</span>
      </div>
    )
  }

  if (variant === 'axis') {
    return (
      <div className={styles.axisDivider}>
        <div className={styles.axisVertical} />
        <div className={styles.axisHorizontal} />
        <motion.div
          className={styles.intersection}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    )
  }

  // gradient variant
  return (
    <div className={styles.gradientDivider}>
      <motion.div
        className={styles.gradientLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

GridDivider.propTypes = {
  variant: PropTypes.oneOf(['coordinate', 'axis', 'gradient']),
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  showDots: PropTypes.bool
}

export default GridDivider
