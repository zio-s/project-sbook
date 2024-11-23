'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 이메일/비밀번호 유효성 검사
      if (!email || !password) {
        throw new Error('이메일과 비밀번호를 입력해주세요.');
      }

      // 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에 사용자 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      // 성공 시 리다이렉트 또는 다음 단계
      console.log('Successfully signed up!');
    } catch (error) {
      console.error('Sign up error:', error);
      // 에러 메시지 처리
      if (error.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/invalid-email') {
        setError('유효하지 않은 이메일 형식입니다.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setError('이메일/비밀번호 로그인이 비활성화되어 있습니다.');
      } else if (error.code === 'auth/weak-password') {
        setError('비밀번호는 최소 6자 이상이어야 합니다.');
      } else {
        setError('회원가입 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow'>
      {error && <div className='mb-4 p-3 bg-red-100 text-red-700 rounded'>{error}</div>}

      <div className='mb-4'>
        <label className='block mb-2'>이메일</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div className='mb-4'>
        <label className='block mb-2'>비밀번호</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full p-2 border rounded'
          required
          minLength={6}
        />
      </div>

      <button
        type='submit'
        disabled={loading}
        className='w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50'
      >
        {loading ? '처리중...' : '회원가입'}
      </button>
    </form>
  );
}
