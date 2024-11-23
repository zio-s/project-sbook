'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 로그인 성공 후 리다이렉트
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // 로그인 성공 후 리다이렉트
    } catch (error) {
      setError('Google 로그인에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>로그인</h2>

      {error && <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>{error}</div>}

      <form onSubmit={handleEmailLogin} className='space-y-4'>
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
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <div className='mt-4'>
        <button
          onClick={handleGoogleLogin}
          className='w-full bg-white text-gray-700 border border-gray-300 py-2 rounded hover:bg-gray-50 flex items-center justify-center'
        >
          <img src='/google-icon.png' alt='Google' className='w-6 h-6 mr-2' />
          Google로 로그인
        </button>
      </div>
    </div>
  );
}
