'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface RisingSectionProps {
  children: ReactNode
  id?: string
  className?: string
}

/**
 * Section qui monte depuis le bas en fondu à l’entrée,
 * puis disparaît en haut — effet cinéma responsive.
 */
export default function RisingSection({
  children,
  id,
  className = '',
}: RisingSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.16, 0.84, 0.94, 1],
    prefersReduced ? [1, 1, 1, 1, 1, 1] : [0, 0.15, 1, 1, 0.2, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.22, 0.8, 0.92, 1],
    prefersReduced ? [0, 0, 0, 0, 0, 0] : [80, 48, 0, 0, -40, -64]
  )

  return (
    <section
      ref={ref}
      id={id}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="relative z-10"
        style={
          prefersReduced
            ? undefined
            : { opacity, y, willChange: 'transform, opacity' }
        }
      >
        {children}
      </motion.div>
    </section>
  )
}
