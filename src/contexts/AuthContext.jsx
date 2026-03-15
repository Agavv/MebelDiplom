import React, { createContext, useState, useEffect } from 'react';
import { getMe, login as apiLogin, register as apiRegister, clearToken, getToken } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      if (!getToken()) { setLoading(false); return; }
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        clearToken();
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    const userData = data.user ?? data;
    setUser({
      userId:      userData.userId,
      fullName:    userData.fullName,
      email:       userData.email,
      phoneNumber: userData.phoneNumber,
      roleId:      userData.roleId,
    });
    return data;
  };

  const register = async (formData) => {
    const data = await apiRegister(formData);
    const userData = data.user ?? data;
    setUser({
      userId:      userData.userId,
      fullName:    userData.fullName,
      email:       userData.email,
      phoneNumber: userData.phoneNumber,
      roleId:      userData.roleId,
    });
    return data;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  const refreshUser = async () => {
    const me = await getMe();
    setUser(me);
    return me;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
