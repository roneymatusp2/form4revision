/**
 * Script para corrigir manualmente vulnerabilidades de segurança
 * Execute com: node manual-fix.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Backup dos arquivos originais
console.log('Criando backup de arquivos...');
fs.copyFileSync('package.json', 'package.json.manual.backup');
fs.copyFileSync('package-lock.json', 'package-lock.json.manual.backup');

// Ler o package.json atual
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Versões seguras para dependências diretas
const safeVersions = {
  "firebase": "^10.14.0",
  "react-scripts": "5.0.1",
  "@testing-library/react": "^14.0.0",
  "@testing-library/jest-dom": "^6.1.4"
};

// Versões seguras para resolutions (dependências transitivas)
const resolutions = {
  "undici": "^6.22.0",
  "tough-cookie": "^4.1.3",
  "nth-check": "^2.0.1",
  "node-forge": "^1.3.0",
  "semver": "^7.5.4",
  "braces": "^3.0.3",
  "terser": "^5.14.2",
  "loader-utils": "^2.0.0",
  "postcss": "^8.4.31"
};

// Atualizar as versões das dependências diretas
console.log('Atualizando versões de dependências diretas...');
for (const [pkg, version] of Object.entries(safeVersions)) {
  if (packageJson.dependencies && packageJson.dependencies[pkg]) {
    packageJson.dependencies[pkg] = version;
    console.log(`  Atualizando ${pkg} para ${version}`);
  } else if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
    packageJson.devDependencies[pkg] = version;
    console.log(`  Atualizando ${pkg} para ${version}`);
  }
}

// Adicionar as resolutions para forçar versões de dependências transitivas
console.log('Adicionando resolutions para dependências transitivas...');
packageJson.resolutions = { 
  ...packageJson.resolutions,
  ...resolutions
};

// Verificar e adicionar script para aplicar resolutions
if (!packageJson.scripts) packageJson.scripts = {};
if (!packageJson.scripts.preinstall) {
  packageJson.scripts.preinstall = "npx npm-force-resolutions";
  console.log('Adicionando script preinstall para forçar resolutions');
}

// Salvar o package.json modificado
console.log('Salvando package.json modificado...');
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// Instalar npm-force-resolutions globalmente
console.log('Instalando npm-force-resolutions...');
try {
  execSync('npm install -g npm-force-resolutions', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro ao instalar npm-force-resolutions:', error);
}

// Reinstalar pacotes com as novas versões
console.log('Reinstalando pacotes com as novas versões...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro durante npm install:', error);
}

// Aplicar todas as correções possíveis
console.log('Aplicando todas as correções possíveis...');
try {
  execSync('npm audit fix --force', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro durante npm audit fix --force:', error);
}

// Verificar vulnerabilidades restantes
console.log('Verificando vulnerabilidades restantes...');
try {
  execSync('npm audit', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro durante npm audit:', error);
}

console.log('\nProcesso de correção manual concluído!');
console.log('Se ainda houver vulnerabilidades, você pode precisar atualizar manualmente mais dependências.');
