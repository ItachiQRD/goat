'use client'

interface ParallaxBackgroundProps {
  children?: React.ReactNode
  speed?: number
  className?: string
}

/** Conteneur décoratif fixe — le parallax scroll a été retiré pour la fluidité. */
export default function ParallaxBackground({
  children,
  className = '',
}: ParallaxBackgroundProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {children}
    </div>
  )
}
