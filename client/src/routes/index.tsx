import App from '@/app';
import EmptyProjects from '@/components/dashboard/empty-projects';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import DashboardPage from '@/pages/dashboard';
import ProjectsPage from '@/pages/dashboard/projects';
import LandingPage from '@/pages/landing-page';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ProtectedRoute } from './protected-routes';
const Routes = () => {
  const { isLoggedIn } = useAuth();
  console.log('logged:', isLoggedIn);
  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '',
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ), // Wrap the component in ProtectedRoute
      children: [
        {
          path: '',
          element: <EmptyProjects />,
        },
        {
          path: 'projects',
          element: <ProjectsPage />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '',
      element: <LandingPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Navigate to="/" />,
      children: isLoggedIn
        ? routesForAuthenticatedOnly
        : routesForNotAuthenticatedOnly,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
