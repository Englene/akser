/**
 * Tjenesteinnhold for Akser landingsside
 * Norsk tekst for alle tjenestekort og seksjoner
 */

export const serviceCards = [
  {
    id: '01',
    title: 'Lokasjonskartlegging & Vektordata',
    description: 'Avansert kartlegging av energiprodusjonslokasjoner ved hjelp av vektordata. Vi identifiserer optimale områder for vannkraftanlegg uten overlapp med eksisterende installasjoner eller beskyttede områder.',
    image: '/images/services/01-norway-topo.png',
    imageRotate: true,
    featured: true
  },
  {
    id: '02',
    title: 'Inntak & Kraftstasjonsoptimalisering',
    description: 'Optimalisering av plassering for inntak og kraftstasjoner basert på terrenganalyse, falltilgang, og logistiske hensyn. Avanserte algoritmer sikrer maksimal utnyttelse av vannressurser.',
    image: '/images/services/02-hydropower.png',
    featured: true
  },
  {
    id: '03',
    title: 'Produksjonsberegninger (GWh)',
    description: 'Nøyaktige beregninger av forventet energiproduksjon i GWh basert på nedbørdata, nedbørsfelt, fallhøyde og årsvariasjon. Prognoser som grunnlag for lønnsomhetsanalyser.',
    image: '/images/services/03-dam.jpg',
    featured: true
  },
  {
    id: '04',
    title: 'Kostnadsberegning & ROI-analyse',
    description: 'Detaljerte kostnadsestimater for hele prosjektet - fra inntak til nettilknytning. Vi beregner investeringskostnad, driftskostnader, og forventet avkastning (ROI) basert på strømpriser og produksjonsdata.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop&q=90',
    featured: true
  },
  {
    id: '05',
    title: 'On-site Kartlegging & Drone',
    description: 'Fysisk befaring og dronekartlegging av lokasjonene. Vi dokumenterer terreng, adkomstveier, eksisterende infrastruktur, og potensielle utfordringer med høyoppløselig foto og video.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=800&fit=crop&q=90',
    featured: true
  },
  {
    id: '06',
    title: 'Konsesjonssøknader',
    description: 'Komplett utarbeidelse av konsesjonssøknader med påkrevd dokumentasjon, miljøvurderinger, og tekniske tegninger. Vi sikrer at søknadene oppfyller NVEs krav og forskrifter.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop&q=90',
    featured: true
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
    category: 'Vannkraft',
    tools: ['Kraftberegninger', 'Turbin-dimensjonering', 'Rørgate-design', 'Økonomisk modellering']
  },
  {
    category: 'Automatisering',
    tools: ['Python/NumPy', 'CAD-generering', 'AI-optimalisering', 'Batch-prosessering']
  }
]

export const upcomingServices = [
  {
    id: 'solar',
    title: 'Solenergi-kartlegging',
    description: 'Identifisering av optimale områder for solkraftanlegg basert på solinnstråling, terreng, og nettilgang.',
    status: 'I utvikling'
  },
  {
    id: 'energy-clusters',
    title: 'Energi-clustere & Datasenter',
    description: 'Analyse av energi-tilgang og kostnader for å finne de mest lønnsomme lokasjonene for datasenter. Identifisering av clustere med tilgang på vannkraft, solkraft, og batteripakker.',
    status: 'Planlagt'
  },
  {
    id: 'cost-analysis',
    title: 'Multi-energi Kostnadsanalyse',
    description: 'Detaljert sammenligning av solkraft, batteripakker, og vannkraft. Lønnsomhetsberegninger og optimalisering av energimiks for ulike prosjekttyper.',
    status: 'Planlagt'
  },
  {
    id: 'battery-storage',
    title: 'Batteripakke-optimalisering',
    description: 'Dimensjonering og plassering av batteripakker for energilagring. Integrasjon med sol- og vannkraft for maksimal utnyttelse.',
    status: 'Planlagt'
  }
]
