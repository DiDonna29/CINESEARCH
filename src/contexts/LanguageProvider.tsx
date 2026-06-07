'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    movies: 'Movies',
    tvShows: 'TV Shows',
    anime: 'Anime',
    search: 'Search',
    profile: 'Profile',
    recommendations: 'Recommendations',
    director: 'Director',
    actors: 'Actors',
    genre: 'Genre',
    description: 'Description',
    releaseYear: 'Release Year',
    duration: 'Duration',
    rating: 'Rating',
    noDescription: 'No description available.',
    getRecommendations: 'Get AI Recommendations',
    noRecommendations: 'No recommendations available yet.',
    loadingRecommendations: 'Loading recommendations...',
    showMore: 'Show More',
    showLess: 'Show Less',
    likedContent: 'Liked Content',
    noLikedContent: 'You have not liked any content yet.',
    searchPlaceholder: 'Search for movies, TV shows or anime...',
    searchResultsFor: 'Search results for',
    noResultsFound: 'No results found.',
    loading: 'Loading...',
    errorOccurred: 'An error occurred',
    goBack: 'Go Back',
    home: 'Home',
    selectLanguage: 'Select Language',
    toggleTheme: 'Toggle Theme',
    language: 'Language',
    theme: 'Theme',
    english: 'English',
    spanish: 'Spanish',
    country: 'Country',
    in: 'in',
    next: 'Next',
    previous: 'Previous',
    pageOf: 'Page {{current}} of {{total}}',
  },
  es: {
    movies: 'Películas',
    tvShows: 'Series de TV',
    anime: 'Anime',
    search: 'Buscar',
    profile: 'Perfil',
    recommendations: 'Recomendaciones',
    director: 'Director',
    actors: 'Actores',
    genre: 'Género',
    description: 'Descripción',
    releaseYear: 'Año de Lanzamiento',
    duration: 'Duración',
    rating: 'Calificación',
    noDescription: 'No hay descripción disponible.',
    getRecommendations: 'Obtener Recomendaciones IA',
    noRecommendations: 'No hay recomendaciones disponibles todavía.',
    loadingRecommendations: 'Cargando recomendaciones...',
    showMore: 'Mostrar Más',
    showLess: 'Mostrar Menos',
    likedContent: 'Contenido Guardado',
    noLikedContent: 'Aún no has guardado ningún contenido.',
    searchPlaceholder: 'Buscar películas, series o anime...',
    searchResultsFor: 'Resultados de búsqueda para',
    noResultsFound: 'No se encontraron resultados.',
    loading: 'Cargando...',
    errorOccurred: 'Ocurrió un error',
    goBack: 'Volver',
    home: 'Inicio',
    selectLanguage: 'Seleccionar Idioma',
    toggleTheme: 'Cambiar Tema',
    language: 'Idioma',
    theme: 'Tema',
    english: 'Inglés',
    spanish: 'Español',
    country: 'País',
    in: 'en',
    next: 'Siguiente',
    previous: 'Anterior',
    pageOf: 'Página {{current}} de {{total}}',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useLocalStorage<Language>('language', 'en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };
  
  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'es' : 'en');
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };
  
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
