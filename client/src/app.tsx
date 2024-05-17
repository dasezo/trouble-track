import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import './index.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
