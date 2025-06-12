'use client';
import React from 'react';
import { useCategory } from '../../hooks/useCategory';
import FilterCheckBoxItem from './filter-checkbox-item';

export default function FilterCategory() {
  const { categories } = useCategory();
  return (
    <div className='flex flex-col gap-[14px]'>
      <p className='font-semibold leading-[22px]'>Categories</p>
      {Array.isArray(categories) &&
        categories.length > 0 &&
        categories.map((cat, idx) => (
          <FilterCheckBoxItem
            key={cat.name + idx}
            id={cat.id.toString()}
            value={cat.name}
            type={'category'}
          />
        ))}
    </div>
  );
}
