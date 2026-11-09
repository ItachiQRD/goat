'use client'

/**
 * Visuel du hero sous 1280 px. La vidéo 16:9 reste réservée au bureau.
 */
export default function HeroCompact() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-14 bottom-36 z-[4] flex items-center justify-center px-4 md:top-16 md:bottom-40 xl:hidden">
      <svg
        className="hero-mark h-[min(58vh,480px)] w-auto max-w-[96vw]"
        viewBox="0 0 480 520"
        fill="none"
        role="img"
        aria-label="EQ DEV"
      >
        <defs>
          <radialGradient id="hm-glow" cx="0.5" cy="0.48" r="0.5">
            <stop stopColor="#2dd4bf" stopOpacity="0.34" />
            <stop offset="0.55" stopColor="#0891b2" stopOpacity="0.08" />
            <stop offset="1" stopColor="#0891b2" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hm-arc" x1="80" y1="40" x2="420" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#99f6e4" />
            <stop offset="0.5" stopColor="#22d3ee" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>
        </defs>

        <ellipse className="hm-glow" cx="240" cy="258" rx="200" ry="180" fill="url(#hm-glow)" />

        <circle className="hm-ring" cx="240" cy="258" r="196" stroke="url(#hm-arc)" strokeWidth="1.25" strokeOpacity="0.45" />

        <g className="hm-orbit">
          <circle cx="240" cy="258" r="214" stroke="#67e8f9" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="2 11" />
          <circle cx="240" cy="44" r="5" fill="#99f6e4" />
          <circle cx="430" cy="340" r="3.2" fill="#22d3ee" />
          <circle cx="70" cy="360" r="3.6" fill="#5eead4" />
        </g>

        <g className="hm-orbit hm-orbit-reverse">
          <circle cx="240" cy="258" r="168" stroke="#a5f3fc" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="18 16" />
          <circle cx="240" cy="90" r="3" fill="#ecfeff" />
        </g>

        <image
          className="hm-mark"
          href="/logo.png"
          x="58"
          y="148"
          width="364"
          height="248"
        />
      </svg>
    </div>
  )
}
