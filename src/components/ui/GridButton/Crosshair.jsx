import React from 'react'

/**
 * Crosshair Component
 * Renders a small crosshair marker on the left side of buttons
 * Minimal grid marker
 *
 * @param {string} className - Additional CSS class
 */
function Crosshair({ className = '' }) {
  return (
    <g className={`grid-crosshair ${className}`}>
      {/* Vertical line */}
      <line
        x1="10"
        y1="3"
        x2="10"
        y2="17"
        strokeLinecap="round"
      />

      {/* Horizontal line */}
      <line
        x1="3"
        y1="10"
        x2="17"
        y2="10"
        strokeLinecap="round"
      />

      {/* Small center circle */}
      <circle
        cx="10"
        cy="10"
        r="2.5"
        fill="none"
      />
    </g>
  )
}

export default Crosshair
