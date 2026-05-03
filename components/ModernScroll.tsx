'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

function ScrollPercentage({ progress }: { progress: any }) {
  const [percentage, setPercentage] = useState(0)
  const opacity = useTransform(progress, [0, 1], [0.4, 0.8])
  
  useEffect(() => {
    const unsubscribe = progress.on('change', (value: number) => {
      setPercentage(Math.round(value * 100))
    })
    return unsubscribe
  }, [progress])
  
  return (
    <motion.div
      className="text-xs text-white/40 font-light"
      style={{ opacity }}
    >
      {percentage}%
    </motion.div>
  )
}

interface ModernScrollProps {
  containerRef?: React.RefObject<HTMLElement>
}

export default function ModernScroll({ containerRef }: ModernScrollProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef || undefined,
    offset: ['start start', 'end end']
  })

  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [lastScrollY, setLastScrollY] = useState(0)

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform values for animations
  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1])
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      setIsScrolling(true)
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }

      setLastScrollY(currentScrollY)

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [lastScrollY])

  return (
    <>
      {/* Progress Bar - Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
        style={{ scaleX: scaleY }}
      >
        <div className="h-full w-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]" />
        <motion.div
          className="absolute top-0 right-0 h-full w-32 bg-white/20 blur-xl"
          animate={{
            x: isScrolling ? (scrollDirection === 'down' ? 50 : -50) : 0,
            opacity: isScrolling ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Scroll Indicator - Right Side */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-[9998] hidden lg:flex flex-col items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: opacity.get() > 0.1 ? 1 : 0, x: opacity.get() > 0.1 ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Scroll Text */}
        <motion.div
          className="text-xs uppercase tracking-widest text-white/40 font-light"
          animate={{ opacity: isScrolling ? 0.6 : 0.4 }}
        >
          Scroll
        </motion.div>

        {/* Progress Circle */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            {/* Background Circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#scrollGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
              }}
            />
            <defs>
              <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white"
            animate={{
              scale: isScrolling ? [1, 1.5, 1] : 1,
              opacity: isScrolling ? [0.8, 1, 0.8] : 0.6,
            }}
            transition={{
              duration: 0.6,
              repeat: isScrolling ? Infinity : 0,
            }}
          />
        </div>

        {/* Percentage */}
        <ScrollPercentage progress={smoothProgress} />
      </motion.div>

      {/* Scroll Hint - Bottom (only on first load) */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9997] flex flex-col items-center gap-2"
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: scrollYProgress.get() > 0.05 ? 0 : 1,
          y: scrollYProgress.get() > 0.05 ? 20 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-xs text-white/40 uppercase tracking-widest font-light"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Défilez
        </motion.div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-6 h-6 text-white/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </>
  )
}
