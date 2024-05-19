import { Footer } from '@/components/dashboard/footer';
import { Sidebar } from '@/components/dashboard/sidebar';
import LoadingScreen from '@/components/loading-screen';
import SidebarProvider from '@/contexts/sidebar-context';
import { useUser } from '@/hooks/useUser';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { isLoading } = useUser();
  return (
    <SidebarProvider>
      <Sidebar />
      {isLoading ? <LoadingScreen /> : <Outlet />}
      <Footer />
    </SidebarProvider>
  );
};

export default Layout;
