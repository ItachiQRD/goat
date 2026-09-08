'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Edit2, Save, X, Database } from 'lucide-react'

interface Item {
  id: number
  name: string
  description: string
  category: string
}

const STORAGE_KEY = 'demo-items'

export default function GestionDonnees() {
  const [items, setItems] = useState<Item[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '', category: '' })
  const [filter, setFilter] = useState<string>('all')
  const skipNextSave = useRef(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved) as Item[])
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const categories = ['Travail', 'Personnel', 'Urgent']

  const addItem = () => {
    if (!formData.name.trim()) return
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        category: formData.category || categories[0],
      },
    ])
    setFormData({ name: '', description: '', category: categories[0] })
  }

  const deleteItem = (id: number) => setItems((prev) => prev.filter((item) => item.id !== id))

  const startEdit = (item: Item) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
    })
  }

  const saveEdit = () => {
    if (!editingId || !formData.name.trim()) return
    setItems((prev) =>
      prev.map((item) => (item.id === editingId ? { ...item, ...formData } : item))
    )
    setEditingId(null)
    setFormData({ name: '', description: '', category: categories[0] })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', description: '', category: categories[0] })
  }

  const filteredItems =
    filter === 'all' ? items : items.filter((item) => item.category === filter)

  const fieldClass =
    'w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/40'

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <Database className="w-10 h-10 text-emerald-400 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
            Gestion de données (CRUD)
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base">
            Création, lecture, mise à jour et suppression avec stockage local
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-6 mb-5">
          <h2 className="text-lg font-light text-white mb-4">
            {editingId ? "Modifier l'élément" : 'Ajouter un élément'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1" htmlFor="item-name">
                Nom *
              </label>
              <input
                id="item-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={fieldClass}
                placeholder="Nom de l'élément"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1" htmlFor="item-desc">
                Description
              </label>
              <textarea
                id="item-desc"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={fieldClass}
                rows={3}
                placeholder="Description..."
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1" htmlFor="item-cat">
                Catégorie
              </label>
              <select
                id="item-cat"
                value={formData.category || categories[0]}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={fieldClass}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#111]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              {editingId ? (
                <>
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <Save className="w-4 h-4" aria-hidden="true" />
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={addItem}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Ajouter
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm transition-colors ${
              filter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.08]'
            }`}
          >
            Tous ({items.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.08]'
              }`}
            >
              {cat} ({items.filter((i) => i.category === cat).length})
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {!hydrated ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white/40">
              Chargement…
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white/40">
              Aucun élément. Ajoutez-en un pour commencer.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base font-medium text-white">{item.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                      {item.category}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-white/55 font-light">{item.description}</p>
                  )}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="p-2 text-[#93c5fd] hover:bg-white/5 rounded-lg transition-colors"
                    aria-label={`Modifier ${item.name}`}
                  >
                    <Edit2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-[#ff6b35] hover:bg-white/5 rounded-lg transition-colors"
                    aria-label={`Supprimer ${item.name}`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-medium text-white mb-2">Compétences démontrées</h2>
          <ul className="text-sm text-white/55 font-light space-y-1">
            <li>• CRUD complet avec persistance localStorage</li>
            <li>• Hydratation sécurisée (pas d&apos;écrasement au montage)</li>
            <li>• Filtrage et validation de formulaire</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
