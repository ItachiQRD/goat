'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion'
import { siteConfig } from '@/lib/siteConfig'
import { startLenis, stopLenis } from '@/lib/lenisBridge'

type Phase = 'intro' | 'hero' | 'ready'

/** Montage unique (code → compétences → commercial) */
const VIDEO_HERO = '/hero-videos/hero.mp4'

function setHeroUiState(phase: Phase) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.heroPhase = phase
  window.dispatchEvent(new CustomEvent('hero-phase', { detail: phase }))
}

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('intro')
  const [logoVisible, setLogoVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hasVideo, setHasVideo] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.78])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.85], [0, -64])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const skipIntro = () => {
    setLogoVisible(false)
    setPhase('ready')
    setHeroUiState('ready')
    document.body.style.overflow = ''
    startLenis()
  }

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (phase === 'intro') return
    if (phase === 'hero' && v > 0.02) {
      setPhase('ready')
      setHeroUiState('ready')
    }
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    if (media.matches) {
      setPhase('ready')
      setLogoVisible(false)
      setHeroUiState('ready')
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    setHeroUiState('intro')
    stopLenis()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const tHold = window.setTimeout(() => setLogoVisible(false), 2600)
    const tReveal = window.setTimeout(() => {
      setPhase('hero')
      setHeroUiState('hero')
      document.body.style.overflow = prevOverflow
      startLenis()
    }, 3400)
    const tReady = window.setTimeout(() => {
      setPhase('ready')
      setHeroUiState('ready')
    }, 5000)

    const skip = () => {
      window.clearTimeout(tHold)
      window.clearTimeout(tReveal)
      window.clearTimeout(tReady)
      setLogoVisible(false)
      setPhase('ready')
      setHeroUiState('ready')
      document.body.style.overflow = prevOverflow
      startLenis()
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        skip()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.clearTimeout(tHold)
      window.clearTimeout(tReveal)
      window.clearTimeout(tReady)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      startLenis()
    }
  }, [reducedMotion])

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.heroPhase
    }
  }, [])

  useEffect(() => {
    if (phase === 'intro') return
    const el = videoRef.current
    if (!el || !hasVideo) return
    el.play().catch(() => {})
  }, [phase, hasVideo])

  const showHeroContent = phase === 'hero' || phase === 'ready'

  return (
    <section
      ref={sectionRef}
      className="relative h-[160vh] bg-transparent"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(59,130,246,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 70% 75%, rgba(139,92,246,0.12) 0%, transparent 50%), #0a0a0a',
            }}
            aria-hidden="true"
          />

          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: hasVideo && phase !== 'intro' ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_HERO}
              muted
              playsInline
              loop
              preload="auto"
              onCanPlay={() => setHasVideo(true)}
              onError={() => setHasVideo(false)}
              aria-hidden="true"
            />
          </motion.div>

          <div
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{
              background:
                'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 42%, rgba(10,10,10,0.45) 100%)',
            }}
          />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 md:pb-24 text-center">
          <motion.div
            className="flex max-w-3xl flex-col items-center"
            style={
              showHeroContent
                ? { scale: contentScale, opacity: contentOpacity, y: contentY }
                : { opacity: 0 }
            }
          >
            {showHeroContent && (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-white/45 md:text-xs">
                  Du code au résultat
                </p>

                <h1 className="text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                  Votre site,
                  <span className="mt-1 block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
                    votre commercial.
                  </span>
                </h1>

                <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/55 md:text-base">
                  Du code à la conversion : compétences, expérience claire, site qui vend pour vous.
                </p>

                <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                  <Link href="/devis" className="w-full sm:w-auto">
                    <span className="inline-flex w-full items-center justify-center bg-white px-7 py-3.5 text-sm font-medium text-black md:text-base">
                      Simuler un devis
                    </span>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <span className="inline-flex w-full items-center justify-center border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-light text-white md:text-base">
                      Me contacter
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>

          {showHeroContent && (
            <motion.div
              className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
              style={{ opacity: contentOpacity }}
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/25">
                Continuer
              </span>
              <motion.span
                className="block h-8 w-px origin-top bg-gradient-to-b from-white/40 to-transparent"
                animate={{ scaleY: [1, 0.5, 1], opacity: [0.45, 0.15, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </div>

        {!hasVideo && showHeroContent && (
          <p className="pointer-events-none absolute left-5 bottom-5 z-20 text-[10px] tracking-wide text-white/25">
            Placez hero.mp4 dans /public/hero-videos
          </p>
        )}
      </div>

      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Chargement ${siteConfig.brand.name}`}
            onClick={skipIntro}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                logoVisible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.04 }
              }
              transition={{
                opacity: { duration: logoVisible ? 1.5 : 0.7, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: logoVisible ? 2.1 : 0.9, ease: [0.22, 1, 0.36, 1] },
              }}
              className="flex items-center justify-center"
            >
              <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl md:h-56 md:w-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={siteConfig.brand.logo}
                  alt={siteConfig.brand.name}
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.div>
            <button
              type="button"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/35 hover:text-white/60 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                skipIntro()
              }}
            >
              Entrée ou clic pour passer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
