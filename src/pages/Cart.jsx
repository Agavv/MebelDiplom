import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Box, Typography, Button, Divider, IconButton,
  TextField, FormControl, InputLabel, Select, MenuItem,
  Stepper, Step, StepLabel, Paper, Grid, Chip, Alert,
  RadioGroup, FormControlLabel, Radio, CircularProgress,
} from '@mui/material';
import {
  Delete, ArrowBack, ArrowForward, CheckCircle,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { ShopContext } from '../contexts/ShopContext';
import { useAuth } from '../contexts/useAuth';
import { createOrder, DELIVERY_METHODS, PAYMENT_METHODS } from '../services/api';

const STEPS = ['Корзина', 'Доставка', 'Оплата и подтверждение'];

// ─── Шаг 1: Список товаров ───────────────────────────────
function StepCart({ cart, updateQuantity, removeFromCart, onNext }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <ShoppingCartOutlined sx={{ fontSize: 72, color: '#ddd' }} />
        <Typography variant="h6" mt={2} color="text.secondary">
          Корзина пуста
        </Typography>
        <Button variant="contained" href="/catalog" sx={{ mt: 3 }}>
          Перейти в каталог
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {cart.map((item) => (
        <Paper key={item.id} variant="outlined" sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={item.image || item.images?.[0]}
            alt={item.name}
            sx={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 2, flexShrink: 0 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography fontWeight={600}>{item.name}</Typography>
            {item.material && (
              <Typography variant="body2" color="text.secondary">{item.material}</Typography>
            )}
            <Typography color="error" fontWeight={700} mt={0.5}>
              {item.price.toLocaleString()} ₽
            </Typography>
          </Box>

          {/* Счётчик */}
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 2, overflow: 'hidden' }}>
            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</IconButton>
            <Typography sx={{ px: 2, fontWeight: 600 }}>{item.quantity}</Typography>
            <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</IconButton>
          </Box>

          <Typography fontWeight={700} sx={{ minWidth: 100, textAlign: 'right' }}>
            {(item.price * item.quantity).toLocaleString()} ₽
          </Typography>

          <IconButton color="error" onClick={() => removeFromCart(item.id)}>
            <Delete />
          </IconButton>
        </Paper>
      ))}

      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Итого: <strong>{subtotal.toLocaleString()} ₽</strong>
        </Typography>
        <Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={onNext}>
          Оформить заказ
        </Button>
      </Box>
    </Box>
  );
}

// ─── Шаг 2: Доставка ─────────────────────────────────────
function StepDelivery({ form, setForm, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.fullName?.trim())    e.fullName    = 'Укажите ФИО';
    if (!form.phone?.trim())       e.phone       = 'Укажите телефон';
    if (!form.city?.trim())        e.city        = 'Укажите город';
    if (!form.street?.trim())      e.street      = 'Укажите улицу и дом';
    if (!form.deliveryMethodId)    e.delivery    = 'Выберите способ доставки';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };

  const delivery = DELIVERY_METHODS.find((d) => d.id === form.deliveryMethodId);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Typography variant="h6" mb={2}>Контактные данные</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="ФИО *" value={form.fullName || ''}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              error={!!errors.fullName} helperText={errors.fullName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Телефон *" value={form.phone || ''}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              error={!!errors.phone} helperText={errors.phone} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Email" value={form.email || ''}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Grid>
        </Grid>

        <Typography variant="h6" mt={4} mb={2}>Адрес доставки</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Страна" value={form.country || 'Россия'}
              onChange={(e) => setForm({ ...form, country: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Город *" value={form.city || ''}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              error={!!errors.city} helperText={errors.city} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Улица, дом, квартира *" value={form.street || ''}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              error={!!errors.street} helperText={errors.street} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Почтовый индекс" value={form.postalCode || ''}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={5}>
        <Typography variant="h6" mb={2}>Способ доставки</Typography>
        {errors.delivery && <Alert severity="error" sx={{ mb: 2 }}>{errors.delivery}</Alert>}
        <RadioGroup
          value={form.deliveryMethodId || ''}
          onChange={(e) => setForm({ ...form, deliveryMethodId: Number(e.target.value) })}
        >
          {DELIVERY_METHODS.map((d) => (
            <Paper key={d.id} variant="outlined"
              sx={{ p: 2, mb: 1.5, cursor: 'pointer', borderColor: form.deliveryMethodId === d.id ? 'primary.main' : '#e0e0e0' }}
              onClick={() => setForm({ ...form, deliveryMethodId: d.id })}
            >
              <FormControlLabel
                value={d.id}
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Typography>{d.name}</Typography>
                    <Chip label={d.price === 0 ? 'Бесплатно' : `${d.price} ₽`}
                      color={d.price === 0 ? 'success' : 'default'} size="small" />
                  </Box>
                }
                sx={{ width: '100%', m: 0 }}
              />
            </Paper>
          ))}
        </RadioGroup>

        {delivery && delivery.price > 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Стоимость доставки: <strong>{delivery.price} ₽</strong>
          </Alert>
        )}
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button startIcon={<ArrowBack />} onClick={onBack}>Назад</Button>
          <Button variant="contained" size="large" endIcon={<ArrowForward />} onClick={handleNext}>
            Перейти к оплате
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

// ─── Шаг 3: Оплата + подтверждение ───────────────────────
function StepPayment({ form, setForm, cart, onBack, onSubmit, submitting }) {
  const delivery  = DELIVERY_METHODS.find((d) => d.id === form.deliveryMethodId);
  const subtotal  = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total     = subtotal + (delivery?.price || 0);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Typography variant="h6" mb={2}>Способ оплаты</Typography>
        <RadioGroup
          value={form.paymentMethodId || ''}
          onChange={(e) => setForm({ ...form, paymentMethodId: Number(e.target.value) })}
        >
          {PAYMENT_METHODS.map((p) => (
            <Paper key={p.id} variant="outlined"
              sx={{ p: 2, mb: 1.5, cursor: 'pointer', borderColor: form.paymentMethodId === p.id ? 'primary.main' : '#e0e0e0' }}
              onClick={() => setForm({ ...form, paymentMethodId: p.id })}
            >
              <FormControlLabel value={p.id} control={<Radio />} label={p.name} sx={{ m: 0 }} />
            </Paper>
          ))}
        </RadioGroup>

        <TextField
          fullWidth multiline rows={3} label="Комментарий к заказу (необязательно)"
          value={form.comment || ''}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          sx={{ mt: 3 }}
        />
      </Grid>

      <Grid item xs={12} md={5}>
        <Paper sx={{ p: 3, bgcolor: '#f9f9f9' }}>
          <Typography variant="h6" mb={2}>Итог заказа</Typography>
          {cart.map((item) => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" sx={{ flex: 1, mr: 1 }}>
                {item.name} × {item.quantity}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {(item.price * item.quantity).toLocaleString()} ₽
              </Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Товары</Typography>
            <Typography variant="body2">{subtotal.toLocaleString()} ₽</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2">Доставка ({delivery?.name})</Typography>
            <Typography variant="body2">
              {delivery?.price === 0 ? 'Бесплатно' : `${delivery?.price} ₽`}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight={700} variant="h6">Итого</Typography>
            <Typography fontWeight={700} variant="h6" color="error">
              {total.toLocaleString()} ₽
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Адрес: {form.city}, {form.street}
          </Typography>
          <br />
          <Typography variant="caption" color="text.secondary">
            Получатель: {form.fullName}, {form.phone}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
          <Button startIcon={<ArrowBack />} onClick={onBack} disabled={submitting}>Назад</Button>
          <Button
            variant="contained" size="large" color="success"
            onClick={onSubmit} disabled={submitting || !form.paymentMethodId}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <CheckCircle />}
          >
            {submitting ? 'Оформляем...' : 'Подтвердить заказ'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

// ─── Шаг 4: Успех ────────────────────────────────────────
function StepSuccess({ orderId }) {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <CheckCircle sx={{ fontSize: 80, color: 'success.main' }} />
      <Typography variant="h5" fontWeight={700} mt={3}>
        Заказ №{orderId} оформлен!
      </Typography>
      <Typography color="text.secondary" mt={1} mb={4}>
        Мы свяжемся с вами в ближайшее время для подтверждения
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined" href="/profile">Мои заказы</Button>
        <Button variant="contained" href="/catalog">Продолжить покупки</Button>
      </Box>
    </Box>
  );
}

// ════════════════════════════════════════════════════
//  ГЛАВНЫЙ КОМПОНЕНТ
// ════════════════════════════════════════════════════
export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart } = useContext(ShopContext);
  const { user } = useAuth();

  const [step,       setStep]       = useState(0);
  const [form,       setForm]       = useState({
    fullName:         user?.fullName || '',
    phone:            user?.phoneNumber || '',
    email:            user?.email || '',
    country:          'Россия',
    city:             '',
    street:           '',
    postalCode:       '',
    deliveryMethodId: null,
    paymentMethodId:  null,
    comment:          '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderId,    setOrderId]    = useState(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const delivery = DELIVERY_METHODS.find((d) => d.id === form.deliveryMethodId);
      const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
      const order = await createOrder({
        items: cart.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
          priceAtPurchase: i.price,
        })),
        deliveryMethodId: form.deliveryMethodId,
        paymentMethodId:  form.paymentMethodId,
        contactPhone:     form.phone,
        totalAmount:      subtotal + (delivery?.price || 0),
        address: {
          country:    form.country,
          city:       form.city,
          street:     form.street,
          postalCode: form.postalCode,
        },
        comment: form.comment,
      });
      setOrderId(order.id);
      setStep(3); // Success
    } catch (e) {
      alert('Ошибка оформления заказа: ' + e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        {step < 3 ? 'Оформление заказа' : ''}
      </Typography>

      {step < 3 && (
        <Stepper activeStep={step} sx={{ mb: 5 }}>
          {STEPS.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      )}

      {step === 0 && (
        <StepCart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          onNext={() => setStep(1)}
        />
      )}
      {step === 1 && (
        <StepDelivery
          form={form}
          setForm={setForm}
          onNext={() => setStep(2)}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <StepPayment
          form={form}
          setForm={setForm}
          cart={cart}
          onBack={() => setStep(1)}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
      {step === 3 && <StepSuccess orderId={orderId} />}
    </Container>
  );
}
