'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxBackgroundProps {
  children?: React.ReactNode
  speed?: number
  className?: string
}

export default function ParallaxBackground({ 
  children, 
  speed = 0.5,
  className = '' 
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3])

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 ${className}`}
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  )
}

