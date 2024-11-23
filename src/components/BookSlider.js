// components/BookSlider.js
'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useEffect } from 'react';

const BookSlider = ({ title, books = [], loading = false }) => {
  if (loading) {
    return (
      <section className='w-full py-8 bg-gray-100'>
        <div className='max-w-[1320px] mx-auto px-4'>
          <h2 className='text-2xl font-bold mb-6'>{title}</h2>
          <div className='flex justify-center items-center h-[400px]'>Loading...</div>
        </div>
      </section>
    );
  }

  if (!books || books.length === 0) {
    return (
      <section className='w-full py-8 bg-gray-100'>
        <div className='max-w-[1320px] mx-auto px-4'>
          <h2 className='text-2xl font-bold mb-6'>{title}</h2>
          <div className='text-center'>데이터를 찾을 수 없습니다.</div>
        </div>
      </section>
    );
  }

  return (
    <section className='w-full py-8'>
      <div className='max-w-[1320px] mx-auto px-4'>
        <h2 className='text-2xl font-bold mb-6'>{title}</h2>
        <Swiper modules={[Autoplay]} spaceBetween={15} slidesPerView='auto' speed={3000} className='!overflow-visible'>
          {books.map((book, index) => (
            <SwiperSlide key={book.id || index} className='!w-[150px] sm:!w-[200px]'>
              <div className='bg-white rounded-lg shadow-lg overflow-hidden p-2'>
                <Image
                  src={book.image}
                  alt={book.title}
                  width={150} // 좀 더 넓게
                  height={225} // 비율 유지 (2:3)
                  className='rounded-lg transition-transform hover:scale-105'
                  objectFit='cover'
                />
                <div className='mt-2'>
                  <h3 className='font-semibold text-xs sm:text-sm line-clamp-2'>{book.title}</h3>
                  <p className='text-gray-500 text-xs sm:text-sm mt-1'>{book.author}</p>
                  <div className='flex items-center mt-2'>
                    <span className='text-yellow-400 text-sm'>⭐</span>
                    <span className='ml-1 text-xs sm:text-sm'>{book.rating}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BookSlider;
