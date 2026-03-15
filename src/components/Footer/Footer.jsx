import React, { useState } from 'react';
import {
  Box, Container, Grid, Typography, Link, Divider, Stack,
  TextField, Button, IconButton,
} from '@mui/material';
import {
  Phone, Email, LocationOn, AccessTime,
  Telegram, WhatsApp, Instagram, YouTube,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import CallbackModal from '../CallbackModal/CallbackModal';

const NAV_LINKS = [
  [
    { label: 'Каталог',                  to: '/catalog' },
    { label: 'Новости магазина',         to: '/news' },
    { label: 'Оплата',                   to: '/payment' },
    { label: 'Доставка',                 to: '/delivery' },
  ],
  [
    { label: 'Гарантия',                 to: '/warranty' },
    { label: 'Вопрос-ответ',             to: '/faq' },
    { label: 'Контакты',                 to: '/contacts' },
    { label: 'Сертификаты',              to: '/certificates' },
  ],
];

export default function Footer() {
  const [callbackOpen, setCallbackOpen] = useState(false);
  const [email,        setEmail]        = useState('');
  const [subscribed,   setSubscribed]   = useState(false);

  const handleSubscribe = () => {
    if (!email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <>
      <Box component="footer" sx={{ bgcolor: '#1a1a2e', color: '#ccc', mt: 'auto' }}>

        {/* Верхняя полоса — CTA */}
        <Box sx={{ bgcolor: '#F5D066', py: 3 }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} color="#333">
                  Нужна помощь с выбором мебели?
                </Typography>
                <Typography variant="body2" color="#555">
                  Наши специалисты помогут подобрать идеальное решение
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => setCallbackOpen(true)}
                sx={{
                  bgcolor: '#1a1a2e', color: '#fff', fontWeight: 700,
                  px: 4, py: 1.5, borderRadius: 2,
                  '&:hover': { bgcolor: '#16213e' },
                }}
              >
                Заказать звонок
              </Button>
            </Box>
          </Container>
        </Box>

        {/* Основной контент */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Grid container spacing={5}>

            {/* Логотип + контакты */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight={800} color="#fff" mb={1}>
                Best<Box component="span" sx={{ color: '#F5D066' }}>Mebel</Box>
              </Typography>
              <Typography variant="body2" mb={3} sx={{ maxWidth: 280, lineHeight: 1.7 }}>
                Производство и продажа качественной мебели с 2010 года. 
                Более 500 изделий в каталоге. Гарантия 5 лет.
              </Typography>

              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Phone sx={{ fontSize: 18, color: '#F5D066' }} />
                  <Box>
                    <Typography variant="body2" color="#fff" fontWeight={600}>+7 (999) 555-22-11</Typography>
                    <Typography variant="caption" color="#888">Бесплатно по России</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Email sx={{ fontSize: 18, color: '#F5D066' }} />
                  <Typography variant="body2" color="#fff">sale@bestmebelshop.ru</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <LocationOn sx={{ fontSize: 18, color: '#F5D066', mt: 0.2 }} />
                  <Typography variant="body2" color="#ccc">
                    г. Москва, ул. Мебельная, 42,<br />ТЦ «МебельЦентр», 2 этаж
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <AccessTime sx={{ fontSize: 18, color: '#F5D066' }} />
                  <Typography variant="body2" color="#ccc">Ежедневно с 09:00 до 23:00</Typography>
                </Box>
              </Stack>

              {/* Соцсети */}
              <Stack direction="row" spacing={1} mt={3}>
                {[
                  { Icon: Telegram,  color: '#2AABEE', label: 'Telegram' },
                  { Icon: WhatsApp,  color: '#25D366', label: 'WhatsApp' },
                  { Icon: Instagram, color: '#E1306C', label: 'Instagram' },
                  { Icon: YouTube,   color: '#FF0000', label: 'YouTube'  },
                ].map(({ Icon, color, label }) => (
                  <IconButton key={label} size="small" title={label}
                    sx={{ bgcolor: 'rgba(255,255,255,0.08)', '&:hover': { bgcolor: color, color: '#fff' }, color: '#aaa', transition: 'all 0.2s' }}>
                    <Icon sx={{ fontSize: 18 }} />
                  </IconButton>
                ))}
              </Stack>
            </Grid>

            {/* Навигация */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight={700} color="#fff" mb={2}>
                Информация
              </Typography>
              <Stack spacing={1}>
                {NAV_LINKS[0].map(({ label, to }) => (
                  <Link key={to} component={RouterLink} to={to} underline="none"
                    sx={{ color: '#aaa', fontSize: '14px', '&:hover': { color: '#F5D066' }, transition: 'color 0.2s' }}>
                    {label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight={700} color="#fff" mb={2}>
                Покупателям
              </Typography>
              <Stack spacing={1}>
                {NAV_LINKS[1].map(({ label, to }) => (
                  <Link key={to} component={RouterLink} to={to} underline="none"
                    sx={{ color: '#aaa', fontSize: '14px', '&:hover': { color: '#F5D066' }, transition: 'color 0.2s' }}>
                    {label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Подписка на рассылку */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" fontWeight={700} color="#fff" mb={1}>
                Подписка на новости
              </Typography>
              <Typography variant="body2" color="#888" mb={2}>
                Акции, новинки и специальные предложения — первым узнавай о скидках
              </Typography>

              {subscribed ? (
                <Box sx={{ bgcolor: 'rgba(76,175,80,0.15)', border: '1px solid #4caf50', borderRadius: 2, p: 2 }}>
                  <Typography color="#4caf50" fontWeight={600}>✓ Вы успешно подписались!</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small" placeholder="Ваш email" type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                    sx={{
                      flex: 1,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.08)',
                        color: '#fff',
                        '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                        '&:hover fieldset': { borderColor: '#F5D066' },
                      },
                      '& input::placeholder': { color: '#666' },
                    }}
                  />
                  <Button
                    variant="contained" onClick={handleSubscribe}
                    sx={{ bgcolor: '#F5D066', color: '#333', fontWeight: 700, '&:hover': { bgcolor: '#e5c056' }, whiteSpace: 'nowrap' }}
                  >
                    Подписаться
                  </Button>
                </Box>
              )}

              {/* Документы */}
              <Stack direction="row" spacing={2} mt={3}>
                {['Публичная оферта', 'Конфиденциальность', 'Гарантия'].map(doc => (
                  <Typography key={doc} variant="caption"
                    sx={{ color: '#666', textDecoration: 'underline', cursor: 'pointer', '&:hover': { color: '#F5D066' } }}>
                    {doc}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        {/* Нижняя строка */}
        <Container maxWidth="xl">
          <Box sx={{ py: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="caption" color="#555">
              © 2010–{new Date().getFullYear()} BestMebel. Все права защищены.
            </Typography>
            <Typography variant="caption" color="#555">
              ИНН 7712345678 · ОГРН 1027700001234
            </Typography>
          </Box>
        </Container>
      </Box>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
}
