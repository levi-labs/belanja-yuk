import { z } from 'zod';

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
];

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

export const schemaBrand = schemaCategory.extend({
  image: z
    .any()
    .refine((file: File) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      message:
        'Invalid image type. Allowed types are: ' +
        ALLOWED_IMAGE_TYPES.join(', '),
    })
    .refine((file: File) => file?.name, {
      message: 'Image is required',
    }),
});
