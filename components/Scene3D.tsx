'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Import dynamique pour éviter les erreurs SSR
const Canvas3D = dynamic(() => import('./Canvas3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-white/60">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-sm">Chargement 3D...</div>
      </div>
    </div>
  ),
})

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-white/60">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-sm">Chargement 3D...</div>
          </div>
        </div>
      }>
        <Canvas3D />
      </Suspense>
    </div>
  )
}
