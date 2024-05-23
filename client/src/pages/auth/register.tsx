import axios from '@/api/axios';
import CardWrapper from '@/components/auth/card-wrapper';
import Logo from '@/components/logo';
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
import { RegisterSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import AuthLayout from './layout';
const RegisterPage = () => {
  const { onAuth } = useAuth();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (signupData: z.infer<typeof RegisterSchema>) =>
      axios.post('auth/signup', signupData),
    onSuccess: (res: AxiosResponse) => {
      setSuccessMessage(true);
      setAccessToken(res.data.accessToken);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 409) {
        form.setError(
          'email',
          {
            type: 'string',
            message: 'Email already exists.',
          },
          { shouldFocus: true },
        );
      }

      if (err.response?.status === 400) {
        form.setError(
          'password',
          {
            type: 'string',
            message: "Passwords don't match.",
          },
          { shouldFocus: true },
        );
        form.setError(
          'confirmPassword',
          {
            type: 'string',
            message: "Passwords don't match.",
          },
          { shouldFocus: true },
        );
      } else {
        form.setError('root', {
          type: 'string',
          message: 'Something went wrong! cannot connect to server.',
        });
      }
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    mutate(data);
  };

  const enterAccount = () => {
    if (accessToken) onAuth(accessToken);
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <AuthLayout>
        {!successMessage ? (
          <CardWrapper
            title="Register"
            label="Welcome! Create an account"
            backButtonHref="/login"
            backButtonLabel="Already have an account? Login here."
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John Doe" />
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
                          <Input
                            {...field}
                            type="password"
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="******"
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
                  Register
                </Button>
              </form>
            </Form>
          </CardWrapper>
        ) : (
          <div className="text-center p-8 shadow-md rounded-lg flex flex-col gap-8 justify-center">
            <Logo className="text-xl" />
            <h2 className="text-2xl text-green-800 font-semibold">
              Registration successful!
            </h2>
            <p className="text-gray-600">
              Get into your account and start enjoying our services.
            </p>
            <Button onClick={enterAccount}>Enter My Account</Button>
          </div>
        )}
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
