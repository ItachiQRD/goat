import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tarification - Tarifs transparents',
  description:
    "Tarifs clairs : au temps passé, au forfait projet ou au forfait mensuel. Devis gratuit.",
}

export default function TarificationLayout({ children }: { children: React.ReactNode }) {
  return children
}
