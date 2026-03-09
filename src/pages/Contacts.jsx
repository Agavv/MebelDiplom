import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Stack,
  Link,
  Breadcrumbs
} from '@mui/material';
import {
  PhoneInTalk,
  AccessTime,
  Email,
  NavigateNext,
  DirectionsSubway
} from '@mui/icons-material';

const locations = [
  {
    address: '143085, Московская область, г. Одинцово, р.п. Заречье, ул. Торговая, стр. 2 (2-й этаж)',
    type: 'Пункт выдачи заказов',
    phone: '+7 (499) 110-71-09',
    hours: 'пн-вс: 10.00 до 19.00',
    email: 'sale@bestmebelshop.ru',
  },
  {
    address: '108811, г. Москва, пос. Московский, 22-ой км. Киевского шоссе, домовладение 4, стр. 1 (этаж 3 павильон С-3)',
    type: 'Тех-поддержка',
    phone: '+7 (499) 110-71-09',
    hours: 'пн-вс: 10.00 до 21.00',
    email: 'sale@bestmebelshop.ru',
    metro: 'Румянцево',
    metroColor: '#ef5350'
  },
  {
    address: '115583, г. Москва, ул. Генерала Белова, д. 35 (ТЦ «МебельГрад», цокольный этаж)',
    type: 'Отдел доставки',
    phone: '+7 (499) 110-71-09',
    hours: 'пн-сб: 10.00 до 22.00; вс: 10.00 до 21.00',
    email: 'sale@bestmebelshop.ru',
    metro: 'Домодедовская',
    metroColor: '#2e7d32'
  },
  {
    address: '127411, г. Москва, Дмитровское шоссе, д. 161Б (МЦ «Империя», 1 этаж)',
    type: 'Сборка мебели',
    phone: '+7 (499) 110-71-09',
    hours: 'пн-вс: 10.00 до 21.00',
    email: 'sale@bestmebelshop.ru',
  },
  {
    address: '129337, г. Москва, ул. Ярославское шоссе, д. 19, стр. 1 (МЦ «Соле Молл», 1 этаж)',
    type: 'Отдел качества обслуживания',
    phone: '+7 (499) 110-71-09',
    hours: 'пн-вс: 10.00 до 21.00',
    email: 'sale@bestmebelshop.ru',
  },
  {
    address: '143968, Московская область, г. Реутов, МКАД, 2-й километр, д. 2 (ТЦ «Шоколад», 3-й этаж)',
    type: 'Шоу-рум',
    phone: '+7 (499) 110-71-09',
    hours: 'пн-вс: 10.00 до 22.00',
    email: 'sale@bestmebelshop.ru',
  },
  {
    address: '143407, г. Красногорск, ул. Международная улица, д.4, Крокус Сити, МЦ Твой дом, вход №5, этаж 3',
    type: 'Шоу-рум',
    phone: '+7 (499) 110-71-09',
    hours: 'пн-вс: 10.00 до 22.00',
    email: 'sale@bestmebelshop.ru',
  }
];

export default function Contacts() {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Хлебные крошки */}
      <Breadcrumbs 
        separator={<NavigateNext fontSize="small" />} 
        aria-label="breadcrumb" 
        sx={{ mb: 2, fontSize: '0.75rem', color: '#999' }}
      >
        <Link underline="hover" color="inherit" href="/">Главная</Link>
        <Typography color="text.secondary" sx={{ fontSize: '0.75rem' }}>Контакты</Typography>
      </Breadcrumbs>

      {/* Заголовок с оранжевой линией снизу */}
      <Box sx={{ mb: 4, position: 'relative', display: 'inline-block' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333', pb: 1 }}>
          Контактная информация
        </Typography>
        <Box sx={{ width: '80px', height: '3px', bgcolor: '#ff9800', position: 'absolute', bottom: 0 }} />
      </Box>

      {/* Сетка карточек по 3 в ряд */}
      <Grid container spacing={10}>
        {locations.map((loc, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%', 
                bgcolor: '#f8f8f8', 
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                {/* Адрес */}
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, minHeight: '4.5em', lineHeight: 1.5 }}>
                  {loc.address}
                </Typography>

                {/* Тип заведения */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                  {loc.type}
                </Typography>

                <Stack spacing={2}>
                  {/* Телефон - зеленая иконка */}
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ bgcolor: '#7cb342', p: 0.6, borderRadius: '50%', display: 'flex' }}>
                      <PhoneInTalk sx={{ color: '#fff', fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ lineHeight: 1.1 }}>
                        Многоканальный телефон:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {loc.phone}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Режим работы - контурная иконка */}
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ border: '1px solid #ccc', p: 0.6, borderRadius: '50%', display: 'flex' }}>
                      <AccessTime sx={{ color: '#666', fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ lineHeight: 1.1 }}>
                        Режим работы:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {loc.hours}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Почта - контурная иконка */}
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ border: '1px solid #ccc', p: 0.6, borderRadius: '50%', display: 'flex' }}>
                      <Email sx={{ color: '#666', fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ lineHeight: 1.1 }}>
                        Электронная почта:
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                        {loc.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Box>

              {/* Метро (вынесено вниз карточки) */}
              {loc.metro && (
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2.5 }}>
                  <DirectionsSubway sx={{ color: loc.metroColor, fontSize: 18 }} />
                  <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    «{loc.metro}»
                  </Typography>
                </Stack>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}