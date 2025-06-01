'use client';

import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { postLocation, updateLocation } from '../lib/actions';
import { ActionResult } from '@/types';
import { Location } from '@prisma/client';

const initialState: ActionResult = {
  error: '',
};
interface FormLocationProps {
  type?: 'ADD' | 'EDIT';
  data?: Location | null;
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' size='sm' disabled={pending}>
      {pending ? 'Loading...' : 'Save Location'}
    </Button>
  );
}
export default function FormLocation({
  data = null,
  type = 'ADD',
}: FormLocationProps) {
  const updateLocationWithId = (_: unknown, formData: FormData) =>
    updateLocation(_, formData, data?.id);

  const [state, formAction] = useFormState(
    type === 'ADD' ? postLocation : updateLocationWithId,
    initialState
  );
  return (
    <form action={formAction}>
      <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' size='icon' className='h-7 w-7' asChild>
              <Link href='/dashboard/locations'>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Link>
            </Button>
            <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
              Location Form
            </h1>
            <div className='hidden items-center gap-2 md:ml-auto md:flex'>
              <Button variant='outline' size='sm'>
                Discard
              </Button>
              <SubmitButton />
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
            <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
              <Card x-chunk='dashboard-07-chunk-0' className='md:w-[500px]'>
                <CardHeader>
                  <CardTitle className='mb-2'>Location Details</CardTitle>
                  <CardDescription>
                    {type === 'ADD'
                      ? 'Add a new location to your store.'
                      : 'Edit the details of this location.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== '' && (
                    <Alert variant='destructive' className='mb-4'>
                      <AlertCircle className='h-4 w-4' />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}
                  <div className='grid gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='name'>Name</Label>
                      <Input
                        id='name'
                        type='text'
                        name='name'
                        className='w-full'
                        defaultValue={data?.name}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className='flex items-center justify-center gap-2 md:hidden'>
            <Button variant='outline' size='sm'>
              Discard
            </Button>
            <Button size='sm'>Save Location</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
