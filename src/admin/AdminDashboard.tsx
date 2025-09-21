import React, { useState, useEffect } from 'react';
import ProductManagement from '../components/ProductManagement';
import BrandManagement from '../components/BrandManagement';
import CategoryManagement from '../components/CategoryManagement';
import OrderManagement from '../components/OrderManagement';
import UserManagement from '../components/UserManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const tabs = [
    { id: 'products', name: 'Produtos' },
    { id: 'brands', name: 'Marcas' },
    { id: 'categories', name: 'Categorias' },
    { id: 'orders', name: 'Pedidos' },
    { id: 'users', name: 'Usuários' },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'brands':
        return <BrandManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return <ProductManagement />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin - Loja de Tênis</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Admin</span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="bg-white rounded-lg shadow-sm">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
