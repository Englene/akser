import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { calculateGridPosition, validateGridAlignment, describeGridCell } from '../../utils/gridSnapping'
import styles from './GridCell.module.css'

/**
 * GridCell Component
 * Positions content at specific grid intersections
 * Enforces strict snapping to 4×4 grid system
 */
function GridCell({
  row,
  col,
  rowSpan = 1,
  colSpan = 1,
  align = 'top-left',
  debug = false,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const cellRef = useRef(null)

  // Calculate grid position
  const gridPosition = calculateGridPosition(row, col, rowSpan, colSpan)

  // Validate alignment in development mode
  // Disabled: Both OrganicGrid and GridContainer are position: fixed now,
  // so they share the same coordinate system. Validation is unnecessary.
  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'development' && cellRef.current) {
  //     const isAligned = validateGridAlignment(cellRef.current)
  //
  //     if (!isAligned) {
  //       console.warn(
  //         `GridCell not aligned:`,
  //         describeGridCell(row, col, rowSpan, colSpan),
  //         cellRef.current
  //       )
  //     } else if (debug) {
  //       console.log(
  //         `✓ GridCell aligned:`,
  //         describeGridCell(row, col, rowSpan, colSpan)
  //       )
  //     }
  //   }
  // }, [row, col, rowSpan, colSpan, debug])

  const cellStyle = {
    ...gridPosition,
    ...style
  }

  const cellClassName = `${styles.gridCell} ${styles[`align-${align}`]} ${
    debug ? styles.debug : ''
  } ${className}`

  return (
    <div
      ref={cellRef}
      className={cellClassName}
      style={cellStyle}
      data-grid-cell={`[${row},${col}]`}
      data-grid-span={`${rowSpan}×${colSpan}`}
      {...rest}
    >
      {debug && (
        <div className={styles.debugLabel}>
          [{row},{col}] {rowSpan}×{colSpan}
        </div>
      )}
      {children}
    </div>
  )
}

GridCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  rowSpan: PropTypes.number,
  colSpan: PropTypes.number,
  align: PropTypes.oneOf([
    'top-left',
    'top-center',
    'top-right',
    'center-left',
    'center',
    'center-right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
  ]),
  debug: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

export default GridCell
