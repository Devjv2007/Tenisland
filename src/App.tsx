import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import Footer from './layout/footer';
import Home from './pages/home';
import Account from './pages/account'
import Cart from './pages/cart'
import Sobre from './pages/sobre'
import ProductPage from './pages/productpage';
import AdminDashboard from './admin/AdminDashboard';
import BrandPage from './pages/brands'; // ✅ Nova importação
import CategoryPage from './pages/categories'; // ✅ Nova importação

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
     <Header/>
          <Sidebar 

          />

        

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/:brandName" element={<BrandPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/productpage" element={<ProductPage />} />
          </Routes>
      <Footer/>
    </>
  );
}

export default App;
