import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProfile } from '@/lib/types';
import { jwtDecode } from 'jwt-decode';
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  setToken: (token: string) => void;
};
export const AuthContext = createContext<UserContextType>(
  {} as UserContextType,
);
const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, _setToken] = useState<string | null>(null);
  const { setItem, getItem, removeItem } = useLocalStorage('token');
  useEffect(() => {
    setTokenFromStorage();
  }, []);

  const setTokenFromStorage = async () => {
    const token = await getItem();
    if (token) _setToken(token);
  };

  const setToken = async (token: string) => {
    await setItem(token);
    _setToken(token);
  };

  const user = useMemo(() => {
    if (token) {
      const { sub, email, name } = jwtDecode(token) as {
        sub: string;
        email: string;
        name: string;
      };
      return { id: sub, email, name };
    }
    return null;
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
