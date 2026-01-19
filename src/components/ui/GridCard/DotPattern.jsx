import React from 'react'

/**
 * DotPattern Component
 * Creates an SVG dot grid pattern for GridCard backgrounds
 *
 * @param {string} id - Unique ID for the pattern (required for SVG pattern reference)
 * @param {number} cellSize - Size of grid cells in pixels (default: 24)
 * @param {number} dotSize - Radius of dots in pixels (default: 1)
 * @param {number} opacity - Opacity of dots (default: 0.1)
 */
function DotPattern({
  id,
  cellSize = 24,
  dotSize = 1,
  opacity = 0.1
}) {
  return (
    <defs>
      <pattern
        id={id}
        width={cellSize}
        height={cellSize}
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx={dotSize * 2}
          cy={dotSize * 2}
          r={dotSize}
          fill="currentColor"
          opacity={opacity}
        />
      </pattern>
    </defs>
  )
}

export default DotPattern
