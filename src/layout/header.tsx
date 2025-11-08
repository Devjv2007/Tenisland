// src/components/Header.tsx
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = "http://192.168.15.167:3001"; // Sua API do TenisLand


const Header: React.FC = () => {
  const { usuario, login, logout, modalAberto, fecharModal, abrirModal } = useAuth();
  const { obterTotalItens } = useCart();
  
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [tipoModal, setTipoModal] = useState<'login' | 'cadastro'>('login');
  const [resultados, setResultados] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const headerRef = useRef<HTMLDivElement>(null);
  const inputBuscaRef = useRef<HTMLInputElement>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMenuAberto(false);
        setBuscaAberta(false);
        setTermoBusca('');
        setResultados([]);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  useEffect(() => {
    const buscarEmTempoReal = async () => {
      if (termoBusca.trim().length === 0) {
        setResultados([]);
        return;
      }

      if (termoBusca.trim().length < 2) return;

      setCarregando(true);
      
      try {
       const response = await fetch(`${API}/api/products?q=${encodeURIComponent(termoBusca)}`);

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const produtos = await response.json();

        setResultados(produtos);
        
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setResultados([]);
        toast.error("Erro ao buscar produtos. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    const debounceTimer = setTimeout(buscarEmTempoReal, 300);
    return () => clearTimeout(debounceTimer);
  }, [termoBusca]);

  const handleSubmitAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    
    try {
      if (tipoModal === 'login') {
        const email = formData.get('email') as string;
        const senha = formData.get('senha') as string;
        
        // Chama API de login do TenisLand
        const response = await fetch(`${API}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: senha }),
        });

        const body = await response.json();

        if (response.ok) {
          // Salva no localStorage
          localStorage.setItem('token', body.token);
          localStorage.setItem('user', JSON.stringify(body.user));
          
          // Atualiza contexto
          await login(email, senha);
          
          fecharModal();
          toast.success(`Bem-vindo(a), ${body.user.firstName}!`);
        } else {
          toast.error(body.error || "Email ou senha incorretos");
        }
        
      } else {
        // CADASTRO
        const first_name = formData.get('nome') as string;
        const email = formData.get('email') as string;
        const senha = formData.get('senha') as string;
        const confirmarSenha = formData.get('confirmarSenha') as string;

        if (senha !== confirmarSenha) {
          toast.error("As senhas não coincidem!");
          return;
        }

        if (senha.length < 6) {
          toast.error("A senha deve ter no mínimo 6 caracteres!");
          return;
        }

        // Chama API de cadastro do TenisLand
        const response = await fetch(`${API}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            first_name,
            email,
            password: senha
          }),
        });

        const body = await response.json();

        if (response.ok) {
          // Salva automaticamente após cadastro
          localStorage.setItem('token', body.token);
          localStorage.setItem('user', JSON.stringify(body.user));
          
          toast.success(`Conta criada com sucesso! Bem-vindo(a), ${body.user.firstName}!`);
          
          fecharModal();
          
          // Recarrega para atualizar contexto
          window.location.reload();
        } else {
          toast.error(body.error || 'Erro ao criar conta');
        }
      }
      
    } catch (error) {
      console.error('Erro na requisição:', error);
      toast.error('Erro de conexão. Tente novamente.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    toast.info("Você saiu da sua conta.");
  };

  const handleAbrirModalUsuario = () => {
    setTipoModal('login'); 
    abrirModal(); 
  };

  return (
    <>
      <header
        ref={headerRef}
        className=" bg-white shadow-md border-b border-gray-200 relative z-50 animate-[slideInDown_0.6s_ease-out]"
      >
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          
          <div className="">
           <Link to="/home" className="inline-block flex-shrink-0">
              <img
                src="https://i.pinimg.com/736x/6c/6e/69/6c6e6921b56b1cb82783460c50da84dc.jpg"
                alt="Logo"
                className="h-14"
              />
          </Link>

          </div>

          <div className="flex-1 max-w-md mx-4 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            {buscaAberta ? (
              <div className="flex items-center space-x-2 animate-[expandIn_0.3s_ease-out]">
                <input
                  ref={inputBuscaRef}
                  type="text"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  placeholder="Buscar tênis..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all duration-300"
                  autoComplete="off"
                />
                <button
                  onClick={() => setBuscaAberta(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="ri-close-line"></span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setBuscaAberta(true)}
                className="flex items-center justify-center w-full px-3 py-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                <span className="ri-search-line mr-2"></span>
                <span className="text-sm">Buscar tênis...</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3 animate-[fadeInRight_0.8s_ease-out_0.4s_both]">
            {usuario ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/cart" 
                  className="relative p-2 text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-110 animate-[bounceIn_0.8s_ease-out_0.5s_both]"
                >
                  <span className="ri-shopping-cart-line text-xl"></span>
                  {obterTotalItens() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] animate-pulse">
                      {obterTotalItens()}
                    </span>
                  )}
                </Link>

                <Link
                  to="/account"
                  className="ri-user-line text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-110"
                  title={`Olá, ${usuario.nome || usuario.firstName}`}
                />
                
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
                  title="Sair"
                >
                  <span className="ri-logout-box-line text-xl"></span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleAbrirModalUsuario} 
                className="p-2 text-gray-700 hover:text-orange-600 transition-all duration-300 transform hover:scale-110 animate-[bounceIn_0.8s_ease-out_0.6s_both]"
              >
                <span className="ri-user-line text-xl"></span>
              </button>
            )}

            <button
              onClick={() => setMenuAberto(!menuAberto)}
              className="lg:hidden p-2 text-gray-700 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-90 animate-[bounceIn_0.8s_ease-out_0.7s_both]"
            >
              <span className="ri-menu-line text-xl"></span>
            </button>
          </div>
        </div>

        {menuAberto && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg animate-[slideInDown_0.3s_ease-out]">
            <nav className="flex flex-col py-2">
              {['nike', 'adidas', 'puma', 'jordan', 'ofertas', 'sobre', 'account'].map((item, index) => (
                <Link 
                  key={item}
                  to={`/${item}`} 
                  className="px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-300 transform hover:translate-x-2 animate-[fadeInLeft_0.4s_ease-out_both]" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setMenuAberto(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {buscaAberta && termoBusca.length >= 2 && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-full max-w-md mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-[fadeInUp_0.3s_ease-out]">
            {carregando && (
              <div className="p-4 text-center animate-[fadeIn_0.3s_ease-out]">
                <span className="ri-loader-4-line animate-spin text-lg"></span>
                <p className="text-sm text-gray-500 mt-2">Buscando...</p>
              </div>
            )}

            {!carregando && resultados.length > 0 && (
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-2 bg-gray-50 border-b animate-[fadeInDown_0.3s_ease-out]">
                  <p className="text-xs text-gray-600">
                    {resultados.length} produto{resultados.length !== 1 ? 's' : ''} encontrado{resultados.length !== 1 ? 's' : ''}
                  </p>
                </div>
                {resultados.map((produto, index) => (
                  <Link
                    key={produto.id}
                    to={`/product/${produto.id}`}
                    className="block px-4 py-3 hover:bg-gray-100 border-b last:border-b-0 transition-all duration-300 transform hover:translate-x-2 animate-[fadeInUp_0.4s_ease-out_both]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => {
                      setBuscaAberta(false);
                      setTermoBusca('');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="ri-shopping-bag-line text-gray-400"></span>
                      <div>
                        <div className="font-medium text-sm">{produto.name}</div>
                        <div className="text-xs text-gray-600">R$ {produto.price}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!carregando && termoBusca.length >= 2 && resultados.length === 0 && (
              <div className="p-8 text-center animate-[fadeIn_0.3s_ease-out]">
                <span className="ri-search-line text-gray-400 text-2xl"></span>
                <p className="text-sm text-gray-500 mt-2">
                  Nenhum tênis encontrado para "{termoBusca}"
                </p>
              </div>
            )}
          </div>
        )}
      </header>

      {modalAberto && !usuario && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-[fadeIn_0.3s_ease-out]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              fecharModal();
            }
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 animate-[slideInUp_0.4s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6 animate-[fadeInDown_0.5s_ease-out]">
              <h2 className="text-2xl font-bold text-zinc-700">
                {tipoModal === 'login' ? 'Entrar na Conta' : 'Criar Conta'}
              </h2>
              <button
                onClick={fecharModal}
                className="ri-close-line text-2xl text-zinc-500 hover:text-zinc-700 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              ></button>
            </div>

            <form onSubmit={handleSubmitAuth} className="space-y-4">
              {tipoModal === 'cadastro' && (
                <div className="animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    required
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    placeholder="Digite seu nome completo"
                  />
                </div>
              )}

              <div className="animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Digite seu email"
                />
              </div>

              <div className="relative animate-[fadeInUp_0.5s_ease-out_0.3s_both]">
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Senha
                </label>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  name="senha"
                  required
                  className="w-full px-4 py-3 pr-12 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-all duration-300 transform hover:scale-110"
                >
                  {mostrarSenha ? (
                    <span className="ri-eye-off-line"></span>
                  ) : (
                    <span className="ri-eye-line"></span>
                  )}
                </button>
              </div>

              {tipoModal === 'cadastro' && (
                <div className="relative animate-[fadeInUp_0.5s_ease-out_0.4s_both]">
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type={mostrarConfirmarSenha ? "text" : "password"}
                    name="confirmarSenha"
                    required
                    className="w-full px-4 py-3 pr-12 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 transition-all duration-300 transform hover:scale-110"
                  >
                    {mostrarConfirmarSenha ? (
                      <span className="ri-eye-off-line"></span>
                    ) : (
                      <span className="ri-eye-line"></span>
                    )}
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium transform hover:scale-105 animate-[fadeInUp_0.5s_ease-out_0.5s_both]"
              >
                {tipoModal === 'login' ? 'Entrar' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-6 text-center animate-[fadeInUp_0.5s_ease-out_0.6s_both]">  
              <p className="text-sm text-gray-600">
                {tipoModal === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button
                  onClick={() => setTipoModal(tipoModal === 'login' ? 'cadastro' : 'login')}
                  className="ml-1 text-orange-600 hover:underline font-medium transition-all duration-300"
                >
                  {tipoModal === 'login' ? 'Criar conta' : 'Fazer login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0%, 20%, 40%, 60%, 80%, 100% {
            transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
          }
          20% {
            transform: scale3d(1.1, 1.1, 1.1);
          }
          40% {
            transform: scale3d(0.9, 0.9, 0.9);
          }
          60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
          }
          80% {
            transform: scale3d(0.97, 0.97, 0.97);
          }
          100% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes expandIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .Toastify__toast-container {
          z-index: 99999 !important;
          position: fixed !important;
        }
        
        .Toastify__toast--info {
          background-color: #ffff !important;
          height: 60px !important;
          min-height: 60px !important;
          font-size: 14px !important;
          display: flex !important;
          align-items: center !important;
          padding: 12px 16px !important;
        }
        
        .Toastify__toast--warn {
          height: 60px !important;
          min-height: 60px !important;
          font-size: 14px !important;
          display: flex !important;
          align-items: center !important;
          padding: 12px 16px !important;
        }
      `}</style>
    </>
  );
};

export default Header;
