'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
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
/** 0 coding | 1 morph | 2 commercial */
type StoryBeat = 0 | 1 | 2

const VIDEO_CODING = '/hero-videos/01-coding.mp4'
const VIDEO_MORPH = '/hero-videos/03-morph.mp4'
const VIDEO_COMMERCIAL = '/hero-videos/02-commercial.mp4'

/** Durée réelle de 03-morph.mp4 (~8.04 s) */
const MORPH_MS = 8200

function setHeroUiState(phase: Phase) {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.heroPhase = phase
  window.dispatchEvent(new CustomEvent('hero-phase', { detail: phase }))
}

function HeroVideo({
  src,
  active,
  opacity = 1,
  onReady,
  restartOnActivate = false,
  preload = 'metadata',
}: {
  src: string
  active: boolean
  opacity?: number
  onReady?: () => void
  restartOnActivate?: boolean
  preload?: 'none' | 'metadata' | 'auto'
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ok, setOk] = useState(false)
  const wasActive = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (active && ok) {
      if (restartOnActivate && !wasActive.current) {
        el.currentTime = 0
      }
      el.play().catch(() => {})
    } else {
      el.pause()
    }
    wasActive.current = active
  }, [active, ok, restartOnActivate])

  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: active && ok ? opacity : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: 'none' }}
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        playsInline
        loop={!restartOnActivate}
        preload={preload}
        onCanPlay={() => {
          setOk(true)
          onReady?.()
        }}
        onError={() => setOk(false)}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const morphTimer = useRef<number | null>(null)
  const [phase, setPhase] = useState<Phase>('intro')
  const [logoVisible, setLogoVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [beat, setBeat] = useState<StoryBeat>(0)
  const [hasAnyVideo, setHasAnyVideo] = useState(false)
  const [flash, setFlash] = useState(false)
  const transitioning = useRef(false)
  const beatRef = useRef<StoryBeat>(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.92])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 0.85], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.85], [0, -32])
  // Vidéo : plus de scale au scroll (coût GPU)

  const clearMorphTimer = () => {
    if (morphTimer.current !== null) {
      window.clearTimeout(morphTimer.current)
      morphTimer.current = null
    }
  }

  const triggerFlash = () => {
    setFlash(true)
    window.setTimeout(() => setFlash(false), 280)
  }

  const goToCommercial = useCallback(() => {
    if (transitioning.current || beatRef.current !== 0) return

    transitioning.current = true
    triggerFlash()
    setBeat(1)
    beatRef.current = 1

    clearMorphTimer()
    morphTimer.current = window.setTimeout(() => {
      setBeat(2)
      beatRef.current = 2
      transitioning.current = false
      morphTimer.current = null
    }, MORPH_MS)
  }, [])

  /** Retour direct à la vidéo de départ (crossfade, sans rejouer toute la morph) */
  const goToCoding = useCallback(() => {
    if (transitioning.current || beatRef.current === 0) return
    if (beatRef.current === 1) return

    transitioning.current = true
    triggerFlash()
    clearMorphTimer()
    setBeat(0)
    beatRef.current = 0
    window.setTimeout(() => {
      transitioning.current = false
    }, 500)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (phase === 'intro') return
    // Hystérésis : évite les allers-retours trop sensibles
    if (v > 0.35 && beatRef.current === 0) goToCommercial()
    if (v < 0.18 && beatRef.current === 2) goToCoding()
    if (phase === 'hero' && v > 0.02) setPhase('ready')
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    if (media.matches) {
      setPhase('ready')
      setLogoVisible(false)
      setHeroUiState('ready')
      setBeat(2)
      beatRef.current = 2
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
      clearMorphTimer()
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      startLenis()
    }
  }, [reducedMotion])

  useEffect(() => {
    return () => {
      clearMorphTimer()
      delete document.documentElement.dataset.heroPhase
    }
  }, [])

  useEffect(() => {
    if (phase !== 'intro') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setLogoVisible(false)
        setPhase('ready')
        setHeroUiState('ready')
        document.body.style.overflow = ''
        startLenis()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  const showHeroContent = phase === 'hero' || phase === 'ready'
  const storyBeat: 0 | 1 = beat === 0 ? 0 : 1

  // Une seule vidéo visible à la fois (crossfade) — pas de superposition morph + commercial
  const codingOpacity = beat === 0 ? 1 : 0
  const morphOpacity = beat === 1 ? 1 : 0
  const commercialOpacity = beat === 2 ? 1 : 0

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] bg-transparent"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div className="absolute inset-0">
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              background:
                beat === 0
                  ? 'radial-gradient(ellipse 70% 55% at 40% 45%, rgba(59,130,246,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 70% 70%, rgba(15,23,42,0.9) 0%, #0a0a0a 70%)'
                  : 'radial-gradient(ellipse 70% 55% at 55% 40%, rgba(255,107,53,0.16) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 30% 70%, rgba(139,92,246,0.14) 0%, transparent 55%), #0a0a0a',
            }}
            aria-hidden="true"
          />

          <HeroVideo
            src={VIDEO_CODING}
            active={beat === 0}
            opacity={codingOpacity}
            preload="auto"
            onReady={() => setHasAnyVideo(true)}
          />
          <HeroVideo
            src={VIDEO_MORPH}
            active={beat === 1}
            opacity={morphOpacity}
            restartOnActivate
            preload={beat >= 1 ? 'auto' : 'metadata'}
            onReady={() => setHasAnyVideo(true)}
          />
          <HeroVideo
            src={VIDEO_COMMERCIAL}
            active={beat === 2}
            opacity={commercialOpacity}
            preload={beat >= 1 ? 'auto' : 'metadata'}
            onReady={() => setHasAnyVideo(true)}
          />

          <AnimatePresence>
            {flash && (
              <motion.div
                key="flash"
                className="absolute inset-0 z-[2] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.7) 0%, rgba(59,130,246,0.35) 35%, transparent 70%)',
                }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {beat === 1 && (
              <motion.div
                key="sweep"
                className="absolute inset-0 z-[1] pointer-events-none"
                initial={{ opacity: 0, x: '-30%' }}
                animate={{ opacity: [0, 0.35, 0], x: ['-30%', '0%', '40%'] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background:
                    'linear-gradient(105deg, transparent 20%, rgba(139,92,246,0.35) 48%, rgba(255,107,53,0.25) 55%, transparent 80%)',
                }}
              />
            )}
          </AnimatePresence>

          <div
            className="absolute inset-0 pointer-events-none z-[3]"
            style={{
              background:
                'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.35) 42%, rgba(10,10,10,0.45) 100%)',
            }}
          />
        </motion.div>

        {showHeroContent && (
          <div className="absolute top-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            <button
              type="button"
              aria-label="Voir le code"
              onClick={goToCoding}
              disabled={beat === 1}
              className={`h-1 w-8 rounded-full transition-all duration-500 ${
                storyBeat === 0 ? 'bg-white scale-x-110' : 'bg-white/25 hover:bg-white/50'
              }`}
            />
            <button
              type="button"
              aria-label="Voir la transformation"
              onClick={goToCommercial}
              disabled={beat === 1}
              className={`h-1 w-8 rounded-full transition-all duration-500 ${
                storyBeat === 1 ? 'bg-white scale-x-110' : 'bg-white/25 hover:bg-white/50'
              }`}
            />
          </div>
        )}

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 md:pb-24 text-center">
          <motion.div
            className="flex max-w-3xl flex-col items-center"
            style={
              showHeroContent
                ? { scale: contentScale, opacity: contentOpacity, y: contentY }
                : { opacity: 0 }
            }
          >
            <AnimatePresence mode="wait">
              {showHeroContent && (
                <motion.div
                  key={storyBeat}
                  initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center"
                >
                  <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-white/45 md:text-xs">
                    {storyBeat === 0 ? '01 — Le code' : '02 — Le résultat'}
                  </p>

                  <h1 className="text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
                    {storyBeat === 0 ? (
                      <>
                        Votre site,
                        <span className="mt-1 block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
                          votre commercial.
                        </span>
                      </>
                    ) : (
                      <>
                        Un site qui
                        <span className="mt-1 block bg-gradient-to-r from-[#ff6b35] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent">
                          vend pour vous.
                        </span>
                      </>
                    )}
                  </h1>

                  <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/55 md:text-base">
                    {storyBeat === 0
                      ? 'Du code à la conversion : une expérience claire, rapide, mémorable.'
                      : 'Google, parcours fluide, appels à l’action — 24h/24.'}
                  </p>

                  {storyBeat === 0 ? (
                    <button
                      type="button"
                      onClick={goToCommercial}
                      disabled={beat === 1}
                      className="mt-8 inline-flex items-center justify-center border border-white/25 bg-white/[0.08] px-7 py-3.5 text-sm font-light text-white transition hover:bg-white/15 disabled:opacity-50"
                    >
                      {beat === 1 ? 'Transformation…' : 'Voir la transformation'}
                    </button>
                  ) : (
                    <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                      <button
                        type="button"
                        onClick={goToCoding}
                        disabled={beat === 1}
                        className="inline-flex w-full sm:w-auto items-center justify-center border border-white/25 bg-white/[0.06] px-7 py-3.5 text-sm font-light text-white transition hover:bg-white/12 disabled:opacity-50"
                      >
                        Revoir le code
                      </button>
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
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {showHeroContent && (
            <motion.div
              className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
              style={{ opacity: contentOpacity }}
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/25">
                {storyBeat === 0 ? 'Scroll ou cliquez' : 'Continuer'}
              </span>
              <motion.span
                className="block h-8 w-px origin-top bg-gradient-to-b from-white/40 to-transparent"
                animate={{ scaleY: [1, 0.5, 1], opacity: [0.45, 0.15, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </div>

        {!hasAnyVideo && showHeroContent && (
          <p className="pointer-events-none absolute left-5 bottom-5 z-20 text-[10px] tracking-wide text-white/25">
            Placez les MP4 dans /public/hero-videos
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
            onClick={() => {
              setLogoVisible(false)
              setPhase('ready')
              setHeroUiState('ready')
              document.body.style.overflow = ''
              startLenis()
            }}
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
                setLogoVisible(false)
                setPhase('ready')
                setHeroUiState('ready')
                document.body.style.overflow = ''
                startLenis()
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
