'use client'

import { useState, ReactNode, Children, isValidElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileExpandProps {
  /** Nombre d'enfants à afficher par défaut sur mobile (par défaut: 3) */
  initialCount?: number
  /** Breakpoint au-delà duquel tout est toujours affiché ('md' par défaut) */
  expandFrom?: 'sm' | 'md' | 'lg'
  /** Texte du bouton "voir plus" (par défaut: "Voir plus") */
  showMoreLabel?: string
  /** Texte du bouton "voir moins" (par défaut: "Voir moins") */
  showLessLabel?: string
  /** Classe wrapper de la grille / liste */
  className?: string
  children: ReactNode
}

/**
 * Affiche tous les enfants sur desktop, mais limite à `initialCount` sur mobile
 * avec un bouton "Voir plus" / "Voir moins" pour étendre/réduire.
 */
export default function MobileExpand({
  initialCount = 3,
  expandFrom = 'md',
  showMoreLabel = 'Voir plus',
  showLessLabel = 'Voir moins',
  className = '',
  children,
}: MobileExpandProps) {
  const [expanded, setExpanded] = useState(false)
  const items = Children.toArray(children).filter(isValidElement)
  const totalCount = items.length
  const hiddenCount = Math.max(0, totalCount - initialCount)
  const hasMore = hiddenCount > 0

  // Classe pour cacher l'élément sur mobile uniquement (s'il dépasse l'index)
  const hiddenOnMobileClass = {
    sm: 'hidden sm:block',
    md: 'hidden md:block',
    lg: 'hidden lg:block',
  }[expandFrom]

  return (
    <>
      <div className={className}>
        {items.map((child, i) => {
          // Sur desktop, tout est visible. Sur mobile, masquer ce qui dépasse initialCount
          const overInitialCount = i >= initialCount
          const showOnMobile = expanded || !overInitialCount
          const wrapperClass = overInitialCount && !expanded ? hiddenOnMobileClass : ''

          return (
            <motion.div
              key={i}
              className={wrapperClass}
              initial={overInitialCount && expanded ? { opacity: 0, y: 20 } : false}
              animate={overInitialCount && expanded ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: (i - initialCount) * 0.05 }}
            >
              {child}
            </motion.div>
          )
        })}
      </div>

      {/* Bouton Voir plus / Voir moins, visible sur mobile uniquement */}
      {hasMore && (
        <div className={`mt-6 flex justify-center ${expandFrom}:hidden`}>
          <motion.button
            onClick={() => setExpanded((e) => !e)}
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/15 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-light text-white"
          >
            <span>
              {expanded ? showLessLabel : `${showMoreLabel} (${hiddenCount})`}
            </span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </>
  )
}
