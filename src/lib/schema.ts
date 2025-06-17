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

export const schemaProduct = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(4, {
      message: 'Name should have min 4 characters',
    }),
  description: z.string({
    required_error: 'Description is required',
  }),
  price: z.string({
    required_error: 'Price is required',
  }),
  stok: z.string({
    required_error: 'Stok is required',
  }),
  category_id: z.string({ required_error: 'Category is required' }),
  brand_id: z.string({ required_error: 'Brand is required' }),
  location_id: z.string({ required_error: 'Location is required' }),
  image: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: 'At least 3 images are required',
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file: File) => {
          validate = ALLOWED_IMAGE_TYPES.includes(file.type);
        });

        return validate;
      },
      {
        message: 'Uploaded file is not an image.',
      }
    ),
  // .refine((files: File[]) => files.every((file: File) => file?.name), {
  //   message: 'All images are required',
  // }),
});

export const schemaProductEdit = schemaProduct
  .extend({
    id: z.number({
      required_error: 'Product ID is required',
    }),
  })
  .omit({
    image: true,
  });

export const schemaSignUp = schemaSignIn.extend({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(4, {
      message: 'Name should have min 4 characters',
    }),
});

export const schemaShippingAddress = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(4, {
      message: 'Name should have min 4 characters',
    }),
  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(10, {
      message: 'Address should have min 10 characters',
    }),
  phone: z
    .string({
      required_error: 'Phone is required',
    })
    .min(10, {
      message: 'Phone should have min 10 characters',
    })
    .max(15, {
      message: 'Phone should have max 15 characters',
    }),
  postal_code: z
    .string({
      required_error: 'Postal Code is required',
    })
    .min(5, {
      message: 'Postal code should have min 5 characters',
    }),

  city: z
    .string({
      required_error: 'City is required',
    })
    .min(3, {
      message: 'City should have min 3 characters',
    }),
  notes: z.string().optional().nullable().default(''),
});
