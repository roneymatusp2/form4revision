@echo off
echo ===================================================
echo Deploy do Form 4 Revision para Netlify (Corrigido)
echo ===================================================
echo.

echo Verificando se nodejs e npm estão instalados...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js não encontrado. Por favor, instale Node.js.
    goto :end
)

echo Preparando ambiente para build...
set CI=false

echo Removendo node_modules e reinstalando dependências...
rmdir /S /Q node_modules 2>nul
del package-lock.json 2>nul

echo Instalando dependências com --legacy-peer-deps...
call npm install --legacy-peer-deps

echo Executando build otimizado para Netlify...
call npm run build:netlify

echo.
if %errorlevel% neq 0 (
    echo ERRO: O build falhou. Verifique os erros acima.
    goto :end
)

echo Build concluído com sucesso!
echo.
echo Seu site está pronto para ser enviado para o Netlify.
echo.
echo Para fazer o deploy:
echo 1. Certifique-se de que o netlify-cli está instalado:
echo    npm install -g netlify-cli
echo.
echo 2. Execute o comando:
echo    netlify deploy --prod
echo.
echo 3. Ou vá até o painel do Netlify e faça o deploy manualmente:
echo    https://app.netlify.com/sites/subtle-moxie-c6dd7f
echo.
echo Deseja instalar o Netlify CLI agora? (S/N)
choice /c SN /m "Instalar Netlify CLI"

if %errorlevel% equ 1 (
    echo Instalando Netlify CLI...
    call npm install -g netlify-cli
    
    echo Netlify CLI instalado. Deseja fazer deploy agora? (S/N)
    choice /c SN /m "Fazer deploy"
    
    if %errorlevel% equ 1 (
        echo Executando deploy para o Netlify...
        call netlify deploy --prod
    )
)

:end
echo.
echo Pressione qualquer tecla para sair...
pause >nul