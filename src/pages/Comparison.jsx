import React from 'react';
import { 
  Container, Typography, Box, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, IconButton 
} from '@mui/material';
import { BarChart, DeleteOutline, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Comparison() {
  // Заглушка данных (позже заменим на реальный стейт)
  const items = []; 

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
        Сравнение товаров
      </Typography>

      {items.length > 0 ? (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f9f9f9' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Характеристики</TableCell>
                {/* Здесь будут колонки с товарами */}
                <TableCell align="center">Товар 1</TableCell>
                <TableCell align="center">Товар 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Материал</TableCell>
                <TableCell align="center">МДФ</TableCell>
                <TableCell align="center">ЛДСП</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Цена</TableCell>
                <TableCell align="center">15 000 ₽</TableCell>
                <TableCell align="center">12 000 ₽</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ py: 10, textAlign: 'center', bgcolor: '#fafafa', borderRadius: 4 }}>
          <BarChart sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Список сравнения пока пуст
          </Typography>
          <Button 
            component={Link} 
            to="/catalog" 
            variant="outlined" 
            sx={{ color: '#ff6b00', borderColor: '#ff6b00', '&:hover': { borderColor: '#e65100' } }}
          >
            Добавить товары для сравнения
          </Button>
        </Box>
      )}
    </Container>
  );
}