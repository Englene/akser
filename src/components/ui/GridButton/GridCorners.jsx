import React from 'react'

/**
 * GridCorners Component
 * Renders L-shaped corner markers for grid-integrated UI elements
 *
 * @param {number} size - Size of the corner markers in pixels (default: 8)
 * @param {string} className - Additional CSS class
 */
function GridCorners({ size = 8, className = '' }) {
  return (
    <g className={`grid-corners ${className}`}>
      {/* Top-left corner */}
      <path
        className="grid-corner grid-corner-tl"
        d={`M 0 ${size} L 0 0 L ${size} 0`}
        fill="none"
        strokeLinecap="square"
      />

      {/* Top-right corner */}
      <path
        className="grid-corner grid-corner-tr"
        d={`M calc(100% - ${size}) 0 L 100% 0 L 100% ${size}`}
        fill="none"
        strokeLinecap="square"
      />

      {/* Bottom-right corner */}
      <path
        className="grid-corner grid-corner-br"
        d={`M 100% calc(100% - ${size}) L 100% 100% L calc(100% - ${size}) 100%`}
        fill="none"
        strokeLinecap="square"
      />

      {/* Bottom-left corner */}
      <path
        className="grid-corner grid-corner-bl"
        d={`M ${size} 100% L 0 100% L 0 calc(100% - ${size})`}
        fill="none"
        strokeLinecap="square"
      />
    </g>
  )
}

export default GridCorners
