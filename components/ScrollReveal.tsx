'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  /** Index pour cascade (stagger) */
  order?: number
  className?: string
  delay?: number
}

/**
 * Révélation one-shot à l'entrée dans le viewport (plus de useScroll).
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  order = 0,
  className = '',
  delay = 0,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const distance = 24
  const initial =
    direction === 'down'
      ? { opacity: 0, y: -distance }
      : direction === 'left'
        ? { opacity: 0, x: distance }
        : direction === 'right'
          ? { opacity: 0, x: -distance }
          : direction === 'fade'
            ? { opacity: 0 }
            : { opacity: 0, y: distance }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-6% 0px', amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: delay + Math.min(order, 6) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
