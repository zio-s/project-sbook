'use client';
import { navigationDate } from '@/data/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FaAlignRight } from 'react-icons/fa6';
import SearchBar from '@/components/SearchBar';
import { Search } from 'lucide-react';
import NavBar from '../NavBar';
const Header = ({ children }) => {
  const pathName = usePathname();
  const [books, setBooks] = useState([]);
  return (
    <>
      <header className='border-b-2'>
        <NavBar />
      </header>
    </>
  );
};

export default Header;
