'use server';
import { lucia } from '@/lib/auth';
import { schemaSignIn } from '@/lib/schema';
import { ActionResult } from '@/types';
import { redirect } from 'next/navigation';
import prisma from '../../../../../../../lib/prisma';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

export async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  //  console.log(formData.get('email'));
  const validate = schemaSignIn.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validate.success) {
    console.log(validate.error);

    return {
      error: validate.error.errors[0].message,
    };
  }

  const existsUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: 'superadmin',
    },
  });
  if (!existsUser) {
    return {
      error: 'User not found',
    };
  }
  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existsUser.password
  );
  if (!comparePassword) {
    return {
      error: 'Invalid password',
    };
  }

  console.log('user found', existsUser);
  // @ts-expect-error: Lucia expects a string for the user ID
  const session = await lucia.createSession(existsUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect('/dashboard');
}
