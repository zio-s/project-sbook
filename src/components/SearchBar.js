// components/SearchBar.js
'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { searchBooks } from '@/utils/googleBooksApi';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const results = await searchBooks(query);
      onSearch(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex gap-2'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='책 제목이나 저자를 검색하세요'
          className='flex-1 p-2 border rounded'
        />
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2'>
          <Search className='w-4 h-4' />
          검색
        </button>
      </div>
    </form>
  );
}

// 부모 컴포넌트에서 사용
