/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

// Retry settings - increased and with exponential backoff
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY_MS = 2000;
const MAX_RETRY_DELAY_MS = 30000;

/**
 * API key configuration for AI models
 */
const GOOGLE_GEMINI_API    = process.env.GOOGLE_GEMINI_API    || null;
const OPENAI_API_KEY       = process.env.OPENAI_API_KEY       || null;
const DEEPSEEK_API_KEY     = process.env.DEEPSEEK_API_KEY     || null; // Replaces Anthropic
const CLAUDE_API           = process.env.CLAUDE_API           || null;
const QWEN_API             = process.env.QWEN_API             || null; // Replaces Mistral
const QWEN_API_2           = process.env.QWEN_API_2           || null; // Additional option

// ===== MODELOS DE IA ATUALIZADOS =====
const MODELS = {
  CLAUDE: 'claude-3-5-sonnet-2024-10-22', // Claude 3.5 Sonnet
  GEMINI: 'gemini-1.5-flash-latest',      // Gemini Flash (ou gemini-1.5-pro-latest se preferir)
  OPENAI: 'gpt-4o',                       // OpenAI GPT-4o
  DEEPSEEK: 'deepseek-chat',              // DeepSeek Chat
  QWEN: 'qwen-max'                        // Qwen Max
};

// API endpoints for generative AI providers
const GOOGLE_GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.GEMINI}:generateContent`;
const OPENAI_API_URL        = 'https://api.openai.com/v1/chat/completions';
const DEEPSEEK_API_URL      = 'https://api.deepseek.com/v1/chat/completions';
const CLAUDE_API_URL        = 'https://api.anthropic.com/v1/messages';
const QWEN_API_URL          = 'https://api.qwen.ai/v1/chat/completions';
const QWEN_API_2_URL        = 'https://api.qwen.ai/v2/chat/completions';

// Authorized domains
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

// Common URL patterns for quick fixes
const COMMON_URL_PATTERNS = {
  'corbettmaths.com': [
    {
      original: /-pdf1.pdf/,
      replacement: '-pdf.pdf'
    },
    {
      original: /-pdf2.pdf/,
      replacement: '-pdf.pdf'
    },
    {
      // Older files might have moved to newer years
      original: /\/uploads\/2013\/02\//,
      replacement: '/uploads/2018/11/'
    },
    {
      original: /\/uploads\/2019\/09\//,
      replacement: '/uploads/2021/09/'
    }
  ]
};

// File containing your resources
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');
// Location for saving the final report
const reportFilePath = path.resolve(__dirname, 'link-check-stats.json');
// Backup file
const backupFilePath = path.resolve(__dirname, '../src/data/externalResources-backup.ts');

// ========== TEST MODE ==========
const args = process.argv.slice(2);
const TEST_MODE = args.includes('--test') || args.includes('-t');
const LINKS_LIMIT = args.find(arg => arg.startsWith('--limit='))?.split('=')[1] || (TEST_MODE ? 5 : null);

if (TEST_MODE) {
  console.log('[INFO] Running in TEST MODE - no real HTTP requests will be made');
}

/**
 * Sleep function to implement delays
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function to make requests with exponential backoff retry
 */
async function makeRequestWithRetry(fn, retries = MAX_RETRIES) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      const isRateLimited = error?.response?.status === 429;
      // Exponential backoff with jitter
      const exponentialDelay = Math.min(
        INITIAL_RETRY_DELAY_MS * Math.pow(2, MAX_RETRIES - retries),
        MAX_RETRY_DELAY_MS
      );
      // Add random jitter (±20%)
      const jitter = exponentialDelay * (0.8 + Math.random() * 0.4);
      const retryDelay = isRateLimited ? jitter : INITIAL_RETRY_DELAY_MS;

      console.log(
        `[RETRY] ${isRateLimited ? 'Rate limited' : 'Request failed'}, ` +
          `retrying in ${Math.round(retryDelay)}ms (${retries} attempts left)`
      );

      await sleep(retryDelay);
      return makeRequestWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

// Create a backup of the resources file before modifications
function backupResourcesFile() {
  try {
    fs.copyFileSync(resourcesFilePath, backupFilePath);
    console.log(`[INFO] Created backup at ${backupFilePath}`);
  } catch (err) {
    console.error(`[ERROR] Failed to create backup: ${err.message}`);
  }
}

// Função robusta para checagem de links
async function checkUrlWithFallback(url, type = '') {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  };
  let brokenReason = '';

  // 1. PDFs
  if (url.toLowerCase().endsWith('.pdf') || type === 'pdf') {
    try {
      const resp = await makeRequestWithRetry(() =>
        axios.get(url, {
          timeout: 20000,
          headers: { ...headers, 'Range': 'bytes=0-2047' },
          responseType: 'arraybuffer',
          validateStatus: s => s < 400,
          maxRedirects: 5
        })
      );
      const data = resp.data;
      const asString = Buffer.from(data).toString('utf8');
      if (asString.startsWith('%PDF-')) {
        return { valid: true };
      }
      if (asString.toLowerCase().includes('<html')) {
        brokenReason = 'Returned HTML instead of PDF';
        return { valid: false, brokenReason };
      }
      brokenReason = 'PDF signature not found';
      return { valid: false, brokenReason };
    } catch (err) {
      brokenReason = `PDF request failed: ${err.message}`;
      return { valid: false, brokenReason };
    }
  }

  // 2. YouTube (watch ou embed)
  if (/youtube\.com\/(watch|embed)|youtu\.be\//.test(url) || type === 'video') {
    try {
      const resp = await makeRequestWithRetry(() =>
        axios.get(url, {
          timeout: 20000,
          headers,
          responseType: 'text',
          validateStatus: s => s < 400,
          maxRedirects: 5
        })
      );
      const html = resp.data.toString();
      if (/Video unavailable|This video is private|404 Not Found|has been removed|not available|Sign in to confirm your age|watch this video on YouTube|content is not available/.test(html)) {
        brokenReason = 'YouTube: Video unavailable/private/removed';
        return { valid: false, brokenReason };
      }
      // Se não encontrou erro, considera válido
      return { valid: true };
    } catch (err) {
      brokenReason = `YouTube request failed: ${err.message}`;
      return { valid: false, brokenReason };
    }
  }

  // 3. Outros vídeos (Vimeo, etc)
  if (/\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url) || (type && type.toLowerCase().includes('video'))) {
    try {
      const resp = await makeRequestWithRetry(() =>
        axios.head(url, {
          timeout: 15000,
          headers,
          validateStatus: s => s < 400,
          maxRedirects: 5
        })
      );
      const ct = resp.headers['content-type'] || '';
      if (ct.startsWith('video/') || ct === 'application/octet-stream') {
        return { valid: true };
      }
      if (ct.includes('text/html')) {
        brokenReason = 'Returned HTML instead of video';
        return { valid: false, brokenReason };
      }
      brokenReason = `Unexpected content-type for video: ${ct}`;
      return { valid: false, brokenReason };
    } catch (err) {
      brokenReason = `Video request failed: ${err.message}`;
      return { valid: false, brokenReason };
    }
  }

  // 4. Demais links (espera-se HTML, mas pode ser erro)
  try {
    // HEAD primeiro
    let resp;
    try {
      resp = await makeRequestWithRetry(() =>
        axios.head(url, {
          timeout: 15000,
          headers,
          validateStatus: s => s < 400,
          maxRedirects: 5
        })
      );
    } catch (err) {
      // Se HEAD falhar, tenta GET
      try {
        resp = await makeRequestWithRetry(() =>
          axios.get(url, {
            timeout: 20000,
            headers,
            responseType: 'text',
            validateStatus: s => s < 400,
            maxRedirects: 5
          })
        );
      } catch (err2) {
        brokenReason = `Request failed: ${err2.message}`;
        return { valid: false, brokenReason };
      }
    }
    // Se for HTML, checa se tem mensagem de erro
    const ct = resp.headers['content-type'] || '';
    if (ct.includes('text/html')) {
      // Baixa um trecho do HTML para procurar mensagens de erro
      try {
        const htmlResp = await makeRequestWithRetry(() =>
          axios.get(url, {
            timeout: 10000,
            headers,
            responseType: 'text',
            validateStatus: s => s < 400,
            maxRedirects: 5
          })
        );
        const html = htmlResp.data.toString().toLowerCase();
        if (/not found|404|error|unavailable|page not found|does not exist|forbidden|private|gone|removed/.test(html)) {
          brokenReason = 'HTML page contains error message';
          return { valid: false, brokenReason };
        }
      } catch (err) {
        // Se não conseguir baixar, ignora
      }
    }
    // Se chegou aqui, considera válido
    return { valid: true };
  } catch (err) {
    brokenReason = `General request failed: ${err.message}`;
    return { valid: false, brokenReason };
  }
}

// Nova versão de isValidUrl
async function isValidUrl(url, type = '') {
  if (!url || typeof url !== 'string') return { valid: false, brokenReason: 'Invalid URL string' };
  if (!url.startsWith('http')) return { valid: false, brokenReason: 'Not HTTP/HTTPS' };

  if (TEST_MODE) {
    // Simular alguns links quebrados para teste
    const mockBrokenLinks = [
      'https://corbettmaths.com/wp-content/uploads/2013/02/square-numbers-pdf1.pdf',
      'https://corbettmaths.com/wp-content/uploads/2013/02/types-of-numbers-pdf1.pdf',
      'https://corbettmaths.com/wp-content/uploads/2019/09/Irrational-and-Rational-Numbers.pdf',
      'https://www.draustinmaths.com/_files/ugd/7ac124_1548f69d09d94b80824a05fcaba64a2e.pdf'
    ];
    return { valid: !mockBrokenLinks.includes(url), brokenReason: mockBrokenLinks.includes(url) ? 'Simulated broken (test mode)' : undefined };
  }

  return await checkUrlWithFallback(url, type);
}

// Extract domain from URL
function extractDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

/**
 * Generates alternative URLs based on common patterns for certain domains
 */
function generateAlternativeUrls(url) {
  try {
    const domain = extractDomain(url);
    const rootDomain = AUTHORIZED_WEBSITES.find(d => domain.includes(d));
    if (!rootDomain || !COMMON_URL_PATTERNS[rootDomain]) {
      return [];
    }
    
    const patterns = COMMON_URL_PATTERNS[rootDomain];
    let alternatives = [];

    // Apply each pattern
    for (const pattern of patterns) {
      if (pattern.original.test(url)) {
        alternatives.push(url.replace(pattern.original, pattern.replacement));
      }
    }
    
    // For Corbett Maths, try multiple years
    if (domain.includes('corbettmaths.com')) {
      const years = ['2018', '2019', '2020', '2021', '2022'];
      const baseUrl = url.replace(/\/uploads\/\d{4}\//, '/uploads/YEAR/');
      
      for (const year of years) {
        alternatives.push(baseUrl.replace('YEAR', year));
      }
      
      // Also try with different months
      const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      for (const month of months) {
        alternatives.push(url.replace(/\/\d{2}\//, `/${month}/`));
      }
    }
    
    // Remove duplicates
    return [...new Set(alternatives)];
  } catch (error) {
    console.log(`[ERROR] Failed to generate alternative URLs: ${error.message}`);
    return [];
  }
}

async function findWorkingAlternativeUrl(url) {
  const alternatives = generateAlternativeUrls(url);
  console.log(`[INFO] Testing ${alternatives.length} alternative URLs for ${url}`);
  
  // Em modo de teste, simular resultados
  if (TEST_MODE) {
    // Simular alternativas que funcionam
    if (url === 'https://corbettmaths.com/wp-content/uploads/2013/02/square-numbers-pdf1.pdf') {
      return 'https://corbettmaths.com/wp-content/uploads/2013/02/square-numbers-pdf.pdf';
    }
    if (url === 'https://corbettmaths.com/wp-content/uploads/2013/02/types-of-numbers-pdf1.pdf') {
      return 'https://corbettmaths.com/wp-content/uploads/2018/11/types-of-numbers-pdf.pdf';
    }
    return null;
  }
  
  // Check all alternatives in parallel with a concurrency limit
  const validAlternatives = [];
  const concurrency = 3;
  
  for (let i = 0; i < alternatives.length; i += concurrency) {
    const batch = alternatives.slice(i, i + concurrency);
    const results = await Promise.all(
      batch.map(async (altUrl) => {
        try {
          const { valid } = await isValidUrl(altUrl);
          return { url: altUrl, valid };
        } catch {
          return { url: altUrl, valid: false };
        }
      })
    );
    
    for (const result of results) {
      if (result.valid) {
        validAlternatives.push(result.url);
      }
    }
    
    // If we found any valid alternatives, break early
    if (validAlternatives.length > 0) break;
  }
  
  if (validAlternatives.length > 0) {
    console.log(`[SUCCESS] Found alternative URL: ${validAlternatives[0]}`);
    return validAlternatives[0];
  }
  
  return null;
}

// ========== AI SUGGESTION LOGIC ==========
async function validateSuggestion(suggestion, originalUrl) {
  if (!suggestion || typeof suggestion !== 'string') return null;

  let cleanUrl = suggestion.trim();
  const urlMatch = cleanUrl.match(/https?:\/\/[^\s"'<>]+/);
  if (urlMatch) {
    cleanUrl = urlMatch[0];
  }
  cleanUrl = cleanUrl.split(' ')[0];

  // Remove any markdown or quotes
  cleanUrl = cleanUrl.replace(/[`'"]/g, '');
  
  // Check if URL is well-formed
  try {
    // eslint-disable-next-line no-new
    new URL(cleanUrl);
  } catch {
    console.log(`[INFO] Invalid suggestion (not a URL): ${cleanUrl}`);
    return null;
  }

  // Verify if domain is authorized
  const domain = extractDomain(cleanUrl);
  const isDomainAuthorized = AUTHORIZED_WEBSITES.some(
    authDomain => domain === authDomain || domain.endsWith(`.${authDomain}`)
  );
  if (!isDomainAuthorized) {
    console.log(`[INFO] Unauthorized domain: ${domain}`);
    return null;
  }

  // If it's the same as the original broken link, ignore
  if (cleanUrl === originalUrl) {
    console.log('[INFO] Suggested URL is the same as the broken one');
    return null;
  }

  // Finally, check if it actually works
  const { valid } = await isValidUrl(cleanUrl);
  if (!valid) {
    console.log(`[INFO] Suggested URL is not working: ${cleanUrl}`);
    return null;
  }
  return cleanUrl;
}

function extractUrlFromResponse(response) {
  if (!response) return null;
  response = response.replace(/[\r\n\t]/g, ' ').trim();
  
  // Remove common prefixes models might add
  response = response.replace(/^.*?(https?:\/\/)/i, 'https://');
  
  // Remove anything after the URL
  response = response.replace(/(\S+:\/\/[^\s'"]+).*/i, '$1');
  
  // Clean up common ending punctuation
  response = response.replace(/[.,;:)]$/, '');
  
  // If no URL format yet, try to extract it with regex
  if (!/^https?:\/\//i.test(response)) {
    const match = response.match(/https?:\/\/[^\s"'<>]+/i);
    return match ? match[0] : null;
  }
  
  return response;
}

//  AI model-specific functions
async function findGeminiSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!GOOGLE_GEMINI_API) return null;
  try {
    const promptText = `
You are a math educational resource specialist.
This specific URL is broken: ${originalUrl}

Resource data:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original source: ${source}

Analyze the format and structure of the broken URL. Find a replacement URL that is valid now.
Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. Keep the same domain if possible.
2. corbettmaths.com PDFs might be moved to different years (2018, 2019, etc.).
3. Return ONLY the full URL, no extra text.
4. The URL must start with http:// or https://
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        `${GOOGLE_GEMINI_API_URL}?key=${GOOGLE_GEMINI_API}`,
        {
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 100
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const output = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    if (!output || output.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(output);
    if (!extractedUrl) return null;

    return await validateSuggestion(extractedUrl, originalUrl);
  } catch (err) {
    console.log(`[Gemini] Error: ${err.message}`);
    return null;
  }
}

async function findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!OPENAI_API_KEY) return null;
  try {
    const prompt = `
You are a math educational resource specialist.
This specific URL is broken: ${originalUrl}

Resource data:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original source: ${source}

Analyze the format and structure of the broken URL. Find a replacement that works now.
Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. Keep same domain if possible.
2. For corbettmaths.com, PDFs might be at different years or months.
3. Return ONLY the full URL, no extra text.
4. The URL must start with http:// or https://
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        OPENAI_API_URL,
        {
          model: MODELS.OPENAI,
          messages: [
            {
              role: 'system',
              content: 'Respond only with the replacement URL or "NONE".'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 100
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!suggestion || suggestion.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;

    return await validateSuggestion(extractedUrl, originalUrl);
  } catch (err) {
    console.log(`[OpenAI] Error: ${err.message}`);
    return null;
  }
}

async function findDeepSeekSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!DEEPSEEK_API_KEY) return null;
  try {
    const prompt = `
You are a math educational resource specialist.
This specific URL is broken: ${originalUrl}

Resource data:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original source: ${source}

Analyze the format and structure of the broken URL. Find a replacement that works now.
Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. Keep same domain if possible.
2. For corbettmaths.com, PDFs might be at different years or months.
3. Return ONLY the URL, nothing else.
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        DEEPSEEK_API_URL,
        {
          model: MODELS.DEEPSEEK,
          max_tokens: 100,
          temperature: 0.1,
          messages: [{ role: 'user', content: prompt }]
        },
        {
          headers: {
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const content = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!content || content.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(content);
    if (!extractedUrl) return null;

    return await validateSuggestion(extractedUrl, originalUrl);
  } catch (err) {
    console.log(`[DeepSeek] Error: ${err.message}`);
    return null;
  }
}

async function findClaudeSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!CLAUDE_API) return null;
  try {
    const prompt = `
You are a math educational resource specialist.
This specific URL is broken: ${originalUrl}

Resource data:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original source: ${source}

Analyze the format and structure of the broken URL. Find a replacement that works now.
Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. Keep same domain if possible.
2. Return ONLY the replacement URL, no extra text.
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        CLAUDE_API_URL,
        {
          model: MODELS.CLAUDE,
          max_tokens: 100,
          temperature: 0.1,
          messages: [{ role: 'user', content: prompt }]
        },
        {
          headers: {
            'x-api-key': CLAUDE_API,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01'
          }
        }
      )
    );

    const content = resp.data?.content?.[0]?.text?.trim() || '';
    if (!content || content.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(content);
    if (!extractedUrl) return null;

    return await validateSuggestion(extractedUrl, originalUrl);
  } catch (err) {
    console.log(`[Claude] Error: ${err.message}`);
    return null;
  }
}

async function findQwenSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!QWEN_API) return null;
  try {
    const prompt = `
You are a math educational resource specialist.
This specific URL is broken: ${originalUrl}

Resource data:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original source: ${source}

Analyze the format and structure of the broken URL. Find a replacement that works now.
Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. Keep same domain if possible.
2. Return ONLY the full URL, no extra text.
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        QWEN_API_URL,
        {
          model: MODELS.QWEN,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100,
          temperature: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${QWEN_API}`,
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!suggestion || suggestion.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;

    return await validateSuggestion(extractedUrl, originalUrl);
  } catch (err) {
    console.log(`[QWEN] Error: ${err.message}`);
    return null;
  }
}

async function findQwen2Suggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!QWEN_API_2) return null;
  // Similar approach with QWEN API 2
  try {
    const prompt = `
You are a math educational resource specialist.
This specific URL is broken: ${originalUrl}

Resource data:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original source: ${source}

Find a replacement URL that is valid now.
Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
Return ONLY the full URL, nothing else.
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        QWEN_API_2_URL,
        {
          model: 'qwen-max',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 100,
          temperature: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${QWEN_API_2}`,
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!suggestion || suggestion.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;

    return await validateSuggestion(extractedUrl, originalUrl);
  } catch (err) {
    console.log(`[QWEN2] Error: ${err.message}`);
    return null;
  }
}

/**
 * Main function to find alternative URLs — pattern-based, then AI
 */
async function findAlternativeUrl(url, title, type, topic, subtopic, source) {
  console.log(`[INFO] Looking for an alternative to: ${url}`);
  // 1) Known patterns
  const patternBasedUrl = await findWorkingAlternativeUrl(url);
  if (patternBasedUrl) {
    return { provider: 'PatternMatching', url: patternBasedUrl };
  }

  // 2) AI cascade
  return cascadeSuggester(title, type, topic, subtopic, source, url);
}

/**
 * Cascade approach to use multiple models
 */
async function cascadeSuggester(title, type, topic, subtopic, source, originalUrl) {
  // Em modo de teste, retornar resultados simulados
  if (TEST_MODE) {
    if (originalUrl === 'https://corbettmaths.com/wp-content/uploads/2019/09/Irrational-and-Rational-Numbers.pdf') {
      return { provider: 'OpenAI', url: 'https://corbettmaths.com/wp-content/uploads/2021/09/Irrational-and-Rational-Numbers.pdf' };
    }
    return null;
  }

  const domain = extractDomain(originalUrl);

  // Try OpenAI first for corbettmaths
  if (domain.includes('corbettmaths.com') && OPENAI_API_KEY) {
    console.log('[INFO] Trying OpenAI first for CorbettMaths...');
    try {
      const o = await findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl);
      if (o) return { provider: 'OpenAI', url: o };
    } catch (err) {
      console.log('[INFO] OpenAI failed for CorbettMaths. Trying next.');
    }
  }

  // Then try Gemini
  if (GOOGLE_GEMINI_API) {
    console.log('[INFO] Trying Gemini...');
    try {
      const g = await findGeminiSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (g) return { provider: 'Gemini', url: g };
    } catch (err) {
      console.log('[INFO] Gemini failed. Trying next.');
    }
  }

  // OpenAI (if not tried)
  if (OPENAI_API_KEY && !domain.includes('corbettmaths.com')) {
    console.log('[INFO] Trying OpenAI...');
    try {
      const o = await findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl);
      if (o) return { provider: 'OpenAI', url: o };
    } catch (err) {
      console.log('[INFO] OpenAI failed. Trying next.');
    }
  }

  // DeepSeek
  if (DEEPSEEK_API_KEY) {
    console.log('[INFO] Trying DeepSeek...');
    try {
      const a = await findDeepSeekSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (a) return { provider: 'DeepSeek', url: a };
    } catch (err) {
      console.log('[INFO] DeepSeek failed. Trying next.');
    }
  }
  
  // Claude
  if (CLAUDE_API) {
    console.log('[INFO] Trying Claude...');
    try {
      const c = await findClaudeSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (c) return { provider: 'Claude', url: c };
    } catch (err) {
      console.log('[INFO] Claude failed. Trying next.');
    }
  }

  // QWEN
  if (QWEN_API) {
    console.log('[INFO] Trying QWEN...');
    try {
      const q = await findQwenSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (q) return { provider: 'QWEN', url: q };
    } catch (err) {
      console.log('[INFO] QWEN failed. Trying QWEN API 2.');
    }
  }

  // QWEN API 2
  if (QWEN_API_2) {
    console.log('[INFO] Trying QWEN API 2...');
    try {
      const q2 = await findQwen2Suggestion(title, type, topic, subtopic, source, originalUrl);
      if (q2) return { provider: 'QWEN_API_2', url: q2 };
    } catch (err) {
      console.log('[INFO] QWEN API 2 failed.');
    }
  }

  console.log('[INFO] All options failed. No suggestion.');
  return null;
}

async function updateResourcesFile(brokenLinks) {
  let fileContent = fs.readFileSync(resourcesFilePath, 'utf8');
  let fixedCount = 0;

  for (const link of brokenLinks) {
    if (link.suggestion) {
      try {
        const searchIndex = fileContent.indexOf(link.url);
        if (searchIndex !== -1) {
          const before = fileContent.substring(Math.max(0, searchIndex - 50), searchIndex);

          if (before.includes('url:') || before.includes('url =') || before.includes('url=')) {
            fileContent = fileContent.replace(link.url, link.suggestion);
            fixedCount++;
            console.log(
              `[SUCCESS] Link fixed: ${link.url} -> ${link.suggestion} (via ${link.suggestionProvider})`
            );
          }
        }
      } catch (err) {
        console.log(`[ERROR] Failed to replace link: ${err.message}`);
      }
    }
  }

  if (fixedCount > 0) {
    fs.writeFileSync(resourcesFilePath, fileContent, 'utf8');
    console.log(`[INFO] Updated resources file with ${fixedCount} fixes`);
  }
  return fixedCount;
}

// ========== MAIN SCRIPT ==========
async function main() {
  console.log('=== Broken Link Diagnosis ===');
  console.log(`Resources file: ${resourcesFilePath}`);
  console.log(`Report will be saved in: ${reportFilePath}`);
  
  // Create a backup before making any changes
  if (!TEST_MODE) {
    backupResourcesFile();
  }

  let pLimit;
  try {
    const pLimitModule = await import('p-limit');
    pLimit = pLimitModule.default;
  } catch (error) {
    console.error('[ERROR] Failed to import p-limit:', error.message);
    // Basic fallback if p-limit not available
    pLimit = concurrency => {
      const queue = [];
      let activeCount = 0;
      const next = () => {
        activeCount--;
        if (queue.length > 0) {
          queue.shift()();
        }
      };

      return fn => {
        return new Promise((resolve, reject) => {
          const run = async () => {
            activeCount++;
            try {
              resolve(await fn());
            } catch (err) {
              reject(err);
            }
            next();
          };

          if (activeCount < concurrency) {
            run();
          } else {
            queue.push(run);
          }
        });
      };
    };
  }

  const code = fs.readFileSync(resourcesFilePath, 'utf8');
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });

  const brokenLinksData = [];
  let totalLinks = 0;

  // Collect all url: "..." properties
  traverse(ast, {
    ObjectProperty(path) {
      if (
        path.node.key.type === 'Identifier' &&
        path.node.key.name === 'url' &&
        path.node.value.type === 'StringLiteral'
      ) {
        totalLinks++;
        const url = path.node.value.value;

        // Skip URLs that are already checked in this run
        if (brokenLinksData.some(item => item.url === url)) {
          return;
        }

        const parentProps = path.parentPath.node.properties;
        let title = '',
          rtype = '',
          source = '',
          topic = 'mathematics',
          subtopic = 'general';

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

        const { line, column } = path.node.loc.start;

        brokenLinksData.push({
          url,
          line,
          column,
          title,
          type: rtype,
          source,
          topic,
          subtopic,
          isBroken: false,
          suggestion: null,
          suggestionProvider: null,
          brokenReason: null
        });
      }
    }
  });

  console.log(`[INFO] Total links found: ${totalLinks}`);

  // Limitar links se necessário
  if (LINKS_LIMIT) {
    const limit = parseInt(LINKS_LIMIT, 10);
    if (!isNaN(limit) && limit > 0 && limit < brokenLinksData.length) {
      console.log(`[INFO] Limiting check to first ${limit} links due to --limit parameter`);
      brokenLinksData.splice(limit);
    }
  }

  const limit = pLimit(2); // reduce concurrency to 2 to avoid rate limits
  const tasks = brokenLinksData.map(item =>
    limit(async () => {
      const { valid, brokenReason } = await isValidUrl(item.url, item.type);
      if (!valid) {
        item.isBroken = true;
        item.brokenReason = brokenReason;
        console.log(`\n[WARN] Broken link: ${item.url} (Line: ${item.line}, Title: ${item.title})`);
        if (brokenReason) console.log(`[REASON] ${brokenReason}`);

        // Attempt to find alternative
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
          console.log(
            `[INFO] Alternative found: ${alternativeResult.url} (via ${alternativeResult.provider})`
          );

          // Double-check validity
          const { valid: altValid, brokenReason: altReason } = await isValidUrl(alternativeResult.url, item.type);
          if (!altValid) {
            console.log(`[WARN] Suggested URL is invalid: ${alternativeResult.url}`);
            if (altReason) console.log(`[REASON] ${altReason}`);
            item.suggestion = null;
            item.suggestionProvider = null;
          }
        } else {
          console.log('[INFO] No alternative found.');
        }
      }
    })
  );

  await Promise.all(tasks);

  // Filter truly broken
  const onlyBroken = brokenLinksData.filter(x => x.isBroken);
  const fixedCount = await updateResourcesFile(onlyBroken);

  // Produce the final JSON matching the workflow's jq references
  const report = {
    totalLinksChecked: totalLinks,
    brokenLinkCount: onlyBroken.length,
    linksFixedInFile: fixedCount,
    brokenLinksDetails: onlyBroken.map(link => ({
      originalUrl: link.url,
      title: link.title,
      type: link.type,
      line: link.line,
      suggestedReplacement: link.suggestion,
      suggestionSource: link.suggestionProvider,
      brokenReason: link.brokenReason || null
    }))
  };

  fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2), 'utf8');

  console.log('\n=== FINISHED ===');
  console.log(`- Total links: ${totalLinks}`);
  console.log(`- Broken links: ${onlyBroken.length}`);
  console.log(`- Links fixed: ${fixedCount}`);
  console.log(`Report saved in: ${reportFilePath}`);
}

main().catch(err => {
  console.error(`[ERROR] Main script failure: ${err.message}`);
  process.exit(1);
});
