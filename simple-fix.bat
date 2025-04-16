@echo off
echo Aplicando correção simples e direta para vulnerabilidades...
echo.

REM Backup dos arquivos de package
echo Criando backup de arquivos...
copy package.json package.json.simple.backup
copy package-lock.json package-lock.json.simple.backup

REM Atualizar react-scripts para versão mais recente estável
echo Atualizando react-scripts para versão segura...
call npm install react-scripts@5.0.1 --save

REM Atualizar pacotes Firebase
echo Atualizando pacotes Firebase...
call npm update firebase --save

REM Pacotes específicos com problemas de segurança conhecidos
echo Atualizando pacotes com vulnerabilidades conhecidas...
call npm update nth-check tough-cookie node-forge semver --save
call npm update @firebase/auth @firebase/firestore @firebase/storage --save

REM Aplicar audit fix sem force primeiro
echo Aplicando correções de segurança...
call npm audit fix

REM Verificar se ainda existem vulnerabilidades sérias
echo Verificando vulnerabilidades restantes...
call npm audit

echo.
echo Processo concluído!
echo.
echo Para resolver vulnerabilidades restantes, execute:
echo npm audit fix --force
echo.
echo Verifique se o aplicativo ainda funciona corretamente após as atualizações.
echo Pressione qualquer tecla para sair...
pause >nul
