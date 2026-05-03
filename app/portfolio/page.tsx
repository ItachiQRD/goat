'use client'

import { useState } from 'react'
import { ExternalLink, Github, Terminal, Database, Smartphone, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ecommerce', label: 'E-commerce' },
  ]

  const projects = [
    {
      id: 1,
      title: 'Application de Gestion de Tâches',
      category: 'web',
      description: 'Application web moderne avec React et Node.js pour la gestion de projets en équipe',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '📋',
      demoUrl: '#',
      githubUrl: '#',
      features: ['Authentification JWT', 'Temps réel', 'Notifications', 'Dashboard analytique'],
    },
    {
      id: 2,
      title: 'Plateforme E-commerce',
      category: 'ecommerce',
      description: 'Boutique en ligne complète avec système de paiement et gestion des stocks',
      technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
      image: '🛒',
      demoUrl: '#',
      githubUrl: '#',
      features: ['Paiements sécurisés', 'Multi-langues', 'Gestion stocks', 'Analytics'],
    },
    {
      id: 3,
      title: 'Application Mobile Fitness',
      category: 'mobile',
      description: 'Application mobile pour suivre les entraînements et la nutrition',
      technologies: ['React Native', 'Firebase', 'Redux'],
      image: '💪',
      demoUrl: '#',
      githubUrl: '#',
      features: ['Suivi d\'entraînement', 'Plan nutritionnel', 'Statistiques', 'Social'],
    },
    {
      id: 4,
      title: 'Dashboard Analytique',
      category: 'web',
      description: 'Tableau de bord interactif pour visualiser et analyser des données',
      technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
      image: '📊',
      demoUrl: '#',
      githubUrl: '#',
      features: ['Graphiques interactifs', 'Export de données', 'Filtres avancés', 'Temps réel'],
    },
    {
      id: 5,
      title: 'Réseau Social',
      category: 'web',
      description: 'Plateforme sociale avec chat en temps réel et partage de contenu',
      technologies: ['Next.js', 'Socket.io', 'MongoDB', 'AWS S3'],
      image: '👥',
      demoUrl: '#',
      githubUrl: '#',
      features: ['Chat temps réel', 'Partage média', 'Feed personnalisé', 'Recherche avancée'],
    },
    {
      id: 6,
      title: 'Application de Réservation',
      category: 'web',
      description: 'Système de réservation en ligne pour restaurants et événements',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: '📅',
      demoUrl: '#',
      githubUrl: '#',
      features: ['Calendrier interactif', 'Paiements', 'Notifications email', 'Gestion multi-utilisateurs'],
    },
  ]

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez quelques-unes de mes réalisations qui démontrent mes compétences en développement full stack
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-12 text-center text-6xl">
                {project.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1 mb-6">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <a
                    href={project.demoUrl}
                    className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Démo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discutons de votre projet et créons quelque chose d'exceptionnel ensemble
            </p>
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              Démarrer un projet
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

