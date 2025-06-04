'use server';
import { schemaSignUp } from '@/lib/schema';
import prisma from '../../../../../../lib/prisma';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

export async function signUp(_: unknown, formData: FormData) {
  const validated = await schemaSignUp.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });
  console.log(validated);

  if (!validated.success) {
    console.error('Validation failed:', validated.error.errors[0].message);
    return {
      error: validated.error.errors[0].message,
    };
  }
  const checkEmail = await prisma.user.findFirst({
    where: {
      email: validated.data.email,
      role: 'customer',
    },
  });

  if (checkEmail) {
    console.error('Email already exists');
    return {
      error: 'Email already exists',
    };
  }
  const hashedPassword = await bcrypt.hash(validated.data.password, 10);
  if (!hashedPassword) {
    console.error('Failed to hash password');
    return {
      error: 'Failed to create account. Please try again later.',
    };
  }
  try {
    await prisma.user.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        password: hashedPassword,
        role: 'customer',
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      error: 'Failed to create account. Please try again later.',
    };
  }

  return redirect('/sign-in'); // Redirect to sign-in page after successful sign-up
}
