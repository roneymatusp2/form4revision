# Form 3 Mathematics Revision

A comprehensive website for Form 3 students preparing for Cambridge IGCSE™ International Mathematics examinations.

## Features

- Topic-based learning resources
- Interactive mathematical examples
- Daily challenges
- PDF worksheets and solutions
- Video tutorials

## Deployment

This website is deployed using Netlify.

## Development

To run this project locally:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Deployment Instructions

### Deploy to Netlify

#### Option 1: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize your site (first time only)
netlify init

# Deploy to production
netlify deploy --prod
```

#### Option 2: Using Netlify UI

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect to your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

The site will be deployed and Netlify will provide you with a URL. You can also set up a custom domain in the Netlify settings.
# arevisionrevision
