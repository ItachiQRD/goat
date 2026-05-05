/**
 * ====================================================
 * CONFIGURATION CENTRALE DU SITE
 * ====================================================
 *
 * REMPLACEZ TOUS LES PLACEHOLDERS [À REMPLIR] AVEC VOS
 * VRAIES INFORMATIONS PROFESSIONNELLES AVANT DE METTRE
 * LE SITE EN LIGNE.
 *
 * Ces informations sont utilisées dans :
 * - Le footer
 * - Les pages légales (mentions, RGPD, CGV)
 * - Le formulaire de contact
 * - Les balises SEO et Open Graph
 * - Le bandeau cookies
 * ====================================================
 */

export const siteConfig = {
  // ─── IDENTITÉ ─────────────────────────────────────────
  brand: {
    name: 'Full Stack Dev', // Nom commercial / marque
    tagline: 'Sites web modernes et applications sur-mesure',
    description:
      "Développeur full-stack indépendant. Je crée des sites web modernes, rapides et efficaces qui boostent votre visibilité en ligne.",
    url: 'https://votre-site.com', // URL de production (à mettre à jour)
    logo: '/logo.png', // Optionnel
  },

  // ─── INFORMATIONS LÉGALES (OBLIGATOIRES POUR MENTIONS LÉGALES) ─────
  legal: {
    // Identité du responsable
    ownerName: '[À REMPLIR : Prénom NOM]', // Ex: Jean Dupont
    ownerStatus: '[À REMPLIR : Statut juridique]', // Ex: "Auto-entrepreneur" ou "EURL" ou "SASU"

    // Adresse professionnelle
    address: '[À REMPLIR : Adresse]', // Ex: 12 rue Exemple
    postalCode: '[À REMPLIR : Code postal]', // Ex: 75001
    city: '[À REMPLIR : Ville]', // Ex: Paris
    country: 'France',

    // Identifiants professionnels
    siret: '[À REMPLIR : SIRET]', // 14 chiffres
    siren: '[À REMPLIR : SIREN]', // 9 chiffres
    rcs: '[À REMPLIR : RCS si société]', // Ex: "RCS Paris B 123 456 789"
    tvaIntracom: '[À REMPLIR : N° TVA intracommunautaire]', // Ex: FR12345678901
    apeNaf: '[À REMPLIR : Code APE/NAF]', // Ex: 6201Z

    // Hébergement (modifiez selon votre hébergeur réel)
    hosting: {
      name: 'Vercel Inc.',
      address: '440 N Barranca Avenue #4133',
      city: 'Covina, CA 91723',
      country: 'États-Unis',
      website: 'https://vercel.com',
    },

    // Directeur de publication (souvent identique au propriétaire)
    publicationDirector: '[À REMPLIR : Nom du directeur de publication]',
  },

  // ─── CONTACT ────────────────────────────────────────
  contact: {
    email: '[À REMPLIR : votre@email.pro]',
    phone: '[À REMPLIR : +33 X XX XX XX XX]',
    phoneDisplay: '[À REMPLIR : 0X XX XX XX XX]', // Format affichage
    location: 'France', // Ville ou pays
    remoteAvailable: true,
    responseTime: '24h',
  },

  // ─── RÉSEAUX SOCIAUX ─────────────────────────────────
  // Mettre à null si non utilisé (le lien sera caché)
  social: {
    github: '[À REMPLIR : https://github.com/votre-pseudo]',
    linkedin: '[À REMPLIR : https://linkedin.com/in/votre-pseudo]',
    twitter: null as string | null, // ex: 'https://twitter.com/votre-pseudo'
    instagram: null as string | null,
  },

  // ─── RGPD / COOKIES ──────────────────────────────────
  rgpd: {
    // Date de dernière mise à jour des CGU/RGPD
    lastUpdate: '03/05/2026',

    // Délégué à la protection des données (DPO)
    dpoEmail: '[À REMPLIR : dpo@votre-domaine.com ou votre email]',

    // Cookies utilisés
    cookies: {
      necessary: true, // Toujours activé (techniques)
      analytics: false, // Google Analytics, Plausible, etc.
      marketing: false, // Pubs, retargeting
    },
  },

  // ─── SEO ─────────────────────────────────────────────
  seo: {
    defaultTitle: 'Full Stack Dev - Développement web sur-mesure',
    titleTemplate: '%s | Full Stack Dev',
    defaultDescription:
      "Développeur full-stack indépendant. Sites web, e-commerce, applications. Performance, SEO et design sur-mesure.",
    keywords: [
      'développeur web freelance',
      'création site internet',
      'site vitrine',
      'e-commerce sur-mesure',
      'application web',
      'Next.js',
      'React',
      'développeur full-stack',
    ],
    ogImage: '/og-image.png', // À créer (1200x630)
    locale: 'fr_FR',
  },
} as const

export type SiteConfig = typeof siteConfig

/**
 * Helper : retourne les liens sociaux qui sont configurés (non-null)
 */
export function getActiveSocials() {
  return Object.entries(siteConfig.social)
    .filter(([, url]) => url && !url.startsWith('[À REMPLIR'))
    .map(([name, url]) => ({ name, url: url as string }))
}

/**
 * Helper : email "propre" pour mailto: (filtre les placeholders)
 */
export function getMailtoEmail(): string {
  const email = siteConfig.contact.email
  if (email.startsWith('[À REMPLIR')) return ''
  return email
}

/**
 * Helper : indique si une valeur est encore un placeholder
 */
export function isPlaceholder(value: string): boolean {
  return typeof value === 'string' && value.startsWith('[À REMPLIR')
}
