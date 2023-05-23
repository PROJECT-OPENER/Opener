'use client';
import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return (
    <Oval
      height={160}
      width={160}
      color="#7D17FF"
      wrapperStyle={{
        shadow: '100px 100px 100px rgba(196, 132, 132, 0.25)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#FFD600"
      strokeWidth={8}
      strokeWidthSecondary={8}
    />
  );
};

export default Loading;
