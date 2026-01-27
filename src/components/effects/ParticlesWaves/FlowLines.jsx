import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * FlowLines - Flowing lines over the wave mesh
 *
 * Creates animated lines that follow the wave motion,
 * giving a water-like flowing effect
 */
export function FlowLines({ waveAmplitude, color = '#10b981' }) {
  const linesRef = useRef([])
  const timeRef = useRef(0)

  // Create multiple flowing lines
  const lines = useMemo(() => {
    const lineObjects = []
    const numLines = 8 // Number of flow lines

    for (let i = 0; i < numLines; i++) {
      const points = []
      const segments = 50 // Points per line
      const yOffset = -10 + (i / numLines) * 20 // Spread lines vertically

      // Create horizontal flowing line
      for (let j = 0; j < segments; j++) {
        const x = -20 + (j / segments) * 40 // Span across width
        points.push(new THREE.Vector3(x, yOffset, 0))
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      lineObjects.push({
        geometry,
        points,
        yOffset,
        speed: 0.5 + Math.random() * 0.5 // Random speed for each line
      })
    }

    return lineObjects
  }, [])

  // Animate flow lines to follow wave motion
  useFrame((state, delta) => {
    timeRef.current += delta

    lines.forEach((line, lineIndex) => {
      const positions = line.geometry.attributes.position

      for (let i = 0; i < line.points.length; i++) {
        const x = line.points[i].x
        const y = line.points[i].y

        // Apply wave displacement to make lines flow over waves
        const wave1 = Math.sin(x * 0.3 + timeRef.current * line.speed) * waveAmplitude * 0.8
        const wave2 = Math.sin(y * 0.4 + timeRef.current * line.speed * 0.7) * waveAmplitude * 0.4

        // Horizontal flow motion
        const flowOffset = Math.sin(timeRef.current * line.speed + lineIndex) * 2

        positions.setXYZ(
          i,
          x + flowOffset,
          y,
          wave1 + wave2 + 2 // Slightly above the main grid
        )
      }

      positions.needsUpdate = true
    })
  })

  return (
    <group>
      {lines.map((line, index) => (
        <line key={index} ref={(el) => (linesRef.current[index] = el)}>
          <bufferGeometry attach="geometry" {...line.geometry} />
          <lineBasicMaterial
            attach="material"
            color={color}
            transparent
            opacity={0.6}
            linewidth={2}
          />
        </line>
      ))}
    </group>
  )
}
