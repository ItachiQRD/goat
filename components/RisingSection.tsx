'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type From = 'bottom' | 'left' | 'right' | 'top' | 'scale'

interface RisingSectionProps {
  children: ReactNode
  id?: string
  className?: string
  from?: From
}

const ENTER: Record<From, { x: number; y: number; scale: number }> = {
  bottom: { x: 0, y: 28, scale: 1 },
  top: { x: 0, y: -28, scale: 1 },
  left: { x: -24, y: 12, scale: 1 },
  right: { x: 24, y: 12, scale: 1 },
  scale: { x: 0, y: 16, scale: 0.98 },
}

/**
 * Entrée légère one-shot (whileInView) — pas de transforms liés au scroll.
 */
export default function RisingSection({
  children,
  id,
  className = '',
  from = 'bottom',
}: RisingSectionProps) {
  const prefersReduced = useReducedMotion()
  const offset = ENTER[from]

  if (prefersReduced) {
    return (
      <section id={id} className={`relative ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <section id={id} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: offset.x, y: offset.y, scale: offset.scale }}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-8% 0px -8% 0px', amount: 0.15 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}
