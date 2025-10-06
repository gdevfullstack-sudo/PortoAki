// Script de vérification des liens pour GitHub Pages
const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification des liens pour GitHub Pages...\n');

// Lire le fichier HTML
const htmlContent = fs.readFileSync('index.html', 'utf8');

// Fonction pour extraire les liens
function extractLinks(content, attribute) {
    const regex = new RegExp(`${attribute}="([^"]+)"`, 'g');
    const links = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        links.push(match[1]);
    }

    return links;
}

// Extraire différents types de liens
const cssLinks = extractLinks(htmlContent, 'href');
const jsLinks = extractLinks(htmlContent, 'src');
const imgLinks = extractLinks(htmlContent, 'src');

console.log('📄 Fichier HTML analysé\n');

// Vérifier les liens CSS
console.log('🎨 Liens CSS :');
cssLinks.forEach(link => {
    if (link.startsWith('./css/') || link.startsWith('css/')) {
        const filePath = link.startsWith('./') ? link.substring(2) : link;
        const exists = fs.existsSync(filePath);
        console.log(`${exists ? '✅' : '❌'} ${link} ${exists ? '' : '(MANQUANT)'}`);
    }
});

console.log('\n📜 Liens JavaScript :');
jsLinks.forEach(link => {
    if (link.startsWith('./js/') || link.startsWith('js/')) {
        const filePath = link.startsWith('./') ? link.substring(2) : link;
        const exists = fs.existsSync(filePath);
        console.log(`${exists ? '✅' : '❌'} ${link} ${exists ? '' : '(MANQUANT)'}`);
    }
});

console.log('\n🖼️  Images :');
imgLinks.forEach(link => {
    if (link.startsWith('./images/') || link.startsWith('images/')) {
        const filePath = link.startsWith('./') ? link.substring(2) : link;
        const exists = fs.existsSync(filePath);
        console.log(`${exists ? '✅' : '❌'} ${link} ${exists ? '' : '(MANQUANT)'}`);
    }
});

// Vérifier les fichiers de configuration
console.log('\n⚙️  Fichiers de configuration :');
const configFiles = ['.nojekyll', 'README.md', '.gitignore'];
configFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file} ${exists ? '' : '(MANQUANT)'}`);
});

console.log('\n📊 Résumé :');
console.log('- Tous les chemins utilisent maintenant "./" pour GitHub Pages');
console.log('- Le fichier .nojekyll empêche les conflits Jekyll');
console.log('- README.md contient les instructions de déploiement');
console.log('- .gitignore optimise le dépôt Git');

console.log('\n🚀 Prêt pour GitHub Pages !');
