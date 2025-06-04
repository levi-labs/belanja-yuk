'use client';
import React from 'react';
import '../../../globalLanding.css';
import { ActionResult } from '@/types';
import { useFormState, useFormStatus } from 'react-dom';
import { SignIn } from './lib/actions';
import Image from 'next/image';

const initialState: ActionResult = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type='submit'
      className='p-[12px_24px] bg-[#8652e0] rounded-full text-center font-semibold text-white'
    >
      {pending ? 'Loading...' : 'Sign In to My Account'}
    </button>
  );
}
export default function SignInPage() {
  const [state, formAction] = useFormState(SignIn, initialState);
  return (
    <div
      id='signin'
      className='bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col'
    >
      <div className='container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5'>
        <form
          action={formAction}
          className='w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]'
        >
          <div className='flex justify-center'>
            <Image
              width={200}
              height={200}
              src='./assets/logos/logo-black.svg'
              alt='logo'
            />
          </div>
          <h1 className='font-bold text-2xl leading-[34px]'>Sign In</h1>
          {state.error !== '' && (
            <div className='border border-red-300 text-red-500 p-3 rounded-lg'>
              <h4 className='font-semibold'>Error</h4>
              <p className='mt-1 text-sm'>{state.error}</p>
            </div>
          )}
          <div className='flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
            <div className='flex shrink-0'>
              <Image
                width={24}
                height={24}
                src='./assets/icons/sms.svg'
                alt='icon'
              />
            </div>
            <input
              type='email'
              id='email'
              name='email'
              className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
              placeholder='Write your email address'
            />
          </div>
          <div className='flex flex-col gap-[10px]'>
            <div className='flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300'>
              <div className='flex shrink-0'>
                <Image
                  width={24}
                  height={24}
                  src='./assets/icons/lock.svg'
                  alt='icon'
                />
              </div>
              <input
                type='password'
                id='password'
                name='password'
                className='appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black'
                placeholder='Write your password'
              />
              {/* <button
                type='button'
                className='reveal-password flex shrink-0'
                onClick="togglePasswordVisibility('password', this)"
              >
                <img src='./assets/icons/eye.svg' alt='icon' />
              </button> */}
            </div>
            <a
              href=''
              className='text-sm text-[#616369] underline w-fit mr-0 ml-auto'
            >
              Forgot Password
            </a>
          </div>
          <div className='flex flex-col gap-3'>
            <SubmitButton />
            <a
              href='signup.html'
              className='p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]'
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
