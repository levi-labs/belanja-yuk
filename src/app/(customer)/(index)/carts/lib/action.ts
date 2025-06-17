'use server';
import { getUser } from '@/lib/auth';
import { schemaShippingAddress } from '@/lib/schema';
import { ActionResult, TCart } from '@/types';
import { redirect } from 'next/navigation';

export async function storeOrder(
  _: unknown,
  formData: FormData,
  total: number,
  product: TCart[]
): Promise<ActionResult> {
  const { session } = await getUser();
  if (!session) {
    return redirect('/signin');
  }

  const validated = schemaShippingAddress.safeParse({
    name: formData.get('name'),
    address: formData.get('address'),
    city: formData.get('city'),
    postal_code: formData.get('postal_code'),
    notes: formData.get('notes'),
    phone: formData.get('phone'),
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }

  return redirect('/');
}
