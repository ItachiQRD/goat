'use client'

import { motion } from 'framer-motion'

interface ModernIllustrationProps {
  type: 'visibility' | 'speed' | 'design' | 'mobile' | 'analytics' | 'security' | 'shop' | 'connect'
  className?: string
}

export default function ModernIllustration({ type, className = '' }: ModernIllustrationProps) {
  const illustrations = {
    visibility: (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        {/* Cercles concentriques (radar) */}
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-blue-400/40"
            style={{
              width: `${i * 25}%`,
              height: `${i * 25}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        {/* Point central */}
        <motion.div
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center text-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          📍
        </motion.div>
        {/* Petits points orbitants */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5"
            style={{
              transformOrigin: '50% 50%',
            }}
            animate={{ rotate: [angle, angle + 360] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div
              className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]"
              style={{ transform: 'translateX(80px)' }}
            />
          </motion.div>
        ))}
      </div>
    ),

    speed: (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10" />
        {/* Lignes de vitesse */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
            style={{
              width: '120%',
              top: `${30 + i * 10}%`,
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1 + i * 0.2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.1,
            }}
          />
        ))}
        {/* Compteur */}
        <motion.div
          className="relative z-10 text-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-5xl mb-1">⚡</div>
          <div className="text-xs uppercase tracking-widest text-yellow-300/80">Score 100</div>
        </motion.div>
      </div>
    ),

    design: (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10" />
        {/* Formes géométriques */}
        <motion.div
          className="absolute w-20 h-20 rounded-2xl border-2 border-pink-400/60 backdrop-blur-sm"
          style={{ top: '20%', left: '20%' }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 backdrop-blur-sm"
          style={{ top: '50%', right: '20%' }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-12 h-12 border-2 border-white/40 rotate-45"
          style={{ bottom: '20%', left: '40%' }}
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative z-10 text-5xl">🎨</div>
      </div>
    ),

    mobile: (
      <div className={`relative w-full h-full flex items-center justify-center gap-3 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
        {/* Smartphone */}
        <motion.div
          className="relative w-12 h-20 rounded-xl border-2 border-white/40 bg-white/5 backdrop-blur-sm overflow-hidden"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-md"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        {/* Tablette */}
        <motion.div
          className="relative w-16 h-20 rounded-xl border-2 border-white/40 bg-white/5 backdrop-blur-sm overflow-hidden"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-md"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>
        {/* Desktop */}
        <motion.div
          className="relative w-24 h-16 rounded-lg border-2 border-white/40 bg-white/5 backdrop-blur-sm overflow-hidden"
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-1 bg-gradient-to-br from-purple-400 to-blue-500 rounded-md"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </motion.div>
      </div>
    ),

    analytics: (
      <div className={`relative w-full h-full flex items-end justify-center gap-2 px-8 pb-8 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
        {[40, 70, 50, 85, 60, 95].map((height, i) => (
          <motion.div
            key={i}
            className="relative flex-1 max-w-[20px] rounded-t-md bg-gradient-to-t from-green-500 to-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              ease: 'easeOut',
              repeat: Infinity,
              repeatType: 'reverse',
              repeatDelay: 2,
            }}
          />
        ))}
        {/* Ligne de tendance */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 10,80 L 25,50 L 40,65 L 55,30 L 70,45 L 90,15"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray="2,2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          />
        </motion.svg>
      </div>
    ),

    security: (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-500/10" />
        {/* Bouclier */}
        <motion.div
          className="relative"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-6xl">🛡️</div>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400/50"
            animate={{
              scale: [1, 1.5, 1.8],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-indigo-400/50"
            animate={{
              scale: [1, 1.5, 1.8],
              opacity: [0.6, 0.3, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </div>
    ),

    shop: (
      <div className={`relative w-full h-full flex items-center justify-center gap-4 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
        <motion.div
          className="text-6xl"
          animate={{
            rotate: [-5, 5, -5],
            y: [0, -3, 0],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🛒
        </motion.div>
        {/* Particules de vente */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute text-xl"
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -50, -80],
              x: [(i - 1) * 20, (i - 1) * 30],
            }}
            transition={{
              duration: 2,
              delay: i * 0.6,
              repeat: Infinity,
            }}
          >
            💰
          </motion.div>
        ))}
      </div>
    ),

    connect: (
      <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10" />
        {/* Nœuds connectés */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
          {/* Lignes de connexion */}
          {[
            { x1: 50, y1: 50, x2: 100, y2: 30 },
            { x1: 100, y1: 30, x2: 150, y2: 50 },
            { x1: 50, y1: 50, x2: 100, y2: 70 },
            { x1: 100, y1: 70, x2: 150, y2: 50 },
            { x1: 100, y1: 30, x2: 100, y2: 70 },
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(168, 85, 247, 0.6)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
            />
          ))}
          {/* Nœuds */}
          {[
            { cx: 50, cy: 50 },
            { cx: 100, cy: 30 },
            { cx: 100, cy: 70 },
            { cx: 150, cy: 50 },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="rgba(217, 70, 239, 0.9)"
              animate={{
                r: [3, 5, 3],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </svg>
      </div>
    ),
  }

  return illustrations[type]
}
