'use client';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// swiper/modules로 경로 변경
import Image from 'next/image';
import 'swiper/swiper-bundle.css';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
export default function MainSlider() {
  return (
    <div className='relative w-full mt-5'>
      {' '}
      {/* 좌우 패딩 추가 */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={'auto'}
        centeredSlides={true} // 중앙 정렬 활성화
        // loop={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className='mySwiper'
      >
        <SwiperSlide className='!w-[80%]'>
          {' '}
          {/* 슬라이드 너비 조정 */}
          <div className='w-full h-[400px] bg-gray-200 rounded-lg'>Slide 1</div>
        </SwiperSlide>
        <SwiperSlide className='!w-[80%]'>
          <div className='w-full h-[400px] bg-gray-300 rounded-lg'>Slide 2</div>
        </SwiperSlide>
        <SwiperSlide className='!w-[80%]'>
          <div className='w-full h-[400px] bg-gray-400 rounded-lg'>Slide 3</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
