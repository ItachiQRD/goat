'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export interface ProcessStep {
  number: string
  title: string
  simple: string
  duration: string
  deliverables: string[]
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

/**
 * Timeline animée scroll-linked qui donne un effet de "cheminement".
 *
 * - La ligne verticale se "trace" au fur et à mesure du scroll dans la section
 * - Un point lumineux suit la progression du scroll le long de la ligne
 * - Chaque étape s'illumine quand le point la traverse
 * - Optimisé mobile (ligne à gauche) ET desktop (ligne au centre, étapes alternées)
 */
export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })

  // Lissage pour un mouvement organique
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  })

  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const dotPosition = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  const dotOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto">
      {/* Ligne de fond (statique, claire) */}
      <div
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:w-[3px] -ml-px md:-ml-[1.5px] bg-white/[0.06] rounded-full"
        aria-hidden="true"
      />

      {/* Ligne animée qui se "trace" au scroll */}
      <motion.div
        className="absolute left-6 md:left-1/2 top-0 w-0.5 md:w-[3px] -ml-px md:-ml-[1.5px] bg-gradient-to-b from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] rounded-full origin-top"
        style={{ height: lineHeight, willChange: 'height' }}
        aria-hidden="true"
      />

      {/* Point lumineux qui descend (effet "cheminement") */}
      <motion.div
        className="absolute left-6 md:left-1/2 -ml-2 md:-ml-2.5 w-4 h-4 md:w-5 md:h-5 rounded-full pointer-events-none z-20"
        style={{
          top: dotPosition,
          opacity: dotOpacity,
          willChange: 'top, opacity',
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(139,92,246,0.6)]" />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#8b5cf6]"
          animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Étapes */}
      <div className="space-y-10 md:space-y-16 lg:space-y-20">
        {steps.map((step, i) => (
          <TimelineStep key={i} step={step} index={i} progress={smoothProgress} total={steps.length} />
        ))}
      </div>
    </div>
  )
}

interface TimelineStepProps {
  step: ProcessStep
  index: number
  progress: ReturnType<typeof useSpring>
  total: number
}

function TimelineStep({ step, index, progress, total }: TimelineStepProps) {
  const isLeft = index % 2 === 0

  // Le seuil de "passage" du point sur cette étape
  const stepStart = index / total
  const stepActive = (index + 0.4) / total
  const stepEnd = (index + 1) / total

  // Le numéro/badge passe de "inactif" à "actif" quand le point lumineux passe dessus
  const badgeScale = useTransform(progress, [stepStart, stepActive], [0.85, 1])
  const badgeGlow = useTransform(
    progress,
    [stepStart, stepActive, stepEnd],
    [0, 1, 1]
  )
  const badgeBg = useTransform(
    progress,
    [stepStart, stepActive],
    ['rgba(255,255,255,0.05)', 'rgba(59,130,246,1)']
  )

  // La carte révèle en glissant légèrement
  const cardOpacity = useTransform(progress, [stepStart, stepActive], [0.35, 1])
  const cardX = useTransform(
    progress,
    [stepStart, stepActive],
    [isLeft ? -20 : 20, 0]
  )

  return (
    <motion.div
      className={`relative flex items-start gap-4 md:gap-12 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Badge / Numéro animé */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          style={{
            scale: badgeScale,
            backgroundColor: badgeBg,
            willChange: 'transform, background-color',
          }}
          className="relative w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10"
        >
          <span className="text-base md:text-3xl font-bold text-white relative z-10">
            {step.number}
          </span>

          {/* Halo lumineux quand actif */}
          <motion.div
            className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]"
            style={{ opacity: badgeGlow }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.5)]"
            style={{ opacity: badgeGlow }}
            aria-hidden="true"
          />
          <span className="text-base md:text-3xl font-bold absolute inset-0 flex items-center justify-center z-10">
            {step.number}
          </span>
        </motion.div>
      </div>

      {/* Carte de contenu */}
      <motion.div
        style={{ opacity: cardOpacity, x: cardX, willChange: 'opacity, transform' }}
        className={`flex-1 md:max-w-xl ${isLeft ? 'md:text-left' : 'md:text-right'}`}
      >
        <div className="relative p-4 md:p-7 rounded-xl md:rounded-2xl backdrop-blur-xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all">
          <div className={`flex flex-wrap items-start gap-2 md:gap-3 mb-3 md:mb-4 ${isLeft ? '' : 'md:justify-end'}`}>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-light leading-tight">{step.title}</h3>
            <span className="text-[10px] md:text-xs px-2.5 md:px-3 py-1 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#60a5fa] whitespace-nowrap flex-shrink-0">
              ⏱ {step.duration}
            </span>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed mb-3 md:mb-5 font-light">
            {step.simple}
          </p>
          <div className={`flex flex-wrap gap-1.5 md:gap-2 ${isLeft ? '' : 'md:justify-end'}`}>
            {step.deliverables.map((item, j) => (
              <span
                key={j}
                className="text-[11px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 inline-flex items-center gap-1.5"
              >
                <svg
                  className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="hidden md:block flex-1 md:max-w-xl" />
    </motion.div>
  )
}
