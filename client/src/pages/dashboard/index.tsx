import UserProvider from '@/contexts/user-context';
import Layout from './layout';
const Dashboard = () => {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
};

export default Dashboard;
