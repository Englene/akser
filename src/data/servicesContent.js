/**
 * Tjenesteinnhold for Akser landingsside
 * Norsk tekst for alle tjenestekort og seksjoner
 */

export const serviceCards = [
  {
    id: '01',
    title: 'Fallrettigheter & Vannkraft',
    description: 'Identifisering av vannkraftpotensial i Norge. Vi analyserer fallrettigheter, beregner energiproduksjon og vurderer økonomisk potensial for småkraftverk (1-5 MW).',
    featured: true
  },
  {
    id: '02',
    title: 'GIS-Kartlegging',
    description: 'Avansert GIS-teknologi for å identifisere muligheter i terreng. DEM-prosessering, nedbørsfeltanalyse og topografisk kartlegging med høy presisjon.',
    featured: false
  },
  {
    id: '03',
    title: 'Terrenganalyse',
    description: 'Detaljert analyse av høydedata, skråningsgrad, og topografiske forhold. Satellittbilder kombinert med LiDAR-data for presis terrengmodellering.',
    featured: false
  },
  {
    id: '04',
    title: 'Automatisert Design',
    description: 'AI-drevet CAD-generering for vannkraftanlegg. Automatisk dimensjonering av rørgater, turbin-valg og kraftstasjonsplassering basert på terrengdata.',
    featured: true
  },
  {
    id: '05',
    title: 'Kraftberegninger',
    description: 'Nøyaktige beregninger av energiproduksjon, turbinvalg og økonomisk modellering. Over 20 års erfaring med norske vassdrag.',
    featured: false
  },
  {
    id: '06',
    title: 'Bærekraftsanalyse',
    description: 'Datamodeller som balanserer økonomisk utvikling med miljøhensyn. Vurdering av påvirkning på fisk, landskap og biologisk mangfold.',
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
    category: 'Vannkraft',
    tools: ['Kraftberegninger', 'Turbin-dimensjonering', 'Rørgate-design', 'Økonomisk modellering']
  },
  {
    category: 'Automatisering',
    tools: ['Python/NumPy', 'CAD-generering', 'AI-optimalisering', 'Batch-prosessering']
  }
]
