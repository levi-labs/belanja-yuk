import { Button } from '@/components/ui/button';
import { ActionResult } from '@/types';
import { Trash } from 'lucide-react';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { deleteBrand } from '../lib/action';

const inintialState: ActionResult = {
  error: '',
};

interface FormDeleteProps {
  id: number;
}
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' variant='destructive' size='sm' disabled={pending}>
      <Trash className='w-4 h-4 mr-2' /> {pending ? 'Loading...' : 'Delete'}
    </Button>
  );
}
export default function FormDelete({ id }: FormDeleteProps) {
  const deleteBrandWithId = (_: unknown, formData: FormData) =>
    deleteBrand(_, formData, id);

  const [state, formAction] = useFormState(deleteBrandWithId, inintialState);
  console.log('state', state);

  return (
    <form action={formAction}>
      <SubmitButton />
      {state.error != '' && (
        <div className='text-red-500 mt-2'>
          <p>{state.error}</p>
        </div>
      )}
    </form>
  );
}
