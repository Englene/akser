import { useEffect, useState } from 'react'
import styles from './ServicesJourney.module.css'

/**
 * TopoScrollBackground - Topografiske linjer med parallax-effekt
 * Samme stil som TopoBackground fra header, men animeres basert på scroll
 */
function TopoScrollBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY * 0.3) // parallax factor (0.3 = subtil)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={styles.topoScrollBackground}
      style={{ transform: `translateY(${scrollY}px)` }}
    >
      <div className={styles.layerPrimary} />
      <div className={styles.layerSecondary} />
      <div className={styles.layerAccent} />
    </div>
  )
}

export default TopoScrollBackground
