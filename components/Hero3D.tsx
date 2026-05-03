'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Import dynamique pour éviter les erreurs SSR (Three.js = client only)
const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => null,
})

export default function Hero3D() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Fond gradient radial subtil */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Grille décorative en arrière-plan */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Scène 3D pleine largeur derrière le contenu */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Hero3DScene />
        </Suspense>
      </div>

      {/* Vignette pour focaliser sur le contenu */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)',
        }}
      />

      {/* Contenu superposé */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-24 md:py-32">
        {/* Badge disponibilité */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/15 mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs md:text-sm text-white/85 font-light tracking-wide">
            Disponible pour vos projets
          </span>
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] max-w-5xl mx-auto"
        >
          <span className="block bg-gradient-to-r from-white via-[#a78bfa] to-white bg-clip-text text-transparent">
            Votre site web
          </span>
          <span className="block text-white/95 mt-2">
            qui transforme vos visiteurs
          </span>
          <span className="block bg-gradient-to-r from-[#ff6b35] via-[#a78bfa] to-[#3b82f6] bg-clip-text text-transparent mt-2">
            en clients fidèles
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 text-base md:text-lg lg:text-xl text-white/70 font-light tracking-wide max-w-3xl mx-auto leading-relaxed text-center"
        >
          Développeur full-stack indépendant. Je crée des sites web modernes, rapides et efficaces 
          qui boostent votre visibilité en ligne et font la différence face à vos concurrents.
        </motion.p>

        {/* Tags de réassurance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-10 text-xs md:text-sm"
        >
          {[
            { icon: '⚡', label: 'Sites ultra-rapides' },
            { icon: '📱', label: '100% responsive' },
            { icon: '🔍', label: 'Optimisés SEO' },
            { icon: '🎨', label: 'Design sur-mesure' },
          ].map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-white/85"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link href="/contact" data-cursor-hover>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white rounded-full text-base md:text-lg font-semibold shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.6)] transition-shadow overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Démarrer mon projet
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </Link>

          <a href="#services" data-cursor-hover>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-10 py-4 md:py-5 bg-white/[0.06] backdrop-blur-md border border-white/20 text-white rounded-full text-base md:text-lg font-light hover:bg-white/10 hover:border-white/40 transition-all"
            >
              Voir mes services
            </motion.div>
          </a>
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
