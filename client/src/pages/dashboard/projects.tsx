import { ContentLayout } from '@/components/dashboard/content-layout';
import EmptyProjects from '@/components/dashboard/empty-projects';
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAxiosPrivate } from '@/hooks/useAxios';
import { ProjectType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function ProjectsPage() {
  const axios = useAxiosPrivate();
  const [filter, setFilter] = useState<string>('');

  let projects: ProjectType[] = [] as ProjectType[];
  const { isLoading, data, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await axios.get('projects'),
  });

  projects = data?.data;

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
            <BreadcrumbPage>Projects</BreadcrumbPage>
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
        ) : projects.length < 1 ? (
          <EmptyProjects />
        ) : (
          <>
            <div className="border-b my-4 p-2 flex flex-wrap justify-between">
              <span className="text-lg font-semibold">
                {projects.length} Project{projects.length > 1 && 's'}
              </span>
              <Input
                placeholder="Filter By Project Name"
                className="max-w-96"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              {projects
                .filter((project) => {
                  if (project.name.includes(filter)) return project;
                })
                .map((project: ProjectType) => (
                  <Card key={project._id} className="">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{project.name}</CardTitle>
                          <CardDescription>{project.url}</CardDescription>
                        </div>
                        <Button variant={'secondary'} asChild>
                          <Link to={`/dashboard/projects/${project._id}`}>
                            <ArrowUpRight className="size-4 mr-2" /> View
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="flex justify-between flex-wrap">
                      <p>{project.description}</p>
                      <p className="text-gray-500 text-sm">
                        Created At:{' '}
                        {dayjs(project.createdAt).format('DD/MM/YYYY')}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </>
        )}
      </section>
    </ContentLayout>
  );
}
