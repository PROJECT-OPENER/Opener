'use client';

import { interest } from '@/util/Interest';
import { useState } from 'react';
import Button from '@/app/components/Button';

const InterestsEdit = () => {
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
    <>
      <div className="w-full grid sm:grid-cols-3 grid-cols-2 mt-10">
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
      </div>
      <Button
        type="button"
        text="관심사 변경 완료"
        className="validator-submit"
        onClick={handleRegister}
      />
    </>
  );
};
export default InterestsEdit;
