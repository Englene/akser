import React from 'react'
import { motion } from 'framer-motion'
import GridButton from '../components/ui/GridButton'
import GridCard from '../components/ui/GridCard'
import GridInfoCard from '../components/ui/GridInfoCard'
import GridDivider from '../components/ui/GridDivider'
import { OrganicGrid } from '../components/layout'
import ParticlesWaves from '../components/effects/ParticlesWaves'
import ScrollProgressBar from '../components/ui/ScrollProgressBar'
import HorizontalScroller from '../components/ui/HorizontalScroller'
import AnimatedStat from '../components/ui/AnimatedStat'
import SectionNav from '../components/navigation/SectionNav'
import { ServicesJourney } from '../components/journey'
import { UpcomingServices } from '../components/sections'
import { serviceCards, technologyStack } from '../data/servicesContent'
import styles from './Home.module.css'

/**
 * Akser - Landingsside
 * Simple vertical flow layout
 */
function Home() {
  // Section navigation configuration
  const sections = [
    { id: 'services-journey', label: 'Tjenester' },
    { id: 'tech-section', label: 'Teknologi' },
    { id: 'upcoming-section', label: 'Kommende' },
    { id: 'cta-section', label: 'Kontakt' }
  ]

  return (
    <>
      {/* <CoordinateDisplay /> */}
      <ParticlesWaves
        scrollProgress={0}
        opacity={0.3}
        waveAmplitude={1.2}
        waveSpeed={0.8}
      />
      <OrganicGrid />
      <ScrollProgressBar position="right" showLabel={false} />
      <SectionNav sections={sections} />

      <div className={styles.landingPage}>

        {/* Services Journey - Kartinspirert Scroll-Flow */}
        <ServicesJourney />

        {/* Spacer to prevent next section from appearing during scroll */}
        <div style={{ height: '50vh' }} />

        {/* Divider between Services and Stats */}
        <GridDivider
          variant="coordinate"
          leftLabel="[0.0, Tjenester]"
          rightLabel="[1.0, Statistikk]"
        />

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <AnimatedStat value={50} suffix="+" label="Prosjekter Fullført" />
            <AnimatedStat value={10} suffix="TB+" label="Data Analysert" />
            <AnimatedStat value={99.9} suffix="%" label="Oppetid" />
          </div>
        </section>

        {/* Divider between Stats and Tech */}
        <GridDivider
          variant="axis"
        />

        {/* Technology Stack Section - Horizontal Scroller */}
        <HorizontalScroller title="Teknologi & Verktøy">
          {technologyStack.map((category, idx) => (
            <GridInfoCard
              key={idx}
              variant="default"
              number={`0${idx + 1}`}
              coordinates={{
                tl: `[${idx},0]`,
                tr: `[${idx},1]`,
                bl: `[${idx + 1},0]`,
                br: `[${idx + 1},1]`
              }}
              className={styles.techCardWrapper}
            >
              <h4 className={styles.techCategory}>{category.category}</h4>
              <ul className={styles.techList}>
                {category.tools.map((tool, i) => (
                  <li key={i} className={styles.techItem}>
                    <span className={styles.techBullet}>•</span>
                    {tool}
                  </li>
                ))}
              </ul>
            </GridInfoCard>
          ))}
        </HorizontalScroller>

        {/* Divider between Tech and Upcoming */}
        <GridDivider variant="axis" />

        {/* Upcoming Services - Pipeline */}
        <UpcomingServices />

        {/* Divider before CTA */}
        <GridDivider
          variant="gradient"
        />

        {/* CTA Section */}
        <section id="cta-section" className={styles.ctaSection}>
          <h2 className="text-hero">
            Klar for å utforske?
          </h2>
          <p className={styles.ctaText}>
            La oss hjelpe deg med kartanalyse og datadrevet beslutningsstøtte
          </p>
          <div className={styles.ctaButtons}>
            <GridButton variant="primary" size="large">
              Utforsk Tjenester
            </GridButton>
            <GridButton variant="secondary" size="large">
              Kontakt Oss
            </GridButton>
          </div>
        </section>

      </div>
    </>
  )
}

export default Home
