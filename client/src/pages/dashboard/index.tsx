import { Footer } from '@/components/dashboard/footer';
import { Sidebar } from '@/components/dashboard/sidebar';
import SidebarProvider from '@/contexts/sidebar-context';
import { Outlet, useLocation } from 'react-router-dom';
const DashboardPage = () => {
  console.log(useLocation());
  return (
    <SidebarProvider>
      <Sidebar />
      <Outlet />
      <Footer />
    </SidebarProvider>
  );
};

export default DashboardPage;
