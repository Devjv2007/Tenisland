import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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

export default function Asics() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    console.log('🚀 Asics component montado, iniciando busca...');
    fetchAsicsProducts();
  }, []);

  const fetchAsicsProducts = async () => {
    try {

      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/products`);


      
      if (response.ok) {
        const allProducts = await response.json();

        
        // Filtrar produtos Asics
        const AsicsProducts = allProducts.filter((p: Product) => 
          p.brand?.name.toLowerCase() === 'Asics'
        );
        

        setProducts(AsicsProducts);
      } else {

        setError(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {

      setError(`Erro de conexão: ${error}`);
    } finally {

      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-black text-xl mb-4">Carregando produtos Asics...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-md">
          <h3 className="text-black text-xl font-bold mb-4">Erro ao Carregar</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={fetchAsicsProducts}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 font-medium"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
      
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white py-10">
        <div className="text-center">
          
          <h1 className="text-6xl font-bold text-black mb-30">Asics Air</h1>
       </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => {
  return (
    <div key={product.id} className="group cursor-pointer">
     
      {/* Container da Imagem */}
      <div className="relative aspect-square mb-6">
          <Link to={`/product/${product.id}`}>
        {/* Badge de Estoque */}
        {product.stock_quantity < 5 && product.stock_quantity > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-600 text-black text-xs px-2 py-1 rounded font-medium">
              Últimas {product.stock_quantity}
            </span>
          </div>
        )}
       
    
     
          {product.image1 ? (
            <img 
              src={product.image1} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-100" // ← opacity-100 garante visibilidade
              onError={(e) => {
                console.log('❌ Erro ao carregar imagem:', product.image1);
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEMyNS41MjI5IDMwIDMwIDI1LjUyMjkgMzAgMjBDMzAgMTQuNDc3MSAyNS41MjI5IDEwIDIwIDEwQzE0LjQ3NzEgMTAgMTAgMTQuNDc3MSAxMCAyMEMxMCAyNS41MjI5IDE0LjQ3NzEgMzAgMjAgMzBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMCAyNUMyMi43NjE0IDI1IDI1IDIyLjc2MTQgMjUgMjBDMjUgMTcuMjM4NiAyMi43NjE0IDE1IDIwIDE1QzE3LjIzODYgMTUgMTUgMTcuMjM4NiAxNSAyMEMxNUmCAyMjcuNjE0IDE3LjIzODYgMjUgMjAgMjVaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=';
              }}
              onLoad={() => {
                console.log('✅ Imagem carregada com sucesso:', product.image1);
              }}
            />
          ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center text-gray-500">
              <svg className="mx-auto h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Sem imagem</p>
              
            </div>
          </div>
        )}
        </Link>
      </div>

                    {/* Informações do Produto */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium text-black group-hover:text-gray-300 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center space-x-3 text-sm text-gray-400">
                        {product.category?.name && (
                          <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-medium border border-gray-700">
                            {product.category.name}
                          </span>
                        )}
                        {product.size && <span>Tam: {product.size}</span>}
                        {product.color && <span>{product.color}</span>}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-black">
                          R$ {(Number(product.price) || 0).toFixed(2)}
                        </span>
                        
                        {product.stock_quantity === 0 ? (
                          <span className="text-sm text-red-400 font-medium">
                            Esgotado
                          </span>
                        ) : product.stock_quantity < 5 ? (
                          <span className="text-sm text-yellow-400 font-medium">
                            Últimas unidades
                          </span>
                        ) : (
                          <span className="text-sm text-green-400 font-medium">
                            Disponível
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium text-black mb-4">
                Nenhum produto Asics encontrado
              </h3>
              <p className="text-gray-400 mb-6">
                Não há produtos da marca Asics cadastrados ou o backend não está respondendo.
              </p>
              <button 
                onClick={fetchAsicsProducts}
                className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-medium"
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
