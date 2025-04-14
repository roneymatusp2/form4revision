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
const GOOGLE_GEMINI_API    = process.env.GOOGLE_GEMINI_API    || null;
const OPENAI_API_KEY       = process.env.OPENAI_API_KEY       || null;
const DEEPSEEK_API_KEY     = process.env.DEEPSEEK_API_KEY     || null; // Replaces Anthropic
const CLAUDE_API           = process.env.CLAUDE_API           || null;
const QWEN_API             = process.env.QWEN_API             || null; // Replaces Mistral
const QWEN_API_2           = process.env.QWEN_API_2           || null; // Additional option

// API endpoints (placeholders; adjust if you have real endpoints)
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const OPENAI_API_URL        = 'https://api.openai.com/v1/chat/completions';
const DEEPSEEK_API_URL      = 'https://api.deepseek.com/v1/messages';
const CLAUDE_API_URL        = 'https://api.claude.ai/v1/messages';
const QWEN_API_URL          = 'https://api.qwen.ai/v1/chat/completions';
const QWEN_API_2_URL        = 'https://api.qwen.ai/v2/chat/completions';

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

// Common URL pattern map (example placeholders)
const COMMON_URL_PATTERNS = {
  'corbettmaths.com': [
    {
      original: /-pdf1.pdf/,
      replacement: '-pdf.pdf'
    }
    // Add more patterns if needed
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
      // If rate-limited, we increase the wait time on subsequent attempts
      const retryDelay = isRateLimited
        ? RETRY_DELAY_MS * (MAX_RETRIES - retries + 1)
        : RETRY_DELAY_MS;

      console.log(
        `[RETRY] ${isRateLimited ? 'Rate limited' : 'Request failed'}, ` +
          `retrying in ${retryDelay}ms (${retries} attempts left)`
      );

      await sleep(retryDelay);
      return makeRequestWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

// ========== LINK CHECKING (IMPROVED) ==========
async function checkUrlWithFallback(url) {
  try {
    // Add a User-Agent to avoid being blocked
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    };

    // Attempt HEAD with retry
    try {
      await makeRequestWithRetry(() =>
        axios.head(url, {
          timeout: 15000,
          headers,
          validateStatus: s => s < 400,
          maxRedirects: 5
        })
      );
      return true; // If successful, consider valid
    } catch (headError) {
      // 429 => rate limit; accept as "possibly valid"
      if (headError?.response?.status === 429) {
        console.log(`[WARN] Rate-limited (HEAD) => Accepting ${url} as possibly valid`);
        return true;
      }

      // If HEAD failed, try GET
      try {
        const getResp = await makeRequestWithRetry(() =>
          axios.get(url, {
            timeout: 20000,
            headers,
            validateStatus: s => s < 400,
            maxRedirects: 5,
            responseType: 'stream'
          })
        );
        getResp.data.destroy(); // Destroy the stream once existence is confirmed
        return true;
      } catch (getError) {
        if (getError?.response?.status === 429) {
          console.log(`[WARN] Rate-limited (GET) => Accepting ${url} as possibly valid`);
          return true;
        }
        // GET failed
        return false;
      }
    }
  } catch (err) {
    // Any other failure -> invalid
    return false;
  }
}

async function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (!url.startsWith('http')) return false;
  try {
    return await checkUrlWithFallback(url);
  } catch (err) {
    console.log(`[ERROR] Failed to check URL ${url}: ${err.message}`);
    return false;
  }
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
    const alternatives = [];

    for (const pattern of patterns) {
      if (pattern.original.test(url)) {
        alternatives.push(url.replace(pattern.original, pattern.replacement));
      }
    }
    return [...new Set(alternatives)];
  } catch (error) {
    console.log(`[ERROR] Failed to generate alternative URLs: ${error.message}`);
    return [];
  }
}

async function findWorkingAlternativeUrl(url) {
  const alternatives = generateAlternativeUrls(url);
  console.log(`[INFO] Testing ${alternatives.length} alternative URLs for ${url}`);
  for (const altUrl of alternatives) {
    try {
      if (await isValidUrl(altUrl)) {
        console.log(`[SUCCESS] Found alternative URL: ${altUrl}`);
        return altUrl;
      }
    } catch {}
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
  const isWorking = await isValidUrl(cleanUrl);
  if (!isWorking) {
    console.log(`[INFO] Suggested URL is not working: ${cleanUrl}`);
    return null;
  }
  return cleanUrl;
}

function extractUrlFromResponse(response) {
  if (!response) return null;
  response = response.replace(/[\r\n\t]/g, ' ').trim();
  // Remove preceding text up to the first https
  response = response.replace(/^.*?(https?:\/\/)/i, 'https://');
  // Remove anything after the real URL
  response = response.replace(/(\S+:\/\/[^\s'"]+).*/i, '$1');

  if (!/^https?:\/\//i.test(response)) {
    const match = response.match(/https?:\/\/[^\s"'<>]+/i);
    return match ? match[0] : null;
  }
  return response;
}

//  AI model-specific functions — placeholders:
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
          model: 'gpt-4o',
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
...
(omitted for brevity)
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
  // Similar approach as above; omitted for brevity
  return null;
}

async function findQwenSuggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!QWEN_API) return null;
  // Similar approach to generate prompt & validate
  return null;
}

async function findQwen2Suggestion(title, type, topic, subtopic, source, originalUrl) {
  if (!QWEN_API_2) return null;
  // Similar approach if you have QWEN v2
  return null;
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
  const domain = extractDomain(originalUrl);

  // Try OpenAI first for corbettmaths
  if (domain.includes('corbettmaths.com') && OPENAI_API_KEY) {
    console.log('[INFO] Trying OpenAI first for CorbettMaths...');
    const o = await findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl);
    if (o) return { provider: 'OpenAI', url: o };
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
  } else if (CLAUDE_API) {
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
      console.log('[INFO] QWEN failed.');
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
          suggestionProvider: null
        });
      }
    }
  });

  console.log(`[INFO] Total links found: ${totalLinks}`);

  const limit = pLimit(3); // limit concurrency to 3
  const tasks = brokenLinksData.map(item =>
    limit(async () => {
      const valid = await isValidUrl(item.url);
      if (!valid) {
        item.isBroken = true;
        console.log(`\n[WARN] Broken link: ${item.url} (Line: ${item.line}, Title: ${item.title})`);

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
          if (!(await isValidUrl(alternativeResult.url))) {
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
      suggestionSource: link.suggestionProvider
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
