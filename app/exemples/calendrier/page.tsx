'use client'

import { useMemo, useState } from 'react'
import { Calendar as CalIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: Date
  time: string
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function makeRelativeEvents(): Event[] {
  const today = startOfDay(new Date())
  return [
    {
      id: 1,
      title: 'Appel découverte',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      time: '10:00',
    },
    {
      id: 2,
      title: 'Revue des maquettes',
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
      time: '14:30',
    },
    {
      id: 3,
      title: 'Point d’avancement',
      date: today,
      time: '09:00',
    },
  ]
}

export default function Calendrier() {
  const [currentDate, setCurrentDate] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => startOfDay(new Date()))
  const [events, setEvents] = useState<Event[]>(makeRelativeEvents)
  const [draftTitle, setDraftTitle] = useState('')
  const [draftTime, setDraftTime] = useState('10:00')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ]
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

  const days = useMemo(() => {
    const list: (number | null)[] = []
    for (let i = 0; i < firstDayOfWeek; i++) list.push(null)
    for (let day = 1; day <= daysInMonth; day++) list.push(day)
    return list
  }, [firstDayOfWeek, daysInMonth])

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  const eventsOnDay = (day: number) =>
    events.filter((event) => {
      const d = new Date(event.date)
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year
    })

  const selectedEvents = selectedDate
    ? events.filter((event) => {
        const d = new Date(event.date)
        return (
          d.getDate() === selectedDate.getDate() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getFullYear() === selectedDate.getFullYear()
        )
      })
    : []

  const addEvent = () => {
    if (!selectedDate || !draftTitle.trim()) return
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: draftTitle.trim(),
        date: startOfDay(selectedDate),
        time: draftTime,
      },
    ])
    setDraftTitle('')
  }

  return (
    <div className="min-h-screen bg-transparent pt-28 md:pt-32 pb-20 px-5 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <CalIcon className="w-10 h-10 text-[#8b5cf6] mx-auto mb-4" aria-hidden="true" />
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
            Prise de rendez-vous
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base">
            Un client choisit un jour et pose un appel dans le mois
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-white"
                aria-label="Mois précédent"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <h2 className="text-xl md:text-2xl font-light text-white">
                {monthNames[month]} {year}
              </h2>
              <button
                type="button"
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-white"
                aria-label="Mois suivant"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-3">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-white/45 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (day === null) return <div key={`e-${index}`} className="aspect-square" />
                const isSelected =
                  selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === month &&
                  selectedDate?.getFullYear() === year
                const hasEvt = eventsOnDay(day).length > 0
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    aria-label={`${day} ${monthNames[month]} ${year}${hasEvt ? ', avec événements' : ''}`}
                    aria-pressed={isSelected}
                    className={`aspect-square rounded-xl border transition-all text-sm ${
                      isToday(day)
                        ? 'bg-[#8b5cf6] text-white border-[#a78bfa] font-medium'
                        : isSelected
                          ? 'bg-white/10 border-[#8b5cf6] text-white'
                          : hasEvt
                            ? 'border-[#8b5cf6]/40 bg-[#8b5cf6]/10 text-white hover:bg-[#8b5cf6]/20'
                            : 'border-white/10 text-white/80 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div>{day}</div>
                    {hasEvt && (
                      <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1" aria-hidden="true" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                <CalIcon className="w-5 h-5 text-[#8b5cf6]" aria-hidden="true" />
                Événements
              </h3>
              {selectedDate ? (
                <>
                  <p className="text-sm text-white/50 mb-4 capitalize">
                    {selectedDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <div className="space-y-2 mb-5">
                    {selectedEvents.length > 0 ? (
                      selectedEvents.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-xl border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 p-3"
                        >
                          <div className="font-medium text-white text-sm">{event.title}</div>
                          <div className="text-xs text-white/50 mt-0.5">{event.time}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-white/40 text-sm">Aucun événement</p>
                    )}
                  </div>

                  <div className="space-y-2 border-t border-white/10 pt-4">
                    <label className="block text-xs text-white/50" htmlFor="event-title">
                      Nouvel événement
                    </label>
                    <input
                      id="event-title"
                      type="text"
                      value={draftTitle}
                      onChange={(e) => setDraftTitle(e.target.value)}
                      placeholder="Motif du rendez-vous"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/40"
                    />
                    <input
                      type="time"
                      value={draftTime}
                      onChange={(e) => setDraftTime(e.target.value)}
                      aria-label="Heure de l'événement"
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/40"
                    />
                    <button
                      type="button"
                      onClick={addEvent}
                      disabled={!draftTitle.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#8b5cf6] text-white text-sm font-medium hover:bg-[#7c3aed] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      Ajouter
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-white/40 text-sm">Sélectionnez une date</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-sm font-medium text-white mb-2">Compétences démontrées</h2>
          <ul className="text-sm text-white/55 font-light space-y-1">
            <li>• Navigation calendaire et calcul de dates</li>
            <li>• Ajout d&apos;événements liés à une date</li>
            <li>• Affichage conditionnel et interactions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
