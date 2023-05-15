'use client';
import React, { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { getInterestListApi } from '@/app/api/chatApi';
import { interestInterface } from '@/types/share';
import { useSetRecoilState } from 'recoil';
import { aiChatSub } from '../store';

const ChoiceBox = () => {
  const { data, isLoading } = useSWR('get/interest', getInterestListApi, {
    focusThrottleInterval: 5000,
  });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<string>('');
  const setAiSub = useSetRecoilState(aiChatSub);
  const router = useRouter();

  useEffect(() => {
    setActiveIndex(null);
    setAiSub({ subIndex: 0, name: '' });
  }, []);

  const handleClick = () => {
    if (activeIndex === null) {
      alert('주제를 선택해주세요.');
    } else {
      setAiSub({ subIndex: activeIndex, name: selected });
      router.push('/aiChat/chatRoom');
    }
  };
  if (isLoading) return <div>로딩중...</div>;

  return (
    <div className="mx-auto">
      {data && (
        <div className="grid grid-cols-2">
          {data.data.map((item: interestInterface) => {
            return (
              <div
                key={item.interestId}
                className={`m-5 h-[150px] w-[150px] rounded-xl flex justify-center items-center shadow-xl hover:cursor-pointer ${
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
