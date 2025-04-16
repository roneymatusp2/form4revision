@echo off
echo Atualizando react-scripts para versão compatível com TypeScript 5...
echo.

REM Backup dos arquivos atuais
echo Criando backup do package.json...
copy package.json package.json.react-scripts.backup

REM Instalando versão mais recente de react-scripts (compatível com TypeScript 5)
echo Instalando react-scripts 5.0.1 plus (versão forked com suporte a TypeScript 5)...
call npm install @sroussey/react-scripts --save --force

REM Instalando demais dependências com flag force
echo Instalando demais dependências...
call npm install --force

REM Aplicando audit fix
echo Aplicando correções de segurança...
call npm audit fix --force

REM Verificando vulnerabilidades restantes
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo concluído! O react-scripts foi atualizado para uma versão compatível com TypeScript 5.
echo.
echo Informações importantes:
echo - Foi instalada uma versão alternativa de react-scripts com suporte a TypeScript 5
echo - Flag --force foi usada para resolver conflitos de dependências
echo - Esta solução permite manter TypeScript 5.x no projeto
echo.
echo Pressione qualquer tecla para sair...
pause >nul
