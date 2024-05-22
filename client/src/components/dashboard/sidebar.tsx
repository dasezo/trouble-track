import { Menu } from '@/components/dashboard/menu';
import { Button } from '@/components/ui/button';
import { useSidebarToggle } from '@/hooks/useSidebarToggle';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import { SidebarToggle } from './sidebar-toggle';

export function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarToggle();
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        isOpen === false ? 'w-[90px]' : 'w-72',
      )}
    >
      <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto border-r">
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            isOpen === false ? 'translate-x-1' : 'translate-x-0',
          )}
          variant="link"
          asChild
        >
          <Link to="/" className="flex items-center gap-2">
            <h1
              className={cn(
                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                isOpen === false
                  ? '-translate-x-96 opacity-0 hidden'
                  : 'translate-x-0 opacity-100',
              )}
            >
              <Logo />
            </h1>
          </Link>
        </Button>
        <Menu />
      </div>
    </aside>
  );
}
