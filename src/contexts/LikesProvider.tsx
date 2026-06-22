'use client';

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { ContentItem } from '@/lib/types';

interface LikesContextType {
  likedItems: ContentItem[];
  addLike: (item: ContentItem) => void;
  removeLike: (itemId: string) => void;
  isLiked: (itemId: string) => boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export const LikesProvider = ({ children }: { children: ReactNode }) => {
  const [likedItems, setLikedItems] = useLocalStorage<ContentItem[]>('likedItems', []);

  const addLike = useCallback((item: ContentItem) => {
    setLikedItems((prevItems) => {
      if (prevItems.find(i => i.id === item.id)) return prevItems;
      return [...prevItems, item];
    });
  }, [setLikedItems]);

  const removeLike = useCallback((itemId: string) => {
    setLikedItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  }, [setLikedItems]);

  const isLiked = useCallback((itemId: string) => {
    return likedItems.some(item => item.id === itemId);
  }, [likedItems]);
  
  return (
    <LikesContext.Provider value={{ likedItems, addLike, removeLike, isLiked }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  const context = useContext(LikesContext);
  if (context === undefined) {
    throw new Error('useLikes must be used within a LikesProvider');
  }
  return context;
};