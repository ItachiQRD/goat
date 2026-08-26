'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  /** Index pour cascade : plus grand = apparaît plus tard au scroll */
  order?: number
  className?: string
  /** Conservé pour compatibilité (ignoré — le scroll pilote le timing) */
  delay?: number
}

/**
 * Élément invisible tant qu’il n’est pas atteint,
 * puis révélé progressivement via la progression du scroll.
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  order = 0,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const start = Math.min(0.95, 0.92 - Math.min(order, 6) * 0.035)
  const end = Math.min(0.72, 0.6 - Math.min(order, 6) * 0.025)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${start}`, `start ${end}`],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [0, 1])

  const distance = 36
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced
      ? [0, 0]
      : direction === 'down'
        ? [-distance, 0]
        : direction === 'up'
          ? [distance, 0]
          : [0, 0]
  )
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced
      ? [0, 0]
      : direction === 'left'
        ? [distance, 0]
        : direction === 'right'
          ? [-distance, 0]
          : [0, 0]
  )

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y: direction === 'up' || direction === 'down' ? y : 0,
        x: direction === 'left' || direction === 'right' ? x : 0,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  )
}
