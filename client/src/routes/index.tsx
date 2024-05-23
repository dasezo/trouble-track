import App from '@/app';
import { useAuth } from '@/hooks/useAuth';
import LoginPage from '@/pages/auth/login';
import RegisterPage from '@/pages/auth/register';
import Dashboard from '@/pages/dashboard';
import AccountPage from '@/pages/dashboard/account';
import DashboardPage from '@/pages/dashboard/dashboard';
import IssuesPage from '@/pages/dashboard/issues';
import NewProjectsPage from '@/pages/dashboard/new-project';
import ProjectPage from '@/pages/dashboard/project';
import ProjectsPage from '@/pages/dashboard/projects';
import ErrorPage from '@/pages/error-page';
import LandingPage from '@/pages/landing-page';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { ProtectedRoute } from './protected-routes';
const Routes = () => {
  const { isLoggedIn } = useAuth();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />,
        },
        {
          path: 'register',
          element: isLoggedIn ? <Navigate to="/dashboard" /> : <RegisterPage />,
        },
        {
          path: 'login',
          element: isLoggedIn ? <Navigate to="/dashboard" /> : <LoginPage />,
        },
        {
          path: 'dashboard',
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ), // Wrap the component in ProtectedRoute
          children: [
            {
              path: '',
              element: <DashboardPage />,
            },
            {
              path: 'projects',
              element: <ProjectsPage />,
            },
            {
              path: 'projects/:projectId',
              element: <ProjectPage />,
            },
            {
              path: 'projects/new',
              element: <NewProjectsPage />,
            },
            {
              path: 'issues/:projectId',
              element: <IssuesPage />,
            },
            {
              path: 'account',
              element: <AccountPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
