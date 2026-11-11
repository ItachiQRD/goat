'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SLIDES = [
  {
    id: 'offre',
    kicker: 'Ce que je fais',
    title: 'Un site qui vous trouve des clients',
    line: 'Vitrine, boutique ou outil métier.',
  },
  {
    id: 'process',
    kicker: 'Le déroulé',
    title: 'Quatre étapes, sans zone floue',
    line: 'On cadre, je conçois, je livre, on lance.',
  },
  {
    id: 'trust',
    kicker: 'Pourquoi moi',
    title: 'Une réponse sous 24 h',
    line: 'Un seul interlocuteur, suivi après la mise en ligne.',
  },
] as const

const INTERVAL = 4200

function SlideArt({ id }: { id: (typeof SLIDES)[number]['id'] }) {
  if (id === 'offre') {
    return (
      <svg viewBox="0 0 280 112" className="h-24 w-full md:h-28" aria-hidden="true">
        <rect x="18" y="10" width="168" height="92" rx="12" fill="#0c1218" stroke="#67e8f9" strokeOpacity="0.45" />
        <circle cx="34" cy="24" r="3" fill="#67e8f9" fillOpacity="0.7" />
        <circle cx="46" cy="24" r="3" fill="#a78bfa" fillOpacity="0.8" />
        <rect x="32" y="40" width="72" height="36" rx="6" fill="#22d3ee" fillOpacity="0.16" />
        <rect x="112" y="42" width="58" height="6" rx="3" fill="#e2e8f0" fillOpacity="0.7" />
        <rect x="112" y="54" width="46" height="5" rx="2.5" fill="#94a3b8" fillOpacity="0.45" />
        <rect x="112" y="66" width="52" height="5" rx="2.5" fill="#94a3b8" fillOpacity="0.3" />
        <rect x="198" y="28" width="64" height="58" rx="12" fill="#111827" stroke="#8b5cf6" strokeOpacity="0.55" />
        <rect x="208" y="40" width="44" height="22" rx="5" fill="#8b5cf6" fillOpacity="0.25" />
        <rect x="208" y="68" width="28" height="6" rx="3" fill="#22d3ee" />
      </svg>
    )
  }

  if (id === 'process') {
    return (
      <svg viewBox="0 0 280 112" className="h-24 w-full md:h-28" aria-hidden="true">
        <path d="M36 56h208" stroke="#67e8f9" strokeOpacity="0.35" strokeWidth="2" />
        {(
          [
            { n: '1', x: 36, color: '#22d3ee' },
            { n: '2', x: 104, color: '#38bdf8' },
            { n: '3', x: 172, color: '#818cf8' },
            { n: '4', x: 240, color: '#a78bfa' },
          ] as const
        ).map(({ n, x, color }) => (
          <g key={n}>
            <circle cx={x} cy="56" r="16" fill="#0b1220" stroke={color} strokeWidth="2" />
            <text x={x} y="61" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="inherit">
              {n}
            </text>
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 280 112" className="h-24 w-full md:h-28" aria-hidden="true">
      <path
        d="M140 16l46 16v28c0 26-18 42-46 50-28-8-46-24-46-50V32l46-16z"
        fill="#0c1218"
        stroke="#2dd4bf"
        strokeWidth="2"
      />
      <path d="M124 58l12 12 24-26" stroke="#5eead4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="28" y="78" width="52" height="18" rx="9" fill="#22d3ee" fillOpacity="0.15" stroke="#67e8f9" strokeOpacity="0.4" />
      <text x="54" y="91" textAnchor="middle" fill="#ccfbf1" fontSize="10" fontFamily="inherit">
        24 h
      </text>
      <rect x="200" y="78" width="52" height="18" rx="9" fill="#8b5cf6" fillOpacity="0.16" stroke="#c4b5fd" strokeOpacity="0.45" />
      <text x="226" y="91" textAnchor="middle" fill="#ede9fe" fontSize="10" fontFamily="inherit">
        suivi
      </text>
    </svg>
  )
}

/**
 * Hero sous 1280 px : trois écrans courts. La vidéo reste sur bureau.
 */
export default function HeroCompact() {
  const [index, setIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const slide = SLIDES[index]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReducedMotion(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, INTERVAL)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  return (
    <div className="hero-slides pointer-events-none absolute inset-x-0 top-16 bottom-40 z-[4] items-center justify-center px-5 md:bottom-44">
      <div className="pointer-events-auto w-full max-w-sm md:max-w-md">
        <div className="overflow-hidden rounded-3xl border border-cyan-200/20 bg-[#071018]/88 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
          <div className="h-0.5 bg-white/10">
            <motion.div
              key={reducedMotion ? 'still' : slide.id}
              className="h-full bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6]"
              initial={{ width: reducedMotion ? '100%' : '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: reducedMotion ? 0 : INTERVAL / 1000, ease: 'linear' }}
            />
          </div>

          <div className="relative min-h-[228px] px-5 pb-4 pt-4 md:min-h-[248px] md:px-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <SlideArt id={slide.id} />
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">
                  {slide.kicker}
                </p>
                <p className="mt-2 text-[1.35rem] font-light leading-tight tracking-tight text-white md:text-2xl">
                  {slide.title}
                </p>
                <p className="mt-2 text-sm font-light text-white/65">{slide.line}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-3 flex justify-center gap-2">
          {SLIDES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.kicker}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-cyan-200' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
