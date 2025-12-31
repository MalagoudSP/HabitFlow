import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'habitflow-users';
const CURRENT_USER_KEY = 'habitflow-current-user';

// Initialize demo user
const initializeDemoUser = () => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
  const demoUserExists = users.some((u) => u.email === 'test@example.com');

  if (!demoUserExists) {
    users.push({
      id: 'demo-user',
      email: 'test@example.com',
      name: 'Demo User',
      password: 'password123',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    // Setup demo user on first load
    if (typeof window !== 'undefined') {
      initializeDemoUser();
    }

    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userWithoutPassword: User = {
      ...foundUser,
      password: '', // Don't store password in memory
    };

    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  };

  const register = async (email: string, name: string, password: string) => {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]') as User[];

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      throw new Error('User with this email already exists');
    }

    // Validate inputs
    if (!email || !name || !password) {
      throw new Error('All fields are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    // Auto-login after registration
    const userWithoutPassword: User = {
      ...newUser,
      password: '', // Don't store password in memory
    };

    setUser(userWithoutPassword);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
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
