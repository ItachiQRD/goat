'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedHeroProps {
  onScreenChange?: (screenIndex: number) => void
}

export default function AnimatedHero({ onScreenChange }: AnimatedHeroProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; size: number; left: number; duration: number; delay: number; drift: number }>>([])
  const autoPlayTimerRef = useRef<NodeJS.Timeout>()
  const totalScreens = 3

  // Create particles
  useEffect(() => {
    const particleCount = 40
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 100,
    }))
    setParticles(newParticles)
  }, [])

  // Auto-play screens
  useEffect(() => {
    const transitionInterval = 15000 // 15 seconds per screen
    
    const startAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentScreen((prev) => (prev + 1) % totalScreens)
      }, transitionInterval)
    }

    startAutoPlay()
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (onScreenChange) {
      onScreenChange(currentScreen)
    }
  }, [currentScreen, onScreenChange])

  const switchScreen = (index: number) => {
    if (index < 0 || index >= totalScreens) return
    setCurrentScreen(index)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Screens */}
      <div className="relative w-full h-full">
        {/* Screen 1: Hero */}
        <AnimatePresence mode="wait">
          {currentScreen === 0 && (
            <HeroScreen
              key="hero"
              particles={particles}
              onCTAClick={() => switchScreen(1)}
            />
          )}
        </AnimatePresence>

        {/* Screen 2: Process */}
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <ProcessScreen key="process" />
          )}
        </AnimatePresence>

        {/* Screen 3: Trust */}
        <AnimatePresence mode="wait">
          {currentScreen === 2 && (
            <TrustScreen key="trust" />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Hero Screen Component
function HeroScreen({ particles, onCTAClick }: { particles: Array<any>, onCTAClick: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [1, 0.8, 1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Geometric Shapes */}
      <motion.div
        className="absolute w-[200px] h-[200px] top-[15%] left-[15%] border-2 border-[#3b82f6] opacity-30"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute w-[150px] h-[150px] bottom-[20%] right-[20%] border-2 border-[#8b5cf6] rounded-full opacity-30"
        animate={{
          rotate: [360, 180, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white/60 rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              bottom: 0,
            }}
            animate={{
              y: ['100%', '-100%'],
              x: [0, particle.drift],
              scale: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-center max-w-5xl px-6 md:px-10"
      >
        {/* Badge de positionnement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs md:text-sm text-white/80 font-light tracking-wide">
            Disponible pour vos projets
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 leading-[1.05]">
          <span className="block bg-gradient-to-r from-white via-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
            Votre site web
          </span>
          <span className="block text-white/90 mt-2">
            qui transforme vos visiteurs
          </span>
          <span className="block bg-gradient-to-r from-[#ff6b35] via-[#8b5cf6] to-[#3b82f6] bg-clip-text text-transparent mt-2">
            en clients fidèles
          </span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-white/70 mb-4 font-light tracking-wide max-w-3xl mx-auto leading-relaxed">
          Développeur full-stack indépendant. Je crée des sites web modernes, rapides et efficaces 
          qui boostent votre visibilité en ligne et font la différence face à vos concurrents.
        </p>

        {/* Tags de réassurance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-10 text-xs md:text-sm"
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
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/80"
            >
              <span>{tag.icon}</span>
              <span>{tag.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white rounded-full text-base md:text-lg font-semibold shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.5)] transition-shadow overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Démarrer mon projet
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.a
            href="#services"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-4 md:py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full text-base md:text-lg font-light hover:bg-white/10 hover:border-white/40 transition-all"
          >
            Voir mes services
          </motion.a>
        </div>

        {/* Indicateur de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute -bottom-20 md:-bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// Process Screen Component
function ProcessScreen() {
  const [stepsRevealed, setStepsRevealed] = useState([false, false, false, false])
  const [snakeDotPosition, setSnakeDotPosition] = useState<{ x: number; y: number } | null>(null)
  const [pathData, setPathData] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    // Reset
    setStepsRevealed([false, false, false, false])
    setSnakeDotPosition(null)
    setPathData('')

    // Attendre que le DOM soit prêt et que les éléments soient mesurables
    const timeoutId = setTimeout(() => {
      if (!containerRef.current) return

      const steps = stepRefs.current.filter(Boolean) as HTMLDivElement[]
      if (steps.length !== 4) return

      const containerRect = containerRef.current.getBoundingClientRect()

      // Obtenir les positions des centres des losanges (milieu vertical de chaque colonne)
      const positions = steps.map(step => {
        const rect = step.getBoundingClientRect()
        // Position au centre horizontal de la colonne et au CENTRE VERTICAL des losanges (dans la frise)
        return {
          x: rect.left + rect.width / 2 - containerRect.left,
          y: rect.top + rect.height / 2 - containerRect.top, // Position au centre vertical
        }
      })

      // Ordre du serpent: 1 -> 2 -> 3 -> 4 (horizontal de gauche à droite)
      const path = [
        positions[0], // Step 1 - HOLDER
        positions[1], // Step 2 - PROTOCOL
        positions[2], // Step 3 - PROOF
        positions[3], // Step 4 - DEFI PROTOCOL
      ]

      // Créer le chemin SVG horizontal avec des coordonnées absolues (ligne droite sous les grid)
      const svgPath = `M ${path[0].x} ${path[0].y} L ${path[1].x} ${path[1].y} L ${path[2].x} ${path[2].y} L ${path[3].x} ${path[3].y}`
      setPathData(svgPath)

      // Initialiser le point à la première position
      setSnakeDotPosition(path[0])

      // Configurer le SVG path pour l'animation stroke-dashoffset
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength()
        pathRef.current.style.strokeDasharray = `${pathLength}`
        pathRef.current.style.strokeDashoffset = `${pathLength}`
      }

      // Animer le point le long du chemin
      const animateDot = (progress: number) => {
        let currentPos: { x: number; y: number }
        let segmentIndex = 0
        let segmentProgress = 0

        if (progress <= 0.33) {
          // Entre step 1 et step 2
          const t = progress / 0.33
          currentPos = {
            x: path[0].x + (path[1].x - path[0].x) * t,
            y: path[0].y + (path[1].y - path[0].y) * t,
          }
          if (t > 0.1 && !stepsRevealed[0]) {
            setStepsRevealed([true, false, false, false])
          }
        } else if (progress <= 0.66) {
          // Entre step 2 et step 3
          const t = (progress - 0.33) / 0.33
          currentPos = {
            x: path[1].x + (path[2].x - path[1].x) * t,
            y: path[1].y + (path[2].y - path[1].y) * t,
          }
          if (t > 0.1 && !stepsRevealed[1]) {
            setStepsRevealed([true, true, false, false])
          }
        } else if (progress <= 0.99) {
          // Entre step 3 et step 4
          const t = (progress - 0.66) / 0.33
          currentPos = {
            x: path[2].x + (path[3].x - path[2].x) * t,
            y: path[2].y + (path[3].y - path[2].y) * t,
          }
          if (t > 0.1 && !stepsRevealed[2]) {
            setStepsRevealed([true, true, true, false])
          }
        } else {
          // Fin - révéler step 4
          currentPos = path[3]
          if (!stepsRevealed[3]) {
            setStepsRevealed([true, true, true, true])
          }
        }

        setSnakeDotPosition(currentPos)
      }

      // Animation du tracé SVG
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength()
        pathRef.current.animate(
          [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
          {
            duration: 5000,
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        )
      }

      // Animation du point sur 5 secondes
      const startTime = Date.now()
      const duration = 5000

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        animateDot(progress)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  const steps = [
    { icon: '💡', title: 'Analyse & Stratégie' },
    { icon: '🎨', title: 'Design & Prototypage' },
    { icon: '⚡', title: 'Développement' },
    { icon: '🚀', title: 'Déploiement & Suivi' },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-8 md:mb-12 text-center relative z-10"
      >
        <span className="bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent">
          Mon Processus de Développement
        </span>
      </motion.h2>

      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl px-4 md:px-8"
        style={{ height: '500px' }}
      >
        {/* Conteneur principal avec bordure blanche */}
        <div className="absolute inset-0 border border-white/20 rounded-lg" />
        
        {/* Grille de 4 colonnes */}
        <div className="relative w-full h-full flex items-center justify-between gap-4 md:gap-8">
          {steps.map((step, index) => {
            const isRevealed = stepsRevealed[index]
            const isLast = index === steps.length - 1
            
            return (
              <div
                key={index}
                ref={(el) => { stepRefs.current[index] = el }}
                className="flex-1 flex flex-col items-center justify-center relative h-full"
              >
                {/* Losange blanc avec contenu - TAILLE AGRANDIE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative w-48 h-48 md:w-56 md:h-56 z-10"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    border: '2px solid white',
                    background: 'rgba(59, 130, 246, 0.05)',
                  }}
                >
                  {/* Contenu du losange avec icône et titre - TEXTE PLUS GRAND */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6">
                    {/* Icône */}
                    <div className="text-4xl md:text-5xl mb-3 md:mb-4">{step.icon}</div>
                    
                    {/* Titre */}
                    <div className="text-sm md:text-base font-semibold text-center text-white leading-tight px-2">
                      {step.title}
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* SVG Snake Path avec dégradé de couleurs - LIGNE DANS LA FRISE CHRONOLOGIQUE */}
        {pathData && (
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" />
                <stop offset="33%" stopColor="#8b5cf6" />
                <stop offset="66%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              ref={pathRef}
              d={pathData}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
          </svg>
        )}

        {/* Point animé qui suit le chemin - DANS LA FRISE CHRONOLOGIQUE */}
        {snakeDotPosition && (
          <motion.div
            className="absolute w-5 h-5 bg-[#3b82f6] rounded-full z-[6] pointer-events-none"
            style={{
              left: `${snakeDotPosition.x}px`,
              top: `${snakeDotPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 25px rgba(59, 130, 246, 1), 0 0 50px rgba(59, 130, 246, 0.6)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>
    </motion.section>
  )
}

// Trust Screen Component - Version simplifiée avec défilement horizontal
function TrustScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const benefits = [
    { icon: '🎯', text: 'Code propre, scalable et maintenable pour le long terme' },
    { icon: '⚡', text: 'Performance optimale et expérience utilisateur fluide' },
    { icon: '🤝', text: 'Communication claire et livraison dans les délais' },
  ]

  const stats = [
    { number: '50+', label: 'Projets Réalisés' },
    { number: '98%', label: 'Satisfaction Client' },
    { number: '5+', label: 'Années d\'Expérience' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % benefits.length)
        setIsAnimating(false)
      }, 500)
    }, 4000) // Change toutes les 4 secondes

    return () => clearInterval(interval)
  }, [benefits.length])

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden bg-[#0a0a0a]"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 60%)',
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-12 md:mb-16 text-center relative z-10"
      >
        <span className="bg-gradient-to-r from-white to-[#8b5cf6] bg-clip-text text-transparent">
          Pourquoi Me Faire Confiance ?
        </span>
      </motion.h2>

      {/* Conteneur avec défilement horizontal */}
      <div className="relative w-full max-w-5xl h-[400px] overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{
            x: `-${currentIndex * 100}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="w-full flex-shrink-0 flex items-center justify-center px-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: currentIndex === index ? 1 : 0.3,
                y: currentIndex === index ? 0 : 50,
                scale: currentIndex === index ? 1 : 0.9,
              }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <motion.div
                className="max-w-md w-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/25 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center p-8 md:p-10 hover:border-[#8b5cf6]/50 hover:bg-[#8b5cf6]/20 hover:shadow-[0_25px_50px_rgba(139,92,246,0.4)] transition-all"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <motion.div
                  className="text-6xl md:text-7xl mb-6"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  {benefit.icon}
                </motion.div>
                <motion.p
                  className="text-lg md:text-xl font-semibold text-white leading-relaxed text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentIndex === index ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {benefit.text}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Indicateurs de progression */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {benefits.map((_, index) => (
            <motion.div
              key={index}
              className="h-2 rounded-full cursor-pointer"
              style={{
                width: currentIndex === index ? '32px' : '8px',
                backgroundColor: currentIndex === index ? '#8b5cf6' : 'rgba(139, 92, 246, 0.3)',
              }}
              animate={{
                width: currentIndex === index ? 32 : 8,
                backgroundColor: currentIndex === index ? '#8b5cf6' : 'rgba(139, 92, 246, 0.3)',
              }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setIsAnimating(true)
                setTimeout(() => {
                  setCurrentIndex(index)
                  setIsAnimating(false)
                }, 500)
              }}
            />
          ))}
        </div>
      </div>

      {/* Stats en bas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex justify-center gap-12 md:gap-16 flex-wrap mt-12 md:mt-16 relative z-10"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
              {stat.number}
            </div>
            <div className="text-sm md:text-base text-white/60 uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
