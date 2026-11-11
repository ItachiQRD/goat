'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { siteConfig, isPlaceholder } from '@/lib/siteConfig'
import SiteSelect from '@/components/SiteSelect'
import ScrollReveal from '@/components/ScrollReveal'
import GlowEffect from '@/components/GlowEffect'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const { contact } = siteConfig

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
    consent: false,
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorReason, setErrorReason] = useState<'config' | 'auth' | 'send' | ''>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.consent) return

    setStatus('submitting')
    setErrorReason('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message,
          consent: formData.consent,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setErrorReason(payload.reason === 'config' || payload.reason === 'auth' ? payload.reason : 'send')
        setStatus('error')
        return
      }

      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          message: '',
          consent: false,
        })
      }, 4000)
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6]/40 transition-all'

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 px-5 md:px-6 relative overflow-hidden">
      <GlowEffect intensity={0.4} color="rgba(59, 130, 246, 0.25)" />

      {/* Décoration radiale subtile */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08), transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* En-tête */}
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-4">
              Contact
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-light leading-[1.05] tracking-tight mb-5">
              Discutons de
              <span className="block bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ff6b35] bg-clip-text text-transparent mt-1">
                votre projet
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Échange gratuit. Décrivez votre projet, je vous réponds
              sous {contact.responseTime}.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Infos contact */}
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-4 md:space-y-5">
              {!isPlaceholder(contact.email) && (
                <ContactCard
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
              )}
              {!isPlaceholder(contact.phone) && (
                <ContactCard
                  icon={<Phone className="w-5 h-5" />}
                  label="Téléphone"
                  value={contact.phoneDisplay}
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                />
              )}
              <ContactCard
                icon={<MapPin className="w-5 h-5" />}
                label="Localisation"
                value={`${contact.location}${contact.remoteAvailable ? ' · Remote possible' : ''}`}
              />

              {/* Délai de réponse */}
              <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/60">
                    Disponible
                  </span>
                </div>
                <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
                  Je réponds sous <strong className="text-white">{contact.responseTime}</strong>.
                  Pour les demandes urgentes, mentionnez-le dans votre message.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Formulaire */}
          <ScrollReveal delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="relative p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10"
            >
              {/* Confirmation succès */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-200 flex items-center gap-3"
                  role="status"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">
                    Message envoyé. Je vous réponds sous {contact.responseTime}.
                  </span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 flex items-center gap-3"
                  role="alert"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">
                    {errorReason === 'config'
                      ? `L'envoi Outlook n'est pas activé sur le serveur. Écrivez à ${contact.email}.`
                      : errorReason === 'auth'
                        ? `Outlook a refusé la connexion. Il faut un mot de passe d'application, pas le mot de passe du compte.`
                        : `L'envoi n'a pas abouti. Réessayez, ou écrivez à ${contact.email}.`}
                  </span>
                </motion.div>
              )}

              <div className="space-y-4">
                {/* Nom + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Nom complet *">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Votre nom"
                      autoComplete="name"
                    />
                  </FormField>
                  <FormField label="Email *">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="vous@email.com"
                      autoComplete="email"
                    />
                  </FormField>
                </div>

                {/* Téléphone + Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Téléphone">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="06 12 34 56 78"
                      autoComplete="tel"
                    />
                  </FormField>
                  <FormField label="Type de projet *">
                    <SiteSelect
                      name="projectType"
                      required
                      value={formData.projectType}
                      placeholder="Sélectionnez..."
                      onChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
                      options={[
                        { value: 'vitrine', label: 'Site vitrine' },
                        { value: 'ecommerce', label: 'E-commerce' },
                        { value: 'webapp', label: 'Application web' },
                        { value: 'refonte', label: 'Refonte de site' },
                        { value: 'seo', label: 'SEO / Performance' },
                        { value: 'autre', label: 'Autre' },
                      ]}
                    />
                  </FormField>
                </div>

                {/* Budget */}
                <FormField label="Budget estimé (facultatif)">
                  <SiteSelect
                    name="budget"
                    value={formData.budget}
                    placeholder="Sélectionnez une fourchette"
                    onChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                    options={[
                      { value: '<2k', label: 'Moins de 2 000 €' },
                      { value: '2k-5k', label: '2 000 € - 5 000 €' },
                      { value: '5k-10k', label: '5 000 € - 10 000 €' },
                      { value: '10k+', label: 'Plus de 10 000 €' },
                      { value: 'undecided', label: 'Pas encore défini' },
                    ]}
                  />
                </FormField>

                {/* Message */}
                <FormField label="Message *">
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass + ' resize-none'}
                    placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
                  />
                </FormField>

                {/* Consentement RGPD */}
                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 accent-[#3b82f6] cursor-pointer flex-shrink-0"
                  />
                  <span className="text-xs text-white/60 leading-relaxed">
                    J'accepte que mes données soient traitées pour répondre à ma demande.
                    Conformément au RGPD, je dispose d'un droit d'accès, de rectification
                    et de suppression de mes données.{' '}
                    <Link
                      href="/politique-confidentialite"
                      className="text-[#60a5fa] underline underline-offset-2 hover:text-white transition-colors"
                    >
                      En savoir plus
                    </Link>
                  </span>
                </label>

                {/* Bouton */}
                <motion.button
                  type="submit"
                  disabled={!formData.consent || status === 'submitting'}
                  whileHover={formData.consent ? { scale: 1.01 } : {}}
                  whileTap={formData.consent ? { scale: 0.98 } : {}}
                  className="w-full mt-2 px-6 py-4 rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition-shadow"
                >
                  <Send className="w-4 h-4" />
                  {status === 'submitting' ? 'Envoi…' : 'Envoyer le message'}
                </motion.button>

                <p className="text-[11px] md:text-xs text-white/40 text-center pt-1">
                  * Champs obligatoires · Vos données ne sont jamais partagées.
                </p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

function FormField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <span className="block text-xs md:text-sm font-light text-white/70 mb-1.5">
        {label}
      </span>
      {children}
    </div>
  )
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#8b5cf6]/20 border border-white/10 flex items-center justify-center text-[#60a5fa] flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
          {label}
        </div>
        <div className="text-sm md:text-base text-white/90 font-light truncate">
          {value}
        </div>
      </div>
    </div>
  )

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}
