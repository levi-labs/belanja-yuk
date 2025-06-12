'use client';
import React from 'react';
import { useBrand } from '../../hooks/useBrand';
import FilterCheckBoxItem from './filter-checkbox-item';

export default function FilterBrand() {
  const { brands } = useBrand();
  return (
    <div className='flex flex-col gap-[14px]'>
      <p className='font-semibold leading-[22px]'>Brands</p>
      {Array.isArray(brands) &&
        brands.length > 0 &&
        brands.map((brand, idx) => (
          <FilterCheckBoxItem
            key={brand.name + idx}
            id={brand.id.toString()}
            value={brand.name}
            type={'brand'}
          />
        ))}
    </div>
  );
}
