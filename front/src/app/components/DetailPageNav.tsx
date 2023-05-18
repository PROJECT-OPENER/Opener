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
      className={`${className} hidden lg:grid lg:grid-cols-3 grid-cols-2 shadow-custom py-2 px-4 rounded-xl bg-[#fff]`}
    >
      <button onClick={propEvent}>
        <Image
          src={'/images/logo.png'}
          alt="Logo"
          width={100}
          height={24}
          priority
          className=""
        />
      </button>

      <h1 className="text-center text-2xl font-semibold hidden md:block">
        {title}
      </h1>
      <button className="text-end md:text-xl" onClick={propEvent} type="button">
        종료
      </button>
    </div>
  );
};

export default DetailPageNav;
