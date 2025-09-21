import { Routes, Route } from 'react-router-dom';
import Header from './layout/header';
import Footer from './layout/footer';
import Home from './pages/home';
import Account from './pages/account'
import Cart from './pages/cart'
import Sobre from './pages/sobre'
import ProductPage from './pages/productpage';
import Nike from './pages/nike'
import Asics from './pages/asics'
import Adidas from './pages/adidas'
import Jordan from './pages/jordan'
import AdminDashboard from './admin/AdminDashboard';





function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
         <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/nike" element={<Nike />} />
        <Route path="/asics" element={<Asics />} />
        <Route path="/adidas" element={<Adidas />} />
        <Route path="/jordan" element={<Jordan />} />

        
        <Route path="/productpage" element={<ProductPage />} />
      </Routes>
      
      <Footer /> 
    </>
  );
}
export default App;
