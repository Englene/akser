import React from 'react'
import DotPattern from './DotPattern'
import styles from './GridCard.module.css'

/**
 * GridCard Component
 * Card container with integrated grid visualization
 * Features: dot grid pattern, corner markers, coordinate display, center lines on hover
 *
 * @param {Object} props
 * @param {'default' | 'highlighted' | 'interactive'} props.variant - Card style variant
 * @param {'compact' | 'normal' | 'comfortable'} props.padding - Padding size
 * @param {'sparse' | 'normal' | 'dense'} props.gridDensity - Dot grid density
 * @param {boolean} props.showGrid - Show dot grid pattern (default: true)
 * @param {boolean} props.showCoordinates - Show coordinate label (default: false)
 * @param {boolean} props.showCenterLines - Show center lines on hover (default: true)
 * @param {number} props.cornerSize - Size of corner markers in px (default: 12)
 * @param {number} props.x - X coordinate for display
 * @param {number} props.y - Y coordinate for display
 * @param {React.ReactNode} props.children - Card content
 * @param {Function} props.onClick - Click handler (makes card interactive)
 * @param {string} props.className - Additional CSS classes
 */
function GridCard({
  variant = 'default',
  padding = 'normal',
  gridDensity = 'normal',
  showGrid = true,
  showCoordinates = false,
  showCenterLines = true,
  cornerSize = 12,
  x,
  y,
  children,
  onClick,
  className = '',
  ...props
}) {
  // Determine grid cell size based on density
  const gridCellSize = {
    sparse: 48,
    normal: 24,
    dense: 16
  }[gridDensity]

  // Generate unique pattern ID for this card instance
  const patternId = React.useId()

  // Combine class names
  const cardClasses = [
    styles.gridCard,
    variant !== 'default' ? styles[variant] : '',
    padding !== 'normal' ? styles[padding] : '',
    gridDensity !== 'normal' ? styles[gridDensity] : '',
    onClick ? styles.interactive : '',
    className
  ].filter(Boolean).join(' ')

  // Interactive props
  const interactiveProps = onClick ? {
    onClick,
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick(e)
      }
    }
  } : {}

  return (
    <div
      className={cardClasses}
      {...interactiveProps}
      {...props}
    >
      {/* Corner Markers REMOVED - Minimalistisk */}

      {/* Dot Grid Pattern */}
      {showGrid && (
        <svg
          className={styles.gridPattern}
          aria-hidden="true"
        >
          <DotPattern
            id={patternId}
            cellSize={gridCellSize}
            dotSize={1}
            opacity={0.1}
          />
          <rect
            width="100%"
            height="100%"
            fill={`url(#${patternId})`}
          />
        </svg>
      )}

      {/* Coordinates REMOVED - shown on cursor instead */}

      {/* Card Content */}
      <div className={styles.content}>
        {children}
      </div>

      {/* Center Lines (visible on hover) */}
      {showCenterLines && (
        <svg
          className={styles.centerLines}
          aria-hidden="true"
        >
          <line x1="50%" y1="0" x2="50%" y2="100%" />
          <line x1="0" y1="50%" x2="100%" y2="50%" />
        </svg>
      )}
    </div>
  )
}

export default GridCard
