import React from 'react'
import PropTypes from 'prop-types'
import styles from './GridContainer.module.css'

/**
 * GridContainer Component
 * Container for GridCell components
 * Provides relative positioning context for absolute-positioned cells
 */
function GridContainer({
  className = '',
  style = {},
  fullHeight = true,
  children,
  ...rest
}) {
  const containerClassName = `${styles.gridContainer} ${
    fullHeight ? styles.fullHeight : ''
  } ${className}`

  return (
    <div
      className={containerClassName}
      style={style}
      {...rest}
    >
      {children}
    </div>
  )
}

GridContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  fullHeight: PropTypes.bool,
  children: PropTypes.node
}

export default GridContainer
