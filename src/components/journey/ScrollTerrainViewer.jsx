import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Html } from '@react-three/drei'
import * as THREE from 'three'
import { serviceCards } from '../../data/servicesContent'

/**
 * Beregn terreng-høyde på en gitt (x, z) verdens-posisjon
 */
function getTerrainHeight(worldX, worldZ) {
  // Terreng har scale 40, position [0, -200, -100], rotation [-Math.PI / 2.8, 0, 0]
  const scale = 40
  const terrainWidth = 200
  const terrainHeight = 200
  const heightScale = 40

  // Konverter fra verdens-koordinater til normalized terreng-koordinater (0-1)
  const normalizedX = (worldX / scale + terrainWidth / 2) / terrainWidth
  const normalizedZ = (worldZ / scale + terrainHeight / 2) / terrainHeight

  // Samme noise-funksjon som i generateTerrainGeometry
  const baseNoise =
    Math.sin(normalizedX * 3.8 + normalizedZ * 2.5) * 0.45 +
    Math.sin(normalizedX * 7.5 - normalizedZ * 5.2) * 0.25 +
    Math.sin(normalizedX * 14.1 + normalizedZ * 10.3) * 0.12 +
    Math.cos(normalizedX * 6.0 * normalizedZ * 7.0) * 0.33

  const peaks = Math.pow(Math.abs(baseNoise), 0.9)

  // Terreng Y-posisjon er -200, så vi legger til terreng-høyden
  return -200 + peaks * heightScale * scale
}

/**
 * Terreng-generering (samme som TerrainViewer)
 */
function generateTerrainGeometry(width = 100, height = 100, heightScale = 18) {
  const size = width * height
  const data = new Float32Array(size)

  for (let i = 0; i < size; i++) {
    const x = (i % width) / width
    const y = Math.floor(i / width) / height

    const baseNoise =
      Math.sin(x * 3.8 + y * 2.5) * 0.45 +
      Math.sin(x * 7.5 - y * 5.2) * 0.25 +
      Math.sin(x * 14.1 + y * 10.3) * 0.12 +
      Math.cos(x * 6.0 * y * 7.0) * 0.33

    const peaks = Math.pow(Math.abs(baseNoise), 0.9)
    data[i] = peaks
  }

  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    width - 1,
    height - 1
  )

  const vertices = geometry.attributes.position.array

  for (let i = 0; i < data.length; i++) {
    vertices[i * 3 + 2] = data[i] * heightScale
  }

  geometry.attributes.position.needsUpdate = true
  geometry.computeVertexNormals()

  return geometry
}

/**
 * Markør-posisjoner på terrenget (6 lokasjoner)
 * VELDIG SPREDT - lange avstander for episke reiser
 * Y-verdier beregnes basert på faktisk terreng-høyde
 */
const markerBasePositions = [
  { id: '01', x: 0, z: 0, color: '#10b981' },              // Sentrum
  { id: '02', x: -1200, z: -900, color: '#10b981' },       // Vest (veldig langt)
  { id: '03', x: 1100, z: -1100, color: '#10b981' },       // Øst (veldig langt)
  { id: '04', x: 1500, z: 800, color: '#10b981' },         // Sør-øst (veldig langt)
  { id: '05', x: -1100, z: 1300, color: '#10b981' },       // Nord-vest (veldig langt)
  { id: '06', x: 800, z: 1500, color: '#10b981' }          // Nord (veldig langt)
]

// Beregn Y-posisjoner basert på faktisk terreng
const markerPositions = markerBasePositions.map(marker => ({
  ...marker,
  position: [
    marker.x,
    getTerrainHeight(marker.x, marker.z) + 50,  // 50 enheter over terrenget
    marker.z
  ]
}))

/**
 * Kamera-posisjoner - MELLOMPUNKTER mellom hvert service kort
 * Struktur: Service 01 -> Mellompunkt -> Service 02 -> Mellompunkt -> osv
 * Totalt 11 punkter (6 service + 5 mellompunkter)
 */
const cameraPositions = []

markerPositions.forEach((marker, index) => {
  const angle = (index / markerPositions.length) * Math.PI * 2
  const markerHeight = 120

  // ZOOM INN - Naviger til info-kortet på denne lokasjonen
  cameraPositions.push({
    position: [
      marker.position[0] + Math.cos(angle) * 250,   // Orbit rundt kortet
      marker.position[1] + 300,                     // På samme høyde som kortet
      marker.position[2] + Math.sin(angle) * 250
    ],
    target: [marker.position[0], marker.position[1] + 200, marker.position[2]],  // Se rett på info-kortet
    isServicePoint: true,
    serviceIndex: index
  })

  // ZOOM UT - Mellompunkt (HØYT over terrenget med god oversikt) - IKKE etter siste punkt
  if (index < markerPositions.length - 1) {
    const nextMarker = markerPositions[index + 1]
    // Mellompunkt mellom denne og neste lokasjon
    const midX = (marker.position[0] + nextMarker.position[0]) / 2
    const midZ = (marker.position[2] + nextMarker.position[2]) / 2
    const midY = Math.max(marker.position[1], nextMarker.position[1])

    cameraPositions.push({
      position: [
        midX,
        2200,         // HØYT - men ikke så høyt at terrenget forsvinner
        midZ + 700    // Litt bak for god perspektiv
      ],
      target: [midX, midY + 150, midZ],
      isServicePoint: false
    })
  }
})

/**
 * Linear interpolation
 */
function lerp(a, b, t) {
  return a + (b - a) * t
}

/**
 * Easing function - "stopper" ved hvert punkt for lesbarhet
 * Bruker ease-in-out for smooth acceleration og deceleration
 */
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Interpoler kamera-posisjon basert på scroll progress (0-100)
 * Nå med 11 punkter (6 service + 5 mellompunkter)
 */
function interpolateCameraPosition(scrollProgress) {
  const numPositions = cameraPositions.length  // 11 punkter
  const segment = scrollProgress / (100 / (numPositions - 1))  // 0-10
  const currentIndex = Math.min(Math.floor(segment), numPositions - 1)
  const nextIndex = Math.min(currentIndex + 1, numPositions - 1)
  let t = segment - Math.floor(segment)

  // Bruk easing for ekstra smooth bevegelse - mykere overganger
  t = easeInOutCubic(t)

  const currentPos = cameraPositions[currentIndex]
  const nextPos = cameraPositions[nextIndex]

  return {
    position: [
      lerp(currentPos.position[0], nextPos.position[0], t),
      lerp(currentPos.position[1], nextPos.position[1], t),
      lerp(currentPos.position[2], nextPos.position[2], t)
    ],
    target: [
      lerp(currentPos.target[0], nextPos.target[0], t),
      lerp(currentPos.target[1], nextPos.target[1], t),
      lerp(currentPos.target[2], nextPos.target[2], t)
    ]
  }
}

/**
 * Terreng mesh - MASSIVT terreng med MYE mer geometri og detaljer
 * 200x200 vertices = 40,000 punkter for detaljert landskap
 */
function TerrainMesh() {
  const meshRef = useRef()
  // Mye høyere oppløsning: 200x200 grid for flere topper og bunner
  const geometry = useMemo(() => generateTerrainGeometry(200, 200, 40), []) // Høy oppløsning + dramatiske peaks

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.8, 0, 0]}
      position={[0, -200, -100]}  // Nærmere kameraet
      scale={40}  // 40x større terreng - balansert størrelse
    >
      <meshStandardMaterial
        color="#10b981"
        wireframe={true}
        transparent={true}
        opacity={0.5}  // Godt synlig i hero
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * Info-kort på faste lokasjoner på terrenget - ALLTID synlige
 * Kameraet navigerer til disse når du scroller
 */
function InfoCards({ scrollProgress }) {
  return (
    <group>
      {markerPositions.map((marker, index) => {
        const service = serviceCards[index]

        // Beregn hvor aktiv denne lokasjonen er basert på scroll
        const globalServiceIndex = index * 2
        const segment = scrollProgress / (100 / 10)
        const distance = Math.abs(segment - globalServiceIndex)
        const isActive = distance < 0.4

        return (
          <group key={marker.id} position={marker.position}>
            {/* Info-kort alltid synlig på lokasjonen */}
            <Html
              position={[0, 200, 0]}
              center
              distanceFactor={200}
              zIndexRange={[100, 0]}
              style={{
                pointerEvents: 'none',
                transition: 'opacity 600ms ease',
                opacity: isActive ? 1 : 0.3,  // Fade ut når ikke aktiv
                width: '600px'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '24px',
                  padding: '48px',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(16px)',
                  border: '2px solid #e5e7eb',
                  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05), 0 8px 32px rgba(0, 0, 0, 0.15), 0 16px 48px rgba(0, 0, 0, 0.1)',
                  transform: isActive ? 'scale(1)' : 'scale(0.95)',
                  transition: 'all 600ms ease'
                }}
              >
                {/* Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100px',
                    height: '100px',
                    background: 'rgba(236, 253, 245, 1)',
                    border: '3px solid #10b981',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '48px',
                    fontWeight: 600,
                    color: '#10b981',
                    flexShrink: 0
                  }}
                >
                  {service.id}
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.2, color: '#111827', margin: 0 }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#6b7280', margin: 0 }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}

/**
 * Kamera-kontroller (scroll-basert)
 */
function CameraController({ scrollProgress, showMarkers }) {
  const cameraRef = useRef()
  const lightRef = useRef()

  useFrame(() => {
    if (!cameraRef.current) return

    if (showMarkers) {
      // Etter hero - zoom til markers
      const { position, target } = interpolateCameraPosition(scrollProgress)

      // Smooth transition - balanse mellom synlighet og smoothness
      cameraRef.current.position.lerp(
        new THREE.Vector3(...position),
        0.025  // Smoothere for å unngå bråe bevegelser
      )

      cameraRef.current.lookAt(new THREE.Vector3(...target))

      // Spotlight følger kameraet og lyser på target
      if (lightRef.current) {
        lightRef.current.position.copy(cameraRef.current.position)
        lightRef.current.target.position.set(...target)
        lightRef.current.target.updateMatrixWorld()
      }
    } else {
      // Under hero - nærmere for bedre synlighet av terrenget
      const overviewPos = new THREE.Vector3(400, 800, 1200)  // Nærmere og mer på siden
      const overviewTarget = new THREE.Vector3(0, 0, 0)

      cameraRef.current.position.lerp(overviewPos, 0.025)  // Samme smooth hastighet
      cameraRef.current.lookAt(overviewTarget)

      if (lightRef.current) {
        lightRef.current.position.copy(cameraRef.current.position)
        lightRef.current.target.position.set(0, 0, 0)
        lightRef.current.target.updateMatrixWorld()
      }
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[400, 800, 1200]}  // Start nærmere terrenget
        fov={65}
      />
      <spotLight
        ref={lightRef}
        intensity={0.4}
        angle={0.3}
        penumbra={0.5}
        distance={2500}  // Stor distanse for stor scene
        color="#10b981"
      />
    </>
  )
}

/**
 * ScrollTerrainViewer - 3D terreng med scroll-basert kamera
 */
function ScrollTerrainViewer({ scrollProgress = 0, showMarkers = false, className }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Lys - justert for god synlighet */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[600, 800, 500]} intensity={0.8} />
        <directionalLight position={[-500, -300, -300]} intensity={0.4} />

        {/* Terrain mesh */}
        <TerrainMesh />

        {/* Info-kort på terrenget - KUN etter hero er scrollet forbi */}
        {showMarkers && <InfoCards scrollProgress={scrollProgress} />}

        {/* Camera controller (scroll-basert) */}
        <CameraController scrollProgress={scrollProgress} showMarkers={showMarkers} />
      </Canvas>
    </div>
  )
}

export default ScrollTerrainViewer
