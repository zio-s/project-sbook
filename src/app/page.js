import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BookIntroPage from './home/page';
import MainSlider from '@/components/layout/MainSlide';
import BestContentSlider from '@/components/layout/BestContentSlider';

export default function Home() {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <MainSlider />
        <BestContentSlider />
        <BookIntroPage />
      </main>
      <Footer />
    </>
  );
}
