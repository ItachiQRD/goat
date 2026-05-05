'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion'
import { X, ChevronDown, ArrowRight } from 'lucide-react'
import { siteConfig, getActiveSocials, isPlaceholder } from '@/lib/siteConfig'

interface NavItem {
  href: string
  label: string
  children?: { href: string; label: string; description?: string }[]
}

const navItems: NavItem[] = [
  { href: '/', label: 'Accueil' },
  {
    href: '/services',
    label: 'Services',
    children: [
      { href: '/services', label: 'Tous les services', description: "Vue d'ensemble" },
      { href: '/services#vitrine', label: 'Sites vitrines', description: 'Présentez votre activité' },
      { href: '/services#ecommerce', label: 'E-commerce', description: 'Vendez en ligne' },
      { href: '/services#webapp', label: 'Applications web', description: 'Solutions sur-mesure' },
      { href: '/services#seo', label: 'SEO & Performance', description: "Optimisez l'existant" },
    ],
  },
  { href: '/tarification', label: 'Tarifs' },
  { href: '/portfolio', label: 'Portfolio' },
  {
    href: '/exemples',
    label: 'Exemples',
    children: [
      { href: '/exemples', label: 'Tous les exemples', description: 'Composants interactifs' },
      { href: '/exemples/calendrier', label: 'Calendrier', description: 'Système de réservation' },
      { href: '/exemples/calculateur', label: 'Calculateur', description: 'Devis dynamique' },
      { href: '/exemples/chat', label: 'Chat', description: 'Messagerie temps réel' },
      { href: '/exemples/panier', label: 'Panier', description: 'Tunnel e-commerce' },
      { href: '/exemples/visualisation', label: 'Visualisation', description: 'Graphiques de données' },
      { href: '/exemples/gestion-donnees', label: 'Gestion de données', description: 'CRUD complet' },
    ],
  },
]

export default function Header() {
  const { brand, contact } = siteConfig
  const socials = getActiveSocials()
  const pathname = usePathname()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Progression du scroll (barre fine en haut)
  const { scrollYProgress, scrollY } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  })

  // Détection scroll : dim background + auto-hide en descente
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 30)
    if (latest > 200 && latest > previous) {
      setHidden(true)
    } else if (latest < previous) {
      setHidden(false)
    }
  })

  // Lock scroll quand drawer ouvert
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  // Ferme le drawer au changement de page
  useEffect(() => {
    setIsDrawerOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Ferme le dropdown au clic dehors
  const navRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Barre de progression de scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-[55] origin-left bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] pointer-events-none"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Background glassmorphism */}
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled
              ? 'bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
              : 'bg-gradient-to-b from-[#0a0a0a]/40 to-transparent backdrop-blur-sm'
          }`}
          aria-hidden="true"
        />

        <div ref={navRef} className="container mx-auto max-w-7xl px-4 md:px-6 relative">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* === LOGO === */}
            <Link
              href="/"
              className="group flex items-center gap-3 flex-shrink-0"
              aria-label={`${brand.name} — Accueil`}
            >
              {/* Monogramme animé */}
              <motion.div
                whileHover={{ rotate: -5, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] shadow-[0_4px_20px_rgba(139,92,246,0.4)]"
              >
                <span className="relative z-10 text-white font-bold text-base md:text-lg tracking-tighter">
                  FS
                </span>
                {/* Reflet animé */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Wordmark */}
              <span className="hidden sm:block text-base md:text-lg font-light tracking-tight">
                <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                  {brand.name}
                </span>
              </span>
            </Link>

            {/* === NAVIGATION DESKTOP === */}
            <nav className="hidden lg:flex items-center" aria-label="Navigation principale">
              {navItems.map((item) => {
                const active = isActive(item.href)
                const hasChildren = item.children && item.children.length > 0
                const isDropdownOpen = openDropdown === item.href

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.href)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`relative inline-flex items-center gap-1 px-4 py-2 text-sm font-light rounded-lg transition-colors ${
                        active ? 'text-white' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      )}

                      {/* Indicateur de page active (underline animé) */}
                      {active && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {hasChildren && isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        >
                          <div className="min-w-[280px] p-2 rounded-2xl bg-[#0f0f0f]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                            {item.children!.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="group/item block px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-colors"
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="text-sm text-white font-light">
                                      {child.label}
                                    </div>
                                    {child.description && (
                                      <div className="text-xs text-white/50 mt-0.5">
                                        {child.description}
                                      </div>
                                    )}
                                  </div>
                                  <ArrowRight
                                    className="w-3.5 h-3.5 text-white/30 group-hover/item:text-white group-hover/item:translate-x-0.5 transition-all flex-shrink-0"
                                    aria-hidden="true"
                                  />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>

            {/* === ACTIONS DROITE === */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* CTA Devis (desktop) */}
              <Link href="/contact" className="hidden lg:inline-flex">
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:shadow-[0_8px_24px_rgba(59,130,246,0.4)] transition-shadow"
                >
                  Devis gratuit
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </motion.span>
              </Link>

              {/* Burger (mobile + tablette) */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden relative w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center justify-center"
                aria-label="Ouvrir le menu"
                aria-expanded={isDrawerOpen}
              >
                <div className="w-4 h-3 relative">
                  <span className="absolute top-0 left-0 w-full h-px bg-white" />
                  <span className="absolute top-1/2 left-0 w-full h-px bg-white -translate-y-1/2" />
                  <span className="absolute bottom-0 left-0 w-full h-px bg-white" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* === DRAWER MOBILE === */}
      <AnimatePresence>
        {isDrawerOpen && (
          <MobileDrawer
            navItems={navItems}
            pathname={pathname}
            isActive={isActive}
            onClose={() => setIsDrawerOpen(false)}
            socials={socials}
            email={contact.email}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ────────────────────────────────────────────────────────────
// DRAWER MOBILE
// ────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  navItems: NavItem[]
  pathname: string
  isActive: (href: string) => boolean
  onClose: () => void
  socials: { name: string; url: string }[]
  email: string
}

function MobileDrawer({ navItems, isActive, onClose, socials, email }: MobileDrawerProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[420px] bg-[#0a0a0a] border-l border-white/10 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        {/* Effet déco subtil */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.15), transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col min-h-full">
          {/* Header drawer */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-xl z-10">
            <span className="text-xs uppercase tracking-widest text-white/50">
              Menu
            </span>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center justify-center"
              aria-label="Fermer le menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6">
            <ul className="space-y-0.5">
              {navItems.map((item, i) => {
                const active = isActive(item.href)
                const hasChildren = item.children && item.children.length > 0
                const isExpanded = expandedItem === item.href

                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.35 }}
                  >
                    <div className="relative">
                      {hasChildren ? (
                        <button
                          onClick={() =>
                            setExpandedItem(isExpanded ? null : item.href)
                          }
                          className={`w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl text-left transition-colors ${
                            active
                              ? 'bg-white/[0.06] text-white'
                              : 'text-white/80 hover:bg-white/[0.04] hover:text-white'
                          }`}
                          aria-expanded={isExpanded}
                        >
                          <span className="flex items-center gap-3">
                            {active && (
                              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#3b82f6] to-[#8b5cf6]" />
                            )}
                            <span className="text-base font-light">{item.label}</span>
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-white/50 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${
                            active
                              ? 'bg-white/[0.06] text-white'
                              : 'text-white/80 hover:bg-white/[0.04] hover:text-white'
                          }`}
                        >
                          {active && (
                            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#3b82f6] to-[#8b5cf6]" />
                          )}
                          <span className="text-base font-light">{item.label}</span>
                        </Link>
                      )}
                    </div>

                    {/* Sous-menu accordéon */}
                    <AnimatePresence initial={false}>
                      {hasChildren && isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden ml-4 mt-1 pl-4 border-l border-white/[0.08] space-y-0.5"
                        >
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block px-3 py-2 rounded-lg text-sm font-light text-white/65 hover:text-white hover:bg-white/[0.04] transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          {/* CTA */}
          <div className="px-5 pb-5">
            <Link
              href="/contact"
              onClick={onClose}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white text-sm font-medium shadow-[0_10px_30px_rgba(59,130,246,0.3)]"
              >
                Demander un devis gratuit
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.div>
            </Link>
          </div>

          {/* Footer drawer : contact + réseaux */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="px-5 pb-7 pt-5 border-t border-white/[0.08] space-y-4"
          >
            {!isPlaceholder(email) && (
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                  Email
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-white/80 hover:text-white transition-colors break-all"
                >
                  {email}
                </a>
              </div>
            )}

            {socials.length > 0 && (
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">
                  Réseaux
                </div>
                <div className="flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full text-xs text-white/70 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all capitalize"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.aside>
    </>
  )
}
