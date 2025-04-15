/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Arquivo de recursos
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');
// Arquivo para salvar o relatório
const reportFilePath = path.resolve(__dirname, 'link-check-stats.json');

console.log('=== Link Checker Test Mode ===');
console.log(`Resources file: ${resourcesFilePath}`);
console.log(`Report will be saved in: ${reportFilePath}`);

// Links quebrados simulados
const mockBrokenLinks = [
  {
    url: 'https://corbettmaths.com/wp-content/uploads/2013/02/square-numbers-pdf1.pdf',
    title: 'Square Numbers and Square Roots',
    type: 'pdf',
    line: 36,
    suggestion: 'https://corbettmaths.com/wp-content/uploads/2013/02/square-numbers-pdf.pdf',
    suggestionProvider: 'PatternMatching'
  },
  {
    url: 'https://corbettmaths.com/wp-content/uploads/2013/02/types-of-numbers-pdf1.pdf',
    title: 'Types of Numbers Worksheet',
    type: 'pdf',
    line: 34,
    suggestion: 'https://corbettmaths.com/wp-content/uploads/2018/11/types-of-numbers-pdf.pdf',
    suggestionProvider: 'PatternMatching'
  },
  {
    url: 'https://corbettmaths.com/wp-content/uploads/2019/09/Irrational-and-Rational-Numbers.pdf',
    title: 'Rational and Irrational Numbers',
    type: 'pdf',
    line: 39,
    suggestion: 'https://corbettmaths.com/wp-content/uploads/2021/09/Irrational-and-Rational-Numbers.pdf',
    suggestionProvider: 'OpenAI'
  },
  {
    url: 'https://www.draustinmaths.com/_files/ugd/7ac124_1548f69d09d94b80824a05fcaba64a2e.pdf',
    title: 'Standard Form Revision Grid',
    type: 'pdf',
    line: 50,
    suggestion: null,
    suggestionProvider: null
  }
];

// Função para simular a atualização do arquivo de recursos
function updateResourcesFile(brokenLinks) {
  console.log('\n--- Simulando atualização do arquivo ---');
  let fixedCount = 0;
  
  for (const link of brokenLinks) {
    if (link.suggestion) {
      console.log(`[SUCCESS] Link fixed: ${link.url} -> ${link.suggestion} (via ${link.suggestionProvider})`);
      fixedCount++;
    } else {
      console.log(`[WARN] No replacement found for: ${link.url}`);
    }
  }
  
  console.log(`[INFO] Simulação: ${fixedCount} links corrigidos de um total de ${brokenLinks.length} quebrados`);
  return fixedCount;
}

// Função principal
function main() {
  console.log('\n--- Analisando links quebrados ---');
  
  // Mostrar links que seriam verificados
  for (const link of mockBrokenLinks) {
    console.log(`\n[WARN] Broken link: ${link.url} (Line: ${link.line}, Title: ${link.title})`);
    
    if (link.suggestion) {
      console.log(`[INFO] Alternative found: ${link.suggestion} (via ${link.suggestionProvider})`);
    } else {
      console.log(`[INFO] No alternative found.`);
    }
  }
  
  // Atualizar o arquivo de recursos
  const fixedCount = updateResourcesFile(mockBrokenLinks);
  
  // Gerar relatório JSON
  const report = {
    totalLinksChecked: 259, // Valor simulado
    brokenLinkCount: mockBrokenLinks.length,
    linksFixedInFile: fixedCount,
    brokenLinksDetails: mockBrokenLinks.map(link => ({
      originalUrl: link.url,
      title: link.title,
      type: link.type,
      line: link.line,
      suggestedReplacement: link.suggestion,
      suggestionSource: link.suggestionProvider
    }))
  };
  
  // Salvar relatório
  fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2), 'utf8');
  
  console.log('\n=== TESTE CONCLUÍDO ===');
  console.log(`- Total links: ${report.totalLinksChecked}`);
  console.log(`- Broken links: ${report.brokenLinkCount}`);
  console.log(`- Links fixed: ${report.linksFixedInFile}`);
  console.log(`Report saved in: ${reportFilePath}`);
}

// Executar a função principal
main(); 