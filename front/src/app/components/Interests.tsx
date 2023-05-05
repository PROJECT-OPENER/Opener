'use client';
import { useState } from 'react';
import Button from './Button';
import { interest } from '@/util/Interest';

const Interests = () => {
  const [activeIndex, setActiveIndex] = useState<number[]>([]);

  const handleClick = (i: number) => {
    if (activeIndex.includes(i)) {
      setActiveIndex(activeIndex.filter((index) => index !== i));
    } else {
      setActiveIndex([...activeIndex, i]);
    }
  };

  const handleRegister = () => {
    if (activeIndex.length < 2) {
      alert('관심사는 최소 2개 이상 선택해야 합니다.');
    } else {
      alert(activeIndex);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      {interest.map((v, i) => {
        return (
          <div
            key={i}
            className={`m-5 h-[150px] w-[150px] rounded-xl flex justify-center items-center shadow-xl ${
              activeIndex.includes(i) ? 'bg-brandP text-white' : 'bg-white'
            }`}
            onClick={() => handleClick(i)}
          >
            <span
              className={`${
                activeIndex.includes(i) ? 'bg-brandP text-white' : 'bg-white'
              }`}
            >
              + {v}
            </span>
          </div>
        );
      })}
      <Button
        type="button"
        text="관심사 등록"
        className="fixed bottom-24 bg-brandP w-96 text-white rounded-xl shadow-xl py-3"
        onClick={handleRegister}
      />
    </div>
  );
};

export default Interests;
