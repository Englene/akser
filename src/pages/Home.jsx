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
            <AnimatedStat value={5934} suffix="+" label="Energilokasjoner Analysert" />
            <AnimatedStat value={10} suffix="TWh+" label="Identifisert Kapasitet (Vannkraft)" />
            <AnimatedStat value={1500} suffix="+" label="Kostnadsanalyser & Nettrisiko-vurderinger" />
          </div>
        </section>

        {/* Divider between Stats and Differentiator */}
        <GridDivider
          variant="axis"
        />

        {/* Differentiator Section - Why Akser is Different */}
        <section className={styles.differentiatorSection}>
          <h2 className="text-hero" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            Mer enn kart. Mer enn energimodeller.
          </h2>

          <div className={styles.comparisonGrid}>
            <GridInfoCard
              variant="default"
              number="01"
              coordinates={{
                tl: '[0,0]',
                tr: '[0,1]',
                bl: '[1,0]',
                br: '[1,1]'
              }}
            >
              <h3 className={styles.comparisonTitle}>Tradisjonelle Karttjenester</h3>
              <ul className={styles.comparisonList}>
                <li>Visualiserer data</li>
                <li>"Hvor er kraftnettet?"</li>
                <li>Mangler stedsspesifikk kontekst</li>
              </ul>
            </GridInfoCard>

            <GridInfoCard
              variant="default"
              number="02"
              coordinates={{
                tl: '[1,0]',
                tr: '[1,1]',
                bl: '[2,0]',
                br: '[2,1]'
              }}
            >
              <h3 className={styles.comparisonTitle}>Rene Energimodeller</h3>
              <ul className={styles.comparisonList}>
                <li>Beregner produksjon</li>
                <li>Mangler nett- og regulatorisk forståelse</li>
                <li>Isolerte vurderinger</li>
              </ul>
            </GridInfoCard>

            <GridInfoCard
              variant="primary"
              number="03"
              coordinates={{
                tl: '[2,0]',
                tr: '[2,1]',
                bl: '[3,0]',
                br: '[3,1]'
              }}
            >
              <h3 className={styles.comparisonTitle}>Akser ✓</h3>
              <ul className={styles.comparisonList}>
                <li>Kombinerer kart + energi + nett + regulering</li>
                <li>"Hvor har prosjekter faktisk høy sannsynlighet for å bli realisert?"</li>
                <li>Helhetlig gjennomførbarhetsanalyse</li>
              </ul>
            </GridInfoCard>
          </div>

          <div className={styles.principleQuote}>
            <p className={styles.quoteText}>
              "Sannsynlighet fremfor fasit. Tidlig filtrering fremfor sen presisjon."
            </p>
          </div>
        </section>

        {/* Divider between Differentiator and Tech */}
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

        {/* Divider between Tech and Target Audiences */}
        <GridDivider variant="axis" />

        {/* Target Audiences Section */}
        <section className={styles.audiencesSection}>
          <h2 className="text-hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            For hvem?
          </h2>
          <p className={styles.sectionDescription} style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-12)' }}>
            Fire primære målgrupper som drar nytte av plattformens modulære analyser.
          </p>

          <div className={styles.audiencesGrid}>
            <GridInfoCard
              variant="default"
              number="01"
              coordinates={{
                tl: '[0,0]',
                tr: '[0,1]',
                bl: '[1,0]',
                br: '[1,1]'
              }}
            >
              <h3 className={styles.audienceTitle}>
                <span className={styles.audienceIcon}>🖥️</span>
                Datasentereiere og AI/Tech-selskaper
              </h3>
              <ul className={styles.audienceList}>
                <li>Identifiser lokasjoner med høy sannsynlighet for realisering</li>
                <li>Vurder energi, nett, fiber, kjøling samlet</li>
                <li>Sammenlign lokasjoner på driftsrealitet over tid</li>
              </ul>
            </GridInfoCard>

            <GridInfoCard
              variant="default"
              number="02"
              coordinates={{
                tl: '[1,0]',
                tr: '[1,1]',
                bl: '[2,0]',
                br: '[2,1]'
              }}
            >
              <h3 className={styles.audienceTitle}>
                <span className={styles.audienceIcon}>⚡</span>
                Kraftprodusenter og Energiselskaper
              </h3>
              <ul className={styles.audienceList}>
                <li>Screening av vannkraft- og solkraftpotensial</li>
                <li>Nettrisiko og tilknytningskostnader</li>
                <li>Investeringsscreening og porteføljeoptimalisering</li>
              </ul>
            </GridInfoCard>

            <GridInfoCard
              variant="default"
              number="03"
              coordinates={{
                tl: '[2,0]',
                tr: '[2,1]',
                bl: '[3,0]',
                br: '[3,1]'
              }}
            >
              <h3 className={styles.audienceTitle}>
                <span className={styles.audienceIcon}>🏞️</span>
                Grunneiere og Eiendomsutviklere
              </h3>
              <ul className={styles.audienceList}>
                <li>Vurder egne eiendommer for energiproduksjon eller datasenter</li>
                <li>Innsikt i potensial og gjennomførbarhet</li>
                <li>Beslutningsstøtte for utviklingsprosjekter</li>
              </ul>
            </GridInfoCard>

            <GridInfoCard
              variant="default"
              number="04"
              coordinates={{
                tl: '[3,0]',
                tr: '[3,1]',
                bl: '[4,0]',
                br: '[4,1]'
              }}
            >
              <h3 className={styles.audienceTitle}>
                <span className={styles.audienceIcon}>🏛️</span>
                Offentlige Myndigheter
              </h3>
              <ul className={styles.audienceList}>
                <li>Kommunal energikartlegging</li>
                <li>Planarbeid og strategisk prioritering</li>
                <li>Beslutningsstøtte for energipolitikk</li>
              </ul>
            </GridInfoCard>
          </div>
        </section>

        {/* Divider between Audiences and Upcoming */}
        <GridDivider variant="axis" />

        {/* Upcoming Services - Pipeline */}
        <UpcomingServices />

        {/* Divider between Upcoming and Analysis Levels */}
        <GridDivider
          variant="axis"
        />

        {/* Two Analysis Levels Section */}
        <section className={styles.analysisLevelsSection}>
          <h2 className="text-hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            To Analysenivåer
          </h2>
          <p className={styles.sectionDescription} style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-12)' }}>
            Plattformen opererer på to nivåer, avhengig av hvor i utviklingsløpet prosjektet befinner seg.
          </p>

          <div className={styles.levelsGrid}>
            <GridInfoCard
              variant="primary"
              number="1"
              coordinates={{
                tl: '[0,0]',
                tr: '[0,1]',
                bl: '[1,0]',
                br: '[1,1]'
              }}
            >
              <h3 className={styles.levelTitle}>Nivå 1: Bred Screening</h3>
              <p className={styles.levelDescription}>
                Automatisert analyse av store områder. Forkaster uegnede lokasjoner tidlig og rangerer gjenværende alternativer.
              </p>
              <div className={styles.levelFeatures}>
                <div className={styles.levelFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Nasjonal og regional kartlegging</span>
                </div>
                <div className={styles.levelFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Investerings- og porteføljescreening</span>
                </div>
                <div className={styles.levelFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Kommunale oversikter</span>
                </div>
              </div>
              <div className={styles.levelOutput}>
                <strong>Output:</strong> Beslutningsstøtte og prioritering
              </div>
            </GridInfoCard>

            <GridInfoCard
              variant="default"
              number="2"
              coordinates={{
                tl: '[1,0]',
                tr: '[1,1]',
                bl: '[2,0]',
                br: '[2,1]'
              }}
            >
              <h3 className={styles.levelTitle}>Nivå 2: Fordypning av Utvalgte Lokasjoner</h3>
              <p className={styles.levelDescription}>
                Målrettet prosjektmodning med faglig vurdering. Planstatus, reguleringsbehov, og myndighetsløp.
              </p>
              <div className={styles.levelFeatures}>
                <div className={styles.levelFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Planstatus og reguleringsbehov</span>
                </div>
                <div className={styles.levelFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Vurdering mot offentlig saksbehandling</span>
                </div>
                <div className={styles.levelFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Pre-feasibility støtte</span>
                </div>
              </div>
              <div className={styles.levelOutput}>
                <strong>Output:</strong> Gjennomføringsplan med risikoreduksjon
              </div>
            </GridInfoCard>
          </div>
        </section>

        {/* Divider before CTA */}
        <GridDivider
          variant="gradient"
        />

        {/* CTA Section */}
        <section id="cta-section" className={styles.ctaSection}>
          <h2 className="text-hero">
            Klar for å flytte kritisk beslutningsinformasjon tidligere i prosessen?
          </h2>
          <p className={styles.ctaText}>
            Forkast uegnede lokasjoner raskt. Prioriter gode lokasjoner med høyere sikkerhet.
          </p>
          <div className={styles.ctaButtons}>
            <GridButton variant="primary" size="large">
              Utforsk Moduler
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
