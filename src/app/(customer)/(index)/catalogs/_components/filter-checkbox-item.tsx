import React, { ChangeEvent } from 'react';
import { useFilter } from '../../hooks/useFilter';
import { ProductStock } from '@prisma/client';

interface FilterCheckItemProps {
  id: string;
  value: string;
  type?: 'stock' | 'brand' | 'location' | 'category';
}
export default function FilterCheckBoxItem({
  id,
  value,
  type,
}: FilterCheckItemProps) {
  const { filter, setFilter } = useFilter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onChange', e.target.value, 'type', e.target.checked);

    switch (type) {
      case 'stock':
        if (e.target.checked) {
          setFilter({
            stock: [...(filter.stock ?? []), e.target.value as ProductStock],
          });
        } else {
          setFilter({
            stock: filter.stock?.filter((val) => val != e.target.value),
          });
        }
        break;
      case 'brand':
        if (e.target.checked) {
          setFilter({
            brands: [...(filter.brands ?? []), parseInt(e.target.value)],
          });
        } else {
          setFilter({
            brands: filter.brands?.filter(
              (val) => val != parseInt(e.target.value)
            ),
          });
        }
        break;
      case 'location':
        if (e.target.checked) {
          setFilter({
            locations: [...(filter.locations ?? []), parseInt(e.target.value)],
          });
        } else {
          setFilter({
            locations: filter.locations?.filter(
              (val) => val != parseInt(e.target.value)
            ),
          });
        }
      case 'category':
        if (e.target.checked) {
          setFilter({
            categories: [
              ...(filter.categories ?? []),
              parseInt(e.target.value),
            ],
          });
        } else {
          setFilter({
            categories: filter.categories?.filter(
              (val) => val != parseInt(e.target.value)
            ),
          });
        }

      default:
        break;
    }
  };
  return (
    <label key={id + value} className='font-semibold flex items-center gap-3'>
      <input
        id={id + value}
        type='checkbox'
        value={id}
        onChange={onChange}
        className='w-6 h-6 flex shrink-0 appearance-none checked:border-[3px] checked:border-solid checked:border-white rounded-md checked:bg-[#0D5CD7] ring-1 ring-[#0D5CD7]'
      />
      <span>{value}</span>
    </label>
  );
}
