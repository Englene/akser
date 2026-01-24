import React from 'react'
import GridButton from '../components/ui/GridButton'
import GridCard from '../components/ui/GridCard'
import { OrganicGrid } from '../components/layout'
import TopoBackground from '../components/layout/TopoBackground'
import { ServicesJourney } from '../components/journey'
import { serviceCards, technologyStack } from '../data/servicesContent'
import styles from './Home.module.css'

/**
 * Akser - Landingsside
 * Simple vertical flow layout
 */
function Home() {
  return (
    <>
      {/* <CoordinateDisplay /> */}
      <TopoBackground variant="standard" animated={false} />
      <OrganicGrid />

      <div className={styles.landingPage}>

        {/* Services Journey - Kartinspirert Scroll-Flow */}
        <ServicesJourney />

        {/* Spacer to prevent next section from appearing during scroll */}
        <div style={{ height: '50vh' }} />

        {/* Technology Stack Section */}
        <section className={styles.techSection}>
          <div className={styles.techContainer}>
            <h2 className="text-hero">Teknologi & Verktøy</h2>
            <p className={styles.techDescription}>
              Vi bruker industristandarder innen GIS, terrenganalyse og vannkraftdesign
            </p>

            <div className={styles.techGrid}>
              {technologyStack.map((category, idx) => (
                <GridCard key={idx} variant="default" padding="comfortable">
                  <h4 className={styles.techCategory}>{category.category}</h4>
                  <ul className={styles.techList}>
                    {category.tools.map((tool, i) => (
                      <li key={i} className={styles.techItem}>
                        <span className={styles.techBullet}>•</span>
                        {tool}
                      </li>
                    ))}
                  </ul>
                </GridCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
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
