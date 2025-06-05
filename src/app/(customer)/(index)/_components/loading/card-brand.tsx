import Link from 'next/link';
import React from 'react';

export default function CardBrand() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Link key={idx} href='' className='logo-card'>
          <div className='bg-white flex items-center justify-center p-[30px_20px] rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-1000 w-full animate-pulse'>
            <div className='w-full h-[30px] flex shrink-0 items-center justify-center overflow-hidden'>
              <div className='bg-gray-300 w-full h-full rounded-full'></div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
