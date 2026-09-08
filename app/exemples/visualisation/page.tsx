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

  const maxValue = Math.max(...data.map((d) => d.value))
  const average = data.reduce((sum, d) => sum + d.value, 0) / data.length
  const trend = data[data.length - 1].value > data[0].value ? 'up' : 'down'

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <BarChart3 className="w-10 h-10 text-[#8b5cf6] mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
            Visualisation de données
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base">
            Graphiques et indicateurs avec calculs statistiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-xs text-white/45 mb-1">Valeur maximale</div>
            <div className="text-3xl font-light text-white">{maxValue}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-xs text-white/45 mb-1">Moyenne</div>
            <div className="text-3xl font-light text-white">{average.toFixed(1)}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-xs text-white/45 mb-1">Tendance</div>
            <div className="flex items-center text-2xl font-light">
              {trend === 'up' ? (
                <>
                  <TrendingUp className="w-7 h-7 text-emerald-400 mr-2" aria-hidden="true" />
                  <span className="text-emerald-400">
                    +
                    {(
                      (data[data.length - 1].value / data[0].value - 1) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-7 h-7 text-[#ff6b35] mr-2" aria-hidden="true" />
                  <span className="text-[#ff6b35]">
                    -
                    {(
                      (1 - data[data.length - 1].value / data[0].value) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 mb-5">
          <h2 className="text-xl font-light text-white mb-6">Graphique en barres</h2>
          <div
            className="flex items-end justify-between h-56 gap-3"
            role="img"
            aria-label="Barres : valeurs mensuelles de janvier à juin"
          >
            {data.map((point, index) => {
              const height = (point.value / maxValue) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full">
                  <div className="w-full flex flex-col items-center justify-end flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-[#8b5cf6] to-[#a78bfa] rounded-t-lg relative group min-h-[4px]"
                      style={{ height: `${height}%` }}
                      title={`${point.month}: ${point.value}`}
                    >
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {point.value}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-white/50">{point.month}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h2 className="text-xl font-light text-white mb-6">Graphique linéaire</h2>
          <div className="relative h-56">
            <svg
              className="w-full h-full"
              viewBox="0 0 600 200"
              preserveAspectRatio="none"
              role="img"
              aria-label="Courbe des valeurs mensuelles"
            >
              <defs>
                <linearGradient id="viz-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.35)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                </linearGradient>
              </defs>
              <polyline
                points={data
                  .map((point, index) => {
                    const x = (index / (data.length - 1)) * 600
                    const y = 200 - (point.value / maxValue) * 180 - 10
                    return `${x},${y}`
                  })
                  .join(' ')}
                fill="none"
                stroke="rgb(167, 139, 250)"
                strokeWidth="3"
              />
              <polygon
                points={`0,200 ${data
                  .map((point, index) => {
                    const x = (index / (data.length - 1)) * 600
                    const y = 200 - (point.value / maxValue) * 180 - 10
                    return `${x},${y}`
                  })
                  .join(' ')} 600,200`}
                fill="url(#viz-gradient)"
              />
              {data.map((point, index) => {
                const x = (index / (data.length - 1)) * 600
                const y = 200 - (point.value / maxValue) * 180 - 10
                return (
                  <circle key={index} cx={x} cy={y} r="4" fill="rgb(167, 139, 250)" />
                )
              })}
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-white/45">
              {data.map((point, index) => (
                <span key={index}>{point.month}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-medium text-white mb-2">Compétences démontrées</h2>
          <ul className="text-sm text-white/55 font-light space-y-1">
            <li>• Stats (moyenne, max, tendance)</li>
            <li>• Visualisation SVG responsive</li>
            <li>• Indicateurs lisibles sur thème sombre</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
