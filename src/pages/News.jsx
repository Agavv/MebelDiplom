import React, { useState } from 'react';
import {
  Container, Grid, Card, CardMedia, CardContent, CardActions,
  Typography, Button, Chip, Box, Divider, TextField,
  InputAdornment, Tabs, Tab,
} from '@mui/material';
import { Search, CalendarToday, ArrowForward } from '@mui/icons-material';

const NEWS = [
  {
    id: 1, category: 'Новинки',
    title: 'Новая коллекция мебели в стиле Скандинавия',
    date: '2026-05-20',
    preview: 'Представляем обновлённую линейку мебели в скандинавском стиле. Светлые тона, натуральные материалы и строгие линии — идеально для современного интерьера.',
    image: 'https://picsum.photos/id/1048/600/400',
  },
  {
    id: 2, category: 'Советы',
    title: 'Как правильно выбрать диван для гостиной',
    date: '2026-05-10',
    preview: 'При выборе дивана важно учитывать не только дизайн, но и практичность. Рассказываем на что обратить внимание: материал обивки, наполнитель, механизм трансформации.',
    image: 'https://picsum.photos/id/1049/600/400',
  },
  {
    id: 3, category: 'Все',
    title: 'Бесплатная доставка при заказе от 30 000 ₽',
    date: '2026-04-25',
    preview: 'До конца месяца действует специальное предложение — при заказе мебели на сумму от 30 000 рублей доставка по Москве и области бесплатно.',
    image: 'https://picsum.photos/id/1050/600/400',
  },
  {
    id: 4, category: 'Новинки',
    title: 'Поступление кухонных гарнитуров — серия «Модерн»',
    date: '2026-04-15',
    preview: 'Новинка сезона — кухонная серия «Модерн» в 12 цветовых исполнениях. МДФ фасады с матовым покрытием, интегрированные ручки и мягкое закрывание дверей.',
    image: 'https://picsum.photos/id/1060/600/400',
  },
  {
    id: 5, category: 'Советы',
    title: '5 идей для небольшой спальни',
    date: '2026-04-02',
    preview: 'Маленькая спальня — не проблема, если грамотно организовать пространство. Делимся проверенными решениями: откидные кровати, встроенные шкафы и многофункциональная мебель.',
    image: 'https://picsum.photos/id/1062/600/400',
  },
];

const CATEGORIES = ['Все', 'Новинки', 'Советы'];

const CATEGORY_COLORS = {
  'Новинки': 'success',
  'Советы':  'info',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function News() {
  const [search,      setSearch]      = useState('');
  const [activeTab,   setActiveTab]   = useState(0);
  const [expanded,    setExpanded]    = useState(null);

  const category = CATEGORIES[activeTab];

  const filtered = NEWS.filter(n => {
    const matchCat    = category === 'Все' || n.category === category;
    const matchSearch = !search.trim() || n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Первая новость — большой баннер
  const [featured, ...rest] = filtered;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>Новости и события</Typography>
      <Typography color="text.secondary" mb={4}>
        Новинки коллекций и полезные советы по обустройству интерьера
      </Typography>

      {/* Поиск + категории */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size="small" placeholder="Поиск по новостям..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: 260 }}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search sx={{ color: '#aaa' }} /></InputAdornment>
          }}
        />
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          {CATEGORIES.map((c, i) => <Tab key={c} label={c} />)}
        </Tabs>
      </Box>

      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">Новостей не найдено</Typography>
        </Box>
      ) : (
        <>
          {/* Главная новость */}
          {featured && (
            <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', display: { md: 'flex' } }}>
              <CardMedia
                component="img"
                image={featured.image}
                alt={featured.title}
                sx={{ width: { md: '45%' }, height: { xs: 240, md: 'auto' }, objectFit: 'cover' }}
              />
              <CardContent sx={{ flex: 1, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={featured.category} color={CATEGORY_COLORS[featured.category] || 'default'} size="small" />
                  {featured.badge && <Chip label={featured.badge} color="warning" size="small" />}
                </Box>
                <Typography variant="h5" fontWeight={700} mb={2} sx={{ lineHeight: 1.4 }}>
                  {featured.title}
                </Typography>
                <Typography color="text.secondary" mb={3} sx={{ lineHeight: 1.7 }}>
                  {featured.preview}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <CalendarToday sx={{ fontSize: 16 }} />
                    <Typography variant="caption">{formatDate(featured.date)}</Typography>
                  </Box>
                  <Button endIcon={<ArrowForward />} size="small" variant="outlined">
                    Читать далее
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Остальные */}
          <Grid container spacing={3}>
            {rest.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ height: '100%', borderRadius: 2, display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                  <CardMedia
                    component="img" height="180"
                    image={item.image} alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Chip label={item.category} color={CATEGORY_COLORS[item.category] || 'default'} size="small" />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                        <CalendarToday sx={{ fontSize: 13 }} />
                        <Typography variant="caption">{formatDate(item.date)}</Typography>
                      </Box>
                    </Box>
                    <Typography fontWeight={700} mb={1} sx={{ lineHeight: 1.4 }}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      lineHeight: 1.6,
                      display: '-webkit-box', WebkitLineClamp: expanded === item.id ? 'unset' : 3,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {item.preview}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      size="small" endIcon={<ArrowForward />}
                      onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                    >
                      {expanded === item.id ? 'Свернуть' : 'Читать далее'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
