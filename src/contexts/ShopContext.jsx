import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

const MAX_COMPARE = 4; // максимум товаров для сравнения

export const ShopProvider = ({ children }) => {
  const [cart,           setCart]           = useState([]);
  const [favorites,      setFavorites]      = useState([]);
  const [comparison,     setComparison]     = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Загрузка из localStorage
  useEffect(() => {
    setCart(       JSON.parse(localStorage.getItem('cart')       || '[]'));
    setFavorites(  JSON.parse(localStorage.getItem('favorites')  || '[]'));
    setComparison( JSON.parse(localStorage.getItem('comparison') || '[]'));
  }, []);

  useEffect(() => { localStorage.setItem('cart',       JSON.stringify(cart));       }, [cart]);
  useEffect(() => { localStorage.setItem('favorites',  JSON.stringify(favorites));  }, [favorites]);
  useEffect(() => { localStorage.setItem('comparison', JSON.stringify(comparison)); }, [comparison]);

  // === КОРЗИНА ===
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const updateQuantity = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const getQuantity    = (id) => cart.find(i => i.id === id)?.quantity || 0;

  // === ИЗБРАННОЕ ===
  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(i => i.id === product.id);
      return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  };
  const isFavorite = (id) => favorites.some(i => i.id === id);

  // === СРАВНЕНИЕ ===
  const addToComparison = (product) => {
    setComparison(prev => {
      if (prev.some(i => i.id === product.id)) return prev;
      if (prev.length >= MAX_COMPARE) {
        // убираем первый и добавляем новый
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };
  const removeFromComparison = (id) => setComparison(prev => prev.filter(i => i.id !== id));
  const clearComparison       = ()   => setComparison([]);
  const isInComparison        = (id) => comparison.some(i => i.id === id);
  const toggleComparison      = (product) => {
    if (isInComparison(product.id)) removeFromComparison(product.id);
    else addToComparison(product);
  };

  // === МОДАЛКА ===
  const openProductModal  = (product) => setSelectedProduct(product);
  const closeProductModal = ()        => setSelectedProduct(null);

  return (
    <ShopContext.Provider value={{
      cart, favorites, comparison,
      addToCart, updateQuantity, removeFromCart, getQuantity,
      toggleFavorite, isFavorite,
      toggleComparison, isInComparison, removeFromComparison, clearComparison,
      selectedProduct, openProductModal, closeProductModal,
      totalItems: cart.reduce((s, i) => s + i.quantity, 0),
    }}>
      {children}
    </ShopContext.Provider>
  );
};
