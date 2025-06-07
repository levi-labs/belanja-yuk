'use client';
import React from 'react';
import { useCategory } from '../../hooks/useCategory';

export default function FilterCategory() {
  const { categories, loading, error } = useCategory();
  return (
    <div className='flex flex-col gap-[14px]'>
      <p className='font-semibold leading-[22px]'>Categories</p>
      {Array.isArray(categories) &&
        categories.length > 0 &&
        categories.map((cat, idx) => (
          <label
            key={cat.name + idx}
            className='font-semibold flex items-center gap-3'
          >
            <input
              type='checkbox'
              name='category'
              className='w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]'
            />
            <span>{cat.name}</span>
          </label>
        ))}
    </div>
  );
}
