'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DualCardProps {
  icon: string
  title: string
  benefit: {
    headline: string
    description: string
    points: string[]
  }
  technical: {
    headline: string
    description: string
    techs: string[]
  }
  gradient: string
  illustration?: React.ReactNode
}

export default function DualCard({
  icon,
  title,
  benefit,
  technical,
  gradient,
  illustration,
}: DualCardProps) {
  const [view, setView] = useState<'benefit' | 'technical'>('benefit')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
    >
      <div
        className={`relative h-full min-h-[520px] rounded-3xl backdrop-blur-xl bg-gradient-to-br ${gradient} border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/30`}
      >
        {/* Effet de brillance au hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glow */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
        />

        {/* Toggle vue */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          <button
            onClick={() => setView('benefit')}
            className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all ${
              view === 'benefit'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Pour vous
          </button>
          <button
            onClick={() => setView('technical')}
            className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-medium transition-all ${
              view === 'technical'
                ? 'bg-white text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Tech
          </button>
        </div>

        <div className="relative z-10 h-full flex flex-col p-7 md:p-8">
          {/* Header avec icône et titre */}
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl md:text-6xl leading-none">{icon}</div>
            <div className="flex-1 pt-1">
              <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Illustration optionnelle */}
          {illustration && (
            <div className="relative mb-6 rounded-2xl overflow-hidden bg-black/20 border border-white/5 aspect-[16/9]">
              {illustration}
            </div>
          )}

          {/* Contenu animé */}
          <div className="flex-grow relative">
            <AnimatePresence mode="wait">
              {view === 'benefit' ? (
                <motion.div
                  key="benefit"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg md:text-xl font-medium text-white">
                    {benefit.headline}
                  </h4>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                    {benefit.description}
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {benefit.points.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 text-sm text-white/85"
                      >
                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" />
                        <span className="leading-relaxed">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div
                  key="technical"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h4 className="text-lg md:text-xl font-medium text-white">
                    {technical.headline}
                  </h4>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                    {technical.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {technical.techs.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/10 border border-white/20 backdrop-blur-sm text-white/90"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
