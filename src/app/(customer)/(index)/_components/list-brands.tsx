'use client';
import React from 'react';
import CardBrand from './loading/card-brand';
import { getBrand } from '../lib/data';
import { useBrand } from '../hooks/useBrand';
import Link from 'next/link';
import { getImageUrl } from '@/lib/supabase';

export default function ListBrand() {
  const { brands, loading, error } = useBrand();

  return (
    <div id='brands' className='flex flex-col gap-[30px]'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl leading-[34px]'>
          Explore Our <br /> Popular Brands
        </h2>
        <a
          href='catalog.html'
          className='p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold'
        >
          Explore All
        </a>
      </div>
      <div className='grid grid-cols-5 gap-[30px]'>
        {loading && <CardBrand />}
        {Array.isArray(brands) &&
          brands.length > 0 &&
          brands.map((brand, idx) => (
            <Link href='/' className='logo-card'>
              <div className='bg-white flex items-center justify-center p-[30px_20px] rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full'>
                <div className='w-full h-[30px] flex shrink-0 items-center justify-center overflow-hidden'>
                  <img
                    src={getImageUrl(brand.logo, 'brands')}
                    className='w-full h-full object-contain'
                    alt='thumbnail'
                  />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
