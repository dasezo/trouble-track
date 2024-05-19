import axios from '@/api/axios';
import CardWrapper from '@/components/auth/card-wrapper';
import Spinner from '@/components/spinner';
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
import { useAuth } from '@/hooks/useAuth';
import { LoginSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import AuthLayout from './layout';

const LoginPage = () => {
  const { onAuth } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (loginData: z.infer<typeof LoginSchema>) =>
      axios.post('auth/login', loginData),
    onSuccess: (res: AxiosResponse) => {
      onAuth(res.data.accessToken);
      navigate('/dashboard', { replace: true });
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 401) {
        form.setError('root', {
          type: 'string',
          message: 'Invalid email or password',
        });
      } else {
        form.setError('root', {
          type: 'string',
          message: 'Something went wrong! cannot connect to server.',
        });
      }
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate(data);
  };
  return (
    <AuthLayout>
      <CardWrapper
        title="Log In"
        label="Welcome back! Please login to your account."
        backButtonHref="/register"
        backButtonLabel="Don't have an account? Registre here."
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="johndoe@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" />
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
              {isPending ? <Spinner size="16" className="mr-2" /> : ''}Log In
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </AuthLayout>
  );
};

export default LoginPage;
