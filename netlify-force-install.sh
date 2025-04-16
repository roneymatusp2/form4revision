#!/bin/bash

# Mostrar a versão do Node e NPM
echo "=============================================="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "=============================================="

# Limpar completamente o ambiente
echo "Limpando ambiente..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf .npm
rm -rf build
rm -rf dist

# Criar arquivo .npmrc para desativar verificações rigorosas
echo "Configurando NPM..."
echo "legacy-peer-deps=true" > .npmrc
echo "strict-peer-dependencies=false" >> .npmrc
echo "force=true" >> .npmrc

# Instalar dependências com as flags mais permissivas possíveis
echo "Instalando dependências..."
npm install --no-fund --no-audit --legacy-peer-deps --force

# Verificar instalação
echo "Dependências instaladas:"
npm list --depth=0

# Compilar o projeto
echo "Iniciando build..."
npm run build

# Verificar se o build foi bem-sucedido
if [ -d "dist" ]; then
  echo "Build concluído com sucesso! Diretório 'dist' criado."
  ls -la dist
else
  echo "Erro: O build falhou. O diretório 'dist' não foi criado."
  exit 1
fi 