'use client';
import React, { useMemo } from 'react';
import { useCart } from '../../hooks/useCart';
import { rupiahFormat } from '@/lib/utils';
import { useFormState, useFormStatus } from 'react-dom';
import { storeOrder } from '../lib/action';
import { ActionResult } from '@/types';

const initialState: ActionResult = {
  error: '',
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type='submit'
      className='p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white'
    >
      {pending ? 'Loading...' : 'Checkout Now'}
    </button>
  );
};

export default function FormCart() {
  const { products } = useCart();

  const grandTotal = useMemo(() => {
    return products.reduce(
      (prev: number, curr) => prev + curr.price * curr.quantity,
      0
    );
  }, [products]);
  const storeOrderParams = (_: unknown, formData: FormData) =>
    storeOrder(_, formData, grandTotal, products);
  const [, formAction] = useFormState(storeOrderParams, initialState);

  const totalInsurance = useMemo(() => {
    return grandTotal * 0.05;
  }, [grandTotal]);

  const ppn = useMemo(() => {
    return grandTotal * 0.11;
  }, [grandTotal]);
  return (
    <form
      action={formAction}
      id='checkout-info'
      className='container max-w-[1130px] mx-auto flex justify-between gap-5 mt-[50px] pb-[100px]'
    >
      <div className='w-[650px] flex flex-col shrink-0 gap-4 h-fit'>
        <h2 className='font-bold text-2xl leading-[34px]'>
          Your Shipping Address
        </h2>
        <div className='flex flex-col gap-5 p-[30px] rounded-3xl border border-[#E5E5E5] bg-white'>
          <div className='flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
            <div className='flex shrink-0'>
              <img src='/assets/icons/profile-circle.svg' alt='icon' />
            </div>
            <input
              type='text'
              id='name'
              name='name'
              className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
              placeholder='Write your real complete name'
            />
          </div>
          <div className='flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
            <div className='flex shrink-0'>
              <img src='/assets/icons/house-2.svg' alt='icon' />
            </div>
            <input
              type='text'
              id='address'
              name='address'
              className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
              placeholder='Write your active house address'
            />
          </div>
          <div className='flex items-center gap-[30px]'>
            <div className='flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
              <div className='flex shrink-0'>
                <img src='/assets/icons/global.svg' alt='icon' />
              </div>
              <input
                type='text'
                id='city'
                name='city'
                className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
                placeholder='City'
              />
            </div>
            <div className='flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
              <div className='flex shrink-0'>
                <img src='/assets/icons/location.svg' alt='icon' />
              </div>
              <input
                type='number'
                id=''
                name='postal_code'
                className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
                placeholder='Post code'
              />
            </div>
          </div>
          <div className='flex items-start gap-[10px] rounded-[20px] border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
            <div className='flex shrink-0'>
              <img src='/assets/icons/note.svg' alt='icon' />
            </div>
            <textarea
              name='notes'
              id=''
              className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black resize-none'
              rows={6}
              placeholder='Additional notes for courier'
            ></textarea>
          </div>
          <div className='flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
            <div className='flex shrink-0'>
              <img src='/assets/icons/call.svg' alt='icon' />
            </div>
            <input
              type='tel'
              id=''
              name='phone'
              className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
              placeholder='Write your phone number or whatsapp'
            />
          </div>
        </div>
      </div>
      <div className='flex flex-1 flex-col shrink-0 gap-4 h-fit'>
        <h2 className='font-bold text-2xl leading-[34px]'>Payment Details</h2>
        <div className='w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl'>
          <a href=''>
            <div className='w-full bg-white border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-3xl'>
              <div className='flex items-center gap-[10px]'>
                <div className='w-12 h-12 flex shrink-0 rounded-full bg-[#FFC736] items-center justify-center overflow-hidden'>
                  <img src='/assets/icons/cake.svg' alt='icon' />
                </div>
                <div className='flex flex-col gap-[2px]'>
                  <p className='font-semibold'>100% Its Original</p>
                  <p className='text-sm'>We dont sell fake products</p>
                </div>
              </div>
              <div className='flex shrink-0'>
                <img src='/assets/icons/arrow-right.svg' alt='icon' />
              </div>
            </div>
          </a>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex shrink-0'>
                  <img src='/assets/icons/tick-circle.svg' alt='icon' />
                </div>
                <p>Sub Total</p>
              </div>
              <p className='font-semibold'>{rupiahFormat(grandTotal)}</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex shrink-0'>
                  <img src='/assets/icons/tick-circle.svg' alt='icon' />
                </div>
                <p>Insurance 12%</p>
              </div>
              <p className='font-semibold'>{rupiahFormat(totalInsurance)}</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex shrink-0'>
                  <img src='/assets/icons/tick-circle.svg' alt='icon' />
                </div>
                <p>Shipping (Flat)</p>
              </div>
              <p className='font-semibold'>Rp 200.000</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex shrink-0'>
                  <img src='/assets/icons/tick-circle.svg' alt='icon' />
                </div>
                <p>Warranty Original</p>
              </div>
              <p className='font-semibold'>Rp 0</p>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='flex shrink-0'>
                  <img src='/assets/icons/tick-circle.svg' alt='icon' />
                </div>
                <p>PPN 11%</p>
              </div>
              <p className='font-semibold'>{rupiahFormat(ppn)}</p>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='font-semibold'>Grand Total</p>
            <p className='font-bold text-[32px] leading-[48px] underline text-[#0D5CD7]'>
              {rupiahFormat(grandTotal)}
            </p>
          </div>

          <div className='flex flex-col gap-3'>
            <SubmitButton />
            <a
              href=''
              className='p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]'
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
