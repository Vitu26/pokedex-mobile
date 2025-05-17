import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllFavorites, toggleFavorite } from '../../infra/storage/favorites';

type FavoritesContextType = {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => Promise<void>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    getAllFavorites().then(setFavorites);
  }, []);

  const toggle = async (id: string) => {
    const updated = await toggleFavorite(id);
    if (updated) {
      setFavorites((prev) => [...prev, id]);
    } else {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
