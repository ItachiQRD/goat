import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services - Développement web sur-mesure',
  description:
    "Sites vitrines, e-commerce, applications web, design UX/UI, SEO, hébergement. Solutions adaptées à tous les budgets.",
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
