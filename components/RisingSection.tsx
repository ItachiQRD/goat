'use client'

import { type ReactNode } from 'react'

interface RisingSectionProps {
  children: ReactNode
  id?: string
  className?: string
}

/**
 * Conteneur de section simple.
 * L’apparition progressive est gérée par ScrollReveal sur chaque bloc.
 */
export default function RisingSection({
  children,
  id,
  className = '',
}: RisingSectionProps) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {children}
    </section>
  )
}
