import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

const TO = process.env.CONTACT_TO || 'contact@eq-dev.fr'
const PROJECTS: Record<string, string> = {
  vitrine: 'Site vitrine',
  ecommerce: 'E-commerce',
  webapp: 'Application web',
  refonte: 'Refonte de site',
  seo: 'SEO / Performance',
  autre: 'Autre',
}
const BUDGETS: Record<string, string> = {
  '<2k': 'Moins de 2 000 €',
  '2k-5k': '2 000 € – 5 000 €',
  '5k-10k': '5 000 € – 10 000 €',
  '10k+': 'Plus de 10 000 €',
  undecided: 'Pas encore défini',
}

const hits = new Map<string, number[]>()

function clean(value: unknown, max: number) {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max)
}

function limited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000)
  if (recent.length >= 5) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  return false
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (body.consent !== true) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (limited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 })
  }

  const name = clean(body.name, 80)
  const email = clean(body.email, 120)
  const phone = clean(body.phone, 30)
  const projectType = PROJECTS[clean(body.projectType, 20)] || ''
  const budget = BUDGETS[clean(body.budget, 20)] || 'Non précisé'
  const message = String(body.message ?? '').trim().slice(0, 4000)

  if (name.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !projectType) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '')
  if (!user || !pass) {
    return NextResponse.json({ ok: false, reason: 'config' }, { status: 503 })
  }

  const port = Number(process.env.SMTP_PORT || 465)
  const configuredHost = process.env.SMTP_HOST || ''
  const host = /outlook|office365/i.test(configuredHost) || !configuredHost ? 'smtp.gmail.com' : configuredHost
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    tls: { minVersion: 'TLSv1.2' },
  })

  const text = [
    `Nom : ${name}`,
    `Email : ${email}`,
    `Téléphone : ${phone || 'Non renseigné'}`,
    `Type de projet : ${projectType}`,
    `Budget estimé : ${budget}`,
    '',
    message,
  ].join('\n')

  try {
    await transporter.sendMail({
      from: user,
      to: TO,
      replyTo: email,
      subject: `[Site] ${projectType} — ${name}`,
      text,
    })
  } catch (error) {
    const detail = error instanceof Error ? error.message : ''
    console.error('contact mail failed', detail)
    const auth = /535|534|authenti/i.test(detail)
    return NextResponse.json({ ok: false, reason: auth ? 'auth' : 'send' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
