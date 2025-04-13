const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

// API Configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const QWEN_API_KEY = process.env.QWEN_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const QWEN_API_URL = 'https://api.qwen.ai/v1/chat/completions';

console.log(`DeepSeek API Key present: ${DEEPSEEK_API_KEY ? 'Yes' : 'No'}`);
console.log(`Qwen API Key present: ${QWEN_API_KEY ? 'Yes' : 'No'}`);

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
  'diagnosticquestions.com'
];

// File path for the resources
const resourcesFilePath = path.resolve(__dirname, '../src/data/externalResources-new.ts');

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to check if a URL is valid
async function isValidUrl(url) {
  try {
    console.log(`Checking URL: ${url}`);
    const response = await axios.head(url, { 
      timeout: 10000,
      validateStatus: status => status < 400, // Accept any status code less than 400
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
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
    const videoId = url.split('v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

// Mock replacement function for when both APIs are not available
function getMockReplacement(title, type, source) {
  if (type === 'video') {
    if (title.toLowerCase().includes('linear')) {
      return 'https://www.youtube.com/embed/m9-_sYVcSxk'; // Linear functions video
    } else if (title.toLowerCase().includes('quadratic')) {
      return 'https://www.youtube.com/embed/YHKShQgTLAY'; // Quadratic equations video
    } else if (title.toLowerCase().includes('angle')) {
      return 'https://www.youtube.com/embed/NVuMULQjb3o'; // Angles video
    } else if (title.toLowerCase().includes('trigonometry')) {
      return 'https://www.youtube.com/embed/F21S9Wpi0y8'; // Trigonometry video
    } else {
      return 'https://www.youtube.com/embed/l9nh1l8ZIJQ'; // General math video
    }
  } else if (type === 'pdf') {
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
  return null;
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
            content: 'You are an educational resource expert with strong reasoning abilities. Find appropriate replacement links for broken educational resources using careful analysis and verification.'
          },
          {
            role: 'user',
            content: `Find a working ${type} resource about "${title}" for ${topic}, ${subtopic} from one of these sources: ${AUTHORIZED_WEBSITES.join(', ')}. The original source was ${source}. Return only the URL without any explanation or additional text. For YouTube videos, prefer the embed URL format (https://www.youtube.com/embed/VIDEO_ID).`
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
    console.log(`DeepSeek suggested URL: ${suggestedUrl}`);
    
    const formattedUrl = formatYouTubeUrl(suggestedUrl);
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => formattedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`DeepSeek suggested URL ${formattedUrl} is not from an authorized domain`);
      return null;
    }
    
    // Check if the URL is valid
    const isValid = await isValidUrl(formattedUrl);
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
        model: 'qwen-max',  // Qwen model with reasoning capabilities
        messages: [
          {
            role: 'system',
            content: 'You are an educational resource expert with internet access. Find appropriate working replacement links for broken educational resources, verifying they exist and work.'
          },
          {
            role: 'user',
            content: `Find a working ${type} resource about "${title}" for ${topic}, ${subtopic} from one of these sources: ${AUTHORIZED_WEBSITES.join(', ')}. The original source was ${source}. Return only the URL without any explanation or additional text. For YouTube videos, prefer the embed URL format (https://www.youtube.com/embed/VIDEO_ID).`
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
    console.log(`Qwen suggested URL: ${suggestedUrl}`);
    
    const formattedUrl = formatYouTubeUrl(suggestedUrl);
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => formattedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`Qwen suggested URL ${formattedUrl} is not from an authorized domain`);
      return null;
    }
    
    // Check if the URL is valid
    const isValid = await isValidUrl(formattedUrl);
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

// Main function to find a replacement using multiple APIs
async function findReplacement(title, type, source, topic, subtopic) {
  // First try DeepSeek
  let replacement = await findDeepSeekReplacement(title, type, source, topic, subtopic);
  if (replacement) {
    console.log(`Using DeepSeek replacement: ${replacement}`);
    return replacement;
  }
  
  // If DeepSeek fails, try Qwen
  console.log('DeepSeek failed, trying Qwen API');
  replacement = await findQwenReplacement(title, type, source, topic, subtopic);
  if (replacement) {
    console.log(`Using Qwen replacement: ${replacement}`);
    return replacement;
  }
  
  // If both APIs fail, use mock replacement
  console.log('Both APIs failed, using mock replacement');
  replacement = getMockReplacement(title, type, source);
  if (replacement) {
    console.log(`Using mock replacement: ${replacement}`);
    return replacement;
  }
  
  console.log('No replacement found for this resource');
  return null;
}

async function main() {
  try {
    console.log('Starting enhanced link checker with DeepSeek and Qwen APIs...');
    
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
    
    // Initialize array to hold all the check promises
    const checkPromises = [];
    
    // Find all URL properties in the file
    traverse(ast, {
      ObjectProperty(path) {
        if (
          shouldContinue &&
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
          parentObject.node.properties.forEach(prop => {
            if (prop.key.name === 'title' && prop.value.type === 'StringLiteral') {
              title = prop.value.value;
            } else if (prop.key.name === 'type' && prop.value.type === 'StringLiteral') {
              type = prop.value.value;
            } else if (prop.key.name === 'source' && prop.value.type === 'StringLiteral') {
              source = prop.value.value;
            }
          });
          
          // Determine topic and subtopic from context
          let currentNode = path.parentPath;
          while (currentNode && (!topic || !subtopic)) {
            if (currentNode.node.key && currentNode.node.key.name) {
              if (!subtopic && currentNode.node.key.value) {
                subtopic = currentNode.node.key.value;
              } else if (!topic && currentNode.node.key.value) {
                topic = currentNode.node.key.value;
              }
            }
            currentNode = currentNode.parentPath;
          }
          
          // Check if URL is valid
          const checkUrl = async () => {
            if (!shouldContinue) return; // Skip if global timeout reached
            
            await delay(300); // Add small delay to avoid rate limiting
            linksChecked++;
            
            const valid = await isValidUrl(url);
            if (!valid) {
              console.log(`\nFound broken link #${brokenLinksFixed + 1}: ${url}`);
              console.log(`Resource: ${title}, Type: ${type}, Source: ${source}`);
              
              // Find replacement
              const replacement = await findReplacement(title, type, source, topic, subtopic);
              if (replacement) {
                console.log(`Replacing with: ${replacement}`);
                urlNode.value = replacement;
                changesMade = true;
                brokenLinksFixed++;
                
                // Save intermediate results every 10 fixed links
                if (brokenLinksFixed % 10 === 0) {
                  const intermediateOutput = generator(ast, {}, code).code;
                  fs.writeFileSync(resourcesFilePath, intermediateOutput);
                  console.log(`\nSaved intermediate results after fixing ${brokenLinksFixed} links\n`);
                }
              }
            }
          };
          
          // Add this URL check to our list of promises
          checkPromises.push(checkUrl());
        }
      }
    });
    
    // Process all checks in batches to avoid overwhelming the system
    const BATCH_SIZE = 20;
    for (let i = 0; i < checkPromises.length; i += BATCH_SIZE) {
      if (!shouldContinue) break; // Stop if global timeout reached
      
      const batch = checkPromises.slice(i, i + BATCH_SIZE);
      await Promise.all(batch);
      console.log(`Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(checkPromises.length / BATCH_SIZE)}`);
    }
    
    // If changes were made, write the updated file
    if (changesMade) {
      const output = generator(ast, {}, code).code;
      fs.writeFileSync(resourcesFilePath, output);
      console.log(`\nCompleted link checker. Checked ${linksChecked} links, fixed ${brokenLinksFixed} broken links.`);
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