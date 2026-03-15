import { mockProducts } from '../data/mockProducts';
import { mockCategories } from '../data/mockCategories';

// ====================================================
//  ПЕРЕКЛЮЧАТЕЛЬ: true = мок-данные, false = реальный API
// ====================================================
const USE_MOCK = false;

export const BASE_URL = 'https://localhost:7011/api';

// ─── Токен ───────────────────────────────────────────
export const getToken   = ()  => localStorage.getItem('token');
export const setToken   = (t) => localStorage.setItem('token', t);
export const clearToken = ()  => localStorage.removeItem('token');

// ─── Базовый fetch ───────────────────────────────────
const req = async (method, path, body) => {
  const headers = { 'Content-Type': 'application/json' };
  if (getToken()) headers['Authorization'] = `Bearer ${getToken()}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body != null ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    throw new Error('Не удалось подключиться к серверу. Убедись, что API запущен.');
  }

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // API возвращает { message: "..." } или просто строку
    throw new Error(data.message || data.title || `Ошибка ${res.status}`);
  }

  return data;
};

// ════════════════════════════════════════════════════
//  АУТЕНТИФИКАЦИЯ
//  POST /api/auth/login    → { token, user }
//  POST /api/auth/register → { token, user }
// ════════════════════════════════════════════════════

// --- Mock helpers ---
const MOCK_USERS_KEY = 'mock_users';
const getMockUsers   = () => JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]');
const saveMockUsers  = (u) => localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(u));

export const login = async (email, password) => {
  if (USE_MOCK) {
    const users = getMockUsers();
    const user  = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Неверный email или пароль');
    const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
    setToken(token);
    return { token, user: { ...user, password: undefined } };
  }

  const data = await req('POST', '/auth/login', { email, password });
  setToken(data.token);
  return data;
};

export const register = async ({ fullName, email, password, phoneNumber }) => {
  if (USE_MOCK) {
    const users = getMockUsers();
    if (users.find((u) => u.email === email)) throw new Error('Email уже занят');
    const newUser = {
      id: Date.now(), fullName, email, password,
      phoneNumber: phoneNumber || '', roleId: 2,
      createdAt: new Date().toISOString(),
    };
    saveMockUsers([...users, newUser]);
    const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));
    setToken(token);
    return { token, user: { ...newUser, password: undefined } };
  }

  const data = await req('POST', '/auth/register', { fullName, email, password, phoneNumber });
  setToken(data.token);
  return data;
};

// ════════════════════════════════════════════════════
//  ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
//  GET /api/user/profile → ProfileDto
// ════════════════════════════════════════════════════
export const getMe = () => {
  if (USE_MOCK) {
    const token = getToken();
    if (!token) throw new Error('Не авторизован');
    const { email } = JSON.parse(atob(token));
    const user = getMockUsers().find((u) => u.email === email);
    if (!user) throw new Error('Пользователь не найден');
    return Promise.resolve({ ...user, password: undefined });
  }

  return req('GET', '/user/profile');
};

export const updateMe = (data) => {
  if (USE_MOCK) {
    const token  = getToken();
    const { email } = JSON.parse(atob(token));
    const users  = getMockUsers();
    const idx    = users.findIndex((u) => u.email === email);
    if (idx === -1) throw new Error('Пользователь не найден');
    users[idx] = { ...users[idx], ...data };
    saveMockUsers(users);
    return Promise.resolve({ ...users[idx], password: undefined });
  }

  // UserController пока не имеет PUT /profile — оставляем мок даже при USE_MOCK=false
  // Когда добавишь эндпоинт в API, убери этот блок:
  const token  = getToken();
  const { email } = JSON.parse(atob(token));
  const users  = getMockUsers();
  const idx    = users.findIndex((u) => u.email === email);
  if (idx !== -1) { users[idx] = { ...users[idx], ...data }; saveMockUsers(users); }
  return Promise.resolve(data);
};

// ════════════════════════════════════════════════════
//  КАТЕГОРИИ  (пока мок — контроллера нет)
// ════════════════════════════════════════════════════
export const getCategories = () => Promise.resolve(mockCategories);

// ════════════════════════════════════════════════════
//  ТОВАРЫ  (пока мок — контроллера нет)
// ════════════════════════════════════════════════════
const getCategoryIdSet = (categoryId) => {
  if (!categoryId) return null;
  const id     = Number(categoryId);
  const ids    = new Set([id]);
  mockCategories.forEach((c) => {
    if (c.id === id) c.subCategories?.forEach((s) => ids.add(s.id));
    c.subCategories?.forEach((s) => { if (s.id === id) ids.add(c.id); });
  });
  return ids;
};

export const getProducts = ({ categoryId, search, page = 1, limit = 12 } = {}) => {
  let result = [...mockProducts];

  if (categoryId) {
    const ids = getCategoryIdSet(categoryId);
    result = result.filter((p) => ids.has(p.categoryId));
  }
  if (search?.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) ||
             p.material?.toLowerCase().includes(q) ||
             p.description?.toLowerCase().includes(q)
    );
  }

  const total = result.length;
  const items = result.slice((page - 1) * limit, page * limit);
  return Promise.resolve({ items, total, page, limit });
};

export const getProduct = (id) =>
  Promise.resolve(mockProducts.find((p) => p.id === Number(id)) || null);

// ════════════════════════════════════════════════════
//  ЗАКАЗЫ  (мок)
// ════════════════════════════════════════════════════
const MOCK_ORDERS_KEY = 'mock_orders';
const getMockOrders   = () => JSON.parse(localStorage.getItem(MOCK_ORDERS_KEY) || '[]');
const saveMockOrders  = (o) => localStorage.setItem(MOCK_ORDERS_KEY, JSON.stringify(o));

export const getOrders = () => {
  const token = getToken();
  if (!token) return Promise.resolve([]);
  try {
    const { userId } = JSON.parse(atob(token));
    return Promise.resolve(getMockOrders().filter((o) => o.userId === userId));
  } catch {
    return Promise.resolve([]);
  }
};

export const createOrder = (orderData) => {
  const token = getToken();
  let userId  = null;
  try { userId = JSON.parse(atob(token)).userId; } catch {}

  const order = {
    id: Date.now(),
    userId,
    ...orderData,
    statusName: 'Новый',
    orderDate:  new Date().toISOString(),
  };
  saveMockOrders([...getMockOrders(), order]);
  return Promise.resolve(order);
};

// ════════════════════════════════════════════════════
//  АДРЕСА  (мок)
// ════════════════════════════════════════════════════
const MOCK_ADDR_KEY    = 'mock_addresses';
const getMockAddresses = () => JSON.parse(localStorage.getItem(MOCK_ADDR_KEY) || '[]');
const saveMockAddresses = (a) => localStorage.setItem(MOCK_ADDR_KEY, JSON.stringify(a));

export const getAddresses = () => {
  const token = getToken();
  if (!token) return Promise.resolve([]);
  try {
    const { userId } = JSON.parse(atob(token));
    return Promise.resolve(getMockAddresses().filter((a) => a.userId === userId));
  } catch { return Promise.resolve([]); }
};

export const addAddress = (addrData) => {
  const token = getToken();
  let userId  = null;
  try { userId = JSON.parse(atob(token)).userId; } catch {}
  const addr = { id: Date.now(), userId, isPrimary: false, ...addrData };
  saveMockAddresses([...getMockAddresses(), addr]);
  return Promise.resolve(addr);
};

export const deleteAddress = (id) => {
  saveMockAddresses(getMockAddresses().filter((a) => a.id !== id));
  return Promise.resolve();
};

// ════════════════════════════════════════════════════
//  СПРАВОЧНИКИ
// ════════════════════════════════════════════════════
export const DELIVERY_METHODS = [
  { id: 1, name: 'Самовывоз',          price: 0    },
  { id: 2, name: 'Доставка по городу', price: 500  },
  { id: 3, name: 'Доставка по России', price: 1200 },
];

export const PAYMENT_METHODS = [
  { id: 1, name: 'Картой онлайн'          },
  { id: 2, name: 'Наличными при получении' },
  { id: 3, name: 'Безналичный расчёт'     },
];
