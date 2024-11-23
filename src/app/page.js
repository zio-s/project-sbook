import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BookIntroPage from './home/page';
import MainSlider from '@/components/layout/MainSlide';

export default function Home() {
  return (
    <>
      <Header />
      <main className='min-h-screen bg-gray-50'>
        <MainSlider />
        <BookIntroPage />
      </main>
      <Footer />
    </>
  );
}
