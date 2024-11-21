import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import React from 'react';

const layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer />
    </>
  );
};

export default layout;
