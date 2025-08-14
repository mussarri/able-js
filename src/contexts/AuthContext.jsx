'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null); // { id, name, role }
  const [loading, setLoading] = useState(true);

  // Sayfa yenilenince kullanıcıyı tekrar getir
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get('/auth/me')
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    const me = await api.get('/auth/me');
    setUser(me.data);
    router.push('/'); // login sonrası yönlendirme
  };

  // REGISTER
  const register = async (name, email, password) => {
    await api.post('/auth/register', { name, email, password });
    // Kayıt sonrası login ekranına yönlendirme
    router.push('/login');
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
