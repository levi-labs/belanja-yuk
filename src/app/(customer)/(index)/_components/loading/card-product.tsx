import Link from 'next/link';
import React from 'react';

export default function CardProduct({ count }: any) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Link key={index} href='details.html' className='product-card'>
          <div className='bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736]  transition-all duration-1000 w-full animate-pulse'>
            <div className='w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden'>
              <div className='bg-gray-300 w-full h-full rounded-xl'></div>
            </div>
            <div className='flex flex-col gap-[10px]'>
              <div className='flex flex-col gap-2 '>
                <div className='bg-gray-300 w-full h-3 rounded-xl'></div>
                <div className='bg-gray-300 w-3/6 h-2 rounded-xl'></div>
              </div>
              <div className='bg-gray-300 w-3/4 h-2 rounded-xl'></div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
