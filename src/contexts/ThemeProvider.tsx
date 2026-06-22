'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [persistedTheme, setPersistedTheme] = useLocalStorage<string>('theme', 'dark');
  const [theme, setTheme] = useState(persistedTheme);

  useEffect(() => {
    setTheme(persistedTheme);
  }, [persistedTheme]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove(theme === 'dark' ? 'light' : 'dark');
      root.classList.add(theme);
      setPersistedTheme(theme);
    }
  }, [theme, setPersistedTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};