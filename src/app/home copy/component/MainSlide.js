import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaStar } from 'react-icons/fa';
const MainSlide = () => {
  return (
    <>
      <ul className='flex w-full gap-5'>
        <li className='w-9/12  shrink-0 bg-gray-500 '>
          <Link href='/' className='relative'>
            <Image src='/images/slide-1.png' width={300} height={313} alt='slide'></Image>
            <div className='absolute bottom-0 p-4 bg-black w-full opacity-70 text-white rounded-xl'>
              <strong>소년이 온다</strong>
              <p className='text-sm'>한강 장편소설</p>
              <div className='flex gap-3 items-center '>
                <span className=' flex justify-center items-center gap-1 font-bold text-red-500'>
                  <FaStar />
                  4.9점
                </span>
                <span className='flex items-center gap-1'>
                  <em className='not-italic font-bold text-lg'>한강</em>저
                  <em className='not-italic font-bold text-lg'>창비</em>
                  출판
                </span>
              </div>
            </div>
          </Link>
        </li>
        <li className='w-9/12 h-[313px] shrink-0 bg-gray-500 '>
          <Link href='/'>
            <Image src='/images/slide-2.png' width={300} height={313} alt='slide'></Image>
          </Link>
        </li>
        <li className='w-9/12 h-[313px] shrink-0 bg-gray-500 '>3</li>
        <li className='w-9/12 h-[313px] shrink-0 bg-gray-500 '>4</li>
      </ul>
    </>
  );
};

export default MainSlide;
