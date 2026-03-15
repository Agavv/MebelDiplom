import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, MenuItem, Select, FormControl,
  InputLabel, Box, Typography, IconButton, InputAdornment,
  Alert, CircularProgress,
} from '@mui/material';
import { Close, Phone } from '@mui/icons-material';

// Простой математический каптча (без бэкенда)
function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const ops = [
    { text: `${a} + ${b}`, answer: a + b },
    { text: `${a + b} - ${b}`, answer: a },
    { text: `${a} × ${b <= 5 ? b : 2}`, answer: a * (b <= 5 ? b : 2) },
  ];
  return ops[Math.floor(Math.random() * ops.length)];
}

const DEPARTMENTS = [
  'Отдел продаж',
  'Отдел доставки',
  'Сервисный центр',
  'Бухгалтерия',
  'Общие вопросы',
];

export default function CallbackModal({ open, onClose }) {
  const [form, setForm]       = useState({ name: '', phone: '+7 (___) ___-__-__', date: '', hours: '', minutes: '', message: '', department: '', captchaInput: '' });
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef             = useRef(null);

  // Рисуем каптчу на canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas  = canvasRef.current;
    const ctx     = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Фон
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Шум — случайные линии
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${Math.random()*360},60%,70%)`;
      ctx.lineWidth   = 1;
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Текст
    const chars = (captcha.text + ' = ?').split('');
    chars.forEach((ch, i) => {
      ctx.save();
      ctx.font          = `bold ${22 + Math.random()*6}px monospace`;
      ctx.fillStyle     = `hsl(${Math.random()*360},70%,35%)`;
      ctx.translate(14 + i * 18, 28 + (Math.random() - 0.5) * 8);
      ctx.rotate((Math.random() - 0.5) * 0.3);
      ctx.fillText(ch, 0, 0);
      ctx.restore();
    });
  }, [captcha, open]);

  const f = (field) => ({
    value: form[field],
    onChange: (e) => setForm({ ...form, [field]: e.target.value }),
  });

  const handlePhoneInput = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('7')) val = val.slice(1);
    if (val.startsWith('8')) val = val.slice(1);
    val = val.slice(0, 10);
    let formatted = '+7 (';
    if (val.length > 0) formatted += val.slice(0, 3);
    if (val.length >= 3) formatted += ') ' + val.slice(3, 6);
    if (val.length >= 6) formatted += '-' + val.slice(6, 8);
    if (val.length >= 8) formatted += '-' + val.slice(8, 10);
    setForm({ ...form, phone: formatted });
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.name.trim())    return setError('Введите ваше имя');
    if (form.phone.replace(/\D/g, '').length < 11) return setError('Введите корректный телефон');
    if (!form.department)     return setError('Выберите отдел');
    if (parseInt(form.captchaInput) !== captcha.answer)
      return setError('Неверный ответ на вопрос. Попробуйте ещё раз.');

    setLoading(true);
    // Имитация отправки (потом подключишь реальный endpoint)
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setForm({ name: '', phone: '+7', date: '', hours: '', minutes: '', message: '', department: '', captchaInput: '' });
      setCaptcha(generateCaptcha());
    }, 2500);
  };

  const hoursOptions   = Array.from({ length: 14 }, (_, i) => String(9 + i).padStart(2, '0'));
  const minutesOptions = ['00', '15', '30', '45'];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ pr: 6, fontWeight: 700, fontSize: '1.1rem' }}>
        Заказ звонка
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {success ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Phone sx={{ fontSize: 64, color: 'success.main' }} />
            <Typography variant="h6" mt={2} fontWeight={700}>Заявка принята!</Typography>
            <Typography color="text.secondary" mt={1}>
              Мы перезвоним вам в ближайшее время
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ pt: 1 }}>
            {error && (
              <Grid item xs={12}>
                <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField fullWidth label="Ваше имя" size="small" {...f('name')} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth label="Ваш телефон" size="small"
                value={form.phone}
                onChange={handlePhoneInput}
                InputProps={{ startAdornment: <InputAdornment position="start"><Phone sx={{ fontSize: 18, color: '#aaa' }} /></InputAdornment> }}
              />
            </Grid>

            {/* Удобное время */}
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Удобное время для звонка
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small" type="date" sx={{ flex: 2 }}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: new Date().toISOString().split('T')[0] }}
                />
                <FormControl size="small" sx={{ flex: 1 }}>
                  <InputLabel>Час</InputLabel>
                  <Select label="Час" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })}>
                    {hoursOptions.map(h => <MenuItem key={h} value={h}>{h}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ flex: 1 }}>
                  <InputLabel>Мин</InputLabel>
                  <Select label="Мин" value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })}>
                    {minutesOptions.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Сообщение" size="small" multiline rows={2} {...f('message')} />
            </Grid>

            {/* Каптча */}
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                Введите ответ на пример
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Box
                  sx={{ border: '1px solid #ddd', borderRadius: 1, overflow: 'hidden', cursor: 'pointer', flexShrink: 0 }}
                  onClick={() => { setCaptcha(generateCaptcha()); setForm(f => ({ ...f, captchaInput: '' })); }}
                  title="Обновить пример"
                >
                  <canvas ref={canvasRef} width={160} height={44} />
                </Box>
                <TextField
                  size="small" sx={{ flex: 1 }}
                  placeholder="Ответ"
                  value={form.captchaInput}
                  onChange={(e) => setForm({ ...form, captchaInput: e.target.value })}
                  type="number"
                />
              </Box>
              <Typography variant="caption" color="text.secondary">
                Нажмите на пример чтобы обновить
              </Typography>
            </Grid>

            {/* Отдел */}
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Выберите отдел</InputLabel>
                <Select label="Выберите отдел" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                  {DEPARTMENTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ px: 3, pb: 2, flexDirection: 'column', gap: 1 }}>
          <Button
            fullWidth variant="contained" size="large"
            onClick={handleSubmit} disabled={loading}
            sx={{ bgcolor: '#F5D066', color: '#333', fontWeight: 700, '&:hover': { bgcolor: '#e5c056' }, boxShadow: 'none' }}
            startIcon={loading && <CircularProgress size={18} color="inherit" />}
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </Button>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            Нажимая на кнопку «Отправить», вы соглашаетесь с условиями{' '}
            <Box component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
              обработки персональных данных
            </Box>{' '}
            и политикой конфиденциальности
          </Typography>
        </DialogActions>
      )}
    </Dialog>
  );
}
