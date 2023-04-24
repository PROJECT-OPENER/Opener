import React from 'react';
import { GrGamepad } from 'react-icons/gr';
import { BsSoundwave } from 'react-icons/bs';
import Link from 'next/link';

const page = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-evenly items-center">
      <Link href="/aiChat">
        <button
          type="button"
          className="rounded-xl shadow-xl border-t-2 py-20 w-72 font-bold flex justify-center items-center space-x-3"
        >
          <BsSoundwave />
          <span>AI와 대화하기</span>
        </button>
      </Link>
      <Link href="/userChat">
        <button
          type="button"
          className="rounded-xl shadow-xl border-t-2 py-20 w-72 font-bold flex justify-center items-center space-x-3"
        >
          <GrGamepad />
          <span>대화 게임하기</span>
        </button>
      </Link>
    </div>
  );
};

export default page;
