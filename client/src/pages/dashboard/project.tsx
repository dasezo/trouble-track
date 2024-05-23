import { ContentLayout } from '@/components/dashboard/content-layout';
import LoadingScreen from '@/components/loading-screen';
import Spinner from '@/components/spinner';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosPrivate } from '@/hooks/useAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowUpRight, Pen, Trash } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  if (!projectId) navigate('/dashboard/projects');

  const axios = useAxiosPrivate();
  const { toast } = useToast();
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['project', { projectId }],
    queryFn: async () => {
      const projectData = await axios.get(`/projects/${projectId}`);
      const projectStats = await axios.get(`/statistics/${projectId}`);
      return { ...projectData.data, ...projectStats.data };
    },
  });

  const deleteProject = useMutation({
    mutationFn: async () => {
      await axios.delete(`/projects/${projectId}`);
    },
    onSuccess: () => {
      toast({
        description: 'Project Deleted Successfully.',
      });
      navigate('/dashboard/projects');
    },
  });

  return (
    <ContentLayout title={`Project: ${project?.name}`}>
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
            <BreadcrumbPage>{project?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>
        {isError ? (
          <div className="text-red-700 text-2xl">
            Error: Something Went Wrong! Try Again Later
          </div>
        ) : isLoading ? (
          <LoadingScreen logo={false} />
        ) : (
          <div className="border rounded p-2 sm:p-4 mt-4">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  {project?.name}{' '}
                  <span className="text-base text-gray-500 dark:text-gray-200  font-normal">
                    ({project?.url})
                  </span>
                </h2>
                <p className="text-gray-500">{project?.description}</p>
              </div>
              <Button variant={'secondary'} asChild>
                <Link
                  to={`/dashboard/issues/${projectId}?project=${project?.name}`}
                >
                  <ArrowUpRight className="size-4 mr-2" /> View Issues
                </Link>
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="border rounded p-2">
                  <h4 className="text-lg font-semibold">Total Resuests</h4>
                  <p className="text-gray-500 dark:text-gray-200 ">
                    {project?.performanceMetrics.totalRequests}
                  </p>
                </div>
                <div className="border rounded p-2">
                  <h4 className="text-lg font-semibold">Total Errors</h4>
                  <p className="text-gray-500 dark:text-gray-200 ">
                    {project?.totalErrors}
                  </p>
                </div>
                <div className="border rounded p-2">
                  <h4 className="text-lg font-semibold">Error Rate</h4>
                  <p className="text-gray-500 dark:text-gray-200 ">
                    {project?.performanceMetrics.errorRate}
                  </p>
                </div>
                <div className="border rounded p-2">
                  <h4 className="text-lg font-semibold">
                    Average Response Time
                  </h4>
                  <p className="text-gray-500 dark:text-gray-200 ">
                    {project?.performanceMetrics.averageResopnseTime}
                  </p>
                </div>
                <div className="border rounded p-2">
                  <h4 className="text-lg font-semibold">Average Load Time</h4>
                  <p className="text-gray-500 dark:text-gray-200 ">
                    {project?.performanceMetrics.averageLoadTime}
                  </p>
                </div>
                <div className="border rounded p-2">
                  <h4 className="text-lg font-semibold">
                    Average Resolution Time
                  </h4>
                  <p className="text-gray-500 dark:text-gray-200 ">
                    {project?.averageResolutionTime}
                  </p>
                </div>
              </div>
            </div>
            {project?.totalErrors > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Errors</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="border rounded p-2">
                    <h4 className="text-lg ">Errors Severity</h4>
                    <div className="flex flex-wrap justify-around">
                      {project?.errorsBySeverity.map(
                        (error: { severity: string; count: number }) => (
                          <div className="flex">
                            <h5 className="  mr-1">{error.severity}: </h5>
                            <span className="text-gray-600 dark:text-gray-200  font-semibold">
                              {' '}
                              {error.count}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="border rounded p-2">
                    <h4 className="text-lg ">Errors Distribution</h4>
                    <div className="flex flex-wrap justify-around">
                      {project?.errorsDistribution.map(
                        (error: { errorType: string; count: number }) => (
                          <div className="flex">
                            <h5 className="  mr-1">{error.errorType}: </h5>
                            <span className="text-gray-600 dark:text-gray-200  font-semibold">
                              {' '}
                              {error.count}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="border rounded p-2">
                    <h4 className="text-lg ">Error Trends</h4>
                    <div className="flex flex-col items-center">
                      {project?.errorTrends.map(
                        (error: { date: string; count: number }) => (
                          <div className="flex">
                            <h5 className="  mr-1">{error.date}: </h5>
                            <span className="text-gray-600 dark:text-gray-200  font-semibold">
                              {' '}
                              {error.count}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex justify-end space-x-4">
              <Button variant={'secondary'} disabled>
                <Pen className="mr-1 size-4" /> Edit
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={'destructive'}>
                    <Trash className="mr-1 size-4" />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete project</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete{' '}
                      <strong>"{project.name}"</strong> project?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant={'destructive'}
                      onClick={() => deleteProject.mutate()}
                      disabled={deleteProject.isPending}
                    >
                      {deleteProject.isPending && <Spinner size="16" />} Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </section>
    </ContentLayout>
  );
};
export default ProjectPage;
