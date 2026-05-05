'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'cookie_consent_v1'

type ConsentState = {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
}

function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

function writeConsent(consent: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    /* ignore */
  }
}

/**
 * Bandeau cookies conforme RGPD.
 * - Affiché tant qu'aucun choix n'a été fait
 * - 3 actions : Tout accepter / Tout refuser / Personnaliser
 * - Stockage du choix en localStorage (clé : cookie_consent_v1)
 * - Le visiteur peut rouvrir le bandeau via un lien dans le footer
 *   (event window.dispatchEvent(new Event('open-cookie-banner')))
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const existing = readConsent()
    if (!existing) setVisible(true)
    else {
      setAnalytics(existing.analytics)
      setMarketing(existing.marketing)
    }

    const open = () => {
      setVisible(true)
      const c = readConsent()
      if (c) {
        setAnalytics(c.analytics)
        setMarketing(c.marketing)
        setShowDetails(true)
      }
    }
    window.addEventListener('open-cookie-banner', open)
    return () => window.removeEventListener('open-cookie-banner', open)
  }, [])

  const persist = (state: Omit<ConsentState, 'necessary' | 'timestamp'>) => {
    const consent: ConsentState = {
      necessary: true,
      analytics: state.analytics,
      marketing: state.marketing,
      timestamp: new Date().toISOString(),
    }
    writeConsent(consent)
    setVisible(false)
    setShowDetails(false)
  }

  const acceptAll = () => persist({ analytics: true, marketing: true })
  const rejectAll = () => persist({ analytics: false, marketing: false })
  const saveCustom = () => persist({ analytics, marketing })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-3 md:p-5"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-[#0f0f0f]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Bandeau de couleur */}
            <div className="h-1 w-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35]" />

            <div className="p-5 md:p-7">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl md:text-3xl flex-shrink-0" aria-hidden="true">🍪</span>
                <div className="flex-1 min-w-0">
                  <h2
                    id="cookie-title"
                    className="text-base md:text-lg font-medium text-white mb-1"
                  >
                    Respect de votre vie privée
                  </h2>
                  <p id="cookie-desc" className="text-xs md:text-sm text-white/70 leading-relaxed">
                    Ce site utilise des cookies pour assurer son bon fonctionnement et,
                    avec votre accord, mesurer son audience. Vous pouvez accepter, refuser
                    ou personnaliser votre choix à tout moment.{' '}
                    <Link
                      href="/politique-confidentialite"
                      className="underline underline-offset-2 hover:text-white transition-colors"
                    >
                      En savoir plus
                    </Link>
                  </p>
                </div>
              </div>

              {/* Détails (cases à cocher) */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 mb-4 space-y-2.5 border-t border-white/10 pt-4">
                      <ConsentRow
                        title="Cookies nécessaires"
                        description="Indispensables au fonctionnement du site (préférences, sécurité). Toujours activés."
                        checked={true}
                        disabled
                      />
                      <ConsentRow
                        title="Cookies de mesure d'audience"
                        description="Statistiques anonymisées pour améliorer le site (pages visitées, durée)."
                        checked={analytics}
                        onChange={setAnalytics}
                      />
                      <ConsentRow
                        title="Cookies marketing"
                        description="Personnalisation publicitaire et suivi inter-sites."
                        checked={marketing}
                        onChange={setMarketing}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                {!showDetails && (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="order-3 sm:order-1 px-4 py-2.5 rounded-full text-xs md:text-sm font-light text-white/80 hover:text-white border border-white/15 hover:border-white/30 transition-all"
                  >
                    Personnaliser
                  </button>
                )}
                <button
                  onClick={rejectAll}
                  className="order-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-light text-white/80 hover:text-white border border-white/15 hover:border-white/30 transition-all"
                >
                  Tout refuser
                </button>
                {showDetails ? (
                  <button
                    onClick={saveCustom}
                    className="order-1 sm:order-3 sm:ml-auto px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 transition-opacity"
                  >
                    Enregistrer mes choix
                  </button>
                ) : (
                  <button
                    onClick={acceptAll}
                    className="order-1 sm:order-3 sm:ml-auto px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 transition-opacity"
                  >
                    Tout accepter
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ConsentRowProps {
  title: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}

function ConsentRow({ title, description, checked, disabled, onChange }: ConsentRowProps) {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] ${
        disabled ? 'opacity-70' : 'hover:bg-white/[0.05] cursor-pointer'
      } transition-colors`}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`relative flex-shrink-0 mt-0.5 w-9 h-5 rounded-full transition-colors ${
          checked ? 'bg-[#3b82f6]' : 'bg-white/10'
        } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        role="switch"
        aria-checked={checked}
        aria-label={title}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-xs md:text-sm font-medium text-white">{title}</div>
        <div className="text-[11px] md:text-xs text-white/60 leading-relaxed mt-0.5">
          {description}
        </div>
      </div>
    </label>
  )
}

/**
 * Helper exporté : vérifie le consentement courant
 * (utile pour conditionner le chargement d'un script analytics)
 */
export function getCookieConsent(): ConsentState | null {
  return readConsent()
}

/**
 * Helper exporté : déclenche la réouverture du bandeau (lien dans le footer)
 */
export function openCookieBanner() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('open-cookie-banner'))
  }
}
