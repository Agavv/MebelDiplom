import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setCart(savedCart);
    setFavorites(savedFavorites);
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

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

  return (
    <ShopContext.Provider value={{
      cart,
      favorites,
      addToCart,
      removeFromCart,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </ShopContext.Provider>
  );
};