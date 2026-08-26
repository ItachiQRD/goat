'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { siteConfig } from '@/lib/siteConfig'

function setHeroUiState(phase: 'intro' | 'hero' | 'ready') {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.heroPhase = phase
  window.dispatchEvent(new CustomEvent('hero-phase', { detail: phase }))
}

/**
 * Hero léger (sans frames / canvas) pour éviter les freezes.
 * Fade doux au scroll uniquement.
 */
export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85],
    prefersReduced ? [1, 1, 1] : [1, 0.55, 0]
  )
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.85],
    prefersReduced ? [0, 0] : [0, -48]
  )

  useEffect(() => {
    setHeroUiState('ready')
    return () => {
      delete document.documentElement.dataset.heroPhase
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] bg-[#0a0a0a]"
      aria-label="Introduction"
    >
      <div className="sticky top-0 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 py-24 md:px-8">
        {/* Atmosphère légère */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(139,92,246,0.08) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center"
          style={prefersReduced ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 text-[10px] uppercase tracking-[0.4em] text-white/40 md:text-xs"
          >
            {siteConfig.brand.name}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Des sites web qui
            <span className="mt-1 block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
              transforment vos visiteurs
            </span>
            en clients.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-sm font-light leading-relaxed text-white/55 md:text-base"
          >
            {siteConfig.brand.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Link href="/devis" className="w-full sm:w-auto">
              <span className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03] active:scale-[0.97] md:text-base">
                Simuler un devis
              </span>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <span className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-light text-white transition-colors hover:bg-white/10 md:text-base">
                Me contacter
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5"
          style={prefersReduced ? undefined : { opacity: contentOpacity }}
        >
          <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">Défiler</span>
          <span className="block h-5 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
