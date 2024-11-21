export default function BookSort({ onSort }) {
  return (
    <select className='border p-2 rounded'>
      <option value='popularity'>인기순</option>
      <option value='latest'>최신순</option>
      <option value='rating'>평점순</option>
    </select>
  );
}
