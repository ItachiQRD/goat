/**
 * ====================================================
 * CONFIGURATION CENTRALE DU SITE
 * ====================================================
 * Source identité : Attestation RNE / INPI (20/11/2025)
 * SIREN 978 081 354 — EL QARDAOUI Ilyesse
 * ====================================================
 */

export const siteConfig = {
  // ─── IDENTITÉ ─────────────────────────────────────────
  brand: {
    name: 'Nexus Dev',
    tagline: 'Sites web modernes et applications sur-mesure',
    description:
      "Développeur full-stack indépendant. Je crée des sites web modernes, rapides et efficaces qui boostent votre visibilité en ligne.",
    // Domaine Vercel actuel — à remplacer par le domaine custom le jour J
    url: 'https://goat-lemon-one.vercel.app',
    logo: '/logo.png',
    logoWithout: '/logowithout.png',
  },

  // ─── INFORMATIONS LÉGALES ─────────────────────────────
  legal: {
    ownerName: 'Ilyesse El Qardaoui',
    ownerStatus: 'Entrepreneur individuel (micro-entreprise)',

    address: '5 Allée des Bretons',
    postalCode: '51100',
    city: 'Reims',
    country: 'France',

    siret: '97808135400018',
    siren: '978081354',
    // EI : pas de RCS société — immatriculation au RNE
    rcs: 'Non applicable (entrepreneur individuel — RNE)',
    // Micro-entreprise : franchise en base de TVA (à corriger si vous êtes assujetti)
    tvaIntracom: 'TVA non applicable, art. 293 B du CGI',
    apeNaf: '7022Z',

    hosting: {
      name: 'Vercel Inc.',
      address: '440 N Barranca Avenue #4133',
      city: 'Covina, CA 91723',
      country: 'États-Unis',
      website: 'https://vercel.com',
    },

    publicationDirector: 'Ilyesse El Qardaoui',
  },

  // ─── CONTACT ────────────────────────────────────────
  contact: {
    email: 'elqardaoui@live.fr',
    phone: '+33658389940',
    phoneDisplay: '06 58 38 99 40',
    location: 'Reims, France',
    remoteAvailable: true,
    responseTime: '24h',
  },

  // ─── RÉSEAUX SOCIAUX ─────────────────────────────────
  social: {
    github: 'https://github.com/Itachi-QRD',
    linkedin: 'https://linkedin.com/in/ilyesse-el-qardaoui',
    twitter: null as string | null,
    instagram: null as string | null,
  },

  // ─── RGPD / COOKIES ──────────────────────────────────
  rgpd: {
    lastUpdate: '09/09/2026',
    dpoEmail: 'elqardaoui@live.fr',
    cookies: {
      necessary: true,
      analytics: false,
      marketing: false,
    },
  },

  // ─── SEO ─────────────────────────────────────────────
  seo: {
    defaultTitle: 'Nexus Dev - Développement web sur-mesure',
    titleTemplate: '%s | Nexus Dev',
    defaultDescription:
      "Développeur full-stack indépendant. Sites web, e-commerce, applications. Performance, SEO et design sur-mesure.",
    keywords: [
      'Nexus Dev',
      'développeur web freelance',
      'création site internet',
      'site vitrine',
      'e-commerce sur-mesure',
      'application web',
      'Next.js',
      'React',
      'développeur full-stack',
      'Reims',
    ],
    ogImage: '/og-image.png',
    locale: 'fr_FR',
  },
} as const

export type SiteConfig = typeof siteConfig

export function getActiveSocials() {
  return Object.entries(siteConfig.social)
    .filter(([, url]) => url && !String(url).startsWith('[À REMPLIR'))
    .map(([name, url]) => ({ name, url: url as string }))
}

export function getMailtoEmail(): string {
  const email = siteConfig.contact.email
  if (email.startsWith('[À REMPLIR')) return ''
  return email
}

export function isPlaceholder(value: string): boolean {
  return typeof value === 'string' && value.startsWith('[À REMPLIR')
}
