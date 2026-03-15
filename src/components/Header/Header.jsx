import React, { useContext, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, Stack,
  InputBase, Button, IconButton, Badge
} from '@mui/material';
import {
  Search, ShoppingCartOutlined, PersonOutline,
  FavoriteBorder, BarChart, HomeOutlined
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';
import CallbackModal from '../CallbackModal/CallbackModal';

const Header = () => {
  const { cart, favorites, comparison } = useContext(ShopContext);
  const navigate = useNavigate();
  const [searchValue,   setSearchValue]   = useState('');
  const [callbackOpen, setCallbackOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };

  return (
    <>
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
            <Box
              component="form" onSubmit={handleSearch}
              sx={{
                flexGrow: 1, mx: 4, display: 'flex', alignItems: 'center',
                border: '1px solid #e0e0e0', borderRadius: '8px', px: 2,
                maxWidth: '450px', height: '45px',
                '&:focus-within': { borderColor: '#1976d2', boxShadow: '0 0 0 2px rgba(25,118,210,0.15)' },
                transition: 'all 0.2s',
              }}
            >
              <InputBase
                placeholder="Поиск среди товаров"
                sx={{ flex: 1, fontSize: '14px' }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <IconButton type="submit" size="small" sx={{ color: '#aaa', '&:hover': { color: '#1976d2' } }}>
                <Search />
              </IconButton>
            </Box>

            {/* Контакты */}
            <Stack direction="row" spacing={3} alignItems="center" sx={{ mr: 1.5 }}>
              <Box>
                <Typography sx={{ fontSize: '16', fontWeight: 'bold' }}>Москва</Typography>
                <Typography sx={{ fontSize: '12px', color: '#777', borderBottom: '1px dotted #777' }}>
                  Ежедневно с 09:00 до 23:00
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>+7 (999) 555-22-11</Typography>
                <Typography sx={{ fontSize: '12px', color: '#777' }}>sale@bestmebelshop.ru</Typography>
              </Box>
            </Stack>

            {/* Иконки */}
            <Stack direction="row" spacing={1}>
              <IconButton component={Link} to="/favorites">
                <Badge badgeContent={favorites.length} color="error" showZero>
                  <FavoriteBorder sx={{ color: '#333' }} />
                </Badge>
              </IconButton>

              <IconButton component={Link} to="/comparison">
                <Badge badgeContent={comparison.length} color="primary" showZero>
                  <BarChart sx={{ color: '#333' }} />
                </Badge>
              </IconButton>

              <IconButton component={Link} to="/profile">
                <PersonOutline sx={{ color: '#333' }} />
              </IconButton>

              <IconButton component={Link} to="/cart">
                <Badge
                  badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)}
                  color="success" showZero
                >
                  <ShoppingCartOutlined sx={{ color: '#333' }} />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>

        {/* Нижняя навигация */}
        <Box sx={{ bgcolor: '#f9f9f9', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
          <Container maxWidth="xl">
            <Stack direction="row" spacing={4} sx={{ py: 1.5, alignItems: 'center' }}>
              <IconButton component={Link} to="/catalog" size="small" sx={{ color: '#ff6b00' }}>
                <HomeOutlined />
              </IconButton>
              {[
                { text: 'Каталог',                    path: '/catalog' },
                { text: 'Новости магазина',            path: '/news' },
                { text: 'Оплата',                      path: '/payment' },
                { text: 'Доставка',                    path: '/delivery' },
                { text: 'Гарантия',                    path: '/warranty' },
                { text: 'Контакты',                    path: '/contacts' },
                { text: 'Вопрос-ответ',                path: '/faq' },
                { text: 'Сертификаты и благодарности', path: '/certificates' },
              ].map(({ text, path }) => (
                <Link key={text} to={path} style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500, color: '#333', '&:hover': { color: '#ff6b00' } }}>
                    {text}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Container>
        </Box>
      </AppBar>

      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />
    </>
  );
};

export default Header;
