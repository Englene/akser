import React from 'react'
import styles from './TopoBackground.module.css'

/**
 * TopoBackground Component
 * Viser subtile topografiske konturlinjer som bakgrunnselement
 * Bruker CSS gradients for ytelse og minimal DOM overhead
 * Fast posisjon på z-index: 0 (under grid og innhold)
 */
function TopoBackground({
  variant = 'standard',  // 'standard' | 'dense' | 'sparse'
  animated = false       // Aktiver subtil parallax/drift
}) {
  return (
    <div className={`${styles.topoBackground} ${animated ? styles.animated : ''} ${styles[variant]}`}>
      {/* Flere lag for dybde */}
      <div className={styles.layerPrimary} />
      <div className={styles.layerSecondary} />
      <div className={styles.layerAccent} />
    </div>
  )
}

export default TopoBackground
