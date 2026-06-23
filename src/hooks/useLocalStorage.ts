'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook para persistir estado en localStorage de forma segura para Next.js (SSR).
 * Evita errores de hidratación asegurando que el primer renderizado en el cliente 
 * coincida exactamente con el del servidor.
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Siempre iniciamos con el valor inicial para coincidir con SSR y el primer render del cliente
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const isFirstRender = useRef(true);

  // Cargamos desde localStorage solo después del montaje inicial
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      // Manejo silencioso de errores de lectura
    }
  }, [key]);

  // Guardamos en local storage cuando el valor cambia, omitiendo la inicialización
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      // Manejo silencioso de errores de escritura
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
