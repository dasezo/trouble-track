import CodeBox from '@/components/dashboard/code-box';
import { ContentLayout } from '@/components/dashboard/content-layout';
import Spinner from '@/components/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { API_URL } from '@/config';
import { useAxiosPrivate } from '@/hooks/useAxios';
import { ProjectType } from '@/lib/types';
import { CreateProjectSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { CircleAlertIcon } from 'lucide-react';
import { useState } from 'react';
import { Stepper } from 'react-form-stepper';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
export default function NewProjectsPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [project, setProject] = useState<ProjectType>({} as ProjectType);

  const axios = useAxiosPrivate();
  const form = useForm({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      url: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof CreateProjectSchema>) =>
      axios.post('projects', data),
    onSuccess: (res: AxiosResponse) => {
      setProject(res.data);
      setActiveStep(1);
    },
    onError: (err: AxiosError) => {
      form.setError('root', {
        type: 'string',
        message:
          err.response?.data.message ||
          'Something went wrong! cannot connect to server.',
      });
    },
  });
  const onSubmit = (data: z.infer<typeof CreateProjectSchema>) => {
    mutate(data);
  };
  const onFinish = () => {
    const id = project._id;
    setActiveStep(0);
    setProject({} as ProjectType);
    navigate(`/dashboard/projects/${id}`, { replace: true });
  };
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
      <section className="mt-8 p-2 sm:p-6 border rounded">
        <div className="">
          <h2 className="text-xl font-bold">Creating new project</h2>
          <p className="mt-2 text-gray-500">
            Start tracking troubles by creating a new project.
          </p>
        </div>
        <Stepper
          steps={[
            { label: 'Create' },
            { label: 'Connect' },
            { label: 'Track' },
          ]}
          activeStep={activeStep}
        />
        {activeStep === 0 ? (
          <div>
            <Alert
              variant="default"
              className="bg-blue-100 dark:bg-slate-700 mt-2"
            >
              <CircleAlertIcon className="h-4 w-4" />
              <AlertDescription>
                You should know that this app will track browser errors only,
                make sure you provide only front-end project.
              </AlertDescription>
            </Alert>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 max-w-[500px] mx-auto mt-4"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="TroubleTrack"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="https://www.troubletrack.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Type your description here."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {form.formState?.errors?.root && (
                  <span className="text-sm font-medium text-destructive">
                    {form.formState?.errors?.root?.message}
                  </span>
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Spinner size="16" className="mr-2" /> : ''}
                  Create Project
                </Button>
              </form>
            </Form>
          </div>
        ) : activeStep === 1 ? (
          <div>
            <h2 className="text-green-800 text-2xl font-bold">
              {project?.name} Has Been Created Successfully
            </h2>
            <p className="text-gray-700 dark:text-gray-100 my-4">
              Now! you should copy the JavaScript code bellow and paste it in a
              global script tag in your project.
            </p>
            <Alert
              variant="default"
              className="bg-blue-100 dark:bg-slate-700 my-2"
            >
              <CircleAlertIcon className="h-4 w-4" />
              <AlertDescription>
                This step is crucial, avoiding it will prevent the app from
                being able to track your project.
              </AlertDescription>
            </Alert>
            <CodeBox code={code(project?._id)} />
            <div className="flex items-baseline gap-6 justify-center">
              <p className="text-gray-500">Have you completed this step?</p>
              <Button
                className="mt-4"
                variant={'secondary'}
                onClick={() => setActiveStep(2)}
              >
                Yes! Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl my-4 font-bold">Ready To Go!</h2>
            <p className="text-center">
              We are ready to track your Project, If you have completed the
              previeous step as it should be, you will be able to track the
              project performanace for every client request and catch errors
              when it appears to your clients.
            </p>
            <div className="felx gap-4 space-x-4 mt-4">
              <Button variant={'ghost'} onClick={() => setActiveStep(1)}>
                Back
              </Button>
              <Button className="" variant={'secondary'} onClick={onFinish}>
                Go to project
              </Button>
            </div>
          </div>
        )}
      </section>
    </ContentLayout>
  );
}

const code = (projectId: string): string => {
  return (
    '!function(e,n){e.onerror=function(e,n,t,r,a){let c={type:a?a.constructor.name:"UnknownError",message:e,source:n,stack:a?a.stack:null,occurredAt:new Date,userAgent:navigator.userAgent};o(c)},e.onunhandledrejection=function(e){let n=e.reason,t={type:n?n.constructor.name:"unhandledrejection",message:n?n.message:String(n),source:n?.code||null,stack:n.stack,occurredAt:new Date,userAgent:navigator.userAgent};o(t)};let t=e.performance.timing.navigationStart;async function o(e,t="err"){await fetch(`' +
    API_URL +
    '${"err"==t?"issues":"performance"}/${n}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}e.onload=function(){let n=e.performance.timing.responseEnd-t,r=e.performance.timing.domContentLoadedEventEnd-t;o({loadTime:r,responseTime:n},"performance")}}(window,"' +
    projectId +
    '");'
  );
};
