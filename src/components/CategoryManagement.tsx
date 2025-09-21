import React, { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/categories`);
        
        if (response.ok) {
          const data = await response.json();
          setCategories(Array.isArray(data) ? data : []);
        } else {
          setCategories([]);
          setError('Erro ao carregar categorias');
        }
      } catch (err) {
        setError('Erro de conexão com o servidor');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="h-32 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-gray-600">Carregando categorias...</p>
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
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Categorias</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Adicionar Categoria
        </button>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {category.image_url && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image_url} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.parentElement!.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <span className="text-xs text-gray-500">#{category.id}</span>
                </div>
                
                {category.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                )}
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Criado em: {new Date(category.created_at).toLocaleDateString()}</span>
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
            <p className="text-lg font-medium">Nenhuma categoria encontrada</p>
            <p className="text-sm mt-1">Comece adicionando sua primeira categoria</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Adicionar Primeira Categoria
            </button>
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="mt-6 text-sm text-gray-600">
          Total: {categories.length} categoria{categories.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
