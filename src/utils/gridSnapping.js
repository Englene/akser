/**
 * Grid Snapping Utilities
 * Calculations and validation for 4×4 asymmetric grid system
 * Grid positions: 15%, 38%, 62%, 85% (vertical) × 20%, 40%, 60%, 80% (horizontal)
 */

export const GRID_LINES = {
  vertical: [0, 0.15, 0.38, 0.62, 0.85, 1.0],   // 6 lines: 0%, 15%, 38%, 62%, 85%, 100%
  horizontal: [0, 0.20, 0.40, 0.60, 0.80, 1.0]  // 6 lines: 0%, 20%, 40%, 60%, 80%, 100%
}

/**
 * Calculate grid position in percentages based on row/col indices
 * @param {number} row - Row index (0-3)
 * @param {number} col - Column index (0-3)
 * @param {number} rowSpan - Number of rows to span
 * @param {number} colSpan - Number of columns to span
 * @returns {object} Position object with left, top, width, height
 */
export function calculateGridPosition(row, col, rowSpan = 1, colSpan = 1) {
  const startX = GRID_LINES.vertical[col]
  const endX = GRID_LINES.vertical[col + colSpan]
  const startY = GRID_LINES.horizontal[row]
  const endY = GRID_LINES.horizontal[row + rowSpan]

  if (startX === undefined || endX === undefined || startY === undefined || endY === undefined) {
    console.warn(`Invalid grid position: row=${row}, col=${col}, rowSpan=${rowSpan}, colSpan=${colSpan}`)
    return { left: '0vw', top: '0vh', width: '100vw', height: '100vh' }
  }

  return {
    left: `${startX * 100}vw`,    // Use vw for horizontal (viewport width)
    top: `${startY * 100}vh`,     // Use vh for vertical (viewport height)
    width: `${(endX - startX) * 100}vw`,
    height: `${(endY - startY) * 100}vh`
  }
}

/**
 * Find nearest grid line to a given percentage value
 * @param {number} value - Percentage value (0-1)
 * @param {number[]} array - Array of grid line positions
 * @returns {number} Nearest grid line position
 */
function findNearest(value, array) {
  return array.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  )
}

/**
 * Snap pixel coordinates to nearest grid intersection
 * @param {number} x - X pixel position
 * @param {number} y - Y pixel position
 * @param {object} viewport - Viewport dimensions { width, height }
 * @returns {object} Snapped position with pixel and grid coordinates
 */
export function snapToGrid(x, y, viewport) {
  const xPercent = x / viewport.width
  const yPercent = y / viewport.height

  const snappedX = findNearest(xPercent, GRID_LINES.vertical)
  const snappedY = findNearest(yPercent, GRID_LINES.horizontal)

  return {
    x: snappedX * viewport.width,
    y: snappedY * viewport.height,
    gridX: GRID_LINES.vertical.indexOf(snappedX),
    gridY: GRID_LINES.horizontal.indexOf(snappedY),
    percentX: snappedX,
    percentY: snappedY
  }
}

/**
 * Validate if an element is aligned to grid intersections
 * @param {HTMLElement} element - DOM element to validate
 * @param {number} threshold - Acceptable pixel deviation (default: 1px)
 * @returns {boolean} True if aligned, false otherwise
 */
export function validateGridAlignment(element, threshold = 5) {
  if (!element) return false

  const rect = element.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const snapped = snapToGrid(rect.left, rect.top, viewport)

  const isAlignedX = Math.abs(rect.left - snapped.x) <= threshold
  const isAlignedY = Math.abs(rect.top - snapped.y) <= threshold

  // Only warn if significantly misaligned (>5px)
  if (!isAlignedX || !isAlignedY) {
    if (process.env.NODE_ENV === 'development') {
      const deviationX = Math.abs(rect.left - snapped.x)
      const deviationY = Math.abs(rect.top - snapped.y)

      // Only log if deviation is significant (> threshold)
      if (deviationX > threshold || deviationY > threshold) {
        console.warn('Grid alignment warning:', {
          element,
          actual: { x: rect.left, y: rect.top },
          expected: { x: snapped.x, y: snapped.y },
          deviation: { x: deviationX, y: deviationY }
        })
      }
    }
  }

  return isAlignedX && isAlignedY
}

/**
 * Get human-readable grid cell description
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} rowSpan - Row span
 * @param {number} colSpan - Column span
 * @returns {string} Human-readable description
 */
export function describeGridCell(row, col, rowSpan, colSpan) {
  const position = calculateGridPosition(row, col, rowSpan, colSpan)
  return `GridCell[${row},${col}] span[${rowSpan},${colSpan}] - ${position.left} × ${position.top}, ${position.width} × ${position.height}`
}

/**
 * Responsive grid configuration
 * Different grid line positions for different breakpoints
 */
export const RESPONSIVE_GRIDS = {
  desktop: {
    minWidth: 1024,
    vertical: [0, 0.15, 0.38, 0.62, 0.85, 1.0],
    horizontal: [0, 0.20, 0.40, 0.60, 0.80, 1.0]
  },
  tablet: {
    minWidth: 768,
    maxWidth: 1023,
    vertical: [0, 0.20, 0.50, 0.80, 1.0],  // 5 lines
    horizontal: [0, 0.25, 0.50, 0.75, 1.0]
  },
  mobile: {
    maxWidth: 767,
    vertical: [0, 0.10, 0.90, 1.0],  // Just margins
    horizontal: [0, 0.30, 0.70, 1.0], // Minimal structure
    stackContent: true  // Switch to flexbox flow
  }
}

/**
 * Get current grid configuration based on viewport width
 * @param {number} width - Viewport width
 * @returns {object} Grid configuration
 */
export function getCurrentGrid(width) {
  if (width >= RESPONSIVE_GRIDS.desktop.minWidth) {
    return RESPONSIVE_GRIDS.desktop
  } else if (width >= RESPONSIVE_GRIDS.tablet.minWidth && width <= RESPONSIVE_GRIDS.tablet.maxWidth) {
    return RESPONSIVE_GRIDS.tablet
  } else {
    return RESPONSIVE_GRIDS.mobile
  }
}
