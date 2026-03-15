import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ShopProvider } from './contexts/ShopContext';
import { AuthProvider } from './contexts/AuthContext';
import ProductModal from './components/Products/ProductModal';

import Catalog      from './pages/Catalog';
import Products     from './pages/Products';
import Cart         from './pages/Cart';
import Profile      from './pages/Profile';
import Favorites    from './pages/Favorites';
import Comparison   from './pages/Comparison';
import News         from './pages/News';
import Delivery     from './pages/Delivery';
import Payment      from './pages/Payment';
import FAQ          from './pages/FAQ';
import Certificates from './pages/Certificates';
import Warranty     from './pages/Warranty';
import Contacts     from './pages/Contacts';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ShopProvider>
          {/* Flex-колонка чтобы Footer прижимался к низу */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />

            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/"             element={<Catalog />} />
                <Route path="/catalog"      element={<Catalog />} />
                <Route path="/products"     element={<Products />} />
                <Route path="/cart"         element={<Cart />} />
                <Route path="/profile"      element={<Profile />} />
                <Route path="/favorites"    element={<Favorites />} />
                <Route path="/comparison"   element={<Comparison />} />
                <Route path="/news"         element={<News />} />
                <Route path="/delivery"     element={<Delivery />} />
                <Route path="/payment"      element={<Payment />} />
                <Route path="/faq"          element={<FAQ />} />
                <Route path="/certificates" element={<Certificates />} />
                <Route path="/warranty"     element={<Warranty />} />
                <Route path="/contacts"     element={<Contacts />} />
              </Routes>
            </main>

            <Footer />
          </div>

          <ProductModal />
        </ShopProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
