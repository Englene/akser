import React from 'react'
import PropTypes from 'prop-types'
import styles from './SectionNumber.module.css'

/**
 * SectionNumber Component
 * Large section numbers (01, 02, 03) inspired by Pearl Tiling
 * 120px light gray numbers positioned at top-left
 */
function SectionNumber({ number, position = 'top-left', className = '', style = {} }) {
  const formattedNumber = String(number).padStart(2, '0')

  const positionClass = styles[`position-${position.replace('/', '-')}`] || styles['position-top-left']

  return (
    <div
      className={`${styles.sectionNumber} ${positionClass} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {formattedNumber}
    </div>
  )
}

SectionNumber.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right'
  ]),
  className: PropTypes.string,
  style: PropTypes.object
}

export default SectionNumber
