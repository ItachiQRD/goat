import { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description:
    "Conditions générales de vente : prestations, devis, paiement, délais, propriété intellectuelle, garanties.",
  robots: { index: true, follow: true },
}

export default function CGV() {
  const { legal, contact, brand, rgpd } = siteConfig

  return (
    <LegalLayout
      title="Conditions Générales de Vente"
      subtitle="Les présentes CGV régissent les prestations de services de développement et conseil web fournies par l'éditeur du site."
      lastUpdate={rgpd.lastUpdate}
    >
      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes Conditions Générales de Vente (« CGV ») ont pour objet de définir
        les modalités de prestation de services de développement web, conseil et
        maintenance proposés par <strong>{legal.ownerName}</strong> ({legal.ownerStatus}),
        ci-après dénommé « le Prestataire ».
      </p>
      <p>
        Toute commande implique l'acceptation sans réserve des présentes CGV par le client
        (ci-après « le Client »). Elles prévalent sur toute autre condition générale ou
        particulière non expressément agréée par le Prestataire.
      </p>

      <h2>Article 2 — Prestations</h2>
      <p>Le Prestataire propose les prestations suivantes (liste non exhaustive)&nbsp;:</p>
      <ul>
        <li>Création de sites internet (vitrine, e-commerce, sur-mesure)</li>
        <li>Développement d'applications web</li>
        <li>Conseil en stratégie digitale, UX/UI design</li>
        <li>Optimisation SEO et performances</li>
        <li>Maintenance, hébergement et support</li>
      </ul>
      <p>
        Le détail précis des prestations est défini dans le devis accepté par le Client.
      </p>

      <h2>Article 3 — Devis et commande</h2>
      <p>
        Toute prestation fait l'objet d'un <strong>devis détaillé et gratuit</strong> remis
        au Client. Le devis précise&nbsp;:
      </p>
      <ul>
        <li>La nature et le détail des prestations</li>
        <li>Le prix HT et TTC</li>
        <li>Les délais de réalisation</li>
        <li>Les modalités de paiement</li>
        <li>La durée de validité du devis (par défaut 30 jours)</li>
      </ul>
      <p>
        La commande est ferme et définitive à compter de la réception du devis signé
        accompagné de l'acompte demandé.
      </p>

      <h2>Article 4 — Tarifs</h2>
      <p>
        Les prix sont indiqués en euros, hors taxes et toutes taxes comprises. Le Prestataire
        applique la TVA en vigueur au jour de la facturation, ou bénéficie de la franchise
        en base de TVA selon son statut (mention « TVA non applicable, art. 293 B du CGI »
        le cas échéant).
      </p>
      <p>
        Les tarifs peuvent être révisés sans préavis, sans toutefois affecter les devis
        déjà acceptés.
      </p>

      <h2>Article 5 — Modalités de paiement</h2>
      <p>Sauf accord particulier, le règlement s'effectue selon l'échéancier suivant&nbsp;:</p>
      <ul>
        <li><strong>30%</strong> à la signature du devis (acompte)</li>
        <li><strong>40%</strong> à mi-projet ou à validation des maquettes</li>
        <li><strong>30%</strong> à la livraison finale</li>
      </ul>
      <p>
        Pour les forfaits mensuels, la facturation est mensuelle, à terme à échoir.
      </p>
      <p>
        Le règlement s'effectue par virement bancaire (RIB fourni sur facture).
        Le délai de paiement est de <strong>30 jours fin de mois</strong> à compter de la
        date d'émission de la facture.
      </p>
      <h3>Pénalités de retard</h3>
      <p>
        Conformément à l'article L441-10 du Code de commerce, tout retard de paiement
        entraîne&nbsp;:
      </p>
      <ul>
        <li>Des pénalités calculées sur la base de 3 fois le taux d'intérêt légal</li>
        <li>Une indemnité forfaitaire pour frais de recouvrement de <strong>40 €</strong></li>
      </ul>

      <h2>Article 6 — Délais de livraison</h2>
      <p>
        Les délais de livraison sont indiqués dans le devis. Ils courent à compter de la
        réception de l'acompte et de l'ensemble des éléments nécessaires fournis par le
        Client (textes, images, accès, etc.).
      </p>
      <p>
        Tout retard du Client dans la transmission des éléments entraîne un report
        proportionnel des délais. Les retards ne peuvent en aucun cas justifier
        l'annulation de la commande ou le versement de dommages et intérêts.
      </p>

      <h2>Article 7 — Obligations du Client</h2>
      <p>Le Client s'engage à&nbsp;:</p>
      <ul>
        <li>Fournir tous les éléments nécessaires à la bonne exécution de la prestation</li>
        <li>Disposer des droits sur les contenus fournis (textes, images, marques)</li>
        <li>Respecter les délais de validation et de retour</li>
        <li>Régler les sommes dues aux échéances convenues</li>
        <li>Désigner un interlocuteur unique pour le projet</li>
      </ul>

      <h2>Article 8 — Obligations du Prestataire</h2>
      <p>
        Le Prestataire s'engage à mettre en œuvre tous les moyens nécessaires à la bonne
        exécution de sa mission, dans les règles de l'art. Il s'agit d'une obligation de
        moyens et non de résultat.
      </p>

      <h2>Article 9 — Modifications du projet</h2>
      <p>
        Toute modification du périmètre du projet en cours de réalisation (ajout de
        fonctionnalités, refonte d'éléments validés) fait l'objet d'un avenant au devis
        initial, accompagné d'un complément tarifaire et d'une révision éventuelle des
        délais.
      </p>

      <h2>Article 10 — Propriété intellectuelle</h2>
      <p>
        À <strong>réception du paiement intégral</strong>, le Client devient propriétaire
        des livrables finaux (code source, design, contenu produit) à l'exception&nbsp;:
      </p>
      <ul>
        <li>Des bibliothèques et frameworks open source utilisés (selon leurs licences)</li>
        <li>Des éléments tiers (polices, photographies sous licence) qui restent la
        propriété de leurs auteurs</li>
        <li>Du savoir-faire et des méthodes du Prestataire, qui restent sa propriété</li>
      </ul>
      <p>
        Le Prestataire conserve le droit de mentionner le projet dans ses références
        commerciales (portfolio, réseaux sociaux), sauf demande expresse contraire du Client.
      </p>

      <h2>Article 11 — Garantie</h2>
      <p>
        Le Prestataire garantit le bon fonctionnement des livrables pendant une période de
        <strong> 30 jours</strong> à compter de la livraison finale. Cette garantie couvre
        la correction gratuite des bugs liés au développement, à l'exclusion&nbsp;:
      </p>
      <ul>
        <li>Des modifications réalisées par le Client ou un tiers</li>
        <li>Des dysfonctionnements liés à l'environnement technique du Client</li>
        <li>Des évolutions et nouvelles fonctionnalités</li>
        <li>Des problèmes liés à des prestataires tiers (hébergeur, API, etc.)</li>
      </ul>

      <h2>Article 12 — Responsabilité</h2>
      <p>
        La responsabilité du Prestataire est limitée au montant de la prestation concernée.
        Il ne saurait être tenu responsable des dommages indirects (perte de chiffre
        d'affaires, perte de données, etc.).
      </p>
      <p>
        Le Prestataire ne pourra être tenu responsable en cas de force majeure, de faute
        du Client, ou de dysfonctionnement de prestataires tiers.
      </p>

      <h2>Article 13 — Résiliation</h2>
      <p>
        En cas de manquement grave de l'une des parties à ses obligations, l'autre partie
        peut résilier le contrat après mise en demeure restée sans effet pendant 15 jours.
      </p>
      <p>
        En cas de résiliation à l'initiative du Client, les sommes correspondant au travail
        déjà réalisé restent dues.
      </p>

      <h2>Article 14 — Confidentialité</h2>
      <p>
        Chaque partie s'engage à conserver confidentielles toutes les informations à
        caractère technique, commercial ou stratégique reçues dans le cadre de la mission,
        et ce pendant toute la durée du contrat et 3 ans après son terme.
      </p>

      <h2>Article 15 — Données personnelles</h2>
      <p>
        Le traitement des données personnelles est régi par notre{' '}
        <a href="/politique-confidentialite">Politique de confidentialité</a>, conforme au
        RGPD.
      </p>

      <h2>Article 16 — Médiation et litiges</h2>
      <p>
        En cas de litige, les parties s'engagent à rechercher une solution amiable avant
        toute action judiciaire.
      </p>
      <p>
        Conformément à l'article L.616-1 du Code de la consommation, le Client consommateur
        peut recourir à un médiateur de la consommation. À défaut de règlement amiable, les
        tribunaux français seront seuls compétents.
      </p>

      <h2>Article 17 — Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. Toute clause contraire sera
        réputée non écrite.
      </p>

      <h2>Article 18 — Contact</h2>
      <p>
        Pour toute question relative aux présentes CGV&nbsp;:{' '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>

      <p style={{ marginTop: '2rem', opacity: 0.5, fontSize: '0.85em' }}>
        Site&nbsp;: {brand.url}
      </p>
    </LegalLayout>
  )
}
