@echo off
echo Corrigindo conflito de TypeScript com React Scripts...
echo.

REM Backup dos arquivos atuais
echo Criando backup do package.json...
copy package.json package.json.typescript.backup

REM Instalando versão compatível de TypeScript (4.9.5)
echo Instalando TypeScript 4.9.5 (compatível com react-scripts 5.0.1)...
call npm install typescript@4.9.5 --save-dev --save-exact

REM Atualizando react-scripts com flag para aceitar dependências incompatíveis
echo Instalando react-scripts 5.0.1 com flag legacy-peer-deps...
call npm install react-scripts@5.0.1 --save --legacy-peer-deps

REM Instalando demais dependências com a mesma flag
echo Instalando demais dependências...
call npm install --legacy-peer-deps

REM Aplicando audit fix com a mesma flag
echo Aplicando correções de segurança...
call npm audit fix --legacy-peer-deps

REM Verificando vulnerabilidades restantes
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo concluído! O conflito de TypeScript foi resolvido.
echo.
echo Informações importantes:
echo - TypeScript foi downgrade para versão 4.9.5 (compatível com react-scripts)
echo - Flag --legacy-peer-deps foi usada para resolver conflitos de dependências
echo - Se o projeto precisar de TypeScript 5.x no futuro, será necessário migrar para versão mais recente de react-scripts
echo.
echo Pressione qualquer tecla para sair...
pause >nul
