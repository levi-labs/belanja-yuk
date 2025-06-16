'use client';
import Image from 'next/image';
import React from 'react';
import Flickity from 'react-flickity-component';
const flickityOptions = {
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  prevNextButtons: false,
};
export default function CarouselImage({ images }: { images?: string[] }) {
  return (
    <div
      id='details-images'
      className='main-carousel mt-[30px] overflow-hidden'
    >
      <Flickity
        className={'carousel focus:outline-none'} // default ''
        elementType={'div'} // default 'div'
        options={flickityOptions} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        {images?.map((image, idx) => (
          <div
            key={idx}
            className='image-card pr-5 first-of-type:pl-[calc((100vw-1130px-20px)/2)] focus:border-none focus:outline-none'
          >
            <div className='bg-white w-[470px] h-[350px] p-10 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden'>
              <Image
                width={470}
                height={350}
                src={image}
                className='w-full h-full object-contain'
                alt='thumbnail'
                loading='eager'
              />
            </div>
          </div>
        ))}
      </Flickity>
    </div>
  );
}
