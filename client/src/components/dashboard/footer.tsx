import { useSidebarToggle } from '@/hooks/useSidebarToggle';
import { cn } from '@/lib/utils';

export function Footer() {
  const { isOpen } = useSidebarToggle();
  return (
    <footer
      className={cn(
        'transition-[margin-left] ease-in-out duration-300',
        isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
      )}
    >
      <div className="supports-backdrop-blur:bg-background/60 z-20 w-full  bg-background/95 backdrop-blur">
        <div className="mx-4 md:mx-8 flex h-14 items-center">
          <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
            Built By{' '}
            <a
              href="https://github.com/dasezo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Dasezo
            </a>
            . The source code is available on{' '}
            <a
              href="https://github.com/dasezo/trouble-track"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
