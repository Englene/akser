import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * WaveMesh - 3D wave plane geometry with vertex displacement
 *
 * Creates an animated wireframe mesh with organic wave motion:
 * - Multiple sine waves for complex, natural movement
 * - Scroll-reactive displacement
 * - Optimized with useMemo and efficient vertex updates
 */
export function WaveMesh({
  scrollProgress,
  color,
  opacity,
  waveSpeed,
  waveAmplitude,
  gridSize
}) {
  const meshRef = useRef()
  const timeRef = useRef(0)

  // Create plane geometry with subdivisions for wave effect
  // Memoized to avoid recreating on every render
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(
      150,                       // Width - ENORMOUS to ensure full coverage
      100,                       // Height - ENORMOUS to ensure full coverage
      gridSize.width,            // Width segments (grid density)
      gridSize.height            // Height segments (grid density)
    )
  }, [gridSize])

  // Animate wave displacement on each frame
  useFrame((state, delta) => {
    if (!meshRef.current) return

    timeRef.current += delta * waveSpeed

    const positions = meshRef.current.geometry.attributes.position
    const positionArray = positions.array

    // Apply sine wave displacement to each vertex
    for (let i = 0; i < positionArray.length; i += 3) {
      const x = positionArray[i]
      const y = positionArray[i + 1]

      // Wave formula: multiple sine waves for organic motion
      // Reduced frequency (0.5 -> 0.3) for bigger, more visible waves
      const wave1 = Math.sin(x * 0.3 + timeRef.current) * waveAmplitude
      const wave2 = Math.sin(y * 0.4 + timeRef.current * 0.7) * waveAmplitude * 0.6
      const scrollWave = Math.sin(x * 0.2 + scrollProgress * 10) * scrollProgress * 0.4

      // Z displacement (wave height)
      positionArray[i + 2] = wave1 + wave2 + scrollWave
    }

    positions.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 6, 0, 0]}>
      {/* Wireframe material for grid aesthetic */}
      <meshBasicMaterial
        color={color}
        wireframe={true}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  )
}
