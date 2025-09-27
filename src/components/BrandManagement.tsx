import React, { useState, useEffect } from 'react';

interface Brand {
  id: number;
  name: string;
  logo_url?: string;
  description?: string;
  website?: string;
  created_at: string;
}

interface BrandForm {
  name: string;
  logo_url: string;
  description: string;
  website: string;
}

const BrandManagement: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState<BrandForm>({
    name: '',
    logo_url: '',
    description: '',
    website: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/brands`);
      
      if (response.ok) {
        const data = await response.json();
        setBrands(Array.isArray(data) ? data : []);
      } else {
        setBrands([]);
        setError('Erro ao carregar marcas');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal para adicionar nova marca
  const handleAddBrand = () => {
    setEditingBrand(null);
    setFormData({
      name: '',
      logo_url: '',
      description: '',
      website: ''
    });
    setShowModal(true);
  };

  // Abrir modal para editar marca
  const handleEditBrand = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      logo_url: brand.logo_url || '',
      description: brand.description || '',
      website: brand.website || ''
    });
    setShowModal(true);
  };

  // Fechar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingBrand(null);
    setFormData({
      name: '',
      logo_url: '',
      description: '',
      website: ''
    });
  };

  // Salvar marca (criar ou editar)
  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Nome da marca é obrigatório!');
      return;
    }

    try {
      setSubmitting(true);

      const method = editingBrand ? 'PUT' : 'POST';
      const url = editingBrand 
        ? `${API_URL}/brands/${editingBrand.id}` 
        : `${API_URL}/brands`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchBrands(); // Recarregar lista
        handleCloseModal();
        alert(editingBrand ? 'Marca atualizada com sucesso!' : 'Marca criada com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.message || 'Não foi possível salvar a marca'}`);
      }
    } catch (err) {
      alert('Erro de conexão ao salvar marca');
      console.error('Erro:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Deletar marca
  const handleDeleteBrand = async (brand: Brand) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir a marca "${brand.name}"?\n\nEsta ação não pode ser desfeita.`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/brands/${brand.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchBrands(); // Recarregar lista
        alert('Marca excluída com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao excluir: ${errorData.message || 'Não foi possível excluir a marca'}`);
      }
    } catch (err) {
      alert('Erro de conexão ao excluir marca');
      console.error('Erro:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-gray-600">Carregando marcas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
          <p className="text-red-600 text-sm mt-2">Verifique se o backend está rodando em {API_URL}</p>
          <button 
            onClick={fetchBrands}
            className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Marcas</h2>
          <button 
            onClick={handleAddBrand}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Adicionar Marca</span>
          </button>
        </div>

        {brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <div key={brand.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">#{brand.id}</span>
                </div>
                
                {brand.logo_url && (
                  <div className="mb-3">
                    <img 
                      src={brand.logo_url} 
                      alt={`Logo ${brand.name}`}
                      className="w-16 h-16 object-contain rounded border bg-gray-50"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {brand.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{brand.description}</p>
                )}
                
                {brand.website && (
                  <a 
                    href={brand.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center space-x-1"
                  >
                    <span>Visitar site</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>Criado: {new Date(brand.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditBrand(brand)}
                      className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Editar</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteBrand(brand)}
                      className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Nenhuma marca encontrada</p>
              <p className="text-sm mt-1 mb-4">Comece adicionando sua primeira marca</p>
              <button 
                onClick={handleAddBrand}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Adicionar Primeira Marca
              </button>
            </div>
          </div>
        )}

        {brands.length > 0 && (
          <div className="mt-6 text-sm text-gray-600 border-t pt-4">
            <div className="flex justify-between items-center">
              <span>Total: {brands.length} marca{brands.length !== 1 ? 's' : ''}</span>
              <button 
                onClick={fetchBrands}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                🔄 Atualizar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal para Adicionar/Editar Marca */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingBrand ? 'Editar Marca' : 'Adicionar Nova Marca'}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Marca *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Ex: Nike, Adidas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL do Logo
                </label>
                <input
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  rows={3}
                  placeholder="Descrição da marca..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="https://exemplo.com"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Salvando...' : (editingBrand ? 'Atualizar' : 'Criar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandManagement;
