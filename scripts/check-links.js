/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const pLimit = require('p-limit');

// Configurações de retry
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

/**
 * Configuração de chaves de API para os modelos de IA
 */
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API || null;
const OPENAI_API_KEY        = process.env.OPENAI_API_KEY    || null;
const ANTHROPIC_API_KEY     = process.env.ANTHROPIC_API_KEY || null;
const CLAUDE_API_KEY        = process.env.CLAUDE_API_KEY    || null; // Alternativa para Anthropic
const MISTRAL_API_KEY       = process.env.MISTRAL_API_KEY   || null; // Nova opção

// Endpoints para cada IA (atualizados para os mais recentes)
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const OPENAI_API_URL        = 'https://api.openai.com/v1/chat/completions';
const ANTHROPIC_API_URL     = 'https://api.anthropic.com/v1/messages';
const CLAUDE_API_URL        = 'https://api.claude.ai/v1/messages'; // Alternativa para Anthropic
const MISTRAL_API_URL       = 'https://api.mistral.ai/v1/chat/completions';

// Domínios autorizados (mantidos como estão)
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

// Map para guardar os domínios mais comuns para cada website (ajuda na construção de URLs alternativas)
const COMMON_URL_PATTERNS = {
  'corbettmaths.com': [
    // Padrões para PDFs do Corbett Maths
    { original: /-pdf1\.pdf$/, replacement: '-pdf.pdf' },
    { original: /-pdf2\.pdf$/, replacement: '-pdf.pdf' },
    { original: /-pdf1\.pdf$/, replacement: '.pdf' },
    { original: /wp-content\/uploads\/2013\/02\/(.+)\.pdf$/, replacement: 'wp-content/uploads/2018/11/$1.pdf' },
    { original: /wp-content\/uploads\/2013\/02\/(.+)\.pdf$/, replacement: 'wp-content/uploads/2019/09/$1.pdf' },
  ],
  'draustinmaths.com': [
    // Padrões para DrAustinMaths
    { original: /_files\/ugd\/(.+)\.pdf$/, replacement: 'files/$1.pdf' },
    { original: /_files\/uploaded\/(.+)\.pdf$/, replacement: 'files/ugd/$1.pdf' },
  ]
};

// Arquivo que contém seus recursos
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');

// Local onde salvaremos o relatório final
const reportFilePath = path.resolve(__dirname, 'link-check-stats.json');

/**
 * Função de sleep para implementar delays
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Função para fazer requisições com retry automático
 */
async function makeRequestWithRetry(fn, retries = MAX_RETRIES) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      const isRateLimited = error?.response?.status === 429;
      const retryDelay = isRateLimited ? RETRY_DELAY_MS * (MAX_RETRIES - retries + 1) : RETRY_DELAY_MS;
      
      console.log(`[RETRY] ${isRateLimited ? 'Rate limited' : 'Request failed'}, retrying in ${retryDelay}ms (${retries} attempts left)`);
      await sleep(retryDelay);
      return makeRequestWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

// ========== CHECAGEM DE LINK (MELHORADA) ==========

async function checkUrlWithFallback(url) {
  try {
    // Adiciona opções de User-Agent para evitar ser bloqueado
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };
    
    // Tenta HEAD com retry
    try {
      const headResp = await makeRequestWithRetry(() => axios.head(url, {
        timeout: 15000,
        headers,
        validateStatus: s => s < 400,
        maxRedirects: 5
      }));
      return true; // Se passou, consideramos válido
    } catch (headError) {
      // 429 => rate limit; assumimos "talvez válido"
      if (headError?.response?.status === 429) {
        console.log(`[WARN] Rate-limited (HEAD) => Aceitando ${url} como possivelmente válido`);
        return true;
      }
      
      // Tenta GET se for HEAD não funcionou
      try {
        const getResp = await makeRequestWithRetry(() => axios.get(url, {
          timeout: 20000,
          headers,
          validateStatus: s => s < 400,
          maxRedirects: 5,
          responseType: 'stream' // Usar stream para não baixar o conteúdo inteiro
        }));
        
        // Interrompe o stream imediatamente após confirmar que a URL existe
        getResp.data.destroy();
        return true;
      } catch (getError) {
        if (getError?.response?.status === 429) {
          console.log(`[WARN] Rate-limited (GET) => Aceitando ${url} como possivelmente válido`);
          return true;
        }
        // Falhou no GET
        return false;
      }
    }
  } catch (err) {
    // Qualquer outra falha, consideramos inválido
    return false;
  }
}

async function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (!url.startsWith('http')) return false;
  
  try {
    const valid = await checkUrlWithFallback(url);
    return valid;
  } catch (err) {
    console.log(`[ERROR] Falha ao verificar URL ${url}: ${err.message}`);
    return false;
  }
}

// Função para extrair domínio de uma URL
function extractDomain(url) {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch {
    return '';
  }
}

// ========== FUNÇÕES PARA GERAR URLs ALTERNATIVAS ==========

/**
 * Gera URLs alternativas com base em padrões comuns para determinados domínios
 */
function generateAlternativeUrls(url) {
  try {
    const domain = extractDomain(url);
    const rootDomain = AUTHORIZED_WEBSITES.find(d => domain.includes(d));
    
    if (!rootDomain || !COMMON_URL_PATTERNS[rootDomain]) {
      return [];
    }
    
    const patterns = COMMON_URL_PATTERNS[rootDomain];
    const alternatives = [];
    
    for (const pattern of patterns) {
      if (pattern.original.test(url)) {
        const altUrl = url.replace(pattern.original, pattern.replacement);
        alternatives.push(altUrl);
      }
    }
    
    // Adiciona algumas substituições específicas para corbettmaths
    if (rootDomain === 'corbettmaths.com') {
      // Se tiver "pdf1" no nome, tenta com "pdf"
      if (url.includes('-pdf1.pdf')) {
        alternatives.push(url.replace('-pdf1.pdf', '-pdf.pdf'));
      }
      
      // Se tiver traço antes de pdf, tenta sem traço
      if (url.includes('-pdf.pdf')) {
        alternatives.push(url.replace('-pdf.pdf', '.pdf'));
      }
      
      // Tenta diferentes anos nos paths
      for (let year = 2013; year <= 2024; year++) {
        if (url.includes(`/${year}/`)) {
          for (let altYear = 2013; altYear <= 2024; altYear++) {
            if (altYear !== year) {
              alternatives.push(url.replace(`/${year}/`, `/${altYear}/`));
            }
          }
        }
      }
      
      // Tenta diferentes meses
      const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      for (const month of months) {
        if (url.includes(`/2013/${month}/`)) {
          alternatives.push(url.replace(`/2013/${month}/`, `/2013/02/`));
          alternatives.push(url.replace(`/2013/${month}/`, `/2018/11/`));
          alternatives.push(url.replace(`/2013/${month}/`, `/2019/09/`));
          alternatives.push(url.replace(`/2013/${month}/`, `/2020/04/`));
          alternatives.push(url.replace(`/2013/${month}/`, `/2021/02/`));
        }
      }
      
      // Alguns padrões específicos para os corbettmaths worksheets
      if (url.includes('types-of-numbers-pdf1.pdf')) {
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/02/Types-of-Number.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Types-of-Number.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Types-of-Number.pdf');
      }
      
      if (url.includes('prime-numbers-pdf1.pdf')) {
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2013/02/prime-numbers.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Prime-Numbers.pdf');
      }
      
      if (url.includes('square-numbers-pdf1.pdf')) {
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Square-Numbers.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Square-Numbers.pdf');
      }
      
      if (url.includes('cube-numbers-pdf1.pdf')) {
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Cube-Numbers.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Cube-Numbers.pdf');
      }
      
      if (url.includes('triangular-numbers-pdf2.pdf')) {
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Triangular-Numbers.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Triangular-Numbers.pdf');
      }
      
      if (url.includes('prime-factorisation-pdf.pdf')) {
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2013/02/prime-factorisation.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Prime-Factorisation.pdf');
        alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Prime-Factorisation.pdf');
      }
    }
    
    // Remove duplicatas
    return [...new Set(alternatives)];
  } catch (error) {
    console.log(`[ERROR] Falha ao gerar URLs alternativas: ${error.message}`);
    return [];
  }
}

/**
 * Tenta encontrar uma URL alternativa que funcione com base em padrões comuns
 */
async function findWorkingAlternativeUrl(url) {
  const alternatives = generateAlternativeUrls(url);
  
  console.log(`[INFO] Testando ${alternatives.length} URLs alternativas para ${url}`);
  
  for (const altUrl of alternatives) {
    try {
      const isValid = await isValidUrl(altUrl);
      if (isValid) {
        console.log(`[SUCCESS] Encontrada URL alternativa: ${altUrl}`);
        return altUrl;
      }
    } catch (error) {
      // Continua para a próxima alternativa
    }
  }
  
  return null;
}

// ========== FUNÇÕES DE SUGESTÃO VIA IA (MELHORADAS) ==========

/**
 * Função melhorada para verificar se a URL sugerida é válida e de domínio autorizado
 */
async function validateSuggestion(suggestion, originalUrl) {
  if (!suggestion || typeof suggestion !== 'string') return null;
  
  // Limpa a string (remove aspas, texto adicional, etc)
  let cleanUrl = suggestion.trim();
  
  // Tenta extrair apenas a URL se houver texto adicional
  const urlMatch = cleanUrl.match(/https?:\/\/[^\s"'<>]+/);
  if (urlMatch) {
    cleanUrl = urlMatch[0];
  }
  
  // Remove qualquer trecho após o primeiro espaço
  cleanUrl = cleanUrl.split(' ')[0];
  
  // Verifica se é uma URL bem formada
  try {
    new URL(cleanUrl);
  } catch {
    console.log(`[INFO] Sugestão inválida (não é URL): ${cleanUrl}`);
    return null;
  }
  
  // Verifica se o domínio está autorizado
  const domain = extractDomain(cleanUrl);
  const isDomainAuthorized = AUTHORIZED_WEBSITES.some(authDomain => 
    domain === authDomain || domain.endsWith(`.${authDomain}`)
  );
  
  if (!isDomainAuthorized) {
    console.log(`[INFO] Domínio não autorizado: ${domain}`);
    return null;
  }
  
  // Não aceitamos a mesma URL que está quebrada
  if (cleanUrl === originalUrl) {
    console.log(`[INFO] URL sugerida é igual à original quebrada`);
    return null;
  }
  
  // Verifica se a URL está funcionando
  const isWorking = await isValidUrl(cleanUrl);
  if (!isWorking) {
    console.log(`[INFO] URL sugerida não está funcionando: ${cleanUrl}`);
    return null;
  }
  
  return cleanUrl;
}

// Função para filtrar e limpar a resposta da IA
function extractUrlFromResponse(response) {
  if (!response) return null;
  
  // Remove linhas de quebra, tabs, etc
  response = response.replace(/[\r\n\t]/g, ' ').trim();
  
  // Remover prefixos comuns
  response = response.replace(/^.*?(https?:\/\/)/i, 'https://');
  
  // Remover texto após a URL
  response = response.replace(/(\S+\.\S+\/[^\s'"]*)[^\S\r\n]*.*$/i, '$1');
  
  // Se ainda não parece ser uma URL, tenta extrair com regex
  if (!/^https?:\/\//i.test(response)) {
    const match = response.match(/https?:\/\/[^\s"'<>]+/i);
    return match ? match[0] : null;
  }
  
  return response;
}

async function findGeminiSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!GOOGLE_GEMINI_API_KEY) return null;

  try {
    const promptText = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Esta URL específica está quebrada: ${originalUrl}
      
      Dados do recurso:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Analise o formato e estrutura da URL quebrada. Encontre uma URL de substituição que seja válida e esteja funcionando neste momento.
      
      Use APENAS os domínios autorizados: ${AUTHORIZED_WEBSITES.join(', ')}
      
      IMPORTANTE: 
      1. Se puder, mantenha o mesmo domínio da URL original.
      2. Para sites como corbettmaths.com, alguns PDFs foram movidos para anos ou meses diferentes no path (como /2018/ ou /2019/ em vez de /2013/).
      3. Retorne APENAS a URL completa, sem qualquer texto adicional.
      4. A URL deve começar com http:// ou https://
      
      URL de substituição:
    `;
    
    const resp = await makeRequestWithRetry(() => axios.post(
      `${GOOGLE_GEMINI_API_URL}?key=${GOOGLE_GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 100
        }
      },
      { 
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': GOOGLE_GEMINI_API_KEY
        } 
      }
    ));
    
    const output = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    
    if (!output || output.toLowerCase() === 'none' || output.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(output);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Gemini] Erro: ${err.message}`);
    return null;
  }
}

async function findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!OPENAI_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Esta URL específica está quebrada: ${originalUrl}
      
      Dados do recurso:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Analise o formato e estrutura da URL quebrada. Encontre uma URL de substituição que seja válida e esteja funcionando neste momento.
      
      Use APENAS os domínios autorizados: ${AUTHORIZED_WEBSITES.join(', ')}
      
      IMPORTANTE: 
      1. Se puder, mantenha o mesmo domínio da URL original.
      2. Para sites como corbettmaths.com, alguns PDFs foram movidos para anos ou meses diferentes no path (como /2018/ ou /2019/ em vez de /2013/).
      3. Retorne APENAS a URL completa, sem qualquer texto adicional.
      4. A URL deve começar com http:// ou https://
    `;
    
    const resp = await makeRequestWithRetry(() => axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o', // Modelo mais recente
        messages: [
          { role: 'system', content: 'Você é um assistente especializado em recursos educacionais matemáticos. Responda apenas com a URL de substituição ou "NONE".' },
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
    ));
    
    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    
    if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[OpenAI] Erro: ${err.message}`);
    return null;
  }
}

async function findAnthropicSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!ANTHROPIC_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Esta URL específica está quebrada: ${originalUrl}
      
      Dados do recurso:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Analise o formato e estrutura da URL quebrada. Encontre uma URL de substituição que seja válida e esteja funcionando neste momento.
      
      Use APENAS os domínios autorizados: ${AUTHORIZED_WEBSITES.join(', ')}
      
      IMPORTANTE: 
      1. Se puder, mantenha o mesmo domínio da URL original.
      2. Para sites como corbettmaths.com, alguns PDFs foram movidos para anos ou meses diferentes no path (como /2018/ ou /2019/ em vez de /2013/).
      3. Retorne APENAS a URL completa, sem qualquer texto adicional.
      4. A URL deve começar com http:// ou https://
      
      Responda apenas com a URL ou "NONE".
    `;
    
    const resp = await makeRequestWithRetry(() => axios.post(
      ANTHROPIC_API_URL,
      {
        model: 'claude-3-haiku-20240307',
        max_tokens: 100,
        temperature: 0.1,
        messages: [
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    ));
    
    const content = resp.data?.content?.[0]?.text?.trim() || '';
    
    if (!content || content.toLowerCase() === 'none' || content.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(content);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Anthropic] Erro: ${err.message}`);
    return null;
  }
}

// Versão alternativa usando a API do Claude
async function findClaudeSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!CLAUDE_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Esta URL específica está quebrada: ${originalUrl}
      
      Dados do recurso:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Analise o formato e estrutura da URL quebrada. Encontre uma URL de substituição que seja válida e esteja funcionando neste momento.
      
      Use APENAS os domínios autorizados: ${AUTHORIZED_WEBSITES.join(', ')}
      
      IMPORTANTE: 
      1. Se puder, mantenha o mesmo domínio da URL original.
      2. Para sites como corbettmaths.com, alguns PDFs foram movidos para anos ou meses diferentes no path (como /2018/ ou /2019/ em vez de /2013/).
      3. Retorne APENAS a URL completa, sem qualquer texto adicional.
      4. A URL deve começar com http:// ou https://
      
      Responda apenas com a URL ou "NONE".
    `;
    
    const resp = await makeRequestWithRetry(() => axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-opus-20240229',
        max_tokens: 100,
        temperature: 0.1,
        messages: [
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    ));
    
    // Ajuste o parsing da resposta de acordo com a API exata do Claude
    const content = resp.data?.content || resp.data?.completion || '';
    
    if (!content || content.toLowerCase() === 'none' || content.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(content);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Claude] Erro: ${err.message}`);
    return null;
  }
}

// Adicionando Mistral como opção alternativa
async function findMistralSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!MISTRAL_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Esta URL específica está quebrada: ${originalUrl}
      
      Dados do recurso:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Analise o formato e estrutura da URL quebrada. Encontre uma URL de substituição que seja válida e esteja funcionando neste momento.
      
      Use APENAS os domínios autorizados: ${AUTHORIZED_WEBSITES.join(', ')}
      
      IMPORTANTE: 
      1. Se puder, mantenha o mesmo domínio da URL original.
      2. Para sites como corbettmaths.com, alguns PDFs foram movidos para anos ou meses diferentes no path (como /2018/ ou /2019/ em vez de /2013/).
      3. Retorne APENAS a URL completa, sem qualquer texto adicional.
      4. A URL deve começar com http:// ou https://
    `;
    
    const resp = await makeRequestWithRetry(() => axios.post(
      MISTRAL_API_URL,
      {
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: 'Você é um assistente especializado em recursos educacionais matemáticos. Responda apenas com a URL de substituição ou "NONE".' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 100
      },
      {
        headers: {
          'Authorization': `Bearer ${MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    ));
    
    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    
    if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Mistral] Erro: ${err.message}`);
    return null;
  }
}

/**
 * Função principal para encontrar alternativas - primeiro tenta padrões, depois IA
 */
async function findAlternativeUrl(url, title, type, topic, subtopic, source) {
  console.log(`[INFO] Procurando alternativa para: ${url}`);
  
  // 1. Primeiro tentamos padrões conhecidos (muito mais rápido e sem rate limit)
  const patternBasedUrl = await findWorkingAlternativeUrl(url);
  if (patternBasedUrl) {
    return { provider: 'PatternMatching', url: patternBasedUrl };
  }
  
  // 2. Se os padrões falharem, tente IA em cascata
  return cascadeSuggester(title, type, topic, subtopic, source, url);
}

/**
 * Cascade de sugestões com retry e distribuição de carga inteligente
 */
async function cascadeSuggester(title, type, topic, subtopic, source, originalUrl) {
  // Distribuição inteligente de carga: usa diferentes modelos para diferentes sites/tipos
  const domain = extractDomain(originalUrl);
  
  // 1) Primeiro tente o modelo mais apropriado para o tipo de conteúdo
  if (domain.includes('corbettmaths.com')) {
    // OpenAI tende a ser bom com CorbettMaths
    if (OPENAI_API_KEY) {
      console.log('[INFO] Tentando OpenAI primeiro por ser CorbettMaths...');
      const o = await findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl);
      if (o) return { provider: 'OpenAI', url: o };
    }
  }
  
  // 2) Agora seguimos uma ordem normal de cascata
  
  // Gemini (com retry para lidar com rate limits)
  if (GOOGLE_GEMINI_API_KEY) {
    console.log('[INFO] Tentando Gemini...');
    try {
      const g = await findGeminiSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (g) return { provider: 'Gemini', url: g };
    } catch (err) {
      console.log(`[INFO] Gemini falhou. Tentando próxima opção...`);
    }
  }

  // OpenAI (se ainda não foi tentado)
  if (OPENAI_API_KEY && !domain.includes('corbettmaths.com')) {
    console.log('[INFO] Tentando OpenAI...');
    try {
      const o = await findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl);
      if (o) return { provider: 'OpenAI', url: o };
    } catch (err) {
      console.log(`[INFO] OpenAI falhou. Tentando próxima opção...`);
    }
  }

  // Anthropic API (com fallback para Claude API)
  if (ANTHROPIC_API_KEY) {
    console.log('[INFO] Tentando Anthropic...');
    try {
      const a = await findAnthropicSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (a) return { provider: 'Anthropic', url: a };
    } catch (err) {
      console.log(`[INFO] Anthropic falhou. Tentando próxima opção...`);
    }
  } else if (CLAUDE_API_KEY) {
    console.log('[INFO] Tentando Claude API...');
    try {
      const c = await findClaudeSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (c) return { provider: 'Claude', url: c };
    } catch (err) {
      console.log(`[INFO] Claude falhou. Tentando próxima opção...`);
    }
  }

  // Mistral como última opção
  if (MISTRAL_API_KEY) {
    console.log('[INFO] Tentando Mistral...');
    try {
      const m = await findMistralSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (m) return { provider: 'Mistral', url: m };
    } catch (err) {
      console.log(`[INFO] Mistral falhou.`);
    }
  }

  console.log('[INFO] Todas as opções falharam. Sem sugestão.');
  return null;
}

// Função para atualizar o arquivo de recursos com as substituições encontradas
async function updateResourcesFile(brokenLinks) {
  let fileContent = fs.readFileSync(resourcesFilePath, 'utf8');
  let fixedCount = 0;
  
  for (const link of brokenLinks) {
    if (link.suggestion) {
      try {
        // Obtém contexto suficiente em torno da URL
        const searchIndex = fileContent.indexOf(link.url);
        if (searchIndex !== -1) {
          const before = fileContent.substring(Math.max(0, searchIndex - 50), searchIndex);
          const after = fileContent.substring(searchIndex + link.url.length, Math.min(fileContent.length, searchIndex + link.url.length + 50));
          
          // Verifica se faz parte de uma propriedade url:
          if (before.includes('url:') || before.includes('url =') || before.includes('url=')) {
            // Substituição
            fileContent = fileContent.replace(link.url, link.suggestion);
            fixedCount++;
            console.log(`[SUCCESS] Link corrigido: ${link.url} -> ${link.suggestion} (via ${link.suggestionProvider})`);
          }
        }
      } catch (err) {
        console.log(`[ERROR] Falha ao substituir link: ${err.message}`);
      }
    }
  }
  
  if (fixedCount > 0) {
    fs.writeFileSync(resourcesFilePath, fileContent, 'utf8');
    console.log(`[INFO] Arquivo de recursos atualizado com ${fixedCount} correções`);
  }
  
  return fixedCount;
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

  // Localiza propriedades "url: '...'".
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
          } else if (prop.key?.name === 'topic' && prop.value?.type === 'StringLiteral') {
            topic = prop.value.value;
          } else if (prop.key?.name === 'subtopic' && prop.value?.type === 'StringLiteral') {
            subtopic = prop.value.value;
          }
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
          suggestion: null,  // Será atualizado se encontrarmos uma alternativa
          suggestionProvider: null
        });
      }
    }
  });

  console.log(`[INFO] Total de links encontrados: ${totalLinks}`);

  // Vamos verificar cada link com limite de paralelismo para evitar sobrecarregar
  const limit = pLimit(3); // Reduzido para 3 para minimizar rate limits

  const tasks = brokenLinksData.map(item =>
    limit(async () => {
      const valid = await isValidUrl(item.url);
      if (!valid) {
        item.isBroken = true;
        console.log(`\n[WARN] Link quebrado: ${item.url} (Linha: ${item.line}, Título: ${item.title})`);

        // Tenta encontrar uma alternativa
        const alternativeResult = await findAlternativeUrl(
          item.url,
          item.title,
          item.type,
          item.topic,
          item.subtopic,
          item.source
        );
        
        if (alternativeResult?.url) {
          item.suggestion = alternativeResult.url;
          item.suggestionProvider = alternativeResult.provider;
          console.log(`[INFO] Alternativa encontrada: ${alternativeResult.url} (via ${alternativeResult.provider})`);
          
          // Verifica novamente se a URL sugerida está funcionando
          const isSuggestionValid = await isValidUrl(alternativeResult.url);
          if (!isSuggestionValid) {
            console.log(`[WARN] URL sugerida inválida: ${alternativeResult.url}`);
            item.suggestion = null;
            item.suggestionProvider = null;
          }
        } else {
          console.log('[INFO] Nenhuma alternativa encontrada.');
        }
      }
    })
  );

  await Promise.all(tasks);

  // Filtra só os realmente quebrados
  const onlyBroken = brokenLinksData.filter(x => x.isBroken);
  
  // Atualiza o arquivo de recursos com as substituições
  const fixedCount = await updateResourcesFile(onlyBroken);

  // Gera relatório final
  const report = {
    totalLinks,
    brokenLinks: onlyBroken.length,
    fixedLinks: fixedCount,
    brokenLinksData: onlyBroken.map(link => ({
      url: link.url,
      title: link.title,
      type: link.type,
      line: link.line,
      suggestion: link.suggestion,
      suggestionProvider: link.suggestionProvider
    }))
  };

  fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n=== FINALIZADO ===`);
  console.log(`- Total links: ${totalLinks}`);
  console.log(`- Links quebrados: ${onlyBroken.length}`);
  console.log(`- Links corrigidos: ${fixedCount}`);
  console.log(`Relatório completo em: ${reportFilePath}`);
}

// Executa
main().catch(err => {
  console.error(`[ERROR] Falha no script principal: ${err.message}`);
  process.exit(1);
});
