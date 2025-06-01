'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { SignIn } from '../lib/actions';
import { ActionResult } from '@/types';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: ActionResult = {
  error: '',
};
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending} className='w-full'>
      {pending ? 'Loading...' : 'Sign in'}
    </Button>
  );
}
export default function FormAuth() {
  const [state, formAction] = useFormState(SignIn, initialState);
  return (
    <div>
      <form action={formAction}>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            {state.error !== '' && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='m@example.com'
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <Link
                    href='#'
                    className='ml-auto inline-block text-sm underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id='password' name='password' type='password' />
              </div>
              <SubmitButton />
              {/* <Button type='submit' className='w-full'>
                Login
              </Button> */}
              {/* <Button variant='outline' className='w-full'>
                Login with Google
              </Button> */}
            </div>
            {/* <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='#' className='underline'>
                Sign up
              </Link>
            </div> */}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
