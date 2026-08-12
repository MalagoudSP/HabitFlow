import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/user';
import { authAPI } from '@/services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const CURRENT_USER_KEY = 'habitflow-current-user';
const AUTH_TOKEN_KEY = 'habitflow-auth-token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        authAPI.profile().catch(() => {
          setUser(null);
          localStorage.removeItem(CURRENT_USER_KEY);
          localStorage.removeItem(AUTH_TOKEN_KEY);
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login({ email, password });
    const { user: userData, token } = response.data;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setUser(userData);
  };

  const register = async (email: string, name: string, password: string) => {
    const response = await authAPI.register({ email, name, password });
    const { user: userData, token } = response.data;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
