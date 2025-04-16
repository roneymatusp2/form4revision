import { useState, useEffect } from 'react';

  // Estado para armazenar o valor
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Obter do localStorage pelo key
      const item = window.localStorage.getItem(key);
      // Analisar o item armazenado ou retornar initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se ocorrer um erro, também retorne initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Função para atualizar o localStorage
