'use client';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const BookViewer = ({ bookData, onClose }) => {
  const bookRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 600 });

  // 화면 크기에 따른 책 크기 조정
  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth <= 768) {
        // 모바일
        const width = window.innerWidth * 0.85;
        const height = window.innerHeight * 0.5;
        setDimensions({
          width: Math.min(width, 400),
          height: Math.min(height, 500),
        });
      } else {
        // 데스크탑
        setDimensions({
          width: Math.min(window.innerWidth * 0.4, 800),
          height: Math.min(window.innerHeight * 0.7, 600),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const initTurn = () => {
      try {
        if (window.jQuery && bookRef.current) {
          const $book = window.jQuery(bookRef.current);

          if ($book.data('turn')) {
            $book.turn('destroy');
          }

          // turn.js 초기화
          $book.turn({
            width: dimensions.width,
            height: dimensions.height,
            autoCenter: true,
            display: 'single',
            duration: 1000, // 페이지 넘김 애니메이션 시간
            acceleration: true,
            gradients: true,
            elevation: 50,
            pages: bookData.pages?.length + 2,
            when: {
              turning: function (e, page, view) {
                e.preventDefault();
                setTimeout(() => {
                  $book.turn('disable', false);
                }, 1000);
              },
              turned: function (e, page) {
                console.log('Current page:', page);
              },
            },
          });

          // 화살표 버튼 클릭 이벤트 핸들러
          const handlePrevious = () => {
            if ($book.turn('page') > 1) {
              $book.turn('previous');
            }
          };

          const handleNext = () => {
            if ($book.turn('page') < $book.turn('pages')) {
              $book.turn('next');
            }
          };
          const handleClick = (e) => {
            const rect = bookRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = rect.width;

            if (x < width * 0.3) {
              $book.turn('previous');
            } else if (x > width * 0.7) {
              $book.turn('next');
            }
          };

          // 터치 이벤트 핸들러
          let startX = 0;
          const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
          };

          const handleTouchEnd = (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;

            if (Math.abs(diff) > 50) {
              if (diff > 0) {
                $book.turn('previous');
              } else {
                $book.turn('next');
              }
            }
          };

          // 이벤트 리스너 등록
          bookRef.current.addEventListener('click', handleClick);
          bookRef.current.addEventListener('touchstart', handleTouchStart);
          bookRef.current.addEventListener('touchend', handleTouchEnd);
          const prevButton = document.querySelector('.prev-button');
          const nextButton = document.querySelector('.next-button');

          if (prevButton) prevButton.addEventListener('click', handlePrevious);
          if (nextButton) nextButton.addEventListener('click', handleNext);

          // 키보드 이벤트
          const handleKeyDown = (e) => {
            if (e.keyCode === 37) handlePrevious();
            if (e.keyCode === 39) handleNext();
          };

          window.addEventListener('keydown', handleKeyDown);

          // 클린업 함수 반환
          return () => {
            if (prevButton) prevButton.removeEventListener('click', handlePrevious);
            if (nextButton) nextButton.removeEventListener('click', handleNext);
            window.removeEventListener('keydown', handleKeyDown);
            if (bookRef.current) {
              bookRef.current.removeEventListener('click', handleClick);
              bookRef.current.removeEventListener('touchstart', handleTouchStart);
              bookRef.current.removeEventListener('touchend', handleTouchEnd);
            }
          };
        }
      } catch (error) {
        console.error('Error initializing turn.js:', error);
      }
    };

    const timer = setInterval(() => {
      if (window.jQuery && window.jQuery().turn) {
        const cleanup = initTurn();
        clearInterval(timer);
        return cleanup;
      }
    }, 100);

    return () => {
      clearInterval(timer);
      try {
        if (window.jQuery && bookRef.current) {
          const $book = window.jQuery(bookRef.current);
          if ($book.data('turn')) {
            $book.turn('destroy');
          }
        }
      } catch (error) {
        console.error('Error cleaning up turn.js:', error);
      }
    };
  }, [dimensions, bookData.pages?.length]);
  return (
    <div className='fixed inset-0 bg-black/75 flex items-center justify-center p-4'>
      <div className='relative bg-white rounded-lg'>
        <button
          onClick={onClose}
          className='absolute text-2xl z-10 top-[105%] w-16 right-2/4 translate-x-2/4 bg-slate-300 rounded md:top-4 md:w-auto md:bg-transparent md:right-8 '
        >
          ✕
        </button>

        <div className='flex items-center gap-4 p-4'>
          <button className='prev-button px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 hidden md:block'>←</button>

          <div
            ref={bookRef}
            className='book-container cursor-pointer'
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
          >
            {/* Book Info */}
            <div className='page'>
              <div className='p-6 space-y-4'>
                <h1 className='text-2xl font-bold'>{bookData.title}</h1>

                <div className='text-sm space-y-2 text-gray-600'>
                  <p>
                    <span className='font-medium'>저자:</span> {bookData.author}
                  </p>
                  <p>
                    <span className='font-medium'>출판사:</span> {bookData.publisher}
                  </p>
                  <p>
                    <span className='font-medium'>출간일:</span> {bookData.publishedDate}
                  </p>
                  {bookData.categories && (
                    <p>
                      <span className='font-medium'>카테고리:</span> {bookData.categories.join(', ')}
                    </p>
                  )}
                  <p>
                    <span className='font-medium'>평점:</span> {bookData.rating}/5.0
                  </p>
                  <p>
                    <span className='font-medium'>페이지:</span> {bookData.pageCount}쪽
                  </p>
                </div>
              </div>
            </div>

            {/* Preview */}
            {bookData.previewLink ? (
              <div className='page'>
                <div className='p-4 sm:p-8'>
                  <h3 className='text-lg sm:text-xl font-bold mb-4'>소개</h3>
                  {bookData.previewLink ? (
                    <div className='h-full w-full'>
                      <p className='mb-4 line-clamp-11 md:line-clamp-19 overflow-hidden text-ellipsis '>
                        {bookData.description || '소개글이 없습니다.'}{' '}
                      </p>
                      <a
                        href={bookData.previewLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                      >
                        Google Books에서 미리보기
                      </a>
                    </div>
                  ) : (
                    <div className='prose prose-sm sm:prose'>{bookData.description || '미리보기 내용이 없습니다.'}</div>
                  )}
                </div>
              </div>
            ) : (
              <div className='page'>
                <div className='p-4 sm:p-8'>
                  <h3 className='text-lg sm:text-xl font-bold mb-4'>책 소개</h3>
                  <div className='prose prose-sm sm:prose'>{bookData.description}</div>
                </div>
              </div>
            )}
            <div className='page'>
              <div className='p-6'>
                <h3 className='text-xl font-bold mb-4'>함께 보면 좋은 책</h3>
                <div className='grid grid-cols-2 gap-4'>
                  {bookData.relatedBooks?.map((book) => (
                    <div key={book.id} className='space-y-2'>
                      <div className='relative aspect-w-2 aspect-h-3 bg-gray-100'>
                        <Image
                          src={book.cover}
                          alt={book.title}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, 50vw'
                        />
                      </div>
                      <p className='font-medium line-clamp-2'>{book.title}</p>
                      <p className='text-sm text-gray-600'>{book.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className='next-button px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 hidden md:block'>→</button>
        </div>
      </div>
    </div>
  );
};

export default BookViewer;
