import { UserContext } from '@/contexts/user-context';
import { useContext } from 'react';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within an UserProvider');
  }

  return context;
};
