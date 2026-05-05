import { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    "Mentions légales du site : éditeur, hébergement, propriété intellectuelle, responsabilités.",
  robots: { index: true, follow: true },
}

export default function MentionsLegales() {
  const { legal, contact, brand, rgpd } = siteConfig

  return (
    <LegalLayout
      title="Mentions légales"
      subtitle="Informations légales obligatoires conformément à l'article 6 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN)."
      lastUpdate={rgpd.lastUpdate}
    >
      <h2>1. Éditeur du site</h2>
      <p>Le site <strong>{brand.url}</strong> est édité par&nbsp;:</p>
      <ul>
        <li><strong>Nom / Raison sociale&nbsp;:</strong> {legal.ownerName}</li>
        <li><strong>Statut juridique&nbsp;:</strong> {legal.ownerStatus}</li>
        <li><strong>Adresse&nbsp;:</strong> {legal.address}, {legal.postalCode} {legal.city}, {legal.country}</li>
        <li><strong>SIRET&nbsp;:</strong> {legal.siret}</li>
        <li><strong>SIREN&nbsp;:</strong> {legal.siren}</li>
        <li><strong>RCS&nbsp;:</strong> {legal.rcs}</li>
        <li><strong>N° TVA intracommunautaire&nbsp;:</strong> {legal.tvaIntracom}</li>
        <li><strong>Code APE/NAF&nbsp;:</strong> {legal.apeNaf}</li>
        <li>
          <strong>Email&nbsp;:</strong>{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <strong>Téléphone&nbsp;:</strong>{' '}
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        </li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>{legal.publicationDirector}</p>

      <h2>3. Hébergement</h2>
      <p>Le site est hébergé par&nbsp;:</p>
      <ul>
        <li><strong>{legal.hosting.name}</strong></li>
        <li>{legal.hosting.address}</li>
        <li>{legal.hosting.city}, {legal.hosting.country}</li>
        <li>
          Site web&nbsp;:{' '}
          <a href={legal.hosting.website} target="_blank" rel="noopener noreferrer">
            {legal.hosting.website}
          </a>
        </li>
      </ul>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L'ensemble du contenu de ce site (structure, textes, images, vidéos, logos,
        graphismes, code source) est la propriété exclusive de {legal.ownerName} ou
        de ses partenaires et est protégé par le droit français et international relatif
        à la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication ou adaptation, totale
        ou partielle, des éléments du site, quel que soit le moyen ou le procédé utilisé,
        est interdite sans l'autorisation écrite préalable de l'éditeur.
      </p>

      <h2>5. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers des sites tiers. {legal.ownerName} n'exerce
        aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu
        ou leur disponibilité.
      </p>
      <p>
        La création d'un lien vers ce site est autorisée sous réserve qu'il n'altère pas
        le contenu et qu'il soit clairement identifié comme tel. L'éditeur se réserve
        le droit de demander la suppression d'un lien jugé non conforme.
      </p>

      <h2>6. Responsabilité</h2>
      <p>
        L'éditeur s'efforce de fournir des informations exactes et à jour sur ce site,
        mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations
        diffusées. L'utilisateur est seul responsable de l'usage qu'il fait des informations
        consultées.
      </p>
      <p>
        L'éditeur ne pourra être tenu responsable des dommages directs ou indirects résultant
        de l'utilisation du site ou de l'impossibilité d'y accéder.
      </p>

      <h2>7. Données personnelles et cookies</h2>
      <p>
        Pour toute information sur la collecte et le traitement de vos données personnelles
        ainsi que sur l'utilisation de cookies, veuillez consulter notre{' '}
        <a href="/politique-confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>8. Droit applicable et juridiction</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas de litige,
        et après tentative de résolution amiable, les tribunaux français seront seuls
        compétents.
      </p>

      <h2>9. Contact</h2>
      <p>
        Pour toute question relative aux présentes mentions légales, vous pouvez nous
        contacter à l'adresse suivante&nbsp;:{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </LegalLayout>
  )
}
