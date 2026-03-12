import React, { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import ProductCard from '../components/Products/ProductCard';
import { Typography, Box } from '@mui/material';

export default function Favorites() {
  const { favorites } = useContext(ShopContext);

  return (
    <Box sx={{ padding: '40px 20px', maxWidth: '1300px', margin: '0 auto' }}>
      <Typography variant="h3" sx={{ mb: 5, textAlign: 'center', fontWeight: 700 }}>
        Избранное ❤️ ({favorites.length})
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" sx={{ color: '#777', mb: 2 }}>
            Вы ещё ничего не добавили в избранное
          </Typography>
          <Typography variant="body1" sx={{ color: '#999' }}>
            Нажмите на сердечко на любом товаре
          </Typography>
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