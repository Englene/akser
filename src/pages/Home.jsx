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

        {/* Hydropower Expertise Section - DETALJERT */}
        <section className={styles.hydropowerSection}>
          <div className={styles.splitLayout}>
            <div className={styles.contentColumn}>
              <div className={styles.sectionNumber}>04</div>
              <h2 className="text-hero">Vannkraft&shy;ekspertise</h2>
              <p className={styles.leadText}>
                Vi identifiserer og analyserer vannkraftpotensial i norsk terreng med fokus på
                småkraftverk (1-5 MW). Kombinerer GIS-teknologi med ingeniørfaglig kompetanse.
              </p>

              <div className={styles.expertiseList}>
                <div className={styles.expertiseItem}>
                  <h4>Fallrettighetsanalyse</h4>
                  <p>Identifisering av fallrettigheter og juridisk kartlegging.
                  Vurdering av konsesjonsmuligheter og eksisterende rettigheter.</p>
                </div>

                <div className={styles.expertiseItem}>
                  <h4>DEM-prosessering</h4>
                  <p>Høyoppløselig terrengmodellering med 1-10m DEM-data.
                  Automatisk delineering av nedbørsfelt og vannveier.</p>
                </div>

                <div className={styles.expertiseItem}>
                  <h4>Kraftberegninger</h4>
                  <p>Nøyaktige beregninger av energiproduksjon basert på vannføring,
                  fallhøyde og turbin-effektivitet. Historiske data fra NVE.</p>
                </div>

                <div className={styles.expertiseItem}>
                  <h4>Automatisert Design</h4>
                  <p>AI-drevet CAD-generering av rørgater, kraftstasjon og inntaksdam.
                  Optimalisering av trasé basert på terreng og geologi.</p>
                </div>
              </div>
            </div>

            <div className={styles.imageColumn}>
              <img
                src="https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80"
                alt="Norwegian waterfall - hydropower potential"
                className={styles.featureImage}
              />
              <div className={styles.imageCaption}>
                <span className="mono">120m fallhøyde</span>
                <span className="mono">2.4 MW kapasitet</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Image Section */}
        <section className={styles.featureSection}>
          <div className={styles.featureImage}>
            <img
              src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80"
              alt="Norwegian fjord from above"
            />
            <div className={styles.caption}>
              Vi kartlegger Norge fra himmel til fjord
            </div>
          </div>
        </section>

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
