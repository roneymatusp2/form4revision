@echo off
echo Corrigindo as vulnerabilidades restantes...
echo.

REM Backup dos arquivos de configuração atuais
echo Criando backup...
copy package.json package.json.remaining.backup
copy package-lock.json package-lock.json.remaining.backup

REM Atualizar pacotes específicos conhecidos por terem vulnerabilidades
echo Atualizando pacotes específicos com vulnerabilidades conhecidas...

REM Atualizar firebase e pacotes relacionados (vulnerabilidades undici)
call npm update firebase @firebase/auth @firebase/firestore @firebase/functions @firebase/storage --save

REM Atualizar pacotes com vulnerabilidades específicas
call npm update undici tough-cookie nth-check node-forge --save

REM Remover e reinstalar pacotes problemáticos
echo Removendo e reinstalando pacotes problemáticos...
call npm uninstall undici
call npm install undici@latest --save

REM Forçar atualização de todas as dependências transitivas
echo Forçando atualização de dependências transitivas...
call npm audit fix --force

REM Verificação final
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo concluído!
echo Se ainda existirem vulnerabilidades, pode ser necessário:
echo 1. Atualizar manualmente certos pacotes no package.json
echo 2. Verificar conflitos de dependências pares
echo 3. Considerar usar npm-force-resolutions para forçar versões específicas
echo.
echo Pressione qualquer tecla para sair...
pause >nul
