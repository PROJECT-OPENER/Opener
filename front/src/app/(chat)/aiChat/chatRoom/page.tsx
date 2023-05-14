import React from 'react';
import AiChatRoom from './components/AiChatRoom';
import Image from 'next/image';

const page = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 max-lg:flex max-lg:justify-center max-lg:items-center lg:space-x-10">
      <div className="max-lg:hidden bg-red-100 w-full h-full flex justify-center items-center">
        <Image
          src={'/images/metamong.png'}
          alt=""
          width={500}
          height={500}
          className="object-fill w-96 h-[96"
        />
      </div>
      <div className="max-w-[640px] min-w-[500px] lg:rounded-3xl lg:py-10">
        <AiChatRoom />
      </div>
    </div>
  );
};

export default page;
