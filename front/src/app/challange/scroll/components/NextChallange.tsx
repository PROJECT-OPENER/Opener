'use client';

type Props = {
  data: string;
};

import React from 'react';

const NextChallange = ({ data }: Props) => {
  return (
    <div className="w-full h-screen bg-yellow-400">
      <h1>다음 꺼</h1>
      {data}
    </div>
  );
};

export default NextChallange;
