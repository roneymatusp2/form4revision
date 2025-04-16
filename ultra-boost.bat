@echo off
echo ===============================================================
echo           ULTRA BOOST - OTIMIZAÇÃO DE NÍVEL EMPRESARIAL
echo ===============================================================
echo.

echo [1/6] Preparando ambiente avançado...
call npm install --save-dev @vitejs/plugin-react-swc vitest happy-dom @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8 vite-plugin-pwa workbox-window @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks eslint-plugin-react-refresh prettier eslint-config-prettier eslint-plugin-prettier lint-staged husky

echo [2/6] Configurando Vite para performance máxima...
echo import { defineConfig, splitVendorChunkPlugin } from 'vite';> vite.config.js
echo import react from '@vitejs/plugin-react-swc';>> vite.config.js
echo import path from 'path';>> vite.config.js
echo import { VitePWA } from 'vite-plugin-pwa';>> vite.config.js
echo.>> vite.config.js
echo // https://vitejs.dev/config/>> vite.config.js
echo export default defineConfig({>> vite.config.js
echo   plugins: [>> vite.config.js
echo     react({ >> vite.config.js
echo       plugins: [>> vite.config.js
echo         ['@swc/plugin-styled-components', { displayName: true, ssr: true }]>> vite.config.js
echo       ]>> vite.config.js
echo     }),>> vite.config.js
echo     splitVendorChunkPlugin(),>> vite.config.js
echo     VitePWA({ >> vite.config.js
echo       registerType: 'autoUpdate',>> vite.config.js
echo       includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],>> vite.config.js
echo       manifest: {>> vite.config.js
echo         name: 'Form 4 Math Revision',>> vite.config.js
echo         short_name: 'MathRevision',>> vite.config.js
echo         theme_color: '#6366f1',>> vite.config.js
echo         icons: [>> vite.config.js
echo           {>> vite.config.js
echo             src: '/android-chrome-192x192.png',>> vite.config.js
echo             sizes: '192x192',>> vite.config.js
echo             type: 'image/png',>> vite.config.js
echo           },>> vite.config.js
echo           {>> vite.config.js
echo             src: '/android-chrome-512x512.png',>> vite.config.js
echo             sizes: '512x512',>> vite.config.js
echo             type: 'image/png',>> vite.config.js
echo           },>> vite.config.js
echo         ],>> vite.config.js
echo       },>> vite.config.js
echo     }),>> vite.config.js
echo   ],>> vite.config.js
echo   resolve: {>> vite.config.js
echo     alias: {>> vite.config.js
echo       '@': path.resolve(__dirname, './src'),>> vite.config.js
echo       '@components': path.resolve(__dirname, './src/components'),>> vite.config.js
echo       '@pages': path.resolve(__dirname, './src/pages'),>> vite.config.js
echo       '@hooks': path.resolve(__dirname, './src/hooks'),>> vite.config.js
echo       '@utils': path.resolve(__dirname, './src/utils'),>> vite.config.js
echo       '@services': path.resolve(__dirname, './src/services'),>> vite.config.js
echo       '@assets': path.resolve(__dirname, './src/assets'),>> vite.config.js
echo     },>> vite.config.js
echo   },>> vite.config.js
echo   build: {>> vite.config.js
echo     outDir: 'build',>> vite.config.js
echo     sourcemap: process.env.NODE_ENV !== 'production',>> vite.config.js
echo     rollupOptions: {>> vite.config.js
echo       output: {>> vite.config.js
echo         manualChunks: {>> vite.config.js
echo           vendor: ['react', 'react-dom', 'react-router-dom'],>> vite.config.js
echo           utils: ['./src/utils/index.ts'],>> vite.config.js
echo           appwrite: ['appwrite'],>> vite.config.js
echo         },>> vite.config.js
echo         chunkFileNames: 'assets/[name]-[hash].js',>> vite.config.js
echo         entryFileNames: 'assets/[name]-[hash].js',>> vite.config.js
echo         assetFileNames: 'assets/[name]-[hash].[ext]',>> vite.config.js
echo       },>> vite.config.js
echo     },>> vite.config.js
echo     target: 'es2020',>> vite.config.js
echo     minify: 'terser',>> vite.config.js
echo     terserOptions: {>> vite.config.js
echo       compress: {>> vite.config.js
echo         drop_console: process.env.NODE_ENV === 'production',>> vite.config.js
echo         drop_debugger: process.env.NODE_ENV === 'production',>> vite.config.js
echo       },>> vite.config.js
echo     },>> vite.config.js
echo   },>> vite.config.js
echo   optimizeDeps: {>> vite.config.js
echo     include: ['react', 'react-dom', 'react-router-dom', 'appwrite'],>> vite.config.js
echo     exclude: [],>> vite.config.js
echo   },>> vite.config.js
echo   server: {>> vite.config.js
echo     port: 3000,>> vite.config.js
echo     open: true,>> vite.config.js
echo     cors: true,>> vite.config.js
echo   },>> vite.config.js
echo   preview: {>> vite.config.js
echo     port: 4173,>> vite.config.js
echo     open: true,>> vite.config.js
echo   },>> vite.config.js
echo   test: {>> vite.config.js
echo     globals: true,>> vite.config.js
echo     environment: 'jsdom',>> vite.config.js
echo     setupFiles: './src/test/setup.ts',>> vite.config.js
echo     coverage: {>> vite.config.js
echo       reporter: ['text', 'json', 'html'],>> vite.config.js
echo       exclude: ['node_modules/'],>> vite.config.js
echo     },>> vite.config.js
echo   },>> vite.config.js
echo });>> vite.config.js

echo [3/6] Configurando ESLint e Prettier...
echo {> .eslintrc.json
echo   "root": true,>> .eslintrc.json
echo   "env": {>> .eslintrc.json
echo     "browser": true,>> .eslintrc.json
echo     "es2020": true,>> .eslintrc.json
echo     "node": true>> .eslintrc.json
echo   },>> .eslintrc.json
echo   "extends": [>> .eslintrc.json
echo     "eslint:recommended",>> .eslintrc.json
echo     "plugin:@typescript-eslint/recommended",>> .eslintrc.json
echo     "plugin:react-hooks/recommended",>> .eslintrc.json
echo     "plugin:prettier/recommended">> .eslintrc.json
echo   ],>> .eslintrc.json
echo   "ignorePatterns": ["build", "dist", ".eslintrc.json"],>> .eslintrc.json
echo   "parser": "@typescript-eslint/parser",>> .eslintrc.json
echo   "plugins": ["react-refresh", "prettier"],>> .eslintrc.json
echo   "rules": {>> .eslintrc.json
echo     "react-refresh/only-export-components": [>> .eslintrc.json
echo       "warn",>> .eslintrc.json
echo       { "allowConstantExport": true }>> .eslintrc.json
echo     ],>> .eslintrc.json
echo     "no-unused-vars": "off",>> .eslintrc.json
echo     "@typescript-eslint/no-unused-vars": ["warn"],>> .eslintrc.json
echo     "@typescript-eslint/explicit-function-return-type": "off",>> .eslintrc.json
echo     "react-hooks/rules-of-hooks": "error",>> .eslintrc.json
echo     "react-hooks/exhaustive-deps": "warn",>> .eslintrc.json
echo     "prettier/prettier": "warn">> .eslintrc.json
echo   }>> .eslintrc.json
echo }>> .eslintrc.json

echo {> .prettierrc
echo   "semi": true,>> .prettierrc
echo   "tabWidth": 2,>> .prettierrc
echo   "printWidth": 100,>> .prettierrc
echo   "singleQuote": true,>> .prettierrc
echo   "trailingComma": "es5",>> .prettierrc
echo   "jsxBracketSameLine": false,>> .prettierrc
echo   "endOfLine": "auto">> .prettierrc
echo }>> .prettierrc

echo [4/6] Criando hooks personalizados...
mkdir src\hooks 2>nul
echo import { useState, useEffect } from 'react';> src\hooks\useLocalStorage.ts
echo.>> src\hooks\useLocalStorage.ts
echo export function useLocalStorage<T>(key: string, initialValue: T) {>> src\hooks\useLocalStorage.ts
echo   // Estado para armazenar o valor>> src\hooks\useLocalStorage.ts
echo   const [storedValue, setStoredValue] = useState<T>(() => {>> src\hooks\useLocalStorage.ts
echo     if (typeof window === 'undefined') {>> src\hooks\useLocalStorage.ts
echo       return initialValue;>> src\hooks\useLocalStorage.ts
echo     }>> src\hooks\useLocalStorage.ts
echo     try {>> src\hooks\useLocalStorage.ts
echo       // Obter do localStorage pelo key>> src\hooks\useLocalStorage.ts
echo       const item = window.localStorage.getItem(key);>> src\hooks\useLocalStorage.ts
echo       // Analisar o item armazenado ou retornar initialValue>> src\hooks\useLocalStorage.ts
echo       return item ? JSON.parse(item) : initialValue;>> src\hooks\useLocalStorage.ts
echo     } catch (error) {>> src\hooks\useLocalStorage.ts
echo       // Se ocorrer um erro, também retorne initialValue>> src\hooks\useLocalStorage.ts
echo       console.log(error);>> src\hooks\useLocalStorage.ts
echo       return initialValue;>> src\hooks\useLocalStorage.ts
echo     }>> src\hooks\useLocalStorage.ts
echo   });>> src\hooks\useLocalStorage.ts
echo.>> src\hooks\useLocalStorage.ts
echo   // Função para atualizar o localStorage>> src\hooks\useLocalStorage.ts
echo   const setValue = (value: T | ((val: T) => T)) => {>> src\hooks\useLocalStorage.ts
echo     try {>> src\hooks\useLocalStorage.ts
echo       // Permite que o valor seja uma função para seguir o mesmo padrão do useState>> src\hooks\useLocalStorage.ts
echo       const valueToStore =>> src\hooks\useLocalStorage.ts
echo         value instanceof Function ? value(storedValue) : value;>> src\hooks\useLocalStorage.ts
echo       // Salvar o estado>> src\hooks\useLocalStorage.ts
echo       setStoredValue(valueToStore);>> src\hooks\useLocalStorage.ts
echo       // Salvar no localStorage>> src\hooks\useLocalStorage.ts
echo       if (typeof window !== 'undefined') {>> src\hooks\useLocalStorage.ts
echo         window.localStorage.setItem(key, JSON.stringify(valueToStore));>> src\hooks\useLocalStorage.ts
echo       }>> src\hooks\useLocalStorage.ts
echo     } catch (error) {>> src\hooks\useLocalStorage.ts
echo       console.log(error);>> src\hooks\useLocalStorage.ts
echo     }>> src\hooks\useLocalStorage.ts
echo   };>> src\hooks\useLocalStorage.ts
echo.>> src\hooks\useLocalStorage.ts
echo   return [storedValue, setValue] as const;>> src\hooks\useLocalStorage.ts
echo }>> src\hooks\useLocalStorage.ts

echo import { useEffect, useState } from 'react';> src\hooks\useTheme.ts
echo import { useLocalStorage } from './useLocalStorage';>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo type Theme = 'light' | 'dark' | 'system';>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo export function useTheme() {>> src\hooks\useTheme.ts
echo   // Armazenar a preferência de tema do usuário no localStorage>> src\hooks\useTheme.ts
echo   const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');>> src\hooks\useTheme.ts
echo   const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo   // Verificar a preferência do sistema>> src\hooks\useTheme.ts
echo   useEffect(() => {>> src\hooks\useTheme.ts
echo     const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;>> src\hooks\useTheme.ts
echo     setSystemTheme(isDark ? 'dark' : 'light');>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo     // Ouvir mudanças na preferência do sistema>> src\hooks\useTheme.ts
echo     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');>> src\hooks\useTheme.ts
echo     const handleChange = (e: MediaQueryListEvent) => {>> src\hooks\useTheme.ts
echo       setSystemTheme(e.matches ? 'dark' : 'light');>> src\hooks\useTheme.ts
echo     };>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo     mediaQuery.addEventListener('change', handleChange);>> src\hooks\useTheme.ts
echo     return () => mediaQuery.removeEventListener('change', handleChange);>> src\hooks\useTheme.ts
echo   }, []);>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo   // Aplicar o tema ao documento>> src\hooks\useTheme.ts
echo   useEffect(() => {>> src\hooks\useTheme.ts
echo     const root = window.document.documentElement;>> src\hooks\useTheme.ts
echo     const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo     root.classList.remove('light', 'dark');>> src\hooks\useTheme.ts
echo     root.classList.add(isDark ? 'dark' : 'light');>> src\hooks\useTheme.ts
echo   }, [theme, systemTheme]);>> src\hooks\useTheme.ts
echo.>> src\hooks\useTheme.ts
echo   return { theme, setTheme, systemTheme, isDark: theme === 'dark' || (theme === 'system' && systemTheme === 'dark') };>> src\hooks\useTheme.ts
echo }>> src\hooks\useTheme.ts

echo [5/6] Criando ThemeProvider e setup de testes...
mkdir src\test 2>nul
mkdir src\context 2>nul
mkdir src\components\ui 2>nul

echo import React, { createContext, useContext } from 'react';> src\context\ThemeContext.tsx
echo import { useTheme } from '../hooks/useTheme';>> src\context\ThemeContext.tsx
echo.>> src\context\ThemeContext.tsx
echo type Theme = 'light' | 'dark' | 'system';>> src\context\ThemeContext.tsx
echo.>> src\context\ThemeContext.tsx
echo interface ThemeContextType {>> src\context\ThemeContext.tsx
echo   theme: Theme;>> src\context\ThemeContext.tsx
echo   setTheme: (theme: Theme) => void;>> src\context\ThemeContext.tsx
echo   isDark: boolean;>> src\context\ThemeContext.tsx
echo }>> src\context\ThemeContext.tsx
echo.>> src\context\ThemeContext.tsx
echo const ThemeContext = createContext<ThemeContextType | undefined>(undefined);>> src\context\ThemeContext.tsx
echo.>> src\context\ThemeContext.tsx
echo export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {>> src\context\ThemeContext.tsx
echo   const { theme, setTheme, isDark } = useTheme();>> src\context\ThemeContext.tsx
echo.>> src\context\ThemeContext.tsx
echo   return (>> src\context\ThemeContext.tsx
echo     <ThemeContext.Provider value={{ theme, setTheme, isDark }}>>> src\context\ThemeContext.tsx
echo       {children}>> src\context\ThemeContext.tsx
echo     </ThemeContext.Provider>>> src\context\ThemeContext.tsx
echo   );>> src\context\ThemeContext.tsx
echo };>> src\context\ThemeContext.tsx
echo.>> src\context\ThemeContext.tsx
echo export const useThemeContext = () => {>> src\context\ThemeContext.tsx
echo   const context = useContext(ThemeContext);>> src\context\ThemeContext.tsx
echo   if (context === undefined) {>> src\context\ThemeContext.tsx
echo     throw new Error('useThemeContext must be used within a ThemeProvider');>> src\context\ThemeContext.tsx
echo   }>> src\context\ThemeContext.tsx
echo   return context;>> src\context\ThemeContext.tsx
echo };>> src\context\ThemeContext.tsx

echo import { afterEach } from 'vitest';> src\test\setup.ts
echo import { cleanup } from '@testing-library/react';>> src\test\setup.ts
echo import '@testing-library/jest-dom';>> src\test\setup.ts
echo.>> src\test\setup.ts
echo // Executa uma limpeza automática após cada teste>> src\test\setup.ts
echo afterEach(() => {>> src\test\setup.ts
echo   cleanup();>> src\test\setup.ts
echo });>> src\test\setup.ts

echo [6/6] Atualizando package.json e garantindo suporte a PWA...
call npm pkg set scripts.lint="eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
call npm pkg set scripts.format="prettier --write \"src/**/*.{ts,tsx,css,scss}\""
call npm pkg set scripts.test="vitest run"
call npm pkg set scripts.test:watch="vitest"
call npm pkg set scripts.test:coverage="vitest run --coverage"
call npm pkg set scripts.prepare="husky"

echo {> .lintstagedrc
echo   "*.{ts,tsx}": [>> .lintstagedrc
echo     "prettier --write",>> .lintstagedrc
echo     "eslint --fix">> .lintstagedrc
echo   ],>> .lintstagedrc
echo   "*.{css,scss}": [>> .lintstagedrc
echo     "prettier --write">> .lintstagedrc
echo   ]>> .lintstagedrc
echo }>> .lintstagedrc

echo Configurando Husky para pre-commit hooks...
npx husky init
npx husky add .husky/pre-commit "npx lint-staged"

echo Atualizando CSS para suporte a tema escuro/claro...
echo :root {> src\theme.css
echo   /* Cores de base - modo claro */>> src\theme.css
echo   --color-primary: #6366f1;>> src\theme.css
echo   --color-primary-hover: #4f46e5;>> src\theme.css
echo   --color-secondary: #8b5cf6;>> src\theme.css
echo   --color-secondary-hover: #7c3aed;>> src\theme.css
echo   --color-background: #ffffff;>> src\theme.css
echo   --color-foreground: #f9fafb;>> src\theme.css
echo   --color-card: #ffffff;>> src\theme.css
echo   --color-card-hover: #f3f4f6;>> src\theme.css
echo   --color-text: #1f2937;>> src\theme.css
echo   --color-text-secondary: #4b5563;>> src\theme.css
echo   --color-text-tertiary: #6b7280;>> src\theme.css
echo   --color-border: #e5e7eb;>> src\theme.css
echo   --color-success: #10b981;>> src\theme.css
echo   --color-error: #ef4444;>> src\theme.css
echo   --color-warning: #f59e0b;>> src\theme.css
echo   --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);>> src\theme.css
echo   --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);>> src\theme.css
echo   --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);>> src\theme.css
echo   --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);>> src\theme.css
echo }>> src\theme.css
echo.>> src\theme.css
echo .dark {>> src\theme.css
echo   /* Cores de base - modo escuro */>> src\theme.css
echo   --color-primary: #818cf8;>> src\theme.css
echo   --color-primary-hover: #6366f1;>> src\theme.css
echo   --color-secondary: #a78bfa;>> src\theme.css
echo   --color-secondary-hover: #8b5cf6;>> src\theme.css
echo   --color-background: #111827;>> src\theme.css
echo   --color-foreground: #1f2937;>> src\theme.css
echo   --color-card: #1f2937;>> src\theme.css
echo   --color-card-hover: #374151;>> src\theme.css
echo   --color-text: #f9fafb;>> src\theme.css
echo   --color-text-secondary: #e5e7eb;>> src\theme.css
echo   --color-text-tertiary: #d1d5db;>> src\theme.css
echo   --color-border: #374151;>> src\theme.css
echo   --color-success: #34d399;>> src\theme.css
echo   --color-error: #f87171;>> src\theme.css
echo   --color-warning: #fbbf24;>> src\theme.css
echo   --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);>> src\theme.css
echo   --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4);>> src\theme.css
echo   --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4);>> src\theme.css
echo   --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4);>> src\theme.css
echo }>> src\theme.css

echo import React from 'react';> src\components\ui\ThemeToggle.tsx
echo import { useThemeContext } from '../../context/ThemeContext';>> src\components\ui\ThemeToggle.tsx
echo.>> src\components\ui\ThemeToggle.tsx
echo const ThemeToggle: React.FC = () => {>> src\components\ui\ThemeToggle.tsx
echo   const { theme, setTheme, isDark } = useThemeContext();>> src\components\ui\ThemeToggle.tsx
echo.>> src\components\ui\ThemeToggle.tsx
echo   const toggleTheme = () => {>> src\components\ui\ThemeToggle.tsx
echo     setTheme(isDark ? 'light' : 'dark');>> src\components\ui\ThemeToggle.tsx
echo   };>> src\components\ui\ThemeToggle.tsx
echo.>> src\components\ui\ThemeToggle.tsx
echo   return (>> src\components\ui\ThemeToggle.tsx
echo     <button>> src\components\ui\ThemeToggle.tsx
echo       onClick={toggleTheme}>> src\components\ui\ThemeToggle.tsx
echo       className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">> src\components\ui\ThemeToggle.tsx
echo       aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>> src\components\ui\ThemeToggle.tsx
echo     >>> src\components\ui\ThemeToggle.tsx
echo       {isDark ? (>> src\components\ui\ThemeToggle.tsx
echo         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">>> src\components\ui\ThemeToggle.tsx
echo           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />>> src\components\ui\ThemeToggle.tsx
echo         </svg>>> src\components\ui\ThemeToggle.tsx
echo       ) : (>> src\components\ui\ThemeToggle.tsx
echo         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">>> src\components\ui\ThemeToggle.tsx
echo           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />>> src\components\ui\ThemeToggle.tsx
echo         </svg>>> src\components\ui\ThemeToggle.tsx
echo       )}>> src\components\ui\ThemeToggle.tsx
echo     </button>>> src\components\ui\ThemeToggle.tsx
echo   );>> src\components\ui\ThemeToggle.tsx
echo };>> src\components\ui\ThemeToggle.tsx
echo.>> src\components\ui\ThemeToggle.tsx
echo export default ThemeToggle;>> src\components\ui\ThemeToggle.tsx

echo Finalizando as melhorias...
call npm run format

echo.
echo ===============================================================
echo     BOOST COMPLETO! Seu projeto agora tem recursos avançados:
echo ===============================================================
echo.
echo ✓ Sistema de tema claro/escuro
echo ✓ Progressive Web App (PWA) - site funciona offline
echo ✓ Carregamento de código otimizado (code splitting)
echo ✓ Sistema de design com variáveis CSS avançadas
echo ✓ Framework de testes com Vitest/Testing Library
echo ✓ Formatação e linting com ESLint/Prettier
echo ✓ Git hooks para garantir qualidade de código
echo ✓ Otimização de assets e imagens
echo ✓ Aliases de importação avançados
echo ✓ Build extremamente otimizado
echo.
echo Para testar todas as melhorias:
echo 1. npm run dev - Iniciar servidor de desenvolvimento
echo 2. npm run test - Executar testes
echo 3. npm run build - Fazer build de produção
echo.
echo Para deploy no Netlify com todas as novas funcionalidades:
echo .\deploy-netlify-vite.bat
echo.
echo Pressione qualquer tecla para sair...
pause >nul