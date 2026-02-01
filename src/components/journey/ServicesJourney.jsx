import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopoScrollBackground from './TopoScrollBackground'
import ParticlesWaves from '../effects/ParticlesWaves'
import ServiceSteps from './ServiceSteps'
import ParallaxLayer from '../effects/ParallaxLayer'
import GridButton from '../ui/GridButton'
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
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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
        color="#10b981"           // Emerald-500 (stronger)
        opacity={0.32}            // More visible
        waveSpeed={0.9}           // More motion
        waveAmplitude={1.1}       // Larger waves
        gridSize={{ width: 44, height: 30 }}
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

          <h1 className={`text-massive ${styles.heroTitle}`}>
            {['Tidlig beslutningsstøtte', 'for kraftkrevende prosjekter'].map((line, i) => (
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
                {line}
              </motion.span>
            ))}
          </h1>
          <p className={styles.heroSubtext}>
            Vi kombinerer energi, nett og infrastruktur for å finne lokasjoner med
            høy realiseringssannsynlighet.
          </p>

          <div className={styles.heroActions}>
            <GridButton variant="primary" size="large" onClick={() => scrollToSection('cta-section')}>
              Book en demo
            </GridButton>
          </div>
        </div>

        {/* Service steps - vertical flow with progression */}
        <ServiceSteps />
      </div>
    </section>
  )
}

export default ServicesJourney
