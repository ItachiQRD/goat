'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

interface ModernScrollProps {
  containerRef?: React.RefObject<HTMLElement>
}

export default function ModernScroll({ containerRef }: ModernScrollProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef || undefined,
    offset: ['start start', 'end end'],
  })

  // Lissage du suivi de scroll (Lenis fait déjà le smooth global)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Progress Bar - Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left pointer-events-none"
        style={{ scaleX: smoothProgress, willChange: 'transform' }}
      >
        <div className="h-full w-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]" />
      </motion.div>

      {/* Indicateur circulaire - Right Side */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[9998] hidden lg:flex flex-col items-center gap-3 pointer-events-none">
        <div className="text-xs uppercase tracking-widest text-white/30 font-light">
          Scroll
        </div>
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#scrollGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress, willChange: 'stroke-dashoffset' }}
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  )
}
