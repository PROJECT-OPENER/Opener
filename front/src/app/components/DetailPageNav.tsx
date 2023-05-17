import Image from 'next/image';
import React from 'react';

type Props = {
  className: string;
  title: string;
  propEvent: () => void;
};

const DetailPageNav = ({ className, title, propEvent }: Props) => {
  return (
    <div
      className={`${className} grid grid-cols-3 shadow-custom p-3 rounded-xl bg-[#fff6]`}
    >
      <Image
        src={'/images/logo.png'}
        alt="Logo"
        width={100}
        height={24}
        priority
        className="mt-2"
      />
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <button className="text-end text-xl" onClick={propEvent} type="button">
        종료
      </button>
    </div>
  );
};

export default DetailPageNav;
