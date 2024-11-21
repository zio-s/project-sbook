'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Star, BookOpen, Search } from 'lucide-react';
import { searchBooks } from '@/utils/googleBooksApi';

const BookViewer = dynamic(() => import('@/app/home/component/BookViewer'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const BookIntroPage = (bookData) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  // 초기 책 목록 로드
  useEffect(() => {
    loadInitialBooks();
  }, []);

  const loadInitialBooks = async () => {
    setLoading(true);
    try {
      const initialBooks = await searchBooks('bestseller');
      setBooks(
        initialBooks.map((book, index) => ({
          ...book,
          rank: index + 1,
        }))
      );
    } catch (error) {
      console.error('Error loading initial books:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchBooks(searchQuery);
      setBooks(
        searchResults.map((book, index) => ({
          ...book,
          rank: index + 1,
        }))
      );
    } catch (error) {
      console.error('Error searching books:', error);
    }
    setLoading(false);
  };
  const handleCloseReading = () => {
    setIsReading(false);
    setSelectedBook(null);
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      {/* 검색 바 */}
      <form onSubmit={handleSearch} className='mb-8'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='책 제목이나 저자를 검색하세요'
            className='flex-1 p-2 border rounded'
          />
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2'>
            <Search className='w-4 h-4' />
            검색
          </button>
        </div>
      </form>

      {/* Top 12 Books Grid */}
      <div className='mb-16'>
        <h2 className='text-2xl font-bold mb-8'>{searchQuery ? '검색 결과' : '이번 주 TOP 12'}</h2>
        {loading ? (
          <div className='text-center py-8'>Loading...</div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {books.map((book) => (
              <div
                key={book.id}
                className='relative cursor-pointer transform transition-transform hover:scale-105'
                onClick={() => setSelectedBook(book)}
              >
                <div className='absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 text-sm'>{book.rank}위</div>
                <img src={book.cover} alt={book.title} className='w-full h-64 object-cover rounded-lg shadow-lg' />
                <div className='mt-2'>
                  <h3 className='font-medium text-sm'>{book.title}</h3>
                  <p className='text-gray-600 text-xs'>{book.author}</p>
                  <div className='flex items-center mt-1'>
                    <Star className='w-4 h-4 text-yellow-400 fill-current' />
                    <span className='text-xs ml-1'>
                      {book.rating}
                      /5.0
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Selected Book Modal - 이 부분을 추가 */}
      {selectedBook && !isReading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg p-6 max-w-lg w-full'>
            <div className='flex justify-between items-start mb-4'>
              <h2 className='text-xl font-bold'>{selectedBook.title}</h2>
              <button onClick={() => setSelectedBook(null)} className='text-gray-500 hover:text-gray-700'>
                ✕
              </button>
            </div>
            <div className='flex gap-6'>
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className='w-40 h-56 object-cover rounded-lg shadow-lg'
              />
              <div>
                <div className='flex flex-col'>
                  <p className='text-gray-800 mb-2'>{selectedBook.author}</p>
                  <span className='text-sm text-gray-600'>{selectedBook.publisher}</span>
                  <span className='text-sm text-gray-600'>{selectedBook.publishedDate}</span>
                </div>
                <div className='flex items-center mb-4'>
                  <Star className='w-5 h-5 text-yellow-400 fill-current' />
                  <span className='ml-1'>{selectedBook.rating}</span>
                </div>
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'
                  onClick={() => setIsReading(true)}
                >
                  <BookOpen className='w-5 h-5' />
                  읽어보기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Book Viewer */}
      {isReading && selectedBook && (
        <BookViewer
          bookData={selectedBook}
          onClose={() => {
            setIsReading(false);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BookIntroPage;
