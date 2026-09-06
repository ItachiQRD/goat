import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulateur de devis gratuit',
  description:
    "Estimez le coût de votre projet web en quelques minutes. Résultat instantané.",
}

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return children
}
