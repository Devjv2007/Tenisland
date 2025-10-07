// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

const API = "http://localhost:3001/api/products";

type CartItem = {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextType = {
  items: CartItem[];
  adicionarAoCarrinho: (produto: any, quantity?: number, size?: string, color?: string) => void;
  removerDoCarrinho: (productId: number) => void;
  atualizarQuantidade: (productId: number, quantity: number) => void;
  limparCarrinho: () => void;
  obterTotalItens: () => number;
  obterSubtotal: () => number;
  obterTotal: () => number;
  carregando: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const carregarCarrinho = () => {
      try {
        const savedCart = localStorage.getItem('tenisland_cart');
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          setItems(parsed);
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarCarrinho();
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (!carregando) {
      localStorage.setItem('tenisland_cart', JSON.stringify(items));
    }
  }, [items, carregando]);

  const adicionarAoCarrinho = (produto: any, quantity: number = 1, size?: string, color?: string) => {
    setItems((prevItems) => {
      // Verifica se já existe no carrinho (mesmo produto, tamanho e cor)
      const existingIndex = prevItems.findIndex(
        (item) => 
          item.productId === produto.id && 
          item.size === size && 
          item.color === color
      );

      if (existingIndex >= 0) {
        // Atualiza quantidade
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        toast.success(`Quantidade atualizada no carrinho!`);
        return updated;
      } else {
        // Adiciona novo item
        const newItem: CartItem = {
          id: Date.now(), // ID único temporário
          productId: produto.id,
          name: produto.name || produto.nome,
          price: parseFloat(produto.price || produto.preco),
          image: produto.image || produto.imageUrl || produto.imagem || '',
          quantity,
          size,
          color,
        };
        toast.success(`${newItem.name} adicionado ao carrinho!`);
        return [...prevItems, newItem];
      }
    });
  };

  const removerDoCarrinho = (productId: number) => {
    setItems((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== productId);
      toast.info('Item removido do carrinho');
      return filtered;
    });
  };

  const atualizarQuantidade = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removerDoCarrinho(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const limparCarrinho = () => {
    setItems([]);
    localStorage.removeItem('tenisland_cart');
    toast.info('Carrinho limpo');
  };

  const obterTotalItens = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const obterSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const obterTotal = () => {
    const subtotal = obterSubtotal();
    const frete = subtotal > 0 ? (subtotal >= 300 ? 0 : 15) : 0; // Frete grátis acima de R$300
    return subtotal + frete;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        obterTotalItens,
        obterSubtotal,
        obterTotal,
        carregando,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};
