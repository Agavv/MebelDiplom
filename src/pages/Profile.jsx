import React from 'react';
import { Container, Typography, Paper, Grid, Avatar, Box } from '@mui/material';

export default function Profile() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Личный кабинет</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', textAlign: 'center', borderRadius: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: '#ff6b00' }}>U</Avatar>
            <Typography variant="h6">Покупатель</Typography>
            <Typography variant="body2" color="text.secondary">user@example.com</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>История заказов</Typography>
            <Typography variant="body2" color="text.secondary">У вас пока нет выполненных заказов.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}