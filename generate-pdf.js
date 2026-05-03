// Script pour générer un PDF à partir du Markdown
// Utilise markdown-pdf ou une alternative

const fs = require('fs');
const path = require('path');

// Note: Pour générer le PDF, vous pouvez utiliser l'une des méthodes suivantes:
// 1. Ouvrir CAHIER_DES_CHARGES.md dans un éditeur Markdown qui supporte l'export PDF (VS Code avec extension)
// 2. Utiliser un service en ligne comme markdown-pdf.com
// 3. Installer markdown-pdf: npm install -g markdown-pdf puis: markdown-pdf CAHIER_DES_CHARGES.md

console.log('Pour générer le PDF:');
console.log('1. Installez markdown-pdf: npm install -g markdown-pdf');
console.log('2. Exécutez: markdown-pdf CAHIER_DES_CHARGES.md -o CAHIER_DES_CHARGES.pdf');
console.log('');
console.log('OU');
console.log('');
console.log('Ouvrez CAHIER_DES_CHARGES.md dans VS Code avec l\'extension "Markdown PDF"');
console.log('et utilisez la commande "Markdown PDF: Export (pdf)"');





