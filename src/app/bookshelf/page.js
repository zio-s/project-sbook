// pages/bookshelf.js
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/firebase/useAuth';
import { getUserBooks } from '@/utils/bookshelf';
import BookSlider from '@/components/BookSlider';

export default function Bookshelf() {
  const { user, loading: authLoading } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      if (user) {
        try {
          const userBooks = await getUserBooks(user.uid);
          setBooks(userBooks);
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!authLoading) {
      fetchBooks();
    }
  }, [user, authLoading]);

  if (authLoading) return <div>Loading...</div>;
  if (!user) return <div>Please login to view your bookshelf</div>;

  return (
    <div>
      <BookSlider title='내 책장' books={books} loading={loading} />
    </div>
  );
}
