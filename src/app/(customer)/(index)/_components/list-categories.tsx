'use client';
import React from 'react';
// import { getCategory } from '../lib/data';
import { useCategory } from '../hooks/useCategory';
import CardCategory from './loading/card-category';
import Link from 'next/link';
import Image from 'next/image';

export default function ListCategory() {
  const icons = [
    'assets/icons/mobile.svg',
    'assets/icons/airpods.svg',
    'assets/icons/game.svg',
    'assets/icons/box.svg',
    'assets/icons/lamp.svg',
    'assets/icons/watch.svg',
    'assets/icons/monitor.svg',
    'assets/icons/cup.svg',
  ];
  const { category, loading, error } = useCategory();
  console.log(category, loading, error);
  return (
    <div id='categories' className='flex flex-col gap-[30px]'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl leading-[34px]'>
          Browse Products <br /> by Categories
        </h2>
        <a
          href='catalog.html'
          className='p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold'
        >
          Explore All
        </a>
      </div>
      <div className='grid grid-cols-4 gap-[30px]'>
        {loading && <CardCategory />}
        {error && (
          <>
            <h4 className='text-slate-700 text-lg text-muted-foreground'>
              Oops! Something when wrong..
            </h4>
          </>
        )}
        {Array.isArray(category) &&
          category.length > 0 &&
          category.map((cat, idx) => (
            <Link key={cat.name + cat.id} href='/' className='categories-card'>
              <div className='bg-white flex items-center gap-[14px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full'>
                <div className='w-12 h-12 flex shrink-0 rounded-full bg-[#0D5CD7] items-center justify-center overflow-hidden'>
                  <Image
                    width={18}
                    height={23}
                    src={icons[idx]}
                    alt={`${cat.name} icon`}
                  />
                </div>
                <div className='flex flex-col gap-[2px]'>
                  <p className='font-semibold leading-[22px]'>{cat.name}</p>
                  <p className='text-sm text-[#616369]'>
                    {cat._count.product} products
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
