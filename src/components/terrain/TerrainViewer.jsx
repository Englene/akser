import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Genererer fjellgeometri fra prosedural noise
 */
function generateTerrainGeometry(width = 100, height = 100, heightScale = 18) {
  const size = width * height
  const data = new Float32Array(size)

  // Prosedural fjellterreng - mellomting mellom subtil og dramatisk
  for (let i = 0; i < size; i++) {
    const x = (i % width) / width
    const y = Math.floor(i / width) / height

    // Multi-octave noise for fjell-aktige formasjoner
    const baseNoise =
      Math.sin(x * 3.8 + y * 2.5) * 0.45 +
      Math.sin(x * 7.5 - y * 5.2) * 0.25 +
      Math.sin(x * 14.1 + y * 10.3) * 0.12 +
      Math.cos(x * 6.0 * y * 7.0) * 0.33

    // Moderate fjelltopper
    const peaks = Math.pow(Math.abs(baseNoise), 0.9)

    data[i] = peaks
  }

  const geometry = new THREE.PlaneGeometry(90, 90, width - 1, height - 1)
  const vertices = geometry.attributes.position.array

  for (let i = 0; i < vertices.length / 3; i++) {
    vertices[i * 3 + 2] = data[i] * heightScale
  }

  geometry.computeVertexNormals()
  return geometry
}

/**
 * Terrain Mesh - roterer sakte og hover-animerer
 */
function TerrainMesh() {
  const meshRef = useRef()

  const geometry = useMemo(() => generateTerrainGeometry(100, 100, 18), [])

  // Ingen automatisk animasjon - brukeren kontrollerer med musen

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.8, 0, 0]}
      position={[0, -15, -10]}
      scale={1.6}
    >
      <meshStandardMaterial
        color="#10b981"
        wireframe={true}
        transparent={true}
        opacity={0.35}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * TerrainViewer - Hovedkomponent
 */
function TerrainViewer({ className }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 30, 45]} fov={65} />

        {/* Lys */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[20, 25, 15]} intensity={0.6} />
        <directionalLight position={[-15, -8, -8]} intensity={0.25} />

        {/* Terreng */}
        <TerrainMesh />

        {/* Kontroller - mus-interaksjon + auto-rotasjon */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
          maxDistance={100}
          minDistance={30}
        />
      </Canvas>
    </div>
  )
}

export default TerrainViewer
