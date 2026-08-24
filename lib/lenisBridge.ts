import type Lenis from 'lenis'

type LenisWindow = Window & { __goatLenis?: Lenis }

/** Instance Lenis partagée (évite le conflit avec les types globaux du package lenis). */
export function getLenisInstance(): Lenis | undefined {
  if (typeof window === 'undefined') return undefined
  return (window as LenisWindow).__goatLenis
}

export function setLenisInstance(instance: Lenis | undefined): void {
  if (typeof window === 'undefined') return
  ;(window as LenisWindow).__goatLenis = instance
}

export function stopLenis(): void {
  getLenisInstance()?.stop()
}

export function startLenis(): void {
  getLenisInstance()?.start()
}
