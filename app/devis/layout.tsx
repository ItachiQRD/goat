import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulateur de devis gratuit',
  description:
    "Estimez le coût de votre projet web en quelques minutes grâce à notre simulateur conversationnel. Résultat instantané, sans engagement.",
}

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return children
}
