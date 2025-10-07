import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

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

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);

  const { adicionarAosFavoritos, removerDosFavoritos, verificarSeFavorito, favorites } = useFavorites();

  const API_URL = 'http://localhost:3001/api';

  // Função para buscar o produto
  const fetchProduct = useCallback(async (productId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      if (!response.ok) {
        throw new Error('Produto não encontrado');
      }
      const data = await response.json();
      setProduct(data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar produto');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  // Atualiza isFavorite quando product ou favorites mudar
  useEffect(() => {
    if (product) {
      setIsFavorite(verificarSeFavorito(product.id));
    }
  }, [product, favorites]);

  const toggleFavorite = () => {
    if (!product) return;

    if (isFavorite) {
      removerDosFavoritos(product.id);
    } else {
      adicionarAosFavoritos({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image1 || product.image2 || product.image3 || '',
        brand: product.brand?.name,
        category: product.category?.name,
      });
    }
  };

  const getAllImages = (product: Product): string[] => {
    return [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
      product.image5,
    ].filter(Boolean) as string[];
  };

  const availableSizes = ['38', '39', '40', '41', '42', '43', '44', '45'];

  const handleAddToCart = () => {
    console.log('Adicionado ao carrinho:', {
      product,
      quantity,
      selectedSize,
    });
    alert(`${product?.name} adicionado ao carrinho!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-xl">Carregando produto...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Produto não encontrado
          </h2>
          <p className="text-white mb-6">{error}</p>
          <Link
            to="/nike"
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  const images = getAllImages(product);

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Galeria de Imagens */}
          <div className="relative space-y-6">
            
            {/* Imagem Principal */}
            <div className="aspect-square rounded-lg overflow-hidden relative">
              <div
                className="flex h-full w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
              >
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ))}
              </div>

              {/* Botão de Favorito */}
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 z-20 group shadow-lg"
              >
                <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-700'} text-2xl group-hover:scale-110 transition-transform duration-200`}></i>
              </button>

              {/* Botões de Navegação */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedIndex(
                        selectedIndex === 0
                          ? images.length - 1
                          : selectedIndex - 1
                      )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-70 text-black p-3 rounded-full transition-all duration-200 z-10 group"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() =>
                      setSelectedIndex((selectedIndex + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-70 text-black p-3 rounded-full transition-all duration-200 z-10 group"
                  >
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Descrição do Produto */}
            {product.description && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-black mb-3">Descrição</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-black mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  R$ {(Number(product.price) || 0).toFixed(2)}
                </span>

                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock_quantity === 0
                      ? 'bg-red-100 text-red-800'
                      : product.stock_quantity < 5
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {product.stock_quantity === 0
                    ? 'Esgotado'
                    : product.stock_quantity < 5
                    ? `Restam ${product.stock_quantity}`
                    : 'Em estoque'}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-black mb-4">
                Especificações
              </h3>
              <div className="space-y-3 text-gray-700">
                {product.color && (
                  <div className="flex justify-between">
                    <span>Cor:</span>
                    <span className="font-medium text-black">{product.color}</span>
                  </div>
                )}
                {product.size && (
                  <div className="flex justify-between">
                    <span>Tamanho:</span>
                    <span className="font-medium text-black">{product.size}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Marca:</span>
                  <span className="font-medium text-black">
                    {product.brand?.name || 'Não informado'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Categoria:</span>
                  <span className="font-medium text-black">
                    {product.category?.name || 'Não informado'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">
                Tamanho
              </h3>
              <div className="grid grid-cols-4 gap-3">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border-2 rounded-lg text-center font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-black hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-black mb-4">
                Quantidade
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-200 text-black rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-bold text-black w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(
                      Math.min(product.stock_quantity, quantity + 1)
                    )
                  }
                  className="w-12 h-12 bg-gray-200 text-black rounded-lg font-bold hover:bg-gray-300 transition-colors"
                  disabled={quantity >= product.stock_quantity}
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                  product.stock_quantity === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {product.stock_quantity === 0
                  ? 'Produto Esgotado'
                  : 'Adicionar ao Carrinho'}
              </button>

              <button className="w-full py-4 border-2 border-black text-black rounded-lg font-bold text-lg hover:bg-black hover:text-white transition-colors">
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
