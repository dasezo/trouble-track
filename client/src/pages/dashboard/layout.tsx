import { Footer } from '@/components/dashboard/footer';
import { Sidebar } from '@/components/dashboard/sidebar';
import LoadingScreen from '@/components/loading-screen';
import { Toaster } from '@/components/ui/toaster';
import SidebarProvider from '@/contexts/sidebar-context';
import { useUser } from '@/hooks/useUser';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { isLoading } = useUser();
  return (
    <SidebarProvider>
      <Sidebar />
      {isLoading ? <LoadingScreen logo={true} /> : <Outlet />}
      <Footer />
      <Toaster />
    </SidebarProvider>
  );
};

export default Layout;
