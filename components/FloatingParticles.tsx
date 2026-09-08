'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
  yMove: number
  xMove: number
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  className?: string
}

export default function FloatingParticles({
  count = 15,
  colors = ['rgba(59, 130, 246, 0.3)', 'rgba(147, 51, 234, 0.3)', 'rgba(236, 72, 153, 0.3)'],
  className = '',
}: FloatingParticlesProps) {
  const [mounted, setMounted] = useState(false)

  // Calcul une seule fois au mount
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      yMove: (Math.random() - 0.5) * 80,
      xMove: (Math.random() - 0.5) * 40,
    }))
  }, [count, colors])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ contain: 'strict' }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, particle.yMove, 0],
            x: [0, particle.xMove, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
