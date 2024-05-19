import * as z from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  name: z.string().min(1, {
    message: 'Please enter your name',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter project name',
  }),
  url: z.string().url({
    message: 'Please enter a valid URL',
  }),
  description: z.string().min(1, {
    message: 'Please enter project description',
  }),
});
