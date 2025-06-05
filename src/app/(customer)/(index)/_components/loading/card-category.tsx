import React from 'react';

export default function CardCategory() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className='bg-white flex items-center gap-4 p-5 rounded-2xl ring-1
                   ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736]
                   transition-all duration-1000 w-full animate-pulse'
        >
          {/* Avatar Skeleton */}
          <div className='w-12 h-12 flex shrink-0 rounded-full bg-gray-300'></div>

          {/* Text Skeleton */}
          <div className='flex flex-col gap-2 w-full'>
            <div className='h-3 bg-gray-300 rounded w-1/2'></div>
            <div className='h-3 bg-gray-300 rounded w-full'></div>
          </div>
        </div>
      ))}
    </>
  );
}
