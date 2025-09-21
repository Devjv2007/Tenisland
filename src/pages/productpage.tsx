import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/products/${productId}`);
      
      if (response.ok) {
        const productData = await response.json();
        setProduct(productData);
        
        // Definir primeira imagem como selecionada
        const firstImage = productData.image1 || productData.image2 || productData.image3;
        if (firstImage) {
          setSelectedImage(firstImage);
        }
      } else {
        setError('Produto não encontrado');
      }
    } catch (error) {
      setError('Erro ao carregar produto');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  // Obter todas as imagens disponíveis
  const getAllImages = (product: Product): string[] => {
    return [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
      product.image5
    ].filter(Boolean) as string[];
  };

  // Tamanhos disponíveis (mockado - você pode puxar da API)
  const availableSizes = ['38', '39', '40', '41', '42', '43', '44', '45'];

  const handleAddToCart = () => {
    // Implementar lógica do carrinho
    console.log('Adicionado ao carrinho:', {
      product,
      quantity,
      selectedSize
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
          <h2 className="text-2xl font-bold text-white mb-4">Produto não encontrado</h2>
          <p className="text-gray-400 mb-6">{error}</p>
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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Galeria de Imagens */}
          <div className="space-y-6">
            {/* Imagem Principal */}
            <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="mx-auto h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Sem imagem</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === image 
                        ? 'border-white' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover "
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-2">
                {product.brand?.name && (
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                    {product.brand.name}
                  </span>
                )}
                {product.category?.name && (
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category.name}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-white">
                  R$ {(Number(product.price) || 0).toFixed(2)}
                </span>
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock_quantity === 0 
                    ? 'bg-red-900 text-red-300' 
                    : product.stock_quantity < 5 
                    ? 'bg-yellow-900 text-yellow-300' 
                    : 'bg-green-900 text-green-300'
                }`}>
                  {product.stock_quantity === 0 
                    ? 'Esgotado' 
                    : product.stock_quantity < 5 
                    ? `Restam ${product.stock_quantity}` 
                    : 'Em estoque'
                  }
                </div>
              </div>
            </div>

            {/* Descrição */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Descrição</h3>
                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Especificações */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Especificações</h3>
              <div className="space-y-2 text-gray-300">
                {product.color && (
                  <div className="flex justify-between">
                    <span>Cor:</span>
                    <span className="font-medium">{product.color}</span>
                  </div>
                )}
                {product.size && (
                  <div className="flex justify-between">
                    <span>Tamanho:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Marca:</span>
                  <span className="font-medium">{product.brand?.name || 'Não informado'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Categoria:</span>
                  <span className="font-medium">{product.category?.name || 'Não informado'}</span>
                </div>
              </div>
            </div>

            {/* Seleção de Tamanho */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tamanho</h3>
              <div className="grid grid-cols-4 gap-3">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border-2 rounded-lg text-center font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-gray-600 text-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantidade */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Quantidade</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-bold text-white w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  className="w-12 h-12 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors"
                  disabled={quantity >= product.stock_quantity}
                >
                  +
                </button>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
                  product.stock_quantity === 0
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {product.stock_quantity === 0 ? 'Produto Esgotado' : 'Adicionar ao Carrinho'}
              </button>

              <button className="w-full py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-black transition-colors">
                Comprar Agora
              </button>
            </div>

            {/* Informações de Entrega */}
            <div className="border-t border-gray-800 pt-6">
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Frete grátis para compras acima de R$ 299</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Garantia de 1 ano</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>30 dias para troca e devolução</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
