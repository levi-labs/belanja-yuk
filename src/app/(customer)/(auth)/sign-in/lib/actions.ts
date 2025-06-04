'use server';

import { schemaSignIn } from '@/lib/schema';
import { ActionResult } from '@/types';
import prisma from '../../../../../../lib/prisma';
import bcrypt from 'bcrypt';
import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validated = schemaSignIn.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validated.success) {
    console.error('Validation failed:', validated.error.errors[0].message);
    return {
      error: validated.error.errors[0].message,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validated.data.email,
      role: 'customer', // Note: Storing passwords in plain text is insecure. Use hashing.
    },
  });
  if (!existingUser) {
    console.error('Invalid email or password');
    return {
      error: 'Invalid email or password',
    };
  }

  const comparePassword = bcrypt.compareSync(
    validated.data.password,
    existingUser.password
  );

  if (!comparePassword) {
    console.error('Invalid email or password');
    return {
      error: 'Invalid email or password',
    };
  }
  // @ts-expect-error  // Create a session for the user using Lucia
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/'); // Redirect to the dashboard after successful sign-in
}
