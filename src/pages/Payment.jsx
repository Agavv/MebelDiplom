import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Stack, 
  IconButton, 
  Breadcrumbs, // Добавлено
  Link        // Добавлено
} from '@mui/material';
import { 
  CreditCard, 
  Payments, 
  QrCode, 
  DeliveryDining, 
  NavigateNext // Добавлено для разделителя
} from '@mui/icons-material';

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 'card',
      title: 'Банковской картой',
      icon: <CreditCard sx={{ color: '#4caf50', fontSize: 40 }} />,
      description: 'Оплата банковской картой осуществляется онлайн через безопасный платежный шлюз. Поддерживаются карты Visa, MasterCard и Мир. Просто введите данные карты на странице оформления заказа и подтвердите платеж.'
    },
    {
      id: 'cash',
      title: 'Оплата наличными при получении',
      icon: <Payments sx={{ color: '#ff9800', fontSize: 40 }} />,
      description: 'Оплата наличными при получении - это самый простой и удобный способ расчета. Данный вид оплаты доступен для всех заказов и не требует никакой дополнительной информации. Просто оплатите заказ наличными при получении и наслаждайтесь покупкой.'
    },
    {
      id: 'sbp',
      title: 'СБП',
      icon: <QrCode sx={{ color: '#2196f3', fontSize: 40 }} />,
      description: 'Оплата через СБП осуществляется как из личного кабинета, так и со страницы подтверждения заказа. Просто выберите способ оплаты "Оплата СБП" и нажав кнопку "Получить QR-код", наведите камеру на QR-код и подтвердите операцию.'
    }
  ];

  const toggleDescription = (id) => {
    setSelectedMethod(selectedMethod === id ? null : id);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      
      {/* Хлебные крошки */}
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
          Оплата
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 4, textAlign: 'left', fontWeight: 'bold', color: '#333' }}>
        Способы оплаты
      </Typography>

      {/* Мини-карточки методов */}
      <Stack spacing={2}>
        {paymentMethods.map((method) => (
          <Paper
            key={method.id}
            elevation={0} // Поставил 0 и добавил границу, чтобы было в стиле других страниц
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderRadius: 2,
              cursor: 'pointer',
              border: '1px solid #eee',
              transition: 'all 0.3s ease',
              '&:hover': { 
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
                bgcolor: '#fcfcfc',
                borderColor: '#ff6b00' // Оранжевый акцент при наведении
              }
            }}
            onClick={() => toggleDescription(method.id)}
          >
            <Box sx={{ mr: 2, display: 'flex' }}>{method.icon}</Box>
            <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 600 }}>
              {method.title}
            </Typography>
            <Typography variant="h6" sx={{ color: '#ccc', fontWeight: 300 }}>
              {selectedMethod === method.id ? '−' : '+'}
            </Typography>
          </Paper>
        ))}
      </Stack>

      {/* Описание выбранного метода */}
      {selectedMethod && (
        <Box 
          sx={{ 
            mt: 2, 
            p: 3, 
            bgcolor: '#f5f5f5', 
            borderRadius: 2, 
            borderLeft: '4px solid #ff6b00',
            animation: 'fadeIn 0.4s ease' // Небольшая анимация появления
          }}
        >
          <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.7 }}>
            {paymentMethods.find(m => m.id === selectedMethod)?.description}
          </Typography>
        </Box>
      )}

      {/* Блок о доставке внизу */}
      <Box 
        sx={{ 
          mt: 6, 
          p: 3, 
          bgcolor: '#fff9c4', 
          borderRadius: 2, 
          display: 'flex', 
          alignItems: 'center',
          border: '1px dashed #fbc02d'
        }}
      >
        <DeliveryDining sx={{ mr: 2, color: '#ff6b00', fontSize: 40 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          Бесплатная доставка! Доставка мебели за 3 дня!
        </Typography>
      </Box>

      {/* CSS для анимации */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Container>
 
);
}