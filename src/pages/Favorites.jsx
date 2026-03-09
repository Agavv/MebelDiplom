import React from 'react';
import { Container, Typography, Stack, Box } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

export default function Favorites() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>Избранное</Typography>
      <Stack alignItems="center" spacing={2} sx={{ mt: 10, opacity: 0.5 }}>
        <FavoriteBorder sx={{ fontSize: 80 }} />
        <Typography variant="h6">Вы еще ничего не добавили в избранное</Typography>
      </Stack>
    </Container>
  );
}