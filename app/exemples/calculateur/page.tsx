'use client'

import { useState } from 'react'
import { Calculator as CalcIcon, RotateCcw } from 'lucide-react'

export default function Calculateur() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const inputNumber = (num: string) => {
    setError(null)
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    setError(null)
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const result = calculate(previousValue, inputValue, operation)
      if (result === null) {
        setError('Division par zéro impossible')
        setDisplay('Erreur')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForNewValue(true)
        return
      }
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (
    firstValue: number,
    secondValue: number,
    op: string
  ): number | null => {
    switch (op) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        if (secondValue === 0) return null
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)
    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation)
      if (result === null) {
        setError('Division par zéro impossible')
        setDisplay('Erreur')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForNewValue(true)
        return
      }
      setError(null)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
    setError(null)
  }

  const inputDecimal = () => {
    setError(null)
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const btn =
    'font-medium py-4 rounded-xl transition-colors text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]'
  const numBtn = `${btn} bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10`
  const opBtn = `${btn} bg-white/[0.1] hover:bg-white/[0.16] text-white border border-white/15`

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <CalcIcon className="w-10 h-10 text-[#3b82f6] mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
            Calculateur interactif
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base">
            Démo de logique métier et gestion d&apos;état React
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-6">
          <div
            className="rounded-xl bg-black/40 border border-white/10 p-5 mb-5"
            aria-live="polite"
          >
            <div className="text-right">
              {operation && previousValue !== null && (
                <div className="text-white/40 text-sm mb-1 font-mono">
                  {previousValue} {operation}
                </div>
              )}
              <div className="text-white text-3xl md:text-4xl font-mono font-medium overflow-x-auto">
                {display}
              </div>
              {error && (
                <p className="text-[#ff6b35] text-xs mt-2" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5" role="group" aria-label="Clavier calculatrice">
            <button
              type="button"
              onClick={clear}
              aria-label="Effacer"
              className={`col-span-2 ${btn} bg-[#ff6b35]/90 hover:bg-[#ff6b35] text-white flex items-center justify-center gap-2`}
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Clear
            </button>
            <button type="button" onClick={() => inputOperation('/')} aria-label="Diviser" className={opBtn}>
              ÷
            </button>
            <button type="button" onClick={() => inputOperation('*')} aria-label="Multiplier" className={opBtn}>
              ×
            </button>

            {['7', '8', '9'].map((n) => (
              <button key={n} type="button" onClick={() => inputNumber(n)} aria-label={n} className={numBtn}>
                {n}
              </button>
            ))}
            <button type="button" onClick={() => inputOperation('-')} aria-label="Soustraire" className={opBtn}>
              −
            </button>

            {['4', '5', '6'].map((n) => (
              <button key={n} type="button" onClick={() => inputNumber(n)} aria-label={n} className={numBtn}>
                {n}
              </button>
            ))}
            <button type="button" onClick={() => inputOperation('+')} aria-label="Additionner" className={opBtn}>
              +
            </button>

            {['1', '2', '3'].map((n) => (
              <button key={n} type="button" onClick={() => inputNumber(n)} aria-label={n} className={numBtn}>
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={performCalculation}
              aria-label="Égal"
              className={`row-span-2 ${btn} bg-[#3b82f6] hover:bg-[#2563eb] text-white`}
            >
              =
            </button>

            <button
              type="button"
              onClick={() => inputNumber('0')}
              aria-label="0"
              className={`col-span-2 ${numBtn}`}
            >
              0
            </button>
            <button type="button" onClick={inputDecimal} aria-label="Virgule décimale" className={numBtn}>
              .
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-medium text-white mb-2">Compétences démontrées</h2>
          <ul className="text-sm text-white/55 font-light space-y-1">
            <li>• Gestion d&apos;état avec React hooks</li>
            <li>• Logique métier et garde-fous (division par zéro)</li>
            <li>• Interface interactive accessible</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
