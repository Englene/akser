import React, { useState, useEffect } from 'react'
import styles from './OrganicGrid.module.css'

/**
 * OrganicGrid Component
 * 4×4 asymmetric grid system with intersection markers
 * Always visible at 20% opacity
 * Grid positions: 15%, 38%, 62%, 85% (vertical) × 20%, 40%, 60%, 80% (horizontal)
 */

// Only show the 4 main grid lines (not edges at 0% and 100%)
const VERTICAL_LINES = ['15%', '38%', '62%', '85%']
const HORIZONTAL_LINES = ['20%', '40%', '60%', '80%']

function OrganicGrid() {
  const [blueprintMode, setBlueprintMode] = useState(false)

  // Blueprint mode toggle: Ctrl+Shift+G
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        e.preventDefault()
        setBlueprintMode(prev => !prev)
        console.log(`Blueprint mode: ${!blueprintMode ? 'ON' : 'OFF'}`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [blueprintMode])

  return (
    <div className={`${styles.gridOverlay} ${blueprintMode ? styles.blueprintMode : ''}`}>
      {/* Vertikale linjer - asymmetrisk plassering */}
      {VERTICAL_LINES.map((position, i) => (
        <div
          key={`v-${i}`}
          className={styles.verticalLine}
          style={{ left: position }}
        />
      ))}

      {/* Horisontale linjer */}
      {HORIZONTAL_LINES.map((position, i) => (
        <div
          key={`h-${i}`}
          className={styles.horizontalLine}
          style={{ top: position }}
        />
      ))}

      {/* Intersection markers - 16 dots at grid crosspoints */}
      {VERTICAL_LINES.map((x, i) =>
        HORIZONTAL_LINES.map((y, j) => (
          <div
            key={`intersection-${i}-${j}`}
            className={styles.intersection}
            style={{ left: x, top: y }}
          />
        ))
      )}
    </div>
  )
}

export default OrganicGrid
