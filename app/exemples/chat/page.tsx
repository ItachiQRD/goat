'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, User, Bot } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Bonjour. Dites-moi si vous voulez un site vitrine, une boutique, un délai ou un ordre de prix.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(2)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = () => {
    if (!input.trim() || typing) return
    const text = input.trim()
    const userMessage: Message = {
      id: idRef.current++,
      text,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      const t = text.toLowerCase()
      const answer =
        /prix|tarif|budget|devis|co[uû]t/.test(t)
          ? 'Pour un ordre de grandeur, l’estimateur donne une fourchette. Le devis, lui, part de votre brief.'
          : /d[eé]lai|temps|semaine|quand/.test(t)
            ? 'Un site vitrine se livre souvent en 2 à 4 semaines. Une boutique demande un peu plus.'
            : /boutique|vendre|panier|e-?commerce/.test(t)
              ? 'Une boutique, c’est un catalogue, un panier et un paiement. La démo « Boutique » en montre le principe.'
              : /rendez|rdv|appel|cr[eé]neau/.test(t)
                ? 'On peut poser un appel de 30 minutes. La démo « Rendez-vous » montre comment un client choisit un jour.'
                : /vitrine|artisan|restaurant|asso/.test(t)
                  ? 'Un site vitrine présente l’activité, les preuves et un moyen clair de vous contacter.'
                  : 'Je peux parler budget, délai, boutique ou rendez-vous. Le détail se fait ensuite sur le formulaire de contact.'
      const botMessage: Message = {
        id: idRef.current++,
        text: answer,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setTyping(false)
    }, 900)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <MessageSquare className="w-10 h-10 text-pink-400 mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
            Premier contact
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base">
            Les questions qu’un visiteur pose avant de demander un devis
          </p>
        </div>

        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden flex flex-col"
          style={{ height: 'min(600px, 70vh)' }}
        >
          <div className="bg-gradient-to-r from-pink-600/80 to-rose-600/70 text-white p-4 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <div className="font-medium text-sm">Nexus Dev</div>
              <div className="text-xs text-white/70">Réponses locales, sans serveur</div>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto p-5 space-y-4"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                    message.sender === 'user'
                      ? 'bg-pink-600 text-white'
                      : 'bg-white/[0.06] border border-white/10 text-white'
                  }`}
                >
                  <p className="font-light leading-relaxed">{message.text}</p>
                  <div
                    className={`text-[10px] mt-2 ${
                      message.sender === 'user' ? 'text-pink-100/80' : 'text-white/40'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <p className="text-xs text-white/40 pl-11">L&apos;assistant écrit…</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ex. : quel délai pour un site vitrine ?"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/40"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || typing}
                aria-label="Envoyer le message"
                className="bg-pink-600 text-white px-4 py-2.5 rounded-xl hover:bg-pink-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-medium text-white mb-2">Compétences démontrées</h2>
          <ul className="text-sm text-white/55 font-light space-y-1">
            <li>• Questions orientées devis, délai, boutique ou rendez-vous</li>
            <li>• Réponse immédiate, sans quitter la page</li>
            <li>• Le vrai échange continue ensuite par le formulaire</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
