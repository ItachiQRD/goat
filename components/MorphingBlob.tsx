'use client'

interface MorphingBlobProps {
  className?: string
  colors?: string[]
  size?: number
}

/** Blobs décoratifs statiques — plus d'animation continue. */
export default function MorphingBlob({
  className = '',
  colors = ['rgba(59, 130, 246, 0.14)', 'rgba(147, 51, 234, 0.14)'],
  size = 420,
}: MorphingBlobProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {colors.map((color, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            left: `${15 + index * 35}%`,
            top: `${15 + index * 25}%`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  )
}
