/**
 * Tjenesteinnhold for Akser landingsside
 * Norsk tekst for alle tjenestekort og seksjoner
 */

export const serviceCards = [
  {
    id: '01',
    title: 'Lokasjonskartlegging & Vektordata',
    description: 'Avansert kartlegging av energiprodusjonslokasjoner ved hjelp av vektordata. Vi identifiserer optimale områder for vannkraftanlegg uten overlapp med eksisterende installasjoner eller beskyttede områder.',
    image: '/images/services/01-location-mapping.jpg',
    featured: true
  },
  {
    id: '02',
    title: 'Inntak & Kraftstasjonsoptimalisering',
    description: 'Optimalisering av plassering for inntak og kraftstasjoner basert på terrenganalyse, falltilgang, og logistiske hensyn. Avanserte algoritmer sikrer maksimal utnyttelse av vannressurser.',
    image: '/images/services/02-optimization.jpg',
    featured: true
  },
  {
    id: '03',
    title: 'Produksjonsberegninger (GWh)',
    description: 'Nøyaktige beregninger av forventet energiproduksjon i GWh basert på nedbørdata, nedbørsfelt, fallhøyde og årsvariasjon. Prognoser som grunnlag for lønnsomhetsanalyser.',
    image: '/images/services/03-power-calculation.jpg',
    featured: true
  },
  {
    id: '04',
    title: 'Konsesjonssøknader',
    description: 'Komplett utarbeidelse av konsesjonssøknader med påkrevd dokumentasjon, miljøvurderinger, og tekniske tegninger. Vi sikrer at søknadene oppfyller NVEs krav og forskrifter.',
    image: '/images/services/04-permits.jpg',
    featured: true
  },
  {
    id: '05',
    title: 'On-site Kartlegging & Drone',
    description: 'Fysisk befaring og dronekartlegging av lokasjonene. Vi dokumenterer terreng, adkomstveier, eksisterende infrastruktur, og potensielle utfordringer med høyoppløselig foto og video.',
    image: '/images/services/05-site-survey.jpg',
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
