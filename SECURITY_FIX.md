# Atualização de Segurança

## Vulnerabilidades Identificadas

Uma auditoria de segurança (`npm audit`) identificou 175 vulnerabilidades nas dependências do projeto:
- 133 de severidade moderada
- 39 de severidade alta
- 3 de severidade crítica

## Solução Implementada

Foi criado um script de atualização (`update-dependencies.bat`) que executa as seguintes ações:

1. **Atualiza o pacote `react-scripts` para a versão 5.0.1**
   - Esta é uma atualização importante que resolve a maioria das vulnerabilidades
   - Envolve uma mudança de versão maior (breaking change), mas é necessária para a segurança

2. **Atualiza especificamente o pacote `undici` para resolver a vulnerabilidade específica**
   - Esse pacote é usado por vários componentes do Firebase

3. **Executa `npm audit fix` para resolver vulnerabilidades adicionais**
   - Aplica correções automáticas para problemas restantes quando possível

## Vulnerabilidades Principais Resolvidas

- `loader-utils`: Vulnerabilidade crítica de poluição de protótipo
- `shell-quote`: Vulnerabilidade crítica de injeção de comando
- `ansi-html`: Vulnerabilidade alta de consumo descontrolado de recursos
- `braces`: Vulnerabilidade alta de consumo descontrolado de recursos
- `cross-spawn`: Vulnerabilidade alta de negação de serviço (ReDoS)
- Várias vulnerabilidades no `postcss` e pacotes relacionados

## Instruções de Uso

1. Execute o arquivo batch `update-dependencies.bat` para aplicar todas as correções
2. Verifique se a aplicação continua funcionando corretamente após as atualizações
3. Se necessário (e após testes), execute `npm audit fix --force` para resolver qualquer vulnerabilidade restante

## Considerações

- A atualização do `react-scripts` pode exigir algumas adaptações no código se houver recursos deprecados
- Recomenda-se fazer backup do projeto antes de executar as atualizações
- Algumas dependências foram marcadas como obsoletas e podem precisar ser substituídas no futuro

## Data da Atualização

14 de abril de 2025
