import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.brand.url
  const now = new Date()

  const routes = [
    { path: '/', priority: 1.0, freq: 'weekly' as const },
    { path: '/services', priority: 0.9, freq: 'monthly' as const },
    { path: '/tarification', priority: 0.8, freq: 'monthly' as const },
    { path: '/portfolio', priority: 0.8, freq: 'monthly' as const },
    { path: '/contact', priority: 0.7, freq: 'monthly' as const },
    { path: '/exemples', priority: 0.5, freq: 'monthly' as const },
    { path: '/mentions-legales', priority: 0.3, freq: 'yearly' as const },
    { path: '/politique-confidentialite', priority: 0.3, freq: 'yearly' as const },
    { path: '/cgv', priority: 0.3, freq: 'yearly' as const },
  ]

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }))
}
