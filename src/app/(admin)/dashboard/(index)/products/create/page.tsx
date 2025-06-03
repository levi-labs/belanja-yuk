import React from 'react';
import FormProduct from '../_components/form-product';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCategories } from '../../categories/lib/data';
import { getBrands } from '../../brands/lib/data';
import { getLocations } from '../../locations/lib/data';

export default async function CreatePage() {
  const categories = await getCategories();
  const brands = await getBrands();
  const locations = await getLocations();
  return (
    <div>
      <FormProduct type='ADD'>
        <div className='grid gap-3'>
          <Label htmlFor='category'>Category</Label>
          <Select name='category_id'>
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
          <Select name='brand_id'>
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
          <Select name='location_id'>
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
    </div>
  );
}
