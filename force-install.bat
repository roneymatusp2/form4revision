@echo off
echo Instalando todas as dependências com --force e --legacy-peer-deps...
echo.

REM Backup dos arquivos atuais
echo Criando backup do package.json...
copy package.json package.json.force.backup

REM Remover node_modules e lock files para instalação limpa
echo Removendo node_modules e package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Ajustar versões no package.json
echo Ajustando versões no package.json para compatibilidade...
node -e "const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); pkg.dependencies['react-scripts'] = '5.0.1'; if(pkg.dependencies.typescript) delete pkg.dependencies.typescript; if(!pkg.devDependencies) pkg.devDependencies = {}; pkg.devDependencies.typescript = '4.9.5'; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));"

REM Instalando com flags para ignorar conflitos
echo Instalando dependências com flags para ignorar conflitos...
call npm install --legacy-peer-deps --force

REM Verificando vulnerabilidades restantes
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo concluído! As dependências foram instaladas forçadamente.
echo.
echo Informações importantes:
echo - As bandeiras --force e --legacy-peer-deps foram usadas para ignorar conflitos
echo - TypeScript foi configurado para versão 4.9.5 no package.json
echo - react-scripts foi configurado para versão 5.0.1
echo - Esta é uma solução radical, mas geralmente eficaz para projetos em manutenção
echo.
echo Pressione qualquer tecla para sair...
pause >nul
