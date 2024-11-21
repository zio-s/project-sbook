const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
export async function getPopularBooks() {
  try {
    // 인기도서는 평점과 리뷰 수를 기준으로 정렬
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=subject:bestseller&orderBy=relevance&maxResults=12&key=${API_KEY}`
    );
    const data = await response.json();

    const books = await Promise.all(
      data.items.map(async (book, index) => {
        const relatedBooks = await getRelatedBooks(book.id);

        return {
          id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors?.[0] || '작자미상',
          cover: book.volumeInfo.imageLinks?.smallThumbnail || '/placeholder-book.jpg',
          rating: book.volumeInfo.averageRating || 4.0,
          rank: index + 1, // 순위 부여
          description: book.volumeInfo.description,
          previewLink: book.volumeInfo.previewLink,
          pages: [
            {
              type: 'preview',
              title: '미리보기',
              content: book.volumeInfo.previewLink
                ? `<iframe src="${book.volumeInfo.previewLink}" width="100%" height="100%" frameborder="0"></iframe>`
                : book.volumeInfo.description || '미리보기 내용이 없습니다.',
            },
          ],
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          pageCount: book.volumeInfo.pageCount,
          categories: book.volumeInfo.categories,
          relatedBooks,
        };
      })
    );

    return books;
  } catch (error) {
    console.error('Error fetching popular books:', error);
    return [];
  }
}
export async function getKoreanBooks() {
  try {
    // 한국어 도서 + 인기순으로 정렬
    const query = encodeURIComponent('language:ko');
    const response = await fetch(
      `${GOOGLE_BOOKS_API}?q=${query}&orderBy=relevance&maxResults=12&langRestrict=ko&key=${API_KEY}`
    );
    const data = await response.json();

    // 기존 데이터 처리 방식을 유지하면서 국내도서 데이터 변환
    const books = await Promise.all(
      data.items.map(async (book) => {
        const relatedBooks = await getRelatedBooks(book.id);

        return {
          id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors?.[0] || '작자미상',
          cover: book.volumeInfo.imageLinks?.smallThumbnail || '/placeholder-book.jpg',
          rating: book.volumeInfo.averageRating || 4.0,
          rank: 1,
          description: book.volumeInfo.description,
          previewLink: book.volumeInfo.previewLink,
          pages: [
            {
              type: 'preview',
              title: '미리보기',
              content: book.volumeInfo.previewLink
                ? `<iframe src="${book.volumeInfo.previewLink}" width="100%" height="100%" frameborder="0"></iframe>`
                : book.volumeInfo.description || '미리보기 내용이 없습니다.',
            },
          ],
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          pageCount: book.volumeInfo.pageCount,
          categories: book.volumeInfo.categories,
          relatedBooks,
        };
      })
    );

    return books;
  } catch (error) {
    console.error('Error fetching Korean books:', error);
    return [];
  }
}
async function getRelatedBooks(bookId) {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=${bookId}&maxResults=4&key=${API_KEY}`);
    const data = await response.json();
    return (
      data.items?.map((book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.[0] || '작자미상',
        cover: book.volumeInfo.imageLinks?.smallThumbnail || '/placeholder-book.jpg',
      })) || []
    );
  } catch (error) {
    console.error('Error fetching related books:', error);
    return [];
  }
}

export async function searchBooks(query) {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&maxResults=12&key=${API_KEY}`);
    const data = await response.json();
    console.log(data);

    const books = await Promise.all(
      data.items.map(async (book) => {
        const relatedBooks = await getRelatedBooks(book.id);
        const randomRating = Math.random() * (5.0 - 3.5) + 3.5;
        return {
          id: book.id,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors?.[0] || '작자미상',
          cover: book.volumeInfo.imageLinks?.smallThumbnail || '/placeholder-book.jpg',
          rating: book.volumeInfo.averageRating || randomRating.toFixed(1),
          rank: 1,
          description: book.volumeInfo.description,
          previewLink: book.volumeInfo.previewLink,
          pages: [
            {
              type: 'preview',
              title: '미리보기',
              content: book.volumeInfo.previewLink
                ? `<iframe src="${book.volumeInfo.previewLink}" width="100%" height="100%" frameborder="0"></iframe>`
                : book.volumeInfo.description || '미리보기 내용이 없습니다.',
            },
          ],
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          pageCount: book.volumeInfo.pageCount,
          categories: book.volumeInfo.categories,
          relatedBooks,
        };
      })
    );

    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}
