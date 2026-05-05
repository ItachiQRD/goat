'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { siteConfig, getActiveSocials, isPlaceholder } from '@/lib/siteConfig'

export default function Header() {
  const { brand, contact } = siteConfig
  const socials = getActiveSocials()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Empêcher le scroll du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const menuItems = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/exemples', label: 'Exemples' },
    { href: '/tarification', label: 'Tarification' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Fond avec glassmorphism */}
        <motion.div
          className={`absolute inset-0 backdrop-blur-xl border-b transition-all duration-500 ${
            scrolled
              ? 'bg-[#151515]/80 border-white/10'
              : 'bg-[#151515]/40 border-white/5'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        
        {/* Effet de gradient animé */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 via-[#8b5cf6]/10 to-[#ff6b35]/10 opacity-50" />

        <div className="container mx-auto px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-6">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-3 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative w-5 h-5">
                  <motion.span
                    className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
                    animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute top-2 left-0 w-full h-0.5 bg-white rounded-full"
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute top-4 left-0 w-full h-0.5 bg-white rounded-full"
                    animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#3b82f6]/0 via-[#8b5cf6]/20 to-[#ff6b35]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" className="relative group" data-cursor-hover>
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-[#3b82f6] to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientMove_3s_ease_infinite]">
                    {brand.name}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            </div>

            {/* Right side - Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {menuItems.slice(1).map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-light rounded-lg group overflow-hidden"
                    data-cursor-hover
                  >
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#3b82f6]">
                      {item.label}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/10 to-[#8b5cf6]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="navbar-indicator"
                    />
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Menu Latéral Web 3.0 */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay avec blur */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu latéral */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#151515] z-[70] overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Fond avec effets */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 via-[#8b5cf6]/10 to-[#ff6b35]/10" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <div className="relative z-10 p-8 md:p-12">
                {/* Header du menu */}
                <div className="flex items-center justify-between mb-16">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent">
                      Navigation
                    </h2>
                  </motion.div>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Navigation principale */}
                <nav className="space-y-2 mb-16">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group relative block p-4 rounded-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/0 via-[#8b5cf6]/10 to-[#ff6b35]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3b82f6] to-[#8b5cf6] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                        <div className="relative flex items-center justify-between">
                          <span className="text-2xl md:text-3xl font-light group-hover:text-[#3b82f6] transition-colors duration-300">
                            {item.label}
                          </span>
                          <motion.svg
                            className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Séparateur */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />

                {/* Informations supplémentaires */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {socials.length > 0 && (
                    <div>
                      <h6 className="text-xs uppercase tracking-wider mb-4 opacity-60">Réseaux</h6>
                      <div className="flex flex-wrap gap-3">
                        {socials.map((s, i) => (
                          <motion.a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#3b82f6]/50 transition-all duration-300 text-sm capitalize"
                            whileHover={{ scale: 1.05, y: -2 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                          >
                            {s.name}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h6 className="text-xs uppercase tracking-wider mb-4 opacity-60">Localisation</h6>
                    <p className="text-sm opacity-80">
                      {contact.location}<br />
                      {contact.remoteAvailable && (
                        <span className="text-[#3b82f6]">Remote disponible</span>
                      )}
                    </p>
                  </div>

                  {!isPlaceholder(contact.email) && (
                    <div>
                      <h6 className="text-xs uppercase tracking-wider mb-4 opacity-60">Contact</h6>
                      <motion.a
                        href={`mailto:${contact.email}`}
                        className="text-sm hover:text-[#3b82f6] transition-colors duration-300 inline-block"
                        whileHover={{ x: 5 }}
                      >
                        {contact.email}
                      </motion.a>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
