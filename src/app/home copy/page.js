import Section from '@/components/layout/Section';
import React from 'react';
import MainSlide from './component/MainSlide';

const HomePage = () => {
  return (
    <>
      <Section>
        <MainSlide />
      </Section>
      <Section title='실시간 랭킹'></Section>
      <Section title='국내도서'></Section>
      <Section title='해외도서'></Section>
    </>
  );
};

export default HomePage;
