'use client';
import React, { useEffect, useState } from 'react';
import { useFilter } from '../../hooks/useFilter';

export default function SearchBar() {
  const setFilter = useFilter((state) => state.setFilter);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({ search: query });
    }, 1000);

    return () => clearTimeout(debounceInput);
  }, [query, setFilter]);
  return (
    <form
      action=''
      className='max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'
    >
      <input
        type='text'
        id=''
        name=''
        className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
        placeholder='Search product by name, brand, category'
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button type='submit' className='flex shrink-0'>
        <img src='assets/icons/search-normal.svg' alt='icon' />
      </button>
    </form>
  );
}
