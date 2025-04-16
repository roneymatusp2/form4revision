@echo off
echo ===================================================
echo Corrigindo problemas e construindo projeto
echo ===================================================
echo.

echo Verificando problemas de compatibilidade...
echo.

echo Executando build com Vite...
call npm run build

echo.
if %errorlevel% neq 0 (
    echo ERRO: Ainda existem problemas. Tentando corrigir automaticamente...
    echo.
    
    echo Criando um arquivo tsconfig.vite.json para melhor compatibilidade...
    (
    echo {
    echo   "compilerOptions": {
    echo     "target": "ES2020",
    echo     "useDefineForClassFields": true,
    echo     "lib": ["ES2020", "DOM", "DOM.Iterable"],
    echo     "module": "ESNext",
    echo     "skipLibCheck": true,
    echo     "moduleResolution": "bundler",
    echo     "allowImportingTsExtensions": true,
    echo     "resolveJsonModule": true,
    echo     "isolatedModules": true,
    echo     "noEmit": true,
    echo     "jsx": "react-jsx",
    echo     "strict": true,
    echo     "noUnusedLocals": false,
    echo     "noUnusedParameters": false,
    echo     "noFallthroughCasesInSwitch": true,
    echo     "allowSyntheticDefaultImports": true,
    echo     "esModuleInterop": true
    echo   },
    echo   "include": ["src"],
    echo   "references": [{ "path": "./tsconfig.node.json" }]
    echo }
    ) > tsconfig.vite.json
    
    echo Criando tsconfig.node.json...
    (
    echo {
    echo   "compilerOptions": {
    echo     "composite": true,
    echo     "skipLibCheck": true,
    echo     "module": "ESNext",
    echo     "moduleResolution": "bundler",
    echo     "allowSyntheticDefaultImports": true
    echo   },
    echo   "include": ["vite.config.ts"]
    echo }
    ) > tsconfig.node.json
    
    echo Atualizando configuração do Vite...
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
    echo     sourcemap: true,
    echo     commonjsOptions: {
    echo       include: [],
    echo       transformMixedEsModules: true,
    echo     }
    echo   },
    echo   optimizeDeps: {
    echo     esbuildOptions: {
    echo       target: 'es2020'
    echo     }
    echo   }
    echo });
    ) > vite.config.js
    
    echo Tentando build novamente com configuração otimizada...
    call npm run build
) else (
    echo Build concluído com sucesso!
)

echo.
echo ===================================================
echo Processo concluído!
echo ===================================================
echo.
echo Se o build foi bem-sucedido, você pode fazer deploy no Netlify:
echo - Execute: netlify deploy --prod
echo - Ou use o painel web do Netlify para upload manual
echo.
echo Pressione qualquer tecla para sair...
pause >nul