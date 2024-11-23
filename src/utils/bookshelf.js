// utils/bookshelf.js
import { db } from '@/firebase/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const addToBookshelf = async (userId, book) => {
  try {
    await addDoc(collection(db, 'bookshelves'), {
      userId,
      bookId: book.id,
      title: book.title,
      author: book.author,
      image: book.image,
      addedAt: new Date().toISOString(),
      status: 'want_to_read', // 읽고 싶은 책
    });
  } catch (error) {
    console.error('Error adding book to bookshelf:', error);
    throw error;
  }
};

export const getUserBooks = async (userId, status = null) => {
  try {
    let q = query(collection(db, 'bookshelves'), where('userId', '==', userId));

    if (status) {
      q = query(q, where('status', '==', status));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting user books:', error);
    throw error;
  }
};

export const updateBookStatus = async (bookshelfId, status) => {
  try {
    await updateDoc(doc(db, 'bookshelves', bookshelfId), {
      status,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating book status:', error);
    throw error;
  }
};
