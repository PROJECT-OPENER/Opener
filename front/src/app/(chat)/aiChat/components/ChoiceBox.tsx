'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { interest } from '@/util/Interest';
import Button from '@/app/components/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { getInterestListApi } from '@/app/api/chatApi';
import { interestInterface } from '@/types/share';

const ChoiceBox = () => {
  const { data, isLoading } = useSWR('get/interest', getInterestListApi, {
    focusThrottleInterval: 5000,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string>('');
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
        '/aiChat/room' + '?' + createQueryString('sub', `${selected}`),
      );
    }
  };
  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="w-[400px] mx-auto">
      {data && (
        <div className="grid grid-cols-2">
          {data.data.map((item: interestInterface) => {
            return (
              <div
                key={item.interestId}
                className={`m-5 h-[150px] w-[150px] rounded-xl flex justify-center items-center shadow-xl ${
                  activeIndex === item.interestId
                    ? 'bg-brandP text-white'
                    : 'bg-white'
                }`}
                onClick={() => {
                  setActiveIndex(item.interestId);
                  setSelected(item.interest);
                }}
              >
                <span
                  className={
                    activeIndex === item.interestId ? 'text-white' : ''
                  }
                >
                  {item.interest}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <Button
        type="button"
        text="시작하기"
        className="bg-brandP w-full text-white rounded-xl shadow-xl py-3 mt-5"
        onClick={handleClick}
      />
    </div>
  );
};

export default ChoiceBox;
