// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth, db } from '@/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, userData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // 사용자 추가 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        email,
        ...userData,
        createdAt: new Date().toISOString(),
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };
  // Google 로그인 함수
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Google 로그인 실패:', error);
    }
  };
  return {
    user,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
  };
}
