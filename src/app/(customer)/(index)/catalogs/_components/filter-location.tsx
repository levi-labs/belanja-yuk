'use client';
import React from 'react';
import { useLocation } from '../../hooks/useLocation';

export default function FilterLocation() {
  const { locations, loading, error } = useLocation();
  return (
    <div className='flex flex-col gap-[14px]'>
      <p className='font-semibold leading-[22px]'>Location</p>
      {Array.isArray(locations) &&
        locations.length > 0 &&
        locations.map((location, idx) => (
          <label
            key={location.name + idx}
            className='font-semibold flex items-center gap-3'
          >
            <input
              type='checkbox'
              name='loc'
              className='w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]'
            />
            <span>{location.name}</span>
          </label>
        ))}
    </div>
  );
}
