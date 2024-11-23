'use client';
import { navigationDate } from '@/data/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaAlignRight } from 'react-icons/fa6';
import SearchBar from '@/components/SearchBar';
import { Search } from 'lucide-react';
const Header = ({ children }) => {
  const pathName = usePathname();
  const [books, setBooks] = useState([]);
  return (
    <>
      <header className='border-b-2 px-4'>
        <div className='flex justify-between py-4'>
          <h1 className='logo flex justify-center items-center'>
            <Link href='/'>
              <Image src='/images/sbook_.png' width={76} height={25} alt='sbook'></Image>
            </Link>
          </h1>
          <div>
            <button className='border rounded-[10px] px-2 py-1 text-gray-600'>로그인</button>
          </div>
        </div>
        <div>{children}</div>
        <div className='flex justify-between py-2'>
          <nav className='font-normal'>
            <ul className='flex gap-3 text-base'>
              {navigationDate.map(({ href, label }, index) => (
                <li key={index} className='font-'>
                  <Link href={href} className={pathName === href ? 'text-primary' : ''}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className='flex items-center justify-center'>
            <button>
              <FaAlignRight />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
