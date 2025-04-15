@echo off
echo Corrigindo TODAS as vulnerabilidades de segurança...
echo.
echo ATENÇÃO: Este script fará alterações significativas nas dependências
echo incluindo atualizações com breaking changes!
echo.
echo Criando backup do package.json e package-lock.json...
copy package.json package.json.backup
copy package-lock.json package-lock.json.backup
echo Backup criado com sucesso!
echo.
echo Executando npm audit fix --force para resolver TODAS as vulnerabilidades...
call npm audit fix --force
echo.
echo Processo concluído! Todas as vulnerabilidades deveriam estar resolvidas agora.
echo Se o aplicativo apresentar problemas, você pode restaurar os backups:
echo   copy package.json.backup package.json
echo   copy package-lock.json.backup package-lock.json
echo   npm install
echo.
echo Pressione qualquer tecla para sair...
pause >nul
