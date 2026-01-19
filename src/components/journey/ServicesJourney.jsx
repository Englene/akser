import React, { useState, useEffect } from 'react'
import TopoScrollBackground from './TopoScrollBackground'
import ScrollTerrainViewer from './ScrollTerrainViewer'
import { serviceCards } from '../../data/servicesContent'
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
  const [heroScrolled, setHeroScrolled] = useState(false)

  // Track scroll for terrain camera movement
  // Progress starts at 0 AFTER hero section
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('services-journey')
      const hero = document.getElementById('hero-content')

      if (section && hero) {
        const sectionRect = section.getBoundingClientRect()
        const heroRect = hero.getBoundingClientRect()

        // Sjekk om hero er scrollet forbi (bottom er ut av synlig område)
        const heroFullyScrolled = heroRect.bottom <= 0

        setHeroScrolled(heroFullyScrolled)

        // Scroll progress starter etter hero (når hero er scrollet forbi)
        if (heroFullyScrolled) {
          // Hero er scrollet forbi - start progress
          const contentHeight = section.scrollHeight - window.innerHeight - hero.offsetHeight
          const scrolled = -sectionRect.top - hero.offsetHeight
          const progress = Math.max(0, Math.min(100, (scrolled / contentHeight) * 100))
          setScrollProgress(progress)
        } else {
          // Hero er fortsatt synlig - progress = 0
          setScrollProgress(0)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="services-journey" className={styles.journeySection}>
      {/* 3D Terrain Background - Fullscreen */}
      <div className={styles.terrainBackground}>
        <React.Suspense fallback={null}>
          <ScrollTerrainViewer
            scrollProgress={scrollProgress}
            showMarkers={heroScrolled}
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
              src="/images/akser_logo_svart.png"
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
              <span className={styles.pointText}>AI-drevet CAD-generering</span>
            </div>
          </div>
        </div>

        {/* Scroll snap points - info vises som 3D-kort på terrenget */}
        {heroScrolled ? (
          // 11 punkter totalt (6 service + 5 mellompunkter)
          // Punkt 0, 2, 4, 6, 8, 10 = service locations (zoom in)
          // Punkt 1, 3, 5, 7, 9 = mellompunkter (zoom ut bird view)
          Array.from({ length: 11 }).map((_, globalIndex) => (
            <div key={globalIndex} className={styles.cardSnapPoint} />
          ))
        ) : (
          // Før hero er scrollet forbi - bare vis spacer
          <div style={{ height: '50vh' }} />
        )}
      </div>
    </section>
  )
}

export default ServicesJourney
