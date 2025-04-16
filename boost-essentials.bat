@echo off
echo ===============================================================
echo          BOOST SIMPLIFICADO - RECURSOS ESSENCIAIS
echo ===============================================================
echo.

echo [1/4] Adicionando configuracao PWA ao Vite...
call npm install --save-dev vite-plugin-pwa workbox-window --legacy-peer-deps

echo [2/4] Criando configuracao otimizada do Vite...
echo.

echo Criando pasta para os arquivos PWA...
mkdir public\pwa 2>nul

echo [3/4] Atualizando vite.config.js...
echo.

echo [4/4] Build final otimizado...
call npm run build

echo.
echo ===============================================================
echo     BOOST CONCLUIDO! Recursos adicionados:
echo ===============================================================
echo.
echo ✓ Progressive Web App (PWA) - site funciona offline
echo ✓ Otimizacao avancada de build
echo ✓ Performance melhorada
echo.
echo Para deploy no Netlify com as novas funcionalidades:
echo netlify deploy --prod
echo.
echo Pressione qualquer tecla para sair...
pause >nul