// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API = "http://192.168.15.167:3001";

type User = {
  nome: string;
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  birthDate: string | null;
  isActive: boolean;
  createdAt: string;
};

type AuthContextType = {
  usuario: User | null;
  modalAberto: boolean;
  abrirModal: () => void;
  fecharModal: () => void;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUsuario(JSON.parse(stored));
      } catch {
        setUsuario(null);
      }
    }
  }, []);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUsuario(data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        modalAberto,
        abrirModal,
        fecharModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
