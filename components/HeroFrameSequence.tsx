'use client'

import { useEffect, useRef } from 'react'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'

const FRAME_COUNT = 209

function frameSrc(index: number) {
  const n = String(Math.min(FRAME_COUNT, Math.max(1, index))).padStart(3, '0')
  return `/hero-frames/ezgif-frame-${n}.jpg`
}

interface HeroFrameSequenceProps {
  progress: MotionValue<number>
  autoplay: boolean
  className?: string
  onReady?: () => void
}

export default function HeroFrameSequence({
  progress,
  autoplay,
  className = '',
  onReady,
}: HeroFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>([])
  const loadedCount = useRef(0)
  const currentFrame = useRef(1)
  const readyRef = useRef(false)
  const rafRef = useRef(0)
  const autoplayRef = useRef(autoplay)

  autoplayRef.current = autoplay

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = framesRef.current[index - 1]
    if (!img?.complete || !img.naturalWidth) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (w === 0 || h === 0) return

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = '#0a0a0a'
    ctx.fillRect(0, 0, w, h)

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
    const dw = img.naturalWidth * scale
    const dh = img.naturalHeight * scale
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
    currentFrame.current = index
  }

  useEffect(() => {
    let cancelled = false
    framesRef.current = Array.from({ length: FRAME_COUNT }, () => null)
    loadedCount.current = 0
    readyRef.current = false

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          if (cancelled) return resolve()
          framesRef.current[i - 1] = img
          loadedCount.current += 1
          if (i === 1) drawFrame(1)
          if (loadedCount.current >= 12 && !readyRef.current) {
            readyRef.current = true
            onReady?.()
          }
          resolve()
        }
        img.onerror = () => resolve()
        img.src = frameSrc(i)
      })

    ;(async () => {
      for (let i = 1; i <= 16; i++) {
        if (cancelled) return
        await loadOne(i)
      }
      const batch = 12
      for (let start = 17; start <= FRAME_COUNT; start += batch) {
        if (cancelled) return
        const end = Math.min(start + batch - 1, FRAME_COUNT)
        await Promise.all(
          Array.from({ length: end - start + 1 }, (_, k) => loadOne(start + k))
        )
      }
      if (!cancelled && !readyRef.current) {
        readyRef.current = true
        onReady?.()
      }
    })()

    const onResize = () => drawFrame(currentFrame.current)
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [onReady])

  useEffect(() => {
    let last = performance.now()
    const fps = 24
    const tick = (now: number) => {
      rafRef.current = requestAnimationFrame(tick)
      if (!autoplayRef.current) return
      if (loadedCount.current < 8) return
      if (now - last < 1000 / fps) return
      last = now
      const next = currentFrame.current >= FRAME_COUNT ? 1 : currentFrame.current + 1
      if (framesRef.current[next - 1]) drawFrame(next)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useMotionValueEvent(progress, 'change', (v) => {
    if (autoplayRef.current) return
    if (loadedCount.current < 4) return
    const idx = Math.round(1 + Math.min(1, Math.max(0, v)) * (FRAME_COUNT - 1))
    if (idx !== currentFrame.current && framesRef.current[idx - 1]) {
      drawFrame(idx)
    }
  })

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
