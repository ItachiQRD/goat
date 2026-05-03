'use client'

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface GlowEffectProps {
  className?: string
  intensity?: number
  color?: string
}

export default function GlowEffect({ 
  className = '', 
  intensity = 1,
  color = 'rgba(59, 130, 246, 0.4)'
}: GlowEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, intensity, 0.3])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
          opacity: glowOpacity,
          scale: glowScale,
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

