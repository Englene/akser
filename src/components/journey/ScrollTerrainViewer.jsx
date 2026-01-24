import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Terreng-generering (procedural noise)
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
 * Camera setup with lookAt
 */
function CameraSetup() {
  const cameraRef = useRef()

  useFrame(({ camera }) => {
    // Make camera look at terrain center
    camera.lookAt(0, 0, 0)
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[400, 800, 1200]}
      fov={65}
    />
  )
}

/**
 * Terreng mesh med parallax-effekt
 */
function TerrainMesh({ scrollProgress }) {
  const meshRef = useRef()
  const geometry = useMemo(() => generateTerrainGeometry(100, 100, 40), [])

  useFrame(() => {
    if (meshRef.current) {
      // More dynamic parallax: terrain moves and rotates as you scroll
      const parallaxY = (scrollProgress / 100) * 400  // Increased from 150
      const parallaxX = (scrollProgress / 100) * 200  // Add horizontal movement
      meshRef.current.position.y = -200 + parallaxY
      meshRef.current.position.x = parallaxX

      // More pronounced rotation for journey feel
      const parallaxRotation = (scrollProgress / 100) * 0.3  // Increased from 0.08
      meshRef.current.rotation.z = parallaxRotation
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.8, 0, 0]}
      position={[0, -200, -100]}
      scale={40}
    >
      <meshBasicMaterial
        color="#10b981"
        wireframe={true}
        transparent={false}
        opacity={1.0}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

/**
 * ScrollTerrainViewer - Static 3D terrain with parallax effect
 */
function ScrollTerrainViewer({ scrollProgress = 0, className }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true
        }}
      >
        {/* Fixed camera position - diagonal overhead view */}
        <CameraSetup />

        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[600, 800, 500]} intensity={0.8} />
        <directionalLight position={[-500, -300, -300]} intensity={0.4} />

        {/* Terrain mesh with parallax */}
        <TerrainMesh scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}

export default ScrollTerrainViewer
