import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Grid, Card, CardActionArea,
  CardMedia, CardContent, Button, Paper, Stack, Skeleton,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Sidebar from '../components/Sidebar/Sidebar';
import ProductCard from '../components/Products/ProductCard';
import { getProducts } from '../services/api';

// Данные категорий для главной плитки
const CATEGORY_TILES = [
  { id: 1,   label: 'Комоды и тумбы',     image: '/src/assets/images/KomodAndTumba.jpg',      from: '6 900 ₽' },
  { id: 2,   label: 'Мебель для детской', image: '/src/assets/images/detskayKomnata1.jpg',    from: '5 400 ₽' },
  { id: 3,   label: 'Мебель для кухни',   image: '/src/assets/images/detskayKomnata2.jpg',    from: '12 900 ₽' },
  { id: 4,   label: 'Мебель для офиса',   image: '/src/assets/images/divanTkaneviySeriy.jpg', from: '9 900 ₽' },
];

function CategoryTile({ id, label, image, from }) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ borderRadius: 3, overflow: 'hidden', height: '100%', cursor: 'pointer',
            transition: 'transform 0.25s, box-shadow 0.25s',
            '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 } }}
      onClick={() => navigate(`/products?category=${id}`)}
    >
      <CardActionArea sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={label}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight={700}>{label}</Typography>
          <Typography variant="body2" color="text.secondary">от {from}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Catalog() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    getProducts({ limit: 8 })
      .then((data) => setFeatured(data.items ?? data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Sidebar />

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Баннер */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            color: 'white',
            py: 8,
            px: 6,
          }}
        >
          <Typography variant="h3" fontWeight={800} mb={2}>
            Мебель для вашего дома
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, mb: 4, maxWidth: 480 }}>
            Более 500 изделий собственного производства. Гарантия качества и доставка по России.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/products')}
              sx={{ bgcolor: '#F5D066', color: '#333', fontWeight: 700,
                    '&:hover': { bgcolor: '#e5c056' }, px: 4 }}
            >
              Смотреть каталог
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contacts')}
              sx={{ borderColor: 'white', color: 'white',
                    '&:hover': { borderColor: '#F5D066', color: '#F5D066' } }}
            >
              Заказать звонок
            </Button>
          </Stack>
        </Box>

        <Container maxWidth="xl" sx={{ py: 6 }}>

          {/* Категории */}
          <Typography variant="h5" fontWeight={700} mb={3}>Категории</Typography>
          <Grid container spacing={3} mb={6}>
            {CATEGORY_TILES.map((cat) => (
              <Grid item key={cat.id} xs={12} sm={6} md={3}>
                <CategoryTile {...cat} />
              </Grid>
            ))}
          </Grid>

          {/* Популярные товары */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>Популярные товары</Typography>
            <Button endIcon={<ArrowForward />} onClick={() => navigate('/products')}>
              Все товары
            </Button>
          </Box>

          <Grid container spacing={3}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Grid item key={i} xs={12} sm={6} md={3}>
                    <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
                  </Grid>
                ))
              : featured.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.images?.[0] || product.image}
                      images={product.images}
                      material={product.material}
                      description={product.description}
                      categoryId={product.categoryId}
                    />
                  </Grid>
                ))
            }
          </Grid>

          {/* Преимущества */}
          <Paper sx={{ mt: 8, p: 5, borderRadius: 3, bgcolor: '#fff' }}>
            <Typography variant="h5" fontWeight={700} mb={4} textAlign="center">
              Почему выбирают нас
            </Typography>
            <Grid container spacing={4} textAlign="center">
              {[
                { icon: '🏭', title: 'Собственное производство', text: 'Мебель изготавливается на нашем заводе без посредников' },
                { icon: '🚚', title: 'Доставка по России',       text: 'Привезём в любой регион. Самовывоз — бесплатно' },
                { icon: '🔧', title: 'Сборка в подарок',         text: 'При заказе от 30 000 ₽ сборка мебели бесплатно' },
                { icon: '✅', title: 'Гарантия 3 года',          text: 'Официальная гарантия на все изделия' },
              ].map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
                  <Typography fontSize={40} mb={1}>{item.icon}</Typography>
                  <Typography fontWeight={700} mb={1}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{item.text}</Typography>
                </Grid>
              ))}
            </Grid>
          </Paper>

        </Container>
      </Box>
    </Box>
  );
}
