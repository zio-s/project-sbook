// components/BookshelfButton.js
'use client';
import { useState } from 'react';
import { useAuth } from '@/firebase/useAuth';
import { addToBookshelf } from '@/utils/bookshelf';

export default function BookshelfButton({ book }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddToBookshelf = async () => {
    if (!user) {
      // 로그인 필요 알림
      return;
    }

    setLoading(true);
    try {
      await addToBookshelf(user.uid, book);
      alert('책장에 추가되었습니다.');
    } catch (error) {
      console.error('Error:', error);
      alert('책장에 추가하지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToBookshelf}
      disabled={loading}
      className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
    >
      {loading ? '처리중...' : '책장에 추가'}
    </button>
  );
}
