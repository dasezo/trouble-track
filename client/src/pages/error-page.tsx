import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const ErrorPage = () => {
  return (
    <main className="w-full h-dvh flex items-center justify-center">
      <div className="flex flex-col items-centerj">
        <h1>Oops! NOT FOUND</h1>
        <Button variant={'link'}>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </main>
  );
};

export default ErrorPage;
