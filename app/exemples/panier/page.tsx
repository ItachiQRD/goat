'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function Panier() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: 'Laptop Pro', price: 1299, quantity: 1, image: '💻' },
    { id: 2, name: 'Souris Sans Fil', price: 49, quantity: 2, image: '🖱️' },
    { id: 3, name: 'Clavier Mécanique', price: 129, quantity: 1, image: '⌨️' },
  ])

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.20 // TVA 20%
  const total = subtotal + tax

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <ShoppingCart className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panier E-commerce
          </h1>
          <p className="text-gray-600">
            Système de panier avec calculs automatiques et gestion d'état
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Votre panier est vide</p>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4"
                >
                  <div className="text-5xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">
                      {item.price.toFixed(2)}€
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-gray-900">
                      {(item.price * item.quantity).toFixed(2)}€
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Récapitulatif
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TVA (20%)</span>
                  <span>{tax.toFixed(2)}€</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
              <button className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Passer la commande
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Démo - Aucun paiement réel
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            Compétences démontrées :
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Gestion d'état complexe (panier d'achat)</li>
            <li>• Calculs automatiques (totaux, taxes)</li>
            <li>• Interface utilisateur interactive</li>
            <li>• Mise à jour en temps réel</li>
            <li>• Logique métier e-commerce</li>
          </ul>
        </div>
      </div>
    </div>
  )
}








