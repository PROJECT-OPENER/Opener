import React from 'react';
import { GrGamepad } from 'react-icons/gr';
import { BsSoundwave } from 'react-icons/bs';
import Link from 'next/link';

const page = () => {
  return (
    <div className="h-[80vh] flex justify-around max-lg:justify-evenly items-center max-lg:flex-col">
      <Link href="/aiChat">
        <button
          type="button"
          className="rounded-xl shadow-xl border-t-2 text-3xl max-lg:text-base py-24 w-96 max-lg:py-20 max-lg:w-72 font-bold flex justify-center items-center space-x-3"
        >
          <BsSoundwave />
          <span>AI와 대화하기</span>
        </button>
      </Link>
      <Link href="/userChat">
        <button
          type="button"
          className="rounded-xl shadow-xl border-t-2 text-3xl max-lg:text-base py-24 w-96 max-lg:py-20 max-lg:w-72 font-bold flex justify-center items-center space-x-3"
        >
          <GrGamepad />
          <span>대화 게임하기</span>
        </button>
      </Link>
    </div>
  );
};

export default page;
