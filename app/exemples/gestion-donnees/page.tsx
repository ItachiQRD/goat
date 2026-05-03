'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, X, Database } from 'lucide-react'

interface Item {
  id: number
  name: string
  description: string
  category: string
}

export default function GestionDonnees() {
  const [items, setItems] = useState<Item[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '', category: '' })
  const [filter, setFilter] = useState<string>('all')

  // Charger depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem('demo-items')
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('demo-items', JSON.stringify(items))
  }, [items])

  const categories = ['Travail', 'Personnel', 'Urgent']

  const addItem = () => {
    if (formData.name.trim()) {
      const newItem: Item = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        category: formData.category || categories[0],
      }
      setItems([...items, newItem])
      setFormData({ name: '', description: '', category: '' })
    }
  }

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const startEdit = (item: Item) => {
    setEditingId(item.id)
    setFormData({ name: item.name, description: item.description, category: item.category })
  }

  const saveEdit = () => {
    if (editingId && formData.name.trim()) {
      setItems(items.map(item =>
        item.id === editingId
          ? { ...item, ...formData }
          : item
      ))
      setEditingId(null)
      setFormData({ name: '', description: '', category: '' })
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', description: '', category: '' })
  }

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter)

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <Database className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestion de Données (CRUD)
          </h1>
          <p className="text-gray-600">
            Création, lecture, mise à jour et suppression avec stockage local
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {editingId ? 'Modifier l\'élément' : 'Ajouter un nouvel élément'}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Nom de l'élément"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              {editingId ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  onClick={addItem}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filtre */}
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tous ({items.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === cat ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat} ({items.filter(i => i.category === cat).length})
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
              Aucun élément. Ajoutez-en un pour commencer !
            </div>
          ) : (
            filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-gray-600">{item.description}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            Compétences démontrées :
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Opérations CRUD complètes (Create, Read, Update, Delete)</li>
            <li>• Gestion d'état avec React hooks</li>
            <li>• Persistance des données (localStorage)</li>
            <li>• Filtrage et recherche</li>
            <li>• Validation de formulaire</li>
          </ul>
        </div>
      </div>
    </div>
  )
}








