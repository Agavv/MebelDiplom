import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Отдельный файл — чтобы не было HMR предупреждения
// "incompatible exports" в AuthContext.jsx
export const useAuth = () => useContext(AuthContext);
