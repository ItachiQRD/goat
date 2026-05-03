# Portfolio Développeur Full Stack

Site web professionnel présentant mes services de développement full stack avec des exemples interactifs démontrant mes compétences.

## 🚀 Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling moderne et responsive
- **Framer Motion** - Animations (si nécessaire)
- **Lucide React** - Icônes

## 📁 Structure du projet

```
goat/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── services/              # Page des services
│   ├── portfolio/            # Portfolio de projets
│   ├── tarification/         # Explications sur les tarifs
│   ├── contact/              # Formulaire de contact
│   ├── exemples/             # Pages d'exemples interactifs
│   │   ├── calculateur/      # Calculateur démo
│   │   ├── gestion-donnees/  # CRUD démo
│   │   └── panier/           # Panier e-commerce démo
│   └── layout.tsx            # Layout principal
├── components/
│   ├── Header.tsx            # Navigation
│   └── Footer.tsx            # Pied de page
└── ...
```

## 🎯 Fonctionnalités

### Pages principales
- **Accueil** : Présentation des services et compétences
- **Services** : Détail des services proposés
- **Portfolio** : Projets réalisés avec filtres
- **Tarification** : Explications détaillées sur les modèles de tarification
- **Contact** : Formulaire de contact fonctionnel

### Pages d'exemples interactifs
- **Calculateur** : Démonstration de logique métier et gestion d'état
- **Gestion de données** : CRUD complet avec localStorage
- **Panier e-commerce** : Système de panier avec calculs automatiques

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Lancer en production
npm start
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Personnalisation

### Modifier les informations de contact
Éditez `components/Footer.tsx` et `app/contact/page.tsx` pour mettre à jour :
- Email
- Téléphone
- Liens sociaux

### Ajouter vos projets
Modifiez le tableau `projects` dans `app/portfolio/page.tsx`

### Personnaliser les couleurs
Modifiez `tailwind.config.js` pour changer la palette de couleurs

## 🌐 Déploiement

Le site peut être déployé sur :
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **AWS Amplify**
- Tout autre hébergeur supportant Node.js

## 📄 Licence

Ce projet est un portfolio personnel.








