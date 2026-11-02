'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SCENES = [
  {
    id: 'code',
    kicker: 'Développement',
    title: 'Full stack',
  },
  {
    id: 'skills',
    kicker: 'Compétences',
    title: 'Stack moderne',
  },
  {
    id: 'offer',
    kicker: 'Pour votre activité',
    title: 'Un site qui travaille',
  },
] as const

const TECHS = ['Next.js', 'React', 'Tailwind', 'TypeScript']

const OFFERS = [
  { label: 'Vitrine pro', detail: 'Être trouvé localement' },
  { label: 'E-commerce', detail: 'Vendre 24h/24' },
  { label: 'Application', detail: 'Outil sur-mesure' },
]

export default function HeroCompact() {
  const [index, setIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    if (media.matches) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SCENES.length)
    }, 4600)
    return () => window.clearInterval(id)
  }, [])

  const scene = SCENES[index]

  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 bottom-40 z-[4] flex items-center justify-center px-5 md:top-20 md:bottom-44 xl:hidden">
      <div className="relative w-full max-w-sm md:max-w-md">
        <div
          className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/25 md:h-72 md:w-72"
          aria-hidden="true"
        />
        <div
          className={`absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-200/20 md:h-52 md:w-52 ${
            reducedMotion ? '' : 'animate-[spin_28s_linear_infinite]'
          }`}
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-[#071018]/80 px-5 py-6 shadow-[0_0_80px_rgba(34,211,238,0.16)] backdrop-blur-md md:px-7 md:py-8">
          <div className="relative min-h-[236px] md:min-h-[252px]">
          <AnimatePresence initial={false}>
            <motion.div
              key={scene.id}
              className="absolute inset-x-0 top-0"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[10px] uppercase tracking-[0.32em] text-cyan-200/70">
                {scene.kicker}
              </p>
              <p className="mt-2 text-2xl font-light tracking-tight text-white md:text-3xl">
                {scene.title}
              </p>

              {scene.id === 'code' && (
                <pre className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-4 text-left font-mono text-[11px] leading-relaxed text-cyan-100/90 md:text-xs">
                  <span className="text-white/35">const</span> site = build({'{'}
                  {'\n'}
                  {'  '}stack: [<span className="text-white">&apos;Next.js&apos;</span>],{'\n'}
                  {'  '}delai: <span className="text-white">&apos;&lt; 2s&apos;</span>,{'\n'}
                  {'}'})
                </pre>
              )}

              {scene.id === 'skills' && (
                <ul className="mt-5 grid grid-cols-2 gap-2.5">
                  {TECHS.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-2xl border border-cyan-200/20 bg-cyan-300/[0.06] px-3 py-3 text-center text-sm text-cyan-50"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {scene.id === 'offer' && (
                <ul className="mt-5 space-y-2.5">
                  {OFFERS.map((offer) => (
                    <li
                      key={offer.label}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-cyan-200/20 bg-cyan-300/[0.06] px-4 py-3"
                    >
                      <span className="text-sm text-white">{offer.label}</span>
                      <span className="text-[11px] text-cyan-100/70">{offer.detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
            {SCENES.map((item, i) => (
              <span
                key={item.id}
                className={`h-1 rounded-full transition-all ${
                  i === index ? 'w-5 bg-cyan-200' : 'w-1.5 bg-white/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
