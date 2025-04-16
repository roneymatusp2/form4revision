@echo off
echo ===================================================
echo Migrando projeto React para Vite (Solução moderna)
echo ===================================================
echo.

echo Instalando Vite e plugins necessários...
call npm install --save-dev vite @vitejs/plugin-react @vitejs/plugin-react-swc

echo Criando arquivo de configuração vite.config.js...
(
echo import { defineConfig } from 'vite';
echo import react from '@vitejs/plugin-react-swc';
echo import path from 'path';
echo.
echo // https://vitejs.dev/config/
echo export default defineConfig({
echo   plugins: [react()],
echo   resolve: {
echo     alias: {
echo       '@': path.resolve(__dirname, './src'),
echo     },
echo   },
echo   build: {
echo     outDir: 'build',
echo   },
echo });
) > vite.config.js

echo Criando arquivo index.html na raiz do projeto...
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo   ^<meta charset="UTF-8" /^>
echo   ^<link rel="icon" type="image/svg+xml" href="/src/assets/favicon.svg" /^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0" /^>
echo   ^<title^>Form 4 Math Revision^</title^>
echo ^</head^>
echo ^<body^>
echo   ^<div id="root"^>^</div^>
echo   ^<script type="module" src="/src/index.tsx"^>^</script^>
echo ^</body^>
echo ^</html^>
) > index.html

echo Atualizando package.json com novos scripts...
call npm pkg set scripts.dev="vite"
call npm pkg set scripts.build="vite build"
call npm pkg set scripts.preview="vite preview"
call npm pkg set scripts."build:netlify"="vite build"

echo Atualizando netlify.toml para usar Vite...
(
echo [build]
echo   command = "npm run build"
echo   publish = "build"
echo.
echo # Handle SPA routing
echo [[redirects]]
echo   from = "/*"
echo   to = "/index.html"
echo   status = 200
) > netlify.toml

echo Instalando dependências adicionais...
call npm install --save-dev @types/node

echo Criando arquivo deploy-netlify-vite.bat...
(
echo @echo off
echo echo ===================================================
echo echo Deploy com Vite para Netlify ^(Solução Moderna^)
echo echo ===================================================
echo echo.
echo.
echo echo Instalando dependências...
echo call npm install
echo.
echo echo Executando build com Vite...
echo call npm run build
echo.
echo echo.
echo if %%errorlevel%% neq 0 ^(
echo     echo ERRO: O build falhou. Verifique os erros acima.
echo     goto :end
echo ^)
echo.
echo echo Build concluído com sucesso!
echo echo.
echo echo Seu site está pronto para ser enviado para o Netlify.
echo echo.
echo echo Para fazer o deploy:
echo echo 1. Certifique-se de que o netlify-cli está instalado:
echo echo    npm install -g netlify-cli
echo echo.
echo echo 2. Execute o comando:
echo echo    netlify deploy --prod
echo echo.
echo echo 3. Ou vá até o painel do Netlify e faça o deploy manualmente:
echo echo    https://app.netlify.com/sites/subtle-moxie-c6dd7f
echo echo.
echo echo Deseja instalar o Netlify CLI agora? ^(S/N^)
echo choice /c SN /m "Instalar Netlify CLI"
echo.
echo if %%errorlevel%% equ 1 ^(
echo     echo Instalando Netlify CLI...
echo     call npm install -g netlify-cli
echo     
echo     echo Netlify CLI instalado. Deseja fazer deploy agora? ^(S/N^)
echo     choice /c SN /m "Fazer deploy"
echo     
echo     if %%errorlevel%% equ 1 ^(
echo         echo Executando deploy para o Netlify...
echo         call netlify deploy --prod
echo     ^)
echo ^)
echo.
echo :end
echo echo.
echo echo Pressione qualquer tecla para sair...
echo pause ^>nul
) > deploy-netlify-vite.bat

echo.
echo ===================================================
echo Migração para Vite concluída com sucesso!
echo ===================================================
echo.
echo Para construir e fazer deploy do seu projeto, execute:
echo .\deploy-netlify-vite.bat
echo.
echo Esta solução moderna usa:
echo - Vite (muito mais rápido que webpack/react-scripts)
echo - SWC (um compilador super rápido escrito em Rust)
echo - É totalmente compatível com Node.js 22+ e TypeScript 5+
echo.
echo Benefícios:
echo - Build ~10x mais rápido que react-scripts
echo - HMR (Hot Module Replacement) instantâneo
echo - Suporte nativo a TypeScript
echo - Melhor desempenho em desenvolvimento e produção
echo.
echo Pressione qualquer tecla para testar a nova configuração...
pause >nul

echo.
echo Executando teste de build com Vite...
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo Teste de build bem-sucedido! Seu projeto está pronto para deploy.
    echo Execute .\deploy-netlify-vite.bat para fazer o deploy.
) else (
    echo.
    echo O teste de build falhou. Verifique os erros e tente novamente.
)

echo.
echo Pressione qualquer tecla para sair...
pause >nul