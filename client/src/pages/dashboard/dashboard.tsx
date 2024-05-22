import { ContentLayout } from '@/components/dashboard/content-layout';
import EmptyProjects from '@/components/dashboard/empty-projects';
import LoadingScreen from '@/components/loading-screen';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { useAxiosPrivate } from '@/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { CircleAlertIcon } from 'lucide-react';

export default function DashboardPage() {
  const axios = useAxiosPrivate();

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const res = await axios.get('statistics');
      return res.data;
    },
  });

  console.log(stats);

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isError ? (
        <div className="text-red-800 text-2xl">
          Somethins went wrong, try again later!
        </div>
      ) : isLoading ? (
        <LoadingScreen logo={false} />
      ) : stats.totalProjects > 0 ? (
        <>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Statistics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="border rounded p-2">
                <h4 className="text-lg font-semibold">Total Projects</h4>
                <p className="text-gray-600 dark:text-gray-200  ">
                  {stats?.totalProjects}
                </p>
              </div>
              <div className="border rounded p-2">
                <h4 className="text-lg font-semibold">Total Errors</h4>
                <p className="text-gray-600 dark:text-gray-200  ">
                  {stats?.totalErrors}
                </p>
              </div>
              <div className="border rounded p-2">
                <h4 className="text-lg font-semibold">
                  Average Resolution Time
                </h4>
                <p className="text-gray-600 dark:text-gray-200  ">
                  {stats?.averageResolutionTime}
                </p>
              </div>
            </div>
          </div>
          {stats.totalErrors > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Errors</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="border rounded p-2">
                  <h4 className="text-lg ">Errors Severity</h4>
                  <div className="flex flex-wrap justify-around">
                    {stats.errorsBySeverity.map(
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
                    {stats.errorsDistribution.map(
                      (error: { errorType: string; count: number }) => (
                        <div className="flex">
                          <h5 className="  mr-1">{error.errorType}: </h5>
                          <span className="text-gray-600  dark:text-gray-200 font-semibold">
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
                    {stats.errorTrends.map(
                      (error: { date: string; count: number }) => (
                        <div className="flex">
                          <h5 className="  mr-1">{error.date}: </h5>
                          <span className="text-gray-600  dark:text-gray-200 font-semibold">
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
          <Alert
            variant="default"
            className="bg-blue-100 dark:bg-slate-700 my-2"
          >
            <CircleAlertIcon className="h-4 w-4" />
            <AlertDescription>
              We will update the visualizations in the next release. Bare with
              us ^^.
            </AlertDescription>
          </Alert>
        </>
      ) : (
        <EmptyProjects />
      )}
    </ContentLayout>
  );
}
