'use client';
import React from 'react';
import { useCart } from '../../hooks/useCart';
import { rupiahFormat } from '@/lib/utils';

export default function ListCart() {
  const { products, increaseQuantity, decreaseQuantity, removeProduct } =
    useCart();
  return (
    <div
      id='cart'
      className='container max-w-[1130px] mx-auto flex flex-col gap-5 mt-[50px]'
    >
      {products.length > 0 &&
        products.map((product) => (
          <div
            key={product.name + product.id}
            className='product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5]'
          >
            <div className='flex items-center w-[340px] gap-5'>
              <div className='w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center'>
                <img
                  src={product.images}
                  className='w-full h-full object-contain'
                  alt=''
                />
              </div>
              <div className='flex flex-col gap-1'>
                <p className='font-semibold leading-[22px]'>{product.name}</p>
                <p className='text-sm text-[#616369]'>
                  {product.category_name}
                </p>
              </div>
            </div>
            <div className='w-[150px] flex flex-col gap-1'>
              <p className='text-sm text-[#616369]'>Price</p>
              <p className='font-semibold text-[#0D5CD7] leading-[22px]'>
                {rupiahFormat(product.price)}
              </p>
            </div>
            <div className='w-[120px] flex flex-col gap-1'>
              <p className='text-sm text-[#616369]'>Quantity</p>
              <div className='flex items-center gap-3'>
                <button
                  type='button'
                  onClick={() => decreaseQuantity(product.id)}
                  className='w-6 h-6 flex shrink-0'
                >
                  <img src='/assets/icons/minus-cirlce.svg' alt='minus' />
                </button>
                <p className='text-[#0D5CD7] font-semibold leading-[22px]'>
                  {product.quantity}
                </p>
                <button
                  type='button'
                  onClick={() => increaseQuantity(product.id)}
                  className='w-6 h-6 flex shrink-0'
                >
                  <img src='/assets/icons/add-circle.svg' alt='plus' />
                </button>
              </div>
            </div>
            <div className='w-[150px] flex flex-col gap-1'>
              <p className='text-sm text-[#616369]'>Total</p>
              <p className='font-semibold text-[#0D5CD7] leading-[22px]'>
                {rupiahFormat(product.price * product.quantity)}
              </p>
            </div>
            <button
              type='button'
              onClick={() => removeProduct(product.id)}
              className='p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]'
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
}
