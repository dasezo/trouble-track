import { useLocalStorage } from '@/hooks/useLocalStorage';
import React, { createContext, useEffect, useState } from 'react';
type Props = {
  children: React.ReactNode;
};

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar?: () => void;
}
export const SidebarContext = createContext<SidebarContextType>(
  {} as SidebarContextType,
);
const SidebarProvider = ({ children }: Props) => {
  const { setItem, getItem } = useLocalStorage('sidebar');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  useEffect(() => {
    if (!getItem()) {
      setIsOpen(false);
    }
  }, []);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setItem(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
