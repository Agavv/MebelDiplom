import React, { useState } from 'react';
import {
  Container, Box, Typography, Grid, Paper, Button,
  Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemIcon, ListItemText, Divider, Chip,
} from '@mui/material';
import {
  ExpandMore, CheckCircle, Cancel, Phone, Shield,
  Build, LocalShipping, Star, Warning,
} from '@mui/icons-material';
import CallbackModal from '../components/CallbackModal/CallbackModal';

const WARRANTY_TERMS = [
  { title: 'Корпусная мебель', period: '5 лет', icon: '🗄️' },
  { title: 'Мягкая мебель',    period: '3 года', icon: '🛋️' },
  { title: 'Кухонные гарнитуры', period: '5 лет', icon: '🍳' },
  { title: 'Детская мебель',   period: '5 лет', icon: '🧸' },
  { title: 'Мебель для офиса', period: '3 года', icon: '💼' },
  { title: 'Фурнитура',        period: '2 года', icon: '🔩' },
];

const COVERED = [
  'Производственные дефекты изготовления',
  'Дефекты материалов (расслоение, трещины)',
  'Поломка механизмов трансформации при правильной эксплуатации',
  'Неисправность фурнитуры (петли, направляющие, ручки)',
  'Нарушение лакокрасочного покрытия без механических повреждений',
  'Несоответствие заявленным размерам',
];

const NOT_COVERED = [
  'Механические повреждения (царапины, сколы, вмятины)',
  'Повреждения от воды, влаги, огня или химикатов',
  'Естественный износ обивки и мягких элементов',
  'Повреждения при неправильной сборке (не нашими мастерами)',
  'Изменение цвета под воздействием солнечного света',
  'Повреждения при транспортировке покупателем',
];

const FAQ = [
  {
    q: 'Как оформить гарантийный случай?',
    a: 'Позвоните нам по номеру +7 (999) 555-22-11 или заполните форму обратного звонка. Наш специалист выедет на осмотр в удобное для вас время. При подтверждении гарантийного случая ремонт или замена производятся бесплатно.',
  },
  {
    q: 'Нужен ли чек для гарантийного обслуживания?',
    a: 'Мы можем подтвердить покупку по базе данных. Однако для ускорения процесса рекомендуем сохранять кассовый чек или документ о покупке.',
  },
  {
    q: 'Сколько времени занимает ремонт по гарантии?',
    a: 'Стандартный срок — до 14 рабочих дней с момента обращения. В сложных случаях (ожидание комплектующих) срок может быть продлён до 30 дней с уведомлением.',
  },
  {
    q: 'Что делать если мебель пришла повреждённой?',
    a: 'Необходимо зафиксировать повреждения фото/видео при курьере и отказаться от подписания акта приёмки. Свяжитесь с нами немедленно — мы заменим товар.',
  },
  {
    q: 'Распространяется ли гарантия на мебель из распродажи?',
    a: 'Да, гарантийные условия одинаковы для всех товаров независимо от цены и акций.',
  },
];

export default function Warranty() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 5 }}>

        {/* Заголовок */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" fontWeight={700} mb={1}>Гарантия и сервис</Typography>
          <Typography color="text.secondary">
            Мы уверены в качестве нашей мебели и предоставляем официальную гарантию на все изделия
          </Typography>
        </Box>

        {/* Баннер */}
        <Paper sx={{
          p: 4, mb: 5, borderRadius: 3,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          color: '#fff',
          display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center',
        }}>
          <Box sx={{ flex: 1, minWidth: 260 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Shield sx={{ fontSize: 48, color: '#F5D066' }} />
              <Typography variant="h5" fontWeight={700}>Гарантия до 5 лет</Typography>
            </Box>
            <Typography sx={{ color: '#ccc', lineHeight: 1.7 }}>
              На все изделия BestMebel распространяется официальная гарантия.
              При обнаружении производственного дефекта мы бесплатно отремонтируем
              или заменим товар.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained" size="large"
              startIcon={<Phone />}
              onClick={() => setCallbackOpen(true)}
              sx={{ bgcolor: '#F5D066', color: '#333', fontWeight: 700, '&:hover': { bgcolor: '#e5c056' } }}
            >
              Гарантийный случай — позвонить
            </Button>
            <Typography variant="caption" sx={{ color: '#888', textAlign: 'center' }}>
              Звонок бесплатный · Ежедневно 09:00–23:00
            </Typography>
          </Box>
        </Paper>

        {/* Сроки гарантии */}
        <Typography variant="h5" fontWeight={700} mb={3}>Сроки гарантии по категориям</Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {WARRANTY_TERMS.map(({ title, period, icon }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: 32 }}>{icon}</Typography>
                <Box>
                  <Typography fontWeight={600}>{title}</Typography>
                  <Chip label={period} color="primary" size="small" variant="outlined" sx={{ mt: 0.5 }} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mb: 5 }} />

        {/* Покрывается / не покрывается */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight={700} mb={2} color="success.main">
              ✓ Гарантия покрывает
            </Typography>
            <List dense>
              {COVERED.map(item => (
                <ListItem key={item} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body2">{item}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight={700} mb={2} color="error.main">
              ✗ Гарантия не покрывает
            </Typography>
            <List dense>
              {NOT_COVERED.map(item => (
                <ListItem key={item} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <Cancel sx={{ fontSize: 18, color: 'error.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={<Typography variant="body2">{item}</Typography>} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 5 }} />

        {/* FAQ */}
        <Typography variant="h5" fontWeight={700} mb={3}>Часто задаваемые вопросы</Typography>
        {FAQ.map((item, i) => (
          <Accordion key={i} sx={{ mb: 1, borderRadius: '8px !important', '&:before': { display: 'none' }, boxShadow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={600}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{item.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Нижний CTA */}
        <Paper sx={{ p: 4, mt: 5, borderRadius: 3, bgcolor: '#f9f9f9', textAlign: 'center' }}>
          <Warning sx={{ fontSize: 48, color: '#F5D066', mb: 1 }} />
          <Typography variant="h6" fontWeight={700} mb={1}>
            Возник гарантийный случай?
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Не занимайтесь ремонтом самостоятельно — это может привести к потере гарантии.
            Позвоните нам, и мы решим проблему.
          </Typography>
          <Button
            variant="contained" size="large"
            startIcon={<Phone />}
            onClick={() => setCallbackOpen(true)}
            sx={{ bgcolor: '#F5D066', color: '#333', fontWeight: 700, '&:hover': { bgcolor: '#e5c056' } }}
          >
            Заказать обратный звонок
          </Button>
        </Paper>
      </Container>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
}
