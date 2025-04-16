@echo off
echo ===================================
echo Manual Deploy to Netlify
echo ===================================

echo.
echo [1/2] Generating build...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Error during build creation.
    exit /b %ERRORLEVEL%
)
echo Build completed successfully!

echo.
echo [2/2] Deploying to Netlify...
echo.
echo You can choose between a preview deployment or a production deployment.
echo.
choice /C PD /M "Press P for Preview or D for Production Deployment"
if %ERRORLEVEL% equ 1 (
    echo Starting preview deployment to form4eoyrevision.netlify.app...
    netlify deploy --site=dac644fa-caaa-4a70-822f-7a86afba3b49
) else (
    echo Starting production deployment to form4eoyrevision.netlify.app...
    netlify deploy --prod --site=dac644fa-caaa-4a70-822f-7a86afba3b49
)

echo.
echo ===================================
echo Netlify deployment completed!
echo ===================================
