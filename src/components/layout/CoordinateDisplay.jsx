import { useState, useEffect } from 'react'
import styles from './CoordinateDisplay.module.css'

/**
 * CoordinateDisplay Component
 * Displays mouse coordinates that follow the cursor
 * CRITICAL: Hele nettsiden er et koordinatsystem
 *
 * @param {Object} props
 * @param {boolean} props.enabled - Show/hide coordinate display
 */
function CoordinateDisplay({ enabled = true }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [enabled])

  if (!enabled || !isVisible) return null

  return (
    <div
      className={styles.coordinateDisplay}
      style={{
        left: coords.x + 15,
        top: coords.y + 15
      }}
    >
      [{coords.x}, {coords.y}]
    </div>
  )
}

export default CoordinateDisplay
