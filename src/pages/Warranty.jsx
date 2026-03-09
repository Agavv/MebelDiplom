import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
  Breadcrumbs
} from '@mui/material';
import {
  Assignment,
  VerifiedUser,
  CalendarMonth,
  AccountBalanceWallet,
  PhoneInTalk,
  Email,
  Description,
  NavigateNext
} from '@mui/icons-material';

// Импорт документов (пути указаны относительно файла Warranty.js)
// Если файл лежит в src/pages/, путь будет '../assets/documents/...'
import docPdf from '../assets/documents/doc.pdf';
import usloviyaPdf from '../assets/documents/usloviya.pdf';
import dogovorPdf from '../assets/documents/dogovor.pdf';

export default function Warranty() {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Хлебные крошки */}
      <Breadcrumbs 
        separator={<NavigateNext fontSize="small" />} 
        aria-label="breadcrumb" 
        sx={{ mb: 2, fontSize: '0.8rem' }}
      >
        <Link underline="hover" color="inherit" href="/">Главная</Link>
        <Typography color="text.primary" sx={{ fontSize: '0.8rem' }}>Гарантия</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
        Гарантия и возврат мебели
      </Typography>

      {/* 1. Зеленый баннер */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(90deg, #579212 0%, #a4cb39 50%, #f2e365 100%)',
          borderRadius: 2,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          mb: 6,
          minHeight: '220px',
          position: 'relative'
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ px: { xs: 3, md: 6 }, width: '100%', color: '#fff' }}>
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ position: 'relative', mr: 3 }}>
               <Assignment sx={{ fontSize: 80, opacity: 0.9 }} />
               <VerifiedUser sx={{ position: 'absolute', bottom: 0, right: -10, color: '#ffb300', fontSize: 40 }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', maxWidth: '450px', lineHeight: 1.2 }}>
              Гарантия это наш главный козырь!
            </Typography>
          </Box>
          <Box 
            component="img" 
            src="src\assets\images\assembly-worker.png" 
            sx={{ 
              height: '220px', 
              display: { xs: 'none', md: 'block' },
              objectFit: 'cover'
            }} 
          />
        </Stack>
      </Paper>

      {/* 2. Три преимущества */}
      <Grid container spacing={5} sx={{ mb: 8 }}>
        {[
          { icon: <AccountBalanceWallet />, num: '01', title: 'Не понравилась мебель - вернем деньги!' },
          { icon: <VerifiedUser />, num: '02', title: 'Гарантия на все товары - 18 месяцев!' },
          { icon: <CalendarMonth />, num: '03', title: 'Срок службы мебели - составляет 10 лет!' }
        ].map((item, idx) => (
          <Grid item xs={12} md={4} key={idx} sx={{ textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
              <Typography variant="h1" sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                opacity: 0.05,
                fontSize: '6rem',
                fontWeight: 'bold'
              }}>{item.num}</Typography>
              <Box sx={{ color: '#4caf50', '& svg': { fontSize: 60 } }}>{item.icon}</Box>
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: '500', px: 4 }}>{item.title}</Typography>
          </Grid>
        ))}
      </Grid>

      {/* 3. Правила и Брак */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8f9fa', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#333', mb: 2, fontWeight: 'bold' }}>Правила возврата:</Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Если вам не подошла мебель по тем или иным причинам, Вы вправе отказаться от товара в течение 7 дней после его получения.
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Возврату не подлежит:</Typography>
            <List dense sx={{ mb: 2 }}>
              {['Расходные комплектующие (лампы, фильтры и пр.)', 'Мебель, выполненная по индивидуальному проекту', 'Собранная или бывшая в употреблении мебель'].map((text, i) => (
                <ListItem key={i} sx={{ p: 0 }}>
                  <ListItemIcon sx={{ minWidth: 20 }}>•</ListItemIcon>
                  <Typography variant="body2" color="text.secondary">{text}</Typography>
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" color="text.secondary">
              Для возврата свяжитесь с отделом: <strong>+7 (499) 110-71-19</strong> или <strong>garant@bestmebelshop.ru</strong>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8f9fa', height: '100%' }}>
            <Typography variant="h6" sx={{ color: '#ff9800', mb: 2, fontWeight: 'bold' }}>При обнаружении брака:</Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              Покупатель имеет полное право на осмотр покупки. При обнаружении брака клиент может позвонить по телефону в гарантийный отдел с 9:00 до 21:00.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Другой способ — заполнение специальной формы «Заявки в гарантийный отдел» ниже. Опишите проблему и прикрепите фотографии.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 4. Контактная строка со ссылкой на Оферту */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4, px: 2 }}>
        <Link href={dogovorPdf} target="_blank" rel="noopener noreferrer" underline="none" color="inherit">
          <Stack direction="row" spacing={1} alignItems="center" sx={{ cursor: 'pointer' }}>
            <Description sx={{ color: '#4caf50' }} />
            <Typography variant="body2" sx={{ borderBottom: '1px dashed' }}>
              Договор публичной оферты
            </Typography>
          </Stack>
        </Link>
        <Stack direction="row" spacing={1} alignItems="center">
          <PhoneInTalk sx={{ color: '#4caf50' }} />
          <Box>
            <Typography variant="caption" display="block" color="text.secondary">Время работы с 9-00 до 18-00</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>+7 (499) 110-71-19</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Email sx={{ color: '#4caf50' }} />
          <Box>
            <Typography variant="caption" display="block" color="text.secondary">Электронная почта:</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>garant@bestmebelshop.ru</Typography>
          </Box>
        </Stack>
      </Stack>

      {/* 5. Форма обратного звонка */}
      <Paper variant="outlined" sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Отдел гарантии - обратный звонок
            </Typography>
            <Typography variant="body2" color="text.secondary">
              При возникновении вопросов по порядку возврата или гарантии, оставьте заявку и мы свяжемся с вами в ближайшее время.
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Ваше имя" variant="outlined" />
                <TextField fullWidth size="small" label="+7 (___) ___-__-__" variant="outlined" sx={{ mt: 2 }} />
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                   <TextField fullWidth size="small" type="date" defaultValue="2026-03-09" />
                   <FormControl fullWidth size="small">
                      <Select defaultValue={12}>
                        <MenuItem value={12}>12 ч.</MenuItem>
                        <MenuItem value={13}>13 ч.</MenuItem>
                      </Select>
                   </FormControl>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth multiline rows={4} label="Сообщение" variant="outlined" />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#ffe082', color: '#000', '&:hover': { bgcolor: '#ffd54f' }, px: 4 }}>
                  Отправить
                </Button>
                {/* Текст со ссылками на PDF */}
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                  Нажимая на кнопку «Отправить», вы соглашаетесь с условиями{' '}
                  <Link href={usloviyaPdf} target="_blank" rel="noopener noreferrer">Обработки персональных данных</Link>{' '}
                  и{' '}
                  <Link href={docPdf} target="_blank" rel="noopener noreferrer">политикой конфиденциальности</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}