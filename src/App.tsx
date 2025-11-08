import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Header from './layout/header';
import Sidebar from './layout/sidebar';
import Footer from './layout/footer';
import Home from './pages/home';
import Account from './pages/account'
import Cart from './pages/cart'
import Sobre from './pages/sobre'
import Favorites from './pages/favorites'
import ProductPage from './pages/productpage';
import AdminDashboard from './admin/AdminDashboard';
import BrandPage from './pages/brands';
import CategoryPage from './pages/categories';
import LandingPage from './pages/landingpage';


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <>
      <Header />
      <Sidebar />

      {/* ✅ Container principal com margem esquerda */}
      <main className="-my-64 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/:brandName" element={<BrandPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/productpage" element={<ProductPage />} />
          <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}


export default App;
