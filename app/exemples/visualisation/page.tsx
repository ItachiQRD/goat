'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'

interface DataPoint {
  month: string
  value: number
}

export default function Visualisation() {
  const [data] = useState<DataPoint[]>([
    { month: 'Jan', value: 45 },
    { month: 'Fév', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Avr', value: 61 },
    { month: 'Mai', value: 55 },
    { month: 'Jun', value: 67 },
  ])

  const maxValue = Math.max(...data.map(d => d.value))
  const average = data.reduce((sum, d) => sum + d.value, 0) / data.length
  const trend = data[data.length - 1].value > data[0].value ? 'up' : 'down'

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Visualisation de Données
          </h1>
          <p className="text-gray-600">
            Graphiques interactifs et tableaux de bord avec calculs statistiques
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Valeur maximale</div>
            <div className="text-3xl font-bold text-gray-900">{maxValue}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Moyenne</div>
            <div className="text-3xl font-bold text-gray-900">{average.toFixed(1)}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-sm text-gray-600 mb-1">Tendance</div>
            <div className="flex items-center text-3xl font-bold text-gray-900">
              {trend === 'up' ? (
                <>
                  <TrendingUp className="w-8 h-8 text-green-600 mr-2" />
                  <span className="text-green-600">+{((data[data.length - 1].value / data[0].value - 1) * 100).toFixed(1)}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-8 h-8 text-red-600 mr-2" />
                  <span className="text-red-600">-{((1 - data[data.length - 1].value / data[0].value) * 100).toFixed(1)}%</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Graphique en barres
          </h2>
          <div className="flex items-end justify-between h-64 gap-4">
            {data.map((point, index) => {
              const height = (point.value / maxValue) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center justify-end h-full">
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg hover:from-purple-700 hover:to-purple-500 transition-all cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {point.value}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-700">
                    {point.month}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Graphique linéaire
          </h2>
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
                </linearGradient>
              </defs>
              <polyline
                points={data.map((point, index) => {
                  const x = (index / (data.length - 1)) * 600
                  const y = 200 - (point.value / maxValue) * 200
                  return `${x},${y}`
                }).join(' ')}
                fill="none"
                stroke="rgb(147, 51, 234)"
                strokeWidth="3"
              />
              <polygon
                points={`0,200 ${data.map((point, index) => {
                  const x = (index / (data.length - 1)) * 600
                  const y = 200 - (point.value / maxValue) * 200
                  return `${x},${y}`
                }).join(' ')} 600,200`}
                fill="url(#gradient)"
              />
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * 600
                const y = 200 - (point.value / maxValue) * 200
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="rgb(147, 51, 234)"
                    className="hover:r-6 transition-all"
                  />
                )
              })}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-sm text-gray-600">
              {data.map((point, index) => (
                <span key={index}>{point.month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            Compétences démontrées :
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Calculs statistiques (moyenne, maximum, tendances)</li>
            <li>• Visualisation de données avec SVG</li>
            <li>• Graphiques interactifs</li>
            <li>• Responsive design</li>
            <li>• Animations et transitions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}








