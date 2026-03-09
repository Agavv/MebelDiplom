import React from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
      <ShoppingCartOutlined sx={{ fontSize: 100, color: '#eee', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        Ваша корзина пуста
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Но это легко исправить! Загляните в каталог, там много интересного.
      </Typography>
      <Button 
        component={Link} 
        to="/catalog" 
        variant="contained" 
        sx={{ bgcolor: '#ff6b00', '&:hover': { bgcolor: '#e65100' }, px: 4, py: 1.5, borderRadius: 2 }}
      >
        Перейти в каталог
      </Button>
    </Container>
  );
}