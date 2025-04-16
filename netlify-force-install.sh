#!/bin/bash

# Show Node and NPM version
echo "=============================================="
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"
echo "=============================================="

# Clean environment completely
echo "Cleaning environment..."
rm -rf node_modules
rm -rf package-lock.json
rm -rf .npm
rm -rf build
rm -rf dist

# Create .npmrc file to disable strict checks
echo "Configuring NPM..."
echo "legacy-peer-deps=true" > .npmrc
echo "strict-peer-dependencies=false" >> .npmrc
echo "force=true" >> .npmrc

# Install dependencies with the most permissive flags
echo "Installing dependencies..."
npm install --no-fund --no-audit --legacy-peer-deps --force

# Verify installation
echo "Dependencies installed:"
npm list --depth=0

# Build the project
echo "Starting build..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
  echo "Build completed successfully! Directory 'dist' created."
  ls -la dist
else
  echo "Error: Build failed. Directory 'dist' was not created."
  exit 1
fi 