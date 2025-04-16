@echo off
setlocal EnableDelayedExpansion

REM Script para corrigir problemas de build no Netlify

echo Iniciando correcao de build...

REM Instalar dependencias com flags de forca
echo Instalando dependencias com --legacy-peer-deps e --force...
call npm install --legacy-peer-deps --force

REM Limpar cache do npm
echo Limpando cache do npm...
call npm cache clean --force

REM Tentar build

echo Tentando build do projeto...
call npm run build

if errorlevel 1 (
    echo Build falhou. Tentando solucoes adicionais...
    
    REM Remover node_modules e package-lock.json
    echo Removendo node_modules e package-lock.json...
    if exist node_modules rmdir /S /Q node_modules
    if exist package-lock.json del package-lock.json
    
    REM Reinstalar todas as dependencias
    echo Reinstalando dependencias...
    call npm install --legacy-peer-deps --force
    
    REM Tentar build novamente
    echo Tentando build novamente...
    call npm run build
)

echo Correcao de build concluida.
endlocal
