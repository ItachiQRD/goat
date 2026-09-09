'use client'

import { useEffect, useState, useRef } from 'react'
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
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

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

  useEffect(() => {
    if (!visible) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    )
    focusable?.[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        persist({ analytics: false, marketing: false })
        return
      }
      if (e.key !== 'Tab' || !focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus?.()
    }
  }, [visible, showDetails])

  const acceptAll = () => persist({ analytics: true, marketing: true })
  const rejectAll = () => persist({ analytics: false, marketing: false })
  const saveCustom = () => persist({ analytics, marketing })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={panelRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-3 md:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
        >
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-[#0f0f0f]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35]" />

            <div className="p-5 md:p-7">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl md:text-3xl flex-shrink-0" aria-hidden="true">
                  🍪
                </span>
                <div className="flex-1 min-w-0">
                  <h2
                    id="cookie-title"
                    className="text-base md:text-lg font-medium text-white mb-1"
                  >
                    Respect de votre vie privée
                  </h2>
                  <p id="cookie-desc" className="text-xs md:text-sm text-white/70 leading-relaxed">
                    Ce site utilise des cookies nécessaires au fonctionnement. Aucun cookie
                    d&apos;audience ni marketing n&apos;est activé pour le moment. Vous pouvez
                    accepter, refuser ou personnaliser votre choix à tout moment.{' '}
                    <Link
                      href="/politique-confidentialite"
                      className="underline underline-offset-2 hover:text-white transition-colors"
                    >
                      En savoir plus
                    </Link>
                  </p>
                </div>
              </div>

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

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                {!showDetails && (
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="order-3 sm:order-1 px-4 py-2.5 rounded-full text-xs md:text-sm font-light text-white/80 hover:text-white border border-white/15 hover:border-white/30 transition-all"
                  >
                    Personnaliser
                  </button>
                )}
                <button
                  type="button"
                  onClick={rejectAll}
                  className="order-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-light text-white/80 hover:text-white border border-white/15 hover:border-white/30 transition-all"
                >
                  Tout refuser
                </button>
                {showDetails ? (
                  <button
                    type="button"
                    onClick={saveCustom}
                    className="order-1 sm:order-3 sm:ml-auto px-5 py-2.5 rounded-full text-xs md:text-sm font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:opacity-90 transition-opacity"
                  >
                    Enregistrer mes choix
                  </button>
                ) : (
                  <button
                    type="button"
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
    <div
      className={`flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] ${
        disabled ? 'opacity-70' : ''
      }`}
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
          aria-hidden="true"
        />
      </button>
      <div className="flex-1 min-w-0">
        <div className="text-xs md:text-sm font-medium text-white">{title}</div>
        <div className="text-[11px] md:text-xs text-white/60 leading-relaxed mt-0.5">
          {description}
        </div>
      </div>
    </div>
  )
}

export function getCookieConsent(): ConsentState | null {
  return readConsent()
}

export function openCookieBanner() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('open-cookie-banner'))
  }
}
