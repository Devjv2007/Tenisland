// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

type FavoriteItem = {
  id: number;
  product_id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image1: string;
    brand?: { name: string } | null;
    category?: { name: string } | null;
  };
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  adicionarAosFavoritos: (productId: number) => Promise<void>;
  removerDosFavoritos: (productId: number) => Promise<void>;
  verificarSeFavorito: (productId: number) => boolean;
  carregarFavoritos: () => Promise<void>;
  totalFavoritos: number;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const auth = useAuth();
  
  // Verifica se auth não é null antes de acessar
const { user, token } = useAuth() || { user: null, token: null };
  
  const API_URL = 'http://192.168.15.167:3001/api/wishlist';


  useEffect(() => {
    if (user && token) {
      carregarFavoritos();
    } else {
      setFavorites([]);
    }
  }, [user, token]);

  const carregarFavoritos = async () => {
    if (!token) return;

    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };
  
const adicionarAosFavoritos = async (productId: number) => {
  console.log('🔍 Token:', token);
  console.log('🔍 User:', user);
  
  if (!token) {
    toast.error('Faça login para favoritar produtos');
    return;
  }

  try {
    console.log('📤 Enviando product_id:', productId); // ADICIONA
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ product_id: productId }) // JÁ ESTÁ CERTO
    }); 

        console.log('📥 Response status:', response.status);
    
    if (response.ok) {
      await carregarFavoritos();
      toast.success('Adicionado aos favoritos!');
    } else {
      const data = await response.json();
      console.log('❌ Erro:', data);
      toast.info(data.error || 'Erro ao adicionar favorito');
    }
  } catch (error) {
    console.error('❌ Erro ao adicionar favorito:', error);
    toast.error('Erro ao adicionar favorito');
  }
};

  const removerDosFavoritos = async (productId: number) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        await carregarFavoritos();
        toast.info('Removido dos favoritos');
      }
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      toast.error('Erro ao remover favorito');
    }
  };

  const verificarSeFavorito = (productId: number) => {
    return favorites.some((fav) => fav.product_id === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        adicionarAosFavoritos,
        removerDosFavoritos,
        verificarSeFavorito,
        carregarFavoritos,
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
