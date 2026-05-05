import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Réalisations',
  description:
    "Sélection de mes récentes réalisations : sites vitrines, applications web, e-commerce. Chaque projet est unique.",
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
