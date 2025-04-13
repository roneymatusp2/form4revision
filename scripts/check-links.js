const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

// DeepSeek API Configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
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

// Function to check if a URL is valid
async function isValidUrl(url) {
  try {
    const response = await axios.head(url, { 
      timeout: 5000,
      validateStatus: status => status < 400 // Accept any status code less than 400
    });
    return true;
  } catch (error) {
    console.log(`Error checking URL ${url}: ${error.message}`);
    return false;
  }
}

// Function to find replacement using DeepSeek API
async function findReplacement(title, type, source, topic, subtopic) {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an educational resource expert. Find appropriate replacement links for broken educational resources.'
          },
          {
            role: 'user',
            content: `Find a ${type} resource about "${title}" for ${topic}, ${subtopic} from one of these sources: ${AUTHORIZED_WEBSITES.join(', ')}. The original source was ${source}. Return only the URL.`
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

    const suggestedUrl = response.data.choices[0].message.content.trim();
    
    // Validate the suggested URL is from an authorized website
    const isAuthorized = AUTHORIZED_WEBSITES.some(domain => suggestedUrl.includes(domain));
    if (!isAuthorized) {
      console.log(`Suggested URL ${suggestedUrl} is not from an authorized domain`);
      return null;
    }
    
    // Check if the URL is valid
    const isValid = await isValidUrl(suggestedUrl);
    if (!isValid) {
      console.log(`Suggested URL ${suggestedUrl} is not valid`);
      return null;
    }
    
    return suggestedUrl;
  } catch (error) {
    console.error(`Error finding replacement: ${error.message}`);
    return null;
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
            const valid = await isValidUrl(url);
            if (!valid) {
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
      console.log('No broken links found');
    }
    
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
    process.exit(1);
  }
}

main();