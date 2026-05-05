'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface LegalLayoutProps {
  title: string
  subtitle?: string
  lastUpdate?: string
  children: ReactNode
}

/**
 * Layout commun pour toutes les pages légales (mentions, RGPD, CGV).
 * Cohérent visuellement avec le reste du site (thème dark).
 */
export default function LegalLayout({
  title,
  subtitle,
  lastUpdate,
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen pt-32 pb-24 px-5 md:px-6 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Fil d'ariane */}
          <nav className="mb-8 text-xs md:text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{title}</span>
          </nav>

          {/* En-tête */}
          <header className="mb-10 md:mb-14 pb-8 border-b border-white/10">
            <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                {subtitle}
              </p>
            )}
            {lastUpdate && (
              <p className="mt-4 text-xs md:text-sm text-white/40">
                Dernière mise à jour : {lastUpdate}
              </p>
            )}
          </header>

          {/* Contenu */}
          <article className="legal-content space-y-6 text-white/75 font-light text-sm md:text-base leading-relaxed">
            {children}
          </article>

          {/* Retour accueil */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-light"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
