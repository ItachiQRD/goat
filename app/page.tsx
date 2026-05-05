'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SplitText from '@/components/SplitText'
import ScrollReveal from '@/components/ScrollReveal'
import Hero3D from '@/components/Hero3D'
import FloatingParticles from '@/components/FloatingParticles'
import GlowEffect from '@/components/GlowEffect'
import MorphingBlob from '@/components/MorphingBlob'
import ParallaxBackground from '@/components/ParallaxBackground'
import ModernScroll from '@/components/ModernScroll'
import DualCard from '@/components/DualCard'
import AnimatedCounter from '@/components/AnimatedCounter'
import ModernIllustration from '@/components/ModernIllustration'
import MobileExpand from '@/components/MobileExpand'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Données : section Pour Qui
  const audiences = [
    {
      emoji: '👨\u200d🍳',
      title: 'Artisans & Commerçants',
      desc: 'Restaurants, boulangeries, coiffeurs, garages... Faites-vous trouver localement et présentez vos services avec style.',
      tags: ['Site vitrine', 'SEO local', 'Réservations'],
    },
    {
      emoji: '💼',
      title: 'Indépendants & Freelances',
      desc: 'Consultants, coachs, photographes, thérapeutes... Un portfolio professionnel qui inspire confiance et convertit.',
      tags: ['Portfolio', 'Prise de RDV', 'Témoignages'],
    },
    {
      emoji: '🏢',
      title: 'TPE & PME',
      desc: 'Startups, agences, cabinets... Une plateforme robuste qui scale avec votre croissance et automatise vos processus.',
      tags: ['Sur-mesure', 'CRM', 'Automatisation'],
    },
    {
      emoji: '🛍️',
      title: 'E-commerce',
      desc: 'Boutiques en ligne, marketplaces, créateurs... Vendez 24/7 avec une boutique qui pousse à l\'achat.',
      tags: ['Paiement sécurisé', 'Stock', 'Livraison'],
    },
    {
      emoji: '🎓',
      title: 'Associations & Écoles',
      desc: 'Présentez vos activités, gérez vos membres, organisez vos événements simplement.',
      tags: ['Adhésions', 'Événements', 'Newsletter'],
    },
    {
      emoji: '🚀',
      title: 'Projets ambitieux',
      desc: 'Une idée innovante ? Une application complexe ? Discutons-en, je relève les défis techniques.',
      tags: ['Sur-mesure', 'Innovation', 'Scaling'],
    },
  ]

  // Données : Stack Technique reformulée
  const techCategories = [
    {
      label: 'Ce qui rend votre site rapide',
      simple: 'Pages qui chargent en moins de 2 secondes, même sur mobile',
      icon: '⚡',
      techs: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Server Components'],
      gradient: 'from-yellow-500/20 via-orange-500/10 to-red-500/20',
    },
    {
      label: 'Ce qui sécurise vos données',
      simple: 'Vos données et celles de vos clients sont protégées au plus haut niveau',
      icon: '🔒',
      techs: ['HTTPS/SSL', 'OAuth 2.0', 'JWT', 'Bcrypt', 'CSRF Protection', 'RGPD'],
      gradient: 'from-blue-500/20 via-indigo-500/10 to-violet-500/20',
    },
    {
      label: 'Ce qui gère votre contenu',
      simple: 'Modifiez vos textes, images et produits sans toucher au code',
      icon: '📝',
      techs: ['Sanity', 'Strapi', 'Contentful', 'PostgreSQL', 'MongoDB'],
      gradient: 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
    },
    {
      label: 'Ce qui héberge votre site',
      simple: 'Votre site reste en ligne 24h/24, partout dans le monde',
      icon: '☁️',
      techs: ['Vercel', 'AWS', 'Cloudflare', 'Docker', 'CI/CD'],
      gradient: 'from-purple-500/20 via-fuchsia-500/10 to-pink-500/20',
    },
  ]

  // Données : Process
  const processSteps = [
    {
      number: '01',
      title: 'On discute de votre projet',
      simple: 'Échange gratuit pour comprendre vos besoins, vos objectifs et votre univers.',
      duration: '30 min',
      deliverables: ['Brief clair', 'Devis transparent', 'Planning'],
    },
    {
      number: '02',
      title: 'Je conçois votre site',
      simple: 'Maquettes interactives validées avec vous avant tout développement.',
      duration: '3-7 jours',
      deliverables: ['Wireframes', 'Maquettes Figma', 'Charte graphique'],
    },
    {
      number: '03',
      title: 'Je développe et teste',
      simple: 'Création du site avec démos régulières pour suivre l\'avancement.',
      duration: '2-6 semaines',
      deliverables: ['Démo en direct', 'Tests qualité', 'Optimisations'],
    },
    {
      number: '04',
      title: 'On met en ligne',
      simple: 'Lancement du site, formation à son utilisation, suivi continu.',
      duration: '1-2 jours',
      deliverables: ['Mise en production', 'Formation', 'Support'],
    },
  ]

  // Données : Services (DualCards) - dans une variable pour itérer avec MobileExpand
  const services = [
    {
      icon: '🌐',
      title: 'Site Vitrine Pro',
      gradient: 'from-blue-500/15 via-cyan-500/10 to-blue-500/15',
      illustrationType: 'visibility' as const,
      benefit: {
        headline: 'Soyez trouvé sur Google',
        description: 'Un site qui présente votre activité, capte vos visiteurs et les transforme en prospects qualifiés.',
        points: [
          'Apparaître dans les premiers résultats Google',
          'Donner envie dès la première seconde',
          'Gagner la confiance des visiteurs',
          'Récupérer leurs contacts automatiquement',
        ],
      },
      technical: {
        headline: 'Stack moderne et SEO-first',
        description: 'Architecture statique/SSR optimisée pour les Core Web Vitals et le crawl Google.',
        techs: ['Next.js 14', 'TypeScript', 'Tailwind', 'Sanity CMS', 'Sitemap auto', 'Schema.org'],
      },
    },
    {
      icon: '🛍️',
      title: 'Boutique en Ligne',
      gradient: 'from-orange-500/15 via-red-500/10 to-pink-500/15',
      illustrationType: 'shop' as const,
      benefit: {
        headline: 'Vendez 24h/24, partout',
        description: 'Une boutique en ligne complète et facile à gérer pour développer votre chiffre d\'affaires.',
        points: [
          'Paiements sécurisés (CB, PayPal, Apple Pay)',
          'Gestion simple des produits et stocks',
          'Suivi des commandes en temps réel',
          'Bons de réduction et fidélisation',
        ],
      },
      technical: {
        headline: 'E-commerce headless ou Shopify',
        description: 'Stack performante avec Stripe, gestion d\'inventaire en temps réel et webhooks.',
        techs: ['Stripe', 'Shopify', 'Medusa.js', 'PostgreSQL', 'Algolia', 'Cloudinary'],
      },
    },
    {
      icon: '📊',
      title: 'Application Métier',
      gradient: 'from-purple-500/15 via-violet-500/10 to-fuchsia-500/15',
      illustrationType: 'analytics' as const,
      benefit: {
        headline: 'Automatisez votre quotidien',
        description: 'Un outil sur-mesure qui remplace vos Excel et fait gagner des heures à votre équipe.',
        points: [
          'Fini la double saisie et les erreurs',
          'Vos données accessibles partout',
          'Tableaux de bord visuels et clairs',
          'Évolue avec votre entreprise',
        ],
      },
      technical: {
        headline: 'SaaS multi-tenant scalable',
        description: 'Application web sécurisée avec rôles, permissions, API REST/GraphQL et webhooks.',
        techs: ['React', 'Node.js', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
      },
    },
    {
      icon: '📱',
      title: 'Site Responsive',
      gradient: 'from-green-500/15 via-emerald-500/10 to-teal-500/15',
      illustrationType: 'mobile' as const,
      benefit: {
        headline: 'Beau sur tous les écrans',
        description: 'Smartphone, tablette, ordinateur : votre site s\'adapte parfaitement à chaque appareil.',
        points: [
          '60% des visiteurs viennent du mobile',
          'Design pensé pour le tactile',
          'Vitesse optimale même en 4G',
          'Compatible iOS et Android',
        ],
      },
      technical: {
        headline: 'Mobile-first, PWA-ready',
        description: 'Approche mobile-first avec breakpoints fluides, lazy loading et optimisations images.',
        techs: ['Tailwind', 'PWA', 'WebP/AVIF', 'srcset', 'Container queries'],
      },
    },
    {
      icon: '🔐',
      title: 'Sécurité & RGPD',
      gradient: 'from-blue-600/15 via-indigo-500/10 to-blue-600/15',
      illustrationType: 'security' as const,
      benefit: {
        headline: 'Vos données sont en sécurité',
        description: 'Conformité RGPD, certificat SSL, sauvegardes automatiques. Vous dormez tranquille.',
        points: [
          'Bandeau cookies conforme RGPD',
          'Données chiffrées de bout en bout',
          'Sauvegardes automatiques quotidiennes',
          'Mentions légales complètes',
        ],
      },
      technical: {
        headline: 'Best practices OWASP',
        description: 'Authentification robuste, protection CSRF/XSS, audit de sécurité, headers HTTP stricts.',
        techs: ['OAuth 2.0', 'JWT', 'Bcrypt', 'Helmet.js', 'Rate limiting', 'CSP'],
      },
    },
    {
      icon: '🎨',
      title: 'Design Sur-Mesure',
      gradient: 'from-pink-500/15 via-rose-500/10 to-purple-500/15',
      illustrationType: 'design' as const,
      benefit: {
        headline: 'Une identité unique',
        description: 'Pas de template recyclé. Un design pensé pour votre marque, vos couleurs, votre univers.',
        points: [
          'Identité visuelle cohérente',
          'Animations subtiles et modernes',
          'Effets visuels qui captivent',
          'Mémorable face à la concurrence',
        ],
      },
      technical: {
        headline: 'Animations & micro-interactions',
        description: 'Framer Motion, GSAP, WebGL avec Three.js. Performance maintenue grâce au GPU.',
        techs: ['Framer Motion', 'GSAP', 'Three.js', 'Lottie', 'WebGL'],
      },
    },
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-[#151515] text-white overflow-x-hidden relative">
      <ModernScroll containerRef={containerRef} />

      {/* ====== HERO 3D ====== */}
      <Hero3D />

      {/* ====== POURQUOI UN BON SITE ? ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden" id="pourquoi">
        <ParallaxBackground speed={0.3}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/5 to-transparent" />
        </ParallaxBackground>
        <GlowEffect intensity={0.4} color="rgba(59, 130, 246, 0.25)" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="text-base md:text-lg italic opacity-60">01</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 text-right">
                Pourquoi un bon site ?
              </span>
            </div>
            <div className="max-w-4xl mb-10 md:mb-16 lg:mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1] tracking-tight mb-5 md:mb-8">
                <SplitText>Votre site, c'est votre</SplitText>
                <span className="block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent mt-1 md:mt-2">
                  meilleur commercial
                </span>
              </h2>
              <p className="text-base md:text-xl lg:text-2xl text-white/70 font-light leading-relaxed">
                Il travaille 24h/24, ne prend jamais de pause, et touche des milliers de personnes.
                Mais encore faut-il qu'il soit <span className="text-white font-medium">rapide, beau et bien pensé</span>.
              </p>
            </div>
          </ScrollReveal>

          {/* Grille de bénéfices - 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: '75%', label: 'des utilisateurs jugent la crédibilité d\'une entreprise sur son site', color: 'from-blue-500/20 to-cyan-500/20', icon: '🎯' },
              { stat: '3s', label: 'maximum pour qu\'un visiteur attende avant de partir', color: 'from-yellow-500/20 to-orange-500/20', icon: '⏱️' },
              { stat: '60%', label: 'du trafic web mondial se fait depuis un mobile', color: 'from-purple-500/20 to-pink-500/20', icon: '📱' },
              { stat: '×7', label: 'plus de visibilité avec un bon référencement Google', color: 'from-green-500/20 to-emerald-500/20', icon: '📈' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className={`relative h-full p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl backdrop-blur-xl bg-gradient-to-br ${item.color} border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden`}>
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)' }}
                  />
                  <div className="relative z-10">
                    <div className="text-2xl md:text-4xl mb-2 md:mb-4">{item.icon}</div>
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                      {item.stat}
                    </div>
                    <p className="text-xs md:text-sm lg:text-base text-white/80 leading-snug md:leading-relaxed font-light">
                      {item.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 md:mt-16 max-w-3xl mx-auto text-center">
              <p className="text-base md:text-lg lg:text-xl text-white/60 font-light leading-relaxed">
                Un site bâclé, c'est des clients perdus. Un site soigné, c'est une réputation qui se construit.
                <span className="block mt-2 text-white/90 font-medium">
                  Quel message votre site envoie-t-il ?
                </span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== MES SERVICES ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden" id="services">
        <ParallaxBackground speed={0.4}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent" />
        </ParallaxBackground>
        <GlowEffect intensity={0.5} color="rgba(139, 92, 246, 0.3)" />
        <FloatingParticles count={8} className="z-0" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="text-base md:text-lg italic opacity-60">02</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 text-right">Mes services</span>
            </div>
            <div className="space-y-4 md:space-y-6 max-w-3xl mb-6 md:mb-8">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1] tracking-tight">
                <SplitText>Ce que je crée</SplitText>
                <span className="block text-white/60 mt-1 md:mt-2">pour vous</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
                Chaque carte se lit dans deux langues : <span className="text-white font-medium">"Pour vous"</span> pour
                comprendre ce que vous obtenez, <span className="text-white font-medium">"Tech"</span> pour voir
                les technologies derrière.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 mb-8 md:mb-12 px-3 md:px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-white/70"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Cliquez sur les onglets pour basculer la vue</span>
            </motion.div>
          </ScrollReveal>

          {/* Cartes services - 3 visibles sur mobile, le reste accessible via "Voir plus" */}
          <MobileExpand
            initialCount={3}
            expandFrom="md"
            showMoreLabel="Voir tous les services"
            showLessLabel="Réduire"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {services.map((service, i) => (
              <DualCard
                key={i}
                icon={service.icon}
                title={service.title}
                gradient={service.gradient}
                illustration={<ModernIllustration type={service.illustrationType} />}
                benefit={service.benefit}
                technical={service.technical}
              />
            ))}
          </MobileExpand>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 md:mt-16 text-center">
              <Link href="/services" data-cursor-hover className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  <span className="text-sm md:text-base font-light">Voir tous les services en détail</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== POUR QUI ? ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden" id="pour-qui">
        <ParallaxBackground speed={0.3}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff6b35]/5 to-transparent" />
        </ParallaxBackground>
        <GlowEffect intensity={0.4} color="rgba(255, 107, 53, 0.25)" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="text-base md:text-lg italic opacity-60">03</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 text-right">Pour qui</span>
            </div>
            <div className="max-w-4xl mb-10 md:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1] tracking-tight mb-5 md:mb-6">
                <SplitText>Vous vous</SplitText>
                <span className="block bg-gradient-to-r from-[#ff6b35] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent mt-1 md:mt-2">
                  reconnaissez ?
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
                J'accompagne tout type de projet. Que vous soyez seul·e à la maison ou à la tête d'une équipe,
                votre projet mérite une attention sur-mesure.
              </p>
            </div>
          </ScrollReveal>

          {/* Audiences - 3 visibles mobile, "Voir plus" pour le reste */}
          <MobileExpand
            initialCount={3}
            expandFrom="md"
            showMoreLabel="Voir tous les profils"
            showLessLabel="Réduire"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {audiences.map((audience, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                <div className="relative h-full p-5 md:p-7 rounded-xl md:rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  />
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl mb-3 md:mb-5">{audience.emoji}</div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-medium mb-2 md:mb-3">{audience.title}</h3>
                    <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4 md:mb-5 font-light">
                      {audience.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 pt-3 border-t border-white/10">
                      {audience.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="text-[11px] md:text-xs px-2.5 md:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </MobileExpand>
        </div>
      </section>

      {/* ====== COMMENT ÇA SE PASSE ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden" id="processus">
        <ParallaxBackground speed={0.4}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/5 to-transparent" />
        </ParallaxBackground>
        <MorphingBlob className="z-0" colors={['rgba(59, 130, 246, 0.15)', 'rgba(139, 92, 246, 0.15)']} />

        <div className="container mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="text-base md:text-lg italic opacity-60">04</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 text-right">Comment ça se passe</span>
            </div>
            <div className="max-w-4xl mb-10 md:mb-16 lg:mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1] tracking-tight mb-5 md:mb-6">
                <SplitText>De l'idée au site,</SplitText>
                <span className="block bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent mt-1 md:mt-2">
                  en 4 étapes simples
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
                Pas de jargon, pas de surprise. Vous savez exactement ce qui se passe, quand,
                et combien ça coûte.
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Ligne verticale */}
            <motion.div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 -ml-px md:-ml-0.5 bg-gradient-to-b from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-8 md:space-y-16 lg:space-y-20">
              {processSteps.map((step, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`relative flex items-start gap-4 md:gap-12 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Numéro */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="relative w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center shadow-[0_10px_30px_rgba(59,130,246,0.4)]"
                      >
                        <span className="text-base md:text-3xl font-bold">{step.number}</span>
                        <motion.div
                          className="absolute inset-0 rounded-xl md:rounded-2xl border-2 border-[#3b82f6]"
                          animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                    </div>

                    {/* Carte */}
                    <div className={`flex-1 md:max-w-xl ${isLeft ? 'md:text-left' : 'md:text-right'}`}>
                      <div className="relative p-4 md:p-7 rounded-xl md:rounded-2xl backdrop-blur-xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all">
                        <div className={`flex flex-wrap items-start gap-2 md:gap-3 mb-3 md:mb-4 ${isLeft ? '' : 'md:justify-end'}`}>
                          <h3 className="text-lg md:text-2xl lg:text-3xl font-light leading-tight">{step.title}</h3>
                          <span className="text-[10px] md:text-xs px-2.5 md:px-3 py-1 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/30 text-[#60a5fa] whitespace-nowrap flex-shrink-0">
                            ⏱ {step.duration}
                          </span>
                        </div>
                        <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed mb-3 md:mb-5 font-light">
                          {step.simple}
                        </p>
                        <div className={`flex flex-wrap gap-1.5 md:gap-2 ${isLeft ? '' : 'md:justify-end'}`}>
                          {step.deliverables.map((item, j) => (
                            <span
                              key={j}
                              className="text-[11px] md:text-xs px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 inline-flex items-center gap-1.5"
                            >
                              <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block flex-1 md:max-w-xl" />
                  </motion.div>
                )
              })}
            </div>
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 md:mt-20 text-center max-w-2xl mx-auto px-4">
              <p className="text-sm md:text-lg text-white/60 font-light leading-relaxed">
                <span className="text-white">Et après ?</span> Je reste disponible pour faire évoluer votre site,
                ajouter des fonctionnalités, ou simplement répondre à vos questions.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== STACK TECHNIQUE ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden" id="stack">
        <ParallaxBackground speed={0.4}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent" />
        </ParallaxBackground>
        <GlowEffect intensity={0.5} color="rgba(147, 51, 234, 0.3)" />
        <FloatingParticles count={8} className="z-0" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="text-base md:text-lg italic opacity-60">05</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 text-right">Sous le capot</span>
            </div>
            <div className="max-w-4xl mb-10 md:mb-16 lg:mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1] tracking-tight mb-5 md:mb-6">
                <SplitText>Les outils qui</SplitText>
                <span className="block bg-gradient-to-r from-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent mt-1 md:mt-2">
                  font la différence
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/70 font-light leading-relaxed">
                Pas besoin d'être technicien pour comprendre. Voici ce qui se cache derrière votre site,
                et pourquoi ces choix changent <span className="text-white font-medium">votre quotidien</span>.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {techCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className={`relative h-full p-5 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-xl bg-gradient-to-br ${cat.gradient} border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden`}>
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)' }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="text-3xl md:text-5xl flex-shrink-0">{cat.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-1.5 md:mb-2">
                          {cat.label}
                        </div>
                        <p className="text-sm md:text-lg lg:text-xl font-light text-white leading-snug">
                          {cat.simple}
                        </p>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-white/20 to-transparent mb-3 md:mb-5" />
                    <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-2 md:mb-3">
                      Technos utilisées
                    </div>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {cat.techs.map((tech, j) => (
                        <motion.span
                          key={j}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-[11px] md:text-xs font-mono bg-black/30 border border-white/10 text-white/80 backdrop-blur-sm cursor-default"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== RÉSULTATS / STATS ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden">
        <ParallaxBackground speed={0.5}>
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3b82f6]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b5cf6]/15 rounded-full blur-3xl" />
          </div>
        </ParallaxBackground>

        <div className="container mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-4 md:mb-6">
                Des résultats
                <span className="block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
                  qui parlent d'eux-mêmes
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/60 font-light max-w-2xl mx-auto px-4">
                Performance, qualité, satisfaction client. Mes engagements en chiffres.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { value: 100, suffix: '/100', label: 'Score Lighthouse', desc: 'Performance Google maximale', color: 'from-yellow-500 to-orange-500' },
              { value: 1.2, suffix: 's', label: 'Temps de chargement', desc: 'Plus rapide que 90% des sites', color: 'from-blue-500 to-cyan-500', decimals: 1 },
              { value: 99.9, suffix: '%', label: 'Disponibilité', desc: 'Site en ligne 24h/24, 365j/an', color: 'from-green-500 to-emerald-500', decimals: 1 },
              { value: 100, suffix: '%', label: 'Sur-mesure', desc: 'Aucun template, tout est unique', color: 'from-purple-500 to-pink-500' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="relative p-4 md:p-6 lg:p-8 rounded-xl md:rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/10 hover:border-white/30 transition-all overflow-hidden text-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 md:mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-none`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                    </div>
                    <div className="text-xs md:text-base lg:text-lg font-medium text-white mb-1">
                      {stat.label}
                    </div>
                    <div className="text-[10px] md:text-xs lg:text-sm text-white/60 font-light leading-tight">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparatif visuel - refait pour mobile */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 md:mt-20 max-w-4xl mx-auto">
              <div className="p-5 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-center mb-8 md:mb-10 leading-tight">
                  Site classique <span className="text-white/40">vs</span>{' '}
                  <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                    Site optimisé
                  </span>
                </h3>

                <div className="space-y-7 md:space-y-8">
                  {[
                    { label: 'Vitesse de chargement', classique: 'from-red-500 to-red-600', classiqueWidth: '30%', optimise: 'from-green-500 to-emerald-500', optimiseWidth: '95%' },
                    { label: 'Référencement Google', classique: 'from-orange-500 to-red-500', classiqueWidth: '40%', optimise: 'from-blue-500 to-cyan-500', optimiseWidth: '92%' },
                    { label: 'Taux de conversion', classique: 'from-yellow-500 to-orange-500', classiqueWidth: '25%', optimise: 'from-purple-500 to-pink-500', optimiseWidth: '88%' },
                  ].map((row, i) => (
                    <div key={i} className="space-y-3 md:space-y-4">
                      <div className="text-sm md:text-base font-medium text-white/90">{row.label}</div>
                      
                      {/* Site classique */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5 text-[11px] md:text-xs">
                          <span className="text-white/50">Site classique</span>
                          <span className="text-white/40 font-mono">{row.classiqueWidth}</span>
                        </div>
                        <div className="h-2.5 md:h-3 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: row.classiqueWidth }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className={`h-full bg-gradient-to-r ${row.classique} rounded-full`}
                          />
                        </div>
                      </div>

                      {/* Site optimisé */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5 text-[11px] md:text-xs">
                          <span className="text-[#60a5fa] font-medium">Mes sites</span>
                          <span className="text-[#60a5fa] font-mono">{row.optimiseWidth}</span>
                        </div>
                        <div className="h-2.5 md:h-3 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: row.optimiseWidth }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: i * 0.2 + 0.3 }}
                            className={`h-full bg-gradient-to-r ${row.optimise} rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== À PROPOS ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden" id="a-propos">
        <ParallaxBackground speed={0.5}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5cf6]/5 to-transparent" />
          </div>
        </ParallaxBackground>
        <MorphingBlob className="z-0" colors={['rgba(139, 92, 246, 0.2)', 'rgba(59, 130, 246, 0.2)']} />

        <div className="container mx-auto max-w-7xl relative z-10">
          <ScrollReveal>
            <div className="mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="text-base md:text-lg italic opacity-60">06</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 text-right">À propos</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-10 md:mb-20">
            {/* Visuel - réduit sur mobile */}
            <ScrollReveal direction="left">
              <div className="relative aspect-square max-w-[280px] sm:max-w-xs md:max-w-md mx-auto">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border border-white/10"
                    style={{ transform: `scale(${0.6 + i * 0.15})` }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 30 + i * 10, repeat: Infinity, ease: 'linear' }}
                  >
                    {[0, 90, 180, 270].map((angle) => (
                      <div
                        key={angle}
                        className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${angle}deg) translate(${50}%) translate(-50%, -50%)`,
                        }}
                      />
                    ))}
                  </motion.div>
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] flex items-center justify-center text-5xl md:text-7xl shadow-[0_20px_60px_rgba(59,130,246,0.4)]"
                  >
                    <span>👨‍💻</span>
                    <div className="absolute -bottom-2 -right-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-green-500 text-white text-[10px] md:text-xs font-medium shadow-lg flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse" />
                      Disponible
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>

            {/* Texte */}
            <ScrollReveal direction="right">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                  <span className="block text-white/60">Salut,</span>
                  <span className="block bg-gradient-to-r from-white via-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                    moi c'est votre futur dev.
                  </span>
                </h2>

                <p className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed font-light">
                  Développeur full-stack indépendant, je crée des sites web et applications
                  qui font vraiment la différence. <span className="text-white font-medium">Pas de blabla, pas de jargon</span> —
                  juste un travail soigné qui vous apporte des résultats concrets.
                </p>

                <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light">
                  Que vous soyez novice en informatique ou passionné de tech, je m'adapte à votre niveau.
                  Je traduis le technique en bénéfices clairs, et je vous tiens informé·e à chaque étape.
                </p>

                <div className="grid grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4">
                  {[
                    { icon: '🎯', title: 'Engagé', desc: 'Sur la qualité et les délais' },
                    { icon: '💬', title: 'Disponible', desc: 'Réponse sous 24h' },
                    { icon: '🤝', title: 'Transparent', desc: 'Sur les prix et le process' },
                    { icon: '🚀', title: 'Passionné', desc: 'Par l\'innovation web' },
                  ].map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-3 md:p-4 rounded-lg md:rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="text-xl md:text-2xl mb-1 md:mb-2">{val.icon}</div>
                      <div className="text-sm md:text-base font-medium mb-0.5">{val.title}</div>
                      <div className="text-[11px] md:text-xs text-white/60 leading-snug">{val.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Tech tags - Carousel */}
          <ScrollReveal delay={0.3}>
            <div className="relative pt-8 md:pt-12 border-t border-white/10">
              <div className="text-center mb-5 md:mb-8">
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 mb-2 md:mb-3">
                  Technologies maîtrisées
                </div>
                <p className="text-sm md:text-base text-white/60 font-light px-4">
                  Un arsenal moderne pour des solutions modernes
                </p>
              </div>

              <div className="overflow-hidden relative">
                <motion.div
                  className="flex gap-2 md:gap-4"
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  style={{ width: 'max-content', willChange: 'transform' }}
                >
                  {[
                    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
                    'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Tailwind', 'Framer Motion',
                    'Three.js', 'Stripe', 'Prisma', 'Redis', 'Vercel', 'Sanity',
                    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
                    'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Tailwind', 'Framer Motion',
                    'Three.js', 'Stripe', 'Prisma', 'Redis', 'Vercel', 'Sanity',
                  ].map((tech, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-mono text-white/80"
                    >
                      {tech}
                    </div>
                  ))}
                </motion.div>

                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#151515] to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#151515] to-transparent pointer-events-none" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section className="py-16 md:py-24 lg:py-32 px-5 md:px-6 relative overflow-hidden" id="contact">
        <ParallaxBackground speed={0.6}>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/5 to-transparent" />
          </div>
        </ParallaxBackground>
        <MorphingBlob className="z-0" colors={['rgba(59, 130, 246, 0.2)', 'rgba(236, 72, 153, 0.2)']} />
        <GlowEffect intensity={0.7} color="rgba(59, 130, 246, 0.35)" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <ScrollReveal>
            <div className="mb-6 md:mb-8 flex items-center gap-3 md:gap-4">
              <span className="text-base md:text-lg italic opacity-60">07</span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 text-right">On en parle ?</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[1] tracking-tight mb-5 md:mb-8">
                <SplitText>Prêt·e à donner vie</SplitText>
                <span className="block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent mt-1 md:mt-2">
                  à votre projet ?
                </span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed mb-6 md:mb-10 px-2">
                Que vous ayez une idée précise ou juste une envie floue, parlons-en.
                <span className="block mt-1.5 md:mt-2 text-white">Le premier échange est toujours gratuit.</span>
              </p>

              {/* Boutons CTA - full-width sur mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4 max-w-md sm:max-w-none mx-auto">
                <Link href="/contact" data-cursor-hover className="block sm:inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white rounded-full text-sm md:text-lg font-semibold shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.6)] transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Démarrer mon projet
                      <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </motion.div>
                </Link>

                <Link href="/tarification" data-cursor-hover className="block sm:inline-block">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full text-sm md:text-lg font-light hover:bg-white/10 hover:border-white/40 transition-all text-center"
                  >
                    Voir les tarifs
                  </motion.div>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Cartes contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-20">
            {[
              { icon: '💬', title: 'Discuter', desc: 'Décrivez-moi votre projet, je vous réponds sous 24h.', action: 'contact@example.com', gradient: 'from-blue-500/20 to-cyan-500/20', href: 'mailto:contact@example.com' },
              { icon: '📅', title: 'Planifier', desc: 'Réservez un appel de 30 minutes, sans engagement.', action: 'Prendre rendez-vous', gradient: 'from-purple-500/20 to-pink-500/20', href: '/contact' },
              { icon: '🔗', title: 'Me suivre', desc: 'Restons en contact sur les réseaux professionnels.', action: 'LinkedIn · GitHub', gradient: 'from-orange-500/20 to-red-500/20', href: '#' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <Link href={card.href} className="block h-full" data-cursor-hover>
                  <div className={`relative h-full p-5 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-xl bg-gradient-to-br ${card.gradient} border border-white/10 group-hover:border-white/30 transition-all duration-500 overflow-hidden`}>
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none"
                      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)' }}
                    />
                    <div className="relative z-10">
                      <div className="text-4xl md:text-5xl mb-3 md:mb-5">{card.icon}</div>
                      <h3 className="text-lg md:text-2xl font-medium mb-2 md:mb-3">{card.title}</h3>
                      <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light mb-4 md:mb-6">
                        {card.desc}
                      </p>
                      <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-white border-t border-white/10 pt-3 md:pt-4">
                        <span className="truncate">{card.action}</span>
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bandeau de réassurance - 1 col mobile, 2 cols sm, 4 cols md */}
          <ScrollReveal delay={0.4}>
            <div className="mt-10 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
              {[
                { icon: '✓', label: 'Devis gratuit' },
                { icon: '✓', label: 'Sans engagement' },
                { icon: '✓', label: 'Réponse 24h' },
                { icon: '✓', label: 'Transparence' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-4 py-2.5 md:py-3 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-white/80"
                >
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] md:text-xs font-bold flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
