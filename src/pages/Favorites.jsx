import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import ProductCard from '../components/Products/ProductCard';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const { favorites } = useContext(ShopContext);

  return (
    <Box sx={{ padding: '40px 20px', maxWidth: '1300px', margin: '0 auto' }}>
      <Typography variant="h3" sx={{ mb: 5, textAlign: 'center', fontWeight: 700 }}>
        Избранное ❤️ ({favorites.length})
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" sx={{ color: '#777' }}>
            Пока ничего не добавлено
          </Typography>
          <Button component={Link} to="/products" variant="contained" sx={{ mt: 3 }}>
            Перейти в каталог
          </Button>
        </Box>
      ) : (
        <div className="products-grid">
          {favorites.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </Box>
  );
}