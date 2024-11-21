export default function BookList({ books }) {
  const BookListMobile = ({ book }) => (
    <div className='md:hidden p-4 bg-white rounded-lg shadow'>
      <div className='flex gap-4'>
        <img src={book.cover} alt={book.title} className='w-24 h-36 object-cover rounded' />
        <div>
          <h3 className='font-bold line-clamp-2'>{book.title}</h3>
          <p className='text-sm text-gray-600'>{book.author}</p>
          <p className='text-sm text-gray-500'>평점: {book.rating}/5.0</p>
        </div>
      </div>
      <div className='mt-4'>
        <p className='text-sm text-gray-700 line-clamp-2'>{book.description}</p>
        <div className='flex gap-2 mt-2'>
          <button className='flex-1 py-2 text-sm text-blue-500 border border-blue-500 rounded'>미리보기</button>
          <button className='flex-1 py-2 text-sm bg-blue-500 text-white rounded'>추가</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* 모바일 뷰 */}
      <div className='md:hidden space-y-4'>
        {books.map((book) => (
          <BookListMobile key={book.id} book={book} />
        ))}
      </div>

      {/* 데스크톱 뷰 */}
      <div className='hidden md:block space-y-4'>
        <div className='space-y-4'>
          {books.map((book) => (
            <div key={book.id} className='flex gap-4 bg-white p-4 rounded-lg shadow hover:shadow-lg transition'>
              {/* 책 표지 */}
              <div className='flex-shrink-0'>
                <img src={book.cover} alt={book.title} className='w-32 h-48 object-cover rounded' />
              </div>

              {/* 책 정보 */}
              <div className='flex-grow space-y-2'>
                <h3 className='text-xl font-bold'>{book.title}</h3>
                <div className='text-gray-600'>
                  <p>{book.author}</p>
                  <p>
                    {book.publisher} · {book.publishedDate}
                  </p>
                </div>

                {/* 책 설명 */}
                <p className='text-gray-700 line-clamp-3'>{book.description}</p>

                {/* 추가 정보 */}
                <div className='flex items-center gap-4 text-sm text-gray-500'>
                  <span>평점: {book.rating}/5.0</span>
                  <span>페이지: {book.pageCount}</span>
                  {book.categories && <span>카테고리: {book.categories.join(', ')}</span>}
                </div>

                {/* 액션 버튼 */}
                <div className='flex gap-2 pt-2'>
                  <button
                    className='px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50'
                    onClick={() => window.open(book.previewLink, '_blank')}
                  >
                    미리보기
                  </button>
                  <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>책장에 추가</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
