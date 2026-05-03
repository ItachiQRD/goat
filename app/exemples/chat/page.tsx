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
      text: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date(),
      }
      setMessages([...messages, userMessage])
      setInput('')

      // Simuler une réponse du bot après 1 seconde
      setTimeout(() => {
        const botResponses = [
          'Merci pour votre message ! Je traite votre demande.',
          'C\'est une excellente question. Laissez-moi réfléchir...',
          'Je comprends votre besoin. Voici ce que je peux vous proposer.',
          'Parfait ! Je vais m\'occuper de cela.',
          'Très bien, je note votre demande.',
        ]
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        const botMessage: Message = {
          id: messages.length + 2,
          text: randomResponse,
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <MessageSquare className="w-12 h-12 text-pink-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Chat en Temps Réel
          </h1>
          <p className="text-gray-600">
            Interface de messagerie avec simulation de conversation temps réel
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold">Assistant Virtuel</div>
              <div className="text-xs text-pink-100">En ligne</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.sender === 'user'
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            Compétences démontrées :
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Interface de chat interactive</li>
            <li>• Gestion d'état en temps réel</li>
            <li>• Scroll automatique</li>
            <li>• Simulation de réponses asynchrones</li>
            <li>• Design conversationnel moderne</li>
          </ul>
        </div>
      </div>
    </div>
  )
}








