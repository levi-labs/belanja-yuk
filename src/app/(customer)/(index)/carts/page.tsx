import '../../../globalLanding.css';
import React from 'react';
import Navbar from '../_components/navbar';
import ListCart from './_components/list-cart';
import FormCart from './_components/form-cart';

export default function CartPage() {
  return (
    <>
      <header className='bg-[#EFF3FA] pt-[30px] h-[351px] -mb-[181px]'>
        <Navbar />
      </header>
      <div
        id='title'
        className='container max-w-[1130px] mx-auto flex items-center justify-between'
      >
        <div className='flex flex-col gap-5'>
          <div className='flex gap-5 items-center'>
            <a className='page text-sm text-[#6A7789] last-of-type:text-black'>
              Shop
            </a>
            <span className='text-sm text-[#6A7789]'>/</span>
            <a className='page text-sm text-[#6A7789] last-of-type:text-black'>
              Browse
            </a>
            <span className='text-sm text-[#6A7789]'>/</span>
            <a className='page text-sm text-[#6A7789] last-of-type:text-black'>
              Details
            </a>
          </div>
          <h1 className='font-bold text-4xl leading-9'>My Shopping Cart</h1>
        </div>
      </div>
      <ListCart />
      <FormCart />
    </>
  );
}
