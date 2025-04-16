@echo off
echo Aplicando atualização completa do projeto...
echo.
echo ATENÇÃO: Esta é uma solução radical que substituirá completamente
echo as configurações de dependências do seu projeto.
echo.
echo Pressione CTRL+C para cancelar ou qualquer tecla para continuar...
pause >nul

REM Backup completo do estado atual
echo Criando backup completo...
mkdir backup-packages
copy package.json backup-packages\package.json
copy package-lock.json backup-packages\package-lock.json

REM Substituir package.json por versão atualizada
echo Substituindo package.json por versão atualizada...
copy package.json.updated package.json

REM Limpar instalação existente
echo Limpando instalação existente...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Instalar dependências atualizadas
echo Instalando dependências atualizadas...
call npm install

REM Verificar vulnerabilidades restantes
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo de atualização completa concluído!
echo.
echo Seus arquivos originais foram salvos em 'backup-packages/'.
echo Para restaurar, copie os arquivos de backup para o diretório principal.
echo.
echo Pressione qualquer tecla para sair...
pause >nul
