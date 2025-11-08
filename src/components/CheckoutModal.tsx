import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { itensCarrinho, obterTotal, limparCarrinho } = useCart();
  const { usuario } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<OrderData>({
    name: usuario?.firstName || '',
    email: usuario?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit_card'
  });

  const API_URL = 'http://localhost:3001/api';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Preparar dados do pedido
    const orderPayload = {
      userId: usuario?.id || null,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: `${formData.address}, ${formData.city} - ${formData.state}, ${formData.zipCode}`,
      paymentMethod: formData.paymentMethod,
      totalAmount: obterTotal(),
      items: itensCarrinho.map(item => ({
        productId: item.id, // MUDA DE item.productId PARA item.id
        quantity: item.quantity,
        price: item.price,
        size: item.size || 'M' // Tamanho padrão se não tiver
      }))
    };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // LOG DOS ITENS DO CARRINHO
    console.log('🛒 Itens do carrinho:', itensCarrinho);
    
    const items = itensCarrinho.map(item => {
      console.log('🔍 Item:', item);
      console.log('  - item.id:', item.id);
      console.log('  - item.productId:', item.productId);
      
      return {
        productId: item.productId, // USA productId, NÃO id
        quantity: item.quantity,
        price: item.price,
        size: item.size || 'M'
      };
    });
    
    console.log('📦 Items mapeados:', items);
    
    const orderPayload = {
      userId: usuario?.id || null,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: `${formData.address}, ${formData.city} - ${formData.state}, ${formData.zipCode}`,
      paymentMethod: formData.paymentMethod,
      totalAmount: obterTotal(),
      items
    };

    console.log('📦 Payload completo:', orderPayload);

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();
    console.log('📥 Resposta:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao criar pedido');
    }
    
    toast.success(`Pedido #${data.order.id} criado com sucesso!`);
    limparCarrinho();
    onClose();
    
  } catch (error: any) {
    console.error('❌ Erro ao finalizar pedido:', error);
    toast.error(error.message || 'Erro ao processar pedido. Tente novamente.');
  } finally {
    setLoading(false);
  }
};

    console.log('📦 Enviando pedido:', orderPayload); // DEBUG

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();
    console.log('📥 Resposta:', data); // DEBUG

    if (!response.ok) {
      throw new Error(data.error || 'Erro ao criar pedido');
    }
    
    toast.success(`Pedido #${data.order.id} criado com sucesso!`);
    limparCarrinho();
    onClose();
    
  } catch (error: any) {
    console.error('❌ Erro ao finalizar pedido:', error);
    toast.error(error.message || 'Erro ao processar pedido. Tente novamente.');
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-[slideInUp_0.4s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Finalizar Pedido</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Resumo do Pedido */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Resumo do Pedido</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {itensCarrinho.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} - Tam. {item.size} x{item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-green-600">R$ {obterTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Dados Pessoais */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="João Silva"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="joao@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="(11) 98888-8888"
                />
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Endereço de Entrega</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Endereço *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Rua, número e complemento"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="São Paulo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    maxLength={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="SP"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Método de Pagamento */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Método de Pagamento</h3>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="credit_card">Cartão de Crédito</option>
              <option value="pix">PIX</option>
              <option value="boleto">Boleto Bancário</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-3 bg-black text-white rounded-lg font-medium transition-colors ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
              }`}
            >
              {loading ? 'Processando...' : 'Finalizar Pedido'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutModal;
    