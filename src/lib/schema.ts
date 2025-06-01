import { z } from 'zod';

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(4, { message: 'Name should have min 4 characters' }),
});

export const schemaLocation = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(4, { message: 'Name should have min 4 characters' }),
});
