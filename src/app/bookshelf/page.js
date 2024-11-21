'use client';
import BookList from '@/components/BookList';
import BookSort from '@/components/BookSort';
import BookGrid from '@/components/layout/BookGrid';
import { useState } from 'react';

export default function Bookshelf() {
  const [view, setView] = useState('grid');
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState('latest'); // sort state 추가

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        {/* 뷰 전환 버튼 */}
        <div className='flex gap-4'>
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded ${view === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            그리드 보기
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            리스트 보기
          </button>
        </div>

        {/* 정렬 옵션 */}
        <BookSort onSort={setSort} />
      </div>

      {/* 책 목록 */}
      {view === 'grid' ? <BookGrid books={books} /> : <BookList books={books} />}
    </div>
  );
}
