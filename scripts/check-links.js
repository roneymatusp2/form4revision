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
 * API Key Configuration for AI Models
 * Reads keys from environment variables.
 */
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API || null;
const OPENAI_API_KEY        = process.env.OPENAI_API_KEY    || null;
const CLAUDE_API_KEY        = process.env.CLAUDE_API        || null; // Using the key name provided
const DEEPSEEK_API_KEY      = process.env.DEEPSEEK_API_KEY  || null; // New option
const QWEN_API_KEY          = process.env.QWEN_API          || null; // New option (using QWEN_API for the primary key)
// Note: QWEN_API_2 is read but not used in the current example functions.
// You might need to decide how to utilize it (e.g., different model, fallback)
const QWEN_API_KEY_2        = process.env.QWEN_API_2        || null;

// Endpoints for each AI (Updated based on available keys)
// You MUST replace placeholder URLs for Deepseek and Qwen
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const OPENAI_API_URL        = 'https://api.openai.com/v1/chat/completions';
const CLAUDE_API_URL        = 'https://api.anthropic.com/v1/messages'; // Standard Anthropic endpoint for Claude
const DEEPSEEK_API_URL      = 'YOUR_DEEPSEEK_API_ENDPOINT'; // !! REPLACE WITH ACTUAL DEEPSEEK URL !!
const QWEN_API_URL          = 'YOUR_QWEN_API_ENDPOINT';     // !! REPLACE WITH ACTUAL QWEN URL !!

// Authorized domains (Kept as is)
const AUTHORIZED_WEBSITES = [
    'corbettmaths.com',
    'khanacademy.org',
    'savemyexams.com',
    'mathsgenie.co.uk',
    'draustinmaths.com',
    'physicsandmathstutor.com',
    'youtube.com', // Might need review if this pattern is still valid/intended
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

// Map to store common URL patterns for specific websites (helps build alternative URLs)
// (Kept specific examples for corbettmaths.com)
const COMMON_URL_PATTERNS = {
    'corbettmaths.com': [
        // Patterns for Corbett Maths PDFs
        { original: /-pdf1\.pdf$/, replacement: '-pdf.pdf' },
        { original: /-pdf1\.pdf$/, replacement: 'wp-content/uploads/2018/11/$1-pdf.pdf' }, // Example: Needs $1 capture group defined if used
        { original: /wp-content\/uploads\/(\d{4})\/(\d{2})\/(.*)-pdf\.pdf$/, replacement: 'wp-content/uploads/2018/11/$3.pdf' },
        { original: /wp-content\/uploads\/(\d{4})\/(\d{2})\/(.*)-pdf\.pdf$/, replacement: 'wp-content/uploads/2019/09/$3.pdf' },
        { original: /wp-content\/uploads\/(\d{4})\/(\d{2})\/(.*)\.pdf$/, replacement: 'files/$3.pdf' }, // Example pattern
        { original: /practice-questions\/(.*)-pdf\.pdf$/, replacement: 'files/ugd/$1.pdf' },
    ]
};

// File containing your resources
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');
// Location to save the final report
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
            const retryDelay = isRateLimited ? RETRY_DELAY_MS * (MAX_RETRIES - retries + 1) : RETRY_DELAY_MS;
            console.log(`[RETRY] ${isRateLimited ? 'Rate limited' : 'Request failed'}, retrying in ${retryDelay}ms (${retries} attempts left)`);
            await sleep(retryDelay);
            return makeRequestWithRetry(fn, retries - 1);
        }
        throw error; // Re-throw error after exhausting retries
    }
}

// ========== LINK CHECKING (IMPROVED) ==========

/**
 * Checks a URL's validity using HEAD and GET fallbacks with retries.
 * @param {string} url The URL to check.
 * @returns {Promise<boolean>} True if the URL is likely valid, false otherwise.
 */
async function checkUrlWithFallback(url) {
    try {
        // Add User-Agent options to avoid being blocked
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
        };

        // Try HEAD request with retry
        try {
            const headResp = await makeRequestWithRetry(() => axios.head(url, {
                timeout: 15000, // 15 seconds timeout
                headers,
                validateStatus: s => s < 400, // Only accept status codes below 400
                maxRedirects: 5 // Follow up to 5 redirects
            }));
            // console.log(`[DEBUG] HEAD success for ${url} Status: ${headResp.status}`);
            return true; // If HEAD succeeds, consider it valid
        } catch (headError) {
            // 405 Method Not Allowed or 403 Forbidden might mean HEAD is blocked, but GET might work
            if (headError?.response?.status === 405 || headError?.response?.status === 403) {
                 console.log(`[INFO] HEAD failed (${headError.response.status}) for ${url}. Trying GET...`);
                 // Fall through to GET attempt
            } else if (headError?.response?.status === 429) {
                // 429 => rate limit; assume "maybe valid" to avoid discarding potentially good links
                console.log(`[WARN] Rate-limited (HEAD) => Accepting ${url} as possibly valid`);
                return true;
            } else {
                 console.log(`[DEBUG] HEAD failed for ${url}: ${headError.message}`);
                 // Fall through to GET attempt only if HEAD failed for reasons other than rate limit
            }

            // Try GET if HEAD failed (or wasn't conclusive)
            try {
                const getResp = await makeRequestWithRetry(() => axios.get(url, {
                    timeout: 20000, // 20 seconds timeout for GET
                    headers,
                    validateStatus: s => s < 400, // Only accept status codes below 400
                    maxRedirects: 5,
                    responseType: 'stream' // Use stream to avoid downloading the entire content
                }));

                // Immediately destroy the stream after confirming the URL exists and is accessible
                getResp.data.destroy();
                // console.log(`[DEBUG] GET success for ${url} Status: ${getResp.status}`);
                return true;
            } catch (getError) {
                if (getError?.response?.status === 429) {
                    console.log(`[WARN] Rate-limited (GET) => Accepting ${url} as possibly valid`);
                    return true; // Assume valid if rate-limited on GET too
                }
                // GET request also failed
                console.log(`[DEBUG] GET failed for ${url}: ${getError.message}`);
                return false;
            }
        }
    } catch (err) {
        // Catch any other unexpected errors during the process
        console.log(`[ERROR] Unexpected error checking URL ${url}: ${err.message}`);
        return false;
    }
}


/**
 * Checks if a given string is a valid, working HTTP/HTTPS URL.
 * @param {string} url The URL string to validate.
 * @returns {Promise<boolean>} True if the URL is valid and accessible.
 */
async function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    // Basic check for http/https prefix
    if (!url.startsWith('http://') && !url.startsWith('https://')) return false;

    try {
        const valid = await checkUrlWithFallback(url);
        return valid;
    } catch (err) {
        // Log errors during the validation process itself
        console.log(`[ERROR] Failed to verify URL ${url}: ${err.message}`);
        return false; // Treat errors during check as invalid
    }
}

/**
 * Extracts the hostname (domain) from a URL.
 * @param {string} url The URL string.
 * @returns {string} The hostname or an empty string if parsing fails.
 */
function extractDomain(url) {
    try {
        const domain = new URL(url).hostname;
        // Remove www. if present for easier matching
        return domain.replace(/^www\./, '');
    } catch {
        return ''; // Return empty string for invalid URLs
    }
}

// ========== FUNCTIONS FOR GENERATING ALTERNATIVE URLs ==========

/**
 * Generates alternative URLs based on common patterns for certain domains.
 * @param {string} url The original (broken) URL.
 * @returns {string[]} An array of potential alternative URLs.
 */
function generateAlternativeUrls(url) {
    try {
        const domain = extractDomain(url);
        // Find the root domain from the authorized list that matches the URL's domain
        const rootDomain = AUTHORIZED_WEBSITES.find(d => domain === d || domain.endsWith(`.${d}`));

        if (!rootDomain || !COMMON_URL_PATTERNS[rootDomain]) {
            return []; // No patterns defined for this domain
        }

        const patterns = COMMON_URL_PATTERNS[rootDomain];
        const alternatives = [];

        // Apply generic patterns defined in COMMON_URL_PATTERNS
        for (const pattern of patterns) {
            if (pattern.original instanceof RegExp && pattern.original.test(url)) {
                const altUrl = url.replace(pattern.original, pattern.replacement);
                if (altUrl !== url) { // Only add if replacement actually changed the URL
                  alternatives.push(altUrl);
                }
            }
        }

        // Add some specific hardcoded substitutions for corbettmaths.com
        if (rootDomain === 'corbettmaths.com') {
            // If it contains "-pdf1.pdf", try with "-pdf.pdf"
            if (url.includes('-pdf1.pdf')) {
                alternatives.push(url.replace('-pdf1.pdf', '-pdf.pdf'));
            }
            // If it contains "-pdf.pdf", try without the dash ".pdf"
            if (url.includes('-pdf.pdf')) {
                 alternatives.push(url.replace('-pdf.pdf', '.pdf'));
            }

            // Try different years in paths (common issue with uploads)
             const yearMatch = url.match(/\/(\d{4})\//);
             if (yearMatch) {
                 const currentYear = parseInt(yearMatch[1], 10);
                 for (let altYear = 2013; altYear <= new Date().getFullYear(); altYear++) { // Check up to current year
                     if (altYear !== currentYear) {
                         alternatives.push(url.replace(`/${currentYear}/`, `/${altYear}/`));
                     }
                 }
             }


            // Try different common months in paths
            const monthMatch = url.match(/\/(\d{4})\/(\d{2})\//);
            if (monthMatch) {
                const currentYear = monthMatch[1];
                const currentMonth = monthMatch[2];
                const commonMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
                const commonUploadYears = ['2013', '2018', '2019', '2020', '2021', '2022', '2023', '2024']; // Common years seen

                for (const year of commonUploadYears) {
                   for (const month of commonMonths) {
                       const newPath = `/${year}/${month}/`;
                       const oldPath = `/${currentYear}/${currentMonth}/`;
                       if (newPath !== oldPath) {
                           alternatives.push(url.replace(oldPath, newPath));
                       }
                   }
                }
                // Also try replacing year/month structure with just year
                 alternatives.push(url.replace(`/${currentYear}/${currentMonth}/`, `/${currentYear}/`));
            }


            // Specific examples (can be expanded or made more generic)
            if (url.includes('types-of-numbers-pdf1.pdf')) {
                alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/02/Types-of-Number.pdf');
                alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Types-of-Number.pdf');
                alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Types-of-Number.pdf');
            }
            // Add more specific known fixes here...
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
             if (url.includes('triangular-numbers-pdf2.pdf')) { // Note the 'pdf2'
                 alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Triangular-Numbers.pdf');
                 alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Triangular-Numbers.pdf');
             }
             if (url.includes('prime-factorisation-pdf.pdf') || url.includes('prime-factorisation-pdf1.pdf') ) {
                 alternatives.push('https://corbettmaths.com/wp-content/uploads/2013/02/prime-factorisation.pdf');
                 alternatives.push('https://corbettmaths.com/wp-content/uploads/2018/11/Prime-Factorisation.pdf');
                 alternatives.push('https://corbettmaths.com/wp-content/uploads/2019/09/Prime-Factorisation.pdf');
             }
        }

        // Remove duplicates and return
        return [...new Set(alternatives.filter(alt => alt !== url))]; // Ensure original URL isn't included as alternative
    } catch (error) {
        console.log(`[ERROR] Failed to generate alternative URLs for ${url}: ${error.message}`);
        return [];
    }
}

/**
 * Tries to find a working alternative URL using common patterns.
 * @param {string} url The original (broken) URL.
 * @returns {Promise<string|null>} A working alternative URL or null if none found/worked.
 */
async function findWorkingAlternativeUrl(url) {
    const alternatives = generateAlternativeUrls(url);
    if (alternatives.length === 0) {
        return null;
    }

    console.log(`[INFO] Testing ${alternatives.length} pattern-based alternative URLs for ${url}`);
    for (const altUrl of alternatives) {
        try {
            // console.log(`[DEBUG] Trying alternative: ${altUrl}`);
            const isValid = await isValidUrl(altUrl);
            if (isValid) {
                console.log(`[SUCCESS] Found working pattern-based alternative: ${altUrl}`);
                return altUrl; // Return the first valid alternative found
            }
        } catch (error) {
            // Log error trying an alternative, but continue to the next one
            console.log(`[WARN] Error checking alternative ${altUrl}: ${error.message}`);
        }
    }
    // console.log(`[INFO] No working pattern-based alternative found for ${url}`);
    return null; // No working alternative found from patterns
}

// ========== AI SUGGESTION FUNCTIONS (IMPROVED) ==========

/**
 * Validates an AI-suggested URL. Checks format, domain authorization, and accessibility.
 * @param {string} suggestion The raw suggestion string from the AI.
 * @param {string} originalUrl The original broken URL (to avoid suggesting the same one).
 * @returns {Promise<string|null>} The validated, working URL or null.
 */
async function validateSuggestion(suggestion, originalUrl) {
    if (!suggestion || typeof suggestion !== 'string') return null;

    // Clean the string (remove quotes, extra text, etc.)
    let cleanUrl = suggestion.trim();

    // Try to extract only the URL if there's extra text
    // More robust regex to find URLs
    const urlMatch = cleanUrl.match(/https?:\/\/[^\s"'<>]+/);
    if (urlMatch) {
        cleanUrl = urlMatch[0];
    } else {
        // If no clear URL pattern is found, discard the suggestion
        console.log(`[INFO] Invalid suggestion (no URL pattern found): ${suggestion}`);
        return null;
    }

    // Remove any trailing characters that might not be part of the URL (e.g., punctuation)
    cleanUrl = cleanUrl.replace(/[.,;!)\]}>]+$/, '');

    // Check if it's a well-formed URL using the URL constructor
    try {
        new URL(cleanUrl);
    } catch {
        console.log(`[INFO] Invalid suggestion (malformed URL): ${cleanUrl}`);
        return null;
    }

    // Check if the domain is authorized
    const domain = extractDomain(cleanUrl);
    if (!domain) {
        console.log(`[INFO] Invalid suggestion (could not extract domain): ${cleanUrl}`);
        return null;
    }
    const isDomainAuthorized = AUTHORIZED_WEBSITES.some(authDomain =>
        domain === authDomain || domain.endsWith(`.${authDomain}`)
    );

    if (!isDomainAuthorized) {
        console.log(`[INFO] Unauthorized domain in suggestion: ${domain} (URL: ${cleanUrl})`);
        return null;
    }

    // Do not accept the same URL that is broken
    if (cleanUrl === originalUrl) {
        console.log(`[INFO] Suggested URL is the same as the original broken URL.`);
        return null;
    }

    // Check if the suggested URL is actually working
    console.log(`[INFO] Validating suggested URL: ${cleanUrl}`);
    const isWorking = await isValidUrl(cleanUrl);
    if (!isWorking) {
        console.log(`[INFO] Suggested URL is not working: ${cleanUrl}`);
        return null;
    }

    // If all checks pass
    return cleanUrl;
}

/**
 * Extracts a URL from a potentially messy AI response string.
 * @param {string} response The AI's response text.
 * @returns {string|null} The extracted URL or null.
 */
function extractUrlFromResponse(response) {
    if (!response) return null;

    // Basic cleaning
    response = response.replace(/[\r\n\t]/g, ' ').trim();

    // Try common prefixes and suffixes used by models
    response = response.replace(/^.*?URL:\s*/i, '');
    response = response.replace(/^.*?(https?:\/\/)/i, '$1'); // Keep the http(s)://

    // Extract the first potential URL found
    const match = response.match(/https?:\/\/[^\s"'<>]+/i);
    if (match) {
        // Clean potential trailing garbage if the model included explanation
        let extracted = match[0];
        extracted = extracted.replace(/[.,;!)\]}>]+$/, ''); // Remove trailing punctuation
        return extracted;
    }

    return null; // No URL found
}


/**
 * Attempts to get a replacement URL suggestion from Google Gemini.
 */
async function findGeminiSuggestion(title, type, topic, subtopic, source, originalUrl) {
    if (!GOOGLE_GEMINI_API_KEY) return null;
    console.log('[AI] Querying Google Gemini...');

    try {
        const promptText = `
You are an expert in mathematical educational resources.
This specific URL is broken: ${originalUrl}

Resource details:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original Source: ${source}

Analyze the format and structure of the broken URL. Find a replacement URL that is valid and currently working.

Use ONLY the authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. If possible, keep the same domain as the original URL.
2. For sites like corbettmaths.com, some PDFs were moved to different year or month paths (like /2018/ or /2019/ instead of /2013/). Check common patterns.
3. Return ONLY the full URL, without any additional text, explanations, or greetings.
4. The URL must start with http:// or https://
5. If you cannot find a valid, working replacement URL within the authorized domains, respond with the single word "NONE".

Replacement URL:
`;
        const resp = await makeRequestWithRetry(() => axios.post(
            `${GOOGLE_GEMINI_API_URL}?key=${GOOGLE_GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: promptText }] }],
                generationConfig: {
                    temperature: 0.1, // Low temperature for deterministic output
                    maxOutputTokens: 150 // Enough for a URL
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Note: The API key is often passed in the URL for Gemini, but check documentation if headers are preferred.
                    // 'x-goog-api-key': GOOGLE_GEMINI_API_KEY
                },
                 timeout: 30000 // 30 second timeout for API call
            }
        ));

        const output = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

        if (!output || output.toLowerCase() === 'none' || output.toLowerCase().includes('cannot find') || output.toLowerCase().includes('no replacement')) {
             console.log('[AI] Gemini responded with NONE or could not find a replacement.');
             return null;
        }

        const extractedUrl = extractUrlFromResponse(output);
        if (!extractedUrl) {
            console.log(`[AI] Gemini - Could not extract URL from response: "${output}"`);
            return null;
        }

        const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
         if (validatedUrl) {
             console.log(`[AI] Gemini suggested valid URL: ${validatedUrl}`);
         } else {
             console.log(`[AI] Gemini suggestion failed validation: ${extractedUrl}`);
         }
        return validatedUrl;

    } catch (err) {
        console.log(`[ERROR][Gemini] Request failed: ${err.response?.status} ${err.message}`);
        // Optional: Log response data if available for debugging
        // if (err.response?.data) {
        //    console.error('[ERROR][Gemini] Response data:', JSON.stringify(err.response.data));
        // }
        return null;
    }
}

/**
 * Attempts to get a replacement URL suggestion from OpenAI (GPT-4o).
 */
async function findOpenAISuggestion(title, type, topic, subtopic, source, originalUrl) {
    if (!OPENAI_API_KEY) return null;
    console.log('[AI] Querying OpenAI (GPT-4o)...');

    try {
        const prompt = `
This specific URL for a mathematical resource is broken: ${originalUrl}

Resource details:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original Source: ${source}

Analyze the broken URL's format. Find a valid, currently working replacement URL.

Use ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT RULES:
1. Prioritize staying on the original domain (${extractDomain(originalUrl)}) if possible.
2. Be aware of common path changes, especially year/month folders (e.g., /2013/ -> /2019/) on sites like corbettmaths.com.
3. Respond with ONLY the complete replacement URL (starting with http:// or https://).
4. If no valid, working replacement from the authorized domains is found, respond ONLY with the word "NONE".
`;
        const resp = await makeRequestWithRetry(() => axios.post(
            OPENAI_API_URL,
            {
                model: 'gpt-4o', // Use the desired OpenAI model
                messages: [
                    { role: 'system', content: 'You are a helpful assistant specialized in finding replacement URLs for broken educational links. Respond ONLY with the valid URL or the word "NONE". Do not include explanations.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1, // Low temperature for factual task
                max_tokens: 150   // Sufficient for a URL
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                 timeout: 30000 // 30 second timeout
            }
        ));

        const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';

        if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('cannot find') || suggestion.toLowerCase().includes('no replacement')) {
            console.log('[AI] OpenAI responded with NONE or could not find a replacement.');
            return null;
        }

        const extractedUrl = extractUrlFromResponse(suggestion);
        if (!extractedUrl) {
            console.log(`[AI] OpenAI - Could not extract URL from response: "${suggestion}"`);
            return null;
        }

        const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
         if (validatedUrl) {
             console.log(`[AI] OpenAI suggested valid URL: ${validatedUrl}`);
         } else {
             console.log(`[AI] OpenAI suggestion failed validation: ${extractedUrl}`);
         }
        return validatedUrl;

    } catch (err) {
         console.log(`[ERROR][OpenAI] Request failed: ${err.response?.status} ${err.message}`);
        // if (err.response?.data) {
        //    console.error('[ERROR][OpenAI] Response data:', JSON.stringify(err.response.data));
        // }
        return null;
    }
}

/**
 * Attempts to get a replacement URL suggestion from Claude (via Anthropic API).
 */
async function findClaudeSuggestion(title, type, topic, subtopic, source, originalUrl) {
    // Uses the CLAUDE_API key from environment variables
    if (!CLAUDE_API_KEY) return null;
    console.log('[AI] Querying Claude...');

    try {
        const prompt = `
You are an expert in mathematical educational resources.
This specific URL is broken: ${originalUrl}

Resource details:
- Title: "${title}"
- Type: "${type}"
- Topic: ${topic}
- Subtopic: ${subtopic}
- Original Source: ${source}

Analyze the format and structure of the broken URL. Find a replacement URL that is valid and currently working.

Use ONLY the authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}

IMPORTANT:
1. If possible, keep the same domain as the original URL.
2. For sites like corbettmaths.com, some PDFs were moved to different year or month paths (like /2018/ or /2019/ instead of /2013/). Check common patterns.
3. Return ONLY the full URL, without any additional text, explanations, or greetings.
4. The URL must start with http:// or https://
5. If you cannot find a valid, working replacement URL within the authorized domains, respond with the single word "NONE".

Respond only with the URL or "NONE".`;

        const resp = await makeRequestWithRetry(() => axios.post(
            CLAUDE_API_URL, // Using the standard Anthropic API endpoint
            {
                // Adjust model based on availability/preference, Haiku is fast and cheap
                model: 'claude-3-haiku-20240307',
                max_tokens: 150,
                temperature: 0.1,
                messages: [
                    { role: 'user', content: prompt }
                ]
            },
            {
                headers: {
                    'x-api-key': CLAUDE_API_KEY, // Using the key named CLAUDE_API
                    'anthropic-version': '2023-06-01', // Required header for Anthropic API
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 second timeout
            }
        ));

        // Response structure for Anthropic Claude API
        const content = resp.data?.content?.[0]?.text?.trim() || '';

        if (!content || content.toLowerCase() === 'none' || content.toLowerCase().includes('cannot find') || content.toLowerCase().includes('no replacement')) {
            console.log('[AI] Claude responded with NONE or could not find a replacement.');
            return null;
        }

        const extractedUrl = extractUrlFromResponse(content);
        if (!extractedUrl) {
             console.log(`[AI] Claude - Could not extract URL from response: "${content}"`);
            return null;
        }

        const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
         if (validatedUrl) {
             console.log(`[AI] Claude suggested valid URL: ${validatedUrl}`);
         } else {
             console.log(`[AI] Claude suggestion failed validation: ${extractedUrl}`);
         }
        return validatedUrl;

    } catch (err) {
        console.log(`[ERROR][Claude] Request failed: ${err.response?.status} ${err.message}`);
        // if (err.response?.data) {
        //    console.error('[ERROR][Claude] Response data:', JSON.stringify(err.response.data));
        // }
        return null;
    }
}


/**
 * Attempts to get a replacement URL suggestion from Deepseek.
 * !! IMPORTANT: Requires replacing placeholder URL and potentially adjusting request structure !!
 */
async function findDeepseekSuggestion(title, type, topic, subtopic, source, originalUrl) {
    if (!DEEPSEEK_API_KEY) return null;
    // Ensure the placeholder URL has been replaced
    if (DEEPSEEK_API_URL === 'YOUR_DEEPSEEK_API_ENDPOINT') {
         console.log('[WARN][Deepseek] API endpoint is not configured. Skipping.');
         return null;
    }
    console.log('[AI] Querying Deepseek...');


    try {
        // Prompt is similar to other models, adjust if Deepseek has specific requirements
        const prompt = `
This specific URL for a mathematical resource is broken: ${originalUrl}
Resource details: Title: "${title}", Type: "${type}", Topic: ${topic}, Subtopic: ${subtopic}, Source: ${source}.
Find a valid, currently working replacement URL from ONLY these authorized domains: ${AUTHORIZED_WEBSITES.join(', ')}.
Prioritize the original domain. Be aware of path changes (e.g., years/months).
Respond ONLY with the complete URL (starting http:// or https://) or the word "NONE".`;

        // Assumes an OpenAI-like API structure. **ADJUST AS NEEDED** based on Deepseek documentation.
        const resp = await makeRequestWithRetry(() => axios.post(
            DEEPSEEK_API_URL,
            {
                // Check Deepseek docs for correct model names
                model: 'deepseek-chat', // Example model name - VERIFY THIS
                messages: [
                    { role: 'system', content: 'You find replacement URLs for broken educational links. Respond ONLY with the URL or "NONE".' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1,
                max_tokens: 150
                // Add any other required parameters for Deepseek API
            },
            {
                headers: {
                    // Check Deepseek docs for correct auth header (e.g., Bearer token?)
                    'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json'
                    // Add any other required headers
                },
                timeout: 30000 // 30 second timeout
            }
        ));

        // Assumes an OpenAI-like response structure. **ADJUST AS NEEDED**.
        const suggestion = resp.data?.choices?.[0]?.message?.content?.trim() || '';

        if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('cannot find') || suggestion.toLowerCase().includes('no replacement')) {
            console.log('[AI] Deepseek responded with NONE or could not find a replacement.');
            return null;
        }

        const extractedUrl = extractUrlFromResponse(suggestion);
        if (!extractedUrl) {
            console.log(`[AI] Deepseek - Could not extract URL from response: "${suggestion}"`);
            return null;
        }

        const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
         if (validatedUrl) {
             console.log(`[AI] Deepseek suggested valid URL: ${validatedUrl}`);
         } else {
             console.log(`[AI] Deepseek suggestion failed validation: ${extractedUrl}`);
         }
        return validatedUrl;

    } catch (err) {
        console.log(`[ERROR][Deepseek] Request failed: ${err.response?.status} ${err.message}`);
        // if (err.response?.data) {
        //    console.error('[ERROR][Deepseek] Response data:', JSON.stringify(err.response.data));
        // }
        return null;
    }
}

/**
 * Attempts to get a replacement URL suggestion from Qwen (e.g., Alibaba Tongyi Qianwen).
 * !! IMPORTANT: Requires replacing placeholder URL and potentially adjusting request structure !!
 */
async function findQwenSuggestion(title, type, topic, subtopic, source, originalUrl) {
    // Using the primary QWEN_API key
    if (!QWEN_API_KEY) return null;
     // Ensure the placeholder URL has been replaced
    if (QWEN_API_URL === 'YOUR_QWEN_API_ENDPOINT') {
         console.log('[WARN][Qwen] API endpoint is not configured. Skipping.');
         return null;
    }
    console.log('[AI] Querying Qwen...');


    try {
        // Prompt similar to others
        const prompt = `
Broken URL: ${originalUrl}
Resource details: Title: "${title}", Type: "${type}", Topic: ${topic}, Subtopic: ${subtopic}, Source: ${source}.
Find a working replacement URL from ONLY these domains: ${AUTHORIZED_WEBSITES.join(', ')}.
Prioritize original domain. Check for path changes.
Respond ONLY with the complete URL (http:// or https://) or "NONE".`;

        // Assumes an OpenAI-like API structure. **ADJUST AS NEEDED** based on Qwen documentation.
        // Qwen's API might differ significantly.
        const resp = await makeRequestWithRetry(() => axios.post(
            QWEN_API_URL,
            {
                // Check Qwen docs for correct model names and parameters
                model: 'qwen-plus', // Example model name - VERIFY THIS
                input: { // Qwen often uses an 'input' structure
                    messages: [
                        { role: 'system', content: 'Find replacement URLs. Respond ONLY with URL or "NONE".' },
                        { role: 'user', content: prompt }
                    ]
                },
                parameters: { // Qwen often uses a 'parameters' structure
                   temperature: 0.1,
                   max_tokens: 150
                   // result_format: 'message' // May be needed
                }
            },
            {
                headers: {
                    // Check Qwen docs for correct auth header
                    'Authorization': `Bearer ${QWEN_API_KEY}`,
                    'Content-Type': 'application/json'
                    // Qwen might require specific headers like 'X-DashScope-SSE' for streaming etc. Adapt for non-streaming.
                },
                 timeout: 30000 // 30 second timeout
            }
        ));

        // Assumes a Qwen-like response structure. **ADJUST AS NEEDED**.
        // Qwen might put the content under resp.data.output.choices[0].message.content or similar
        const suggestion = resp.data?.output?.choices?.[0]?.message?.content?.trim() || resp.data?.output?.text?.trim() || '';

        if (!suggestion || suggestion.toLowerCase() === 'none' || suggestion.toLowerCase().includes('cannot find') || suggestion.toLowerCase().includes('no replacement')) {
            console.log('[AI] Qwen responded with NONE or could not find a replacement.');
            return null;
        }

        const extractedUrl = extractUrlFromResponse(suggestion);
        if (!extractedUrl) {
             console.log(`[AI] Qwen - Could not extract URL from response: "${suggestion}"`);
            return null;
        }

        const validatedUrl = await validateSuggestion(extractedUrl, originalUrl);
         if (validatedUrl) {
             console.log(`[AI] Qwen suggested valid URL: ${validatedUrl}`);
         } else {
             console.log(`[AI] Qwen suggestion failed validation: ${extractedUrl}`);
         }
        return validatedUrl;

    } catch (err) {
        console.log(`[ERROR][Qwen] Request failed: ${err.response?.status} ${err.message}`);
        // if (err.response?.data) {
        //    console.error('[ERROR][Qwen] Response data:', JSON.stringify(err.response.data));
        // }
        return null;
    }
}


/**
 * Main function to find alternatives - first tries patterns, then cascades through AIs.
 * @returns {Promise<{provider: string, url: string}|null>} Object with provider and URL, or null.
 */
async function findAlternativeUrl(url, title, type, topic, subtopic, source) {
    console.log(`[INFO] Searching for alternative for: ${url}`);

    // 1. First try known patterns (much faster and avoids rate limits/costs)
    try {
        const patternBasedUrl = await findWorkingAlternativeUrl(url);
        if (patternBasedUrl) {
            return { provider: 'PatternMatching', url: patternBasedUrl };
        }
    } catch (patternError) {
         console.log(`[WARN] Error during pattern matching for ${url}: ${patternError.message}`);
    }


    // 2. If patterns fail or error, try AI cascade
    console.log(`[INFO] Pattern matching failed or found no alternative. Trying AI suggestions...`);
    try {
        const aiSuggestion = await cascadeSuggester(title, type, topic, subtopic, source, url);
        if (aiSuggestion) {
            return aiSuggestion; // Already contains { provider, url }
        }
    } catch (aiError) {
        console.log(`[ERROR] Error during AI suggestion cascade for ${url}: ${aiError.message}`);
    }

    // If both pattern matching and AI fail
    console.log(`[INFO] No working alternative found for ${url} after pattern and AI checks.`);
    return null;
}


/**
 * Cascade through available AI suggesters with smart ordering.
 * @returns {Promise<{provider: string, url: string}|null>} Object with provider and URL, or null.
 */
async function cascadeSuggester(title, type, topic, subtopic, source, originalUrl) {
    const domain = extractDomain(originalUrl);

    // Define the cascade order based on available keys
    const suggesterFunctions = [];

    // Prioritize based on domain or general preference
     if (domain.includes('corbettmaths.com') && OPENAI_API_KEY) {
        // OpenAI might be good with CorbettMaths patterns
         suggesterFunctions.push({ name: 'OpenAI', fn: findOpenAISuggestion });
    }

     // Add remaining AIs in a preferred order
     if (GOOGLE_GEMINI_API_KEY) suggesterFunctions.push({ name: 'Gemini', fn: findGeminiSuggestion });
     // Add OpenAI again if not already added (for non-CorbettMaths domains)
     if (OPENAI_API_KEY && !domain.includes('corbettmaths.com')) {
         suggesterFunctions.push({ name: 'OpenAI', fn: findOpenAISuggestion });
     }
     if (CLAUDE_API_KEY) suggesterFunctions.push({ name: 'Claude', fn: findClaudeSuggestion });
     if (DEEPSEEK_API_KEY && DEEPSEEK_API_URL !== 'YOUR_DEEPSEEK_API_ENDPOINT') {
         suggesterFunctions.push({ name: 'Deepseek', fn: findDeepseekSuggestion });
     }
     if (QWEN_API_KEY && QWEN_API_URL !== 'YOUR_QWEN_API_ENDPOINT') {
          suggesterFunctions.push({ name: 'Qwen', fn: findQwenSuggestion });
     }
     // TODO: Add logic for QWEN_API_KEY_2 if needed (e.g., as another step)


    // Execute the cascade
    for (const suggester of suggesterFunctions) {
        try {
            // console.log(`[INFO] Trying AI provider: ${suggester.name}...`); // Log which AI is being tried
            const result = await suggester.fn(title, type, topic, subtopic, source, originalUrl);
            if (result) {
                console.log(`[SUCCESS] Found suggestion via ${suggester.name}.`);
                return { provider: suggester.name, url: result };
            }
             // console.log(`[INFO] ${suggester.name} did not find a suggestion.`);
        } catch (err) {
            // Log error for the specific AI but continue cascade
            console.log(`[WARN] ${suggester.name} suggestion failed: ${err.message}. Trying next provider...`);
        }
    }

    console.log('[INFO] All available AI providers failed to find a valid suggestion.');
    return null; // Return null if no AI provider was successful
}

/**
 * Updates the resource file content with found and validated suggestions.
 * @param {Array} brokenLinks An array of objects representing broken links, potentially with suggestions.
 * @returns {Promise<number>} The number of links successfully fixed in the content.
 */
async function updateResourcesFile(brokenLinks) {
    let fileContent = fs.readFileSync(resourcesFilePath, 'utf8');
    let fixedCount = 0;
    let changesMade = false;

    for (const link of brokenLinks) {
        if (link.suggestion && link.suggestionProvider) { // Ensure suggestion is valid and has a provider
            try {
                // Escape the original URL for use in regex (handles special characters)
                const escapedUrl = link.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                 // Create a regex to find the specific URL within a 'url:' property context
                 // Looks for `url:` possibly with spaces, optional quotes, the URL, optional quotes, and comma/newline/brace
                 const urlRegex = new RegExp(`(url\\s*:\\s*['"]?)${escapedUrl}(['"]?\\s*[,}\n])`, 'g');

                let matchFound = false;
                fileContent = fileContent.replace(urlRegex, (match, prefix, suffix) => {
                     matchFound = true;
                     console.log(`[SUCCESS] Fixing link in file: ${link.url} -> ${link.suggestion} (via ${link.suggestionProvider})`);
                     fixedCount++;
                     changesMade = true;
                     // Reconstruct the line with the new URL, preserving original quotes (if any) and suffix
                     return `${prefix}${link.suggestion}${suffix}`;
                 });

                 if (!matchFound) {
                     console.log(`[WARN] Could not find exact match for 'url: "${link.url}"' in file to replace.`);
                     // Optional: attempt a less strict replacement (use with caution)
                     // fileContent = fileContent.replace(link.url, link.suggestion);
                 }

            } catch (err) {
                console.log(`[ERROR] Failed to replace link ${link.url} in file content: ${err.message}`);
            }
        }
    }

    if (changesMade) {
        try {
           fs.writeFileSync(resourcesFilePath, fileContent, 'utf8');
           console.log(`[INFO] Resource file updated with ${fixedCount} fixes.`);
        } catch (writeError) {
             console.log(`[ERROR] Failed to write updated resource file: ${writeError.message}`);
             fixedCount = 0; // Reset count as the write failed
        }
    } else {
        console.log('[INFO] No replacements made in the resource file.');
    }
    return fixedCount;
}

// ========== MAIN SCRIPT ==========

/**
 * Main asynchronous function to run the link checking process.
 */
async function main() {
    console.log('=== Broken Link Diagnostics ===');
    console.log(`Resource file: ${resourcesFilePath}`);
    console.log(`Report will be saved to: ${reportFilePath}`);

    // Dynamically import p-limit
    let pLimit;
    try {
        const pLimitModule = await import('p-limit');
        pLimit = pLimitModule.default;
    } catch (error) {
        console.error('[ERROR] Failed to import p-limit:', error.message);
        console.error('[ERROR] Install p-limit with: npm install p-limit');
        // Basic fallback implementation if p-limit import fails
        pLimit = (concurrency) => {
            const queue = [];
            let activeCount = 0;
            const next = () => {
                activeCount--;
                if (queue.length > 0) {
                    queue.shift()();
                }
            };
            return (fn) => {
                return new Promise((resolve, reject) => {
                    const run = async () => {
                        activeCount++;
                        try {
                            resolve(await fn());
                        } catch (err) {
                            reject(err);
                        } finally { // Ensure next() is called even if fn() throws
                            next();
                        }
                    };
                    if (activeCount < concurrency) {
                        run();
                    } else {
                        queue.push(run);
                    }
                });
            };
        };
         console.warn('[WARN] Using basic concurrency limiter fallback.');
    }


    // Read the code file
    let code;
    try {
        code = fs.readFileSync(resourcesFilePath, 'utf8');
    } catch (readError) {
        console.error(`[ERROR] Could not read resource file: ${resourcesFilePath}`);
        console.error(readError.message);
        process.exit(1);
    }


    // Parse the code into an Abstract Syntax Tree (AST)
    let ast;
    try {
        ast = parse(code, {
            sourceType: 'module', // Assuming ES module syntax
            plugins: ['typescript', 'jsx'] // Enable TS and JSX parsing if needed
        });
    } catch (parseError) {
        console.error(`[ERROR] Could not parse resource file: ${resourcesFilePath}`);
        console.error(parseError.message);
        process.exit(1);
    }


    const linkData = [];
    let totalLinksFound = 0;

    // Traverse the AST to find 'url' properties in objects
    try {
      traverse(ast, {
          ObjectProperty(path) {
              // Check if the key is an Identifier named 'url'
              // and the value is a StringLiteral
              if (
                  path.node.key.type === 'Identifier' &&
                  path.node.key.name === 'url' &&
                  path.node.value.type === 'StringLiteral'
              ) {
                  totalLinksFound++;
                  const urlValue = path.node.value.value;

                  // Attempt to find related properties (title, type, source, etc.) in the same object
                  const parentObject = path.parentPath.node;
                  let title = '', rtype = '', source = '', topic = 'mathematics', subtopic = 'general'; // Defaults

                  if (parentObject && parentObject.properties) {
                     for (const prop of parentObject.properties) {
                         if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
                              const keyName = prop.key.name;
                              const valueNode = prop.value;

                              if (keyName === 'title' && valueNode.type === 'StringLiteral') {
                                  title = valueNode.value;
                              } else if (keyName === 'type' && valueNode.type === 'StringLiteral') {
                                  rtype = valueNode.value;
                              } else if (keyName === 'source' && valueNode.type === 'StringLiteral') {
                                  source = valueNode.value;
                              } else if (keyName === 'topic' && valueNode.type === 'StringLiteral') {
                                  topic = valueNode.value;
                              } else if (keyName === 'subtopic' && valueNode.type === 'StringLiteral') {
                                  subtopic = valueNode.value;
                              }
                          }
                     }
                  }


                  // Get approximate line and column number
                  const { line, column } = path.node.loc ? path.node.loc.start : { line: 'N/A', column: 'N/A' };

                  // Store data for later checking
                  linkData.push({
                      url: urlValue,
                      line,
                      column,
                      title: title || 'N/A', // Use N/A if not found
                      type: rtype || 'N/A',
                      source: source || 'N/A',
                      topic: topic,
                      subtopic: subtopic,
                      isBroken: false,      // Will be updated after check
                      suggestion: null,     // Will be updated if an alternative is found
                      suggestionProvider: null // Records how the suggestion was found
                  });
              }
          }
      });
    } catch (traverseError) {
       console.error(`[ERROR] Failed during AST traversal: ${traverseError.message}`);
       process.exit(1);
    }


    console.log(`[INFO] Total links found in AST: ${totalLinksFound}`);
     if (totalLinksFound === 0) {
         console.log('[INFO] No `url:` properties found in the specified file. Exiting.');
         process.exit(0);
     }

    // Check each link with concurrency limit to avoid overwhelming servers/APIs
    // Reduced concurrency to minimize rate limits, adjust as needed
    const limit = pLimit(5); // Concurrency limit of 5 parallel checks/AI calls
    let checkedCount = 0;
    const totalToCheck = linkData.length;

    console.log(`[INFO] Starting URL validity checks (Concurrency: ${5})...`);

    const checkTasks = linkData.map((item, index) =>
        limit(async () => {
            try {
                const isValid = await isValidUrl(item.url);
                 checkedCount++;
                 process.stdout.write(`\r[INFO] Checking URL ${checkedCount}/${totalToCheck}... `); // Progress indicator

                if (!isValid) {
                     process.stdout.write('\n'); // Newline after progress indicator
                     console.log(`[WARN] Broken link detected: ${item.url} (Line: ${item.line}, Title: ${item.title})`);
                    item.isBroken = true;

                    // Attempt to find an alternative URL
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
                         // No need to re-validate here as findAlternativeUrl -> cascadeSuggester -> validateSuggestion already does it.
                         console.log(`[INFO] Valid alternative found for ${item.url}: ${alternativeResult.url} (via ${alternativeResult.provider})`);
                    } else {
                        console.log(`[INFO] No working alternative could be found for ${item.url}.`);
                    }
                }
                // else {
                //     console.log(`[OK] Link OK: ${item.url}`); // Optional: log valid links
                // }
            } catch (taskError) {
                process.stdout.write('\n'); // Ensure newline if error occurs
                console.error(`[ERROR] Error processing URL ${item.url}: ${taskError.message}`);
                 item.isBroken = true; // Mark as broken if the check itself fails catastrophically
                 item.suggestionProvider = 'ErrorDuringCheck';
            }
        })
    );

    // Wait for all checks to complete
    await Promise.all(checkTasks);
     process.stdout.write('\n'); // Final newline after progress indicator
     console.log('[INFO] All URL checks completed.');


    // Filter out only the links confirmed as broken
    const actualBrokenLinks = linkData.filter(x => x.isBroken);

    // Update the resource file with the suggestions found
    const fixedCount = await updateResourcesFile(actualBrokenLinks);

    // Generate the final report
    const report = {
        checkTimestamp: new Date().toISOString(),
        resourceFile: resourcesFilePath,
        totalLinksChecked: totalToCheck,
        brokenLinkCount: actualBrokenLinks.length,
        linksFixedInFile: fixedCount, // Count of links successfully replaced in the file
        brokenLinksDetails: actualBrokenLinks.map(link => ({
            originalUrl: link.url,
            title: link.title,
            type: link.type,
            source: link.source,
            topic: link.topic,
            subtopic: link.subtopic,
            location: `Line ${link.line}, Col ${link.column}`,
            suggestedReplacement: link.suggestion, // Null if no valid suggestion found/validated
            suggestionSource: link.suggestionProvider // 'PatternMatching', 'Gemini', 'OpenAI', 'Claude', etc., or null
        }))
    };

    // Save the report to a JSON file
    try {
        fs.writeFileSync(reportFilePath, JSON.stringify(report, null, 2), 'utf8'); // Pretty print JSON
    } catch (reportError) {
        console.error(`[ERROR] Failed to write report file: ${reportFilePath}`);
        console.error(reportError.message);
    }


    // Final summary output
    console.log('\n=== DIAGNOSTICS COMPLETE ===');
    console.log(`- Total links checked: ${totalToCheck}`);
    console.log(`- Broken links found: ${actualBrokenLinks.length}`);
    console.log(`- Links automatically fixed in file: ${fixedCount}`);
    console.log(`- Full report saved to: ${reportFilePath}`);
    console.log('============================');

    if (actualBrokenLinks.length > fixedCount) {
         console.log(`[INFO] ${actualBrokenLinks.length - fixedCount} broken links remain that could not be automatically fixed.`);
         console.log('[INFO] Please review the report file for details and consider manual fixes.');
    }
}

// Execute the main function and catch any top-level errors
main().catch(err => {
    console.error(`[FATAL ERROR] The script failed unexpectedly: ${err.message}`);
     console.error(err.stack); // Print stack trace for debugging
    process.exit(1); // Exit with error code
});
