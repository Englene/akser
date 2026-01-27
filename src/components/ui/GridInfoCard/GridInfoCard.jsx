import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import styles from './GridInfoCard.module.css'

/**
 * GridInfoCard - Premium info card med grid-pattern integration
 *
 * Features:
 * - Dot grid background pattern
 * - Coordinate labels i hjørner
 * - Grid lines on hover (subtle emerald lines)
 * - Simple number badge med corner brackets
 * - Active state highlighting
 *
 * @param {object} coordinates - Corner coordinates (tl, tr, bl, br)
 * @param {string} number - Optional number badge (e.g., "01")
 * @param {string} variant - Card variant: 'default', 'highlighted', 'interactive'
 * @param {boolean} isActive - Whether card is currently in viewport
 */
function GridInfoCard({
  children,
  variant = 'default',
  coordinates = { tl: '[0,0]', tr: '[1,0]', bl: '[0,1]', br: '[1,1]' },
  className = '',
  isActive = false
}) {
  return (
    <motion.div
      className={`${styles.card} ${styles[variant]} ${isActive ? styles.active : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: variant === 'interactive' ? 1.02 : 1.0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dot grid background pattern */}
      <div className={styles.dotPattern} />

      {/* Corner coordinates */}
      <span className={styles.coordTL}>{coordinates.tl}</span>
      <span className={styles.coordTR}>{coordinates.tr}</span>
      <span className={styles.coordBL}>{coordinates.bl}</span>
      <span className={styles.coordBR}>{coordinates.br}</span>

      {/* Grid lines on hover */}
      <div className={styles.gridLines}>
        <div className={styles.verticalLine} />
        <div className={styles.horizontalLine} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </motion.div>
  )
}

GridInfoCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'highlighted', 'interactive']),
  coordinates: PropTypes.shape({
    tl: PropTypes.string,
    tr: PropTypes.string,
    bl: PropTypes.string,
    br: PropTypes.string
  }),
  className: PropTypes.string,
  isActive: PropTypes.bool
}

GridInfoCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'highlighted', 'interactive']),
  coordinates: PropTypes.shape({
    tl: PropTypes.string,
    tr: PropTypes.string,
    bl: PropTypes.string,
    br: PropTypes.string
  }),
  number: PropTypes.string,
  className: PropTypes.string
}

export default GridInfoCard
