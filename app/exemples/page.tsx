import Link from 'next/link'
import { Calculator, Database, BarChart3, ShoppingCart, MessageSquare, Calendar } from 'lucide-react'

export default function Exemples() {
  const exemples = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Estimateur de projet',
      description: 'Fourchette de budget selon le type de site, les pages et les options',
      href: '/exemples/calculateur',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Catalogue de prestations',
      description: 'Ajoutez, modifiez et filtrez les offres affichées sur un site',
      href: '/exemples/gestion-donnees',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Activité du site',
      description: 'Visites, tendance et lecture simple des chiffres du mois',
      href: '/exemples/visualisation',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Boutique en ligne',
      description: 'Panier, quantités et total TTC, comme sur une vraie boutique',
      href: '/exemples/panier',
      color: 'from-orange-500 to-orange-700',
    },
      {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Premier contact',
      description: 'Un assistant qui oriente vers un devis, un délai ou un rendez-vous',
      href: '/exemples/chat',
      color: 'from-pink-500 to-pink-700',
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Prise de rendez-vous',
      description: 'Créneaux à poser dans le mois, comme un appel découverte',
      href: '/exemples/calendrier',
      color: 'from-indigo-500 to-indigo-700',
    },
  ]

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-4">
            Exemples{' '}
            <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent">
              interactifs
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Démos proches d’un vrai projet : devis, vitrine, boutique, rendez-vous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {exemples.map((exemple, index) => (
            <Link key={index} href={exemple.href} className="group block h-full">
              <div className="h-full rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06] transition-all">
                <div
                  className={`bg-gradient-to-br ${exemple.color} p-8 text-white flex items-center justify-center`}
                >
                  {exemple.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-medium text-white mb-2 group-hover:text-[#93c5fd] transition-colors">
                    {exemple.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light leading-relaxed">
                    {exemple.description}
                  </p>
                  <div className="mt-4 text-sm font-medium text-[#60a5fa] flex items-center gap-2">
                    Voir la démo
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 md:mt-16 text-center">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-3">
              Ce que vos visiteurs peuvent faire
            </h2>
            <p className="text-base text-white/60 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Estimer un budget, réserver un appel, acheter, suivre l’activité du site.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:scale-[1.03] transition-transform"
            >
              Discutons de votre projet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
