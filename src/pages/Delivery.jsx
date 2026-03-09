import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Stack, 
  List, 
  ListItem, 
  ListItemIcon, 
  Tooltip, 
  tooltipClasses, 
  Breadcrumbs, // Добавлен
  Link        // Добавлен
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  LocalShipping, 
  AccountBalanceWallet, 
  Speed, 
  Telegram, 
  NavigateNext, // Добавлен
  InfoOutlined
} from '@mui/icons-material';

// Стилизация облачка подсказки под стиль на скриншоте
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 320,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    padding: '15px',
    borderRadius: '8px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#f5f5f9',
  },
}));

export default function Delivery() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
      {/* --- НОВЫЙ БЛОК НАВИГАЦИИ --- */}
      <Breadcrumbs 
        separator={<NavigateNext fontSize="small" />} 
        sx={{ mb: 3, fontSize: '0.85rem' }}
      >
        <Link 
          component={RouterLink} 
          to="/" 
          underline="hover" 
          color="inherit" 
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Главная
        </Link>
        <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>
          Доставка
        </Typography>
      </Breadcrumbs>
      {/* ---------------------------- */}

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
        Доставка мебели
      </Typography>

      {/* Основной баннер с градиентом */}
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(90deg, #579212 0%, #a4cb39 45%, #f2e365 100%)',
          borderRadius: 1,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          minHeight: '200px',
          position: 'relative'
        }}
      >
        <Stack direction="row" alignItems="center" sx={{ px: 5, zIndex: 2, color: '#fff', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <LocalShipping sx={{ fontSize: 80, mr: 3, opacity: 0.9 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', lineHeight: 1.2, maxWidth: '500px' }}>
              Бесплатная доставка в пределах МКАД! Доставим мебель за 3 дня!
            </Typography>
          </Box>
          {/* Фото грузчиков (замените путь на реальный) */}
          <Box 
            component="img" 
            src="/assets/movers.png" 
            sx={{ 
              height: '200px', 
              display: { xs: 'none', md: 'block' } 
            }} 
          />
        </Stack>
      </Paper>

      {/* Желтый информационный блок */}
      <Paper elevation={0} sx={{ p: 3, bgcolor: '#fff9c4', mb: 2, borderRadius: 1 }}>
        <Typography variant="body2" sx={{ color: '#555', lineHeight: 1.6 }}>
          Наша компания осуществляет доставку в пределах Москвы и МО. В пределах МКАД транспортировка до подъезда заказчика является <strong>бесплатной</strong>. <br />
          Доставка осуществляется с <strong>06:00 до 00:00</strong>. <br />
          Оптовым клиентам предоставляется возможность заказать доставку по России посредством логистической компании.
        </Typography>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, bgcolor: '#fff9c4', mb: 4, borderRadius: 1 }}>
        <Typography variant="body2">
          Товары из раздела <strong>Распродажа</strong> доставляются по 100% предоплате онлайн.
        </Typography>
      </Paper>

      {/* Карточки тарифов */}
      <Stack direction="row" spacing={4} sx={{ mb: 6 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AccountBalanceWallet sx={{ color: '#8bc34a', fontSize: 40 }} />
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">В пределах МКАД</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800', textTransform: 'uppercase' }}>Бесплатно</Typography>
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Speed sx={{ color: '#8bc34a', fontSize: 40 }} />
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">За МКАД</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}> БЕСПЛАТНО </Typography>
          </Box>
        </Stack>
      </Stack>

      {/* Нижние блоки */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ p: 3, flex: 1, bgcolor: '#fbfbfb', border: 'none' }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Процесс доставки заказа</Typography>
          <List dense>
            {[
              'Водитель-экспедитор доставит груз',
              'Передаст его заказчику и предоставит все сопроводительные документы: счет-фактуру, накладные, гарантийные обязательства фабрики-изготовителя (талон)',
              'Клиент оплачивает товар и его доставку'
            ].map((text, index) => (
              <ListItem key={index} sx={{ alignItems: 'flex-start', px: 0 }}>
                <ListItemIcon sx={{ minWidth: 25, mt: 0.5 }}>
                  <Box sx={{ width: 6, height: 6, bgcolor: '#8bc34a', borderRadius: '50%' }} />
                </ListItemIcon>
                <Typography variant="body2" color="text.secondary">{text}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, flex: 1, bgcolor: '#fbfbfb', border: 'none', position: 'relative' }}>
          <Stack direction="row" spacing={2}>
            <Telegram sx={{ color: '#bdc3c7', fontSize: 40 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Доступен самовывоз</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                (внешняя сторона МКАДа). Отгрузка товара ведется с 11 до 19 часов.
              </Typography>
              
              {/* Интерактивная ссылка "Как проехать?" */}
              <HtmlTooltip
                arrow
                placement="top"
                title={
                  <React.Fragment>
                    Въезжая на территорию торгового центра, припаркуйте автомобиль с правой стороны. После входа в здание через дебаркадер возьмите тачку или воспользуйтесь услугами грузчиков. При необходимости сделать все самостоятельно поднимитесь на грузовом лифте на второй этаж и подойдите к стенду 30. Отгрузка товара ведется с 11 до 19 часов.
                  </React.Fragment>
                }
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mt: 1, 
                    color: '#1976d2', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'inline-block'
                  }}
                >
                  Как проехать?
                </Typography>
              </HtmlTooltip>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      {/* Футер-предупреждение */}
      <Paper elevation={0} sx={{ p: 2, bgcolor: '#fbe9e7', borderRadius: 1 }}>
        <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
          <strong>Обратите внимание!</strong> При сборке изделий убедитесь в отсутствии трещин на стеклянных и зеркальных деталях.
        </Typography>
      </Paper>
    </Container>
  );
}