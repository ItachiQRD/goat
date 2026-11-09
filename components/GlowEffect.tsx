interface GlowEffectProps {
  className?: string
  intensity?: number
  color?: string
}

/** Halo statique. Pas de flou animé ni de lien au scroll : ça restait coûteux au défilement. */
export default function GlowEffect({
  className = '',
  intensity = 1,
  color = 'rgba(59, 130, 246, 0.4)',
}: GlowEffectProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/3 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 68%)`,
          opacity: Math.min(intensity, 0.45),
        }}
      />
    </div>
  )
}
