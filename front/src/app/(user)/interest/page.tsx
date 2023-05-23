import Interests from '@/app/components/Interests';
import React from 'react';
import InterestHeader from './components/InterestHeader';

const page = () => {
  return (
    <div className="w-[400px] mx-auto mt-10">
      <InterestHeader />
      <Interests />
    </div>
  );
};

export default page;
