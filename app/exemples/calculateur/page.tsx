'use client'

import { useState } from 'react'
import { Calculator as CalcIcon, RotateCcw } from 'lucide-react'

export default function Calculateur() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
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
  }

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <CalcIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Calculateur Interactif
            </h1>
            <p className="text-gray-600">
              Démonstration de logique métier et gestion d'état avec React
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {/* Display */}
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="text-right">
                {operation && previousValue !== null && (
                  <div className="text-gray-400 text-sm mb-1">
                    {previousValue} {operation}
                  </div>
                )}
                <div className="text-white text-4xl font-mono font-bold overflow-x-auto">
                  {display}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-3">
              {/* Row 1 */}
              <button
                onClick={clear}
                className="col-span-2 bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Clear
              </button>
              <button
                onClick={() => inputOperation('/')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                ÷
              </button>
              <button
                onClick={() => inputOperation('*')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                ×
              </button>

              {/* Row 2 */}
              <button
                onClick={() => inputNumber('7')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                7
              </button>
              <button
                onClick={() => inputNumber('8')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                8
              </button>
              <button
                onClick={() => inputNumber('9')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                9
              </button>
              <button
                onClick={() => inputOperation('-')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                −
              </button>

              {/* Row 3 */}
              <button
                onClick={() => inputNumber('4')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                4
              </button>
              <button
                onClick={() => inputNumber('5')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                5
              </button>
              <button
                onClick={() => inputNumber('6')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                6
              </button>
              <button
                onClick={() => inputOperation('+')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                +
              </button>

              {/* Row 4 */}
              <button
                onClick={() => inputNumber('1')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                1
              </button>
              <button
                onClick={() => inputNumber('2')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                2
              </button>
              <button
                onClick={() => inputNumber('3')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                3
              </button>
              <button
                onClick={performCalculation}
                className="row-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors text-xl"
              >
                =
              </button>

              {/* Row 5 */}
              <button
                onClick={() => inputNumber('0')}
                className="col-span-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                0
              </button>
              <button
                onClick={inputDecimal}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-lg transition-colors text-xl"
              >
                .
              </button>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Compétences démontrées :
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Gestion d'état complexe avec React hooks</li>
              <li>• Logique métier et algorithmes</li>
              <li>• Interface utilisateur interactive</li>
              <li>• Gestion des événements utilisateur</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}








