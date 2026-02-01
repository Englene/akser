import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopoScrollBackground from './TopoScrollBackground'
import ParticlesWaves from '../effects/ParticlesWaves'
import ServiceSteps from './ServiceSteps'
import ParallaxLayer from '../effects/ParallaxLayer'
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
      {/* LAYER 1 - 3D Particles Waves Background (fixed, no parallax transform) */}
      <ParticlesWaves
        scrollProgress={scrollProgress / 100}  // Normalize to 0-1
        color="#10b981"           // Emerald-500
        opacity={0.35}            // Slightly more visible
        waveSpeed={0.8}           // Slightly slower for smoother motion
        waveAmplitude={1.5}       // Larger waves for dramatic effect
        gridSize={{ width: 60, height: 40 }}
      />

      {/* LAYER 2 - Midground (0.6x speed - medium parallax) */}
      <ParallaxLayer speed={0.6}>
        <TopoScrollBackground />
      </ParallaxLayer>

      {/* LAYER 3 - Foreground (1x speed - normal scroll, no parallax wrapper) */}
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
            {['Datadrevet', 'Beslutningsstøtte', 'for Kraftkrevende', 'Virksomhet'].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1] // Vercel easing
                }}
                style={{ display: 'block' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className={styles.heroSubtext}>
            Vi identifiserer hvor kraftkrevende prosjekter faktisk kan realiseres –
            basert på energi, nett, infrastruktur og risiko.
          </p>

          <div className={styles.heroPoints}>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>01</span>
              <span className={styles.pointText}>Energi & Produksjonsprofiler (Vann + Sol)</span>
            </div>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>02</span>
              <span className={styles.pointText}>Nettrisikoanalyse & Infrastruktur</span>
            </div>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>03</span>
              <span className={styles.pointText}>Datasenter & Kraftkrevende Industri</span>
            </div>
            <div className={styles.heroPoint}>
              <span className={styles.pointNumber}>04</span>
              <span className={styles.pointText}>Kommunal Energikartlegging</span>
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
