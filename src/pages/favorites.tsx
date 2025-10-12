import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, removerDosFavoritos } = useFavorites();
  const { adicionarAoCarrinho } = useCart();

  const handleAddToCart = (item: any) => {
    adicionarAoCarrinho({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image1,
      quantity: 1,
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center animate-[fadeIn_0.5s_ease-out]">
            <i className="ri-heart-line text-gray-300 text-8xl block mb-4"></i>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos aos favoritos para vê-los aqui!
            </p>
            <Link
              to="/home"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              <i className="ri-arrow-left-line"></i>
              Explorar produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Meus Favoritos</h1>
            <p className="text-gray-600 mt-1">
              {favorites.length} {favorites.length === 1 ? 'produto' : 'produtos'} salvos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.product.image1 || 'https://via.placeholder.com/400'}
                  alt={item.product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
                  }}
                />

                <button
                  onClick={() => removerDosFavoritos(item.product_id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-10"
                >
                  <i className="ri-heart-fill text-red-500 text-xl"></i>
                </button>

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    <i className="ri-eye-line"></i>
                    Ver detalhes
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 truncate">
                  {item.product.name}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  {item.product.brand && (
                    <span className="flex items-center gap-1">
                      <i className="ri-store-2-line"></i>
                      {item.product.brand.name}
                    </span>
                  )}
                  {item.product.category && (
                    <span className="flex items-center gap-1">
                      <i className="ri-layout-grid-line"></i>
                      {item.product.category.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800">
                    R$ {Number(item.product.price).toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm"
                  >
                    <i className="ri-shopping-cart-line"></i>
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
