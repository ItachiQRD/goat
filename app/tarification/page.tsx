'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Clock, Users, Terminal, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import GlowEffect from '@/components/GlowEffect'

const pricingModels = [
  {
    icon: Clock,
    accentColor: '#3b82f6',
    title: "Au temps passé",
    description: 'Idéal pour de petites missions ou des évolutions ponctuelles.',
    price: 'À partir de 60 €',
    priceUnit: '/ heure',
    features: [
      'Facturation transparente',
      'Flexibilité maximale',
      'Compte-rendu détaillé du temps',
      "Pas d'engagement minimum",
      'Adaptation en cours de projet',
    ],
    bestFor: 'Petites tâches, ajouts ponctuels, support',
  },
  {
    icon: Terminal,
    accentColor: '#8b5cf6',
    title: 'Au forfait projet',
    description:
      'Prix fixe pour un projet complet, du devis à la livraison. Le plus demandé.',
    price: 'Sur devis',
    priceUnit: '',
    features: [
      'Budget connu à l\'avance',
      'Périmètre clair et signé',
      'Livraison garantie',
      'Paiement échelonné (30/40/30)',
      "Garantie de 30 jours après livraison",
    ],
    bestFor: 'Sites vitrines, e-commerce, applications',
    popular: true,
  },
  {
    icon: Users,
    accentColor: '#ff6b35',
    title: 'Au forfait mensuel',
    description: 'Accompagnement continu : maintenance, évolutions, support.',
    price: 'À partir de 500 €',
    priceUnit: '/ mois',
    features: [
      'Maintenance et mises à jour',
      'Pool d\'heures dédié',
      'Priorité sur vos demandes',
      'Évolutions régulières',
      'Rapports mensuels',
    ],
    bestFor: 'Sites en production, projets en croissance',
  },
]

const factors = [
  {
    title: 'Complexité du projet',
    description:
      "Plus le projet a de fonctionnalités spécifiques, plus il demande de temps de conception et de développement.",
    examples: [
      'Site vitrine simple : 30-60h',
      'Site e-commerce : 80-150h',
      'Application sur-mesure : 150h et plus',
    ],
  },
  {
    title: 'Design et UX',
    description:
      "Un design totalement sur-mesure prend plus de temps qu'un thème adapté.",
    examples: [
      'Maquettes Figma incluses',
      'Animations et transitions',
      "Tests d'utilisabilité",
    ],
  },
  {
    title: 'Délais',
    description:
      "Des délais serrés peuvent nécessiter une priorisation et un complément tarifaire.",
    examples: [
      'Délai standard : pas de surcoût',
      'Délai serré : +20 à 30%',
      "Urgence : sur étude",
    ],
  },
  {
    title: 'Maintenance',
    description:
      "La maintenance et les évolutions post-livraison sont facturées séparément.",
    examples: [
      "Forfait mensuel disponible",
      'Support à l\'heure ou au ticket',
      'Évolutions par avenant',
    ],
  },
]

const process = [
  {
    step: 1,
    title: 'Échange gratuit',
    description: 'Discussion de 30 min pour comprendre vos besoins. Sans engagement.',
  },
  {
    step: 2,
    title: 'Devis détaillé',
    description: "Proposition complète : périmètre, planning, prix. Validité 30 jours.",
  },
  {
    step: 3,
    title: 'Validation',
    description: "Ajustements si besoin, signature et acompte de 30%.",
  },
  {
    step: 4,
    title: 'Développement',
    description: 'Travail en itérations avec démos régulières et retours.',
  },
  {
    step: 5,
    title: 'Livraison & formation',
    description: 'Mise en production, formation à l\'utilisation, garantie 30 jours.',
  },
]

export default function Tarification() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-5 md:px-6 relative overflow-hidden">
      <GlowEffect intensity={0.3} color="rgba(139, 92, 246, 0.2)" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Hero */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-4">
              Tarification
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-[1.05] tracking-tight mb-5">
              Une tarification
              <span className="block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent mt-1">
                claire et transparente
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Pas de prix caché, pas de surprise. Choisissez la formule qui correspond
              le mieux à votre projet et à votre rythme.
            </p>
          </div>
        </ScrollReveal>

        {/* Modèles de tarification */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 mb-20">
          {pricingModels.map((model, i) => {
            const Icon = model.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative h-full ${model.popular ? 'lg:-mt-4' : ''}`}
              >
                {model.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white text-[11px] uppercase tracking-widest whitespace-nowrap shadow-lg">
                      Le plus demandé
                    </span>
                  </div>
                )}

                <div
                  className={`relative h-full p-6 md:p-8 rounded-2xl backdrop-blur-xl border transition-all overflow-hidden ${
                    model.popular
                      ? 'bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/5 border-[#8b5cf6]/30 shadow-[0_20px_60px_rgba(139,92,246,0.15)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/10"
                      style={{
                        background: `linear-gradient(135deg, ${model.accentColor}33, transparent)`,
                        color: model.accentColor,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-light tracking-tight mb-2">
                      {model.title}
                    </h3>
                    <p className="text-sm text-white/60 font-light leading-relaxed mb-5">
                      {model.description}
                    </p>

                    <div className="mb-6 pb-6 border-b border-white/[0.08]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl md:text-4xl font-light tracking-tight">
                          {model.price}
                        </span>
                        {model.priceUnit && (
                          <span className="text-sm text-white/50">{model.priceUnit}</span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {model.features.map((f, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-white/75 font-light"
                        >
                          <Check
                            className="w-4 h-4 mt-0.5 flex-shrink-0"
                            style={{ color: model.accentColor }}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="text-xs text-white/50 italic mb-5">
                      Idéal pour : {model.bestFor}
                    </div>

                    <Link href="/contact">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          model.popular
                            ? 'bg-white text-black hover:bg-white/90'
                            : 'bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/30'
                        }`}
                      >
                        Demander un devis
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Note */}
        <ScrollReveal>
          <div className="mb-20 p-5 md:p-6 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20 max-w-3xl mx-auto">
            <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
              <span className="text-amber-300 font-medium">À noter :</span> les tarifs
              affichés sont indicatifs et peuvent varier selon la complexité réelle
              du projet. Chaque mission fait l'objet d'un devis détaillé personnalisé,
              gratuit et sans engagement.
            </p>
          </div>
        </ScrollReveal>

        {/* Facteurs */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-center mb-3">
              Ce qui influence le prix
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light text-center max-w-2xl mx-auto mb-12">
              Pour vous aider à comprendre la valeur d'une prestation web.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {factors.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-light mb-2">{f.title}</h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed mb-4">
                    {f.description}
                  </p>
                  <ul className="space-y-1.5 pt-3 border-t border-white/[0.06]">
                    {f.examples.map((ex, j) => (
                      <li
                        key={j}
                        className="text-xs md:text-sm text-white/70 font-light flex items-start gap-2"
                      >
                        <span className="text-[#60a5fa] mt-0.5">→</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Process */}
        <ScrollReveal>
          <div className="mb-20">
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-center mb-3">
              Le processus de collaboration
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light text-center max-w-2xl mx-auto mb-12">
              5 étapes claires, de la première discussion à la mise en ligne.
            </p>

            <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
              {process.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center font-medium text-sm md:text-base">
                    {p.step}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base md:text-lg font-light tracking-tight mb-1">
                      {p.title}
                    </h3>
                    <p className="text-sm text-white/60 font-light leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3b82f6]/15 via-[#8b5cf6]/10 to-[#ff6b35]/15 border border-white/10 p-8 md:p-14 text-center">
            <h2 className="text-2xl md:text-4xl font-light leading-tight mb-4">
              Obtenez un devis gratuit
            </h2>
            <p className="text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto mb-7 leading-relaxed">
              Décrivez votre projet, recevez une estimation personnalisée sous 24h.
              Sans engagement, sans commitment.
            </p>
            <Link href="/contact" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                Demander mon devis
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
