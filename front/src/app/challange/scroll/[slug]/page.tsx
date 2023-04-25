'use client';

type Props = {
  params: {
    slug: string;
  };
};

import React from 'react';
import ChallangeVideo from './components/ChallangeVideo';
import OriginalVideo from './components/OriginalVideo';
const page = ({ params }: Props) => {
  return (
    <>
      <div className="relative w-screen h-auto">
        <ChallangeVideo></ChallangeVideo>
        <div className="absolute bottom-0 left-0 h-2/6 w-2/6 m-5">
          <OriginalVideo></OriginalVideo>
        </div>
      </div>
    </>
  );
};

export default page;
