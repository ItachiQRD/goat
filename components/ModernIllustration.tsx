'use client'

import {
  Eye,
  Zap,
  Palette,
  Smartphone,
  BarChart3,
  Shield,
  ShoppingBag,
  Link2,
} from 'lucide-react'

interface ModernIllustrationProps {
  type: 'visibility' | 'speed' | 'design' | 'mobile' | 'analytics' | 'security' | 'shop' | 'connect'
  className?: string
}

const CONFIG: Record<
  ModernIllustrationProps['type'],
  { icon: typeof Eye; from: string; to: string; label: string }
> = {
  visibility: {
    icon: Eye,
    from: 'from-blue-500/25',
    to: 'to-purple-500/20',
    label: 'Visibilité',
  },
  speed: {
    icon: Zap,
    from: 'from-amber-500/25',
    to: 'to-orange-500/20',
    label: 'Performance',
  },
  design: {
    icon: Palette,
    from: 'from-pink-500/25',
    to: 'to-violet-500/20',
    label: 'Design',
  },
  mobile: {
    icon: Smartphone,
    from: 'from-cyan-500/25',
    to: 'to-blue-500/20',
    label: 'Mobile',
  },
  analytics: {
    icon: BarChart3,
    from: 'from-emerald-500/25',
    to: 'to-teal-500/20',
    label: 'Analytics',
  },
  security: {
    icon: Shield,
    from: 'from-slate-400/25',
    to: 'to-blue-500/20',
    label: 'Sécurité',
  },
  shop: {
    icon: ShoppingBag,
    from: 'from-orange-500/25',
    to: 'to-rose-500/20',
    label: 'E-commerce',
  },
  connect: {
    icon: Link2,
    from: 'from-indigo-500/25',
    to: 'to-purple-500/20',
    label: 'Connexion',
  },
}

/** Illustration légère (CSS only) — remplace les dizaines d'animations Framer infinies. */
export default function ModernIllustration({ type, className = '' }: ModernIllustrationProps) {
  const cfg = CONFIG[type]
  const Icon = cfg.icon

  return (
    <div
      className={`relative w-full h-full min-h-[140px] flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
      aria-hidden="true"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${cfg.from} ${cfg.to}`} />
      <div className="absolute inset-[18%] rounded-full border border-white/10" />
      <div className="absolute inset-[32%] rounded-full border border-white/15" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] text-white shadow-[0_0_40px_rgba(59,130,246,0.25)]">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <span className="sr-only">{cfg.label}</span>
    </div>
  )
}
