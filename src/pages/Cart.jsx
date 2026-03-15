import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { Typography, Box, Button, IconButton } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalItems } = useContext(ShopContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h4">Корзина пуста 🛒</Typography>
        <Button component={Link} to="/products" variant="contained" sx={{ mt: 3 }}>
          Перейти к покупкам
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <Typography variant="h3" sx={{ mb: 4 }}>Корзина ({totalItems})</Typography>

      {cart.map(item => (
        <Box key={item.id} sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 3, 
          mb: 3, 
          p: 3, 
          border: '1px solid #eee', 
          borderRadius: 2 
        }}>
          <img src={item.image || item.images?.[0]} alt={item.name} style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }} />

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography color="error" sx={{ fontWeight: 700 }}>
              {item.price.toLocaleString()} ₽
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <Remove />
            </IconButton>
            <Typography sx={{ minWidth: 30, textAlign: 'center', fontSize: '18px' }}>
              {item.quantity}
            </Typography>
            <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <Add />
            </IconButton>
          </Box>

          <IconButton color="error" onClick={() => removeFromCart(item.id)}>
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Box sx={{ mt: 5, textAlign: 'right' }}>
        <Typography variant="h5">Итого: {totalPrice.toLocaleString()} ₽</Typography>
        <Button variant="contained" size="large" sx={{ mt: 2 }}>
          Оформить заказ
        </Button>
      </Box>
    </Box>
  );
}