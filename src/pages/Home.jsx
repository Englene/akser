import React from 'react'
import { motion } from 'framer-motion'
import GridButton from '../components/ui/GridButton'
import GridCard from '../components/ui/GridCard'
import GridInfoCard from '../components/ui/GridInfoCard'
import GridDivider from '../components/ui/GridDivider'
// OrganicGrid removed - using only ParticlesWaves background
import ParticlesWaves from '../components/effects/ParticlesWaves'
import ScrollProgressBar from '../components/ui/ScrollProgressBar'
// HorizontalScroller removed - tech section dropped
// AnimatedStat moved to ServicesJourney
import SectionNav from '../components/navigation/SectionNav'
import { ServicesJourney } from '../components/journey'
import { UpcomingServices } from '../components/sections'
import { serviceCards } from '../data/servicesContent'
import styles from './Home.module.css'

/**
 * Akser - Landingsside
 * Simple vertical flow layout
 */
function Home() {
  // Section navigation configuration
  const sections = [
    { id: 'services-journey', label: 'Hjem' },
    { id: 'energy-section', label: 'Energi' },
    { id: 'grid-section', label: 'Nett' },
    { id: 'solutions-section', label: 'Analyser' },
    { id: 'support-section', label: 'Utvikling' },
    { id: 'analysis-section', label: 'Analyse' },
    { id: 'evaluation-section', label: 'Vurdering' },
    { id: 'differentiator-section', label: 'Akser' },
    { id: 'audiences-section', label: 'Målgrupper' },
    { id: 'upcoming-section', label: 'Kommende' },
    { id: 'cta-section', label: 'Kontakt' }
  ]
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* <CoordinateDisplay /> */}
      <ParticlesWaves
        scrollProgress={0}
        color="#10b981"
        opacity={0.26}
        waveAmplitude={1.0}
        waveSpeed={0.9}
        gridSize={{ width: 44, height: 30 }}
      />
      <ScrollProgressBar position="right" showLabel={false} />
      <SectionNav sections={sections} />

      <div className={styles.landingPage}>

        {/* Services Journey - Kartinspirert Scroll-Flow */}
        <ServicesJourney />

        {/* Two Analysis Levels Section - Moved up for better flow */}
        <section id="analysis-section" className={styles.analysisLevelsSection}>
          <h2 className="text-hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            To Analysenivåer
          </h2>
          <p className={styles.sectionDescription} style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-12)' }}>
            Analysene opererer på to nivåer, avhengig av hvor i utviklingsløpet prosjektet befinner seg.
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
                Systematisk analyse av store områder. Skiller tidlig mellom lokasjoner med reelt potensial og de som bør forkastes.
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
                <strong>Resultat:</strong> Prioritert beslutningsgrunnlag
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
                <strong>Resultat:</strong> Gjennomføringsplan med dokumentert risikovurdering
              </div>
            </GridInfoCard>
          </div>
        </section>

        <GridDivider variant="axis" />

        {/* What We Evaluate */}
        <section id="evaluation-section" className={styles.evaluationSection}>
          <h2 className="text-hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Hva vi vurderer
          </h2>
          <p className={styles.sectionDescription} style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            Fire kjernefaktorer som avgjør om et prosjekt faktisk kan realiseres.
          </p>
          <div className={styles.evaluationGrid}>
            <GridInfoCard
              variant="default"
              number="01"
              coordinates={{ tl: '[0,0]', tr: '[0,1]', bl: '[1,0]', br: '[1,1]' }}
            >
              <h3 className={styles.evaluationTitle}>Energi & Produksjon</h3>
              <p className={styles.evaluationText}>Produksjonsprofiler, minimumslast og sesongvariasjon.</p>
            </GridInfoCard>
            <GridInfoCard
              variant="default"
              number="02"
              coordinates={{ tl: '[1,0]', tr: '[1,1]', bl: '[2,0]', br: '[2,1]' }}
            >
              <h3 className={styles.evaluationTitle}>Nett & Infrastruktur</h3>
              <p className={styles.evaluationText}>Nettrisiko, tilknytning og kritisk infrastruktur.</p>
            </GridInfoCard>
            <GridInfoCard
              variant="default"
              number="03"
              coordinates={{ tl: '[2,0]', tr: '[2,1]', bl: '[3,0]', br: '[3,1]' }}
            >
              <h3 className={styles.evaluationTitle}>Lokasjon & Areal</h3>
              <p className={styles.evaluationText}>Arealbruk, terreng, naturhensyn og konflikter.</p>
            </GridInfoCard>
            <GridInfoCard
              variant="default"
              number="04"
              coordinates={{ tl: '[3,0]', tr: '[3,1]', bl: '[4,0]', br: '[4,1]' }}
            >
              <h3 className={styles.evaluationTitle}>Regulering & Risiko</h3>
              <p className={styles.evaluationText}>Planstatus, regulatoriske løp og gjennomførbarhet.</p>
            </GridInfoCard>
          </div>
        </section>

        {/* Spacer */}
        <div style={{ height: '30vh' }} />

        {/* Divider before Differentiator */}
        <GridDivider variant="axis" />

        {/* Differentiator Section - Why Akser is Different */}
        <section id="differentiator-section" className={styles.differentiatorSection}>
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
              <h3 className={styles.comparisonTitle}>Akser</h3>
              <ul className={styles.comparisonList}>
                <li>Sammenstilt analyse av energi, nett, areal og regulering</li>
                <li>"Hvilke lokasjoner kan realiseres — med lavt fotavtrykk i naturen?"</li>
                <li>Dypt analysegrunnlag bygget over tid</li>
              </ul>
            </GridInfoCard>
          </div>

          <div className={styles.principleQuote}>
            <p className={styles.quoteText}>
              "Sannsynlighet fremfor fasit. Tidlig filtrering fremfor sen presisjon."
            </p>
          </div>
        </section>

        {/* Divider between Differentiator and Mid CTA */}
        <GridDivider variant="axis" />

        {/* Mid CTA - quick contact prompt */}
        <section className={styles.midCtaSection}>
          <h3 className={styles.midCtaTitle}>Har du lokasjoner som bør vurderes?</h3>
          <p className={styles.midCtaText}>
            Vi inngår et begrenset antall samarbeid og prioriterer prosjekter der analysene kan gjøre en reell forskjell.
          </p>
          <div className={styles.midCtaButtons}>
            <GridButton variant="primary" size="large" onClick={() => scrollToSection('cta-section')}>
              Ta kontakt for vurdering
            </GridButton>
            <GridButton variant="secondary" size="large" onClick={() => scrollToSection('upcoming-section')}>
              Se kommende analyseområder
            </GridButton>
          </div>
        </section>

        {/* Divider between Mid CTA and Target Audiences */}
        <GridDivider variant="axis" />

        {/* Target Audiences Section */}
        <section id="audiences-section" className={styles.audiencesSection}>
          <h2 className="text-hero" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Hvem er analysene for?
          </h2>
          <p className={styles.sectionDescription} style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-12)' }}>
            Akser samarbeider med aktører som tar energilokalisering på alvor — og som har prosjekter der grundig analyse utgjør forskjellen.
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
                Datasentereiere og AI/Tech-selskaper
              </h3>
              <ul className={styles.audienceList}>
                <li>Hvilke lokasjoner har reelle forutsetninger for realisering?</li>
                <li>Samlet vurdering av energi, nett, fiber og kjøling</li>
                <li>Langsiktig driftsgrunnlag — ikke bare dag-1-forutsetninger</li>
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
                Kraftprodusenter og Energiselskaper
              </h3>
              <ul className={styles.audienceList}>
                <li>Dyp innsikt i vannkraft- og solkraftpotensial</li>
                <li>Nettrisiko og reelle tilknytningsforutsetninger</li>
                <li>Analysegrunnlag for investeringsbeslutninger og porteføljevurdering</li>
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
                Grunneiere og Eiendomsutviklere
              </h3>
              <ul className={styles.audienceList}>
                <li>Hva er det reelle energipotensialet på eiendommen?</li>
                <li>Analysene avdekker forutsetninger, begrensninger og muligheter</li>
                <li>Grunnlag for å vurdere om videre utvikling er forsvarlig</li>
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
                Offentlige Myndigheter
              </h3>
              <ul className={styles.audienceList}>
                <li>Helhetlig energikartlegging innenfor kommunegrenser</li>
                <li>Analysegrunnlag for planarbeid og strategisk prioritering</li>
                <li>Innsikt som støtter energipolitiske beslutninger</li>
              </ul>
            </GridInfoCard>
          </div>
        </section>

        {/* Divider between Audiences and Upcoming */}
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
            Har du prosjekter som krever grundigere analysegrunnlag?
          </h2>
          <p className={styles.ctaText}>
            Vi samarbeider med et begrenset antall aktører som ønsker dypere innsikt i energilokasjoner for fornybare prosjekter.
          </p>
          <div className={styles.ctaButtons}>
            <GridButton variant="primary" size="large" onClick={() => scrollToSection('services-journey')}>
              Se analyseområdene
            </GridButton>
            <GridButton variant="secondary" size="large" onClick={() => scrollToSection('cta-section')}>
              Ta kontakt
            </GridButton>
          </div>
        </section>

      </div>
    </>
  )
}

export default Home
