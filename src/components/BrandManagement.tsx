import React, { useState, useEffect } from 'react';

interface Brand {
  id: number;
  name: string;
  logo_url?: string;
  description?: string;
  website?: string;
  created_at: string;
}

const BrandManagement: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
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

    fetchBrands();
  }, []);

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
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Marcas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Adicionar Marca
        </button>
      </div>

      {brands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                <span className="text-xs text-gray-500">#{brand.id}</span>
              </div>
              
              {brand.logo_url && (
                <div className="mb-3">
                  <img 
                    src={brand.logo_url} 
                    alt={`Logo ${brand.name}`}
                    className="w-16 h-16 object-contain rounded border"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {brand.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{brand.description}</p>
              )}
              
              {brand.website && (
                <a 
                  href={brand.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Visitar site →
                </a>
              )}
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Criado em: {new Date(brand.created_at).toLocaleDateString()}</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      Excluir
                    </button>
                  </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p className="text-lg font-medium">Nenhuma marca encontrada</p>
            <p className="text-sm mt-1">Comece adicionando sua primeira marca</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Adicionar Primeira Marca
            </button>
          </div>
        </div>
      )}

      {brands.length > 0 && (
        <div className="mt-6 text-sm text-gray-600">
          Total: {brands.length} marca{brands.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default BrandManagement;
