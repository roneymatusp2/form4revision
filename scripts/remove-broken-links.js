const fs = require('fs');
const path = require('path');

const resourcesFile = path.resolve(__dirname, '../src/data/externalResources-new.ts');
const brokenLinksFile = path.resolve(__dirname, 'broken-links.json');
const backupFile = path.resolve(__dirname, '../src/data/externalResources-new.backup.ts');

if (!fs.existsSync(brokenLinksFile)) {
  console.error('Arquivo broken-links.json não encontrado!');
  process.exit(1);
}

if (!fs.existsSync(resourcesFile)) {
  console.error('Arquivo de recursos não encontrado!');
  process.exit(1);
}

// Backup do arquivo original
fs.copyFileSync(resourcesFile, backupFile);
console.log(`Backup criado em: ${backupFile}`);

const brokenLinks = JSON.parse(fs.readFileSync(brokenLinksFile, 'utf8'));
let fileContent = fs.readFileSync(resourcesFile, 'utf8');
let removedCount = 0;

brokenLinks.forEach(link => {
  // Remove o objeto inteiro que contém o campo url: '...'
  const urlPattern = link.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex
  const regex = new RegExp(
    `\{[^\{\}]*?url:\s*['\"\`]${urlPattern}['\"\`][^\{\}]*?\},?\n?`,
    'g'
  );
  const before = fileContent;
  fileContent = fileContent.replace(regex, '');
  if (before !== fileContent) removedCount++;
});

fs.writeFileSync(resourcesFile, fileContent, 'utf8');
console.log(`Removidos ${removedCount} links quebrados de ${resourcesFile}`); 