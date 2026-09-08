'use client'

import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type From = 'bottom' | 'left' | 'right' | 'top'

interface ScrollStageItemProps {
  children: ReactNode
  className?: string
  from?: From
  /** Stagger en secondes (ex: 0.04 * index) */
  delay?: number
}

const OFFSETS: Record<From, { x: number; y: number }> = {
  bottom: { x: 0, y: 20 },
  top: { x: 0, y: -20 },
  left: { x: -18, y: 8 },
  right: { x: 18, y: 8 },
}

/**
 * Entrée one-shot pour un item — plus de scroll-linked opacity/x/y.
 */
export default function ScrollStageItem({
  children,
  className = '',
  from = 'bottom',
  delay = 0,
}: ScrollStageItemProps) {
  const prefersReduced = useReducedMotion()
  const o = OFFSETS[from]
  // Compat : anciens delays étaient 0–0.18 (fraction scroll) → convertir en secondes
  const delaySec = delay > 0.25 ? delay : delay * 2.5

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px', amount: 0.2 }}
      transition={{ duration: 0.4, delay: delaySec, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
