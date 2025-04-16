@echo off
echo Aplicando solução direta para vulnerabilidades...
echo.

REM Backup dos arquivos de package
echo Criando backup de arquivos...
copy package.json package.json.direct.backup
copy package-lock.json package-lock.json.direct.backup

REM Remover node_modules e package-lock.json para uma instalação limpa
echo Removendo node_modules e package-lock.json para instalação limpa...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Atualizar para versões seguras
echo Instalando react-scripts e outras dependências com versões seguras...
call npm install react-scripts@5.0.1 --save
call npm install firebase@latest --save
call npm install @testing-library/react@latest @testing-library/jest-dom@latest --save

REM Reinstalar todos os pacotes
echo Reinstalando todos os pacotes...
call npm install

REM Aplicar audit fix com force
echo Aplicando correções de segurança forçadas...
call npm audit fix --force

REM Verificar vulnerabilidades restantes
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo concluído!
echo.
echo Se ainda existirem vulnerabilidades, pode ser necessário:
echo 1. Realizar uma atualização mais abrangente das versões no package.json
echo 2. Considerar a recriação do projeto com dependências atualizadas
echo.
echo Pressione qualquer tecla para sair...
pause >nul
