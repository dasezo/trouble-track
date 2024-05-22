import { ContentLayout } from '@/components/dashboard/content-layout';
import LoadingScreen from '@/components/loading-screen';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { useAxiosPrivate } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

export default function IssuesPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  if (!projectId) navigate('/dashboard/projects');

  const [searchParams] = useSearchParams();
  const project = searchParams.get('project') || 'Project';
  const axios = useAxiosPrivate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['issues', { projectId }],
    queryFn: async () => await axios.get(`issues?projectId=${projectId}`),
  });

  const issues = data?.data || [];
  return (
    <ContentLayout title="Issues">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project} Issues</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        <div className="border-b my-4 p-2 flex items-baseline ">
          <Button variant={'link'} asChild>
            <Link to={`/dashboard/projects/${projectId}`}>
              <ChevronLeft className="size-4 mr-1" /> Back{' '}
            </Link>
          </Button>
          <span className="text-lg font-semibold">
            {project}: {issues.length} Issue{issues.length > 1 && 's'}
          </span>
          {/* <Input
                placeholder="Filter By Project Name"
                className="max-w-96"
                onChange={(e) => setFilter(e.target.value)}
              /> */}
        </div>
        {isError ? (
          <div className="text-red-800 text-2xl">
            This Project has no issues yet.
          </div>
        ) : isLoading ? (
          <LoadingScreen logo={false} />
        ) : (
          <div>
            <div className="flex flex-col gap-4">
              {issues.map((issue) => (
                <div key={issue._id} className="border rounded">
                  <div className="p-2">
                    <h2 className="text-2xl font-semibold">{issue.type}</h2>
                    <p className="text-gray-500">{issue.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </ContentLayout>
  );
}
