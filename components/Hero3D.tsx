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
 * Hero cinéma façon Rockstar / GTA 6 :
 * 1. Intro logo seule (scroll lock)
 * 2. Reveal progressif du hero + navbar
 * 3. Au scroll : centre scale + fade → ne reste que la navbar
 * 4. Slot vidéo : place /public/hero-bg.mp4 (fond #151515)
 */
export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<Phase>('intro')
  const [logoVisible, setLogoVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Rétrécit + baisse l'opacité du centre (pattern GTA 6)
  const contentScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.72])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.62], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -56])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (phase === 'hero' && v > 0.02) setPhase('ready')
  })

  // Préférence reduced-motion
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    if (media.matches) {
      setPhase('ready')
      setLogoVisible(false)
      setHeroUiState('ready')
    }
  }, [])

  // Timeline intro logo
  useEffect(() => {
    if (reducedMotion) return

    setHeroUiState('intro')
    window.lenis?.stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const tHold = window.setTimeout(() => setLogoVisible(false), 2800)
    const tReveal = window.setTimeout(() => {
      setPhase('hero')
      setHeroUiState('hero')
      document.body.style.overflow = prevOverflow
      window.lenis?.start()
      videoRef.current?.play().catch(() => {})
    }, 3600)
    const tReady = window.setTimeout(() => {
      setPhase('ready')
      setHeroUiState('ready')
    }, 5200)

    const skip = () => {
      window.clearTimeout(tHold)
      window.clearTimeout(tReveal)
      window.clearTimeout(tReady)
      setLogoVisible(false)
      setPhase('ready')
      setHeroUiState('ready')
      document.body.style.overflow = prevOverflow
      window.lenis?.start()
      videoRef.current?.play().catch(() => {})
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
      window.lenis?.start()
    }
  }, [reducedMotion])

  useEffect(() => {
    return () => {
      delete document.documentElement.dataset.heroPhase
    }
  }, [])

  const showHeroContent = phase === 'hero' || phase === 'ready'

  return (
    <section
      ref={sectionRef}
      className="relative h-[130vh] bg-transparent"
      aria-label="Introduction"
    >
      {/* Viewport épinglé */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Fond site + vidéo optionnelle (/public/hero-bg.mp4) */}
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <div className="absolute inset-0 bg-transparent" />
          {/* Atmosphère légère en attendant /public/hero-bg.mp4 */}
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background:
                'radial-gradient(ellipse 80% 55% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 70%, rgba(255,107,53,0.05) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            src="/hero-bg.mp4"
            muted
            playsInline
            loop
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
            aria-hidden="true"
          />
          {/* Voile léger pour lisibilité du texte */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, rgba(21,21,21,0.55) 100%)',
            }}
          />
        </motion.div>

        {/* Contenu hero — apparaît un à un, puis fade/scale au scroll */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            className="flex max-w-3xl flex-col items-center"
            style={
              showHeroContent
                ? {
                    scale: contentScale,
                    opacity: contentOpacity,
                    y: contentY,
                  }
                : { opacity: 0 }
            }
          >
            <AnimatePresence>
              {showHeroContent && (
                <>
                  <motion.p
                    key="kicker"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-5 text-[10px] uppercase tracking-[0.42em] text-white/45 md:text-xs"
                  >
                    {siteConfig.brand.name}
                  </motion.p>

                  <motion.h1
                    key="title"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                  >
                    Des sites web qui
                    <span className="mt-1 block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
                      transforment vos visiteurs
                    </span>
                    en clients.
                  </motion.h1>

                  <motion.p
                    key="sub"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 max-w-lg text-sm font-light leading-relaxed text-white/55 md:text-base"
                  >
                    Conçus comme une expérience, pas comme une brochure.
                    Rapides, sur-mesure, pensés pour Google et pour vos utilisateurs.
                  </motion.p>

                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.82, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
                  >
                    <Link href="/devis" data-cursor-hover className="w-full sm:w-auto">
                      <motion.span
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex w-full items-center justify-center px-7 py-3.5 text-sm font-medium text-black bg-white md:text-base"
                      >
                        Simuler un devis
                      </motion.span>
                    </Link>
                    <Link href="/contact" data-cursor-hover className="w-full sm:w-auto">
                      <motion.span
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex w-full items-center justify-center border border-white/20 bg-white/[0.06] px-7 py-3.5 text-sm font-light text-white md:text-base"
                      >
                        Me contacter
                      </motion.span>
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {showHeroContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
              style={{ opacity: contentOpacity }}
            >
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/25">
                Scroll
              </span>
              <motion.span
                className="block h-8 w-px origin-top bg-gradient-to-b from-white/40 to-transparent"
                animate={{ scaleY: [1, 0.5, 1], opacity: [0.45, 0.15, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Overlay intro logo — plein écran, au-dessus de tout */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#151515]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              setLogoVisible(false)
              setPhase('ready')
              setHeroUiState('ready')
              document.body.style.overflow = ''
              window.lenis?.start()
              videoRef.current?.play().catch(() => {})
            }}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                logoVisible
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 1.04 }
              }
              transition={{
                opacity: { duration: logoVisible ? 1.6 : 0.7, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: logoVisible ? 2.2 : 0.9, ease: [0.22, 1, 0.36, 1] },
              }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] shadow-[0_8px_40px_rgba(139,92,246,0.35)] md:h-20 md:w-20">
                <span className="relative z-10 text-2xl font-bold tracking-tighter text-white md:text-3xl">
                  FS
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent"
                  animate={{ x: ['-120%', '120%'] }}
                  transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.4 }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm font-light tracking-[0.28em] text-white/70 uppercase md:text-base">
                {siteConfig.brand.name}
              </p>
            </motion.div>

            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/20">
              Cliquer pour passer
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
