import axios from '@/api/axios';
import CardWrapper from '@/components/auth/card-wrapper';
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
  const { setToken } = useAuth();
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
      setToken(res.data.accessToken);
      navigate('/', { replace: true });
    },
    onError: (err: AxiosError) => {
      console.error(err.message);
      if (err.response?.status === 401) {
        form.setError('root', {
          type: 'string',
          message: 'Invalid email or password',
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
              {isPending ? 'Loading...' : 'Log In'}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </AuthLayout>
  );
};

export default LoginPage;
