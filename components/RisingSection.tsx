'use client'

import { type ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

type From = 'bottom' | 'left' | 'right' | 'top' | 'scale'

interface RisingSectionProps {
  children: ReactNode
  id?: string
  className?: string
  /** Direction d'entrée des blocs (sortie opposée) */
  from?: From
}

const ENTER_OFFSET: Record<From, { x: number; y: number; scale: number }> = {
  bottom: { x: 0, y: 110, scale: 1 },
  top: { x: 0, y: -110, scale: 1 },
  left: { x: -120, y: 40, scale: 1 },
  right: { x: 120, y: 40, scale: 1 },
  scale: { x: 0, y: 48, scale: 0.92 },
}

/**
 * Section scroll-théâtrale :
 * - hors cadre au départ
 * - se place au centre pendant le passage
 * - repart pour laisser place à la suite
 */
export default function RisingSection({
  children,
  id,
  className = '',
  from = 'bottom',
}: RisingSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const offset = ENTER_OFFSET[from]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // 0 → entre | milieu → stable | 1 → sort
  const y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.72, 1],
    prefersReduced
      ? [0, 0, 0, 0]
      : [offset.y, 0, 0, -offset.y * 0.85]
  )
  const x = useTransform(
    scrollYProgress,
    [0, 0.22, 0.72, 1],
    prefersReduced
      ? [0, 0, 0, 0]
      : [offset.x, 0, 0, -offset.x * 0.55]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.72, 1],
    prefersReduced
      ? [1, 1, 1, 1]
      : [offset.scale, 1, 1, 0.96]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.78, 1],
    prefersReduced ? [1, 1, 1, 1] : [0, 1, 1, 0]
  )

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="relative will-change-transform"
        style={{ y, x, scale, opacity }}
      >
        {children}
      </motion.div>
    </section>
  )
}
