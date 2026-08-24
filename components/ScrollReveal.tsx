'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  className?: string
}

/** Apparition progressive des éléments à l’entrée dans le viewport. */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-8% 0px -5% 0px' })

  const hidden = {
    up: { y: prefersReduced ? 0 : 48, opacity: 0 },
    down: { y: prefersReduced ? 0 : -48, opacity: 0 },
    left: { x: prefersReduced ? 0 : 40, opacity: 0 },
    right: { x: prefersReduced ? 0 : -40, opacity: 0 },
    fade: { opacity: 0 },
  }[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : hidden}
      transition={{
        duration: prefersReduced ? 0.01 : 0.9,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
