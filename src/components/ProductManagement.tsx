import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  brand_id: number;
  category_id: number;
  stock_quantity: number;
  size?: string;
  color?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  is_active: boolean;
  brand?: { name: string };
  category?: { name: string };
}

interface Brand {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface ProductFormData {
  name: string;
  description: string;
  brand_id: string;
  category_id: string;
  price: string;
  stock_quantity: string;
  size: string;
  color: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  is_active: boolean;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    brand_id: '',
    category_id: '',
    price: '',
    stock_quantity: '',
    size: '',
    color: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    is_active: true
  });

  const API_URL = 'http://localhost:3001/api';

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar produtos
      const fetchProducts = async () => {
        try {
          const response = await fetch(`${API_URL}/products`);
          if (response.ok) {
            const data = await response.json();
            return Array.isArray(data) ? data : [];
          }
          return [];
        } catch {
          return [];
        }
      };

      // Buscar marcas
      const fetchBrands = async () => {
        try {
          const response = await fetch(`${API_URL}/brands`);
          if (response.ok) {
            const data = await response.json();
            return Array.isArray(data) ? data : [];
          }
          return [];
        } catch {
          return [];
        }
      };

      // Buscar categorias
      const fetchCategories = async () => {
        try {
          const response = await fetch(`${API_URL}/categories`);
          if (response.ok) {
            const data = await response.json();
            return Array.isArray(data) ? data : [];
          }
          return [];
        } catch {
          return [];
        }
      };

      // Executar todas as chamadas em paralelo
      const [productsData, brandsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchBrands(),
        fetchCategories()
      ]);

      setProducts(productsData);
      setBrands(brandsData);
      setCategories(categoriesData);

    } catch (err) {
      setError('Erro ao carregar dados');
      setProducts([]);
      setBrands([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Resetar formulário
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      brand_id: '',
      category_id: '',
      price: '',
      stock_quantity: '',
      size: '',
      color: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      image5: '',
      is_active: true
    });
    setEditingProduct(null);
  };

  // Abrir modal para adicionar
  const handleAddProduct = () => {
    resetForm();
    setShowModal(true);
  };

  // Abrir modal para editar
  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      brand_id: product.brand_id.toString(),
      category_id: product.category_id.toString(),
      price: product.price.toString(),
      stock_quantity: product.stock_quantity.toString(),
      size: product.size || '',
      color: product.color || '',
      image1: product.image1 || '',
      image2: product.image2 || '',
      image3: product.image3 || '',
      image4: product.image4 || '',
      image5: product.image5 || '',
      is_active: product.is_active
    });
    setEditingProduct(product);
    setShowModal(true);
  };

  // Salvar produto (criar ou editar)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingProduct 
        ? `${API_URL}/products/${editingProduct.id}`
        : `${API_URL}/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        resetForm();
        fetchAllData(); // Recarregar lista
        
        alert(editingProduct ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
      } else {
        const error = await response.json();
        alert(`Erro: ${error.error || 'Erro desconhecido'}`);
      }
    } catch (error) {
      alert('Erro ao salvar produto');
      console.error('Erro:', error);
    }
  };

  // Deletar produto
  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Tem certeza que deseja deletar o produto "${product.name}"?`)) {
      try {
        const response = await fetch(`${API_URL}/products/${product.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchAllData(); // Recarregar lista
          alert('Produto deletado com sucesso!');
        } else {
          alert('Erro ao deletar produto');
        }
      } catch (error) {
        alert('Erro ao deletar produto');
        console.error('Erro:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <p className="mt-4 text-gray-600">Carregando produtos...</p>
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
        <h2 className="text-xl font-semibold text-gray-900">Gerenciar Produtos</h2>
        <button 
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Adicionar Produto
        </button>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{product.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.image1 ? (
                        <img 
                          src={product.image1} 
                          alt={product.name}
                          className="h-12 w-12 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMyNS41MjI5IDMwIDMwIDI1LjUyMjkgMzAgMjBDMzAgMTQuNDc3MSAyNS41MjI5IDEwIDIwIDEwQzE0LjQ3NzEgMTAgMTAgMTQuNDc3MSAxMCAyMEMxMCAyNS41MjI5IDE0LjQ3NzEgMzAgMjAgMzBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMCAyNUMyMi43NjE0IDI1IDI1IDIyLjc2MTQgMjUgMjBDMjUgMTcuMjM4NiAyMi43NjE0IDE1IDIwIDE1QzE3LjIzODYgMTUgMTUgMTcuMjM4NiAxNSAyMEMxNSAyMi43NjE0IDE3LjIzODYgMjUgMjAgMjVaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-500 text-xs">Sem img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      {product.size && <div className="text-sm text-gray-500">Tamanho: {product.size}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.brand?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      R$ {typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock_quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium">Nenhum produto encontrado</p>
                      <p className="text-sm mt-1">Comece adicionando seu primeiro produto</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {products.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          Total: {products.length} produto{products.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Modal de Adicionar/Editar Produto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingProduct ? 'Editar Produto' : 'Adicionar Produto'}
            </h3>
            
            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* Informações Básicas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Nome*</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Marca*</label>
                  <select
                    required
                    value={formData.brand_id}
                    onChange={(e) => setFormData({...formData, brand_id: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  >
                    <option value="">Selecione...</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoria*</label>
                  <select
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  >
                    <option value="">Selecione...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Preço*</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Estoque*</label>
                  <input
                    type="number"
                    required
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Tamanho</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                    placeholder="Ex: 42"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cor</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                    placeholder="Ex: Preto/Branco"
                  />
                </div>
              </div>

              {/* Seção de Imagens com Galeria Visual */}
              <div className="border-t pt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">📸 Galeria de Imagens</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Imagem {num} {num === 1 && '⭐ (Principal)'}
                      </label>
                      
                      {/* Preview da imagem */}
                      <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                        {formData[`image${num}` as keyof ProductFormData] ? (
                          <img 
                            src={formData[`image${num}` as keyof ProductFormData] as string}
                            alt={`Preview ${num}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              const parent = (e.target as HTMLImageElement).parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="text-center text-gray-500">
                                    <svg class="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <p class="text-sm">Imagem inválida</p>
                                  </div>
                                `;
                              }
                            }}
                          />
                        ) : (
                          <div className="text-center text-gray-400">
                            <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                            </svg>
                            <p className="text-sm">Adicionar imagem</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Input da URL */}
                      <input
                        type="url"
                        value={formData[`image${num}` as keyof ProductFormData] as string}
                        onChange={(e) => setFormData({
                          ...formData, 
                          [`image${num}`]: e.target.value
                        })}
                        placeholder="https://i.imgur.com/exemplo.jpg"
                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2"
                      />
                      
                      {/* Botão para limpar */}
                      {formData[`image${num}` as keyof ProductFormData] && (
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, [`image${num}`]: ''})}
                          className="w-full text-xs text-red-600 hover:text-red-800 py-1"
                        >
                          🗑️ Remover Imagem
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center pt-4">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">Produto Ativo</label>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  {editingProduct ? 'Atualizar Produto' : 'Criar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
