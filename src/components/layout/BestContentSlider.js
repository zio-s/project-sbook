'use client';
import { useEffect, useState } from 'react';

import { getKoreanBestBooks } from '@/utils/googleBooksApi';
import 'swiper/css';
import BookSlider from '../BookSlider';

const BestContentSlider = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      try {
        const firstBatch = await getKoreanBestBooks(0);
        console.log('First batch:', firstBatch);
        setBooks(firstBatch); // 첫 번째 배치 데이터 설정

        if (firstBatch.length === 40) {
          const secondBatch = await getKoreanBestBooks(40);
          console.log('Second batch:', secondBatch);
          setBooks((prev) => [...prev, ...secondBatch]); // 두 번째 배치 데이터 추가
        }
      } catch (error) {
        console.error('Error fetching all books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  return <BookSlider title='종합도서 베스트' books={books} loading={loading} />;
};

export default BestContentSlider;
