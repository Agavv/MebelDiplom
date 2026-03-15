import React, { useState, useEffect } from 'react';
import {
  Container, Box, Typography, Tabs, Tab, Paper, Avatar,
  TextField, Button, Grid, Chip, Divider, CircularProgress,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Alert, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { Person, ShoppingBag, LocationOn, Edit, Logout, Add, Delete } from '@mui/icons-material';
import { useAuth } from '../contexts/useAuth';
import { getOrders, getAddresses, addAddress, deleteAddress, updateMe } from '../services/api';

const STATUS_COLORS = {
  'Новый': 'info', 'Обработка': 'warning', 'Отправлен': 'primary',
  'Доставлен': 'success', 'Отменён': 'error',
};

// Определяем отображаемое имя роли
function getRoleLabel(user) {
  if (!user) return '';
  // API возвращает roleId — Admin=1, User=2 (обычно, но проверяем по имени если есть)
  if (user.roleName)              return user.roleName;
  if (user.role?.roleName)        return user.role.roleName;
  if (user.roleId === 1)          return 'Администратор';
  if (user.roleId === 2)          return 'Покупатель';
  return 'Пользователь';
}

// ─── Форма входа/регистрации ─────────────────────────────
function AuthForms() {
  const { login, register } = useAuth();
  const [tab,     setTab]     = useState(0);
  const [form,    setForm]    = useState({ fullName: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      if (tab === 0) await login(form.email, form.password);
      else await register({ fullName: form.fullName, email: form.email, password: form.password, phoneNumber: form.phone });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const f = (field) => ({ value: form[field], onChange: (e) => setForm({ ...form, [field]: e.target.value }) });

  return (
    <Box sx={{ maxWidth: 420, mx: 'auto', mt: 6 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">Личный кабинет</Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 3 }}>
          <Tab label="Войти" /><Tab label="Регистрация" />
        </Tabs>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2}>
          {tab === 1 && <Grid item xs={12}><TextField fullWidth label="ФИО *" {...f('fullName')} /></Grid>}
          <Grid item xs={12}><TextField fullWidth label="Email *" type="email" {...f('email')} /></Grid>
          {tab === 1 && <Grid item xs={12}><TextField fullWidth label="Телефон" {...f('phone')} /></Grid>}
          <Grid item xs={12}><TextField fullWidth label="Пароль *" type="password" {...f('password')} /></Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" size="large" onClick={handleSubmit} disabled={loading}
              startIcon={loading && <CircularProgress size={18} color="inherit" />}>
              {tab === 0 ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

// ─── Вкладка «Профиль» ───────────────────────────────────
function TabProfile({ user, onSaved }) {
  const { logout } = useAuth();
  const [edit,    setEdit]    = useState(false);
  const [form,    setForm]    = useState({ fullName: user.fullName || '', phoneNumber: user.phoneNumber || '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const roleLabel = getRoleLabel(user);
  const isAdmin   = roleLabel === 'Администратор' || roleLabel === 'Admin';

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMe(form);
      setEdit(false); setSuccess(true);
      onSaved?.();
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) { alert('Ошибка: ' + e.message); }
    finally { setLoading(false); }
  };

  return (
    <Box>
      {success && <Alert severity="success" sx={{ mb: 3 }}>Данные сохранены!</Alert>}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
        <Avatar sx={{ width: 80, height: 80, bgcolor: isAdmin ? '#d32f2f' : 'primary.main', fontSize: 32 }}>
          {user.fullName?.[0]?.toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={700}>{user.fullName}</Typography>
          <Typography color="text.secondary">{user.email}</Typography>
          <Chip
            label={roleLabel}
            color={isAdmin ? 'error' : 'primary'}
            size="small" sx={{ mt: 0.5 }}
          />
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Личные данные</Typography>
          <Button startIcon={<Edit />} size="small" onClick={() => setEdit(!edit)}>
            {edit ? 'Отмена' : 'Редактировать'}
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="ФИО"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              disabled={!edit} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" value={user.email} disabled
              helperText="Для смены email свяжитесь с поддержкой" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Телефон"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              disabled={!edit} />
          </Grid>
        </Grid>
        {edit && (
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave} disabled={loading}>
            {loading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        )}
      </Paper>

      <Button startIcon={<Logout />} color="error" variant="outlined" onClick={logout} sx={{ mt: 3 }}>
        Выйти из аккаунта
      </Button>
    </Box>
  );
}

// ─── Вкладка «Заказы» ────────────────────────────────────
function TabOrders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getOrders().then(setOrders).finally(() => setLoading(false)); }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>;
  if (!orders.length) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <ShoppingBag sx={{ fontSize: 64, color: '#ddd' }} />
      <Typography variant="h6" mt={2} color="text.secondary">У вас пока нет заказов</Typography>
      <Button variant="contained" href="/catalog" sx={{ mt: 3 }}>Перейти в каталог</Button>
    </Box>
  );

  return (
    <Box>
      {[...orders].reverse().map((order) => (
        <Paper key={order.id} variant="outlined" sx={{ p: 3, mb: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography fontWeight={700}>Заказ №{order.id}</Typography>
            <Chip label={order.statusName || 'Новый'} color={STATUS_COLORS[order.statusName] || 'default'} size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {new Date(order.orderDate).toLocaleString('ru-RU')}
          </Typography>
          {order.items?.map((item) => (
            <Box key={item.productId} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography variant="body2">{item.name || `Товар #${item.productId}`} × {item.quantity}</Typography>
              <Typography variant="body2" fontWeight={600}>{(item.priceAtPurchase * item.quantity).toLocaleString()} ₽</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {order.address ? `${order.address.city}, ${order.address.street}` : ''}
            </Typography>
            <Typography fontWeight={700} color="error">{order.totalAmount?.toLocaleString()} ₽</Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}

// ─── Вкладка «Адреса» ────────────────────────────────────
function TabAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [open,      setOpen]      = useState(false);
  const [form,      setForm]      = useState({ country: 'Россия', city: '', street: '', postalCode: '' });
  const [saving,    setSaving]    = useState(false);

  const load = () => getAddresses().then(setAddresses).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    setSaving(true);
    try { await addAddress(form); setOpen(false); setForm({ country: 'Россия', city: '', street: '', postalCode: '' }); load(); }
    catch (e) { alert(e.message); }
    finally { setSaving(false); }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Button startIcon={<Add />} variant="outlined" onClick={() => setOpen(true)} sx={{ mb: 3 }}>
        Добавить адрес
      </Button>
      {!addresses.length
        ? <Typography color="text.secondary">Нет сохранённых адресов</Typography>
        : <List>{addresses.map(addr => (
            <Paper key={addr.id} variant="outlined" sx={{ mb: 1.5 }}>
              <ListItem>
                <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
                <ListItemText
                  primary={`${addr.city}, ${addr.street}`}
                  secondary={`${addr.country}${addr.postalCode ? ', ' + addr.postalCode : ''}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="error" onClick={async () => { await deleteAddress(addr.id); load(); }}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}</List>}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Новый адрес</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Страна" value={form.country} onChange={e => setForm({...form, country: e.target.value})} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Город *" value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="Улица, дом, квартира *" value={form.street} onChange={e => setForm({...form, street: e.target.value})} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Индекс" value={form.postalCode} onChange={e => setForm({...form, postalCode: e.target.value})} /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={handleAdd} disabled={saving || !form.city || !form.street}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ════════════════════════════════════════════════════
export default function Profile() {
  const { user, loading, refreshUser } = useAuth();
  const [tab, setTab] = useState(0);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  if (!user)   return <Container maxWidth="lg" sx={{ py: 4 }}><AuthForms /></Container>;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>Личный кабинет</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} orientation="vertical"
              sx={{ '& .MuiTab-root': { alignItems: 'flex-start', textAlign: 'left', px: 3, py: 2 } }}>
              <Tab label="Профиль"  icon={<Person />}      iconPosition="start" />
              <Tab label="Заказы"   icon={<ShoppingBag />}  iconPosition="start" />
              <Tab label="Адреса"   icon={<LocationOn />}   iconPosition="start" />
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 4, borderRadius: 2, minHeight: 400 }}>
            {tab === 0 && <TabProfile user={user} onSaved={refreshUser} />}
            {tab === 1 && <TabOrders />}
            {tab === 2 && <TabAddresses />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
