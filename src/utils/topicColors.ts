// topicColors.ts - Biblioteca centralizada de cores para tópicos
// Esta biblioteca garante cores consistentes em todos os componentes

export interface TopicColorScheme {
  // Para TopicList.tsx
  header: string;
  title: string;
  bg: string;
  button: string;
  pattern: string;
  
  // Para TopicPage.tsx
  accent: string;
  border: string;
  buttonBg: string;
  
  // Para SubtopicPage.tsx
  primary: string;
  light: string;
  hover: string;
  text: string;
  activeTab: string;
  inactiveTab: string;
  
  // Propriedades de gradiente para uso geral
  gradient?: string; // Optional para não quebrar código existente
}

// Mapeamento de cores centralizado para todos os tópicos
export const getTopicColorScheme = (id: string): TopicColorScheme => {
  switch(id) {
    case 'unit-1': return {
      // Para TopicList.tsx
      header: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      title: 'text-blue-800',
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      button: 'bg-blue-600 hover:bg-blue-700',
      pattern: 'bg-[linear-gradient(0deg,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]',
      
      // Para TopicPage.tsx
      accent: 'bg-blue-600',
      border: 'border-blue-600',
      buttonBg: 'bg-blue-600',
      
      // Para SubtopicPage.tsx
      primary: 'bg-blue-600',
      light: 'bg-blue-100',
      hover: 'hover:bg-blue-700',
      text: 'text-blue-800',
      activeTab: 'bg-blue-600 text-white',
      inactiveTab: 'text-blue-700 hover:bg-blue-100',
      
      // Propriedade de gradiente (usada em SubtopicPage)
      gradient: 'bg-gradient-to-r from-blue-600 to-indigo-600'
    };
    case 'unit-2': return {
      header: 'bg-gradient-to-r from-emerald-500 to-green-600',
      title: 'text-emerald-800',
      bg: 'bg-gradient-to-br from-emerald-50 to-green-100',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      pattern: 'bg-[radial-gradient(rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:15px_15px]',
      
      accent: 'bg-emerald-500',
      border: 'border-emerald-500',
      buttonBg: 'bg-emerald-600',
      
      primary: 'bg-emerald-500',
      light: 'bg-emerald-100',
      hover: 'hover:bg-emerald-600',
      text: 'text-emerald-800',
      activeTab: 'bg-emerald-500 text-white',
      inactiveTab: 'text-emerald-700 hover:bg-emerald-100',
      
      gradient: 'bg-gradient-to-r from-emerald-500 to-green-600'
    };
    case 'unit-3': return {
      header: 'bg-gradient-to-r from-sky-500 to-cyan-600',
      title: 'text-sky-800',
      bg: 'bg-gradient-to-br from-sky-50 to-cyan-100',
      button: 'bg-sky-600 hover:bg-sky-700',
      pattern: 'bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.07)_0,rgba(14,165,233,0)_70%)]',
      
      accent: 'bg-sky-500',
      border: 'border-sky-500',
      buttonBg: 'bg-sky-600',
      
      primary: 'bg-sky-500',
      light: 'bg-sky-100',
      hover: 'hover:bg-sky-600',
      text: 'text-sky-800',
      activeTab: 'bg-sky-500 text-white',
      inactiveTab: 'text-sky-700 hover:bg-sky-100',
      
      gradient: 'bg-gradient-to-r from-sky-500 to-cyan-600'
    };
    case 'unit-4': return {
      header: 'bg-gradient-to-r from-purple-500 to-violet-600',
      title: 'text-purple-800',
      bg: 'bg-gradient-to-br from-purple-50 to-violet-100',
      button: 'bg-purple-600 hover:bg-purple-700',
      pattern: 'bg-[linear-gradient(45deg,rgba(139,92,246,0.05)_25%,transparent_25%,transparent_50%,rgba(139,92,246,0.05)_50%,rgba(139,92,246,0.05)_75%,transparent_75%,transparent)] bg-[size:16px_16px]',
      
      accent: 'bg-purple-500',
      border: 'border-purple-500',
      buttonBg: 'bg-purple-600',
      
      primary: 'bg-purple-500',
      light: 'bg-purple-100',
      hover: 'hover:bg-purple-600',
      text: 'text-purple-800',
      activeTab: 'bg-purple-500 text-white',
      inactiveTab: 'text-purple-700 hover:bg-purple-100',
      
      gradient: 'bg-gradient-to-r from-purple-500 to-violet-600'
    };
    case 'unit-5': return {
      header: 'bg-gradient-to-r from-red-600 to-orange-500',
      title: 'text-red-800',
      bg: 'bg-gradient-to-br from-red-50 to-orange-100',
      button: 'bg-red-600 hover:bg-red-700',
      pattern: 'bg-[radial-gradient(rgba(239,68,68,0.07)_1px,transparent_1px)] bg-[size:20px_20px]',
      
      accent: 'bg-red-600',
      border: 'border-red-600',
      buttonBg: 'bg-red-600',
      
      primary: 'bg-red-600',
      light: 'bg-red-100',
      hover: 'hover:bg-red-700',
      text: 'text-red-800',
      activeTab: 'bg-red-600 text-white',
      inactiveTab: 'text-red-700 hover:bg-red-100',
      
      gradient: 'bg-gradient-to-r from-red-600 to-orange-500'
    };
    case 'unit-6': return {
      header: 'bg-gradient-to-r from-fuchsia-600 to-pink-600',
      title: 'text-fuchsia-800',
      bg: 'bg-gradient-to-br from-fuchsia-50 to-pink-100',
      button: 'bg-fuchsia-600 hover:bg-fuchsia-700',
      pattern: 'bg-[linear-gradient(45deg,rgba(217,70,239,0.05)_25%,transparent_25%,transparent_50%,rgba(217,70,239,0.05)_50%,rgba(217,70,239,0.05)_75%,transparent_75%,transparent)] bg-[size:20px_20px]',
      
      accent: 'bg-fuchsia-600',
      border: 'border-fuchsia-600',
      buttonBg: 'bg-fuchsia-600',
      
      primary: 'bg-fuchsia-600',
      light: 'bg-fuchsia-100',
      hover: 'hover:bg-fuchsia-700',
      text: 'text-fuchsia-800',
      activeTab: 'bg-fuchsia-600 text-white',
      inactiveTab: 'text-fuchsia-700 hover:bg-fuchsia-100',
      
      gradient: 'bg-gradient-to-r from-fuchsia-600 to-pink-600'
    };
    case 'unit-7': return {
      header: 'bg-gradient-to-r from-indigo-600 to-violet-600',
      title: 'text-indigo-800',
      bg: 'bg-gradient-to-br from-indigo-50 to-violet-100',
      button: 'bg-indigo-600 hover:bg-indigo-700',
      pattern: 'bg-[repeating-linear-gradient(90deg,rgba(79,70,229,0.06)_0px,rgba(79,70,229,0.06)_1px,transparent_1px,transparent_20px),repeating-linear-gradient(0deg,rgba(79,70,229,0.06)_0px,rgba(79,70,229,0.06)_1px,transparent_1px,transparent_20px)]',
      
      accent: 'bg-indigo-600',
      border: 'border-indigo-600',
      buttonBg: 'bg-indigo-600',
      
      primary: 'bg-indigo-600',
      light: 'bg-indigo-100',
      hover: 'hover:bg-indigo-700',
      text: 'text-indigo-800',
      activeTab: 'bg-indigo-600 text-white',
      inactiveTab: 'text-indigo-700 hover:bg-indigo-100',
      
      gradient: 'bg-gradient-to-r from-indigo-600 to-violet-600'
    };
    case 'unit-8': return {
      header: 'bg-gradient-to-r from-teal-500 to-cyan-600',
      title: 'text-teal-800',
      bg: 'bg-gradient-to-br from-teal-50 to-cyan-100',
      button: 'bg-teal-600 hover:bg-teal-700',
      pattern: 'bg-[radial-gradient(rgba(20,184,166,0.07)_1px,transparent_1px)] bg-[size:14px_14px] bg-[position:7px_7px]',
      
      accent: 'bg-teal-500',
      border: 'border-teal-500',
      buttonBg: 'bg-teal-600',
      
      primary: 'bg-teal-500',
      light: 'bg-teal-100',
      hover: 'hover:bg-teal-600',
      text: 'text-teal-800',
      activeTab: 'bg-teal-500 text-white',
      inactiveTab: 'text-teal-700 hover:bg-teal-100',
      
      gradient: 'bg-gradient-to-r from-teal-500 to-cyan-600'
    };
    // Valor padrão
    default: return {
      header: 'bg-gradient-to-r from-amber-500 to-yellow-500',
      title: 'text-amber-800',
      bg: 'bg-gradient-to-br from-amber-50 to-yellow-100',
      button: 'bg-amber-600 hover:bg-amber-700',
      pattern: 'bg-[repeating-linear-gradient(45deg,rgba(245,158,11,0.05),rgba(245,158,11,0.05)_5px,transparent_5px,transparent_20px)]',
      
      accent: 'bg-amber-500',
      border: 'border-amber-500',
      buttonBg: 'bg-amber-600',
      
      primary: 'bg-amber-500',
      light: 'bg-amber-100',
      hover: 'hover:bg-amber-600',
      text: 'text-amber-800',
      activeTab: 'bg-amber-500 text-white',
      inactiveTab: 'text-amber-700 hover:bg-amber-100',
      
      gradient: 'bg-gradient-to-r from-amber-500 to-yellow-500'
    };
  }
};