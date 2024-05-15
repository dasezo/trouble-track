import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={cn(className, '')}>
      Trouble<span className="text-blue-500 font-bold">Track</span>
    </Link>
  );
};

export default Logo;
