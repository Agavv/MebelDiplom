import React, { useContext } from 'react';
import { 
  AppBar, Toolbar, Typography, Container, Box, Stack, 
  InputBase, Button, IconButton, Badge 
} from '@mui/material';
import { 
  Search, ShoppingCartOutlined, PersonOutline, 
  FavoriteBorder, BarChart, HomeOutlined 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { ShopContext } from '../../contexts/ShopContext';   // ← ДОБАВИЛ

const Header = () => {
  const { cart, favorites } = useContext(ShopContext);   // ← ДОБАВИЛ ЭТУ СТРОКУ

  return (
    <AppBar position="static" sx={{ bgcolor: '#fff', color: '#000', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        
        <Toolbar sx={{ justifyContent: 'space-between', py: 2, px: '0 !important' }}>
          
          {/* Логотип */}
          <Box component={Link} to="/" sx={{ minWidth: '180px', textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-1px', mb: -0.5 }}>
              Best<Box component="span" sx={{ color: '#333' }}>Mebel</Box>
            </Typography>
            <Typography variant="caption" sx={{ fontSize: '11px', color: '#777', display: 'block' }}>
              Мебель по вашим идеям
            </Typography>
          </Box>

          {/* Поиск */}
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
              placeholder="Поиск среди 500 изделий" 
              sx={{ flex: 1, fontSize: '14px' }} 
            />
            <Search sx={{ color: '#ccc' }} />
          </Box>

          {/* Информация и Контакты */}
          <Stack direction="row" spacing={3} alignItems="center" sx={{ mr: 3 }}>
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                Москва 
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#777', borderBottom: '1px dotted #777' }}>
                Ежедневно с 09:00 до 23:00
              </Typography>
            </Box>
            
            <Box>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                +7 (999) 555-22-11
              </Typography>
              <Typography sx={{ fontSize: '11px', color: '#777' }}>
                sale@bestmebelshop.ru
              </Typography>
            </Box>
          </Stack>

          {/* Кнопка "Заказать звонок" */}
          <Button 
            component={Link}
            to="/contacts"
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

          {/* Иконки действий с роутингом */}
          <Stack direction="row" spacing={0.5}>
            <IconButton component={Link} to="/favorites">
              <Badge badgeContent={favorites.length} color="error" showZero>
                <FavoriteBorder sx={{ color: '#333' }} />
              </Badge>
            </IconButton>
            
            <IconButton component={Link} to="/comparison">
              <BarChart sx={{ color: '#333' }} />
            </IconButton>
            
            <IconButton component={Link} to="/profile">
              <PersonOutline sx={{ color: '#333' }} />
            </IconButton>
            
            <IconButton component={Link} to="/cart">
              <Badge 
                badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} 
                color="success" 
                showZero
              >
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
            
            {/* Домик теперь ведет в каталог */}
            <IconButton 
              component={Link} 
              to="/catalog" 
              size="small" 
              sx={{ color: '#ff6b00' }}
            >
              <HomeOutlined />
            </IconButton>

            {[
              { text: 'Каталог', path: '/catalog' },
              { text: 'Новости магазина', path: '/news' },
              { text: 'Оплата', path: '/payment' },
              { text: 'Доставка', path: '/delivery' },
              { text: 'Гарантия', path: '/warranty' },
              { text: 'Контакты', path: '/contacts' },
              { text: 'Вопрос-ответ', path: '/faq' },
              { text: 'Сертификаты и благодарности', path: '/certificates' },
            ].map(({ text, path }) => (
              <Link
                key={text}
                to={path}
                style={{ textDecoration: 'none' }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontSize: '14px',
                    fontWeight: text === 'Сертификаты и благодарности' ? 'bold' : '500',
                    color: text === 'Сертификаты и благодарности' ? '#000' : '#333',
                    '&:hover': { color: '#ff6b00' }
                  }}
                >
                  {text}
                </Typography>
              </Link>
            ))}
          </Stack>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;