import { Canvas } from '@react-three/fiber'
import { WaveMesh } from './WaveMesh'
import styles from './ParticlesWaves.module.css'

/**
 * ParticlesWaves - 3D wireframe wave background
 *
 * Features:
 * - Animated wave mesh using vertex displacement
 * - Scroll-reactive wave intensity
 * - Emerald wireframe matching brand
 * - Fixed fullscreen background
 * - Optimized for 60fps performance
 *
 * This component creates a modern, tech-forward background that reinforces
 * the axes/coordinate theme while providing subtle visual interest.
 */
function ParticlesWaves({
  scrollProgress = 0,
  color = '#10b981',      // Emerald-500
  opacity = 0.3,
  waveSpeed = 1.0,
  waveAmplitude = 1.2,    // Larger waves for more dramatic effect
  gridSize = { width: 60, height: 40 }  // Higher grid density for smoother waves
}) {
  return (
    <div className={styles.container}>
      <Canvas
        camera={{
          position: [0, 0, 35], // Camera extremely far back for enormous grid
          fov: 140              // Maximum wide field of view for full screen coverage
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}  // Device pixel ratio for sharp rendering on retina
      >
        {/* Ambient light for visibility */}
        <ambientLight intensity={0.5} />

        {/* The animated wave mesh */}
        <WaveMesh
          scrollProgress={scrollProgress}
          color={color}
          opacity={opacity}
          waveSpeed={waveSpeed}
          waveAmplitude={waveAmplitude}
          gridSize={gridSize}
        />
      </Canvas>
    </div>
  )
}

export default ParticlesWaves
