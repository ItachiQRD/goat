'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'

export interface SiteSelectOption {
  value: string
  label: string
}

interface SiteSelectProps {
  name: string
  value: string
  options: SiteSelectOption[]
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  id?: string
  accent?: 'blue' | 'emerald'
}

export default function SiteSelect({
  name,
  value,
  options,
  onChange,
  placeholder = 'Sélectionnez…',
  required = false,
  id,
  accent = 'blue',
}: SiteSelectProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [invalid, setInvalid] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const selected = options.find((option) => option.value === value)
  const ring = accent === 'emerald' ? 'focus:ring-emerald-500/40' : 'focus:ring-[#3b82f6]/50'
  const mark = accent === 'emerald' ? 'text-emerald-300' : 'text-[#93c5fd]'

  useEffect(() => {
    if (!open) return
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (next: string) => {
    onChange(next)
    setInvalid(false)
    setOpen(false)
  }

  const onTriggerKey = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
      const index = Math.max(0, options.findIndex((option) => option.value === value))
      setActive(index)
    }
  }

  const onListKey = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((current) => Math.min(options.length - 1, current + 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((current) => Math.max(0, current - 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const option = options[active]
      if (option) choose(option.value)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input
        type="text"
        name={name}
        value={value}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        onChange={() => {}}
        onInvalid={(event) => {
          event.preventDefault()
          setInvalid(true)
          setOpen(true)
        }}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onTriggerKey}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white/[0.04] px-4 py-3 text-left transition-all hover:border-white/20 focus:outline-none focus:ring-2 ${ring} ${
          invalid ? 'border-red-400/70' : 'border-white/10'
        }`}
      >
        <span className={selected ? 'text-white' : 'text-white/35'}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-white/50 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          onKeyDown={onListKey}
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/15 bg-[#12141c] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value
            return (
              <li key={option.value || option.label} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(option.value)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    index === active || isSelected
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/75 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className={`h-4 w-4 flex-shrink-0 ${mark}`} aria-hidden="true" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
