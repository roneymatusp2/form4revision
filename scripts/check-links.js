/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const pLimit = require('p-limit');

// ========== CONFIGURAÇÕES DE API ==========
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const QWEN_API_KEY_1 = process.env.QWEN_API;     // Primeira chave Qwen
const QWEN_API_KEY_2 = process.env.QWEN_API_2;   // Segunda chave Qwen (backup)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Endpoints (verifique a doc oficial de cada serviço)
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
// Endpoint oficial Qwen (Ailibaba Cloud / DashScope). Ajuste se necessário:
const QWEN_API_URL = 'https://api.qwen.ai/v1/chat/completions';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// ========== OUTRAS CONFIGS ==========
const GLOBAL_TIMEOUT = 55 * 60 * 1000; // 55 min
let shouldContinue = true;

// Dispara um "corte" de execução quando atingirmos o timeout global
setTimeout(() => {
  console.log('[WARN] Tempo global (55 min) atingido. Finalizando...');
  shouldContinue = false;
}, GLOBAL_TIMEOUT);

// Domínios autorizados — expanda conforme suas necessidades
const AUTHORIZED_WEBSITES = [
  'corbettmaths.com',
  'khanacademy.org',
  'savemyexams.com',
  'mathsgenie.co.uk',
  'draustinmaths.com',
  'physicsandmathstutor.com',
  'youtube.com',  // para vídeos
  'maths4everyone.com',
  'mathsaurus.com',
  'mathantics.com',
  'fuseschool.org',
  'bbc.co.uk',     // BBC Bitesize
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

const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');

// ========== FUNÇÕES AUXILIARES DE FORMATAÇÃO E VALIDAÇÃO ==========

// Cache de URLs já validadas (ou marcadas como inválidas) p/ evitar refazer requisições na mesma execução
// Estrutura: { [url: string]: boolean }  -> true se válido, false se inválido
const validityCache = {};

/**
 * Formata URL do YouTube para embed: 
 * Exemplo: https://www.youtube.com/watch?v=abc123 => https://www.youtube.com/embed/abc123
 */
function formatYouTubeUrl(url) {
  try {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
    // Se acontecer erro, só retorna a original
    return url;
  }
  return url;
}

/**
 * Verifica se uma URL está dentro da lista de domínios autorizados
 */
function isAuthorizedDomain(url) {
  try {
    const { hostname } = new URL(url);
    const normalized = hostname.replace(/^www\./, '').toLowerCase();
    return AUTHORIZED_WEBSITES.some(domain => 
      normalized === domain || 
      normalized.endsWith(`.${domain}`)
    );
  } catch (e) {
    return false;
  }
}

/**
 * Checa a URL usando HEAD, com fallback para GET se HEAD falhar com 405/403.
 * Extra: se "type === 'pdf'", podemos checar o content-type se desejado.
 */
async function checkUrlWithFallback(url, expectedType = null) {
  try {
    const headResp = await axios.head(url, {
      timeout: 15000,
      validateStatus: status => status < 400
    });
    // Se passou sem erro e status < 400, consideramos válido
    // Checar content-type se for PDF?
    if (expectedType === 'pdf') {
      const contentType = headResp.headers['content-type'] || '';
      if (!contentType.includes('pdf')) {
        console.log(`[WARN] Content-Type não aparenta ser PDF: ${contentType}`);
      }
    }
    return true;
  } catch (headError) {
    if (headError?.response?.status === 429) {
      console.log('[WARN] Rate-limited no HEAD, assumindo que pode ser válido.');
      return true;
    }
    // Fallback: GET se HEAD for bloqueado (405, 403 etc.)
    if ([405, 403].includes(headError?.response?.status)) {
      try {
        const getResp = await axios.get(url, {
          timeout: 20000,
          validateStatus: status => status < 400
        });
        // Idem acima, se passou, consideramos válido
        if (expectedType === 'pdf') {
          const contentType = getResp.headers['content-type'] || '';
          if (!contentType.includes('pdf')) {
            console.log(`[WARN] Content-Type não é PDF: ${contentType}`);
          }
        }
        return true;
      } catch (getError) {
        console.log(`[ERROR] Fallback GET falhou p/ ${url}: ${getError.message}`);
        return false;
      }
    }
    console.log(`[ERROR] HEAD falhou p/ ${url}: ${headError.message}`);
    return false;
  }
}

/**
 * Verifica se URL é válida (com cache) e se é de um domínio autorizado
 */
async function isValidUrl(url, type = null) {
  if (!url || !url.startsWith('http')) return false;
  if (url in validityCache) return validityCache[url];

  // Domínio autorizado?
  if (!isAuthorizedDomain(url)) {
    validityCache[url] = false;
    return false;
  }
  // HEAD->GET fallback
  const valid = await checkUrlWithFallback(url, type);
  validityCache[url] = valid;
  return valid;
}

/**
 * Retorna um link "mock" caso todas as APIs falhem
 */
function getMockReplacement(title, type, source) {
  if (type === 'video') {
    // Exemplo: retornos minimamente específicos
    if (title.toLowerCase().includes('linear')) {
      return 'https://www.youtube.com/embed/m9-_sYVcSxk';
    } else if (title.toLowerCase().includes('quadratic')) {
      return 'https://www.youtube.com/embed/YHKShQgTLAY';
    } else if (title.toLowerCase().includes('angle')) {
      return 'https://www.youtube.com/embed/NVuMULQjb3o';
    } else if (title.toLowerCase().includes('trigonometry')) {
      return 'https://www.youtube.com/embed/F21S9Wpi0y8';
    } else if (title.toLowerCase().includes('pythagoras')) {
      return 'https://www.youtube.com/embed/JCB-RILJJ_k';
    } else if (title.toLowerCase().includes('circle')) {
      return 'https://www.youtube.com/embed/O-cawByg2aA';
    } else {
      return 'https://www.youtube.com/embed/l9nh1l8ZIJQ'; // genérico
    }
  } else if (type === 'pdf') {
    // PDFs “genéricos” ou fallback
    if (source.toLowerCase().includes('corbett')) {
      return 'https://corbettmaths.com/wp-content/uploads/2019/02/GCSE-Revision-Cards.pdf';
    } else if (source.toLowerCase().includes('austin')) {
      return 'https://www.draustinmaths.com/workbooks';
    } else if (source.toLowerCase().includes('genie')) {
      return 'https://www.mathsgenie.co.uk/resources/gcse-maths-takeaway.pdf';
    } else {
      return 'https://www.mathsgenie.co.uk/resources/gcse-maths-takeaway.pdf';
    }
  }
  return null; // Se nem vídeo nem PDF, retorna null
}

// ========== FUNÇÕES DE CHAMADA A CADA API ==========

async function findGeminiReplacement(title, type, source, topic, subtopic) {
  if (!GOOGLE_GEMINI_API_KEY) return null;
  try {
    console.log(`[Gemini] Procurando substituto p/ "${title}" (${type}). Fonte original: ${source}`);

    const prompt = `
      You are an educational resource expert. 
      Find a working ${type} resource about "${title}" for ${topic}, ${subtopic}, 
      from one of these sources: ${AUTHORIZED_WEBSITES.join(', ')}. 
      The original source was ${source}. 
      Return ONLY the URL or "NONE" if none found. 
      For YouTube, use embed URL format (https://www.youtube.com/embed/VIDEO_ID).
    `;

    const response = await axios.post(
      `${GOOGLE_GEMINI_API_URL}?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 100
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const candidate = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const rawUrl = candidate.trim();

    if (!rawUrl || rawUrl.toLowerCase() === 'none') return null;

    const youtubeFormatted = formatYouTubeUrl(rawUrl);
    if (!(await isValidUrl(youtubeFormatted, type))) return null;
    return youtubeFormatted;
  } catch (err) {
    console.error(`[Gemini] Erro: ${err.message}`);
    return null;
  }
}

async function findDeepSeekReplacement(title, type, source, topic, subtopic) {
  if (!DEEPSEEK_API_KEY) return null;
  try {
    console.log(`[DeepSeek] Procurando substituto p/ "${title}" (${type}). Fonte: ${source}`);
    
    const prompt = `
      You are an educational resource expert with strong reasoning abilities.
      Find a working ${type} resource about "${title}" for ${topic}, ${subtopic} 
      from these sources: ${AUTHORIZED_WEBSITES.join(', ')}.
      The original was ${source}. 
      Return ONLY the URL or "NONE". 
      For YouTube, use embed format (https://www.youtube.com/embed/VIDEO_ID).
    `;

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-reasoner',
        messages: [
          { role: 'system', content: 'Educational resource replacer: respond with only the URL or "NONE".' },
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

    const rawUrl = (response.data?.choices?.[0]?.message?.content || '').trim();
    if (!rawUrl || rawUrl.toLowerCase() === 'none') return null;

    const youtubeFormatted = formatYouTubeUrl(rawUrl);
    if (!(await isValidUrl(youtubeFormatted, type))) return null;
    return youtubeFormatted;
  } catch (err) {
    console.error(`[DeepSeek] Erro: ${err.message}`);
    return null;
  }
}

/**
 * Tenta chamar Qwen usando a 1ª chave. 
 * Se falhar, tenta novamente usando a 2ª (QWEN_API_KEY_2).
 */
async function findQwenReplacement(title, type, source, topic, subtopic) {
  // Se não tem nenhuma das chaves, retorna null logo
  if (!QWEN_API_KEY_1 && !QWEN_API_KEY_2) return null;
  
  const tryQwen = async (apiKey, attemptLabel) => {
    console.log(`[Qwen] (Tentando: ${attemptLabel}) Substituto p/ "${title}" (${type}). Fonte: ${source}`);
    const prompt = `
      You are an educational resource expert with internet access.
      Find a working ${type} resource about "${title}" for ${topic}, ${subtopic} 
      from these sources: ${AUTHORIZED_WEBSITES.join(', ')}.
      Original: ${source}. 
      Return ONLY the URL or "NONE".
      For YouTube, embed format: https://www.youtube.com/embed/VIDEO_ID.
    `;
    try {
      const resp = await axios.post(
        QWEN_API_URL,
        {
          model: 'qwen-max',
          messages: [
            { role: 'system', content: 'Return only a single URL or "NONE".' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2,
          max_tokens: 100
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const rawUrl = (resp.data?.choices?.[0]?.message?.content || '').trim();
      if (!rawUrl || rawUrl.toLowerCase() === 'none') return null;

      const youtubeFormatted = formatYouTubeUrl(rawUrl);
      if (!(await isValidUrl(youtubeFormatted, type))) return null;
      return youtubeFormatted;
    } catch (error) {
      console.error(`[Qwen ${attemptLabel}] Erro: ${error.message}`);
      return null;
    }
  };

  // 1ª tentativa (QWEN_API_KEY_1)
  if (QWEN_API_KEY_1) {
    const res1 = await tryQwen(QWEN_API_KEY_1, 'Chave #1');
    if (res1) return res1;
  }
  // 2ª tentativa (QWEN_API_KEY_2)
  if (QWEN_API_KEY_2) {
    const res2 = await tryQwen(QWEN_API_KEY_2, 'Chave #2');
    if (res2) return res2;
  }

  return null;
}

async function findOpenAIReplacement(title, type, source, topic, subtopic) {
  if (!OPENAI_API_KEY) return null;
  try {
    console.log(`[OpenAI] Procurando substituto p/ "${title}" (${type}). Fonte: ${source}`);
    
    const prompt = `
      You are an educational resource expert. 
      Find a working ${type} resource about "${title}" for ${topic}, ${subtopic} 
      from these sources: ${AUTHORIZED_WEBSITES.join(', ')}.
      Original: ${source}. 
      Return ONLY the URL or "NONE". 
      For YouTube, prefer https://www.youtube.com/embed/VIDEO_ID
    `;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: 'Return only a single URL or "NONE".' },
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

    const rawUrl = (response.data?.choices?.[0]?.message?.content || '').trim();
    if (!rawUrl || rawUrl.toLowerCase() === 'none') return null;

    const youtubeFormatted = formatYouTubeUrl(rawUrl);
    if (!(await isValidUrl(youtubeFormatted, type))) return null;
    return youtubeFormatted;
  } catch (err) {
    console.error(`[OpenAI] Erro: ${err.message}`);
    return null;
  }
}

// ========== FLUXO PRINCIPAL DE BUSCA EM CASCATA ==========
async function findReplacement(title, type, source, topic, subtopic) {
  // 1) Google Gemini
  const gemini = await findGeminiReplacement(title, type, source, topic, subtopic);
  if (gemini) return { url: gemini, provider: 'Google Gemini' };

  // 2) DeepSeek
  console.log('[INFO] Gemini falhou. Tentando DeepSeek...');
  const deepSeek = await findDeepSeekReplacement(title, type, source, topic, subtopic);
  if (deepSeek) return { url: deepSeek, provider: 'DeepSeek' };

  // 3) Qwen (com fallback de chave)
  console.log('[INFO] DeepSeek falhou. Tentando Qwen...');
  const qwen = await findQwenReplacement(title, type, source, topic, subtopic);
  if (qwen) return { url: qwen, provider: 'Qwen' };

  // 4) OpenAI
  console.log('[INFO] Qwen falhou. Tentando OpenAI...');
  const openai = await findOpenAIReplacement(title, type, source, topic, subtopic);
  if (openai) return { url: openai, provider: 'OpenAI' };

  // 5) Mock
  console.log('[INFO] Todas as APIs falharam. Usando Mock Replacement...');
  const mock = getMockReplacement(title, type, source);
  if (mock) return { url: mock, provider: 'Mock' };

  return null;
}

// ========== FUNÇÃO PRINCIPAL ==========
async function main() {
  try {
    console.log('Iniciando script de verificação e correção de links...');
    console.log(`Gemini Key? ${GOOGLE_GEMINI_API_KEY ? 'Yes' : 'No'}`);
    console.log(`DeepSeek Key? ${DEEPSEEK_API_KEY ? 'Yes' : 'No'}`);
    console.log(`Qwen Key #1? ${QWEN_API_KEY_1 ? 'Yes' : 'No'}`);
    console.log(`Qwen Key #2? ${QWEN_API_KEY_2 ? 'Yes' : 'No'}`);
    console.log(`OpenAI Key? ${OPENAI_API_KEY ? 'Yes' : 'No'}`);

    // Estatísticas
    const stats = {
      totalLinks: 0,
      brokenLinks: 0,
      fixedLinks: 0,
      providerSuccess: {
        'Google Gemini': 0,
        'DeepSeek': 0,
        'Qwen': 0,
        'OpenAI': 0,
        'Mock': 0,
        'Failed': 0
      }
    };

    // Lê o arquivo TS
    const originalCode = fs.readFileSync(resourcesFilePath, 'utf8');
    
    // Faz parse do AST
    const ast = parse(originalCode, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx']
    });

    // Coleta de todos os links
    const linksToCheck = [];
    traverse(ast, {
      ObjectProperty(path) {
        // Captura propriedades "url: 'http://...' "
        if (
          path.node.key.type === 'Identifier' &&
          path.node.key.name === 'url' &&
          path.node.value.type === 'StringLiteral'
        ) {
          const urlNode = path.node.value;
          const url = urlNode.value;

          // Lê alguns campos extras (title, type, source) do mesmo objeto
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
            // Se houverem campos topic/subtopic no seu TS, puxe-os aqui.
            // else if (prop.key?.name === 'topic') ...
          }

          linksToCheck.push({ urlNode, url, title, type: rtype, source, topic, subtopic });
          stats.totalLinks++;
        }
      }
    });

    console.log(`[INFO] Total de links encontrados: ${linksToCheck.length}`);
    let changesMade = false;

    // Limitar concorrência a 5 (ajuste se quiser mais ou menos)
    const limit = pLimit(5);

    // Gera promessas de checagem
    const tasks = linksToCheck.map(item =>
      limit(async () => {
        if (!shouldContinue) return;

        const { urlNode, url, title, type, source, topic, subtopic } = item;
        const valid = await isValidUrl(url, type);
        if (!valid) {
          stats.brokenLinks++;
          console.log(`\n[INFO] Link quebrado encontrado: ${url}`);
          console.log(`  -> Título: ${title}, Tipo: ${type}, Fonte: ${source}`);

          const replacementResult = await findReplacement(title, type, source, topic, subtopic);
          if (replacementResult?.url) {
            urlNode.value = replacementResult.url;  // efetua substituição no AST
            changesMade = true;
            stats.fixedLinks++;

            if (replacementResult.provider) {
              stats.providerSuccess[replacementResult.provider]++;
            }
            console.log(`[INFO] Substituído por: ${replacementResult.url} (via ${replacementResult.provider})`);
          } else {
            console.log('[WARN] Falhou a substituição com todas as APIs + Mock.');
            stats.providerSuccess.Failed++;
          }
        }
      })
    );

    // Executa de fato
    await Promise.all(tasks);

    // Se houve alguma substituição, gera novo code e salva
    if (changesMade) {
      const newCode = generator(ast, {}, originalCode).code;
      fs.writeFileSync(resourcesFilePath, newCode, 'utf8');
      console.log('\n[RESULT] Link checker finalizado. Arquivo atualizado.');
      console.log(`- Total links: ${stats.totalLinks}`);
      console.log(`- Links quebrados: ${stats.brokenLinks}`);
      console.log(`- Links corrigidos: ${stats.fixedLinks}`);
    } else {
      console.log('\n[INFO] Nenhum link quebrado encontrado ou nenhuma substituição realizada.');
    }

    // Gera arquivo JSON com stats
    fs.writeFileSync(
      path.resolve(__dirname, 'link-check-stats.json'),
      JSON.stringify(stats, null, 2),
      'utf8'
    );

    console.log('[INFO] Estatísticas salvas em link-check-stats.json.');
    console.log('[INFO] Concluído com sucesso.');
  } catch (error) {
    console.error(`[ERROR] Falha geral no script: ${error.message}`);
    process.exit(1);
  }
}

main();
