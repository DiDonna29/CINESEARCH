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
    // Ensure theme is set on initial client render
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
  
  // Avoid rendering children until theme is determined client-side
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; 
  }

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
