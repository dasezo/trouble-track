import { ContentLayout } from '@/components/dashboard/content-layout';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { CircleAlertIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewProjectsPage() {
  return (
    <ContentLayout title="Projects">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard/projects">Projects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New Project</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="mt-8 border rounded">
        <div className="p-6">
          <h2 className="text-xl font-bold">Creating new project</h2>
          <p className="mt-2 text-gray-500">
            Start tracking troubles by creating a new project.
          </p>
        </div>
        <div>
          <Alert
            variant="default"
            className="bg-blue-100 dark:bg-slate-700 mt-2"
          >
            <CircleAlertIcon className="h-4 w-4" />
            <AlertDescription>
              You should know that this app will track browser errors only, make
              sure you provide only front-end project.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </ContentLayout>
  );
}
