'use client';
import { useState, useEffect } from 'react';
import { getKoreanBooks } from '@/utils/googleBooksApi';
import BookGrid from '@/components/layout/BookGrid';

export default function DomesticBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const koreanBooks = await getKoreanBooks();
        setBooks(koreanBooks);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>국내도서</h1>
      <BookGrid books={books} />
    </div>
  );
}
