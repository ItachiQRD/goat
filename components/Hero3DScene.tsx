'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei'
import type { Mesh, Group } from 'three'
import * as THREE from 'three'

/**
 * Objet central : icosahedron déformé avec matériau métallique brillant
 * + wireframe externe rotatif
 */
function CentralObject() {
  const meshRef = useRef<Mesh>(null)
  const wireRef = useRef<Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15
      meshRef.current.rotation.y = t * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1
      wireRef.current.rotation.y = -t * 0.15
      wireRef.current.rotation.z = t * 0.05
    }
  })

  return (
    <group>
      {/* Cœur déformé brillant */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <icosahedronGeometry args={[1.4, 4]} />
          <MeshDistortMaterial
            color="#6366f1"
            emissive="#3b82f6"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.85}
            distort={0.35}
            speed={1.5}
          />
        </mesh>
      </Float>

      {/* Wireframe extérieur */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Sphère de halo externe */}
      <mesh>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

/**
 * Anneaux orbitaux autour de l'objet central
 */
function OrbitingRings() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Anneau 1 */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.8, 0.015, 8, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
      </mesh>
      {/* Anneau 2 */}
      <mesh rotation={[Math.PI / 1.5, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.012, 8, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>
      {/* Anneau 3 */}
      <mesh rotation={[Math.PI / 3, -Math.PI / 5, Math.PI / 6]}>
        <torusGeometry args={[3.6, 0.01, 8, 100]} />
        <meshBasicMaterial color="#ff6b35" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

/**
 * Petites planètes orbitantes
 */
function OrbitingDots() {
  const groupRef = useRef<Group>(null)
  const dots = useMemo(
    () => [
      { color: '#3b82f6', radius: 2.8, speed: 0.4, offset: 0, tilt: 0.3 },
      { color: '#8b5cf6', radius: 3.2, speed: 0.3, offset: 2.1, tilt: -0.5 },
      { color: '#ff6b35', radius: 3.6, speed: 0.25, offset: 4.2, tilt: 0.7 },
    ],
    []
  )

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      const dot = dots[i]
      const angle = t * dot.speed + dot.offset
      child.position.x = Math.cos(angle) * dot.radius
      child.position.z = Math.sin(angle) * dot.radius
      child.position.y = Math.sin(angle * 0.5) * dot.tilt
    })
  })

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={dot.color} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * Scène 3D complète, mémorisée pour limiter les recompiles
 */
function Scene() {
  return (
    <>
      {/* Lumières */}
      <ambientLight intensity={0.4} />
      <pointLight position={[8, 8, 8]} intensity={1.4} color="#a78bfa" />
      <pointLight position={[-8, -4, -8]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, 6, -4]} intensity={0.6} color="#ff6b35" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.4}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        castShadow
      />

      {/* Objet principal */}
      <CentralObject />
      <OrbitingRings />
      <OrbitingDots />

      {/* Particules d'ambiance */}
      <Sparkles
        count={120}
        scale={[10, 10, 10]}
        size={2.5}
        speed={0.3}
        color="#a78bfa"
        opacity={0.6}
      />

      <Environment preset="night" />
    </>
  )
}

export default function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  )
}
