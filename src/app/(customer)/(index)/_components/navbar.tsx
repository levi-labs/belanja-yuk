import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className='container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl'>
      <div className='flex justify-center items-center mb-2'>
        <Image
          width={60}
          height={30}
          src='./assets/logos/find-prices.svg'
          alt='icon'
        />
        <h4 className='text-2xl font-extrabold text-white'>Cari Discount</h4>
      </div>
      <ul className='flex items-center gap-[30px]'>
        <li className='hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-[#FFC736]'>
          <Link href='/catalogs'>Shop</Link>
        </li>
        <li className='hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white'>
          <Link href=''>Categories</Link>
        </li>
        <li className='hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white'>
          <Link href=''>Testimonials</Link>
        </li>
        <li className='hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white'>
          <Link href=''>Rewards</Link>
        </li>
      </ul>
      <div className='flex items-center gap-3'>
        <a href='cart.html'>
          <div className='w-12 h-12 flex shrink-0'>
            <img src='./assets/icons/cart.svg' alt='icon' />
          </div>
        </a>
        <a
          href='/sign-in'
          className='p-[12px_20px] bg-white rounded-full font-semibold'
        >
          Sign In
        </a>
        <a
          href='/sign-up'
          className='p-[12px_20px] bg-white rounded-full font-semibold'
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
}
