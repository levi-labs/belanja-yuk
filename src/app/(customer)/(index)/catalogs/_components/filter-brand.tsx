'use client';
import React from 'react';
import { useBrand } from '../../hooks/useBrand';

export default function FilterBrand() {
  const { brands, loading, error } = useBrand();
  return (
    <div className='flex flex-col gap-[14px]'>
      <p className='font-semibold leading-[22px]'>Brands</p>
      {Array.isArray(brands) &&
        brands.length > 0 &&
        brands.map((brand, idx) => (
          <label
            key={brand.name + idx}
            className='font-semibold flex items-center gap-3'
          >
            <input
              type='checkbox'
              name='brand'
              className='w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]'
            />
            <span>{brand.name}</span>
          </label>
        ))}
    </div>
  );
}
