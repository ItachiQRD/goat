import { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité conforme RGPD : données collectées, finalités, durée de conservation, vos droits.",
  robots: { index: true, follow: true },
}

export default function PolitiqueConfidentialite() {
  const { legal, contact, brand, rgpd } = siteConfig

  return (
    <LegalLayout
      title="Politique de confidentialité"
      subtitle="Conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679) et à la loi Informatique et Libertés du 6 janvier 1978 modifiée."
      lastUpdate={rgpd.lastUpdate}
    >
      <h2>1. Préambule</h2>
      <p>
        La présente politique de confidentialité a pour objet d'informer les utilisateurs
        du site <strong>{brand.url}</strong> sur la manière dont leurs données personnelles
        sont collectées et traitées. Nous accordons une importance particulière à la
        protection de votre vie privée et de vos données.
      </p>

      <h2>2. Responsable du traitement</h2>
      <p>Le responsable du traitement des données est&nbsp;:</p>
      <ul>
        <li><strong>{legal.ownerName}</strong> ({legal.ownerStatus})</li>
        <li>{legal.address}, {legal.postalCode} {legal.city}</li>
        <li>SIRET&nbsp;: {legal.siret}</li>
        <li>
          Contact&nbsp;: <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          Délégué à la protection des données&nbsp;:{' '}
          <a href={`mailto:${rgpd.dpoEmail}`}>{rgpd.dpoEmail}</a>
        </li>
      </ul>

      <h2>3. Données collectées</h2>
      <h3>3.1 Données collectées via le formulaire de contact</h3>
      <p>Lorsque vous remplissez le formulaire de contact, nous collectons&nbsp;:</p>
      <ul>
        <li>Nom et prénom</li>
        <li>Adresse email</li>
        <li>Numéro de téléphone (facultatif)</li>
        <li>Type de projet et budget estimé</li>
        <li>Le contenu de votre message</li>
      </ul>

      <h3>3.2 Données techniques (collectées automatiquement)</h3>
      <ul>
        <li>Adresse IP (anonymisée)</li>
        <li>Type et version du navigateur</li>
        <li>Système d'exploitation</li>
        <li>Pages visitées et temps passé</li>
        <li>Référent (site d'où vous venez)</li>
      </ul>

      <h2>4. Finalités du traitement</h2>
      <p>Vos données sont collectées pour les finalités suivantes&nbsp;:</p>
      <ul>
        <li>
          <strong>Répondre à vos demandes de contact</strong> et établir une relation
          commerciale (base légale&nbsp;: exécution d'un contrat ou mesures précontractuelles).
        </li>
        <li>
          <strong>Gérer la relation client</strong> dans le cadre d'une éventuelle
          collaboration (base légale&nbsp;: exécution du contrat).
        </li>
        <li>
          <strong>Améliorer le site et nos services</strong> grâce à des statistiques
          anonymisées (base légale&nbsp;: votre consentement, retiré à tout moment via
          le bandeau cookies).
        </li>
        <li>
          <strong>Respecter nos obligations légales et comptables</strong>
          {' '}(base légale&nbsp;: obligation légale).
        </li>
      </ul>

      <h2>5. Durée de conservation</h2>
      <table>
        <thead>
          <tr>
            <th>Type de donnée</th>
            <th>Durée de conservation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demande de contact sans suite</td>
            <td>3 ans à compter du dernier contact</td>
          </tr>
          <tr>
            <td>Données client (en cas de prestation)</td>
            <td>Durée de la relation + 3 ans</td>
          </tr>
          <tr>
            <td>Données comptables / facturation</td>
            <td>10 ans (obligation légale)</td>
          </tr>
          <tr>
            <td>Cookies</td>
            <td>Maximum 13 mois</td>
          </tr>
          <tr>
            <td>Logs techniques</td>
            <td>12 mois maximum</td>
          </tr>
        </tbody>
      </table>

      <h2>6. Destinataires des données</h2>
      <p>
        Vos données sont strictement confidentielles et destinées uniquement à
        {' '}<strong>{legal.ownerName}</strong>. Elles ne sont jamais vendues ni cédées
        à des tiers à des fins commerciales.
      </p>
      <p>Elles peuvent toutefois être communiquées à&nbsp;:</p>
      <ul>
        <li>Notre hébergeur ({legal.hosting.name}) pour le stockage technique</li>
        <li>Notre prestataire d'envoi d'emails (le cas échéant)</li>
        <li>Les autorités administratives ou judiciaires sur réquisition légale</li>
      </ul>
      <p>
        Tous nos sous-traitants sont contractuellement engagés à respecter le RGPD et à
        garantir un niveau de sécurité approprié.
      </p>

      <h2>7. Transferts hors Union Européenne</h2>
      <p>
        Certains de nos prestataires techniques peuvent être situés hors UE. Dans ce cas,
        ces transferts sont encadrés par les <strong>Clauses Contractuelles Types</strong>
        {' '}de la Commission européenne ou par une décision d'adéquation, garantissant un
        niveau de protection équivalent au RGPD.
      </p>

      <h2>8. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants sur vos données&nbsp;:</p>
      <ul>
        <li><strong>Droit d'accès</strong> aux données que nous détenons sur vous</li>
        <li><strong>Droit de rectification</strong> en cas d'inexactitude</li>
        <li><strong>Droit à l'effacement</strong> ("droit à l'oubli")</li>
        <li><strong>Droit à la limitation</strong> du traitement</li>
        <li><strong>Droit à la portabilité</strong> de vos données</li>
        <li><strong>Droit d'opposition</strong> au traitement</li>
        <li><strong>Droit de retirer votre consentement</strong> à tout moment</li>
        <li>
          <strong>Droit de définir des directives</strong> sur le sort de vos données
          après votre décès
        </li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à l'adresse&nbsp;:{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. Nous vous répondrons dans
        un délai maximum d'un mois.
      </p>
      <p>
        En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès
        de la <strong>CNIL</strong>{' '}
        (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>).
      </p>

      <h2>9. Cookies</h2>
      <p>Notre site utilise différents types de cookies&nbsp;:</p>
      <h3>9.1 Cookies nécessaires (sans consentement)</h3>
      <p>
        Indispensables au fonctionnement du site. Ils mémorisent vos préférences
        techniques (consentement cookies, etc.). Ils ne peuvent être désactivés.
      </p>
      <h3>9.2 Cookies de mesure d'audience (avec consentement)</h3>
      <p>
        Permettent de comprendre comment les visiteurs utilisent le site (pages visitées,
        durée, source de trafic) afin de l'améliorer. Les données sont anonymisées.
      </p>
      <h3>9.3 Cookies marketing (avec consentement)</h3>
      <p>
        Utilisés pour personnaliser la publicité et mesurer son efficacité.
      </p>
      <h3>9.4 Gestion de votre consentement</h3>
      <p>
        Lors de votre première visite, un bandeau vous permet d'accepter, refuser ou
        personnaliser l'utilisation des cookies. Vous pouvez modifier vos choix à tout
        moment via le lien <strong>« Gérer les cookies »</strong> en bas de page.
      </p>
      <p>
        Vous pouvez également configurer votre navigateur pour bloquer les cookies&nbsp;:
        {' '}
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>,{' '}
        <a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener noreferrer">Firefox</a>,{' '}
        <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>,{' '}
        <a href="https://support.microsoft.com/fr-fr/microsoft-edge/" target="_blank" rel="noopener noreferrer">Edge</a>.
      </p>

      <h2>10. Sécurité des données</h2>
      <p>
        Nous mettons en œuvre toutes les mesures techniques et organisationnelles
        appropriées pour protéger vos données contre toute perte, accès non autorisé,
        divulgation ou destruction&nbsp;:
      </p>
      <ul>
        <li>Connexion HTTPS chiffrée (SSL/TLS)</li>
        <li>Hébergement sécurisé conforme aux standards de l'industrie</li>
        <li>Mots de passe robustes et accès restreint</li>
        <li>Mises à jour régulières de sécurité</li>
        <li>Sauvegardes régulières des données</li>
      </ul>

      <h2>11. Modification de la politique</h2>
      <p>
        La présente politique peut être mise à jour pour refléter des changements légaux
        ou techniques. La date de dernière mise à jour est indiquée en haut de cette page.
        Nous vous invitons à la consulter régulièrement.
      </p>

      <h2>12. Contact</h2>
      <p>
        Pour toute question concernant cette politique de confidentialité ou pour exercer
        vos droits&nbsp;:{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </LegalLayout>
  )
}
