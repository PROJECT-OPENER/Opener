'use client';
import { useState } from 'react';
import Button from './Button';
import useSWR from 'swr';
import { getInterestListApi } from '../api/chatApi';
import { interestInterface } from '@/types/share';
import { interestRegisterApi } from '../api/userApi';
import { redirect } from 'next/navigation';

const Interests = () => {
  const { data, isLoading } = useSWR('get/interest', getInterestListApi, {
    focusThrottleInterval: 5000,
  });

  const [activeIndex, setActiveIndex] = useState<number[]>([]);

  const handleClick = (i: number) => {
    if (activeIndex.includes(i)) {
      setActiveIndex(activeIndex.filter((index) => index !== i));
    } else {
      setActiveIndex([...activeIndex, i]);
    }
  };

  const handleRegister = async () => {
    if (activeIndex.length < 2) return alert('2개 이상 선택해주세요.');
    try {
      await interestRegisterApi(activeIndex);
      await redirect('/');
    } catch (err) {
      alert(err);
    }
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="w-[400px] mx-auto">
      <div className="grid grid-cols-2">
        {data?.data.map((item: interestInterface) => {
          return (
            <div
              key={item.interestId}
              className={`m-5 h-[150px] w-[150px] rounded-xl flex justify-center items-center shadow-xl mx-auto hover:cursor-pointer ${
                activeIndex.includes(item.interestId)
                  ? 'bg-brandP text-white'
                  : 'bg-white'
              }`}
              onClick={() => handleClick(item.interestId)}
            >
              <span
                className={`${
                  activeIndex.includes(item.interestId)
                    ? 'bg-brandP text-white'
                    : 'bg-white'
                }`}
              >
                + {item.interest}
              </span>
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        text="관심사 등록"
        className="bg-brandP w-full text-white rounded-xl shadow-xl py-3 mt-5"
        onClick={handleRegister}
      />
    </div>
  );
};

export default Interests;
