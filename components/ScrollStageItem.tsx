'use client'

import { type ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

type From = 'bottom' | 'left' | 'right' | 'top'

interface ScrollStageItemProps {
  children: ReactNode
  className?: string
  from?: From
  /** Décalage 0–0.2 pour stagger entre items d'une même section */
  delay?: number
}

const OFFSETS: Record<From, { x: number; y: number }> = {
  bottom: { x: 0, y: 80 },
  top: { x: 0, y: -80 },
  left: { x: -90, y: 24 },
  right: { x: 90, y: 24 },
}

/**
 * Bloc individuel : entre hors cadre → se place → repart.
 * À utiliser dans une RisingSection pour des mouvements décalés.
 */
export default function ScrollStageItem({
  children,
  className = '',
  from = 'bottom',
  delay = 0,
}: ScrollStageItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const o = OFFSETS[from]
  const d = Math.min(0.18, Math.max(0, delay))

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0 + d, 0.25 + d, 0.7, 0.95],
    prefersReduced ? [0, 0, 0, 0] : [o.y, 0, 0, -o.y * 0.7]
  )
  const x = useTransform(
    scrollYProgress,
    [0 + d, 0.25 + d, 0.7, 0.95],
    prefersReduced ? [0, 0, 0, 0] : [o.x, 0, 0, -o.x * 0.45]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0 + d, 0.2 + d, 0.75, 0.95],
    prefersReduced ? [1, 1, 1, 1] : [0, 1, 1, 0]
  )

  return (
    <motion.div ref={ref} className={className} style={{ y, x, opacity }}>
      {children}
    </motion.div>
  )
}
