import { Tedit } from '@/types';
import React from 'react';
import { getBrandId } from '../../lib/data';
import FormBrand from '../../_components/form-brand';
import { redirect } from 'next/navigation';

export default async function EditPage({ params }: Tedit) {
  const brand = await getBrandId(params.id);
  if (!brand) {
    // If the brand is not found, you might want to redirect or show an error
    return redirect('/dashboard/brands'); // Redirect to the brands list page
  }
  return <FormBrand data={brand} type='EDIT' />; // Pass the brand data to the form component
}
