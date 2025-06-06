import React from 'react';

export default function SearchBar() {
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
      />
      <button type='submit' className='flex shrink-0'>
        <img src='assets/icons/search-normal.svg' alt='icon' />
      </button>
    </form>
  );
}
