'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper/modules로 경로 변경
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/swiper-bundle.css';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
export default function MainSlider() {
  return (
    <div className='w-full h-[400px]'>
      {' '}
      {/* 컨테이너 크기 지정 */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className='w-full h-full'
      >
        <SwiperSlide>
          <div className='w-full h-full bg-gray-200'>Slide 1</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='w-full h-full bg-gray-300'>Slide 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='w-full h-full bg-gray-400'>Slide 3</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
