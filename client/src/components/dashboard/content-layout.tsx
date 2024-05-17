import { Navbar } from '@/components/dashboard/navbar';
import { useSidebarToggle } from '@/hooks/useSidebarToggle';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  const { isOpen } = useSidebarToggle();
  return (
    <main
      className={cn(
        'min-h-[calc(100vh_-_56px)]  transition-[margin-left] ease-in-out duration-300',
        isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
      )}
    >
      <div>
        <Navbar title={title} />
        <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
      </div>
    </main>
  );
}
