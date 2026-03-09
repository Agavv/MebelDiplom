import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box, 
  Breadcrumbs, 
  Link, 
  Button,
  Chip,
  Stack
} from '@mui/material';
import { NavigateNext, AccessTime, ArrowForward } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const newsData = [
  {
    id: 1,
    title: 'Весеннее обновление коллекции 2026',
    date: '15 Марта 2026',
    category: 'Новинки',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=500',
    excerpt: 'Мы расширили ассортимент мягкой мебели. Теперь в каталоге доступно более 50 новых моделей диванов в трендовых оттенках этого сезона.'
  },
  {
    id: 2,
    title: 'Открытие нового шоурума в ТЦ "МебельГрад"',
    date: '10 Марта 2026',
    category: 'События',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=500',
    excerpt: 'Ждем вас на торжественное открытие! Первым 100 покупателям — эксклюзивные скидки и подарки для дома.'
  },
  {
    id: 3,
    title: 'Как выбрать идеальный шкаф-купе: советы дизайнера',
    date: '05 Марта 2026',
    category: 'Статьи',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=500',
    excerpt: 'Разбираемся, на чем можно сэкономить при заказе встроенной мебели, а на каких деталях экономить категорически нельзя.'
  },
];

export default function News() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      
      {/* Навигация */}
      <Breadcrumbs 
        separator={<NavigateNext fontSize="small" />} 
        sx={{ mb: 3, fontSize: '0.85rem' }}
      >
        <Link 
          component={RouterLink} 
          to="/" 
          underline="hover" 
          color="inherit"
        >
          Главная
        </Link>
        <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>
          Новости магазина
        </Typography>
      </Breadcrumbs>

      {/* Заголовок */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#222', mb: 1 }}>
          Новости и события
        </Typography>
        <Box sx={{ width: '80px', height: '4px', bgcolor: '#ff6b00', borderRadius: 2 }} />
      </Box>

      {/* Сетка новостей */}
      <Grid container spacing={4}>
        {newsData.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card 
              elevation={0} 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid #eee',
                borderRadius: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px rgba(0,0,0,0.08)',
                  borderColor: 'transparent'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <Chip 
                  label={item.category} 
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    left: 12, 
                    bgcolor: '#ff6b00', 
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5, color: '#999' }}>
                  <AccessTime sx={{ fontSize: 16 }} />
                  <Typography variant="caption">{item.date}</Typography>
                </Stack>
                
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3, fontSize: '1.1rem' }}>
                  {item.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                  {item.excerpt}
                </Typography>

                <Button 
                  component={RouterLink} 
                  to={`/news/${item.id}`}
                  endIcon={<ArrowForward fontSize="small" />}
                  sx={{ 
                    p: 0, 
                    textTransform: 'none', 
                    fontWeight: 600, 
                    color: '#ff6b00',
                    '&:hover': { bgcolor: 'transparent', color: '#e65100' }
                  }}
                >
                  Читать полностью
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Кнопка "Показать еще" (опционально) */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button 
          variant="outlined" 
          sx={{ 
            borderColor: '#ddd', 
            color: '#333', 
            px: 6, 
            py: 1.5, 
            borderRadius: '50px',
            textTransform: 'none',
            '&:hover': { borderColor: '#ff6b00', color: '#ff6b00' }
          }}
        >
          Загрузить старые новости
        </Button>
      </Box>
    </Container>
  );
}