import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { ShopProvider } from './contexts/ShopContext';
import News from './pages/News';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';
import FAQ from './pages/FAQ';
import Certificates from './pages/Certificates';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Comparison from './pages/Comparison';
import Contacts from './pages/Contacts';
import Catalog from './pages/Catalog';
import Warranty from './pages/Warranty';
import Products from './pages/Products';
import ProductModal from './components/Products/ProductModal';   // ← добавь импорт
import ProductCard from './components/Products/ProductCard';

function App() {
  return (
    <Router>
      <ShopProvider>    
        <Header />
        <Routes>
          <Route path="/" element={<Catalog/>}/>
          <Route path="/news" element={<News />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/catalog" element={<Catalog/>} />
          <Route path="/warranty" element={<Warranty/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/products" element={<Products />} /> 
        </Routes>
        <ProductModal />
      </ShopProvider>
    </Router>
    
  );
}

export default App;