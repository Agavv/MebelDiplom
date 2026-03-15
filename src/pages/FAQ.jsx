import React from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,
  Link,
  Stack,
  Paper,
  Button
} from '@mui/material';
import {
  ExpandMore,
  NavigateNext,
  QuestionAnswer,
  SupportAgent,
  LocalPhone
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const faqData = [
  {
    id: 'panel1',
    question: 'Как оформить заказ на индивидуальный проект?',
    answer: 'Вы можете оставить заявку через кнопку "Заказать звонок" в шапке сайта или вызвать замерщика на дом. Наш специалист приедет с образцами материалов, сделает точные замеры и составит 3D-проект вашей будущей мебели.'
  },
  {
    id: 'panel2',
    question: 'Каковы сроки изготовления мебели?',
    answer: 'Стандартный срок изготовления составляет от 5 до 14 рабочих дней в зависимости от сложности конструкции и наличия выбранных материалов на складе.'
  },
  {
    id: 'panel3',
    question: 'Предоставляется ли гарантия на изделия?',
    answer: 'Да, мы предоставляем официальную гарантию 18 месяцев на всю корпусную мебель и 12 месяцев на фурнитуру. Все сертификаты качества вы можете найти в соответствующем разделе нашего сайта.'
  },
  {
    id: 'panel4',
    question: 'Возможна ли сборка в день доставки?',
    answer: 'Мы стараемся планировать сборку на день доставки, если заказ не слишком объемный. Для сложных гарнитуров сборка может быть назначена на следующий день после разгрузки.'
  },
  {
    id: 'panel5',
    question: 'Как осуществляется оплата?',
    answer: 'Мы принимаем оплату наличными, банковскими картами, а также по СБП.'
  },
  {
    id: 'panel6',
    question: 'Можно ли изменить размеры модели из каталога?',
    answer: 'Конечно! Любую модель из нашего каталога можно адаптировать под ваши размеры, изменить цвет фасадов, корпуса или выбрать другую фурнитуру.'
  }
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
      {/* Навигация */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 4, fontSize: '0.85rem' }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Главная
        </Link>
        <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>Вопрос-ответ</Typography>
      </Breadcrumbs>

      {/* Заголовок */}
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 6 }}>
        <Box sx={{ bgcolor: '#e8f5e9', p: 1.5, borderRadius: '50%', display: 'flex' }}>
          <QuestionAnswer sx={{ fontSize: 35, color: '#4caf50' }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#222' }}>
            Часто задаваемые вопросы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Мы собрали ответы на самые популярные вопросы наших клиентов
          </Typography>
        </Box>
      </Stack>

      {/* Список вопросов */}
      <Box sx={{ mb: 8 }}>
        {faqData.map((item) => (
          <Accordion 
            key={item.id} 
            expanded={expanded === item.id} 
            onChange={handleChange(item.id)}
            sx={{ 
              mb: 1.5, 
              boxShadow: 'none', 
              border: '1px solid #eee',
              '&:before': { display: 'none' }, // Убирает стандартную линию MUI
              borderRadius: '8px !important',
              overflow: 'hidden',
              '&.Mui-expanded': {
                border: '1px solid #ff6b00',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ color: expanded === item.id ? '#ff6b00' : 'inherit' }} />}
              sx={{ py: 1 }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '1.05rem', color: expanded === item.id ? '#ff6b00' : '#333' }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#fafafa', borderTop: '1px solid #eee', py: 3 }}>
              <Typography sx={{ color: '#555', lineHeight: 1.7 }}>
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Обратная связь если не нашли ответ */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          bgcolor: '#f1f8e9', 
          borderRadius: 4, 
          textAlign: 'center',
          border: '1px solid #c8e6c9'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Не нашли ответ на свой вопрос?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Наши техподдержка с радостью поможет вам, пишите на нашу почту sale@bestmebelshop.ru
        </Typography>
      </Paper>
    </Container>
  );
}