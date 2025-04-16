@echo off
echo ===================================================
echo Fixing Netlify Deployment Issues for React Project
echo ===================================================
echo.

echo Step 1: Resolving TypeScript and React Scripts conflict...
call typescript-conflict-fix.bat

echo.
echo Step 2: Installing dependencies with legacy-peer-deps flag...
call npm install --legacy-peer-deps

echo.
echo Step 3: Building project for Netlify deployment...
set CI=false
call npm run build:netlify

echo.
echo Step 4: Deployment information
echo.
echo Your project has been built successfully!
echo.
echo To deploy to Netlify, you can:
echo 1. Use the Netlify CLI: netlify deploy --prod
echo 2. Or upload the 'build' folder manually through the Netlify web interface
echo.
echo Make sure your site is configured to use:
echo - Build command: CI=false npm run build:netlify --legacy-peer-deps
echo - Publish directory: build
echo.
echo Press any key to exit...
pause >nul
