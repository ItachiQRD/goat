import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - Discutons de votre projet',
  description:
    "Échange gratuit pour comprendre vos besoins. Réponse sous 24h. Conformité RGPD.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
