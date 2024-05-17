import { cn } from '@/lib/utils';
interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <span className={cn(className, 'font-normal')}>
      Trouble<span className="text-blue-500 font-bold">Track</span>
    </span>
  );
};

export default Logo;
