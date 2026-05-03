'use client'

import { motion } from 'framer-motion'

interface MorphingBlobProps {
  className?: string
  colors?: string[]
  size?: number
}

export default function MorphingBlob({
  className = '',
  colors = ['rgba(59, 130, 246, 0.18)', 'rgba(147, 51, 234, 0.18)'],
  size = 500,
}: MorphingBlobProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ contain: 'strict' }}
    >
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            left: `${20 + index * 40}%`,
            top: `${20 + index * 30}%`,
            willChange: 'transform',
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 25 + index * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 3,
          }}
        />
      ))}
    </div>
  )
}
