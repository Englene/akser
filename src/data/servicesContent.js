/**
 * Tjenesteinnhold for Akser landingsside
 * Norsk tekst for alle tjenestekort og seksjoner
 *
 * Modulær struktur:
 * - Kjerne-moduler: Selvstendige analyser
 * - Kombinasjonsmoduler: Sammensatte analyser som kombinerer flere kjerne-moduler
 * - Støttetjenester: Videre prosjektutvikling
 */

export const serviceCards = [
  // ===== A) KJERNE-MODULER (Selvstendige analyser) =====
  {
    id: '01',
    title: 'Vannkraft – Screening og Produksjon',
    description: 'Identifiserer potensielle vannkraftlokasjoner, estimerer produksjon og kostnad. Output: Årsproduksjon (GWh), produksjonsprofiler, minimumslast, kostnadsindikatorer.',
    image: '/images/services/02-hydropower.png',
    moduleType: 'core',
    category: 'Kjerne-modul',
    icon: '💧',
    status: 'Aktiv',
    featured: true
  },
  {
    id: '02',
    title: 'Solkraft – Arealbasert Screening',
    description: 'Egnede arealer for solkraft basert på terreng, solinnstråling, og nett. Output: Egnede arealer, installert effekt, produksjonsintervall.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop&q=90',
    moduleType: 'core',
    category: 'Kjerne-modul',
    icon: '☀️',
    status: 'I utvikling',
    featured: true
  },
  {
    id: '03',
    title: 'Nettrisikoanalyse',
    description: 'Vurderer sannsynlighet for vellykket nettilknytning, ikke bare fysisk nærhet. Analyserer: Hvordan nettet er bygget, hvor presset det er, sannsynlig kostnadsnivå. Output: Nettrisikoscore, forklaring av flaskehalser.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=800&fit=crop&q=90',
    moduleType: 'core',
    category: 'Kjerne-modul',
    icon: '⚡',
    status: 'Aktiv',
    featured: true
  },
  {
    id: '04',
    title: 'Produksjonsprofiler og Minimumslast',
    description: 'Energitilgang over tid (ikke bare årsproduksjon) – kritisk for datasentre og industri. Output: Tidsserier, minimum tilgjengelig effekt, sesongvariasjon.',
    image: '/images/services/03-dam.jpg',
    moduleType: 'core',
    category: 'Kjerne-modul',
    icon: '📊',
    status: 'Aktiv',
    featured: true
  },

  // ===== B) KOMBINASJONSMODULER (Sammensatte analyser) =====
  {
    id: '05',
    title: 'Datasenterlokasjoner',
    description: 'Identifiserer lokasjoner der datasentre har høy sannsynlighet for realisering. Kombinerer: Energi (vann+sol) + Nett + Fiber + Klima/kjøling + Areal/plan. Output: Samlet egnethetsscore, minimum effekt over tid, identifiserte flaskehalser.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=90',
    moduleType: 'combined',
    category: 'Kombinasjonsmodul',
    icon: '🖥️',
    status: 'Aktiv',
    targetAudience: 'Datasentereiere, AI/tech-selskaper, energiselskaper',
    featured: true
  },
  {
    id: '06',
    title: 'Kommunal Energikartlegging',
    description: 'Helhetlig oversikt over energipotensial, konflikter og strategiske valg innen kommunegrenser. Kombinerer: Vann + Sol + Nett + Naturfare + Arealbruk. Output: Temakart, prioriterte områder, beslutningsstøtte for planarbeid.',
    image: '/images/services/01-norway-topo.png',
    imageRotate: true,
    moduleType: 'combined',
    category: 'Kombinasjonsmodul',
    icon: '🗺️',
    status: 'Aktiv',
    targetAudience: 'Kommuner, fylkeskommuner, offentlige myndigheter',
    featured: true
  },

  // ===== C) STØTTETJENESTER (Videre prosjektutvikling) =====
  {
    id: '07',
    title: 'Konsesjonssøknader og Regulatorisk Vurdering',
    description: 'Nivå 2 (Fordypning): Planstatus, reguleringsbehov, myndighetsløp. Komplett utarbeidelse av konsesjonssøknader med påkrevd dokumentasjon, miljøvurderinger, og tekniske tegninger. Pre-feasibility støtte.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop&q=90',
    moduleType: 'support',
    category: 'Støttetjeneste',
    icon: '📋',
    status: 'Aktiv',
    featured: false
  },
  {
    id: '08',
    title: 'On-site Kartlegging & Drone',
    description: 'Fysisk befaring og dronekartlegging av lokasjonene. Vi dokumenterer terreng, adkomstveier, eksisterende infrastruktur, og potensielle utfordringer med høyoppløselig foto og video.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=800&fit=crop&q=90',
    moduleType: 'support',
    category: 'Støttetjeneste',
    icon: '🚁',
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
    title: 'Multi-energi Kostnadsanalyse',
    description: 'Detaljert sammenligning av solkraft, batteripakker, og vannkraft. Lønnsomhetsberegninger og optimalisering av energimiks for ulike prosjekttyper.',
    status: 'Planlagt'
  },
  {
    id: 'battery-storage',
    title: 'Batteripakke-optimalisering',
    description: 'Dimensjonering og plassering av batteripakker for energilagring. Integrasjon med sol- og vannkraft for maksimal utnyttelse.',
    status: 'Planlagt'
  },
  {
    id: 'industry-locations',
    title: 'Industrilokasjon-analyse',
    description: 'Kartlegging av egnede lokasjoner for kraftkrevende industri (aluminium, hydrogen, etc.) med vurdering av energi, nett, transport og arbeidskraft.',
    status: 'Planlagt'
  }
]
