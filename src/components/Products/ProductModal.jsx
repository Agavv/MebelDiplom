import React, { useState, useContext } from 'react';
import { 
  Dialog, 
  DialogContent, 
  IconButton, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';
import { 
  Close, 
  ArrowBackIos, 
  ArrowForwardIos, 
  AddShoppingCart 
} from '@mui/icons-material';

import { ShopContext } from '../../contexts/ShopContext';

export default function ProductModal() {
  const { 
    selectedProduct, 
    closeProductModal, 
    addToCart, 
    toggleFavorite, 
    isFavorite 
  } = useContext(ShopContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const images = selectedProduct.images || [selectedProduct.image];
  const currentImage = images[currentImageIndex];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <Dialog 
      open={true} 
      onClose={closeProductModal} 
      maxWidth="lg" 
      fullWidth
    >
      <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
        
        <IconButton 
          onClick={closeProductModal} 
          sx={{ position: 'absolute', top: 15, right: 15, zIndex: 10, bgcolor: 'white' }}
        >
          <Close />
        </IconButton>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '85vh' }}>
          
          {/* === ГАЛЕРЕЯ === */}
          <Box sx={{ 
            flex: 1, 
            position: 'relative', 
            bgcolor: '#f8f8f8', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <img 
              src={currentImage} 
              alt={selectedProduct.name} 
              style={{ 
                maxHeight: '100%', 
                maxWidth: '100%', 
                objectFit: 'contain',
                cursor: 'zoom-in'
              }}
              onClick={() => window.open(currentImage, '_blank')}
            />

            {images.length > 1 && (
              <>
                <IconButton 
                  onClick={prevImage} 
                  sx={{ position: 'absolute', left: 20, bgcolor: 'white', boxShadow: 3 }}
                >
                  <ArrowBackIos />
                </IconButton>
                <IconButton 
                  onClick={nextImage} 
                  sx={{ position: 'absolute', right: 20, bgcolor: 'white', boxShadow: 3 }}
                >
                  <ArrowForwardIos />
                </IconButton>

                {/* Миниатюры снизу */}
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: 20, 
                  display: 'flex', 
                  gap: 1.5 
                }}>
                  {images.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 2,
                        border: idx === currentImageIndex ? '4px solid #f39c12' : '2px solid #ddd',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: idx === currentImageIndex ? 3 : 0
                      }}
                    >
                      <img 
                        src={img} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>

          {/* === ИНФОРМАЦИЯ О ТОВАРЕ === */}
          <Box sx={{ flex: 1, p: 5, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {selectedProduct.name}
            </Typography>
            
            <Typography variant="h5" color="#d32f2f" sx={{ mb: 3 }}>
              {selectedProduct.price.toLocaleString()} ₽
            </Typography>

            <Typography sx={{ color: '#555', mb: 2 }}>
              Материал: <strong>{selectedProduct.material}</strong>
            </Typography>

            <Typography sx={{ color: '#444', lineHeight: 1.7, mb: 4 }}>
              {selectedProduct.description}
            </Typography>

            <Box sx={{ mt: 'auto', display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                startIcon={<AddShoppingCart />}
                onClick={() => addToCart(selectedProduct)}
                sx={{ py: 1.5 }}
              >
                Добавить в корзину
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => toggleFavorite(selectedProduct)}
                sx={{ px: 3, minWidth: 'auto' }}
              >
                {isFavorite(selectedProduct.id) ? '❤️' : '♡'}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}