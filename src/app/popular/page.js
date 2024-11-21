// app/(routes)/popular/page.js
'use client';
import BookSort from '@/components/BookSort';
import BookFilter from '@/components/filter/BookFilter';
import BookGrid from '@/components/layout/BookGrid';
import { getPopularBooks } from '@/utils/googleBooksApi';
import Pagination from '@/components/navigation/Pagination';
import { useState, useEffect } from 'react';

export default function PopularBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('popularity');

  useEffect(() => {
    // 데이터 fetch 로직
  }, [currentPage, filter, sort]);
  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const popularBooks = await getPopularBooks();
        setBooks(popularBooks);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>인기도서</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {books.map((book) => (
          <div key={book.id} className='relative cursor-pointer transform transition-transform hover:scale-105'>
            <div className='absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 text-sm'>{book.rank}위</div>
            <img src={book.cover} alt={book.title} className='w-full h-64 object-cover rounded-lg shadow-lg' />
            <div className='mt-2'>
              <h3 className='font-medium text-sm'>{book.title}</h3>
              <p className='text-gray-600 text-xs'>{book.author}</p>
              <div className='flex items-center mt-1'>
                <span className='text-yellow-400'>★</span>
                <span className='text-xs ml-1'>{book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
