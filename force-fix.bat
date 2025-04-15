@echo off
echo Aplicando solução avançada para vulnerabilidades persistentes...
echo.

REM Instalar npm-force-resolutions para forçar versões específicas
echo Instalando npm-force-resolutions...
call npm install -g npm-force-resolutions

REM Backup do package.json atual
copy package.json package.json.force.backup

REM Criar arquivo resolutions.json com versões forçadas
echo {
echo   "undici": "^6.22.0",
echo   "tough-cookie": "^4.1.3",
echo   "nth-check": "^2.0.1",
echo   "node-forge": "^1.3.0",
echo   "semver": "^7.5.4",
echo   "jsdom": "^16.7.0",
echo   "braces": "^3.0.3",
echo   "terser": "^5.14.2",
echo   "loader-utils": "^2.0.0",
echo   "postcss": "^8.4.31"
echo } > resolutions.json

REM Modificar package.json para incluir resolutions
echo Modificando package.json para incluir resolutions...
call npm-force-resolutions

REM Reinstalar pacotes com as versões forçadas
echo Reinstalando pacotes com as versões forçadas...
call npm install

REM Aplicar todas as correções possíveis
echo Aplicando todas as correções possíveis...
call npm audit fix --force

REM Verificação final
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo concluído!
echo.
echo Se ainda houverem vulnerabilidades persistentes, você pode:
echo 1. Verificar no arquivo package.json.force.backup para comparar mudanças
echo 2. Ajustar manualmente as versões no package.json
echo 3. Considerar migrar para versões mais recentes de pacotes principais como react, react-dom, etc.
echo.
echo Pressione qualquer tecla para sair...
pause >nul
