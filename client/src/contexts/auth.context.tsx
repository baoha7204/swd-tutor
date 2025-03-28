import React, { createContext, useCallback, useEffect, useState } from 'react';

import authApi from '@/api/auth.api';

export type User = {
  id: string;
  name: string;
  email: string;
  gender: boolean;
  YOB: number;
  isAdmin: boolean;
  avatarUrl?: string; // Added optional avatar URL
};

export type AuthContextType = {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    YOB: number,
    gender: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await authApi.fetchSelf();
      setCurrentUser(res.currentUser);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login({ email, password });
      setCurrentUser(response);
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    YOB: number,
    gender: boolean
  ) => {
    setIsLoading(true);
    try {
      await authApi.register({
        name,
        email,
        password,
        YOB,
        gender,
      });
    } catch (error) {
      console.error('Failed to register:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authApi.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error('Failed to log out:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
