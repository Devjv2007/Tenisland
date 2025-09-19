import { Routes, Route } from 'react-router-dom';
import Header from './layout/header';
import Footer from './layout/footer';
import Home from './pages/home';
import Account from './pages/home'

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/account" element={<Account />} />

      </Routes>
      
      <Footer /> 
    </>
  );
}
export default App;
