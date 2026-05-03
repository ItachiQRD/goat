'use client'

import { useEffect, ReactNode } from 'react'

interface SmoothScrollProps {
  children: ReactNode
  className?: string
}

export default function SmoothScroll({ children, className = '' }: SmoothScrollProps) {
  useEffect(() => {
    // Smooth scroll behavior
    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault()
      
      const delta = e.deltaY
      const scrollAmount = delta * 0.5 // Réduire la vitesse de scroll
      
      window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
      })
    }

    // Activer le smooth scroll uniquement si l'utilisateur n'a pas désactivé les animations
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      window.addEventListener('wheel', smoothScroll, { passive: false })
    }

    return () => {
      if (!prefersReducedMotion) {
        window.removeEventListener('wheel', smoothScroll)
      }
    }
  }, [])

  return <div className={className}>{children}</div>
}
