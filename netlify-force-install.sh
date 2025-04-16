#!/bin/bash

# Remove node_modules se existir
rm -rf node_modules

# Forçar instalação
echo "Instalando dependências com --legacy-peer-deps --force"
npm install --legacy-peer-deps --force

# Verificar instalação
echo "Dependências instaladas:"
npm list --depth=0

# Buildar o projeto
echo "Iniciando build..."
npm run build 