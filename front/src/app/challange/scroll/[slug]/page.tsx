'use client';

type Props = {
  params: {
    slug: string;
  };
};

import React from 'react';

const page = ({ params }: Props) => {
  return (
    <>
      <div className="relative w-screen h-auto"></div>
    </>
  );
};

export default page;
