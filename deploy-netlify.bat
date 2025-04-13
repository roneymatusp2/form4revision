@echo off
echo Deploying Form 4 Revision to Netlify...

echo Building the application...
npm run build

echo Installation and deployment instructions:
echo ----------------------------------------
echo 1. If you haven't already, install Netlify CLI:
echo    npm install -g netlify-cli
echo.
echo 2. Login to Netlify (if not already logged in):
echo    netlify login
echo.
echo 3. Initialize Netlify site (if this is your first deployment):
echo    netlify init
echo.
echo 4. Deploy your site:
echo    netlify deploy --prod
echo.
echo Manual Deployment Instructions:
echo 1. Go to https://app.netlify.com/
echo 2. Sign up or log in
echo 3. Click "Add new site" -^> "Import an existing project"
echo 4. Connect to your GitHub repository
echo 5. Configure build settings:
echo    - Build command: npm run build
echo    - Publish directory: build
echo.
echo The redirects in netlify.toml will handle routing for your SPA automatically.
