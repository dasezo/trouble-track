import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();

  // If authenticated, render the child routes
  return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
};
