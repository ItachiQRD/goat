'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Lock } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import GlowEffect from '@/components/GlowEffect'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'web', label: 'Sites web' },
    { id: 'webapp', label: 'Applications' },
    { id: 'ecommerce', label: 'E-commerce' },
  ]

  // ⚠️ Projets factices (placeholders) — à remplacer par vos vraies réalisations.
  const projects = [
    {
      id: 1,
      title: 'Site vitrine - Cabinet conseil',
      category: 'web',
      description:
        "Refonte complète d'un site vitrine pour un cabinet de conseil B2B. Design moderne, optimisation SEO, prise de RDV en ligne.",
      technologies: ['Next.js', 'Tailwind', 'Sanity CMS'],
      image: '💼',
      gradient: 'from-blue-500/30 to-cyan-500/20',
      result: '+180% de leads qualifiés',
    },
    {
      id: 2,
      title: 'Boutique en ligne artisanale',
      category: 'ecommerce',
      description:
        "Site e-commerce pour un artisan créateur. Catalogue produit, panier, paiement Stripe, gestion des stocks.",
      technologies: ['Next.js', 'Stripe', 'PostgreSQL'],
      image: '🛍️',
      gradient: 'from-orange-500/30 to-pink-500/20',
      result: '+45% de conversion vs ancien site',
    },
    {
      id: 3,
      title: 'Plateforme de gestion de tâches',
      category: 'webapp',
      description:
        "Application web SaaS pour gérer les tâches d'équipe. Authentification, dashboards, temps réel.",
      technologies: ['React', 'Node.js', 'PostgreSQL'],
      image: '📋',
      gradient: 'from-violet-500/30 to-purple-500/20',
      result: 'Utilisée par 5 équipes',
    },
    {
      id: 4,
      title: 'Dashboard analytique',
      category: 'webapp',
      description:
        "Tableau de bord interactif pour visualiser des données en temps réel. Graphiques, export, filtres avancés.",
      technologies: ['React', 'D3.js', 'Python'],
      image: '📊',
      gradient: 'from-emerald-500/30 to-teal-500/20',
      result: 'Gain de temps : 3h/jour',
    },
    {
      id: 5,
      title: 'Site portfolio créatif',
      category: 'web',
      description:
        "Site portfolio pour un photographe. Galeries élégantes, animations fluides, optimisation des images.",
      technologies: ['Next.js', 'Framer Motion'],
      image: '📸',
      gradient: 'from-pink-500/30 to-rose-500/20',
      result: 'Note Lighthouse : 98/100',
    },
    {
      id: 6,
      title: 'Plateforme de réservation',
      category: 'webapp',
      description:
        "Système de réservation en ligne pour un restaurant. Calendrier, paiement, notifications email.",
      technologies: ['Next.js', 'Stripe', 'Resend'],
      image: '📅',
      gradient: 'from-indigo-500/30 to-blue-500/20',
      result: 'Réservations multipliées par 3',
    },
  ]

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-5 md:px-6 relative overflow-hidden">
      <GlowEffect intensity={0.3} color="rgba(139, 92, 246, 0.2)" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-[1.05] tracking-tight mb-5">
              Quelques
              <span className="block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent mt-1">
                réalisations
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Une sélection de projets variés. Chaque mission est l'occasion d'apporter
              une solution sur-mesure à un besoin concret.
            </p>
          </div>
        </ScrollReveal>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-light transition-all border ${
                selectedCategory === c.id
                  ? 'bg-white text-black border-white shadow-[0_4px_20px_rgba(255,255,255,0.2)]'
                  : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative h-full"
            >
              <div className="relative h-full rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all overflow-hidden">
                {/* Visuel */}
                <div
                  className={`relative aspect-[16/10] flex items-center justify-center text-6xl md:text-7xl bg-gradient-to-br ${project.gradient} overflow-hidden`}
                >
                  <span className="relative z-10 grayscale-0 group-hover:scale-110 transition-transform duration-500">
                    {project.image}
                  </span>
                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* Contenu */}
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-light tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/65 font-light leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, j) => (
                      <span
                        key={j}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Résultat */}
                  <div className="flex items-center gap-2 text-xs md:text-sm pt-3 border-t border-white/[0.06] text-emerald-300/90">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11l3-3 4 4 7-7 2 2-9 9-7-5z" />
                    </svg>
                    <span className="font-light">{project.result}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note de confidentialité */}
        <ScrollReveal>
          <div className="mb-16 p-5 md:p-7 rounded-2xl bg-white/[0.03] border border-white/10 max-w-3xl mx-auto flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/60 flex-shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="flex-1 text-sm md:text-base text-white/70 font-light leading-relaxed">
              <strong className="text-white/90">Confidentialité.</strong> Certains projets
              ne peuvent être présentés publiquement à la demande de mes clients. Sur
              demande, je peux vous fournir des références supplémentaires lors d'un
              échange.
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3b82f6]/15 via-[#8b5cf6]/10 to-[#ff6b35]/15 border border-white/10 p-8 md:p-14 text-center">
            <h2 className="text-2xl md:text-4xl font-light leading-tight mb-4">
              Et si votre projet rejoignait cette liste ?
            </h2>
            <p className="text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto mb-7 leading-relaxed">
              Discutons de vos objectifs et voyons comment je peux vous aider à les
              atteindre.
            </p>
            <Link href="/contact" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                Démarrer un projet
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
