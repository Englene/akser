import React from 'react'
import styles from './GridButton.module.css'

/**
 * GridButton Component
 * Button with integrated grid visualization (corner markers, crosshair)
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost'} props.variant - Button style variant
 * @param {'small' | 'medium' | 'large'} props.size - Button size
 * @param {boolean} props.showCoordinates - Show coordinate label
 * @param {boolean} props.showCrosshair - Show crosshair on hover (default: true)
 * @param {number} props.cornerSize - Size of corner markers in px (default: 8)
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.x - X coordinate for display (optional)
 * @param {number} props.y - Y coordinate for display (optional)
 */
function GridButton({
  variant = 'primary',
  size = 'medium',
  showCoordinates = false,
  showCrosshair = true,
  cornerSize = 8,
  children,
  onClick,
  disabled = false,
  className = '',
  x,
  y,
  ...props
}) {
  // Combine class names
  const buttonClasses = [
    styles.gridButton,
    styles[variant],
    size !== 'medium' ? styles[size] : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {/* Button Content */}
      <span className={styles.content}>
        {children}
      </span>
    </button>
  )
}

export default GridButton
