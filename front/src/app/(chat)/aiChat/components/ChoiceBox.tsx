'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { interest } from '@/app/util/Interest';
import Button from '@/app/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';

const ChoiceBox = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    setActiveIndex(null);
  }, []);

  const handleClick = () => {
    if (activeIndex === null) {
      alert('주제를 선택해주세요.');
    } else {
      router.push(
        '/aiChat/room' +
          '?' +
          createQueryString('sub', `${interest[activeIndex]}`),
      );
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center items-center">
      {interest.map((v, i) => {
        return (
          <div
            key={i}
            className={`m-5 h-[150px] w-[150px] rounded-xl flex justify-center items-center shadow-xl ${
              activeIndex === i ? 'bg-brandP text-white' : 'bg-white'
            }`}
            onClick={() => setActiveIndex(i)}
          >
            <span>{v}</span>
          </div>
        );
      })}
      <Button
        type="button"
        text="시작하기"
        className="fixed bottom-24 bg-brandP w-96 text-white rounded-xl shadow-xl py-3"
        onClick={handleClick}
      />
    </div>
  );
};

export default ChoiceBox;
