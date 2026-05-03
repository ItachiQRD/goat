import { Terminal, Database, Smartphone, Cloud, Lock, Zap, Palette, Globe } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: <Terminal className="w-10 h-10" />,
      title: 'Développement Frontend',
      description: 'Création d\'interfaces utilisateur modernes et intuitives',
      features: [
        'React, Next.js, Vue.js',
        'Design responsive et mobile-first',
        'Animations et transitions fluides',
        'Optimisation des performances',
        'Accessibilité (WCAG)',
        'Tests unitaires et d\'intégration',
      ],
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: 'Développement Backend',
      description: 'Architecture serveur robuste et scalable',
      features: [
        'APIs RESTful et GraphQL',
        'Node.js, Express, Python',
        'Bases de données SQL et NoSQL',
        'Authentification et sécurité',
        'Microservices architecture',
        'Cache et optimisation',
      ],
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: 'Applications Mobile',
      description: 'Applications mobiles cross-platform',
      features: [
        'React Native',
        'Progressive Web Apps (PWA)',
        'Design adaptatif',
        'Notifications push',
        'Intégration API',
        'Publication sur stores',
      ],
    },
    {
      icon: <Cloud className="w-10 h-10" />,
      title: 'Cloud & DevOps',
      description: 'Déploiement et gestion de l\'infrastructure',
      features: [
        'Docker et conteneurisation',
        'AWS, Azure, GCP',
        'CI/CD pipelines',
        'Monitoring et logs',
        'Scaling automatique',
        'Backup et récupération',
      ],
    },
    {
      icon: <Lock className="w-10 h-10" />,
      title: 'Sécurité Web',
      description: 'Protection de vos applications et données',
      features: [
        'Audit de sécurité',
        'HTTPS et SSL/TLS',
        'Protection contre les injections',
        'Gestion des tokens JWT',
        'Conformité RGPD',
        'Tests de pénétration',
      ],
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: 'UI/UX Design',
      description: 'Design centré sur l\'expérience utilisateur',
      features: [
        'Wireframes et prototypes',
        'Design system',
        'Tests utilisateurs',
        'Optimisation de conversion',
        'Branding et identité visuelle',
        'Design responsive',
      ],
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: 'Optimisation Performance',
      description: 'Applications rapides et efficaces',
      features: [
        'Optimisation du temps de chargement',
        'Lazy loading et code splitting',
        'CDN et cache',
        'Optimisation des images',
        'Analyse de performance',
        'Core Web Vitals',
      ],
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'E-commerce',
      description: 'Solutions e-commerce complètes',
      features: [
        'Boutiques en ligne',
        'Paiements sécurisés',
        'Gestion des stocks',
        'Multi-langues et devises',
        'Intégration ERP',
        'Analytics et reporting',
      ],
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mes Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions complètes pour tous vos besoins de développement web
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
            >
              <div className="text-primary-600 mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'un service personnalisé ?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Discutons de votre projet et trouvons la solution adaptée à vos besoins
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center"
          >
            Me contacter
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

