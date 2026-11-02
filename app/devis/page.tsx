'use client'

import { motion } from 'framer-motion'
import QuoteBot from '@/components/QuoteBot'
import GlowEffect from '@/components/GlowEffect'

export default function DevisPage() {
  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-12 px-4 md:px-6 relative overflow-x-hidden">
      <GlowEffect intensity={0.3} color="rgba(59, 130, 246, 0.2)" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(139, 92, 246, 0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-3xl relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10"
        >
          <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-3">
            Simulateur de devis
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1] tracking-tight mb-4">
            Estimez votre projet{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
              en 2 minutes
            </span>
          </h1>
          <p className="text-sm md:text-base text-white/55 font-light max-w-xl mx-auto leading-relaxed">
            Répondez à quelques questions et obtenez une fourchette de prix instantanée.
            Gratuit, résultat immédiat.
          </p>
        </motion.div>

        {/* Bot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <QuoteBot />
        </motion.div>

        {/* Note de bas */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-xs text-white/35 mt-6 font-light"
        >
          Les estimations sont indicatives et basées sur des moyennes de marché.
          Un devis personnalisé vous sera proposé après échange.
        </motion.p>
      </div>
    </div>
  )
}
