import React, { useContext } from 'react';
import {
  Container, Box, Typography, Button, IconButton,
  Paper, Grid, Divider, Chip, Tooltip,
} from '@mui/material';
import { Delete, BarChart, ShoppingCartOutlined, AddShoppingCart } from '@mui/icons-material';
import { ShopContext } from '../contexts/ShopContext';

// Поля для сравнения
const COMPARE_FIELDS = [
  { key: 'price',        label: 'Цена',         format: (v) => `${v?.toLocaleString()} ₽` },
  { key: 'material',     label: 'Материал',      format: (v) => v || '—' },
  { key: 'description',  label: 'Описание',      format: (v) => v || '—' },
  { key: 'categoryId',   label: 'Категория',     format: (v) => v || '—' },
];

// Подсвечиваем лучшую цену зелёным, худшую красным
const getBestPrice  = (products) => Math.min(...products.map(p => p.price));
const getWorstPrice = (products) => Math.max(...products.map(p => p.price));

export default function Comparison() {
  const { comparison, removeFromComparison, clearComparison, addToCart, getQuantity } = useContext(ShopContext);

  if (comparison.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <BarChart sx={{ fontSize: 80, color: '#ddd' }} />
        <Typography variant="h5" fontWeight={700} mt={3} color="text.secondary">
          Нет товаров для сравнения
        </Typography>
        <Typography color="text.secondary" mt={1} mb={4}>
          Добавьте товары нажав на иконку&nbsp;
          <BarChart sx={{ fontSize: 16, verticalAlign: 'middle' }} />&nbsp;
          на карточке товара
        </Typography>
        <Button variant="contained" href="/products">Перейти к товарам</Button>
      </Container>
    );
  }

  const bestPrice  = getBestPrice(comparison);
  const worstPrice = getWorstPrice(comparison);

  // Показываем только строки где значения отличаются (+ всегда цена)
  const diffOnly = false; // можно сделать кнопку "только отличия"

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          Сравнение товаров
          <Chip label={comparison.length} size="small" color="primary" sx={{ ml: 2, verticalAlign: 'middle' }} />
        </Typography>
        <Button
          startIcon={<Delete />} color="error" variant="outlined"
          onClick={clearComparison} size="small"
        >
          Очистить всё
        </Button>
      </Box>

      {/* Карточки товаров — верхний ряд */}
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: comparison.length * 220, display: 'grid', gridTemplateColumns: `200px repeat(${comparison.length}, 1fr)`, gap: 0 }}>

          {/* Пустая ячейка */}
          <Box />

          {comparison.map((product) => (
            <Paper key={product.id} variant="outlined" sx={{ p: 2, mx: 1, borderRadius: 2, position: 'relative', textAlign: 'center' }}>
              {/* Кнопка удаления */}
              <IconButton
                size="small"
                onClick={() => removeFromComparison(product.id)}
                sx={{ position: 'absolute', top: 6, right: 6 }}
              >
                <Delete fontSize="small" />
              </IconButton>

              {/* Картинка */}
              <Box
                component="img"
                src={product.images?.[0] || product.image}
                alt={product.name}
                sx={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 1, mb: 1 }}
              />

              <Typography fontWeight={600} fontSize="0.9rem" sx={{ mb: 1, lineHeight: 1.3 }}>
                {product.name}
              </Typography>

              <Typography
                fontWeight={700} fontSize="1.1rem"
                color={
                  comparison.length > 1 && product.price === bestPrice  ? 'success.main' :
                  comparison.length > 1 && product.price === worstPrice ? 'error.main' : 'text.primary'
                }
                sx={{ mb: 1.5 }}
              >
                {product.price?.toLocaleString()} ₽
                {comparison.length > 1 && product.price === bestPrice && (
                  <Chip label="Выгоднее" size="small" color="success" sx={{ ml: 1, fontSize: '10px' }} />
                )}
              </Typography>

              <Button
                fullWidth variant="contained" size="small"
                startIcon={<AddShoppingCart />}
                onClick={() => addToCart(product)}
                sx={{ fontSize: '0.75rem' }}
              >
                {getQuantity(product.id) > 0 ? `В корзине (${getQuantity(product.id)})` : 'В корзину'}
              </Button>
            </Paper>
          ))}

          <Divider sx={{ gridColumn: `1 / -1`, my: 2 }} />

          {/* Строки сравнения */}
          {COMPARE_FIELDS.map((field, fi) => (
            <React.Fragment key={field.key}>
              {/* Метка */}
              <Box sx={{
                display: 'flex', alignItems: 'center',
                bgcolor: fi % 2 === 0 ? '#f9f9f9' : '#fff',
                px: 2, py: 1.5, borderRadius: '6px 0 0 6px',
              }}>
                <Typography fontWeight={600} fontSize="0.85rem" color="text.secondary">
                  {field.label}
                </Typography>
              </Box>

              {/* Значения */}
              {comparison.map((product) => {
                const val = field.format(product[field.key]);
                return (
                  <Box key={product.id} sx={{
                    bgcolor: fi % 2 === 0 ? '#f9f9f9' : '#fff',
                    px: 2, py: 1.5, mx: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Typography fontSize="0.85rem" textAlign="center">
                      {field.key === 'price' ? (
                        <Box component="span" sx={{
                          fontWeight: 700,
                          color: comparison.length > 1 && product.price === bestPrice ? 'success.main' :
                                 comparison.length > 1 && product.price === worstPrice ? 'error.main' : 'inherit',
                        }}>
                          {val}
                        </Box>
                      ) : val}
                    </Typography>
                  </Box>
                );
              })}
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
