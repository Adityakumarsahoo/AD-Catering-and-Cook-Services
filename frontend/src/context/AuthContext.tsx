import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAuthToken, setAuthToken } from '../services/api.js';
import toast from 'react-hot-toast';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  adminLogin: (email: string, pass: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setTokenState] = useState<string | null>(getAuthToken());
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const currentToken = getAuthToken();
    if (!currentToken) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await api.getMe();
      if (res && res.user) {
        setUser(res.user);
      } else {
        setUser(null);
        setAuthToken(null);
      }
    } catch (e) {
      console.warn('Failed to restore session:', e);
      setUser(null);
      setAuthToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await api.login({ email, password: pass });
      if (res.token && res.user) {
        setAuthToken(res.token);
        setTokenState(res.token);
        setUser(res.user);
        toast.success(res.message || 'Welcome back to AD Catering!');
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
      return false;
    }
  };

  const adminLogin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await api.adminLogin({ email, password: pass });
      if (res.token && res.user) {
        setAuthToken(res.token);
        setTokenState(res.token);
        setUser(res.user);
        toast.success('Admin authorization granted. Welcome back!');
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.message || 'Admin authentication failed');
      return false;
    }
  };

  const register = async (payload: any): Promise<boolean> => {
    try {
      const res = await api.register(payload);
      if (res.token && res.user) {
        setAuthToken(res.token);
        setTokenState(res.token);
        setUser(res.user);
        toast.success('Account created successfully! Welcome to AD Catering.');
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setTokenState(null);
    setUser(null);
    toast.success('Logged out successfully.');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        login,
        adminLogin,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
