import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

const TOKEN_KEY = 'tf_token';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('google_token');
    setUser(null);
  }, []);

  const loadProfile = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      return;
    }
    const { data } = await api.get('/api/auth/me');
    setUser({
      _id: data._id,
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        await loadProfile();
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [clearSession, loadProfile]);

  const login = async (payload) => {
    if (!payload?.token) {
      throw new Error('Invalid login data');
    }
    localStorage.setItem(TOKEN_KEY, payload.token);
    setLoading(true);
    try {
      await loadProfile();
    } catch {
      clearSession();
      throw new Error('Session could not be established');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
