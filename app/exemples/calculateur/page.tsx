'use client'

import { useMemo, useState } from 'react'
import { Calculator as CalcIcon } from 'lucide-react'
import Link from 'next/link'

const offers = [
  { id: 'vitrine', label: 'Site vitrine', detail: 'Présenter l’activité et être trouvé', base: 1400 },
  { id: 'rdv', label: 'Site + rendez-vous', detail: 'Créneaux réservables par vos clients', base: 1900 },
  { id: 'shop', label: 'Boutique en ligne', detail: 'Catalogue, panier et paiement', base: 2800 },
] as const

const extras = [
  { id: 'seo', label: 'Référencement local', price: 400 },
  { id: 'cms', label: 'Textes modifiables sans code', price: 350 },
  { id: 'blog', label: 'Actualités ou blog', price: 300 },
] as const

type OfferId = (typeof offers)[number]['id']
type ExtraId = (typeof extras)[number]['id']

export default function Calculateur() {
  const [offer, setOffer] = useState<OfferId>('vitrine')
  const [pages, setPages] = useState(5)
  const [selected, setSelected] = useState<ExtraId[]>(['seo'])

  const estimate = useMemo(() => {
    const base = offers.find((item) => item.id === offer)?.base ?? 1400
    const pageExtra = Math.max(0, pages - 4) * 120
    const options = extras
      .filter((item) => selected.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0)
    const mid = base + pageExtra + options
    return { low: Math.round(mid * 0.9), high: Math.round(mid * 1.15) }
  }, [offer, pages, selected])

  const toggle = (id: ExtraId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <CalcIcon className="w-10 h-10 text-[#3b82f6] mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
            Estimateur de projet
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base">
            Une fourchette indicative, avant le devis détaillé.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 space-y-6">
          <fieldset>
            <legend className="text-sm text-white/70 mb-3">Type de site</legend>
            <div className="grid gap-2">
              {offers.map((item) => (
                <label
                  key={item.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    offer === item.id
                      ? 'border-[#3b82f6]/60 bg-[#3b82f6]/10'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <input
                    type="radio"
                    name="offer"
                    className="mt-1"
                    checked={offer === item.id}
                    onChange={() => setOffer(item.id)}
                  />
                  <span>
                    <span className="block text-sm text-white">{item.label}</span>
                    <span className="block text-xs text-white/50 font-light">{item.detail}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="flex justify-between text-sm text-white/70 mb-2">
              Nombre de pages
              <span className="text-white">{pages}</span>
            </span>
            <input
              type="range"
              min={3}
              max={12}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="w-full accent-[#3b82f6]"
            />
          </label>

          <fieldset>
            <legend className="text-sm text-white/70 mb-3">Options</legend>
            <div className="grid sm:grid-cols-3 gap-2">
              {extras.map((item) => {
                const on = selected.includes(item.id)
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-pressed={on}
                    className={`rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
                      on
                        ? 'border-[#8b5cf6]/60 bg-[#8b5cf6]/15 text-white'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="block">{item.label}</span>
                    <span className="block text-xs text-white/45 mt-1">+{item.price} €</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="rounded-xl border border-white/10 bg-black/30 px-5 py-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/40">Fourchette estimée</p>
              <p className="text-3xl font-light text-white mt-1">
                {estimate.low.toLocaleString('fr-FR')} – {estimate.high.toLocaleString('fr-FR')} €
              </p>
            </div>
            <Link
              href="/devis"
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium"
            >
              Affiner avec le devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
