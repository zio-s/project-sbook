// components/SignUpForm.js
'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 사용자 생성
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // 추가 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      // 회원가입 성공 후 리다이렉트
    } catch (error) {
      setError('회원가입에 실패했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>회원가입</h2>

      {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{error}</div>}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-gray-700 mb-2'>이름</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 mb-2'>이메일</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <div>
          <label className='block text-gray-700 mb-2'>비밀번호</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50'
        >
          {loading ? '처리중...' : '회원가입'}
        </button>
      </form>
    </div>
  );
}
