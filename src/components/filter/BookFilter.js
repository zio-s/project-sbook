export default function BookFilter({ onFilter }) {
  return (
    <div className='mb-6'>
      <div className='flex gap-4 flex-wrap'>
        <button className='px-4 py-2 bg-white rounded-full shadow hover:bg-gray-50'>전체</button>
        <button className='px-4 py-2 bg-white rounded-full shadow hover:bg-gray-50'>소설</button>
        {/* 더 많은 카테고리 */}
      </div>
    </div>
  );
}
