import React, { useState, useEffect } from 'react'
import TopoScrollBackground from './TopoScrollBackground'
import ScrollTerrainViewer from './ScrollTerrainViewer'
import ServiceSteps from './ServiceSteps'
import styles from './ServicesJourney.module.css'

/**
 * ServicesJourney - Minimalistisk kartinspirert scroll-seksjon
 *
 * Viser de 6 tjenestene i en vertikal "fjellreise" med:
 * - Topografiske linjer i bakgrunn (parallax)
 * - Grafisk fjell-element på venstre side (sticky)
 * - Service cards med fade-in animasjoner (høyre side)
 * - Alt i hvit/grønn design som matcher resten av siden
 */
function ServicesJourney() {
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress through services section with RAF throttling
  useEffect(() => {
    let rafId = null

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const section = document.getElementById('services-journey')
        const hero = document.getElementById('hero-content')

        if (section && hero) {
          const sectionRect = section.getBoundingClientRect()
          const heroRect = hero.getBoundingClientRect()

          // Start calculating progress after hero scrolls off screen
          if (heroRect.bottom <= 0) {
            const contentHeight = section.scrollHeight - window.innerHeight - hero.offsetHeight
            const scrolled = -sectionRect.top - hero.offsetHeight
            const progress = Math.max(0, Math.min(100, (scrolled / contentHeight) * 100))
            setScrollProgress(progress)
          } else {
            setScrollProgress(0)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="services-journey" className={styles.journeySection}>
      {/* 3D Terrain Background - Fullscreen with parallax */}
      <div className={styles.terrainBackground}>
        <React.Suspense fallback={null}>
          <ScrollTerrainViewer
            scrollProgress={scrollProgress}
            className={styles.terrainViewer}
          />
        </React.Suspense>
      </div>

      {/* Topografisk bakgrunn */}
      <TopoScrollBackground />

      {/* Content overlaid on terrain */}
      <div className={styles.servicesColumn}>
        {/* Hero content */}
        <div id="hero-content" className={styles.heroContent}>
          <header className={styles.header}>
            <img
              src="/images/akser_logo_svart.svg"
              alt="Akser"
              className={styles.logo}
            />
            <div className={styles.coordinates}>[59.9139° N, 10.7522° E]</div>
          </header>

          <h1 className="text-massive">
            Datadrevet
            <br />
            Kartanalyse
          </h1>
          <p className={styles.heroSubtext}>
            Vi identifiserer skjulte muligheter i terreng og landskap
            ved hjelp av avansert GIS-teknologi og topografisk analyse.
          </p>

          <div className={styles.heroPoints}>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>01</span>
              <span className={styles.pointText}>Vannkraftpotensial & Fallrettigheter</span>
            </div>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>02</span>
              <span className={styles.pointText}>Avansert Terrenganalyse & DEM-prosessering</span>
            </div>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>03</span>
              <span className={styles.pointText}>Konsesjonssøknader</span>
            </div>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>04</span>
              <span className={styles.pointText}>Grunneieravtaler</span>
            </div>
          </div>
        </div>

        {/* Service steps - vertical flow with progression */}
        <ServiceSteps />
      </div>
    </section>
  )
}

export default ServicesJourney
