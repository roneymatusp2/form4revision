@echo off
echo ===================================================
echo Migrando projeto React para Vite (Solucao moderna)
echo ===================================================
echo.

echo Instalando Vite e plugins necessarios...
call npm install --save-dev vite @vitejs/plugin-react @vitejs/plugin-react-swc @types/node

echo.
echo Atualizando package.json com novos scripts...
call npm pkg set scripts.dev="vite"
call npm pkg set scripts.build="vite build"
call npm pkg set scripts.preview="vite preview"
call npm pkg set scripts."build:netlify"="vite build"

echo.
echo Atualizando netlify.toml para usar Vite...
echo [build] > netlify.toml
echo   command = "npm run build" >> netlify.toml
echo   publish = "build" >> netlify.toml
echo. >> netlify.toml
echo # Handle SPA routing >> netlify.toml
echo [[redirects]] >> netlify.toml
echo   from = "/*" >> netlify.toml
echo   to = "/index.html" >> netlify.toml
echo   status = 200 >> netlify.toml

echo.
echo ===================================================
echo Migracao para Vite concluida com sucesso!
echo ===================================================
echo.
echo Para construir e fazer deploy do seu projeto, execute:
echo npm run build
echo.
echo Esta solucao moderna usa:
echo - Vite (muito mais rapido que webpack/react-scripts)
echo - SWC (um compilador super rapido escrito em Rust)
echo - E totalmente compativel com Node.js 22+ e TypeScript 5+
echo.
echo Beneficios:
echo - Build ~10x mais rapido que react-scripts
echo - HMR (Hot Module Replacement) instantaneo
echo - Suporte nativo a TypeScript
echo - Melhor desempenho em desenvolvimento e producao
echo.
echo Pressione qualquer tecla para testar a nova configuracao...
pause >nul

echo.
echo Executando teste de build com Vite...
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo Teste de build bem-sucedido! Seu projeto esta pronto para deploy.
    echo Execute: netlify deploy --prod
) else (
    echo.
    echo O teste de build falhou. Verifique os erros e tente novamente.
)

echo.
echo Pressione qualquer tecla para sair...
pause >nul