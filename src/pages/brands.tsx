import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

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

export default function BrandPage() {
  const { brandName } = useParams<{ brandName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    if (brandName) {
      fetchProducts();
    }
  }, [brandName]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/products`);
      if (response.ok) {
        const allProducts = await response.json();
        
        // Filtrar produtos pela marca (comparando nome)
        const brandProducts = allProducts.filter((product: Product) => 
          product.brand?.name.toLowerCase() === brandName?.toLowerCase()
        );
        
        setProducts(brandProducts);
      } else {
        setError('Erro ao carregar produtos');
      }
    } catch (error) {
      setError('Erro de conexão');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-black text-xl">Carregando produtos {brandName}...</div>
        </div>
      </div>
    );
  }

  const brandDisplayName = brandName
    ? brandName.charAt(0).toUpperCase() + brandName.slice(1)
    : '';

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-black mb-4">
          {brandDisplayName}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-square mb-6">
                  <Link to={`/product/${product.id}`}>
                    {product.image1 ? (
                      <img 
                        src={product.image1} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-500">Sem imagem</span>
                      </div>
                    )}
                  </Link>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-black">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-black">
                      R$ {(Number(product.price) || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-black mb-4">
              Nenhum produto {brandDisplayName} encontrado
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
