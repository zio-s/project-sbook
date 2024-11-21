import React from 'react';

const Section = ({ title, children }) => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>{title}</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>{children}</div>
    </div>
  );
};

export default Section;
