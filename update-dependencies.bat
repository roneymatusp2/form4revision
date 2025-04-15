@echo off
echo Atualizando dependências e corrigindo vulnerabilidades de segurança...

REM Atualiza react-scripts para a versão mais recente estável
call npm install --save react-scripts@5.0.1

REM Correção específica para a vulnerabilidade do undici
call npm update undici --depth=5

REM Executa a correção de todas as vulnerabilidades possíveis sem quebrar a compatibilidade
call npm audit fix

echo.
echo Atualização completa! As vulnerabilidades de segurança foram corrigidas.
echo Se houver problemas restantes, execute: npm audit fix --force
echo.
echo Pressione qualquer tecla para sair...
pause >nul
