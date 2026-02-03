import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticlesWaves from '../effects/ParticlesWaves'
import GridButton from '../ui/GridButton'
import GridInfoCard from '../ui/GridInfoCard'
import GridDivider from '../ui/GridDivider'
import AnimatedStat from '../ui/AnimatedStat'
import { serviceCards } from '../../data/servicesContent'
import styles from './ServicesJourney.module.css'

// Grupper tjenester etter group-property
const energyServices = serviceCards.filter(s => s.group === 'energy')
const gridServices = serviceCards.filter(s => s.group === 'grid')
const solutionServices = serviceCards.filter(s => s.group === 'solutions')
const supportServices = serviceCards.filter(s => s.group === 'support')

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
      {/* 3D Particles Waves Background */}
      <ParticlesWaves
        scrollProgress={scrollProgress / 100}
        color="#10b981"
        opacity={0.32}
        waveSpeed={0.9}
        waveAmplitude={1.1}
        gridSize={{ width: 44, height: 30 }}
      />

      {/* Content */}
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

          {/* Stats - Social proof */}
          <div className={styles.heroStats}>
            <AnimatedStat value={5934} suffix="+" label="Energilokasjoner Analysert" />
            <AnimatedStat value={10000} suffix="GWh+" label="Identifisert Kapasitet (Vannkraft)" />
            <AnimatedStat value={1500} suffix="+" label="Kostnadsanalyser & Nettrisiko-vurderinger" />
          </div>
        </div>

        {/* Energikilder Section */}
        <section className={styles.serviceSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>01</span>
            <h2 className={styles.sectionTitle}>Energikilder</h2>
            <p className={styles.sectionSubtitle}>Screening og analyse av kraftproduksjon</p>
          </div>
          <div className={styles.serviceGrid3}>
            {energyServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GridInfoCard variant="default" className={styles.equalHeightCard}>
                  <div className={styles.serviceCardImage}>
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className={styles.serviceCardContent}>
                    <div className={styles.serviceCardHeader}>
                      <span className={styles.serviceId}>{String(index + 1).padStart(2, '0')}</span>
                      {service.status === 'I utvikling' && (
                        <span className={styles.statusBadge}>{service.status}</span>
                      )}
                    </div>
                    <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                    <p className={styles.serviceCardDesc}>{service.description}</p>
                  </div>
                </GridInfoCard>
              </motion.div>
            ))}
          </div>
        </section>

        <GridDivider variant="axis" />

        {/* Nett & Infrastruktur Section */}
        <section className={styles.serviceSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>02</span>
            <h2 className={styles.sectionTitle}>Nett & Infrastruktur</h2>
            <p className={styles.sectionSubtitle}>Analyse av tilknytning og kapasitet</p>
          </div>
          <div className={styles.serviceGrid2}>
            {gridServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GridInfoCard variant="default" className={styles.equalHeightCard}>
                  <div className={styles.serviceCardImage}>
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className={styles.serviceCardContent}>
                    <div className={styles.serviceCardHeader}>
                      <span className={styles.serviceId}>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                    <p className={styles.serviceCardDesc}>{service.description}</p>
                  </div>
                </GridInfoCard>
              </motion.div>
            ))}
          </div>
        </section>

        <GridDivider variant="axis" />

        {/* Sammensatte Løsninger Section */}
        <section className={styles.serviceSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>03</span>
            <h2 className={styles.sectionTitle}>Sammensatte Løsninger</h2>
            <p className={styles.sectionSubtitle}>Helhetlige analyser for spesifikke behov</p>
          </div>
          <div className={styles.serviceGrid2}>
            {solutionServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GridInfoCard variant="primary" className={styles.equalHeightCard}>
                  <div className={styles.serviceCardImage}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className={service.imageRotate ? styles.rotateImage : ''}
                    />
                  </div>
                  <div className={styles.serviceCardContent}>
                    <div className={styles.serviceCardHeader}>
                      <span className={styles.serviceId}>{String(index + 1).padStart(2, '0')}</span>
                      {service.targetAudience && (
                        <span className={styles.audienceBadge}>{service.targetAudience.split(',')[0]}</span>
                      )}
                    </div>
                    <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                    <p className={styles.serviceCardDesc}>{service.description}</p>
                  </div>
                </GridInfoCard>
              </motion.div>
            ))}
          </div>
        </section>

        <GridDivider variant="axis" />

        {/* Støttetjenester Section - Kompakt */}
        <section className={styles.serviceSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>04</span>
            <h2 className={styles.sectionTitle}>Støttetjenester</h2>
            <p className={styles.sectionSubtitle}>Videre prosjektutvikling og dokumentasjon</p>
          </div>
          <div className={styles.supportGrid}>
            {supportServices.map((service, index) => (
              <motion.div
                key={service.id}
                className={styles.supportItem}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <span className={styles.supportId}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.supportContent}>
                  <h4 className={styles.supportTitle}>{service.title}</h4>
                  <p className={styles.supportDesc}>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default ServicesJourney
