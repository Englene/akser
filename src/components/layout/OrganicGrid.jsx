import React, { useState, useEffect } from 'react'
import styles from './OrganicGrid.module.css'

/**
 * OrganicGrid Component
 * 4×4 asymmetric grid system with intersection markers
 * Scroll-reactive: Grid lines brighten when content aligns with them
 * Grid positions: 15%, 38%, 62%, 85% (vertical) × 20%, 40%, 60%, 80% (horizontal)
 */

// Only show the 4 main grid lines (not edges at 0% and 100%)
const VERTICAL_LINES = ['15%', '38%', '62%', '85%']
const HORIZONTAL_LINES = ['20%', '40%', '60%', '80%']

function OrganicGrid() {
  const [blueprintMode, setBlueprintMode] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

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

  // Scroll progress tracking for reactive grid
  useEffect(() => {
    let rafId = null

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? scrollY / docHeight : 0
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Subtle vertical shift for horizontal lines based on scroll
  const lineOffset = scrollProgress * 60 // Max 60px shift

  // Determine which lines are "active" based on scroll progress
  // Lines become active when user scrolls near them (±10% range)
  const getLineActiveClass = (index, totalLines) => {
    const lineProgress = index / (totalLines - 1)
    const diff = Math.abs(scrollProgress - lineProgress)
    return diff < 0.15 ? styles.active : '' // Active within 15% range
  }

  return (
    <div className={`${styles.gridOverlay} ${blueprintMode ? styles.blueprintMode : ''}`}>
      {/* Vertikale linjer - asymmetrisk plassering */}
      {VERTICAL_LINES.map((position, i) => (
        <div
          key={`v-${i}`}
          className={`${styles.verticalLine} ${getLineActiveClass(i, VERTICAL_LINES.length)}`}
          style={{ left: position }}
        />
      ))}

      {/* Horisontale linjer - subtle vertical shift på scroll */}
      {HORIZONTAL_LINES.map((position, i) => (
        <div
          key={`h-${i}`}
          className={`${styles.horizontalLine} ${getLineActiveClass(i, HORIZONTAL_LINES.length)}`}
          style={{
            top: `calc(${position} + ${lineOffset * (i % 2 === 0 ? 1 : -1)}px)` // Alternate direction
          }}
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
