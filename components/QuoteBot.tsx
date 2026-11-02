'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { RotateCcw, ArrowRight, Sparkles } from 'lucide-react'
import {
  QUOTE_QUESTIONS,
  BOT_INTRO_MESSAGES,
  computeEstimate,
  generateResultMessages,
  type QuoteState,
  type QuoteOption,
} from '@/lib/quoteEngine'

// ────────────────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string
  role: 'bot' | 'user'
  text: string
  timestamp: number
}

const EMPTY_STATE: QuoteState = {
  projectType: '',
  pageCount: '',
  designLevel: '',
  features: [],
  content: '',
  deadline: '',
  maintenance: '',
}

// ────────────────────────────────────────────────────────────
// COMPONENT
// ────────────────────────────────────────────────────────────

export default function QuoteBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [state, setState] = useState<QuoteState>(EMPTY_STATE)
  const [currentStep, setCurrentStep] = useState(-1) // -1 = intro
  const [multiSelect, setMultiSelect] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const msgCounter = useRef(0)
  const botRun = useRef(0)

  const newId = () => `msg-${++msgCounter.current}`

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping])

  // Add bot messages with typing delay
  const addBotMessages = useCallback(
    async (texts: string[], thenStep?: number) => {
      const run = ++botRun.current
      const alive = () => botRun.current === run

      for (let i = 0; i < texts.length; i++) {
        if (!alive()) return
        setIsTyping(true)
        await delay(Math.min(600 + texts[i].length * 8, 1800))
        if (!alive()) return
        setMessages((prev) => [
          ...prev,
          { id: newId(), role: 'bot', text: texts[i], timestamp: Date.now() },
        ])
        if (i < texts.length - 1) await delay(280)
      }

      if (!alive()) return
      setIsTyping(false)
      if (thenStep !== undefined) setCurrentStep(thenStep)
    },
    []
  )

  // Boot intro
  useEffect(() => {
    addBotMessages(BOT_INTRO_MESSAGES, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ask current question
  useEffect(() => {
    if (currentStep >= 0 && currentStep < QUOTE_QUESTIONS.length) {
      const q = QUOTE_QUESTIONS[currentStep]
      const texts = [q.text]
      if (q.subtext) texts.push(q.subtext)
      addBotMessages(texts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  // Handle single selection
  const handleSingle = async (option: QuoteOption) => {
    const q = QUOTE_QUESTIONS[currentStep]

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: newId(),
        role: 'user',
        text: `${option.emoji ? option.emoji + ' ' : ''}${option.label}`,
        timestamp: Date.now(),
      },
    ])

    // Update state
    const newState = { ...state, [q.id]: option.id }
    setState(newState)

    // Move to next step
    const nextStep = currentStep + 1
    if (nextStep < QUOTE_QUESTIONS.length) {
      await delay(400)
      setCurrentStep(nextStep)
    } else {
      await finalize(newState)
    }
  }

  // Handle multiple selection (features)
  const toggleMulti = (id: string) => {
    setMultiSelect((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const confirmMulti = async () => {
    const q = QUOTE_QUESTIONS[currentStep]
    const selected = q.options.filter((o) => multiSelect.includes(o.id))
    const label =
      selected.length > 0
        ? selected.map((o) => `${o.emoji ?? ''} ${o.label}`).join(', ')
        : 'Aucune fonctionnalité supplémentaire'

    setMessages((prev) => [
      ...prev,
      { id: newId(), role: 'user', text: label, timestamp: Date.now() },
    ])

    const newState = { ...state, [q.id]: multiSelect }
    setState(newState as unknown as QuoteState)
    setMultiSelect([])

    const nextStep = currentStep + 1
    if (nextStep < QUOTE_QUESTIONS.length) {
      await delay(400)
      setCurrentStep(nextStep)
    } else {
      await finalize(newState as unknown as QuoteState)
    }
  }

  // Finalize & compute
  const finalize = async (finalState: QuoteState) => {
    const estimate = computeEstimate(finalState)
    const resultMsgs = generateResultMessages(estimate, finalState)
    await addBotMessages(resultMsgs)
    setIsDone(true)
  }

  // Restart
  const restart = () => {
    setMessages([])
    setState(EMPTY_STATE)
    setCurrentStep(-1)
    setMultiSelect([])
    setIsTyping(false)
    setIsDone(false)
    msgCounter.current = 0
    setTimeout(() => addBotMessages(BOT_INTRO_MESSAGES, 0), 100)
  }

  // Current question
  const currentQuestion =
    currentStep >= 0 && currentStep < QUOTE_QUESTIONS.length
      ? QUOTE_QUESTIONS[currentStep]
      : null
  const showOptions = currentQuestion && !isTyping

  return (
    <div className="flex h-[calc(100dvh-21rem)] max-h-[800px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f0f] shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:h-[calc(100dvh-18rem)] md:h-[calc(100dvh-14rem)] md:rounded-3xl">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-[#0a0a0a]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium text-white">Assistant devis</div>
            <div className="text-[11px] text-white/50 flex items-center gap-1.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              En ligne
            </div>
          </div>
        </div>
        {isDone && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={restart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/10 hover:border-white/25 transition-all text-xs text-white/80"
          >
            <RotateCcw className="w-3 h-3" />
            Recommencer
          </motion.button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/[0.08]">
              <div className="flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/50"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Options / Input area */}
      <AnimatePresence mode="wait">
        {showOptions && (
          <motion.div
            key={`options-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-0 max-h-[62%] shrink flex-col overflow-hidden border-t border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-xl"
          >
            {currentQuestion.type === 'single' ? (
              <div className="flex flex-wrap gap-2 overflow-y-auto p-4 md:p-5">
                {currentQuestion.options.map((opt) => (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSingle(opt)}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#3b82f6]/40 transition-all text-left"
                  >
                    {opt.emoji && (
                      <span className="text-base flex-shrink-0">{opt.emoji}</span>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm text-white font-light">
                        {opt.label}
                      </div>
                      {opt.description && (
                        <div className="text-[11px] text-white/45 mt-0.5">
                          {opt.description}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-4 sm:flex-row sm:flex-wrap md:p-5 md:pb-3">
                  {currentQuestion.options.map((opt) => {
                    const selected = multiSelect.includes(opt.id)
                    return (
                      <motion.button
                        key={opt.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleMulti(opt.id)}
                        className={`flex w-full items-center gap-2 rounded-xl border px-3.5 py-2 text-left text-sm transition-all sm:w-auto ${
                          selected
                            ? 'bg-[#3b82f6]/15 border-[#3b82f6]/40 text-white'
                            : 'bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 text-[10px] border transition-colors ${
                            selected
                              ? 'bg-[#3b82f6] border-[#3b82f6] text-white'
                              : 'border-white/20'
                          }`}
                        >
                          {selected && '✓'}
                        </span>
                        {opt.emoji && <span className="text-sm">{opt.emoji}</span>}
                        <span className="font-light">{opt.label}</span>
                      </motion.button>
                    )
                  })}
                </div>
                <div className="shrink-0 border-t border-white/[0.06] p-4 pt-3 md:p-5">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={confirmMulti}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] px-5 py-3 text-sm font-medium text-white hover:shadow-[0_8px_24px_rgba(59,130,246,0.3)] transition-shadow"
                  >
                    Valider ma sélection
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Done footer */}
      {isDone && !isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/[0.08] p-4 md:p-5 bg-[#0a0a0a]/80 flex flex-col sm:flex-row gap-3"
        >
          <Link href="/contact" className="flex-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors cursor-pointer"
            >
              Me contacter pour un vrai devis
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={restart}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/15 text-white text-sm font-light hover:bg-white/10 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Refaire une simulation
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// MESSAGE BUBBLE
// ────────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: ChatMessage }) {
  const isBot = message.role === 'bot'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center flex-shrink-0 mb-0.5">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 text-sm font-light leading-relaxed whitespace-pre-line ${
          isBot
            ? 'bg-white/[0.06] border border-white/[0.08] text-white/90 rounded-2xl rounded-bl-md'
            : 'bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white rounded-2xl rounded-br-md'
        }`}
      >
        <MessageContent text={message.text} />
      </div>
    </motion.div>
  )
}

// ────────────────────────────────────────────────────────────
// MARKDOWN-LITE
// ────────────────────────────────────────────────────────────

function MessageContent({ text }: { text: string }) {
  // Minimal: bold (**text**), links ([label](url))
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const boldMatch = part.match(/^\*\*(.+)\*\*$/)
        if (boldMatch) {
          return (
            <strong key={i} className="font-medium text-white">
              {boldMatch[1]}
            </strong>
          )
        }
        const linkMatch = part.match(/^\[(.+)\]\((.+)\)$/)
        if (linkMatch) {
          return (
            <Link
              key={i}
              href={linkMatch[2]}
              className="underline underline-offset-2 text-[#60a5fa] hover:text-white transition-colors"
            >
              {linkMatch[1]}
            </Link>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

// ────────────────────────────────────────────────────────────
// UTIL
// ────────────────────────────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
