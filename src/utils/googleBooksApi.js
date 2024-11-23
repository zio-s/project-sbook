const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

export const getKoreanBestBooks = async (startIndex = 0) => {
  const buildBookData = (book) => ({
    id: book.id,
    title: book.volumeInfo.title || '제목 없음',
    author: book.volumeInfo.authors?.[0] || '작자미상',
    image: book.volumeInfo.imageLinks?.thumbnail || '/placeholder-book.jpg',
    rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating.toFixed(1) : '4.0',
  });

  const fetchBooks = async (query, maxResults = 40) => {
    try {
      // q 파라미터 수정
      const response = await fetch(
        `${GOOGLE_BOOKS_API}?q=${query}&maxResults=${maxResults}&startIndex=${startIndex}&orderBy=newest&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  };

  try {
    // 다양한 쿼리 시도
    const queries = ['베스트셀러', '인기도서', '추천도서'];

    let data = null;
    for (const q of queries) {
      const query = encodeURIComponent(q);
      data = await fetchBooks(query);

      if (data?.items?.length > 0) {
        console.log(`Found ${data.items.length} books with query: ${q}`);
        break;
      }
    }

    if (!data?.items) {
      throw new Error('No books found from any query');
    }

    return data.items.map(buildBookData);
  } catch (error) {
    console.error('Error fetching Korean best books:', error);
    return [];
  }
};

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

    if (!response.ok) {
      throw new Error('API 호출 실패');
    }

    const data = await response.json();

    // data.items가 없는 경우 빈 배열 반환
    if (!data.items) {
      return [];
    }

    const books = await Promise.all(
      data.items.map(async (book) => {
        // book.volumeInfo가 없는 경우 처리
        const volumeInfo = book.volumeInfo || {};

        // 안전한 데이터 접근
        return {
          id: book.id || '',
          title: volumeInfo.title || '제목 없음',
          author: volumeInfo.authors?.[0] || '작자미상',
          cover: volumeInfo.imageLinks?.smallThumbnail || '/placeholder-book.jpg',
          rating: Number(volumeInfo.averageRating || 4).toFixed(1),
          rank: 1,
          description: volumeInfo.description || '설명이 없습니다.',
          previewLink: volumeInfo.previewLink || '',
          publisher: volumeInfo.publisher || '',
          publishedDate: volumeInfo.publishedDate || '',
          pageCount: volumeInfo.pageCount || 0,
          categories: volumeInfo.categories || [],
        };
      })
    );

    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}
