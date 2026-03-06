import React from 'react';
import { 
  AppBar, Toolbar, Typography, Container, Box, Stack, 
  InputBase, Button, IconButton, Badge, Divider 
} from '@mui/material';
import { 
  Search, ShoppingCartOutlined, PersonOutline, 
  FavoriteBorder, BarChart, HomeOutlined, KeyboardArrowDown 
} from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#fff', color: '#000', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        
        {/* ВЕРХНИЙ РЯД: Лого, Поиск, Контакты, Иконки */}
        <Toolbar sx={{ justifyContent: 'space-between', py: 2, px: '0 !important' }}>
          
          {/* 1. Логотип */}
          <Box sx={{ minWidth: '180px' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-1px', mb: -0.5 }}>
              Best<Box component="span" sx={{ color: '#333' }}>Mebel</Box>
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '11px', color: '#777', display: 'block' }}>
              Мебель по вашим идеям
            </Typography>
          </Box>

          {/* 2. Поиск */}
          <Box sx={{ 
            flexGrow: 1, 
            mx: 4, 
            display: 'flex', 
            alignItems: 'center', 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            px: 2,
            maxWidth: '450px',
            height: '45px'
          }}>
            <InputBase 
              placeholder="Поиск среди 50 000 изделий" 
              sx={{ flex: 1, fontSize: '14px' }} 
            />
            <Search sx={{ color: '#ccc' }} />
          </Box>

          {/* 3. Информация и Контакты */}
          <Stack direction="row" spacing={3} alignItems="center" sx={{ mr: 3 }}>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                Москва <KeyboardArrowDown fontSize="small" />
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#777', borderBottom: '1px dotted #777' }}>
                Ежедневно с 09:00 до 23:00
              </Typography>
            </Box>
            
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                +7 (499) 110-71-09
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#777' }}>
                sale@bestmebelshop.ru
              </Typography>
            </Box>
          </Stack>

          {/* 4. Кнопка "Заказать звонок" */}
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#F5D066', 
              color: '#333', 
              boxShadow: 'none',
              borderRadius: '8px',
              px: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              mr: 2,
              '&:hover': { bgcolor: '#e5c056', boxShadow: 'none' }
            }}
          >
            Заказать звонок
          </Button>

          {/* 5. Иконки действий */}
          <Stack direction="row" spacing={0.5}>
            <IconButton><FavoriteBorder sx={{ color: '#333' }} /></IconButton>
            <IconButton><BarChart sx={{ color: '#333' }} /></IconButton>
            <IconButton><PersonOutline sx={{ color: '#333' }} /></IconButton>
            <IconButton>
              <Badge badgeContent={0} color="success" showZero>
                <ShoppingCartOutlined sx={{ color: '#333' }} />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </Container>

      {/* НИЖНИЙ РЯД: Навигация */}
      <Box sx={{ bgcolor: '#f9f9f9', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={4} sx={{ py: 1.5, alignItems: 'center' }}>
            <IconButton size="small" sx={{ color: '#ff6b00' }}>
              <HomeOutlined />
            </IconButton>
            {[
              'Каталог', 'О фабрике', 'Новости магазина', 'Оплата', 'Доставка', 
              'Сборка', 'Гарантия', 'Контакты', 'Вопрос-ответ', 'Сертификаты и дипломы', 'Статьи'
            ].map((text) => (
              <Typography 
                key={text} 
                variant="body2" 
                sx={{ 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  fontWeight: text === 'Акции' ? 'bold' : '500',
                  color: text === 'Акции' ? '#ff6b00' : '#333',
                  '&:hover': { color: '#ff6b00' }
                }}
              >
                {text === 'Акции' ? `% ${text}` : text}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;