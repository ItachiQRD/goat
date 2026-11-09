/**
 * Moteur de simulation de devis conversationnel.
 *
 * Logique :
 * - L'utilisateur répond à une série de questions (type projet, nb pages, design, etc.)
 * - Chaque réponse alimente un objet QuoteState
 * - À la fin, computeEstimate() retourne une fourchette [min, max] en euros
 *
 * Les prix sont calibrés pour un développeur freelance mid/senior en France.
 * À ajuster dans PRICE_MATRIX selon tes propres tarifs.
 */

// ────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────

export interface QuoteOption {
  id: string
  label: string
  emoji?: string
  description?: string
}

export interface QuoteQuestion {
  id: string
  text: string
  subtext?: string
  type: 'single' | 'multiple'
  options: QuoteOption[]
}

export interface QuoteState {
  projectType: string
  pageCount: string
  designLevel: string
  features: string[]
  content: string
  deadline: string
  maintenance: string
}

export interface QuoteEstimate {
  min: number
  max: number
  breakdown: { label: string; min: number; max: number }[]
  timeline: string
  model: string
}

// ────────────────────────────────────────────────────────────
// QUESTIONS
// ────────────────────────────────────────────────────────────

export const QUOTE_QUESTIONS: QuoteQuestion[] = [
  {
    id: 'projectType',
    text: 'Quel type de projet avez-vous en tête ?',
    subtext: 'Cela me permet de cadrer le périmètre.',
    type: 'single',
    options: [
      { id: 'vitrine', label: 'Site vitrine', emoji: '🌐', description: 'Présenter votre activité' },
      { id: 'ecommerce', label: 'E-commerce', emoji: '🛍️', description: 'Vendre en ligne' },
      { id: 'webapp', label: 'Application web', emoji: '⚙️', description: 'Outil métier, plateforme' },
      { id: 'refonte', label: 'Refonte de site', emoji: '🔄', description: 'Moderniser un site existant' },
      { id: 'landing', label: 'Landing page', emoji: '🚀', description: 'Une page de conversion' },
    ],
  },
  {
    id: 'pageCount',
    text: 'Combien de pages ou écrans prévoyez-vous ?',
    subtext: 'Une estimation suffit, on affinera ensemble.',
    type: 'single',
    options: [
      { id: '1-3', label: '1 à 3 pages', emoji: '📄' },
      { id: '4-7', label: '4 à 7 pages', emoji: '📑' },
      { id: '8-15', label: '8 à 15 pages', emoji: '📚' },
      { id: '15+', label: 'Plus de 15 pages', emoji: '🗂️' },
    ],
  },
  {
    id: 'designLevel',
    text: 'Quel niveau de design souhaitez-vous ?',
    type: 'single',
    options: [
      { id: 'template', label: 'Template adapté', emoji: '🎨', description: 'Rapide et économique' },
      { id: 'custom', label: 'Design sur-mesure', emoji: '✨', description: 'Maquettes Figma uniques' },
      { id: 'premium', label: 'Premium / animations', emoji: '💎', description: 'Animations, 3D, effets' },
    ],
  },
  {
    id: 'features',
    text: 'Quelles fonctionnalités vous intéressent ?',
    subtext: 'Sélectionnez tout ce qui s\'applique.',
    type: 'multiple',
    options: [
      { id: 'contact', label: 'Formulaire de contact', emoji: '📩' },
      { id: 'blog', label: 'Blog / actualités', emoji: '📝' },
      { id: 'cms', label: 'Contenu administrable (CMS)', emoji: '🔧' },
      { id: 'auth', label: 'Espace membre / connexion', emoji: '🔐' },
      { id: 'payment', label: 'Paiement en ligne', emoji: '💳' },
      { id: 'booking', label: 'Réservation / calendrier', emoji: '📅' },
      { id: 'multilang', label: 'Multi-langues', emoji: '🌍' },
      { id: 'analytics', label: 'Analytics / tableau de bord', emoji: '📊' },
      { id: 'seo', label: 'Optimisation SEO avancée', emoji: '🔍' },
      { id: 'api', label: 'Intégration API externe', emoji: '🔗' },
    ],
  },
  {
    id: 'content',
    text: 'Avez-vous déjà le contenu (textes, images) ?',
    type: 'single',
    options: [
      { id: 'ready', label: 'Oui, tout est prêt', emoji: '✅' },
      { id: 'partial', label: 'Partiellement', emoji: '🟡' },
      { id: 'nothing', label: 'Non, j\'ai besoin d\'aide', emoji: '🆘' },
    ],
  },
  {
    id: 'deadline',
    text: 'Quel est votre délai idéal ?',
    type: 'single',
    options: [
      { id: 'asap', label: 'Urgent (< 2 semaines)', emoji: '🔥' },
      { id: 'normal', label: 'Normal (1 à 2 mois)', emoji: '📆' },
      { id: 'flexible', label: 'Flexible (pas pressé)', emoji: '🧘' },
    ],
  },
  {
    id: 'maintenance',
    text: 'Souhaitez-vous un suivi après la mise en ligne ?',
    type: 'single',
    options: [
      { id: 'none', label: 'Non, je gère seul', emoji: '🛠️' },
      { id: 'basic', label: 'Maintenance de base', emoji: '🔧', description: 'Mises à jour, sécurité' },
      { id: 'full', label: 'Suivi complet + évolutions', emoji: '🚀', description: 'Support, ajouts réguliers' },
    ],
  },
]

// ────────────────────────────────────────────────────────────
// MATRICE DE PRIX (en euros)
// ────────────────────────────────────────────────────────────

const BASE_PRICE: Record<string, [number, number]> = {
  landing:   [500,  1200],
  vitrine:   [1200, 3500],
  refonte:   [1500, 4000],
  ecommerce: [3000, 8000],
  webapp:    [4000, 12000],
}

const PAGE_MULTIPLIER: Record<string, number> = {
  '1-3':  1.0,
  '4-7':  1.3,
  '8-15': 1.6,
  '15+':  2.0,
}

const DESIGN_MULTIPLIER: Record<string, number> = {
  template: 1.0,
  custom:   1.4,
  premium:  1.8,
}

const FEATURE_COST: Record<string, [number, number]> = {
  contact:   [0,    100],
  blog:      [300,  800],
  cms:       [500,  1500],
  auth:      [600,  1800],
  payment:   [500,  1500],
  booking:   [600,  2000],
  multilang: [400,  1200],
  analytics: [200,  600],
  seo:       [300,  800],
  api:       [400,  1500],
}

const CONTENT_COST: Record<string, [number, number]> = {
  ready:   [0,   0],
  partial: [300, 800],
  nothing: [600, 1800],
}

const DEADLINE_MULTIPLIER: Record<string, number> = {
  asap:     1.25,
  normal:   1.0,
  flexible: 0.95,
}

const MAINTENANCE_MONTHLY: Record<string, [number, number]> = {
  none:  [0,   0],
  basic: [100, 300],
  full:  [300, 800],
}

// ────────────────────────────────────────────────────────────
// CALCUL
// ────────────────────────────────────────────────────────────

export function computeEstimate(state: QuoteState): QuoteEstimate {
  const breakdown: { label: string; min: number; max: number }[] = []

  // 1. Base
  const [baseMin, baseMax] = BASE_PRICE[state.projectType] ?? [1500, 4000]
  breakdown.push({ label: 'Base projet', min: baseMin, max: baseMax })

  // 2. Pages
  const pageMul = PAGE_MULTIPLIER[state.pageCount] ?? 1
  const pageExtra: [number, number] = [
    Math.round(baseMin * (pageMul - 1)),
    Math.round(baseMax * (pageMul - 1)),
  ]
  if (pageExtra[0] > 0 || pageExtra[1] > 0) {
    breakdown.push({ label: 'Volume de pages', min: pageExtra[0], max: pageExtra[1] })
  }

  // 3. Design
  const designMul = DESIGN_MULTIPLIER[state.designLevel] ?? 1
  const designExtra: [number, number] = [
    Math.round(baseMin * (designMul - 1)),
    Math.round(baseMax * (designMul - 1)),
  ]
  if (designExtra[0] > 0 || designExtra[1] > 0) {
    breakdown.push({ label: 'Niveau de design', min: designExtra[0], max: designExtra[1] })
  }

  // 4. Fonctionnalités
  let featsMin = 0
  let featsMax = 0
  for (const feat of state.features) {
    const cost = FEATURE_COST[feat]
    if (cost) {
      featsMin += cost[0]
      featsMax += cost[1]
    }
  }
  if (featsMin > 0 || featsMax > 0) {
    breakdown.push({ label: 'Fonctionnalités', min: featsMin, max: featsMax })
  }

  // 5. Contenu
  const [contMin, contMax] = CONTENT_COST[state.content] ?? [0, 0]
  if (contMin > 0 || contMax > 0) {
    breakdown.push({ label: 'Aide au contenu', min: contMin, max: contMax })
  }

  // Sous-total avant délai
  let totalMin = baseMin * pageMul * designMul + featsMin + contMin
  let totalMax = baseMax * pageMul * designMul + featsMax + contMax

  // 6. Délai
  const deadlineMul = DEADLINE_MULTIPLIER[state.deadline] ?? 1
  if (deadlineMul !== 1) {
    const label = deadlineMul > 1 ? 'Supplément urgence' : 'Remise flexibilité'
    const extraMin = Math.round(totalMin * (deadlineMul - 1))
    const extraMax = Math.round(totalMax * (deadlineMul - 1))
    breakdown.push({ label, min: extraMin, max: extraMax })
    totalMin = Math.round(totalMin * deadlineMul)
    totalMax = Math.round(totalMax * deadlineMul)
  }

  // 7. Arrondi par 50
  totalMin = Math.round(totalMin / 50) * 50
  totalMax = Math.round(totalMax / 50) * 50

  // Timeline estimée
  const timelineMap: Record<string, string> = {
    landing: '1 à 2 semaines',
    vitrine: '2 à 4 semaines',
    refonte: '3 à 6 semaines',
    ecommerce: '4 à 8 semaines',
    webapp: '6 à 12 semaines',
  }
  let timeline = timelineMap[state.projectType] ?? '3 à 6 semaines'
  if (state.deadline === 'asap') timeline = 'Accéléré — ' + timeline.split(' à ')[0]

  // Modèle recommandé
  let model = 'Forfait projet'
  if (state.projectType === 'webapp' && state.maintenance === 'full') {
    model = 'Forfait projet + mensuel'
  } else if (totalMax <= 1500) {
    model = 'Au temps passé'
  }

  // Maintenance mensuelle
  const [maintMin, maintMax] = MAINTENANCE_MONTHLY[state.maintenance] ?? [0, 0]
  if (maintMin > 0 || maintMax > 0) {
    breakdown.push({
      label: 'Maintenance / mois',
      min: maintMin,
      max: maintMax,
    })
  }

  return { min: totalMin, max: totalMax, breakdown, timeline, model }
}

// ────────────────────────────────────────────────────────────
// BOT MESSAGES
// ────────────────────────────────────────────────────────────

export const BOT_INTRO_MESSAGES = [
  "Bonjour ! 👋 Je suis l'assistant devis de EQ DEV.",
  "Je vais vous poser quelques questions pour estimer le coût de votre projet. C'est rapide, gratuit et sans engagement.",
  "C'est parti !",
]

export function generateResultMessages(estimate: QuoteEstimate, state: QuoteState): string[] {
  const fmt = (n: number) => n.toLocaleString('fr-FR')
  const messages: string[] = []

  messages.push("Merci pour vos réponses ! Voici mon estimation 📊")

  messages.push(
    `💰 **Fourchette estimée : ${fmt(estimate.min)} € — ${fmt(estimate.max)} €**\n\n` +
    `📅 Délai estimé : ${estimate.timeline}\n` +
    `📋 Modèle recommandé : ${estimate.model}`
  )

  // Détail
  let detail = '**Détail du calcul :**\n'
  for (const item of estimate.breakdown) {
    if (item.min === 0 && item.max === 0) continue
    const suffix = item.label.includes('mois') ? ' /mois' : ''
    detail += `\n• ${item.label} : ${fmt(item.min)} — ${fmt(item.max)} €${suffix}`
  }
  messages.push(detail)

  messages.push(
    "⚠️ Cette estimation est **indicative**. Le prix final dépend de la complexité réelle, discutée lors d'un échange gratuit."
  )

  messages.push(
    "Envie d'aller plus loin ? Vous pouvez **[me contacter](/contact)** pour un devis personnalisé, ou **recommencer** la simulation."
  )

  return messages
}
