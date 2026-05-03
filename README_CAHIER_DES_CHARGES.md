# Instructions pour Générer le PDF du Cahier des Charges

## Méthode 1 : VS Code (Recommandée)

1. Installez l'extension **"Markdown PDF"** dans VS Code
2. Ouvrez le fichier `CAHIER_DES_CHARGES.md`
3. Clic droit → **"Markdown PDF: Export (pdf)"**
4. Le PDF sera généré dans le même dossier

## Méthode 2 : En ligne

1. Allez sur https://www.markdowntopdf.com/
2. Uploadez le fichier `CAHIER_DES_CHARGES.md`
3. Téléchargez le PDF généré

## Méthode 3 : Pandoc (Si installé)

```bash
pandoc CAHIER_DES_CHARGES.md -o CAHIER_DES_CHARGES.pdf --pdf-engine=xelatex
```

## Méthode 4 : Markdown-pdf (npm)

```bash
npm install -g markdown-pdf
markdown-pdf CAHIER_DES_CHARGES.md -o CAHIER_DES_CHARGES.pdf
```

## Note

Le fichier `CAHIER_DES_CHARGES.md` est déjà formaté avec toutes les sections nécessaires pour un document professionnel. Vous pouvez le modifier avant de générer le PDF si besoin.





