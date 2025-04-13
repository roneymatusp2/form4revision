const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

// API Configuration
const GOOGLE_GEMINI_API = process.env.GOOGLE_GEMINI_API;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const QWEN_API_KEY = process.env.QWEN_API;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Corrigido para usar o modelo correto do Gemini
const GOOGLE_GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const QWEN_API_URL = 'https://api.qwen.ai/v1/chat/completions';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

console.log(`Google Gemini API Key present: ${GOOGLE_GEMINI_API ? 'Yes' : 'No'}`);
console.log(`DeepSeek API Key present: ${DEEPSEEK_API_KEY ? 'Yes' : 'No'}`);
console.log(`Qwen API Key present: ${QWEN_API_KEY ? 'Yes' : 'No'}`);
console.log(`OpenAI API Key present: ${OPENAI_API_KEY ? 'Yes' : 'No'}`);

// Set a global timeout to ensure we finish within 1 hour
const GLOBAL_TIMEOUT = 55 * 60 * 1000; // 55 minutes in milliseconds
let shouldContinue = true;

setTimeout(() => {
  console.log('Global timeout reached (55 minutes). Finalizing current operations...');
  shouldContinue = false;
}, GLOBAL_TIMEOUT);

// Authorized educational websites
const AUTHORIZED_WEBSITES = [
  'corbettmaths.com',
  'khanacademy.org',
  'savemyexams.com',
  'mathsgenie.co.uk',
  'draustinmaths.com',
  'physicsandmathstutor.com',
  'youtube.com',      // For embedded videos
  'maths4everyone.com',
  'mathsaurus.com',
  'mathantics.com',
  'fuseschool.org',
  'bbc.co.uk',        // BBC Bitesize
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

// File path for the resources
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced URL validation function with content type checking
async function isValidUrl(url, type) {
  try {
    console.log(`Checking URL: ${url}`);
    const response = await axios.head(url, { 
      timeout: 15000,
      validateStatus: status => status < 400, // Accept any status code less than 400
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      }
    });
    
    // Additional content type validation (optional - adds more checks)
    if (type === 'pdf') {
      const contentType = response.headers['content-type'];
      if (contentType && !contentType.includes('pdf') && !contentType.includes('application/octet-stream')) {
        console.log(`URL returned non-PDF content type: ${contentType}`);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.log(`Error checking URL ${url}: ${error.message}`);
    // If we got rate limited (429), let's consider it potentially valid for now
    if (error.response && error.response.status === 429) {
      console.log('Rate limited, but considering URL potentially valid');
      return true;
    }
    return false;
  }
}

// Function to ensure URL is in correct format for YouTube videos
function formatYouTubeUrl(url) {
  // If it's a YouTube URL, ensure it's in embed format
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  return url;
}

// Extract domain from URL for categorization
function extractDomain(url) {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.substring(4) : domain;
  } catch (e) {
    return null;
  }
}

// Enhanced mock replacement function
function getMockReplacement(title, type, source) {
  // Map source to domain for consistency
  const sourceDomain = source.toLowerCase();
  
  if (type === 'video') {
    // Topic-specific video replacements (high quality content)
    if (title.toLowerCase().includes('linear')) {
      return 'https://www.youtube.com/embed/m9-_sYVcSxk'; // Linear functions video
    } else if (title.toLowerCase().includes('quadratic')) {
      return 'https://www.youtube.com/embed/YHKShQgTLAY'; // Quadratic equations video
    } else if (title.toLowerCase().includes('angle') || title.toLowerCase().includes('geometry')) {
      return 'https://www.youtube.com/embed/NVuMULQjb3o'; // Angles video
    } else if (title.toLowerCase().includes('trigonometry')) {
      return 'https://www.youtube.com/embed/F21S9Wpi0y8'; // Trigonometry video
    } else if (title.toLowerCase().includes('pythagoras')) {
      return 'https://www.youtube.com/embed/JCB-RILJJ_k'; // Pythagoras theorem
    } else if (title.toLowerCase().includes('circle')) {
      return 'https://www.youtube.com/embed/O-cawByg2aA'; // Circle theorems
    } else if (title.toLowerCase().includes('indice') || title.toLowerCase().includes('indices')) {
      return 'https://www.youtube.com/embed/09WIe54BVVc'; // Laws of indices
    } else if (title.toLowerCase().includes('sequence')) {
      return 'https://www.youtube.com/embed/EiXbEhxGS8g'; // Sequences
    } else {
      // Channel-specific defaults for when no topic-specific video is found
      if (sourceDomain.includes('corbett')) {
        return 'https://corbettmaths.com/more/5-a-day/gcse/'; // Corbett Maths 5-a-day practice
      } else if (sourceDomain.includes('khan')) {
        return 'https://www.khanacademy.org/math/cc-eighth-grade-math'; // Khan Academy math
      } else {
        return 'https://www.youtube.com/embed/l9nh1l8ZIJQ'; // General math video
      }
    }
  } else if (type === 'pdf') {
    // Source-specific PDF replacements
    if (sourceDomain.includes('corbett')) {
      if (title.toLowerCase().includes('indice') || title.toLowerCase().includes('indices')) {
        return 'https://corbettmaths.com/wp-content/uploads/2019/03/Indices.pdf';
      } else {
        return 'https://corbettmaths.com/wp-content/uploads/2019/02/GCSE-Revision-Cards.pdf';
      }
    } else if (sourceDomain.includes('austin')) {
      return 'https://www.draustinmaths.com/workbooks';
    } else if (sourceDomain.includes('genie')) {
      return 'https://www.mathsgenie.co.uk/resources/gcse-maths-takeaway.pdf';
    } else if (sourceDomain.includes('maths4everyone')) {
      return 'https://www.maths4everyone.com/resources.html';
    } else {
      // Default for unknown sources
      return 'https://www.mathsgenie.co.uk/resources/gcse-maths-takeaway.pdf';
    }
  }
  
  // Return null if no suitable replacement found - better to not provide a replacement
  // than to provide something completely unrelated
  return null;
}

// Function to find replacement using Google Gemini API
async function findGeminiReplacement(title, type, source, topic, subtopic) {
  if (!GOOGLE_GEMINI_API) {
    console.log('No Google Gemini API key available, skipping Gemini API call');
    return null;
  }
  
  try {
    console.log(`Searching for replacement using Google Gemini for: ${title} (${type}) from ${source}`);
    
    const response = await axios.post(
      `${GOOGLE_GEMINI_API_URL}?key=${GOOGLE_GEMINI_API}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an educational resource expert. Your entire response must consist solely of a single valid URL and nothing else. No explanations, no comments, just the URL.

Find a specific working ${type} resource about "${title}" for ${topic}, ${subtopic}. The original source was ${source}.

Choose from these sources: ${AUTHORIZED_WEBSITES.join(', ')}

DO NOT provide generic index pages or collections (like '5-a-day' pages) unless you cannot find anything specific about "${title}".

For YouTube videos, you MUST use the embed format like this: https://www.youtube.com/embed/VIDEO_ID (NOT the standard watch URL format).

IMPORTANT: Your ENTIRE response must be ONLY the URL. If you cannot find a suitable resource, respond with only the word "NONE".`
              }
            ]
          }
        ],
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
    );

    console.log('Google Gemini API response received');
    let suggestedUrl = '';
    
    if (response.data && 
        response.data.candidates && 
        response.data.candidates[0] && 
        response.data.candidates[0].content && 
        response.data.candidates[0].content.parts && 
        response.data.candidates[0].content.parts[0] && 
        response.data.candidates[0].content.parts[0].text) {
      suggestedUrl = response.data.candidates[0].content.parts[0].text.trim();
    }
    
    // Skip if response is "NONE" or doesn't appear to be a URL
    if (suggestedUrl === "NONE" || !suggestedUrl.startsWith('http')) {
      console.log('Invalid URL or "NONE" response received from Google Gemini');
      return null;
    }
    
    console.log(`Google Gemini suggested URL: ${suggestedUrl}`);
    
    const formattedUrl = formatYouTubeUrl(suggestedUrl);
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => formattedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`Google Gemini suggested URL ${formattedUrl} is not from an authorized domain`);
      return null;
    }
    
    // Check if the URL is valid with content type validation
    const isValid = await isValidUrl(formattedUrl, type);
    if (!isValid) {
      console.log(`Google Gemini suggested URL ${formattedUrl} is not valid`);
      return null;
    }
    
    return formattedUrl;
  } catch (error) {
    console.error(`Error finding replacement with Google Gemini: ${error.message}`);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    return null;
  }
}

// Function to find replacement using DeepSeek Reasoner API
async function findDeepSeekReplacement(title, type, source, topic, subtopic) {
  if (!DEEPSEEK_API_KEY) {
    console.log('No DeepSeek API key available, skipping DeepSeek API call');
    return null;
  }
  
  try {
    console.log(`Searching for replacement using DeepSeek for: ${title} (${type}) from ${source}`);
    
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-reasoner',
        messages: [
          {
            role: 'system',
            content: 'You are an educational resource expert with strong reasoning abilities. Your entire response must consist solely of a valid URL or the word "NONE" if no suitable resource is found. No explanations, no comments, just the URL or "NONE".'
          },
          {
            role: 'user',
            content: `Find a specific working ${type} resource about "${title}" for ${topic}, ${subtopic}. The original source was ${source}.

Choose from these sources: ${AUTHORIZED_WEBSITES.join(', ')}

DO NOT provide generic index pages or collections (like '5-a-day' pages) unless you cannot find anything specific about "${title}".

For YouTube videos, you MUST use the embed format like this: https://www.youtube.com/embed/VIDEO_ID (NOT the standard watch URL format).

IMPORTANT: Your ENTIRE response must be ONLY the URL. If you cannot find a suitable resource, respond with only the word "NONE".`
          }
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

    console.log('DeepSeek API response received');
    const suggestedUrl = response.data.choices[0].message.content.trim();
    
    // Skip if response is "NONE" or doesn't appear to be a URL
    if (suggestedUrl === "NONE" || !suggestedUrl.startsWith('http')) {
      console.log('Invalid URL or "NONE" response received from DeepSeek');
      return null;
    }
    
    console.log(`DeepSeek suggested URL: ${suggestedUrl}`);
    
    const formattedUrl = formatYouTubeUrl(suggestedUrl);
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => formattedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`DeepSeek suggested URL ${formattedUrl} is not from an authorized domain`);
      return null;
    }
    
    // Check if the URL is valid with content type validation
    const isValid = await isValidUrl(formattedUrl, type);
    if (!isValid) {
      console.log(`DeepSeek suggested URL ${formattedUrl} is not valid`);
      return null;
    }
    
    return formattedUrl;
  } catch (error) {
    console.error(`Error finding replacement with DeepSeek: ${error.message}`);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    return null;
  }
}

// Function to find replacement using Qwen API
async function findQwenReplacement(title, type, source, topic, subtopic) {
  if (!QWEN_API_KEY) {
    console.log('No Qwen API key available, skipping Qwen API call');
    return null;
  }
  
  try {
    console.log(`Searching for replacement using Qwen for: ${title} (${type}) from ${source}`);
    
    const response = await axios.post(
      QWEN_API_URL,
      {
        model: 'qwen-max',
        messages: [
          {
            role: 'system',
            content: 'You are an educational resource expert with internet access. Your entire response must consist solely of a valid URL or the word "NONE" if no suitable resource is found. No explanations, no comments, just the URL or "NONE".'
          },
          {
            role: 'user',
            content: `Find a specific working ${type} resource about "${title}" for ${topic}, ${subtopic}. The original source was ${source}.

Choose from these sources: ${AUTHORIZED_WEBSITES.join(', ')}

DO NOT provide generic index pages or collections (like '5-a-day' pages) unless you cannot find anything specific about "${title}".

For YouTube videos, you MUST use the embed format like this: https://www.youtube.com/embed/VIDEO_ID (NOT the standard watch URL format).

IMPORTANT: Your ENTIRE response must be ONLY the URL. If you cannot find a suitable resource, respond with only the word "NONE".`
          }
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

    console.log('Qwen API response received');
    const suggestedUrl = response.data.choices[0].message.content.trim();
    
    // Skip if response is "NONE" or doesn't appear to be a URL
    if (suggestedUrl === "NONE" || !suggestedUrl.startsWith('http')) {
      console.log('Invalid URL or "NONE" response received from Qwen');
      return null;
    }
    
    console.log(`Qwen suggested URL: ${suggestedUrl}`);
    
    const formattedUrl = formatYouTubeUrl(suggestedUrl);
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => formattedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`Qwen suggested URL ${formattedUrl} is not from an authorized domain`);
      return null;
    }
    
    // Check if the URL is valid with content type validation
    const isValid = await isValidUrl(formattedUrl, type);
    if (!isValid) {
      console.log(`Qwen suggested URL ${formattedUrl} is not valid`);
      return null;
    }
    
    return formattedUrl;
  } catch (error) {
    console.error(`Error finding replacement with Qwen: ${error.message}`);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    return null;
  }
}

// Function to find replacement using OpenAI API
async function findOpenAIReplacement(title, type, source, topic, subtopic) {
  if (!OPENAI_API_KEY) {
    console.log('No OpenAI API key available, skipping OpenAI API call');
    return null;
  }
  
  try {
    console.log(`Searching for replacement using OpenAI for: ${title} (${type}) from ${source}`);
    
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          {
            role: 'system',
            content: 'You are an educational resource expert. Your entire response must consist solely of a valid URL or the word "NONE" if no suitable resource is found. No explanations, no comments, just the URL or "NONE".'
          },
          {
            role: 'user',
            content: `Find a specific working ${type} resource about "${title}" for ${topic}, ${subtopic}. The original source was ${source}.

Choose from these sources: ${AUTHORIZED_WEBSITES.join(', ')}

DO NOT provide generic index pages or collections (like '5-a-day' pages) unless you cannot find anything specific about "${title}".

For YouTube videos, you MUST use the embed format like this: https://www.youtube.com/embed/VIDEO_ID (NOT the standard watch URL format).

IMPORTANT: Your ENTIRE response must be ONLY the URL. If you cannot find a suitable resource, respond with only the word "NONE".`
          }
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

    console.log('OpenAI API response received');
    const suggestedUrl = response.data.choices[0].message.content.trim();
    
    // Skip if response is "NONE" or doesn't appear to be a URL
    if (suggestedUrl === "NONE" || !suggestedUrl.startsWith('http')) {
      console.log('Invalid URL or "NONE" response received from OpenAI');
      return null;
    }
    
    console.log(`OpenAI suggested URL: ${suggestedUrl}`);
    
    const formattedUrl = formatYouTubeUrl(suggestedUrl);
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => formattedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`OpenAI suggested URL ${formattedUrl} is not from an authorized domain`);
      return null;
    }
    
    // Check if the URL is valid with content type validation
    const isValid = await isValidUrl(formattedUrl, type);
    if (!isValid) {
      console.log(`OpenAI suggested URL ${formattedUrl} is not valid`);
      return null;
    }
    
    return formattedUrl;
  } catch (error) {
    console.error(`Error finding replacement with OpenAI: ${error.message}`);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    return null;
  }
}

// Main function to find a replacement using multiple APIs in cascade
async function findReplacement(title, type, source, topic, subtopic) {
  // Track which API succeeded for analytics
  let successfulProvider = null;
  
  // 1. First try Google Gemini (per user's request)
  let replacement = await findGeminiReplacement(title, type, source, topic, subtopic);
  if (replacement) {
    console.log(`Using Google Gemini replacement: ${replacement}`);
    successfulProvider = 'Google Gemini';
    return { url: replacement, provider: successfulProvider };
  }
  
  // 2. If Google Gemini fails, try DeepSeek
  console.log('Google Gemini failed, trying DeepSeek API');
  replacement = await findDeepSeekReplacement(title, type, source, topic, subtopic);
  if (replacement) {
    console.log(`Using DeepSeek replacement: ${replacement}`);
    successfulProvider = 'DeepSeek';
    return { url: replacement, provider: successfulProvider };
  }
  
  // 3. If DeepSeek fails, try Qwen
  console.log('DeepSeek failed, trying Qwen API');
  replacement = await findQwenReplacement(title, type, source, topic, subtopic);
  if (replacement) {
    console.log(`Using Qwen replacement: ${replacement}`);
    successfulProvider = 'Qwen';
    return { url: replacement, provider: successfulProvider };
  }
  
  // 4. If Qwen fails, try OpenAI as last resort
  console.log('Qwen failed, trying OpenAI API');
  replacement = await findOpenAIReplacement(title, type, source, topic, subtopic);
  if (replacement) {
    console.log(`Using OpenAI replacement: ${replacement}`);
    successfulProvider = 'OpenAI';
    return { url: replacement, provider: successfulProvider };
  }
  
  // 5. If all APIs fail, use mock replacement
  console.log('All APIs failed, using mock replacement');
  replacement = getMockReplacement(title, type, source);
  if (replacement) {
    console.log(`Using mock replacement: ${replacement}`);
    successfulProvider = 'Mock';
    return { url: replacement, provider: successfulProvider };
  }
  
  console.log('No replacement found for this resource');
  return null;
}

async function main() {
  try {
    console.log('Starting enhanced link checker with Google Gemini, DeepSeek, Qwen and OpenAI APIs...');
    
    // Statistics tracking
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
      },
      resourceTypes: {
        'video': { checked: 0, broken: 0, fixed: 0 },
        'pdf': { checked: 0, broken: 0, fixed: 0 },
        'other': { checked: 0, broken: 0, fixed: 0 }
      }
    };
    
    // Read the resources file
    const code = fs.readFileSync(resourcesFilePath, 'utf8');
    
    // Parse the TypeScript code
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx']
    });
    
    // Track if any changes were made
    let changesMade = false;
    let linksChecked = 0;
    let brokenLinksFixed = 0;
    
    // Store links to be checked to avoid the AST traversal issue
    const linksToCheck = [];
    
    // Find all URL properties in the file
    traverse(ast, {
      ObjectProperty(path) {
        if (
          path.node.key.type === 'Identifier' && 
          path.node.key.name === 'url' &&
          path.node.value.type === 'StringLiteral'
        ) {
          const urlNode = path.node.value;
          const url = urlNode.value;
          
          // Get the parent object to extract title, type, source
          const parentObject = path.parentPath;
          let title = '', type = '', source = '';
          let topic = '', subtopic = '';
          
          // Extract information from the parent object
          if (parentObject && parentObject.node && parentObject.node.properties) {
            parentObject.node.properties.forEach(prop => {
              if (prop.key && prop.key.name === 'title' && prop.value && prop.value.type === 'StringLiteral') {
                title = prop.value.value;
              } else if (prop.key && prop.key.name === 'type' && prop.value && prop.value.type === 'StringLiteral') {
                type = prop.value.value;
              } else if (prop.key && prop.key.name === 'source' && prop.value && prop.value.type === 'StringLiteral') {
                source = prop.value.value;
              }
            });
          }
          
          // Try to get topic and subtopic by examining the context in the AST
          try {
            // Go up the parent chain to find potential topic/subtopic containers
            let currentNode = path.parentPath;
            let depth = 0;
            const maxDepth = 5; // Prevent infinite loop
            
            while (currentNode && depth < maxDepth) {
              // Check if this is a property with a key that might be subtopic or topic
              if (currentNode.parentPath && 
                  currentNode.parentPath.node.type === 'ObjectProperty' && 
                  currentNode.parentPath.node.key && 
                  currentNode.parentPath.node.key.name) {
                
                const keyName = currentNode.parentPath.node.key.name;
                if (!subtopic && keyName.includes('subtopic')) {
                  subtopic = keyName;
                } else if (!topic && keyName.includes('topic')) {
                  topic = keyName;
                }
              }
              
              currentNode = currentNode.parentPath;
              depth++;
            }
          } catch (e) {
            // If we fail to extract topic/subtopic, just continue with defaults
            console.log(`Error extracting topic/subtopic: ${e.message}`);
          }
          
          // Store the link info for later processing
          linksToCheck.push({
            urlNode,
            url,
            title,
            type: type || 'other', // Default to 'other' if type is not specified
            source,
            topic: topic || title.split(' ')[0] || 'mathematics', // Use first word of title as fallback topic
            subtopic: subtopic || title || 'general' // Use title as fallback subtopic
          });
          
          // Track total links
          stats.totalLinks++;
          
          // Track by resource type
          const resourceType = type || 'other';
          if (!stats.resourceTypes[resourceType]) {
            stats.resourceTypes[resourceType] = { checked: 0, broken: 0, fixed: 0 };
          }
          stats.resourceTypes[resourceType].checked++;
        }
      }
    });
    
    console.log(`Found ${linksToCheck.length} links to check`);
    
    // Process all links in batches to avoid overwhelming the system
    const BATCH_SIZE = 8; // Reduced batch size for more stability
    for (let i = 0; i < linksToCheck.length; i += BATCH_SIZE) {
      if (!shouldContinue) break; // Stop if global timeout reached
      
      const batch = linksToCheck.slice(i, i + BATCH_SIZE);
      const batchPromises = batch.map(async (linkInfo) => {
        if (!shouldContinue) return; // Skip if global timeout reached
        
        await delay(700); // Increased delay to avoid rate limiting
        linksChecked++;
        
        const { urlNode, url, title, type, source, topic, subtopic } = linkInfo;
        
        // Check if URL is valid
        const valid = await isValidUrl(url, type);
        if (!valid) {
          stats.brokenLinks++;
          
          // Track by resource type
          if (stats.resourceTypes[type]) {
            stats.resourceTypes[type].broken++;
          }
          
          console.log(`\nFound broken link #${brokenLinksFixed + 1}: ${url}`);
          console.log(`Resource: ${title}, Type: ${type}, Source: ${source}`);
          console.log(`Topic: ${topic}, Subtopic: ${subtopic}`);
          
          // Find replacement
          const replacementResult = await findReplacement(title, type, source, topic, subtopic);
          if (replacementResult && replacementResult.url) {
            console.log(`Replacing with: ${replacementResult.url} (provided by ${replacementResult.provider})`);
            urlNode.value = replacementResult.url;
            changesMade = true;
            brokenLinksFixed++;
            stats.fixedLinks++;
            
            // Track by resource type
            if (stats.resourceTypes[type]) {
              stats.resourceTypes[type].fixed++;
            }
            
            // Track which provider succeeded
            if (replacementResult.provider) {
              stats.providerSuccess[replacementResult.provider]++;
            }
          } else {
            stats.providerSuccess['Failed']++;
          }
        }
      });
      
      await Promise.all(batchPromises);
      console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(linksToCheck.length / BATCH_SIZE)}`);
      
      // Save intermediate results every few batches
      if (changesMade && i % (BATCH_SIZE * 2) === 0 && i > 0) {
        const intermediateOutput = generator(ast, {}, code).code;
        fs.writeFileSync(resourcesFilePath, intermediateOutput);
        console.log(`\nSaved intermediate results after processing ${i} links\n`);
        
        // Also save stats
        fs.writeFileSync(
          path.resolve(__dirname, 'link-check-stats.json'), 
          JSON.stringify(stats, null, 2)
        );
      }
    }
    
    // If changes were made, write the updated file
    if (changesMade) {
      const output = generator(ast, {}, code).code;
      fs.writeFileSync(resourcesFilePath, output);
      console.log(`\nCompleted link checker. Checked ${linksChecked} links, fixed ${brokenLinksFixed} broken links.`);
      
      // Generate success rate statistics
      console.log('\nSuccess rate by provider:');
      for (const [provider, count] of Object.entries(stats.providerSuccess)) {
        if (count > 0) {
          console.log(`${provider}: ${count} links (${Math.round(count / stats.brokenLinks * 100)}%)`);
        }
      }
      
      // Generate resource type statistics
      console.log('\nResource type statistics:');
      for (const [type, counts] of Object.entries(stats.resourceTypes)) {
        console.log(`${type}: Checked ${counts.checked}, Broken ${counts.broken}, Fixed ${counts.fixed} (${Math.round(counts.fixed / counts.broken * 100 || 0)}%)`);
      }
      
      // Save detailed statistics
      fs.writeFileSync(
        path.resolve(__dirname, 'link-check-stats.json'), 
        JSON.stringify(stats, null, 2)
      );
    } else {
      console.log('\nNo broken links found or fixed');
    }
    
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
    if (error.stack) {
      console.error(`Stack trace: ${error.stack}`);
    }
    process.exit(1);
  }
}

main();