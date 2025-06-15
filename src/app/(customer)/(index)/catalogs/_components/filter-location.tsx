'use client';

import { useLocation } from '../../hooks/useLocation';
import FilterCheckBoxItem from './filter-checkbox-item';

export default function FilterLocation() {
  const { locations } = useLocation();

  return (
    <div className='flex flex-col gap-[14px]'>
      <p className='font-semibold leading-[22px]'>Location</p>
      {Array.isArray(locations) &&
        locations.length > 0 &&
        locations.map((location, idx) => (
          <FilterCheckBoxItem
            key={location.name + idx}
            id={location.id.toString()}
            value={location.name}
            type='location'
          />
        ))}
    </div>
  );
}
