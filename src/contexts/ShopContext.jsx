import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Загрузка из localStorage один раз при старте
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setCart(savedCart);
    setFavorites(savedFavorites);
  }, []);

  // Сохранение в localStorage
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);

  // === КОРЗИНА ===
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const getQuantity = (id) => cart.find(item => item.id === id)?.quantity || 0;

  // === ИЗБРАННОЕ (полностью рабочее) ===
  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (id) => favorites.some(item => item.id === id);

  // === МОДАЛКА ===
  const openProductModal = (product) => setSelectedProduct(product);
  const closeProductModal = () => setSelectedProduct(null);

  return (
    <ShopContext.Provider value={{
      cart,
      favorites,
      addToCart,
      updateQuantity,
      removeFromCart,
      getQuantity,
      toggleFavorite,
      isFavorite,
      selectedProduct,
      openProductModal,
      closeProductModal,
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0)
    }}>
      {children}
    </ShopContext.Provider>
  );
};