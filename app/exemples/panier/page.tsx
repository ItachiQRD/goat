'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Check } from 'lucide-react'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function Panier() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: 'Sérum visage 30 ml', price: 32, quantity: 1, image: '✨' },
    { id: 2, name: 'Bougie artisanale', price: 18, quantity: 2, image: '🕯️' },
    { id: 3, name: 'Coffret découverte', price: 46, quantity: 1, image: '🎁' },
  ])
  const [ordered, setOrdered] = useState(false)

  const updateQuantity = (id: number, delta: number) => {
    setOrdered(false)
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    setOrdered(false)
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.2
  const total = subtotal + tax

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <ShoppingCart className="w-10 h-10 text-[#ff6b35] mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
            Boutique en ligne
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base">
            Le panier d’une petite marque : quantités, total et TVA, sans paiement réel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {cart.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
                <ShoppingCart className="w-12 h-12 text-white/20 mx-auto mb-3" aria-hidden="true" />
                <p className="text-white/45">Votre panier est vide</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 flex items-center gap-3 md:gap-4"
                >
                  <div className="text-4xl" aria-hidden="true">
                    {item.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium text-white mb-0.5">{item.name}</h3>
                    <p className="text-sm text-white/50">{item.price.toFixed(2)} €</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Diminuer la quantité de ${item.name}`}
                      className="w-8 h-8 flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-lg text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-white" aria-live="polite">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Augmenter la quantité de ${item.name}`}
                      className="w-8 h-8 flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded-lg text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="text-right min-w-[72px]">
                    <p className="text-sm font-medium text-white">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Retirer ${item.name} du panier`}
                    className="p-2 text-[#ff6b35] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sticky top-28">
              <h2 className="text-lg font-light text-white mb-4">Récapitulatif</h2>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-white/55">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-white/55">
                  <span>TVA (20 %)</span>
                  <span>{tax.toFixed(2)} €</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between text-base font-medium text-white">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={() => setOrdered(true)}
                className="w-full bg-[#ff6b35] text-white px-6 py-3 rounded-xl hover:bg-[#ff7f50] transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {ordered ? (
                  <>
                    <Check className="w-5 h-5" aria-hidden="true" />
                    Commande simulée
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" aria-hidden="true" />
                    Passer la commande
                  </>
                )}
              </button>
              <p className="text-xs text-white/40 text-center mt-3" role="status">
                {ordered
                  ? 'Démo terminée — aucun paiement n’a été effectué.'
                  : 'Démo — aucun paiement réel'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-medium text-white mb-2">Compétences démontrées</h2>
          <ul className="text-sm text-white/55 font-light space-y-1">
            <li>• État panier et quantités</li>
            <li>• Calculs automatiques (totaux, TVA)</li>
            <li>• Feedback utilisateur sur l&apos;action checkout</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
