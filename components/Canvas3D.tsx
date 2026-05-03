'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import type { Mesh } from 'three'

function Box({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#ffffff" 
        metalness={0.8}
        roughness={0.2}
        emissive="#ffffff"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function Torus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.z += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.8, 0.3, 16, 100]} />
      <meshStandardMaterial 
        color="#60a5fa" 
        metalness={0.9}
        roughness={0.1}
        emissive="#3b82f6"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function Sphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.015
      meshRef.current.rotation.y += 0.015
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial 
        color="#a78bfa" 
        metalness={0.7}
        roughness={0.3}
        emissive="#8b5cf6"
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

export default function Canvas3D() {
  return (
    <Canvas shadows gl={{ antialias: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
      
      <Box position={[-1.5, 0, 0]} />
      <Torus position={[0, 0, 0]} />
      <Sphere position={[1.5, 0, 0]} />
      
      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      <Environment preset="city" />
    </Canvas>
  )
}








