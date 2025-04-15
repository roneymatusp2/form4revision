console.log('===== SIMPLE TEST =====');
console.log('Verificando funcionalidade básica do script.');

// Criar um relatório básico para testar o formato
const report = {
  totalLinksChecked: 10,
  brokenLinkCount: 2,
  linksFixedInFile: 1,
  brokenLinksDetails: [
    {
      originalUrl: "https://example.com/broken1",
      title: "Link Test 1",
      type: "pdf",
      line: 10,
      suggestedReplacement: "https://example.com/fixed1",
      suggestionSource: "Test"
    },
    {
      originalUrl: "https://example.com/broken2",
      title: "Link Test 2",
      type: "pdf",
      line: 20,
      suggestedReplacement: null,
      suggestionSource: null
    }
  ]
};

// Salvar o relatório
const fs = require('fs');
const path = require('path');
const reportPath = path.resolve(__dirname, 'simple-test-report.json');

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log(`Relatório criado em: ${reportPath}`);
console.log('===== TESTE CONCLUÍDO ====='); 