import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import './index.css';
function LandingPage() {
  return (
    <header className={cn('w-full shadow-sm ')}>
      <div className="container p-4 flex justify-between">
        <div className="text-xl">
          <Logo></Logo>
        </div>
        <nav className={cn('flex space-x-32 items-center')}>
          <ul className={cn('flex space-x-2 nav-links')}>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
          </ul>
          <Button asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default LandingPage;
