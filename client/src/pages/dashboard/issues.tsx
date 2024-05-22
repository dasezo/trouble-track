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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosPrivate } from '@/hooks/useAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ChevronLeft, EllipsisVertical } from 'lucide-react';
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
  const { toast } = useToast();

  const [searchParams] = useSearchParams();
  const project = searchParams.get('project') || 'Project';
  const axios = useAxiosPrivate();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['issues', { projectId }],
    queryFn: async () => await axios.get(`issues?projectId=${projectId}`),
    retry: 1,
  });

  const deleteIssue = useMutation({
    mutationFn: async (id: string) => await axios.delete(`issues/${id}`),
    onSuccess: () => {
      refetch();
      toast({
        description: 'Issue Deleted Successfully.',
      });
    },
  });

  const updateIssue = useMutation({
    mutationFn: async (data: any) =>
      await axios.patch(`issues/${data.id}`, data.data),
    onSuccess: () => {
      refetch();
      toast({
        description: 'Issue Updated Successfully.',
      });
    },
  });

  const markAsResolved = (id: string) => {
    updateIssue.mutate({ id, data: { resolvedAt: new Date() } });
  };

  const updateIssueStatus = (id: string, status: string) => {
    updateIssue.mutate({ id, data: { status } });
  };
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
        </div>
        {isError ? (
          <div className="text-red-800 text-2xl">
            This Project has no issues yet.
          </div>
        ) : isLoading ? (
          <LoadingScreen logo={false} />
        ) : (
          <div>
            {/* <div className="flex gap-4 my-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Error Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Error Type</SelectLabel>
                    <SelectItem defaultValue={'all'}>All Types</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Error Severity</SelectLabel>
                    <SelectItem defaultValue={'all'}>All Severities</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="crucial">Crucial</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <div className="flex flex-col gap-4">
              {issues.map((issue) => (
                <div
                  key={issue._id}
                  className="border rounded flex gap-2 items-start p-2"
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <h2 className="text-xl font-semibold text-red-950 dark:text-red-50">
                      <span className="text-sm font-normal text-gray-500">
                        Type:{' '}
                      </span>{' '}
                      {issue.type}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {issue.message}
                    </p>
                    <div className="flex flex-wrap justify-end gap-4 font-bold">
                      <div className="text-sm text-gray-700 dark:text-gray-300 ">
                        <span className="font-normal">Occured At:</span>{' '}
                        {dayjs(issue.occuredAt).format('DD/MM/YYYY - HH:mm')}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-normal">Severity:</span>{' '}
                        {issue.severity}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-normal">Status:</span>{' '}
                        {issue.status}
                      </div>
                      {issue?.resolvedAt && (
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-normal">Resolved At:</span>{' '}
                          {dayjs(issue.resolvedAt).format('DD/MM/YYYY - HH:mm')}
                        </div>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="rounded-full w-fit h-fit p-1 hover:bg-slate-50">
                      <EllipsisVertical className="size-6 text-slate-600" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Error Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => updateIssueStatus(issue._id, 'closed')}
                      >
                        Close
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateIssueStatus(issue._id, 'archived')}
                      >
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => markAsResolved(issue._id)}
                      >
                        Mark As Resolved
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-700 hover:bg-red-500"
                        onClick={() => deleteIssue.mutate(issue._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </ContentLayout>
  );
}
