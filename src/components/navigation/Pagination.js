// components/Pagination.js
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className='flex justify-center gap-2 mt-8'>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
