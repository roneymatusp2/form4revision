@echo off
setlocal enabledelayedexpansion

echo ===================================
echo Deployment Script for GitHub and Netlify
echo ===================================

echo.
echo [1/5] Generating build with Vite...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Error during build creation.
    exit /b %ERRORLEVEL%
)
echo Build completed successfully!

echo.
echo [2/5] Checking Git status...
git status
echo.

echo [3/5] Adding all changes to Git...
git add .
echo Changes added.

echo.
echo [4/5] Creating commit...
set /p COMMIT_MSG="Enter a commit message (or press Enter to use the default message): "
if "!COMMIT_MSG!"=="" set COMMIT_MSG=Build update - %date% %time%
git commit -m "!COMMIT_MSG!"
if %ERRORLEVEL% neq 0 (
    echo Error during commit.
    exit /b %ERRORLEVEL%
)
echo Commit created successfully!

echo.
echo [5/5] Pushing to GitHub...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo Error during push to GitHub.
    exit /b %ERRORLEVEL%
)
echo Code pushed to GitHub successfully!

echo.
echo ===================================
echo Deployment to Netlify
echo ===================================
echo.
echo The Netlify deployment will start automatically when the code is 
echo detected on GitHub, thanks to the configured CI/CD integration.
echo.
echo To check the deployment status, visit:
echo https://app.netlify.com/sites/form4eoyrevision/deploys
echo.
echo If you prefer to start the deployment manually, run the command:
echo netlify deploy --prod
echo.
echo ===================================
echo Process completed!
echo ===================================
