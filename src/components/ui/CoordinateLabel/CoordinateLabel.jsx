import PropTypes from 'prop-types'
import styles from './CoordinateLabel.module.css'

/**
 * CoordinateLabel - Small label component for coordinate display
 *
 * Formats:
 * - 'bracket': [X, Y]
 * - 'degree': X°, Y°
 */
function CoordinateLabel({ x, y, format = 'bracket', size = 'small' }) {
  const label = format === 'bracket'
    ? `[${x}, ${y}]`
    : `${x}°, ${y}°`

  return (
    <span className={`${styles.label} ${styles[size]}`}>
      {label}
    </span>
  )
}

CoordinateLabel.propTypes = {
  x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  format: PropTypes.oneOf(['bracket', 'degree']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
}

export default CoordinateLabel
