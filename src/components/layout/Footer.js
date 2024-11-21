import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-gray-50 border-t'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Logo & Company Info */}
          <div className='col-span-1 md:col-span-2'>
            <Link href='/' className='inline-block mb-4'>
              <Image src='/images/sbook_.png' alt='sBook Logo' width={80} height={30} />
            </Link>
            <p className='text-gray-600 mb-4'>모든 독자들을 위한 새로운 독서 경험을 제공합니다.</p>
            <div className='flex space-x-4'>
              {/* Social Media Links */}
              <a href='#' className='text-gray-400 hover:text-blue-500'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  {/* Facebook Icon */}
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-blue-400'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  {/* Twitter Icon */}
                </svg>
              </a>
              <a href='#' className='text-gray-400 hover:text-pink-500'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                  {/* Instagram Icon */}
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-sm font-semibold text-gray-900 uppercase mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='text-gray-600 hover:text-gray-900'>
                  회사소개
                </Link>
              </li>
              <li>
                <Link href='/' className='text-gray-600 hover:text-gray-900'>
                  고객센터
                </Link>
              </li>
              <li>
                <Link href='/' className='text-gray-600 hover:text-gray-900'>
                  자주묻는질문
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-sm font-semibold text-gray-900 uppercase mb-4'>Contact</h3>
            <ul className='space-y-2 text-gray-600'>
              <li>📞 1234-5678</li>
              <li>📧 support@sbook.com</li>
              <li>⏰ 평일 09:00 - 18:00</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='border-t pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            {/* Legal Links */}
            <div className='flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600'>
              <Link href='//' className='hover:text-gray-900'>
                이용약관
              </Link>
              <span className='text-gray-300'>|</span>
              <Link href='//' className='hover:text-gray-900'>
                개인정보 처리방침
              </Link>
              <span className='text-gray-300'>|</span>
              <Link href='//' className='hover:text-gray-900'>
                고객센터
              </Link>
            </div>

            {/* Copyright */}
            <div className='text-sm text-gray-600'>&copy; {new Date().getFullYear()} sBook. All rights reserved.</div>
          </div>

          {/* Additional Info */}
          <p className='text-xs text-gray-500 text-center md:text-left mt-4'>
            sBook은 개인프로젝트 작업이며, 통신판매의 당사자가 아닙니다. 따라서 sBook은 상품·거래정보 및 거래에 대하여
            책임을 지지 않습니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
