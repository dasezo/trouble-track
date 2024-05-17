import { SidebarContext } from '@/contexts/sidebar-context';
import { useContext } from 'react';

export const useSidebarToggle = () => {
  return useContext(SidebarContext);
};
