'use client';
import React, { ReactNode } from 'react';
import CardProduct from './loading/card-product';
import { useProduct } from '../hooks/useProduct';
import Link from 'next/link';
import { getImageUrl } from '@/lib/supabase';
import { rupiahFormat } from '@/lib/utils';

interface ListProductProps {
  title: ReactNode;
  type: string;
  count: number;
}
export default function ListProduct({ type, title, count }: ListProductProps) {
  const { products, loading, error } = useProduct();

  return (
    <div id='picked' className='flex flex-col gap-[30px]'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl leading-[34px]'>{title}</h2>
        <a
          href='catalog.html'
          className='p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold'
        >
          Explore All
        </a>
      </div>
      <div className='grid grid-cols-5 gap-[30px]'>
        {loading && <CardProduct count={count} />}
        {Array.isArray(products) &&
          products.length > 0 &&
          products.slice(0, count).map((product, idx) => (
            <Link
              key={product.name + idx}
              href='details.html'
              className='product-card'
            >
              <div className='bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full'>
                <div className='w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden'>
                  <img
                    src={getImageUrl(product.images[0], 'products')}
                    className='w-full h-full object-contain'
                    alt='thumbnail'
                  />
                </div>
                <div className='flex flex-col gap-[10px]'>
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold leading-[22px]'>
                      {product.name.length > 15
                        ? product.name.slice(0, 15) + '...'
                        : product.name}
                    </p>
                    <p className='text-sm text-[#616369]'>
                      {product.category.name}
                    </p>
                  </div>
                  <p className='font-semibold text-[#0D5CD7] leading-[22px]'>
                    {rupiahFormat(Number(product.price))}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
