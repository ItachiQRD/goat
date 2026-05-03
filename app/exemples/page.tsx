import Link from 'next/link'
import { Calculator, Database, BarChart3, ShoppingCart, MessageSquare, Calendar } from 'lucide-react'

export default function Exemples() {
  const exemples = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Calculateur Interactif',
      description: 'Démonstration de logique métier et calculs en temps réel',
      href: '/exemples/calculateur',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Gestion de Données',
      description: 'CRUD complet avec stockage local et validation',
      href: '/exemples/gestion-donnees',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Visualisation de Données',
      description: 'Graphiques interactifs et tableaux de bord',
      href: '/exemples/visualisation',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Panier E-commerce',
      description: 'Système de panier avec calculs et gestion d\'état',
      href: '/exemples/panier',
      color: 'from-orange-500 to-orange-700',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Chat en Temps Réel',
      description: 'Interface de messagerie avec simulation temps réel',
      href: '/exemples/chat',
      color: 'from-pink-500 to-pink-700',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Calendrier Interactif',
      description: 'Gestion d\'événements et planification',
      href: '/exemples/calendrier',
      color: 'from-indigo-500 to-indigo-700',
    },
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Exemples Interactifs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez des démonstrations pratiques de mes compétences en développement full stack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exemples.map((exemple, index) => (
            <Link
              key={index}
              href={exemple.href}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                <div className={`bg-gradient-to-br ${exemple.color} p-8 text-white text-center`}>
                  {exemple.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {exemple.title}
                  </h3>
                  <p className="text-gray-600">{exemple.description}</p>
                  <div className="mt-4 text-primary-600 font-medium flex items-center">
                    Voir la démo
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ces exemples démontrent mes compétences
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Chaque démo illustre différentes facettes du développement full stack : logique métier, gestion d'état, interactions utilisateur, et bien plus.
            </p>
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
            >
              Discutons de votre projet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}








