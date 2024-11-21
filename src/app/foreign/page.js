'use client';
import BookSort from '@/components/BookSort';
import BookFilter from '@/components/filter/BookFilter';
import BookGrid from '@/components/layout/BookGrid';
import Pagination from '@/components/navigation/Pagination';
import { useState, useEffect } from 'react';

export default function ForeignBooks() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('popularity');

  const categories = ['All', 'Fiction', 'Non-fiction', 'Business', 'Science', 'Technology', 'Art', 'Biography'];

  useEffect(() => {
    // 국내도서 데이터 fetch
    // ex) q=subject:korean
  }, [currentPage, filter, sort]);

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>해외도서</h1>

      <div className='flex justify-between items-center mb-6'>
        <BookFilter categories={categories} onFilter={setFilter} />
        <BookSort onSort={setSort} />
      </div>

      <BookGrid books={books} />

      <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
    </div>
  );
}
