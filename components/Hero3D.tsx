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
            'radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.55) 100%)',
        }}
      />

      {/* Contenu superposé */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Badge disponibilité */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-7"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          <span className="text-xs text-white/70 font-light tracking-wide">
            Disponible pour vos projets
          </span>
        </motion.div>

        {/* Titre principal — épuré */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight max-w-3xl mx-auto text-white"
        >
          Des sites web qui transforment vos visiteurs en{' '}
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#a78bfa] to-[#ff6b35] bg-clip-text text-transparent">
            clients
          </span>
          .
        </motion.h1>

        {/* Sous-titre — court */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-6 text-sm md:text-base text-white/55 font-light max-w-xl mx-auto leading-relaxed"
        >
          Développeur full-stack indépendant. Modernes, rapides, optimisés SEO.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9"
        >
          <Link href="/contact" data-cursor-hover className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 bg-white text-black rounded-full text-sm md:text-base font-medium hover:bg-white/90 transition-colors"
            >
              Démarrer mon projet
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            </motion.div>
          </Link>

          <a href="#services" data-cursor-hover className="w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center w-full px-7 py-3.5 bg-white/[0.04] backdrop-blur-md border border-white/15 text-white rounded-full text-sm md:text-base font-light hover:bg-white/10 hover:border-white/30 transition-all"
            >
              Voir mes services
            </motion.div>
          </a>
        </motion.div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
