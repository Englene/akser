import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
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
  magnetic = true,
  children,
  onClick,
  disabled = false,
  className = '',
  x,
  y,
  ...props
}) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Magnetic hover effect
  const handleMouseMove = (e) => {
    if (!magnetic || !buttonRef.current || disabled) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate distance from center (max 20% movement)
    const deltaX = (e.clientX - centerX) * 0.2
    const deltaY = (e.clientY - centerY) * 0.2

    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  // Combine class names
  const buttonClasses = [
    styles.gridButton,
    styles[variant],
    size !== 'medium' ? styles[size] : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      ref={buttonRef}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      {...props}
    >
      {/* Button Content */}
      <span className={styles.content}>
        {children}
      </span>
    </motion.button>
  )
}

export default GridButton
