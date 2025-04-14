/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const pLimit = require('p-limit');

/**
 * Configuração de chaves de API para os modelos de IA
 */
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API || null;
const DEEPSEEK_API_KEY      = process.env.DEEPSEEK_API_KEY  || null;
const QWEN_API_KEY          = process.env.QWEN_API          || null;
const OPENAI_API_KEY        = process.env.OPENAI_API_KEY    || null;
const ANTHROPIC_API_KEY     = process.env.ANTHROPIC_API_KEY || null; // Adicionado Anthropic como backup

// Endpoints para cada IA (atualizados para os mais recentes)
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const DEEPSEEK_API_URL      = 'https://api.deepseek.com/v1/chat/completions';
const QWEN_API_URL          = 'https://api.qwen.ai/v1/chat/completions';
const OPENAI_API_URL        = 'https://api.openai.com/v1/chat/completions';
const ANTHROPIC_API_URL     = 'https://api.anthropic.com/v1/messages';

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

// Arquivo que contém seus recursos
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');

// Local onde salvaremos o relatório final
const reportFilePath = path.resolve(__dirname, 'link-check-stats.json');

// ========== CHECAGEM DE LINK (MELHORADA) ==========

async function checkUrlWithFallback(url) {
  try {
    // Adiciona opções de User-Agent para evitar ser bloqueado
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };
    
    // Tenta HEAD com retry e timeout aumentado
    const headResp = await axios.head(url, {
      timeout: 15000,
      headers,
      validateStatus: s => s < 400,
      maxRedirects: 5
    });
    return true; // Se passou, consideramos válido
  } catch (headError) {
    // 429 => rate limit; assumimos "talvez válido"
    if (headError?.response?.status === 429) {
      console.log(`[WARN] Rate-limited (HEAD) => Aceitando ${url} como possivelmente válido`);
      return true;
    }
    
    // Tenta GET se for 405, 403, 406 ou outros códigos comuns que rejeitam HEAD
    if ([405, 403, 406, 301, 302, 307, 308].includes(headError?.response?.status)) {
      try {
        const headers = {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        };
        
        const getResp = await axios.get(url, {
          timeout: 20000,
          headers,
          validateStatus: s => s < 400,
          maxRedirects: 5
        });
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

// ========== FUNÇÕES DE "SUGESTÃO" VIA IA (MELHORADAS) ==========

/**
 * Função melhorada para verificar se a URL sugerida é válida e de domínio autorizado
 */
async function validateSuggestion(suggestion) {
  if (!suggestion || typeof suggestion !== 'string') return null;
  
  // Limpa a string (remove aspas, texto adicional, etc)
  let cleanUrl = suggestion.trim();
  
  // Tenta extrair apenas a URL se houver texto adicional
  const urlMatch = cleanUrl.match(/https?:\/\/[^\s"'<>]+/);
  if (urlMatch) {
    cleanUrl = urlMatch[0];
  }
  
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
  
  // Remover prefixos e sufixos comuns
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

async function findGeminiSuggestion(title, type, topic, subtopic, source) {
  if (!GOOGLE_GEMINI_API_KEY) return null;

  try {
    const promptText = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Um recurso educacional está quebrado e precisa ser substituído:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Encontre e forneça uma URL funcional que substitua este recurso, utilizando apenas os domínios autorizados:
      ${AUTHORIZED_WEBSITES.join(', ')}
      
      Regras importantes:
      1. Retorne APENAS a URL completa, sem qualquer texto adicional
      2. A URL deve começar com http:// ou https://
      3. Se não encontrar nenhuma substituição adequada, retorne apenas "NONE"
      4. Priorize recursos do mesmo tipo e sobre o mesmo tópico
      5. Para vídeos do YouTube, certifique-se de que são de canais confiáveis de educação
      
      URL de substituição:
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
    
    if (!output || output.toLowerCase() === 'none' || output.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(output);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Gemini] Erro: ${err.message}`);
    return null;
  }
}

async function findDeepSeekSuggestion(title, type, topic, subtopic, source) {
  if (!DEEPSEEK_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Um recurso educacional está quebrado e precisa ser substituído:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Encontre e forneça uma URL funcional que substitua este recurso, utilizando apenas os domínios autorizados:
      ${AUTHORIZED_WEBSITES.join(', ')}
      
      Regras importantes:
      1. Retorne APENAS a URL completa, sem qualquer texto adicional
      2. A URL deve começar com http:// ou https://
      3. Se não encontrar nenhuma substituição adequada, retorne apenas "NONE"
      4. Priorize recursos do mesmo tipo e sobre o mesmo tópico
      5. Para vídeos do YouTube, certifique-se de que são de canais confiáveis de educação
    `;
    
    const resp = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat', // Modelo atualizado
        messages: [
          { role: 'system', content: 'Você é um assistente especializado em recursos educacionais. Responda apenas com a URL ou "NONE".' },
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
    
    if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[DeepSeek] Erro: ${err.message}`);
    return null;
  }
}

async function findQwenSuggestion(title, type, topic, subtopic, source) {
  if (!QWEN_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Um recurso educacional está quebrado e precisa ser substituído:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Encontre e forneça uma URL funcional que substitua este recurso, utilizando apenas os domínios autorizados:
      ${AUTHORIZED_WEBSITES.join(', ')}
      
      Regras importantes:
      1. Retorne APENAS a URL completa, sem qualquer texto adicional
      2. A URL deve começar com http:// ou https://
      3. Se não encontrar nenhuma substituição adequada, retorne apenas "NONE"
      4. Priorize recursos do mesmo tipo e sobre o mesmo tópico
      5. Para vídeos do YouTube, certifique-se de que são de canais confiáveis de educação
    `;
    
    const resp = await axios.post(
      QWEN_API_URL,
      {
        model: 'qwen-turbo', // Modelo atualizado
        messages: [
          { role: 'system', content: 'Você é um assistente especializado em recursos educacionais. Responda apenas com a URL ou "NONE".' },
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
    
    const output = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    
    if (!output || output.toLowerCase() === 'none' || output.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(output);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Qwen] Erro: ${err.message}`);
    return null;
  }
}

async function findOpenAISuggestion(title, type, topic, subtopic, source) {
  if (!OPENAI_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Um recurso educacional está quebrado e precisa ser substituído:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Encontre e forneça uma URL funcional que substitua este recurso, utilizando apenas os domínios autorizados:
      ${AUTHORIZED_WEBSITES.join(', ')}
      
      Regras importantes:
      1. Retorne APENAS a URL completa, sem qualquer texto adicional
      2. A URL deve começar com http:// ou https://
      3. Se não encontrar nenhuma substituição adequada, retorne apenas "NONE"
      4. Priorize recursos do mesmo tipo e sobre o mesmo tópico
      5. Para vídeos do YouTube, certifique-se de que são de canais confiáveis de educação
    `;
    
    const resp = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o', // Modelo atualizado para o mais recente
        messages: [
          { role: 'system', content: 'Você é um assistente especializado em recursos educacionais. Responda apenas com a URL ou "NONE".' },
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
    
    if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[OpenAI] Erro: ${err.message}`);
    return null;
  }
}

// Adicionado Anthropic Claude como opção adicional
async function findAnthropicSuggestion(title, type, topic, subtopic, source) {
  if (!ANTHROPIC_API_KEY) return null;
  try {
    const prompt = `
      Você é um especialista em recursos educacionais matemáticos.
      
      Um recurso educacional está quebrado e precisa ser substituído:
      - Título: "${title}"
      - Tipo: "${type}" 
      - Tópico: ${topic}
      - Subtópico: ${subtopic}
      - Fonte original: ${source}
      
      Encontre e forneça uma URL funcional que substitua este recurso, utilizando apenas os domínios autorizados:
      ${AUTHORIZED_WEBSITES.join(', ')}
      
      Regras importantes:
      1. Retorne APENAS a URL completa, sem qualquer texto adicional
      2. A URL deve começar com http:// ou https://
      3. Se não encontrar nenhuma substituição adequada, retorne apenas "NONE"
      4. Priorize recursos do mesmo tipo e sobre o mesmo tópico
      5. Para vídeos do YouTube, certifique-se de que são de canais confiáveis de educação
      
      Responda apenas com a URL ou "NONE".
    `;
    
    const resp = await axios.post(
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
    );
    
    const content = resp.data?.content?.[0]?.text?.trim() || '';
    
    if (!content || content.toLowerCase() === 'none' || content.toLowerCase().includes('none')) return null;
    
    const extractedUrl = extractUrlFromResponse(content);
    if (!extractedUrl) return null;
    
    const validatedUrl = await validateSuggestion(extractedUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Anthropic] Erro: ${err.message}`);
    return null;
  }
}

/**
 * Cascade de sugestões: Tenta todos os modelos disponíveis em sequência
 */
async function cascadeSuggester(title, type, topic, subtopic, source) {
  // 1) Gemini (geralmente tem bom conhecimento da web)
  const g = await findGeminiSuggestion(title, type, topic, subtopic, source);
  if (g) return { provider: 'Gemini', url: g };

  // 2) OpenAI (geralmente tem bom conhecimento da web)
  console.log('[INFO] Gemini falhou. Tentando OpenAI...');
  const o = await findOpenAISuggestion(title, type, topic, subtopic, source);
  if (o) return { provider: 'OpenAI', url: o };

  // 3) Anthropic (geralmente tem bom conhecimento da web)
  console.log('[INFO] OpenAI falhou. Tentando Anthropic...');
  const a = await findAnthropicSuggestion(title, type, topic, subtopic, source);
  if (a) return { provider: 'Anthropic', url: a };

  // 4) DeepSeek
  console.log('[INFO] Anthropic falhou. Tentando DeepSeek...');
  const d = await findDeepSeekSuggestion(title, type, topic, subtopic, source);
  if (d) return { provider: 'DeepSeek', url: d };

  // 5) Qwen (deixamos por último pois geralmente tem conhecimento mais limitado da web)
  console.log('[INFO] DeepSeek falhou. Tentando Qwen...');
  const q = await findQwenSuggestion(title, type, topic, subtopic, source);
  if (q) return { provider: 'Qwen', url: q };

  console.log('[INFO] Todas as IA falharam. Sem sugestão.');
  return null;
}

// Função para atualizar o arquivo de recursos com as substituições encontradas
async function updateResourcesFile(brokenLinks) {
  let fileContent = fs.readFileSync(resourcesFilePath, 'utf8');
  let fixedCount = 0;
  
  for (const link of brokenLinks) {
    if (link.suggestion) {
      try {
        // Obtém 10 caracteres antes e depois da URL para ter contexto suficiente
        const searchIndex = fileContent.indexOf(link.url);
        if (searchIndex !== -1) {
          const before = fileContent.substring(Math.max(0, searchIndex - 30), searchIndex);
          const after = fileContent.substring(searchIndex + link.url.length, Math.min(fileContent.length, searchIndex + link.url.length + 30));
          
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

        // Perguntar à cascata de IAs
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
          
          // Verifica se a URL sugerida está funcionando
          const isSuggestionValid = await isValidUrl(suggestionResult.url);
          if (!isSuggestionValid) {
            console.log(`[WARN] URL sugerida inválida: ${suggestionResult.url}`);
            item.suggestion = null;
            item.suggestionProvider = null;
          }
        } else {
          console.log('[INFO] Nenhuma sugestão de IA disponível.');
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
