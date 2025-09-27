import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface Brand {
  id: number;
  name: string;
  slug?: string;
}

interface Category {
  id: number;
  name: string;
  slug?: string;
}

// Componente Tooltip que usa Portal
const Tooltip = ({ 
  children, 
  isVisible, 
  position 
}: { 
  children: React.ReactNode, 
  isVisible: boolean,
  position: { x: number, y: number }
}) => {
  if (!isVisible) return null;

  return createPortal(
    <div 
      className="fixed bg-white border border-gray-200 rounded-xl shadow-2xl z-[99999] w-52"
      style={{
        left: position.x,
        top: position.y,
        animation: isVisible ? 'fadeIn 0.2s ease-out' : 'fadeOut 0.2s ease-out'
      }}
    >
      {children}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(8px); }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default function Sidebar() {
  const location = useLocation();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandsTooltip, setBrandsTooltip] = useState({ visible: false, x: 0, y: 0 });
  const [categoriesToolTip, setCategoriesToolTip] = useState({ visible: false, x: 0, y: 0 });
  
  // Refs para controlar os timeouts
  const brandsTimeoutRef = useRef<number | null>(null);
  const categoriesTimeoutRef = useRef<number | null>(null);

  const API_URL = 'http://localhost:3001/api';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const brandsResponse = await fetch(`${API_URL}/brands`);
      if (brandsResponse.ok) {
        const brandsData = await brandsResponse.json();
        setBrands(brandsData);
      }

      const categoriesResponse = await fetch(`${API_URL}/categories`);
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseEnter = (type: 'brands' | 'categories', event: React.MouseEvent) => {
    // Limpar timeout existente
    if (type === 'brands' && brandsTimeoutRef.current) {
      clearTimeout(brandsTimeoutRef.current);
    }
    if (type === 'categories' && categoriesTimeoutRef.current) {
      clearTimeout(categoriesTimeoutRef.current);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.right + 8; // Menor gap para facilitar movimento do mouse
    const y = rect.top;

    if (type === 'brands') {
      setBrandsTooltip({ visible: true, x, y });
    } else {
      setCategoriesToolTip({ visible: true, x, y });
    }
  };

  const handleMouseLeave = (type: 'brands' | 'categories') => {
    // Delay antes de fechar o tooltip
    if (type === 'brands') {
      brandsTimeoutRef.current = setTimeout(() => {
        setBrandsTooltip({ visible: false, x: 0, y: 0 });
      }, 300); // 300ms de delay
    } else {
      categoriesTimeoutRef.current = setTimeout(() => {
        setCategoriesToolTip({ visible: false, x: 0, y: 0 });
      }, 300);
    }
  };

  const handleTooltipMouseEnter = (type: 'brands' | 'categories') => {
    // Cancelar o fechamento quando mouse entra no tooltip
    if (type === 'brands' && brandsTimeoutRef.current) {
      clearTimeout(brandsTimeoutRef.current);
    }
    if (type === 'categories' && categoriesTimeoutRef.current) {
      clearTimeout(categoriesTimeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = (type: 'brands' | 'categories') => {
    // Fechar imediatamente quando sai do tooltip
    if (type === 'brands') {
      setBrandsTooltip({ visible: false, x: 0, y: 0 });
    } else {
      setCategoriesToolTip({ visible: false, x: 0, y: 0 });
    }
  };

  return (
    <>
      <div className="fixed top-20 h-[calc(100vh-4rem)] w-16  shadow-sm z-[9999] overflow-y-auto">
        
        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
          </div>
        )}

        {/* Ícones da Sidebar */}
        {!loading && (
          <nav className="py-4">
            
            {/* Ícone Marcas */}
            <div className="mb-4">
              <div 
                className="flex items-center justify-center w-16 h-16 text-gray-600 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer rounded-lg mx-2"
                onMouseEnter={(e) => handleMouseEnter('brands', e)}
                onMouseLeave={() => handleMouseLeave('brands')}
              >
                <i className="ri-price-tag-3-line text-xl"></i>
              </div>
            </div>

            {/* Ícone Categorias */}
            <div className="mb-4">
              <div 
                className="flex items-center justify-center w-16 h-16 text-gray-600 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer rounded-lg mx-2"
                onMouseEnter={(e) => handleMouseEnter('categories', e)}
                onMouseLeave={() => handleMouseLeave('categories')}
              >
                <i className="ri-grid-line text-xl"></i>
              </div>
            </div>

          </nav>
        )}
      </div>

      {/* Tooltip das Marcas */}
      <Tooltip 
        isVisible={brandsTooltip.visible} 
        position={{ x: brandsTooltip.x, y: brandsTooltip.y }}
      >
        <div 
          onMouseEnter={() => handleTooltipMouseEnter('brands')}
          onMouseLeave={() => handleTooltipMouseLeave('brands')}
        >
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <i className="ri-price-tag-3-line text-sm text-gray-600"></i>
              <h3 className="font-semibold text-gray-900 text-sm">Marcas</h3>
            </div>
          </div>

        <div className="py-2 max-h-64 overflow-y-auto">
          {brands.length > 0 ? (
            brands.map((brand) => {
              const brandPath = `/${brand.name.toLowerCase()}`; // ✅ Nike → /nike
              const isActive = location.pathname === brandPath;
              
              return (
                <Link
                  key={brand.id}
                  to={brandPath}
                  className={`block px-4 py-3 text-sm transition-all duration-200 hover:translate-x-1 ${
                    isActive 
                      ? 'bg-black text-white font-medium border-l-4 border-l-white' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-black hover:border-l-4 hover:border-l-black'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{brand.name}</span>
                    <i className="ri-arrow-right-s-line text-xs opacity-50"></i>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500 italic">Nenhuma marca encontrada</p>
          )}
          </div>
        </div>
      </Tooltip>

      {/* Tooltip das Categorias */}
      <Tooltip 
        isVisible={categoriesToolTip.visible} 
        position={{ x: categoriesToolTip.x, y: categoriesToolTip.y }}
      >
        <div 
          onMouseEnter={() => handleTooltipMouseEnter('categories')}
          onMouseLeave={() => handleTooltipMouseLeave('categories')}
        >
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <i className="ri-grid-line text-sm text-gray-600"></i>
              <h3 className="font-semibold text-gray-900 text-sm">Categorias</h3>
            </div>
          </div>

          <div className="py-2 max-h-64 overflow-y-auto">
            {categories.length > 0 ? (
  categories.map((category) => {
    const categoryPath = `/category/${category.name.toLowerCase()}`;
    const isActive = location.pathname === categoryPath;
    
    return (
      <Link
        key={category.id}
        to={categoryPath} // ✅ Novo link dinâmico
        className={`block px-4 py-3 text-sm transition-all duration-200 hover:translate-x-1 ${
          isActive 
            ? 'bg-black text-white font-medium border-l-4 border-l-white' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-black hover:border-l-4 hover:border-l-black'
        }`}
      >
        <div className="flex items-center justify-between">
          <span>{category.name}</span>
          <i className="ri-arrow-right-s-line text-xs opacity-50"></i>
        </div>
      </Link>
                );
              })
            ) : (
              <p className="px-4 py-3 text-sm text-gray-500 italic">Nenhuma categoria encontrada</p>
            )}
          </div>
        </div>
      </Tooltip>
    </>
  );
}
