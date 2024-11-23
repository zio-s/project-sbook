'use client';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';
import Image from 'next/image';
import { FaAlignRight } from 'react-icons/fa6';
import { navigationDate } from '@/data/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const { user } = useAuth();
  const pathName = usePathname();
  const [books, setBooks] = useState([]);
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className='bg-white shadow-lg px-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center h-16'>
          <h1 className='logo flex justify-center items-center'>
            <Link href='/'>
              <Image src='/images/sbook_.png' width={76} height={25} alt='sbook'></Image>
            </Link>
          </h1>
          <div>
            {user ? (
              <div className='flex items-center space-x-4'>
                <span>{user.email}</span>
                <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded'>
                  로그아웃
                </button>
              </div>
            ) : (
              <div className='space-x-4'>
                <a href='/login' className='text-blue-500'>
                  로그인
                </a>
                <a href='/signup' className='bg-blue-500 text-white px-4 py-2 rounded'>
                  회원가입
                </a>
              </div>
            )}
          </div>
        </div>
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
      </div>
    </nav>
  );
}
