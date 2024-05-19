import LoadingScreen from '@/components/loading-screen';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

type AuthContextType = {
  token: string | null;
  onAuth: (token: string) => void;
  updateToken: (token: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
};

type Props = { children: React.ReactNode };

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const { setItem, getItem, removeItem } = useLocalStorage('token');

  useEffect(() => {
    const token = getItem();
    if (token) {
      setToken(token);
    }

    setIsReady(true);
  }, []);

  const updateToken = (token: string) => {
    setToken(token);
    setItem(token);
  };

  const onAuth = (token: string) => {
    updateToken(token);
  };

  const isLoggedIn = (): boolean => {
    return !!token;
  };

  const onLogout = () => {
    removeItem();
    setToken('');
    <Navigate to="/login" />;
  };
  return (
    <AuthContext.Provider
      value={{ onAuth, token, updateToken, onLogout, isLoggedIn: isLoggedIn() }}
    >
      {isReady ? children : <LoadingScreen />}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
