'use client'

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface MorphingBlobProps {
  className?: string
  colors?: string[]
  size?: number
}

export default function MorphingBlob({ 
  className = '', 
  colors = ['rgba(59, 130, 246, 0.2)', 'rgba(147, 51, 234, 0.2)', 'rgba(236, 72, 153, 0.2)'],
  size = 400
}: MorphingBlobProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const blobPath = useTransform(scrollYProgress, [0, 1], [
    'M 0 0 Q 50 50 100 0 T 200 0',
    'M 0 0 Q 30 70 100 0 T 200 0',
  ])

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            left: `${20 + index * 30}%`,
            top: `${20 + index * 20}%`,
          }}
          animate={{
            scale: [1, 1.3, 0.8, 1],
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            borderRadius: [
              '30% 70% 70% 30% / 30% 30% 70% 70%',
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '30% 70% 70% 30% / 30% 30% 70% 70%',
            ],
          }}
          transition={{
            duration: 15 + index * 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 2,
          }}
        />
      ))}
    </div>
  )
}

