// src/pages/Cart.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    obterSubtotal,
    obterTotal,
  } = useCart();

  const [cupom, setCupom] = useState('');
  const [desconto, setDesconto] = useState(0);

  const subtotal = obterSubtotal();
  const frete = subtotal >= 300 ? 0 : 15;
  const total = obterTotal() - desconto;

  const aplicarCupom = () => {
    const cupomValido: { [key: string]: number } = {
      'PRIMEIRA10': subtotal * 0.1,
      'FRETEGRATIS': frete,
      'BEM20': subtotal * 0.2,
    };

    if (cupomValido[cupom.toUpperCase()]) {
      setDesconto(cupomValido[cupom.toUpperCase()]);
      toast.success(`Cupom ${cupom.toUpperCase()} aplicado!`);
    } else {
      toast.error('Cupom inválido');
    }
  };

  const finalizarCompra = () => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.warning('Faça login para finalizar a compra');
      navigate('/');
      return;
    }

    if (items.length === 0) {
      toast.error('Seu carrinho está vazio');
      return;
    }

    // Redireciona para página de checkout
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 animate-[fadeIn_0.5s_ease-out]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center animate-[fadeInUp_0.6s_ease-out]">
            <span className="ri-shopping-cart-line text-gray-300 text-8xl block mb-4"></span>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos incríveis ao seu carrinho!
            </p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              <span className="ri-arrow-left-line"></span>
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 animate-[fadeIn_0.5s_ease-out]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 animate-[fadeInDown_0.6s_ease-out]">
          <h1 className="text-3xl font-bold text-gray-800">
            Meu Carrinho ({items.length} {items.length === 1 ? 'item' : 'itens'})
          </h1>
          <button
            onClick={limparCarrinho}
            className="text-red-500 hover:text-red-700 text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            <span className="ri-delete-bin-line mr-1"></span>
            Limpar carrinho
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex gap-4 animate-[fadeInLeft_0.6s_ease-out_both] hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-2">
                    {item.size && (
                      <span>
                        Tamanho: <span className="font-medium">{item.size}</span>
                      </span>
                    )}
                    {item.color && (
                      <span>
                        Cor: <span className="font-medium">{item.color}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-lg font-bold text-orange-600">
                    R$ {item.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <span className="ri-subtract-line"></span>
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        <span className="ri-add-line"></span>
                      </button>
                    </div>

                    <button
                      onClick={() => removerDoCarrinho(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm transition-all duration-300 transform hover:scale-110"
                    >
                      <span className="ri-delete-bin-line mr-1"></span>
                      Remover
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 animate-[fadeInRight_0.6s_ease-out]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Resumo do Pedido
              </h2>

              {/* Cupom */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cupom de desconto
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value.toUpperCase())}
                    placeholder="Digite o cupom"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={aplicarCupom}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
                {desconto > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    <span className="ri-check-line"></span> Cupom aplicado!
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">R$ {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Frete</span>
                  <span className="font-medium">
                    {frete === 0 ? (
                      <span className="text-green-600">GRÁTIS</span>
                    ) : (
                      `R$ ${frete.toFixed(2)}`
                    )}
                  </span>
                </div>

                {desconto > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span className="font-medium">-R$ {desconto.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-orange-600">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {subtotal < 300 && (
                <p className="text-xs text-gray-500 mt-3">
                  <span className="ri-truck-line mr-1"></span>
                  Falta R$ {(300 - subtotal).toFixed(2)} para frete grátis
                </p>
              )}

              <button
                onClick={finalizarCompra}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Finalizar Compra
              </button>

              <Link
                to="/home"
                className="block w-full mt-3 text-center text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                <span className="ri-arrow-left-line mr-1"></span>
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translate3d(-30px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translate3d(30px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
