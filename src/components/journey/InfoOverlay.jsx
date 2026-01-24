import React, { useMemo } from 'react'
import { serviceCards } from '../../data/servicesContent'
import styles from './InfoOverlay.module.css'

function InfoOverlay({ scrollProgress }) {
  const numServices = serviceCards.length
  const serviceInterval = 100 / (numServices - 1)

  // Memoize active service calculation to prevent unnecessary recalculations
  const { activeService, opacity } = useMemo(() => {
    const activeIndex = Math.round(scrollProgress / serviceInterval)
    const clampedIndex = Math.max(0, Math.min(activeIndex, numServices - 1))
    const nearestServiceProgress = clampedIndex * serviceInterval
    const distance = Math.abs(scrollProgress - nearestServiceProgress)
    const isNearService = distance < 8

    return {
      activeService: serviceCards[clampedIndex],
      opacity: isNearService ? 1 : 0
    }
  }, [scrollProgress, serviceInterval, numServices])

  return (
    <div className={styles.overlay} style={{ opacity, transition: 'opacity 0.6s ease' }}>
      <div className={styles.card}>
        <div className={styles.badge}>{activeService.id}</div>
        <h2 className={styles.title}>{activeService.title}</h2>
        <p className={styles.description}>{activeService.description}</p>
      </div>
    </div>
  )
}

// Prevent re-renders when scrollProgress hasn't changed significantly
export default React.memo(InfoOverlay)
