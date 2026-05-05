'use client'

import Link from 'next/link'
import { siteConfig, getActiveSocials, isPlaceholder } from '@/lib/siteConfig'
import { openCookieBanner } from '@/components/CookieBanner'

export default function Footer() {
  const { brand, contact, rgpd } = siteConfig
  const socials = getActiveSocials()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/services', label: 'Services' },
    { href: '/tarification', label: 'Tarifs' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/exemples', label: 'Exemples' },
    { href: '/contact', label: 'Contact' },
  ]

  const legalLinks = [
    { href: '/mentions-legales', label: 'Mentions légales' },
    { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
    { href: '/cgv', label: 'CGV' },
  ]

  return (
    <footer className="relative pt-16 pb-8 px-5 md:px-6 border-t border-white/10 bg-[#0d0d0d]">
      {/* Effet de halo subtil en haut */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-7xl">
        {/* Bloc principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Colonne 1 : Branding */}
          <div className="lg:col-span-2 space-y-4 max-w-md">
            <h3 className="text-2xl md:text-3xl font-light tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-[#8b5cf6] bg-clip-text text-transparent">
                {brand.name}
              </span>
            </h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light">
              {brand.description}
            </p>

            {/* Réseaux sociaux */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white/60 hover:text-white"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Légal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">
              Informations
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={openCookieBanner}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Gérer les cookies
                </button>
              </li>
            </ul>

            {/* Contact rapide */}
            {!isPlaceholder(contact.email) && (
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-white/70 hover:text-white transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Barre du bas */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {year} {brand.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-white/30">
            Conçu et développé avec soin · Conforme RGPD
          </p>
        </div>

        {/* Avertissement si placeholders encore présents */}
        {isPlaceholder(siteConfig.legal.ownerName) && (
          <div className="mt-6 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
            <strong>Mode développement :</strong> les informations légales contiennent
            encore des placeholders. Mettez à jour <code className="px-1 py-0.5 rounded bg-black/30">lib/siteConfig.ts</code>{' '}
            avant la mise en production.
          </div>
        )}
      </div>
    </footer>
  )
}

function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'github':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case 'twitter':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    default:
      return null
  }
}
