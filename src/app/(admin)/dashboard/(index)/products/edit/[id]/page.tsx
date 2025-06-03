import React from 'react';
import FormProduct from '../../_components/form-product';
import { Tedit } from '@/types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getBrands } from '../../../brands/lib/data';
import { getCategories } from '../../../categories/lib/data';
import { getLocations } from '../../../locations/lib/data';
import { get } from 'http';
import { getProductId } from '../../lib/data';

export default async function EditPage({ params }: Tedit) {
  const categories = await getCategories();
  const brands = await getBrands();
  const locations = await getLocations();
  const product = await getProductId(params.id);
  console.log('Product data:', product);

  return (
    <FormProduct data={product} type='EDIT'>
      <div className='grid gap-3'>
        <Label htmlFor='category'>Category</Label>
        <Select
          name='category_id'
          defaultValue={`${product?.category_id}` || ''}
        >
          <SelectTrigger id='category' aria-label='Select category'>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={`${cat.id}`}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-3'>
        <Label htmlFor='brand'>Brand</Label>
        <Select name='brand_id' defaultValue={`${product?.brand_id}` || ''}>
          <SelectTrigger id='brand' aria-label='Select Brand'>
            <SelectValue placeholder='Select brand' />
          </SelectTrigger>
          <SelectContent>
            {brands?.map((cat) => (
              <SelectItem key={cat.id} value={`${cat.id}`}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='grid gap-3'>
        <Label htmlFor='location_id'>Location</Label>
        <Select
          name='location_id'
          defaultValue={`${product?.location_id}` || ''}
        >
          <SelectTrigger id='location' aria-label='Select location'>
            <SelectValue placeholder='Select location' />
          </SelectTrigger>
          <SelectContent>
            {locations?.map((cat) => (
              <SelectItem key={cat.id} value={`${cat.id}`}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormProduct>
  );
}
