'use client';
import React, { useEffect, useState } from 'react';
import { useFilter } from '../../hooks/useFilter';
export default function FilterPrice() {
  const setFilter = useFilter((state) => state.setFilter);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [minMaxPrice, setMinMaxPrice] = useState(minPrice);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleMinMaximalPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (type == 'min') {
      setMinPrice(Number(event.target.value));
      setMinMaxPrice(Number(event.target.value));
    } else {
      setMaxPrice(Number(event.target.value));
    }
  };

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      console.log(`Min Price: ${minPrice}, Max Price: ${maxPrice}`);

      setFilter({ minPrice: minPrice, maxPrice: maxPrice });
    }, 1500);

    return () => clearTimeout(debounceInput);
  }, [minPrice, maxPrice, setFilter]);

  return (
    <div className='flex flex-col gap-[14px]'>
      <p className='font-semibold leading-[22px]'>Range Price</p>
      <div className='max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
        <div className='flex shrink-0'>
          <img src='assets/icons/dollar-circle.svg' alt='icon' />
        </div>
        <input
          min={0}
          onChange={(e) => handleMinMaximalPrice(e, 'min')}
          type='number'
          id='min_price'
          name='min_price'
          className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
          placeholder='Minimum price'
        />
      </div>
      <div className='max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
        <div className='flex shrink-0'>
          <img src='assets/icons/dollar-circle.svg' alt='icon' />
        </div>
        <input
          min={minMaxPrice}
          type='number'
          id='max_price'
          name='max_price'
          className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
          placeholder='Maximum price'
          onChange={(e) => handleMinMaximalPrice(e, 'max')}
        />
      </div>
    </div>
  );
}
