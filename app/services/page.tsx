'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Terminal,
  Database,
  Smartphone,
  Cloud,
  Lock,
  Zap,
  Palette,
  Globe,
  ArrowRight,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import GlowEffect from '@/components/GlowEffect'

const services = [
  {
    icon: Globe,
    title: 'Sites vitrines & landing pages',
    description:
      "Présentez votre activité avec une vitrine en ligne moderne, rapide et qui inspire confiance dès la première seconde.",
    audience: 'Idéal pour : artisans, indépendants, TPE/PME',
    features: [
      'Design sur-mesure et responsive',
      'Optimisation SEO de base incluse',
      "Performance Core Web Vitals (note Google >90)",
      'Formulaires de contact, prise de RDV',
      'Hébergement et déploiement clé en main',
      "Formation à l'autonomie",
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    accentColor: '#3b82f6',
  },
  {
    icon: Terminal,
    title: 'Applications web sur-mesure',
    description:
      "Plateformes métier, espaces clients, dashboards, outils internes. Conçus pour scaler avec votre activité.",
    audience: 'Idéal pour : startups, agences, PME en croissance',
    features: [
      'Architecture moderne (Next.js, React, TypeScript)',
      'Authentification sécurisée et gestion des rôles',
      'API REST ou GraphQL',
      'Base de données performante',
      'Tests automatisés',
      "Documentation technique livrée",
    ],
    gradient: 'from-violet-500/20 to-purple-500/20',
    accentColor: '#8b5cf6',
  },
  {
    icon: Smartphone,
    title: 'E-commerce',
    description:
      "Boutiques en ligne robustes pour vendre vos produits ou services 24/7, avec une expérience fluide et sécurisée.",
    audience: 'Idéal pour : commerçants, créateurs, marques',
    features: [
      'Catalogue produits et gestion des stocks',
      'Paiement sécurisé (Stripe, PayPal)',
      'Multi-langue et multi-devise',
      'Optimisation conversion (panier, checkout)',
      'Tunnel de vente analytique',
      'Intégration ERP/CRM possible',
    ],
    gradient: 'from-orange-500/20 to-pink-500/20',
    accentColor: '#ff6b35',
  },
  {
    icon: Palette,
    title: 'UI / UX Design',
    description:
      "Maquettes, prototypes interactifs, design system. Une interface pensée pour vos utilisateurs.",
    audience: 'Idéal pour : projets cherchant à se différencier',
    features: [
      'Recherche utilisateurs et personae',
      'Wireframes et maquettes Figma',
      'Prototypage interactif',
      'Design system documenté',
      "Tests d'utilisabilité",
      "Optimisation des taux de conversion",
    ],
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentColor: '#ec4899',
  },
  {
    icon: Zap,
    title: "Optimisation & SEO",
    description:
      "Audit et amélioration de la performance, du référencement et de l'expérience d'un site existant.",
    audience: 'Idéal pour : sites lents, en perte de visibilité',
    features: [
      'Audit technique et SEO complet',
      "Optimisation des Core Web Vitals",
      "Réduction du temps de chargement",
      "Optimisation des images et du code",
      "Suivi du positionnement Google",
      "Recommandations actionables",
    ],
    gradient: 'from-yellow-500/20 to-orange-500/20',
    accentColor: '#facc15',
  },
  {
    icon: Cloud,
    title: 'DevOps & Hébergement',
    description:
      "Déploiement automatisé, hébergement performant, monitoring. Que votre site soit toujours en ligne.",
    audience: 'Idéal pour : projets nécessitant haute disponibilité',
    features: [
      'CI/CD avec GitHub Actions',
      'Hébergement Vercel, AWS ou OVH',
      'Configuration domaine et HTTPS',
      'Monitoring et alertes',
      'Sauvegardes automatisées',
      'Support et maintenance',
    ],
    gradient: 'from-cyan-500/20 to-teal-500/20',
    accentColor: '#06b6d4',
  },
  {
    icon: Lock,
    title: 'Sécurité & RGPD',
    description:
      "Mise en conformité RGPD, audits de sécurité, durcissement de votre site existant.",
    audience: 'Idéal pour : tous les sites traitant des données',
    features: [
      "Mentions légales, RGPD, CGV",
      'Bandeau cookies conforme',
      "HTTPS, en-têtes de sécurité",
      "Audit OWASP Top 10",
      'Protection contre les injections',
      "Documentation de conformité",
    ],
    gradient: 'from-emerald-500/20 to-green-500/20',
    accentColor: '#10b981',
  },
  {
    icon: Database,
    title: "Maintenance & évolutions",
    description:
      "Suivi régulier, ajout de fonctionnalités, mises à jour de sécurité. Votre site continue de progresser.",
    audience: 'Idéal pour : sites en production',
    features: [
      'Mises à jour de sécurité',
      'Monitoring de la disponibilité',
      'Sauvegardes hebdomadaires',
      "Ajout de fonctionnalités à la demande",
      'Support réactif',
      'Rapports mensuels',
    ],
    gradient: 'from-indigo-500/20 to-blue-500/20',
    accentColor: '#6366f1',
  },
]

export default function Services() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-5 md:px-6 relative overflow-hidden">
      <GlowEffect intensity={0.3} color="rgba(59, 130, 246, 0.2)" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-4">
              Mes services
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-[1.05] tracking-tight mb-5">
              Des solutions
              <span className="block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent mt-1">
                pour chaque projet
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Du site vitrine simple à l'application web complète, je propose des
              solutions adaptées à vos besoins, votre budget et vos objectifs.
            </p>
          </div>
        </ScrollReveal>

        {/* Grille services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-20">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative h-full"
              >
                <div className="relative h-full p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all overflow-hidden">
                  {/* Gradient subtil au hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    {/* Icône */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${service.accentColor}33, transparent)`,
                        color: service.accentColor,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Titre + description */}
                    <h2 className="text-xl md:text-2xl font-light tracking-tight mb-2">
                      {service.title}
                    </h2>
                    <p className="text-sm md:text-base text-white/70 font-light leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <p className="text-xs md:text-sm text-white/50 italic mb-5">
                      {service.audience}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 pt-4 border-t border-white/[0.06]">
                      {service.features.map((feat, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-xs md:text-sm text-white/70 font-light"
                        >
                          <svg
                            className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                            style={{ color: service.accentColor }}
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
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3b82f6]/15 via-[#8b5cf6]/10 to-[#ff6b35]/15 border border-white/10 p-8 md:p-14 text-center">
            <h2 className="text-2xl md:text-4xl font-light leading-tight mb-4">
              Un projet en tête ?
            </h2>
            <p className="text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto mb-7 leading-relaxed">
              Échange gratuit de 30 min pour comprendre vos besoins et vous proposer
              la solution adaptée. Sans engagement.
            </p>
            <Link href="/contact" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                Démarrer la conversation
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
