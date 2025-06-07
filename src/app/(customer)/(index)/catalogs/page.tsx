import React from 'react';
import '../../../globalLanding.css';
import Navbar from '../_components/navbar';
import SearchBar from './_components/search-bar';
import FilterStock from './_components/filter-stock';
import FilterPrice from './_components/filter-price';
import FilterBrand from './_components/filter-brand';
import FilterLocation from './_components/filter-location';
import FilterCategory from './_components/filter-categories';
import ListingProduct from './_components/listing-product';

export default function CatalogPage() {
  return (
    <>
      <header className='bg-[#EFF3FA] pt-[30px] h-[35vh] -mb-[181px]'>
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
              Catalog
            </a>
          </div>
          <h1 className='font-bold text-4xl leading-9'>Our Product Catalog</h1>
        </div>
        <SearchBar />
      </div>
      <div
        id='catalog'
        className='container max-w-[1130px] mx-auto flex gap-[30px] mt-[50px] pb-[100px]'
      >
        <form
          action=''
          className='flex flex-1 flex-col bg-white p-[30px] gap-5 h-fit border border-[#E5E5E5] rounded-[30px]'
        >
          <h2 className='font-bold text-2xl leading-[34px]'>Filters</h2>
          <FilterPrice />
          <hr className='border-[#E5E5E5]' />
          <FilterStock />
          <hr className='border-[#E5E5E5]' />
          <FilterBrand />
          <hr className='border-[#E5E5E5]' />
          <FilterLocation />
          <hr className='border-[#E5E5E5]' />
          <FilterCategory />
        </form>
        <ListingProduct />
      </div>
    </>
  );
}
