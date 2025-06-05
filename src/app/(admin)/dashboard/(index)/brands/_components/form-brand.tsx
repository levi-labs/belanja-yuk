'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Brand } from '@prisma/client';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { postBrand, updateBrand } from '../lib/action';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ActionResult } from '@/types';

const initialState: ActionResult = {
  error: '',
};
interface FormBrandProps {
  type?: 'ADD' | 'EDIT';
  data?: Brand | null;
}
export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' size='sm' disabled={pending}>
      {pending ? 'Loading...' : 'Save Brand'}
    </Button>
  );
}
export default function FormBrand({
  data = null,
  type = 'ADD',
}: FormBrandProps) {
  const updateBrandWithId = (_: unknown, formData: FormData) =>
    updateBrand(_, formData, data?.id);

  const [state, formAction] = useFormState(
    type === 'ADD' ? postBrand : updateBrandWithId,
    initialState
  );
  return (
    <form action={formAction}>
      <div className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
          <div className='flex items-center gap-4'>
            <Button variant='outline' size='icon' className='h-7 w-7' asChild>
              <Link href='/dashboard/brands'>
                <ChevronLeft className='h-4 w-4' />
                <span className='sr-only'>Back</span>
              </Link>
            </Button>
            <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
              Brand Form
            </h1>
            <div className='hidden items-center gap-2 md:ml-auto md:flex'>
              <Button variant='outline' size='sm' type='button'>
                Discard
              </Button>
              <SubmitButton />
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
            <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
              <Card x-chunk='dashboard-07-chunk-0' className='md:w-[500px]'>
                <CardHeader>
                  <CardTitle>Brand Details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
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
                  <div className='grid gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='Logo'>Logo</Label>
                      <Input
                        id='image'
                        type='file'
                        name='image'
                        className='w-full'
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
            <Button size='sm'>Save Brand</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
