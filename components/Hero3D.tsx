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
  const [showCtas, setShowCtas] = useState(false)

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
    const el = videoRef.current
    if (!el) return
    // muted doit être une propriété DOM, sinon l'autoplay est bloqué
    el.muted = true
    el.defaultMuted = true
    const markReady = () => setHasVideo(true)
    el.addEventListener('loadeddata', markReady)
    el.addEventListener('canplay', markReady)
    if (el.readyState >= 2) markReady()
    return () => {
      el.removeEventListener('loadeddata', markReady)
      el.removeEventListener('canplay', markReady)
    }
  }, [])

  useEffect(() => {
    if (phase === 'intro') return
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.play().catch(() => {})
  }, [phase, hasVideo])

  const showHeroContent = phase === 'hero' || phase === 'ready'

  useEffect(() => {
    if (!showHeroContent) {
      setShowCtas(false)
      return
    }
    const t = window.setTimeout(() => setShowCtas(true), 5000)
    return () => window.clearTimeout(t)
  }, [showHeroContent])

  return (
    <section
      ref={sectionRef}
      className="relative h-[160vh] bg-transparent"
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#07080d]" aria-hidden="true" />
          <div
            className="absolute -inset-10 blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse 50% 42% at 50% 46%, rgba(36, 48, 78, 0.85) 0%, rgba(16, 18, 28, 0.35) 58%, transparent 78%)',
            }}
            aria-hidden="true"
          />

          <motion.video
            ref={videoRef}
            className="hero-video-media absolute inset-0 h-full w-full object-cover"
            style={{ scale: videoScale }}
            src={VIDEO_HERO}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setHasVideo(true)}
            onCanPlay={() => setHasVideo(true)}
            onError={() => setHasVideo(false)}
            aria-hidden="true"
          />

          <div className="absolute inset-0 pointer-events-none z-[3] bg-[linear-gradient(to_top,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.35)_42%,rgba(10,10,10,0.45)_100%)]" />
        </div>

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
                <h1 className="sr-only">{siteConfig.brand.name}</h1>

                <AnimatePresence>
                  {showCtas && (
                    <motion.div
                      key="hero-ctas"
                      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="flex w-full max-w-md sm:max-w-none flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4"
                    >
                      <Link href="/devis" className="block sm:inline-block">
                        <motion.span
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 px-7 md:px-9 py-3.5 md:py-4 rounded-full text-sm md:text-base font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] shadow-[0_12px_40px_rgba(59,130,246,0.35)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.5)] transition-shadow"
                        >
                          Simuler un devis
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </motion.span>
                      </Link>

                      <Link href="/contact" className="block sm:inline-block">
                        <motion.span
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex w-full sm:w-auto items-center justify-center px-7 md:px-9 py-3.5 md:py-4 rounded-full text-sm md:text-base font-light text-white border border-white/25 bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/40 transition-colors"
                        >
                          Me contacter
                        </motion.span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.name}
                className="h-44 w-auto max-w-[min(80vw,22rem)] object-contain md:h-56"
              />
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
