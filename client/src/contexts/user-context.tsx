import { useAxiosPrivate } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

interface UserInterface {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  avatarUrl?: string;
}
interface UserContextType {
  user: UserInterface | null;
  isLoading: boolean;
}
export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

const UserProvider = ({ children }: Props) => {
  const axios = useAxiosPrivate();
  // const [user, setUser] = useState<UserInterface | null>(null);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['accountInfo'],
    queryFn: async () => {
      const user = await axios.get('users/me');
      return user;
    },
    retry: 2,
  });
  if (isError) {
    throw new Error(error.message);
  }
  const user = data?.data;
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
