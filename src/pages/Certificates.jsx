import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  Modal,
  IconButton,
  Fade,
  Stack
} from '@mui/material';
import {
  NavigateNext,
  Close,
  ZoomIn,
  MilitaryTech
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Данные (убедись, что пути к картинкам верные)
const awards = [
  { id: 1, img: '/src/assets/Awards/Awards1.jpg', title: 'Благодарственное письмо от администрации' },
  { id: 2, img: '/src/assets/Awards/Awards2.jpg', title: 'Признание стратегических партнеров' },
  { id: 3, img: '/src/assets/Awards/Awards3.jpg', title: 'За значительный вклад в развитие отрасли' },
  { id: 4, img: '/src/assets/Awards/Awards4.jpg', title: 'Почетная грамота за качество' },
  { id: 5, img: '/src/assets/Awards/Awards5.jpg', title: 'Диплом за лучший дизайн 2023' },
];

const certs = [
  { id: 1, img: '/src/assets/Certificates/Sertificat1.jpg', title: 'Сертификат соответствия ГОСТ' },
  { id: 2, img: '/src/assets/Certificates/Sertificat2.jpg', title: 'Экологический стандарт безопасности' },
  { id: 3, img: '/src/assets/Certificates/Sertificat3.jpg', title: 'Лицензия на производство мебели' },
  { id: 4, img: '/src/assets/Certificates/Sertificat4.jpg', title: 'Международный сертификат ISO 9001' },
  { id: 5, img: '/src/assets/Certificates/Sertificat5.jpg', title: 'Знак качества "Народная марка"' },
];

export default function Certificates() {
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const handleOpen = (img) => {
    setSelectedImg(img);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Внутренний компонент карточки для выравнивания в строку
  const DocumentCard = ({ item }) => (
    <Grid item xs={12} sm={6} md={2.4} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={0}
        onClick={() => handleOpen(item.img)}
        sx={{
          position: 'relative',
          cursor: 'pointer',
          borderRadius: 2,
          overflow: 'hidden',
          height: '280px', // Единая высота для всех рамок
          width: '100%',
          bgcolor: '#f5f5f5', // Фон для документов, которые меньше рамки
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #eee',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
            '& .overlay': { opacity: 1 },
          }
        }}
      >
        <Box
          component="img"
          src={item.img}
          alt={item.title}
          sx={{ 
            maxWidth: '90%', 
            maxHeight: '90%', 
            objectFit: 'contain', // Картинка не искажается
            filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))'
          }}
        />
        
        {/* Слой при наведении */}
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            bgcolor: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: 0, transition: 'opacity 0.3s'
          }}
        >
          <ZoomIn sx={{ color: '#fff', fontSize: 40 }} />
        </Box>
      </Paper>

      <Typography 
        variant="caption" 
        align="center" 
        sx={{ 
          display: 'block', 
          mt: 1.5, 
          px: 1,
          color: '#444', 
          fontWeight: 500,
          lineHeight: 1.3,
          minHeight: '3.2em', // Резервирует место под 2-3 строки текста
          overflow: 'hidden'
        }}
      >
        {item.title}
      </Typography>
    </Grid>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Хлебные крошки */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4, fontSize: '0.85rem' }}>
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
          Сертификаты и благодарности
        </Typography>
      </Breadcrumbs>

      {/* Заголовок страницы */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 6 }}>
        <Box 
          sx={{ 
            bgcolor: '#fff3e0', 
            p: 1.5, 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <MilitaryTech sx={{ fontSize: 40, color: '#ff9800' }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#222', letterSpacing: '-0.5px' }}>
            Качество и признание
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Официальные документы, подтверждающие надежность нашей компании
          </Typography>
        </Box>
      </Stack>

      {/* Секция Благодарности */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, position: 'relative', pl: 2, '&::before': { content: '""', position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', bgcolor: '#ff6b00', borderRadius: 2 } }}>
          Благодарственные письма
        </Typography>
        <Grid container spacing={3}>
          {awards.map((award) => (
            <DocumentCard key={award.id} item={award} />
          ))}
        </Grid>
      </Box>

      {/* Секция Сертификаты */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, position: 'relative', pl: 2, '&::before': { content: '""', position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', bgcolor: '#8bc34a', borderRadius: 2 } }}>
          Сертификаты соответствия
        </Typography>
        <Grid container spacing={3}>
          {certs.map((cert) => (
            <DocumentCard key={cert.id} item={cert} />
          ))}
        </Grid>
      </Box>

      {/* Модальное окно просмотра */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backdropFilter: 'blur(5px)' }}
      >
        <Fade in={open}>
          <Box sx={{ position: 'relative', outline: 'none', maxWidth: '90vw', maxHeight: '90vh' }}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                color: '#fff',
                bgcolor: '#ff6b00',
                boxShadow: 3,
                '&:hover': { bgcolor: '#e65100' },
                zIndex: 10
              }}
            >
              <Close />
            </IconButton>
            <Box
              component="img"
              src={selectedImg}
              sx={{
                width: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                bgcolor: '#fff'
              }}
            />
          </Box>
        </Fade>
      </Modal>

      {/* Нижний инфо-блок */}
      <Paper 
        elevation={0}
        sx={{ 
          mt: 8, p: 4, textAlign: 'center', 
          bgcolor: '#f9f9f9', borderRadius: 4,
          border: '1px dashed #ccc' 
        }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
          Мы дорожим своей репутацией и гарантируем, что вся продукция BestMebel соответствует строгим стандартам качества и экологической безопасности.
        </Typography>
      </Paper>
    </Container>
  );
}