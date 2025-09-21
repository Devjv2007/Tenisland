import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  size?: string;
  color?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  brand?: { name: string };
  category?: { name: string };
}

export default function Nike() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    console.log('🚀 Nike component montado, iniciando busca...');
    fetchNikeProducts();
  }, []);

  const fetchNikeProducts = async () => {
    try {
      console.log('📡 Fazendo requisição para:', `${API_URL}/products`);
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/products`);
      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);
      
      if (response.ok) {
        const allProducts = await response.json();
        console.log('📦 Todos os produtos:', allProducts);
        console.log('📊 Total de produtos:', allProducts.length);
        
        // Filtrar produtos Nike
        const nikeProducts = allProducts.filter((p: Product) => 
          p.brand?.name.toLowerCase() === 'nike'
        );
        
        console.log('👟 Produtos Nike encontrados:', nikeProducts);
        console.log('👟 Total produtos Nike:', nikeProducts.length);
        
        setProducts(nikeProducts);
      } else {
        console.error('❌ Erro na resposta da API:', response.status);
        setError(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar produtos Nike:', error);
      setError(`Erro de conexão: ${error}`);
    } finally {
      console.log('✅ Finalizando busca...');
      setLoading(false);
    }
  };

  // Obter primeira imagem disponível
  const getProductImage = (product: Product) => {
    return product.image1 || product.image2 || product.image3 || product.image4 || product.image5;
  };

  console.log('🔄 Render - Loading:', loading, 'Products:', products.length, 'Error:', error);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-900 text-xl mb-4">Carregando produtos Nike...</div>
          <div className="text-gray-600 text-sm">Conectando com {API_URL}/products</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <h3 className="text-red-900 text-xl font-bold mb-4">Erro ao Carregar</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={fetchNikeProducts}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">NIKE</h1>
          <p className="text-xl text-gray-600">Just Do It</p>
          <p className="text-lg text-gray-500 mt-2">
            {products.length} produto{products.length !== 1 ? 's' : ''} disponível{products.length !== 1 ? 'is' : ''}
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  {/* Container da Imagem */}
                  <div className="relative aspect-square mb-6 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                    {/* Badge de Estoque */}
                    {product.stock_quantity < 5 && product.stock_quantity > 0 && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
                          Últimas {product.stock_quantity}
                        </span>
                      </div>
                    )}
                    
                    {/* Imagem Principal */}
                    {getProductImage(product) ? (
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjlGQUZCIi8+CjxwYXRoIGQ9Ik0yMDAgMzAwQzI1NS4yMjggMzAwIDMwMCAyNTUuMjI4IDMwMCAyMDBDMzAwIDE0NC43NzIgMjU1LjIyOCAxMDAgMjAwIDEwMEMxNDQuNzcyIDEwMCAxMDAgMTQ0Ljc3MiAxMDAgMjAwQzEwMCAyNTUuMjI4IDE0NC43NzIgMzAwIDIwMCAzMDBaIiBzdHJva2U9IiNEMUQ1REIiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMDAgMjUwQzIyNy42MTQgMjUwIDI1MCAyMjcuNjE0IDI1MCAyMDBDMjUwIDE3Mi4zODYgMjI3LjYxNCAxNTAgMjAwIDE1MEMxNzIuMzg2IDE1MCAxNTAgMTcyLjM4NiAxNTAgMjAwQzE1MCAyMjcuNjE0IDE3Mi4zODYgMjUwIDIwMCAyNTBaIiBzdHJva2U9IiNEMUQ1REIiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <div className="text-center text-gray-400">
                          <svg className="mx-auto h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">Sem imagem</p>
                        </div>
                      </div>
                    )}

                    {/* Overlay com botão */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg">
                          Ver Produto
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Informações do Produto */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      {product.category?.name && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {product.category.name}
                        </span>
                      )}
                      {product.size && <span>Tam: {product.size}</span>}
                      {product.color && <span>{product.color}</span>}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        R$ {product.price.toFixed(2)}
                      </span>
                      
                      {product.stock_quantity === 0 ? (
                        <span className="text-sm text-red-600 font-medium">
                          Esgotado
                        </span>
                      ) : product.stock_quantity < 5 ? (
                        <span className="text-sm text-orange-600 font-medium">
                          Últimas unidades
                        </span>
                      ) : (
                        <span className="text-sm text-green-600 font-medium">
                          Disponível
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                Nenhum produto Nike encontrado
              </h3>
              <p className="text-gray-500">
                Não há produtos da marca Nike cadastrados ou o backend não está respondendo.
              </p>
              <button 
                onClick={fetchNikeProducts}
                className="mt-4 bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
