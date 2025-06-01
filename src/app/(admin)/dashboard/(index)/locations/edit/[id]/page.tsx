import React from 'react';

import { redirect } from 'next/navigation';
import { getLocationById } from '../../lib/data';
import FormLocation from '../../_components/form-location';

type Tparams = {
  id: string;
};

interface EditPageProp {
  params: Tparams;
}

export default async function EditPage({ params }: EditPageProp) {
  const data = await getLocationById(params.id);

  if (!data) {
    return redirect('/dashboard/categories');
  }

  console.log(data);

  return <FormLocation type='EDIT' data={data} />;
}
