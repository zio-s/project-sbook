// components/BookGrid.js
export default function BookGrid({ books }) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
      {books.map((book) => (
        <div key={book.id} className='bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition'>
          <img src={book.cover} alt={book.title} className='w-full h-48 object-cover' />
          <div className='p-4'>
            <h3 className='font-medium line-clamp-2'>{book.title}</h3>
            <p className='text-sm text-gray-600'>{book.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
