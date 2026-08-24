'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { siteConfig } from '@/lib/siteConfig'
import HeroFrameSequence from '@/components/HeroFrameSequence'

type Phase = 'intro' | 'hero' | 'ready'

declare global {
  interface Window {
    lenis?: { stop: () => void; start: () => void }
  }
}

function setHeroUiState(phase: Phase) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.heroPhase = phase
  window.dispatchEvent(new CustomEvent('hero-phase', { detail: phase }))
}

/**
 * Hero full-bleed : séquence frames plein écran,
 * fade opacité au scroll, contenu overlay progressif.
 */
export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const skippedRef = useRef(false)
  const phaseRef = useRef<Phase>('intro')
  const timersRef = useRef<number[]>([])
  const prevOverflowRef = useRef('')

  const [phase, setPhase] = useState<Phase>('intro')
  const [logoVisible, setLogoVisible] = useState(true)
  const [framesReady, setFramesReady] = useState(false)
  const [scrubbing, setScrubbing] = useState(false)

  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Vidéo plein écran : fade out progressif au scroll
  const videoOpacity = useTransform(scrollYProgress, [0, 0.15, 0.65, 0.9], [1, 1, 0.35, 0])
  const brandOpacity = useTransform(scrollYProgress, [0, 0.08, 0.45], [1, 1, 0])
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.05, 0.35], [1, 1, 0])

  const applyPhase = (next: Phase) => {
    phaseRef.current = next
    setPhase(next)
    setHeroUiState(next)
  }

  const clearIntroTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }

  const unlockScroll = () => {
    document.body.style.overflow = prevOverflowRef.current
    window.lenis?.start()
  }

  const skipIntro = () => {
    if (skippedRef.current || prefersReduced) return
    skippedRef.current = true
    clearIntroTimers()
    setLogoVisible(false)
    applyPhase('ready')
    unlockScroll()
  }

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (phaseRef.current === 'hero' && v > 0.02) applyPhase('ready')
    setScrubbing(v > 0.015)
  })

  useEffect(() => {
    if (prefersReduced) {
      skippedRef.current = true
      setLogoVisible(false)
      applyPhase('ready')
      return
    }

    skippedRef.current = false
    applyPhase('intro')
    window.lenis?.stop()
    prevOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const tHold = window.setTimeout(() => {
      if (!skippedRef.current) setLogoVisible(false)
    }, 2400)

    const tReveal = window.setTimeout(() => {
      if (skippedRef.current) return
      applyPhase('hero')
      unlockScroll()
    }, 3200)

    const tReady = window.setTimeout(() => {
      if (skippedRef.current) return
      applyPhase('ready')
    }, 4800)

    timersRef.current = [tHold, tReveal, tReady]

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        skipIntro()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      clearIntroTimers()
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflowRef.current
      window.lenis?.start()
    }
  }, [prefersReduced])

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.heroPhase
    }
  }, [])

  const showHero = phase === 'hero' || phase === 'ready'
  const autoplay = showHero && !scrubbing && !prefersReduced

  return (
    <section
      ref={sectionRef}
      className="relative h-[180vh] sm:h-[200vh] bg-[#0a0a0a]"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Séquence frames — plein écran */}
        <motion.div
          className="absolute inset-0 z-0"
          style={showHero ? { opacity: videoOpacity } : { opacity: 0 }}
        >
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              framesReady || prefersReduced ? 'opacity-100' : 'opacity-30'
            }`}
          >
            {!prefersReduced ? (
              <HeroFrameSequence
                progress={scrollYProgress}
                autoplay={autoplay}
                onReady={() => setFramesReady(true)}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/hero-frames/ezgif-frame-050.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* Voile bas pour lisibilité du chrome */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-[#0a0a0a]/30"
            aria-hidden="true"
          />
        </motion.div>

        {/* Brand + tagline overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center sm:px-6"
          style={showHero ? { opacity: brandOpacity } : { opacity: 0 }}
        >
          {showHero && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl font-semibold leading-[0.95] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {siteConfig.brand.name.split(' ').map((word, i) => (
                  <span key={`${word}-${i}`} className="block">
                    {word}
                  </span>
                ))}
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-white/70 drop-shadow md:mt-5 md:text-base">
                {siteConfig.brand.tagline}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Chrome bas */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-8 pt-16 sm:px-6 sm:pb-10 md:px-10 md:pb-12"
          style={showHero ? { opacity: chromeOpacity } : { opacity: 0 }}
        >
          {showHero && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto grid max-w-6xl grid-cols-1 items-end gap-5 sm:grid-cols-3 sm:gap-6"
            >
              <div className="text-center sm:text-left">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 md:text-[11px]">
                  Statut
                </p>
                <p className="mt-1 text-sm font-medium tracking-wide text-white/90 md:text-base">
                  Disponible pour projets
                </p>
              </div>

              <div className="pointer-events-auto flex justify-center">
                <Link href="/devis">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-medium tracking-wide text-black sm:w-auto md:px-10 md:py-3.5 md:text-base"
                  >
                    Simuler un devis
                  </motion.span>
                </Link>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 md:text-[11px]">
                  Stack
                </p>
                <p className="mt-1 text-sm font-light tracking-wide text-white/75 md:text-base">
                  Next · React · Node
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Indicateur scroll */}
        {showHero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="pointer-events-none absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1.5"
            style={{ opacity: chromeOpacity }}
          >
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
              Défiler
            </span>
            <motion.span
              className="block h-5 w-px origin-top bg-gradient-to-b from-white/60 to-transparent"
              animate={{ scaleY: [1, 0.45, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </div>

      {/* Intro logo */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[60] flex cursor-pointer items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            onClick={skipIntro}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={
                logoVisible
                  ? { opacity: 0.88, scale: 1 }
                  : { opacity: 0, scale: 1.06 }
              }
              transition={{
                opacity: {
                  duration: logoVisible ? 1.8 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                },
                scale: {
                  duration: logoVisible ? 2.4 : 0.85,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24">
                <div
                  className="absolute inset-0 rounded-2xl border border-white/25"
                  aria-hidden="true"
                />
                <span className="relative z-10 text-2xl font-semibold tracking-tighter text-white/90 sm:text-3xl md:text-4xl">
                  FS
                </span>
              </div>
              <p className="text-xs font-light uppercase tracking-[0.4em] text-white/40 sm:text-sm">
                {siteConfig.brand.name}
              </p>
            </motion.div>

            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-white/20">
              Cliquer pour passer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
