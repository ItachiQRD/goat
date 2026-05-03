import { Check, Clock, Users, Terminal, Zap, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function Tarification() {
  const pricingModels = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Tarification à l\'heure',
      description: 'Idéal pour les projets avec des besoins variables',
      price: '50-100€/h',
      features: [
        'Facturation transparente',
        'Flexibilité maximale',
        'Suivi détaillé du temps',
        'Adaptation en cours de projet',
        'Pas d\'engagement minimum',
      ],
      pros: [
        'Parfait pour les petites tâches',
        'Ajouts de fonctionnalités faciles',
        'Contrôle total sur le budget',
      ],
      cons: [
        'Budget final incertain',
        'Nécessite une bonne estimation',
      ],
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: 'Tarification au projet',
      description: 'Prix fixe pour un projet défini',
      price: 'Sur devis',
      features: [
        'Budget prévisible',
        'Scope défini à l\'avance',
        'Livraison garantie',
        'Pas de surprises',
        'Paiement échelonné possible',
      ],
      pros: [
        'Budget maîtrisé',
        'Planification claire',
        'Sécurité pour le client',
      ],
      cons: [
        'Moins de flexibilité',
        'Changements = avenants',
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Forfait mensuel',
      description: 'Accès continu à mes services',
      price: 'À partir de 2000€/mois',
      features: [
        'Support continu',
        'Développements réguliers',
        'Maintenance incluse',
        'Priorité sur les demandes',
        'Évolutions progressives',
      ],
      pros: [
        'Relation de confiance',
        'Évolutions continues',
        'Réactivité maximale',
      ],
      cons: [
        'Engagement mensuel',
        'Nécessite un volume régulier',
      ],
    },
  ]

  const factors = [
    {
      title: 'Complexité du projet',
      description: 'Plus le projet est complexe, plus il nécessite de temps et d\'expertise',
      examples: [
        'Application simple : 20-40h',
        'Application moyenne : 80-150h',
        'Application complexe : 200h+',
      ],
    },
    {
      title: 'Technologies utilisées',
      description: 'Certaines technologies nécessitent plus de temps de développement',
      examples: [
        'Frameworks modernes : React, Next.js',
        'Bases de données complexes',
        'Intégrations tierces (paiement, API)',
      ],
    },
    {
      title: 'Délais de livraison',
      description: 'Les projets urgents peuvent nécessiter une majoration',
      examples: [
        'Délai standard : pas de majoration',
        'Délai serré : +20-30%',
        'Urgence : sur devis',
      ],
    },
    {
      title: 'Maintenance et support',
      description: 'Les services post-livraison sont facturés séparément',
      examples: [
        'Maintenance mensuelle : 10-20% du projet',
        'Support ponctuel : à l\'heure',
        'Évolutions : selon complexité',
      ],
    },
  ]

  const process = [
    {
      step: 1,
      title: 'Consultation gratuite',
      description: 'Discussion de vos besoins et objectifs',
    },
    {
      step: 2,
      title: 'Devis détaillé',
      description: 'Proposition avec estimation et planning',
    },
    {
      step: 3,
      title: 'Validation',
      description: 'Ajustements si nécessaire et signature',
    },
    {
      step: 4,
      title: 'Développement',
      description: 'Travail en itérations avec retours réguliers',
    },
    {
      step: 5,
      title: 'Livraison',
      description: 'Mise en production et formation si nécessaire',
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Tarification
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprendre comment fonctionne la tarification des développeurs full stack
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-12 mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transparence et flexibilité
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Chaque projet est unique. Je propose différentes modalités de tarification pour s'adapter à vos besoins et votre budget.
          </p>
        </div>

        {/* Pricing Models */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Modèles de tarification
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingModels.map((model, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <div className="text-primary-600 mb-4">{model.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {model.title}
                </h3>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <div className="text-3xl font-bold text-primary-600 mb-6">
                  {model.price}
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Caractéristiques :</h4>
                  <ul className="space-y-2">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <Check className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-4">
                    <h4 className="font-semibold text-green-700 mb-2">✓ Avantages :</h4>
                    <ul className="space-y-1">
                      {model.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">⚠ À considérer :</h4>
                    <ul className="space-y-1">
                      {model.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Factors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Facteurs influençant le prix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {factors.map((factor, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {factor.title}
                </h3>
                <p className="text-gray-600 mb-4">{factor.description}</p>
                <ul className="space-y-2">
                  {factor.examples.map((example, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="text-primary-600 mr-2">→</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Processus de collaboration
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {process.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start bg-white rounded-lg p-6 shadow-md border-l-4 border-primary-600"
                >
                  <div className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Obtenez un devis gratuit
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Discutons de votre projet et obtenez une estimation personnalisée
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-block"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  )
}

