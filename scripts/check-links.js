/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const pLimit = require('p-limit');

/**
 * Se quiser chamar IAs para sugerir algo, habilite as chaves de ambiente e endpoints:
 */
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API || null;
const DEEPSEEK_API_KEY      = process.env.DEEPSEEK_API_KEY  || null;
const QWEN_API_KEY          = process.env.QWEN_API          || null;
const OPENAI_API_KEY        = process.env.OPENAI_API_KEY    || null;

// Endpoints para cada IA (ajuste se necessário)
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const DEEPSEEK_API_URL      = 'https://api.deepseek.com/v1/chat/completions';
const QWEN_API_URL          = 'https://api.qwen.ai/v1/chat/completions';
const OPENAI_API_URL        = 'https://api.openai.com/v1/chat/completions';

// Domínios autorizados (se quiser restringir)
const AUTHORIZED_WEBSITES = [
  'corbettmaths.com',
  'khanacademy.org',
  'savemyexams.com',
  'mathsgenie.co.uk',
  'draustinmaths.com',
  'physicsandmathstutor.com',
  'youtube.com',
  'maths4everyone.com',
  'mathsaurus.com',
  'mathantics.com',
  'fuseschool.org',
  'bbc.co.uk',
  'pearsonactivelearn.com',
  'onmaths.com',
  'edplace.com',
  'hegartymaths.com',
  'justmaths.co.uk',
  'gcse.com',
  'mathedup.co.uk',
  'mathsbot.com',
  'diagnosticquestions.com',
  'mathswatch.co.uk',
  'crashmaths.com',
  'revision.co.uk',
  'mymaths.co.uk',
  'teachitmaths.co.uk'
];

// Arquivo que contém seus recursos
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');

// Local onde salvaremos o relatório final
const reportFilePath = path.resolve(__dirname, 'broken-links-report.json');


// ========== CHECAGEM DE LINK (SEM CORRIGIR) ==========

async function checkUrlWithFallback(url) {
  try {
    // Tenta HEAD
    const headResp = await axios.head(url, {
      timeout: 10000,
      validateStatus: s => s < 400
    });
    return true; // Se passou, consideramos válido
  } catch (headError) {
    // 429 => rate limit; assumimos "talvez válido"
    if (headError?.response?.status === 429) {
      console.log(`[WARN] Rate-limited (HEAD) => Aceitando ${url} como possivelmente válido`);
      return true;
    }
    // Tenta GET se for 405 ou 403
    if ([405, 403].includes(headError?.response?.status)) {
      try {
        const getResp = await axios.get(url, {
          timeout: 15000,
          validateStatus: s => s < 400
        });
        return true;
      } catch (getError) {
        // Falhou no GET
        return false;
      }
    }
    // Qualquer outra falha, consideramos inválido
    return false;
  }
}

async function isValidUrl(url) {
  if (!url.startsWith('http')) return false;
  try {
    const valid = await checkUrlWithFallback(url);
    return valid;
  } catch {
    return false;
  }
}

// ========== FUNÇÕES OPCIONAIS DE "SUGESTÃO" VIA IA ==========

/**
 * Se quiser apenas listar os links quebrados sem chamar AI, basta
 * NÃO chamar essas funções de "findGeminiSuggestion", "findDeepSeekSuggestion", etc.
 * Ou comente a parte do cascadeSuggester() no final.
 */
async function findGeminiSuggestion(title, type, topic, subtopic, source) {
  if (!GOOGLE_GEMINI_API_KEY) return null;

  try {
    const promptText = `
      You are an educational resource expert. 
      The resource titled "${title}" of type "${type}" is broken. 
      Topic: ${topic}, subtopic: ${subtopic}. 
      Original source: ${source}.

      Return ONLY a suggested working URL from these domains (${AUTHORIZED_WEBSITES.join(', ')}), 
      or "NONE" if there's no suitable replacement.
    `;
    const resp = await axios.post(
      `${GOOGLE_GEMINI_API_URL}?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 100
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const output = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    if (!output || output.toLowerCase() === 'none') return null;
    return output;
  } catch (err) {
    console.log(`[Gemini] Erro: ${err.message}`);
    return null;
  }
}

async function findDeepSeekSuggestion(title, type, topic, subtopic, source) {
  if (!DEEPSEEK_API_KEY) return null;
  try {
    const prompt = `
      You are an educational resource expert. 
      The resource titled "${title}" of type "${type}" is broken. 
      Topic: ${topic}, subtopic: ${subtopic}.
      Original source: ${source}.

      Return ONLY a suggested working URL from these domains (${AUTHORIZED_WEBSITES.join(', ')}),
      or "NONE" if there's no suitable replacement.
    `;
    const resp = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-reasoner',
        messages: [
          { role: 'system', content: 'Respond with only the URL or "NONE".' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!suggestion || suggestion.toLowerCase() === 'none') return null;
    return suggestion;
  } catch (err) {
    console.log(`[DeepSeek] Erro: ${err.message}`);
    return null;
  }
}

async function findQwenSuggestion(title, type, topic, subtopic, source) {
  if (!QWEN_API_KEY) return null;
  try {
    const prompt = `
      You are an educational resource expert with internet access.
      The resource titled "${title}" (type: "${type}") is broken.
      Topic: ${topic}, subtopic: ${subtopic}.
      Original source: ${source}.

      Provide ONLY a working URL from these domains (${AUTHORIZED_WEBSITES.join(', ')}),
      or "NONE" if not found.
    `;
    const resp = await axios.post(
      QWEN_API_URL,
      {
        model: 'qwen-max',
        messages: [
          { role: 'system', content: 'Return only the URL or "NONE".' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${QWEN_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const out = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!out || out.toLowerCase() === 'none') return null;
    return out;
  } catch (err) {
    console.log(`[Qwen] Erro: ${err.message}`);
    return null;
  }
}

async function findOpenAISuggestion(title, type, topic, subtopic, source) {
  if (!OPENAI_API_KEY) return null;
  try {
    const prompt = `
      You are an educational resource expert. 
      The resource titled "${title}" (type: "${type}") is broken.
      Topic: ${topic}, subtopic: ${subtopic}.
      Original source: ${source}.

      Return ONLY the working URL from these domains (${AUTHORIZED_WEBSITES.join(', ')}),
      or "NONE" if none found.
    `;
    const resp = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini-2024-07-18', // Ajuste se quiser outro modelo
        messages: [
          { role: 'system', content: 'Return only the URL or "NONE".' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!suggestion || suggestion.toLowerCase() === 'none') return null;
    return suggestion;
  } catch (err) {
    console.log(`[OpenAI] Erro: ${err.message}`);
    return null;
  }
}

/**
 * Cascade de sugestões: Tenta Gemini → DeepSeek → Qwen → OpenAI
 */
async function cascadeSuggester(title, type, topic, subtopic, source) {
  // 1) Gemini
  const g = await findGeminiSuggestion(title, type, topic, subtopic, source);
  if (g) return { provider: 'Gemini', url: g };

  // 2) DeepSeek
  console.log('[INFO] Gemini falhou. Tentando DeepSeek...');
  const d = await findDeepSeekSuggestion(title, type, topic, subtopic, source);
  if (d) return { provider: 'DeepSeek', url: d };

  // 3) Qwen
  console.log('[INFO] DeepSeek falhou. Tentando Qwen...');
  const q = await findQwenSuggestion(title, type, topic, subtopic, source);
  if (q) return { provider: 'Qwen', url: q };

  // 4) OpenAI
  console.log('[INFO] Qwen falhou. Tentando OpenAI...');
  const o = await findOpenAISuggestion(title, type, topic, subtopic, source);
  if (o) return { provider: 'OpenAI', url: o };

  console.log('[INFO] Todas as IA falharam. Sem sugestão.');
  return null;
}


// ========== SCRIPT PRINCIPAL ==========

async function main() {
  console.log('=== Diagnóstico de links quebrados ===');
  console.log(`Arquivo de recursos: ${resourcesFilePath}`);
  console.log(`Relatório será salvo em: ${reportFilePath}`);

  // Lê o código
  const code = fs.readFileSync(resourcesFilePath, 'utf8');
  // Faz parse
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });

  const brokenLinksData = [];
  let totalLinks = 0;

  // Localiza propriedades "url: '...'". Se quiser topic/subtopic do AST, faça algo semelhante:
  traverse(ast, {
    ObjectProperty(path) {
      if (
        path.node.key.type === 'Identifier' &&
        path.node.key.name === 'url' &&
        path.node.value.type === 'StringLiteral'
      ) {
        totalLinks++;
        const url = path.node.value.value;
        
        // Identifica metadados no mesmo objeto
        const parentProps = path.parentPath.node.properties;
        let title = '', rtype = '', source = '', topic = 'mathematics', subtopic = 'general';
        for (const prop of parentProps) {
          if (prop.key?.name === 'title' && prop.value?.type === 'StringLiteral') {
            title = prop.value.value;
          } else if (prop.key?.name === 'type' && prop.value?.type === 'StringLiteral') {
            rtype = prop.value.value;
          } else if (prop.key?.name === 'source' && prop.value?.type === 'StringLiteral') {
            source = prop.value.value;
          }
          // Se tiver "topic" e "subtopic" no seu TS, busque de forma similar:
          // else if (prop.key?.name === 'topic') ...
        }

        // Pega a linha e coluna aproximada
        const { line, column } = path.node.loc.start;

        // Armazena para checar depois
        brokenLinksData.push({
          url,
          line,
          column,
          title,
          type: rtype,
          source,
          topic,
          subtopic,
          isBroken: false,   // Será atualizado
          suggestion: null, // Opicional (atualizaremos se IA sugerir algo)
          suggestionProvider: null
        });
      }
    }
  });

  console.log(`[INFO] Total de links encontrados: ${totalLinks}`);

  // Vamos verificar cada link em paralelo (p-limit define quantos simultâneos)
  const limit = pLimit(5);

  const tasks = brokenLinksData.map(item =>
    limit(async () => {
      const valid = await isValidUrl(item.url);
      if (!valid) {
        item.isBroken = true;
        console.log(`\n[WARN] Link quebrado: ${item.url} (Linha: ${item.line}, Título: ${item.title})`);

        // (Opcional) Perguntar à cascata de IAs
        // Se você quiser pular completamente a parte de IA, comente as linhas abaixo.
        const suggestionResult = await cascadeSuggester(
          item.title,
          item.type,
          item.topic,
          item.subtopic,
          item.source
        );
        if (suggestionResult?.url) {
          item.suggestion = suggestionResult.url;
          item.suggestionProvider = suggestionResult.provider;
          console.log(`[INFO] IA sugeriu: ${suggestionResult.url} (via ${suggestionResult.provider})`);
        } else {
          console.log('[INFO] Nenhuma sugestão de IA.');
        }
      }
    })
  );

  await Promise.all(tasks);

  // Filtra só os realmente quebrados
  const onlyBroken = brokenLinksData.filter(x => x.isBroken);

  // Gera relatório final
  const report = {
    totalLinks,
    brokenCount: onlyBroken.length,
    brokenLinks: onlyBroken
  };

  fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n=== FINALIZADO ===`);
  console.log(`- Total links: ${totalLinks}`);
  console.log(`- Links quebrados: ${onlyBroken.length}`);
  console.log(`Relatório completo em: ${reportFilePath}`);
}

// Executa
main().catch(err => {
  console.error(`[ERROR] Falha no script principal: ${err.message}`);
  process.exit(1);
});
