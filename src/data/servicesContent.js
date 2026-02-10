/**
 * Tjenesteinnhold for Akser landingsside
 * Norsk tekst for alle tjenestekort og seksjoner
 *
 * Analyseområder:
 * - Kjerneanalyser: Selvstendige analyser
 * - Sammensatte analyser: Tverrfaglige analyser som kombinerer flere kjerneanalyser
 * - Videre prosjektutvikling: For lokasjoner som tas videre mot realisering
 */

export const serviceCards = [
  // ===== ENERGIKILDER =====
  {
    id: '01',
    title: 'Vannkraft – Ressursanalyse',
    description: 'Dyp innsikt i produksjonsmønstre og systemegenskaper for vannkraft. Vektlegger løsninger med lavt fotavtrykk i naturen — en viktig referanse for vurdering av energilokasjoner.',
    image: '/images/services/02-hydropower.png',
    moduleType: 'core',
    category: 'Kjerneanalyse',
    group: 'energy',
    icon: '',
    status: 'Aktiv',
    featured: true
  },
  {
    id: '02',
    title: 'Solkraft – Lokasjonsvurdering',
    description: 'Identifiserer områder med forutsetninger for lønnsom solkraft basert på terreng, solinnstråling, nettilgang og systemforhold. Prioriterer lokasjoner med lavt naturinngrep.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop&q=90',
    moduleType: 'core',
    category: 'Kjerneanalyse',
    group: 'energy',
    icon: '',
    status: 'I utvikling',
    featured: true
  },
  {
    id: '09',
    title: 'Batteri – Nettstabilitet og Systemfleksibilitet',
    description: 'Analyse av lokasjoner der batteriløsninger kan styrke nettstabilitet og systemfleksibilitet. Avdekker hvor energilagring gir størst verdi for nettbalanse og langsiktig lønnsomhet.',
    image: '/images/services/battery-park.png',
    moduleType: 'core',
    category: 'Kjerneanalyse',
    group: 'energy',
    icon: '',
    status: 'I utvikling',
    featured: true
  },

  // ===== NETT & INFRASTRUKTUR =====
  {
    id: '03',
    title: 'Nettrisikoanalyse',
    description: 'Avdekker reell sannsynlighet for vellykket nettilknytning — ikke bare fysisk nærhet. Viser hvor flaskehalsene ligger og hvilke lokasjoner som har bedre forutsetninger.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop&q=90',
    moduleType: 'core',
    category: 'Kjerneanalyse',
    group: 'grid',
    icon: '',
    status: 'Aktiv',
    featured: true
  },
  {
    id: '04',
    title: 'Produksjonsprofiler og Minimumslast',
    description: 'Gir innsikt i energitilgang over tid — ikke bare årsproduksjon. Kritisk for aktører som trenger forutsigbar effekt, der sesongvariasjon og minimumslast avgjør lokasjonens reelle verdi.',
    image: '/images/services/03-dam.jpg',
    moduleType: 'core',
    category: 'Kjerneanalyse',
    group: 'grid',
    icon: '',
    status: 'Aktiv',
    featured: true
  },

  // ===== SAMMENSATTE ANALYSER =====
  {
    id: '05',
    title: 'Datasenterlokasjoner',
    description: 'Avdekker hvilke lokasjoner som har reelle forutsetninger for datasentre — energi, nett, fiber, kjøling og areal vurderes samlet, med vekt på lavt naturinngrep.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=90',
    moduleType: 'combined',
    category: 'Sammensatt analyse',
    group: 'solutions',
    icon: '',
    status: 'Aktiv',
    targetAudience: 'Datasentereiere, AI/tech-selskaper, energiselskaper',
    featured: true
  },
  {
    id: '06',
    title: 'Kommunal Energikartlegging',
    description: 'Helhetlig oversikt over energipotensial, arealkonflikt og strategiske muligheter. Synliggjør hvilke områder som bør prioriteres — og hvilke som har vesentlige begrensninger.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&h=800&fit=crop&q=90',
    imageRotate: false,
    moduleType: 'combined',
    category: 'Sammensatt analyse',
    group: 'solutions',
    icon: '',
    status: 'Aktiv',
    targetAudience: 'Kommuner, fylkeskommuner, offentlige myndigheter',
    featured: true
  },

  // ===== VIDERE PROSJEKTUTVIKLING =====
  {
    id: '07',
    title: 'Regulatorisk Vurdering og Konsesjonsstøtte',
    description: 'For prosjekter som har bestått innledende analyse tilbyr vi fordypning i planstatus, regulatoriske forutsetninger og myndighetsløp. Relevant for aktører som ønsker å ta utvalgte lokasjoner videre mot realisering.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop&q=90',
    moduleType: 'support',
    category: 'Videre prosjektutvikling',
    group: 'support',
    icon: '',
    status: 'Aktiv',
    featured: false
  },
  {
    id: '08',
    title: 'Befaring og Feltverifikasjon',
    description: 'Fysisk verifikasjon av utvalgte lokasjoner med dronekartlegging og terrengdokumentasjon. Supplerer den analytiske vurderingen med stedsspesifikke observasjoner som ikke fanges av fjernanalyse.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=800&fit=crop&q=90',
    moduleType: 'support',
    category: 'Videre prosjektutvikling',
    group: 'support',
    icon: '',
    status: 'Aktiv',
    featured: false
  }
]

export const technologyStack = [
  {
    category: 'GIS & Kartdata',
    tools: ['QGIS', 'ArcGIS', 'GDAL/OGR', 'PostGIS', 'LiDAR-prosessering']
  },
  {
    category: 'Terrenganalyse',
    tools: ['DEM-modellering', 'Nedbørsfeltanalyse', 'Skråningsberegning', 'Satellittdata']
  },
  {
    category: 'Energi & Produksjon',
    tools: ['Kraftberegninger', 'Produksjonsprofiler', 'Minimumslast-analyse', 'Økonomisk modellering']
  },
  {
    category: 'Nett & Infrastruktur',
    tools: ['Nettrisikomodellering', 'Fiberdata-analyse', 'Tilknytningskostnad', 'Kapasitetsvurdering']
  },
  {
    category: 'Klima & Kjøling',
    tools: ['Temperaturdata', 'Frikjølingspotensial', 'Flom-/ekstremvær', 'Driftsøkonomi']
  },
  {
    category: 'Automatisering',
    tools: ['Python/NumPy', 'CAD-generering', 'AI-optimalisering', 'Batch-prosessering']
  }
]

export const upcomingServices = [
  {
    id: 'multi-energy',
    title: 'Multi-energi Analyse',
    description: 'Sammenstilt vurdering av solkraft, vannkraft og energilagring — avdekker hvilken energimiks som gir best forutsetninger for ulike prosjekttyper og lokasjoner.',
    status: 'Planlagt'
  },
  {
    id: 'industry-locations',
    title: 'Industrilokasjon-analyse',
    description: 'Analyse av egnede lokasjoner for kraftkrevende industri, der energitilgang, nettkapasitet, logistikk og arbeidskraft vurderes samlet.',
    status: 'Planlagt'
  }
]
