@echo off
echo ===================================================
echo Deploy com Vite para Netlify (Solucao Moderna)
echo ===================================================
echo.

echo Instalando dependencias...
call npm install

echo Executando build com Vite...
call npm run build

echo.
if %errorlevel% neq 0 (
    echo ERRO: O build falhou. Verifique os erros acima.
    goto :end
)

echo Build concluido com sucesso!
echo.
echo Seu site esta pronto para ser enviado para o Netlify.
echo.
echo Para fazer o deploy:
echo 1. Certifique-se de que o netlify-cli esta instalado:
echo    npm install -g netlify-cli
echo.
echo 2. Execute o comando:
echo    netlify deploy --prod
echo.
echo 3. Ou va ate o painel do Netlify e faca o deploy manualmente:
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