// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

type FavoriteItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  adicionarAosFavoritos: (item: FavoriteItem) => void;
  removerDosFavoritos: (id: number) => void;
  verificarSeFavorito: (id: number) => boolean;
  limparFavoritos: () => void;
  totalFavoritos: number;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    // CARREGAR DO LOCALSTORAGE NO ESTADO INICIAL
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
        return [];
      }
    }
    return [];
  });

  // Salvar favoritos no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const adicionarAosFavoritos = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) {
        toast.info('Este produto já está nos favoritos');
        return prev;
      }
      toast.success(`${item.name} adicionado aos favoritos!`);
      return [...prev, item];
    });
  };

  const removerDosFavoritos = (id: number) => {
    setFavorites((prev) => {
      const filtered = prev.filter((fav) => fav.id !== id);
      toast.info('Removido dos favoritos');
      return filtered;
    });
  };

  const verificarSeFavorito = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  const limparFavoritos = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
    toast.info('Favoritos limpos');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        adicionarAosFavoritos,
        removerDosFavoritos,
        verificarSeFavorito,
        limparFavoritos,
        totalFavoritos: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de FavoritesProvider');
  }
  return context;
};
