# Deployment Guide - Form 4 Math Revision

This guide provides detailed instructions for deploying the Form 4 Math Revision project to GitHub and Netlify.

## Prerequisites

- Node.js (version 18.17.1 recommended)
- NPM (version 9.6.7 recommended)
- Git installed and configured
- Access to GitHub repository: https://github.com/roneymatusp2/form4revision
- Netlify account linked to GitHub

## Automated Deployment (Recommended)

To complete a full deployment to both GitHub and Netlify, you can use the automated script:

```bash
deploy-to-github-netlify.bat
```

This script will execute the following steps:
1. Generate the current build of the project
2. Add all changes to Git
3. Create a commit with a custom message
4. Push the changes to GitHub
5. Automatically start the deployment to Netlify via CI/CD integration

## Manual Deployment

### GitHub

To manually push changes to GitHub:

1. Generate the project build:
   ```bash
   npm run build
   ```

2. Add the changes to Git:
   ```bash
   git add .
   ```

3. Create a commit:
   ```bash
   git commit -m "Your commit message"
   ```

4. Push to GitHub:
   ```bash
   git push origin main
   ```

### Netlify via CLI

To deploy directly to Netlify via CLI:

1. Run the script:
   ```bash
   deploy-netlify-cli.bat
   ```

2. Or manually:
   ```bash
   npm run build
   netlify deploy --prod --site=dac644fa-caaa-4a70-822f-7a86afba3b49
   ```

## Deployment Configurations

### GitHub

- Repository: https://github.com/roneymatusp2/form4revision
- Main branch: main

### Netlify

- Site URL: https://form4eoyrevision.netlify.app
- Site ID: dac644fa-caaa-4a70-822f-7a86afba3b49
- Build Command: `npm run build:netlify`
- Publish Directory: `build`
- Deploy Hook: https://api.netlify.com/hooks/github

## Troubleshooting

If you encounter issues during deployment:

1. **Build Error**: Check project dependencies by running `npm install --legacy-peer-deps --force`
2. **GitHub Push Error**: Make sure you have write permissions to the repository and that your Git credentials are configured
3. **Netlify Deployment Error**: Check the build logs in the Netlify interface at https://app.netlify.com/sites/form4eoyrevision/deploys

## Monitoring

You can monitor the deployment status on Netlify at:
https://app.netlify.com/sites/form4eoyrevision/deploys
