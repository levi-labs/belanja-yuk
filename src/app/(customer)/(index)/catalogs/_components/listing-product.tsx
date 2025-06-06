'use client';
import React from 'react';
import { useProduct } from '../../hooks/useProduct';
import Link from 'next/link';
import { getImageUrl } from '@/lib/supabase';
import { rupiahFormat } from '@/lib/utils';
import Image from 'next/image';

export default function ListingProduct() {
  const { products, loading, error } = useProduct({ count: null });
  return (
    <div className='w-[780px] flex flex-col bg-white p-[30px] gap-[30px] h-fit border border-[#E5E5E5] rounded-[30px]'>
      <h2 className='font-bold text-2xl leading-[34px]'>Products</h2>
      <div className='grid grid-cols-3 gap-[30px]'>
        {Array.isArray(products) &&
          products.length > 0 &&
          products.map((product, idx) => (
            <Link key={product.name + idx} href='/' className='product-card'>
              <div className='bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full'>
                <div className='w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden'>
                  <Image
                    width={40}
                    height={40}
                    src={getImageUrl(product.images, 'products')}
                    className='w-full h-full object-contain'
                    alt='thumbnail'
                  />
                </div>
                <div className='flex flex-col gap-[10px]'>
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold leading-[22px]'>
                      {product.name}
                    </p>
                    <p className='text-sm text-[#616369]'>
                      {product.category_name}
                    </p>
                  </div>
                  <p className='font-semibold text-[#0D5CD7] leading-[22px]'>
                    {rupiahFormat(product.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
