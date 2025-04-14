/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Retry settings
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

/**
 * API key configuration for AI models
 */

// Updated environment variables as requested
const GOOGLE_GEMINI_API    = process.env.GOOGLE_GEMINI_API    || null;
const OPENAI_API_KEY       = process.env.OPENAI_API_KEY       || null;
const DEEPSEEK_API_KEY     = process.env.DEEPSEEK_API_KEY     || null; // Replaces Anthropic
const CLAUDE_API           = process.env.CLAUDE_API           || null; // Alternative or distinct key
const QWEN_API             = process.env.QWEN_API             || null; // Replaces Mistral
const QWEN_API_2           = process.env.QWEN_API_2           || null; // Another new option

// Endpoints for each AI (these would also be updated as needed)
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const OPENAI_API_URL        = 'https://api.openai.com/v1/chat/completions';
const DEEPSEEK_API_URL      = 'https://api.deepseek.com/v1/messages'; // Example placeholder
const CLAUDE_API_URL        = 'https://api.claude.ai/v1/messages';    // Example placeholder
const QWEN_API_URL          = 'https://api.qwen.ai/v1/chat/completions';      // Example placeholder
const QWEN_API_2_URL        = 'https://api.qwen.ai/v2/chat/completions';      // Example placeholder

// Authorized domains (kept as is)
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

// A map that holds common domain patterns for each website (helps build alternative URLs)
const COMMON_URL_PATTERNS = {
  'corbettmaths.com': [
    // Patterns for Corbett Maths PDFs
    {
      original: /-pdf1.pdf/,
      replacement: '-pdf.pdf'
    },
    {
      original: /-pdf1.pdf/,
      replacement: ''
    }
    // Additional pattern entries would go here
  ]
};

// File containing your resources
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');
// Location for saving the final report
const reportFilePath = path.resolve(__dirname, 'link-check-stats.json');

/**
 * Sleep function to implement delays
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function to make requests with automatic retry
 */
async function makeRequestWithRetry(fn, retries = MAX_RETRIES) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      const isRateLimited = error?.response?.status === 429;
      const retryDelay = isRateLimited
        ? RETRY_DELAY_MS * (MAX_RETRIES - retries + 1)
        : RETRY_DELAY_MS;
      console.log(`[RETRY] ${isRateLimited ? 'Rate limited' : 'Request failed'}, retrying in ${retryDelay}ms (${retries} attempts left)`);
      await sleep(retryDelay);
      return makeRequestWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

// ========== LINK CHECKING (IMPROVED) ==========
async function checkUrlWithFallback(url) {
  try {
    // Add User-Agent options to avoid being blocked
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };

    // Attempt HEAD with retry
    try {
      const headResp = await makeRequestWithRetry(() =>
        axios.head(url, {
          timeout: 15000,
          headers,
          validateStatus: s => s < 400,
          maxRedirects: 5
        })
      );
      return true; // If successful, we consider it valid
    } catch (headError) {
      // 429 => rate limit; assume "possibly valid"
      if (headError?.response?.status === 429) {
        console.log(`[WARN] Rate-limited (HEAD) => Accepting ${url} as possibly valid`);
        return true;
      }

      // If HEAD didn't work, try GET
      try {
        const getResp = await makeRequestWithRetry(() =>
          axios.get(url, {
            timeout: 20000,
            headers,
            validateStatus: s => s < 400,
            maxRedirects: 5,
            responseType: 'stream' // Use stream so we don't download the entire content
          })
        );

        // Immediately destroy the stream after confirming the URL exists
        getResp.data.destroy();
        return true;
      } catch (getError) {
        if (getError?.response?.status === 429) {
          console.log(`[WARN] Rate-limited (GET) => Accepting ${url} as possibly valid`);
          return true;
        }
        // GET also failed
        return false;
      }
    }
  } catch (err) {
    // Any other failure is considered invalid
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
    console.log(`[ERROR] Failed to check URL ${url}: ${err.message}`);
    return false;
  }
}

// Function to extract domain from a URL
function extractDomain(url) {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch {
    return '';
  }
}

// ========== FUNCTIONS TO GENERATE ALTERNATIVE URLs ==========
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
    const alternatives = [];

    for (const pattern of patterns) {
      if (pattern.original.test(url)) {
        const altUrl = url.replace(pattern.original, pattern.replacement);
        alternatives.push(altUrl);
      }
    }

    // Additional logic for corbettmaths.com, if needed
    if (rootDomain === 'corbettmaths.com') {
      // Example: if the URL has "-pdf1.pdf" in the name, try "-pdf.pdf"
      if (url.includes('-pdf1.pdf')) {
        alternatives.push(url.replace('-pdf1.pdf', '-pdf.pdf'));
      }
      // If the URL has "-pdf.pdf", try removing the dash, etc.
      if (url.includes('-pdf.pdf')) {
        alternatives.push(url.replace('-pdf.pdf', '.pdf'));
      }

      // Attempt different years, months, etc. (based on the original code logic)
      // ...
    }

    // Remove duplicates
    return [...new Set(alternatives)];
  } catch (error) {
    console.log(`[ERROR] Failed to generate alternative URLs: ${error.message}`);
    return [];
  }
}

/**
 * Tries to find a working alternative URL based on known patterns
 */
async function findWorkingAlternativeUrl(url) {
  const alternatives = generateAlternativeUrls(url);
  console.log(`[INFO] Testing ${alternatives.length} alternative URLs for ${url}`);
  for (const altUrl of alternatives) {
    try {
      const isValid = await isValidUrl(altUrl);
      if (isValid) {
        console.log(`[SUCCESS] Found alternative URL: ${altUrl}`);
        return altUrl;
      }
    } catch (error) {
      // Continue to the next alternative
    }
  }
  return null;
}

// ========== AI SUGGESTION FUNCTIONS (IMPROVED) ==========
/**
 * Improved function to check if the suggested URL is valid and on an authorized domain
 */
async function validateSuggestion(suggestion, originalUrl) {
  if (!suggestion || typeof suggestion !== 'string') return null;

  // Clean the string (remove quotes, extra text, etc.)
  let cleanUrl = suggestion.trim();

  // Try to extract just the URL if there's extra text
  const urlMatch = cleanUrl.match(/https?:\/\/[^\s"'<>]+/);
  if (urlMatch) {
    cleanUrl = urlMatch[0];
  }

  // Remove anything after the first space
  cleanUrl = cleanUrl.split(' ')[0];

  // Check if it's a well-formed URL
  try {
    new URL(cleanUrl);
  } catch {
    console.log(`[INFO] Invalid suggestion (not a URL): ${cleanUrl}`);
    return null;
  }

  // Verify if the domain is authorized
  const domain = extractDomain(cleanUrl);
  const isDomainAuthorized = AUTHORIZED_WEBSITES.some(
    authDomain => domain === authDomain || domain.endsWith(`.${authDomain}`)
  );
  if (!isDomainAuthorized) {
    console.log(`[INFO] Unauthorized domain: ${domain}`);
    return null;
  }

  // We do not accept the same URL that was broken
  if (cleanUrl === originalUrl) {
    console.log('[INFO] Suggested URL is the same as the broken original');
    return null;
  }

  // Check if the URL actually works
  const isWorking = await isValidUrl(cleanUrl);
  if (!isWorking) {
    console.log(`[INFO] Suggested URL is not working: ${cleanUrl}`);
    return null;
  }

  return cleanUrl;
}

// Function to filter and clean the AI response to extract a single URL
function extractUrlFromResponse(response) {
  if (!response) return null;

  // Remove line breaks, tabs, etc.
  response = response.replace(/[\r\n\t]/g, ' ').trim();

  // Remove common prefixes
  response = response.replace(/^.*?(https?:\/\/)/i, 'https://');

  // Remove text after the URL
  response = response.replace(/(\S+:\/\/[^\s'"]+).*/i, '$1');

  // If it still doesn't look like a URL, try a regex to extract it
  if (!/^https?:\/\//i.test(response)) {
    const match = response.match(/https?:\/\/[^\s"'<>]+/i);
    return match ? match[0] : null;
  }

  return response;
}

// Below are the model-specific suggestion functions.
// Adjust to the new environment variables (DEEPSEEK, QWEN, etc.) as needed.

/**
 * Example for Google Gemini
 */
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

Analyze the format and structure of the broken URL. Find a replacement URL that is valid and works at this moment.

Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. If possible, keep the same domain as the original URL.
2. For sites like corbettmaths.com, some PDFs were moved to different years or months (like /2018/ or /2019/ instead of /2013/).
3. Return ONLY the full URL, with no additional text.
4. The URL must begin with http:// or https://

Replacement URL:
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
            'Content-Type': 'application/json',
            'x-goog-api-key': GOOGLE_GEMINI_API
          }
        }
      )
    );

    const output = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    if (!output || output.toLowerCase() === 'none' || output.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(output);
    if (!extractedUrl) return null;

    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Gemini] Error: ${err.message}`);
    return null;
  }
}

/**
 * Example for OpenAI
 */
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

Analyze the format and structure of the broken URL. Find a replacement URL that is valid and works at this moment.

Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. If possible, keep the same domain as the original URL.
2. For sites like corbettmaths.com, some PDFs were moved to different years or months (like /2018/ or /2019/ instead of /2013/).
3. Return ONLY the full URL, with no additional text.
4. The URL must begin with http:// or https://
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-4o', // A recent model
          messages: [
            {
              role: 'system',
              content:
                'You are an assistant specialized in math educational resources. Respond only with the replacement URL or "NONE".'
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
    if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;

    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[OpenAI] Error: ${err.message}`);
    return null;
  }
}

/**
 * Example for DeepSeek (replacing Anthropic)
 */
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

Analyze the format and structure of the broken URL. Find a replacement URL that is valid and works at this moment.

Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. If possible, keep the same domain as the original URL.
2. For sites like corbettmaths.com, some PDFs were moved to different years or months (like /2018/ or /2019/ instead of /2013/).
3. Return ONLY the full URL, with no additional text.
4. The URL must begin with http:// or https://

Respond only with the URL or "NONE".
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        DEEPSEEK_API_URL,
        {
          model: 'deepseek-latest-model',
          max_tokens: 100,
          temperature: 0.1,
          messages: [{ role: 'user', content: prompt }]
        },
        {
          headers: {
            'x-api-key': DEEPSEEK_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const content = resp.data?.content?.trim() || '';
    if (!content || content.toLowerCase() === 'none' || content.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(content);
    if (!extractedUrl) return null;

    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[DeepSeek] Error: ${err.message}`);
    return null;
  }
}

/**
 * Example for Claude (originally an alternative to Anthropic)
 */
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

Analyze the format and structure of the broken URL. Find a replacement URL that is valid and works at this moment.

Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. If possible, keep the same domain as the original URL.
2. For sites like corbettmaths.com, some PDFs were moved to different years or months (like /2018/ or /2019/ instead of /2013/).
3. Return ONLY the full URL, with no additional text.
4. The URL must begin with http:// or https://

Respond only with the URL or "NONE".
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        CLAUDE_API_URL,
        {
          model: 'claude-3-opus-20240229',
          max_tokens: 100,
          temperature: 0.1,
          messages: [{ role: 'user', content: prompt }]
        },
        {
          headers: {
            'x-api-key': CLAUDE_API,
            'Content-Type': 'application/json'
          }
        }
      )
    );

    // Adjust parsing as needed based on the Claude API
    const content = resp.data?.content || resp.data?.completion || '';
    if (!content || content.toLowerCase() === 'none' || content.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(content);
    if (!extractedUrl) return null;

    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[Claude] Error: ${err.message}`);
    return null;
  }
}

/**
 * Example for QWEN (replacing Mistral)
 */
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

Analyze the format and structure of the broken URL. Find a replacement URL that is valid and works at this moment.

Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. If possible, keep the same domain as the original URL.
2. For sites like corbettmaths.com, some PDFs were moved to different years or months (like /2018/ or /2019/ instead of /2013/).
3. Return ONLY the full URL, with no additional text.
4. The URL must begin with http:// or https://
`;

    const resp = await makeRequestWithRetry(() =>
      axios.post(
        QWEN_API_URL,
        {
          model: 'qwen-large-latest',
          messages: [
            {
              role: 'system',
              content:
                'You are an assistant specialized in math educational resources. Respond only with the replacement URL or "NONE".'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 100
        },
        {
          headers: {
            Authorization: `Bearer ${QWEN_API}`,
            'Content-Type': 'application/json'
          }
        }
      )
    );

    const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';
    if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('none')) return null;

    const extractedUrl = extractUrlFromResponse(suggestion);
    if (!extractedUrl) return null;

    const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
    return validatedUrl;
  } catch (err) {
    console.log(`[QWEN] Error: ${err.message}`);
    return null;
  }
}

// This is optional if you want to do something with QWEN_API_2
async function findQwen2Suggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!QWEN_API_2) return null;
  try {
    // Similar structure, but calling QWEN_API_2_URL
    // ...
    return null; // Implementation placeholder
  } catch (err) {
    console.log(`[QWEN_2] Error: ${err.message}`);
    return null;
  }
}

/**
 * Main function to find alternative URLs - first attempts known patterns, then AI
 */
async function findAlternativeUrl(url, title, type, topic, subtopic, source) {
  console.log(`[INFO] Looking for an alternative to: ${url}`);
  // 1. First try known patterns (much faster and no rate limit issues)
  const patternBasedUrl = await findWorkingAlternativeUrl(url);
  if (patternBasedUrl) {
    return { provider: 'PatternMatching', url: patternBasedUrl };
  }

  // 2. If patterns fail, try AI in a cascade
  return cascadeSuggester(title, type, topic, subtopic, source, url);
}

/**
 * Cascade of suggestion attempts with retries and simple load distribution
 */
async function cascadeSuggester(title, type, topic, subtopic, source, originalUrl) {
  const domain = extractDomain(originalUrl);

  // Example logic: try a certain model first if it's CorbettMaths
  if (domain.includes('corbettmaths.com')) {
    // OpenAI tends to be good for CorbettMaths
    if (OPENAI_API_KEY) {
      console.log('[INFO] Trying OpenAI first for CorbettMaths...');
      const o = await findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl);
      if (o) return { provider: 'OpenAI', url: o };
    }
  }

  // Then proceed to the normal cascade
  // 1) Google Gemini
  if (GOOGLE_GEMINI_API) {
    console.log('[INFO] Trying Gemini...');
    try {
      const g = await findGeminiSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (g) return { provider: 'Gemini', url: g };
    } catch (err) {
      console.log('[INFO] Gemini failed. Trying next option...');
    }
  }

  // 2) OpenAI (if not already tried)
  if (OPENAI_API_KEY && !domain.includes('corbettmaths.com')) {
    console.log('[INFO] Trying OpenAI...');
    try {
      const o = await findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl);
      if (o) return { provider: 'OpenAI', url: o };
    } catch (err) {
      console.log('[INFO] OpenAI failed. Trying next option...');
    }
  }

  // 3) DeepSeek (previously Anthropic)
  if (DEEPSEEK_API_KEY) {
    console.log('[INFO] Trying DeepSeek...');
    try {
      const a = await findDeepSeekSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (a) return { provider: 'DeepSeek', url: a };
    } catch (err) {
      console.log('[INFO] DeepSeek failed. Trying next option...');
    }
  }

  // 4) Claude
  else if (CLAUDE_API) {
    console.log('[INFO] Trying Claude API...');
    try {
      const c = await findClaudeSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (c) return { provider: 'Claude', url: c };
    } catch (err) {
      console.log('[INFO] Claude failed. Trying next option...');
    }
  }

  // 5) QWEN (previously Mistral)
  if (QWEN_API) {
    console.log('[INFO] Trying QWEN...');
    try {
      const m = await findQwenSuggestion(title, type, topic, subtopic, source, originalUrl);
      if (m) return { provider: 'QWEN', url: m };
    } catch (err) {
      console.log('[INFO] QWEN failed.');
    }
  }

  // 6) QWEN API 2?
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

// Function to update the resources file with the found replacements
async function updateResourcesFile(brokenLinks) {
  let fileContent = fs.readFileSync(resourcesFilePath, 'utf8');
  let fixedCount = 0;

  for (const link of brokenLinks) {
    if (link.suggestion) {
      try {
        // Obtain enough surrounding context around the URL
        const searchIndex = fileContent.indexOf(link.url);
        if (searchIndex !== -1) {
          const before = fileContent.substring(Math.max(0, searchIndex - 50), searchIndex);
          // We won't strictly need `after` unless we do more complex checks
          // but leaving it here as in the original code
          const after = fileContent.substring(
            searchIndex + link.url.length,
            Math.min(fileContent.length, searchIndex + link.url.length + 50)
          );

          // Check if it's part of a property like url:
          if (before.includes('url:') || before.includes('url =') || before.includes('url=')) {
            // Do the replacement
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
    console.log(`[INFO] Resources file updated with ${fixedCount} fixes`);
  }
  return fixedCount;
}

// ========== MAIN SCRIPT ==========
// Main function using async/await, ESM compatible
async function main() {
  console.log('=== Broken Link Diagnosis ===');
  console.log(`Resources file: ${resourcesFilePath}`);
  console.log(`Report will be saved in: ${reportFilePath}`);

  // We'll use p-limit with dynamic import
  let pLimit;
  try {
    // Dynamic import of p-limit (ESM compatible)
    const pLimitModule = await import('p-limit');
    pLimit = pLimitModule.default;
  } catch (error) {
    console.error('[ERROR] Failed to import p-limit:', error.message);
    // Basic alternative implementation if we cannot import p-limit
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

  // Read the code
  const code = fs.readFileSync(resourcesFilePath, 'utf8');
  // Parse
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });

  const brokenLinksData = [];
  let totalLinks = 0;

  // Locate "url: '...'" properties
  traverse(ast, {
    ObjectProperty(path) {
      if (
        path.node.key.type === 'Identifier' &&
        path.node.key.name === 'url' &&
        path.node.value.type === 'StringLiteral'
      ) {
        totalLinks++;
        const url = path.node.value.value;

        // Identify metadata in the same object
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

        // Get approximate line and column
        const { line, column } = path.node.loc.start;

        // Store it for later checks
        brokenLinksData.push({
          url,
          line,
          column,
          title,
          type: rtype,
          source,
          topic,
          subtopic,
          isBroken: false,   // Will be updated
          suggestion: null,  // Will be updated if we find an alternative
          suggestionProvider: null
        });
      }
    }
  });

  console.log(`[INFO] Total links found: ${totalLinks}`);

  // We'll check each link with a parallelism limit to avoid rate limiting
  const limit = pLimit(3); // Reduced to 3 to minimize rate limits
  const tasks = brokenLinksData.map(item =>
    limit(async () => {
      const valid = await isValidUrl(item.url);
      if (!valid) {
        item.isBroken = true;
        console.log(`\n[WARN] Broken link: ${item.url} (Line: ${item.line}, Title: ${item.title})`);
        // Try to find an alternative
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

          // Double-check if the suggested URL is working
          const isSuggestionValid = await isValidUrl(alternativeResult.url);
          if (!isSuggestionValid) {
            console.log(`[WARN] Suggested URL is invalid: ${alternativeResult.url}`);
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

  // Filter only actually broken links
  const onlyBroken = brokenLinksData.filter(x => x.isBroken);

  // Update the resource file with the replacements
  const fixedCount = await updateResourcesFile(onlyBroken);

  // Generate final report
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

  console.log('\n=== FINISHED ===');
  console.log(`- Total links: ${totalLinks}`);
  console.log(`- Broken links: ${onlyBroken.length}`);
  console.log(`- Fixed links: ${fixedCount}`);
  console.log(`Full report at: ${reportFilePath}`);
}

// Run
main().catch(err => {
  console.error(`[ERROR] Main script failure: ${err.message}`);
  process.exit(1);
});
