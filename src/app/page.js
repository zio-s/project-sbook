import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BookIntroPage from './home/page';

export default function Home() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gray-50'>
        <BookIntroPage />
      </main>
      <Footer />
    </>
  );
}
