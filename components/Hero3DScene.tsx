'use client';

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'

interface SceneProps {
  progressRef: MutableRefObject<number>
}

function CameraRig({ progressRef }: SceneProps) {
  const smoothed = useRef(0)

  useFrame(({ camera }) => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return

    smoothed.current += (progressRef.current - smoothed.current) * 0.075
    const t = smoothed.current

    camera.position.z = 12 - t * 38
    camera.position.y = 0.35 + Math.sin(t * Math.PI) * 0.4
    camera.position.x = Math.sin(t * Math.PI * 1.4) * 0.45
    camera.lookAt(Math.sin(t * 2) * 0.12, 0.1, camera.position.z - 8)
    camera.fov = 55 - t * 12
    camera.updateProjectionMatrix()
  })

  return null
}

function HeroPortal() {
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.z += delta * 0.15
    if (inner.current) inner.current.rotation.z -= delta * 0.22
  })

  return (
    <group position={[0, 0, 8]}>
      <mesh ref={outer}>
        <torusGeometry args={[2.8, 0.06, 16, 128]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.95} />
      </mesh>
      <mesh ref={inner}>
        <torusGeometry args={[2.15, 0.035, 16, 128]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.9} />
      </mesh>
      <mesh>
        <circleGeometry args={[1.9, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.18} />
      </mesh>
      <pointLight position={[0, 0, 1]} intensity={3} color="#60a5fa" distance={18} />
    </group>
  )
}

function TunnelRings() {
  const group = useRef<THREE.Group>(null)
  const rings = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        z: 5 - i * 2.8,
        color: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ff6b35',
        scale: 1 + (i % 4) * 0.1,
        thickness: 0.028 + (i % 3) * 0.01,
      })),
    []
  )

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.z += delta * 0.05
  })

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} scale={ring.scale}>
          <torusGeometry args={[2.4, ring.thickness, 12, 96]} />
          <meshBasicMaterial color={ring.color} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

function FloatingScreens() {
  const screens = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        x: i % 2 === 0 ? -2.4 : 2.4,
        y: (i % 3) * 0.35 - 0.3,
        z: 8 - i * 4.4,
        rotY: i % 2 === 0 ? 0.35 : -0.35,
        color: i % 2 === 0 ? '#3b82f6' : '#8b5cf6',
      })),
    []
  )

  return (
    <group>
      {screens.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]} rotation={[0, s.rotY, 0]}>
          <planeGeometry args={[2.1, 1.28]} />
          <meshStandardMaterial
            color="#0b1220"
            emissive={s.color}
            emissiveIntensity={0.55}
            metalness={0.7}
            roughness={0.25}
            transparent
            opacity={0.95}
          />
        </mesh>
      ))}
    </group>
  )
}

function FloorGrid() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, -8]}>
      <planeGeometry args={[80, 80, 40, 40]} />
      <meshBasicMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  )
}

function CoreGlow({ progressRef }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return
    const t = progressRef.current
    meshRef.current.position.z = -8 - t * 18
    meshRef.current.scale.setScalar(1.2 + t * 1.8)
    const mat = meshRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = 0.12 + t * 0.18
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <sphereGeometry args={[3.2, 32, 32]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.16} />
    </mesh>
  )
}

function Scene({ progressRef }: SceneProps) {
  return (
    <>
      <color attach="background" args={['#05060a']} />
      <fog attach="fog" args={['#05060a', 12, 36]} />

      <ambientLight intensity={0.45} />
      <pointLight position={[0, 4, 6]} intensity={2} color="#93c5fd" />
      <pointLight position={[-6, -2, -4]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[6, 3, -12]} intensity={1.2} color="#ff6b35" />
      <directionalLight position={[0, 8, 4]} intensity={0.6} color="#ffffff" />

      <CameraRig progressRef={progressRef} />
      <HeroPortal />
      <TunnelRings />
      <FloatingScreens />
      <FloorGrid />
      <CoreGlow progressRef={progressRef} />

      <Sparkles
        count={90}
        scale={[14, 8, 40]}
        size={2.2}
        speed={0.25}
        color="#c4b5fd"
        opacity={0.55}
      />
    </>
  )
}

export default function Hero3DScene({ progressRef }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 12], fov: 55, near: 0.1, far: 80 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
      }}
    >
      <Scene progressRef={progressRef} />
    </Canvas>
  )
}
