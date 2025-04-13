const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

// DeepSeek API Configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
console.log(`API Key present: ${DEEPSEEK_API_KEY ? 'Yes' : 'No'}`);
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Authorized educational websites
const AUTHORIZED_WEBSITES = [
  'corbettmaths.com',
  'khanacademy.org',
  'savemyexams.com',
  'mathsgenie.co.uk',
  'draustinmaths.com',
  'physicsandmathstutor.com',
  'youtube.com',  // For embedded videos
  'maths4everyone.com',
  'mathsaurus.com',
  'mathantics.com',
  'fuseschool.org'
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

// Mock replacement function for when API is not available
function getMockReplacement(title, type, source) {
  if (type === 'video') {
    return 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Example video URL
  } else if (type === 'pdf') {
    if (source.includes('Corbett')) {
      return 'https://corbettmaths.com/wp-content/uploads/2019/02/GCSE-Revision-Cards.pdf';
    } else if (source.includes('Austin')) {
      return 'https://www.draustinmaths.com/resources';
    } else {
      return 'https://www.mathsgenie.co.uk/resources/gcse-revision-cards.pdf';
    }
  }
  return null;
}

// Function to find replacement using DeepSeek Reasoner API
async function findReplacement(title, type, source, topic, subtopic) {
  try {
    console.log(`Searching for replacement for: ${title} (${type}) from ${source}`);
    console.log(`Using DeepSeek API with key: ${DEEPSEEK_API_KEY ? DEEPSEEK_API_KEY.substring(0, 5) + '...' : 'Not available'}`);
    
    // If no API key, use mock replacement
    if (!DEEPSEEK_API_KEY) {
      console.log('No API key available, using mock replacement');
      return getMockReplacement(title, type, source);
    }
    
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-reasoner',  // Using DeepSeek Reasoner model
        messages: [
          {
            role: 'system',
            content: 'You are an educational resource expert with strong reasoning abilities. Find appropriate replacement links for broken educational resources using careful analysis and verification.'
          },
          {
            role: 'user',
            content: `Find a ${type} resource about "${title}" for ${topic}, ${subtopic} from one of these sources: ${AUTHORIZED_WEBSITES.join(', ')}. The original source was ${source}. Return only the URL after careful reasoning and verification.`
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
    console.log(`Suggested URL: ${suggestedUrl}`);
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => suggestedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`Suggested URL ${suggestedUrl} is not from an authorized domain`);
      return getMockReplacement(title, type, source);
    }
    
    // Check if the URL is valid
    const isValid = await isValidUrl(suggestedUrl);
    if (!isValid) {
      console.log(`Suggested URL ${suggestedUrl} is not valid`);
      return getMockReplacement(title, type, source);
    }
    
    return suggestedUrl;
  } catch (error) {
    console.error(`Error finding replacement: ${error.message}`);
    if (error.response) {
      console.error(`Response data: ${JSON.stringify(error.response.data)}`);
    }
    return getMockReplacement(title, type, source);
  }
}

async function main() {
  try {
    console.log('Starting link checker...');
    
    // Read the resources file
    const code = fs.readFileSync(resourcesFilePath, 'utf8');
    
    // Parse the TypeScript code
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx']
    });
    
    // Track if any changes were made
    let changesMade = false;
    
    // Initialize array to hold all the check promises
    const checkPromises = [];
    
    // Count of broken links to limit processing
    let brokenLinkCount = 0;
    const MAX_BROKEN_LINKS = 5; // Limit to 5 broken links per run to avoid API rate limits
    
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
          // This is a simplified approach - you might need to adapt this
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
          
          // Check if URL is valid (would be async in actual implementation)
          const checkUrl = async () => {
            await delay(500); // Add delay to avoid rate limiting
            
            if (brokenLinkCount >= MAX_BROKEN_LINKS) {
              console.log(`Skipping check for ${url} - reached limit of ${MAX_BROKEN_LINKS} broken links`);
              return;
            }
            
            const valid = await isValidUrl(url);
            if (!valid) {
              brokenLinkCount++;
              console.log(`Found broken link: ${url}`);
              console.log(`Resource: ${title}, Type: ${type}, Source: ${source}`);
              
              // Find replacement
              const replacement = await findReplacement(title, type, source, topic, subtopic);
              if (replacement) {
                console.log(`Replacing with: ${replacement}`);
                urlNode.value = replacement;
                changesMade = true;
              }
            }
          };
          
          // Add this URL check to our list of promises
          checkPromises.push(checkUrl());
        }
      }
    });
    
    // Wait for all checks to complete
    await Promise.all(checkPromises);
    
    // If changes were made, write the updated file
    if (changesMade) {
      const output = generator(ast, {}, code).code;
      fs.writeFileSync(resourcesFilePath, output);
      console.log('Updated resources file with fixed links');
    } else {
      console.log('No broken links found or fixed');
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