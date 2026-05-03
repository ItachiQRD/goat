'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  gradientFrom?: string
  gradientVia?: string
  gradientTo?: string
  delay?: number
  className?: string
}

export default function AnimatedCard({
  children,
  gradientFrom = 'from-purple-500/10',
  gradientVia = 'via-pink-500/10',
  gradientTo = 'to-blue-500/10',
  delay = 0,
  className = ''
}: AnimatedCardProps) {
  return (
    <motion.div
      className={`relative h-full min-h-[500px] rounded-2xl backdrop-blur-xl bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} border border-white/10 p-8 ${className}`}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        borderColor: 'rgba(255, 255, 255, 0.3)',
        scale: 1.02,
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}

