import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function EmptyProjects() {
  return (
    <Card className="rounded-lg  mt-6">
      <CardContent className="p-6">
        <div className="flex flex-col justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col items-center mb-4">
            <h2 className={cn('text-xl sm:text-2xl font-bold')}>
              Excited for your first project!
            </h2>
            <p>Create Your first project and start tracking troubles.</p>
          </div>
          <div className="flex flex-col relative gap-6">
            <img
              src="/placeholder.png"
              alt="dashboard content"
              width={200}
              height={200}
            />
            <Button asChild size={'sm'}>
              <Link to={'/dashboard/projects/new'}>Create project</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
