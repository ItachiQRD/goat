'use client'

import { useState } from 'react'
import { Calendar as CalIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: Date
  time: string
}

export default function Calendrier() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([
    { id: 1, title: 'Réunion équipe', date: new Date(2024, 0, 15), time: '10:00' },
    { id: 2, title: 'Présentation client', date: new Date(2024, 0, 20), time: '14:30' },
  ])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]

  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isToday = (day: number) => {
    const today = new Date()
    return day === today.getDate() &&
           month === today.getMonth() &&
           year === today.getFullYear()
  }

  const hasEvent = (day: number) => {
    return events.some(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year
    })
  }

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day &&
             eventDate.getMonth() === month &&
             eventDate.getFullYear() === year
    })
  }

  const days = []
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <CalIcon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calendrier Interactif
          </h1>
          <p className="text-gray-600">
            Gestion d'événements et planification avec calendrier interactif
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendrier */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={index} className="aspect-square" />
                }
                const isSelected = selectedDate?.getDate() === day &&
                                  selectedDate?.getMonth() === month &&
                                  selectedDate?.getFullYear() === year
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    className={`aspect-square rounded-lg border-2 transition-all ${
                      isToday(day)
                        ? 'bg-indigo-600 text-white border-indigo-700 font-bold'
                        : isSelected
                        ? 'bg-indigo-100 border-indigo-600'
                        : hasEvent(day)
                        ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm">{day}</div>
                    {hasEvent(day) && (
                      <div className="w-1 h-1 bg-indigo-600 rounded-full mx-auto mt-1" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Événements */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CalIcon className="w-5 h-5 text-indigo-600" />
                Événements
              </h3>
              {selectedDate ? (
                <div>
                  <div className="text-sm text-gray-600 mb-4">
                    {selectedDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="space-y-2">
                    {getEventsForDate(selectedDate.getDate()).length > 0 ? (
                      getEventsForDate(selectedDate.getDate()).map(event => (
                        <div
                          key={event.id}
                          className="bg-indigo-50 border border-indigo-200 rounded-lg p-3"
                        >
                          <div className="font-semibold text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-600">{event.time}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">Aucun événement</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">
                  Sélectionnez une date pour voir les événements
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            Compétences démontrées :
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Navigation de calendrier (mois précédent/suivant)</li>
            <li>• Gestion de dates et calculs calendaires</li>
            <li>• Affichage conditionnel et interactions</li>
            <li>• Gestion d'événements</li>
            <li>• Interface utilisateur intuitive</li>
          </ul>
        </div>
      </div>
    </div>
  )
}








