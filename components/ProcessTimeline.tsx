'use client'

import { motion, useReducedMotion } from 'framer-motion'

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
 * Timeline légère : ligne CSS + étapes whileInView (plus de springs scroll-linked).
 */
export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="relative max-w-5xl mx-auto">
      <div
        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:w-[3px] -ml-px md:-ml-[1.5px] bg-gradient-to-b from-[#3b82f6]/40 via-[#8b5cf6]/50 to-[#ff6b35]/40 rounded-full"
        aria-hidden="true"
      />

      <div className="space-y-10 md:space-y-16 lg:space-y-20">
        {steps.map((step, i) => (
          <TimelineStep key={i} step={step} index={i} />
        ))}
      </div>
    </div>
  )
}

function TimelineStep({ step, index }: { step: ProcessStep; index: number }) {
  const isLeft = index % 2 === 0
  const prefersReduced = useReducedMotion()

  const badge = (
    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
      <span className="text-base md:text-2xl font-bold text-white relative z-10">
        {step.number}
      </span>
    </div>
  )

  const card = (alignToRight: boolean) => (
    <div className={alignToRight ? 'md:text-right' : 'md:text-left'}>
      <div className="relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-colors">
        <div
          className={`flex flex-wrap items-start gap-2 md:gap-3 mb-3 md:mb-4 ${
            alignToRight ? 'md:justify-end' : ''
          }`}
        >
          <h3 className="text-lg md:text-xl lg:text-2xl font-light leading-tight">
            {step.title}
          </h3>
          <span className="text-[10px] md:text-xs px-2.5 md:px-3 py-1 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#60a5fa] whitespace-nowrap flex-shrink-0">
            ⏱ {step.duration}
          </span>
        </div>
        <p className="text-sm md:text-base text-white/70 leading-relaxed mb-3 md:mb-5 font-light">
          {step.simple}
        </p>
        <div
          className={`flex flex-wrap gap-1.5 md:gap-2 ${
            alignToRight ? 'md:justify-end' : ''
          }`}
        >
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
    </div>
  )

  const motionProps = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-10% 0px', amount: 0.25 },
        transition: { duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <motion.div {...motionProps} className="relative">
      <div className="flex md:hidden items-start gap-5">
        <div className="relative z-10 flex-shrink-0">{badge}</div>
        <div className="flex-1 min-w-0">{card(false)}</div>
      </div>

      <div className="hidden md:flex items-center">
        <div className="flex-1 flex justify-end pr-12">
          {isLeft && <div className="w-full max-w-md">{card(true)}</div>}
        </div>
        <div className="relative z-10 flex-shrink-0">{badge}</div>
        <div className="flex-1 flex justify-start pl-12">
          {!isLeft && <div className="w-full max-w-md">{card(false)}</div>}
        </div>
      </div>
    </motion.div>
  )
}
